# Memoria e Contesto nei Transformer: Perché Raddoppiare il Contesto Non Raddoppia la Memoria

## Il problema fondamentale

Immagina una riunione con dieci persone. Ogni partecipante deve prestare attenzione a tutti gli altri contemporaneamente: ci sono 100 interazioni da gestire. Ora immagina la stessa riunione con 100 persone: le interazioni diventano 10.000. Non è il doppio, non è il triplo — è cento volte di più. Questo è esattamente ciò che succede dentro un Transformer quando allunghi il contesto.

Il meccanismo di attenzione, che è il cuore di ogni Large Language Model, funziona confrontando ogni token con tutti gli altri token nel contesto. Quando raddoppi il numero di token da elaborare, il numero di confronti non raddoppia: si **quadruplica**. Questa crescita quadratica — O(n²) — è il vincolo fondamentale che determina quanta memoria serve, quanto costa l'inferenza, e perché i contesti lunghi sono così costosi.

### La matrice di attenzione

Per ogni layer di un Transformer, il meccanismo di attenzione produce una matrice n×n, dove n è il numero di token nel contesto. Ogni cella di questa matrice contiene un valore che rappresenta quanta "attenzione" un token presta a un altro. Con 1.000 token, la matrice ha un milione di celle. Con 4.000 token, ne ha sedici milioni. Con 128.000 token — il contesto di un modello moderno — ne ha oltre sedici miliardi.

Nei modelli decoder-only (GPT, Claude, Llama), la metà superiore della matrice è mascherata dalla **causal mask**: ogni token può guardare solo i token precedenti, mai quelli futuri. Questo crea un triangolo inferiore pieno e un triangolo superiore vuoto. Tuttavia, in molte implementazioni naive, la matrice viene comunque allocata interamente in memoria prima della mascheratura.

### Tre componenti, tre regimi di crescita

Quando un modello è in esecuzione, la memoria GPU è occupata da tre cose distinte:

| Componente | Crescita | Caratteristica |
|---|---|---|
| **Pesi del modello** | O(1) — costante | I miliardi di parametri vengono caricati una volta e non cambiano con il contesto |
| **KV Cache** | O(n) — lineare | Cresce proporzionalmente al numero di token, ma con un coefficiente molto alto |
| **Matrice di attenzione** | O(n²) — quadratica | Il collo di bottiglia computazionale |

I pesi di un modello come Llama-3 70B occupano circa 140 GB in fp16. Sono fissi: che tu dia al modello 10 token o 100.000, i pesi restano uguali. Il KV Cache, invece, cresce linearmente con il contesto, ma il coefficiente è enorme perché dipende dal numero di layer, dal numero di head e dalla dimensione di ogni head. La matrice di attenzione è la componente che cresce più rapidamente.

### Il KV Cache: il vero costo in produzione

Un equivoco comune è pensare che la matrice di attenzione sia il problema principale. In realtà, durante l'inferenza, il vero collo di bottiglia è spesso il **KV Cache** — la memoria che conserva i vettori Key e Value già calcolati per ogni token precedente.

La formula del KV Cache è:

```
KV Cache = 2 × L × H × n × d_head × sizeof(dtype)
```

Dove L è il numero di layer, H il numero di head per Key/Value, n il numero di token, d_head la dimensione di ogni head, e sizeof(dtype) la dimensione in byte del tipo di dato (2 per fp16).

Per Llama-3 70B (L=80, H=64, d_head=128), con 128K token di contesto, il solo KV Cache occupa circa **160 GB di VRAM** — più del doppio del modello stesso. Questo è il motivo per cui servire contesti lunghi con modelli open source richiede infrastrutture GPU importanti.

### Le ottimizzazioni: come affrontare il problema

Il problema quadratico non è insormontabile. Esistono diverse strategie, ognuna con i propri trade-off:

**FlashAttention** non riduce il numero di operazioni matematiche (la complessità resta O(n²) in FLOPs), ma minimizza i trasferimenti tra la memoria principale della GPU (HBM) e la cache on-chip (SRAM). Risultato: stessa qualità, 3-8 volte più veloce, memoria praticamente lineare.

**Grouped Query Attention (GQA)**, usata in Llama-3, fa condividere le stesse Key e Value a più query head. Il KV Cache si riduce di 4-8 volte senza un degrado significativo della qualità.

**Sliding Window Attention**, usata in Mistral, limita ogni token a guardare solo i w token precedenti. Eccellente per compiti locali come la sintesi di paragrafi, meno efficace per ragionamenti che richiedono informazioni distanti nel contesto.

**State Space Models (Mamba, RWKV)** raggiungono una vera complessità O(n) e funzionano bene su contesti molto lunghi, ma il loro "recall" su informazioni lontane nel contesto è peggiore rispetto alla full attention.

---

## 5 Cose da Ricordare

- **La crescita è quadratica, non lineare**: raddoppiare il contesto quadruplica il costo della matrice di attenzione. Questa è una conseguenza matematica del confronto ogni-con-ogni tra token.
- **In produzione il KV Cache domina**: i vettori Key e Value precalcolati occupano più memoria della matrice di attenzione stessa, soprattutto nei modelli con molti layer.
- **I pesi del modello sono fissi**: non importa quanto è lungo il contesto, i miliardi di parametri del modello occupano sempre la stessa quantità di memoria.
- **FlashAttention non cambia la complessità algoritmica**: riduce i trasferimenti di memoria, non il numero di operazioni. La complessità O(n²) resta, ma la velocità pratica migliora enormemente.
- **Non esiste una soluzione perfetta**: ogni ottimizzazione (GQA, sliding window, SSM) guadagna efficienza rinunciando a qualcosa — generalità, recall a lunga distanza o qualità del ragionamento.

---

## 3 Cose da Fare

1. **Calcola il KV Cache di un modello**: prendi i parametri di un modello open source (layer, head, d_head) dalla sua model card su Hugging Face e usa la formula `2 × L × H × n × d_head × 2 byte` per calcolare quanta VRAM serve a diversi livelli di contesto (4K, 32K, 128K token).

2. **Confronta i costi API per contesti diversi**: vai sul pricing di OpenAI o Anthropic e calcola quanto costa elaborare 1.000, 10.000 e 100.000 token di input. Verifica se il prezzo cresce linearmente o più che linearmente con la lunghezza del contesto.

3. **Sperimenta con la lunghezza del contesto**: prendi un documento lungo e chiedi a un LLM domande su informazioni all'inizio, nel mezzo e alla fine. Osserva se la qualità delle risposte degrada con la distanza. Questo ti dà un'intuizione pratica sui limiti del meccanismo di attenzione.

---

## Domande Frequenti

**Quanto conta davvero il contesto lungo in pratica?**
Dipende dal compito. Per sistemi RAG con chunk corti, contesti di 4K-8K token sono spesso sufficienti. Per l'analisi di documenti lunghi, codebase intere o conversazioni di ore, contesti da 32K-200K token fanno una differenza significativa.

**Claude e GPT-4 come gestiscono 100K+ token?**
Usano combinazioni di FlashAttention, GQA e ottimizzazioni proprietarie (batching, gestione del KV Cache). Il costo computazionale resta alto e si riflette nei prezzi API: i token di input in contesti molto lunghi possono costare di più.

**Perché non si usano sempre i modelli SSM come Mamba?**
Il recall preciso su informazioni distanti nel contesto è ancora peggiore rispetto alla full attention. Per molti compiti di ragionamento complesso, questa differenza è significativa. I modelli ibridi (che combinano attention e SSM) sono un'area di ricerca molto attiva.

**Il KV Cache è condiviso tra utenti diversi?**
In alcuni sistemi sì. Il Prompt Caching di Anthropic e server come vLLM possono condividere il KV Cache del system prompt tra utenti diversi che usano lo stesso prompt. I messaggi utente restano sempre privati.

---

## Mettiti alla Prova

**1. Se un modello ha un contesto di 8.000 token, quante celle ha la matrice di attenzione per un singolo layer e una singola head?**

a) 8.000
b) 16.000
c) 64.000.000
d) 8.000.000

**2. Quale componente della memoria GPU NON cresce con il numero di token nel contesto?**

a) Il KV Cache
b) La matrice di attenzione
c) I pesi del modello
d) Tutti crescono con il contesto

**3. FlashAttention migliora le prestazioni principalmente perché:**

a) Riduce il numero di operazioni matematiche da O(n²) a O(n)
b) Elimina la necessità del KV Cache
c) Minimizza i trasferimenti di dati tra memoria principale (HBM) e cache on-chip (SRAM)
d) Usa meno head di attenzione

**4. Perché il KV Cache di Llama-3 70B con 128K token occupa più memoria del modello stesso?**

a) Perché il KV Cache include anche i pesi del modello
b) Perché i vettori K e V devono essere memorizzati per ogni token, per ogni layer, per ogni head
c) Perché il KV Cache usa fp32 mentre il modello usa fp16
d) Perché il KV Cache cresce in modo quadratico

**5. Qual è il principale svantaggio della Sliding Window Attention?**

a) Non è compatibile con i modelli decoder-only
b) Richiede più memoria della full attention
c) Ogni token può guardare solo un numero limitato di token precedenti, perdendo informazioni distanti
d) Funziona solo durante il training, non durante l'inferenza
