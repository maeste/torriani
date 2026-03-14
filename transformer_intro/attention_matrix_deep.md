# L'Attention Matrix Deep Dive: Dove Vive, Come Funziona, Perché Costa

## Dentro la formula che fa funzionare i LLM

Ogni volta che un Large Language Model elabora del testo, al cuore del suo funzionamento c'è un'operazione matematica precisa: il calcolo della **matrice di attenzione**. Questa matrice è ciò che permette a ogni token di "guardare" tutti gli altri token e decidere quali sono rilevanti per il suo significato. In questa sezione entriamo nei dettagli: dove vive fisicamente questa matrice nella memoria della GPU, come funziona la formula passo per passo, e perché la complessità quadratica è una conseguenza matematica inevitabile.

### Dove vive la matrice: la gerarchia di memoria GPU

La prima cosa da chiarire è che la matrice di attenzione **non viene conservata permanentemente**. Non fa parte del KV Cache. Viene calcolata al volo durante ogni forward pass e poi scartata. Ma *dove* viene calcolata fa una differenza enorme in termini di prestazioni.

Una GPU moderna come l'A100 ha una gerarchia di memoria a tre livelli:

| Livello | Nome | Capacità | Velocità | Ruolo |
|---|---|---|---|---|
| 1 | **HBM** (High Bandwidth Memory) | ~80 GB | ~2 TB/s | VRAM principale: pesi, KV Cache, attivazioni |
| 2 | **SRAM** (on-chip cache) | ~20 MB | ~19 TB/s | Cache velocissima per calcoli intermedi |
| 3 | **Registri/L1** | ~KB | Massima | Valori in elaborazione istantanea |

La matrice di attenzione, essendo temporanea, dovrebbe idealmente essere calcolata e consumata nella SRAM senza mai toccare la HBM. Questo è esattamente ciò che fa **FlashAttention**: processa la matrice a blocchi nella SRAM, evitando di materializzarla interamente nella memoria principale.

Il comportamento varia nelle tre fasi di vita del modello:

**Prefill (inferenza)**: la matrice n×n viene calcolata in parallelo su tutta la sequenza. Con FlashAttention, i blocchi vengono processati nella SRAM senza materializzazione in HBM. Il costo è O(n²) in FLOPs ma O(n) in memoria pratica.

**Decode (inferenza)**: si genera un token alla volta. La "matrice" degenera a un singolo vettore 1×n — gli score di attenzione del nuovo token verso tutti i precedenti. Il collo di bottiglia non è più il calcolo, ma la **lettura**: bisogna leggere dall'HBM tutti i K e V del KV Cache per ogni step di generazione.

**Training**: la matrice n×n deve essere materializzata completamente in HBM per calcolare i gradienti nel backward pass. Con n=4096, 32 head e fp32, solo gli score di un singolo layer occupano circa 8 GB. Su 80 layer, siamo a 640 GB solo per gli score — ecco perché il training su contesti lunghi richiede gradient checkpointing e parallelismo su più GPU.

### La formula passo per passo

La formula dell'attenzione è:

```
Attention(Q, K, V) = softmax(Q · Kᵀ / √d_head) · V
```

Sembra compatta, ma ogni componente ha un significato preciso.

**Q · Kᵀ — il dot product**: Query e Key sono matrici di forma (n × d_head). Il loro prodotto è una matrice (n × n). Ogni cella [i, j] contiene il prodotto scalare tra la query del token i e la key del token j: misura quanto sono "allineati" nello spazio vettoriale. Se puntano nella stessa direzione, il prodotto è alto → alta attenzione. Se sono ortogonali, il prodotto è zero → nessuna attenzione.

La cosa fondamentale sulle dimensioni: `(n × d) · (d × n) = (n × n)`. È qui che nasce la complessità quadratica. Non è una scelta di design, è una conseguenza algebrica del moltiplicare due matrici con n righe/colonne.

**/ √d_head — lo scaling**: con d_head grande, i dot product tendono ad avere magnitudine alta, il che porta la softmax a saturare verso 0 e 1. I gradienti diventano quasi zero e il training si blocca. Dividere per √d_head normalizza la varianza dei punteggi, mantenendo la softmax in una zona dove i gradienti sono utili. Con d_head = 128, si divide per √128 ≈ 11.3.

**softmax(·) — la normalizzazione**: trasforma gli score in una distribuzione di probabilità. Ogni riga della matrice somma a 1. Il token i "distribuisce la sua attenzione" tra tutti gli altri: può concentrarsi su uno o due token oppure distribuirsi uniformemente. Con la causal mask nei modelli decoder, i token futuri vengono mascherati con -∞ prima della softmax, quindi ricevono peso zero.

**· V — la somma pesata**: i pesi di attenzione normalizzati vengono usati per calcolare una media pesata dei Value. L'output di ogni token è una combinazione lineare delle informazioni di tutti gli altri token, pesata dall'attenzione. Ecco come il token "gatto" nella frase "il gatto nero dorme" può incorporare informazioni sia da "nero" che da "dorme".

### Perché O(n²) è inevitabile

La complessità quadratica non è un bug, non è una scelta di design sbagliata — è una **conseguenza matematica** del fatto che ogni token confronta la sua query con la key di ogni altro token.

Quando moltiplichi una matrice (n × d) per una matrice (d × n), il risultato è sempre (n × n). Con n token e d dimensioni: n² prodotti scalari, ognuno fatto di d moltiplicazioni. Il costo totale è O(n² · d). Non esiste modo di calcolare questo prodotto con meno di O(n²) operazioni se vuoi il risultato esatto per ogni coppia di token.

I numeri concreti rendono l'idea della crescita:

| n (token) | n² (celle) | Memoria (32h, 1 layer, fp16) |
|---|---|---|
| 512 | 262K | ~8 MB |
| 1K | 1M | ~32 MB |
| 2K | 4M | ~128 MB |
| 4K | 16M | ~512 MB |
| 8K | 64M | ~2 GB |
| 16K | 262M | ~8 GB |
| 32K | 1B | ~32 GB |

Ogni raddoppio di n quadruplica la matrice. Con n = 32K token, solo la matrice degli score per un singolo layer in training occupa 32 GB. Su 80 layer, siamo a 2.5 TB. Questo è il motivo per cui il training su contesti lunghi è così costoso.

### Il trade-off fondamentale

La complessità quadratica è il prezzo della **full attention** — la possibilità per ogni token di avere accesso a ogni altro token. Le alternative (linear attention, Mamba, sliding window) approssimano o limitano questo accesso globale, guadagnando efficienza ma rinunciando a qualcosa in espressività.

Non c'è un pranzo gratis: la scelta dipende sempre dal task. Per un chatbot con domande brevi, la sliding window può bastare. Per l'analisi di un documento legale di 200 pagine dove un dettaglio a pagina 3 è cruciale per comprendere la clausola a pagina 180, serve la full attention.

---

## 5 Cose da Ricordare

- **La matrice di attenzione è temporanea**: viene calcolata al volo e poi scartata, non viene conservata nel KV Cache. FlashAttention la processa a blocchi nella SRAM senza materializzarla in HBM.
- **La complessità O(n²) è una conseguenza matematica**: nasce dal prodotto di matrici (n×d)·(d×n) = (n×n). Non è evitabile se si vuole full attention esatta.
- **Lo scaling per √d_head previene la saturazione**: senza questa divisione, la softmax produrrebbe distribuzioni quasi binarie con gradienti inutili per il training.
- **Decode e prefill hanno profili di costo molto diversi**: nel prefill la matrice è piena n×n; nel decode degenera a un vettore 1×n, e il collo di bottiglia diventa la lettura del KV Cache.
- **Ogni raddoppio del contesto quadruplica la matrice**: da 8K a 16K token, la matrice passa da 2 GB a 8 GB per layer. Questa è la ragione fondamentale dei limiti di contesto.

---

## 3 Cose da Fare

1. **Calcola le dimensioni della matrice di attenzione**: prendi un modello con parametri noti (es. 32 head, d_head = 128) e calcola quanta memoria occupa la matrice n×n per diversi valori di n (1K, 4K, 16K, 64K). Usa la formula: `n² × num_heads × sizeof(fp16)` byte. Moltiplica per il numero di layer per avere il totale.

2. **Leggi il paper FlashAttention**: il paper originale (Dao et al., 2022) è sorprendentemente leggibile. Concentrati sulla sezione che spiega il tiling — come la matrice viene divisa in blocchi che entrano nella SRAM — e sulle figure che mostrano il risparmio di trasferimenti HBM.

3. **Sperimenta con contesti diversi**: usa un modello locale (Ollama) e misura il tempo di risposta con contesti crescenti (1K, 4K, 16K, 32K token). Verifica se il tempo cresce più che linearmente. Questo ti darà un'intuizione pratica della complessità quadratica.

---

## Domande Frequenti

**FlashAttention riduce davvero la complessità quadratica?**
No — riduce i trasferimenti di memoria tra HBM e SRAM, non il numero di operazioni matematiche. Il numero di FLOPs è identico. Il miglioramento è in velocità (3-8x) e memoria pratica usata, ma la complessità algoritmica resta O(n²).

**Con la causal mask, calcoliamo solo metà della matrice?**
Matematicamente sì — solo il triangolo inferiore è significativo. Ma l'ottimizzazione dipende dall'implementazione. FlashAttention gestisce la causal mask in modo efficiente, evitando calcoli inutili sul triangolo superiore.

**Qual è il limite pratico di n per il training oggi?**
Con FlashAttention 2/3 e gradient checkpointing, si arriva a n = 32K-64K su GPU singola (A100/H100). Contesti più lunghi richiedono tecniche di sequence parallelism su più GPU.

**Perché durante il decode il collo di bottiglia è la lettura, non il calcolo?**
Perché nel decode si genera un token alla volta: la "matrice" è un vettore 1×n, il calcolo è O(n). Ma per calcolare quel vettore bisogna leggere tutti i K e V del KV Cache dall'HBM, e la bandwidth della HBM diventa il fattore limitante. Il modello è "memory-bound", non "compute-bound".

---

## Mettiti alla Prova

**1. La matrice di attenzione viene conservata nel KV Cache per essere riutilizzata?**

a) Sì, è la parte principale del KV Cache
b) Sì, ma solo durante il training
c) No, viene calcolata al volo e poi scartata; nel KV Cache si conservano solo K e V
d) Dipende dall'implementazione del modello

**2. Perché nella formula dell'attenzione si divide per √d_head?**

a) Per ridurre la complessità da O(n²) a O(n)
b) Per normalizzare la varianza dei dot product e impedire che la softmax saturi
c) Per ridurre la dimensione della matrice risultante
d) Per rendere il calcolo compatibile con la GPU

**3. Se un modello ha un contesto di 16K token, quante volte è più grande la sua matrice di attenzione rispetto a un contesto di 4K token?**

a) 2 volte
b) 4 volte
c) 8 volte
d) 16 volte

**4. Durante la fase di decode (generazione token per token), qual è il principale collo di bottiglia?**

a) Il calcolo della matrice di attenzione n×n completa
b) La lettura dei vettori K e V del KV Cache dalla HBM
c) La funzione softmax
d) La proiezione Q, K, V

**5. FlashAttention migliora le prestazioni del calcolo di attenzione principalmente perché:**

a) Usa meno head di attenzione
b) Approssima il risultato del prodotto Q·Kᵀ con meno operazioni
c) Processa la matrice a blocchi nella SRAM on-chip, riducendo i trasferimenti da/verso la HBM
d) Elimina la necessità della causal mask
