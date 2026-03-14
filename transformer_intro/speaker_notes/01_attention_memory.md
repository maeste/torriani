# Memoria e Contesto nei Transformer
> File di supporto alla presentazione: `attention_memory.jsx`

---

## Panoramica della slide

Questa visualizzazione introduce il problema fondamentale dei Transformer: **perché raddoppiare il contesto non significa raddoppiare la memoria**. È il punto di ingresso ideale per un pubblico tecnico che conosce i LLM ma non ha ancora ragionato sui costi computazionali dell'inferenza.

---

## Struttura della presentazione

### 1. L'analogia — Come aprire il tema

Inizia con l'analogia della **riunione con n persone**. È immediatamente intuitiva anche per chi non ha background matematico:

> "Immaginate una riunione in cui ogni partecipante deve prestare attenzione a tutti gli altri contemporaneamente. Con 10 persone avete 100 interazioni da gestire. Con 100 persone ne avete 10.000. Non è lineare — è quadratico. Ecco cosa fa il meccanismo di attention nei Transformer."

Questo prepara l'audience a comprendere il motivo geometrico della crescita, prima ancora di mostrare la formula.

---

### 2. La matrice di attenzione — Cosa mostrare

Lo **slider interattivo** è il cuore di questa slide. Usalo in diretta per dimostrare l'effetto:

- Parti con n=8: la matrice è piccola, gestibile.
- Porta n a 32, poi a 64: la matrice esplode visivamente.
- Sottolinea che ogni cella corrisponde a un valore che deve essere calcolato e tenuto in memoria.

**Messaggio chiave da veicolare:**

> "La matrice di attenzione ha n×n celle. Raddoppio n → la matrice quadruplica. Con n=1.000 token ho un milione di valori. Con n=4.000 token ne ho sedici milioni — solo per questa matrice, solo per un layer, solo per una head."

Il triangolo inferiore (causal mask) merita una spiegazione: nei modelli decoder-only (GPT, Claude, Llama) ogni token può "guardare" solo il passato, non il futuro. Il triangolo superiore viene mascherato con -∞ prima del softmax, ma **la matrice viene comunque allocata interamente in memoria**.

---

### 3. Il grafico della crescita — Tre componenti a confronto

Questo grafico è molto efficace per distinguere tre regimi di crescita:

| Componente | Crescita | Caratteristica |
|---|---|---|
| Pesi del modello | O(1) | Fissi, caricati una volta |
| KV Cache | O(n) | Lineare, ma con coefficiente alto |
| Attention Matrix | O(n²) | Il collo di bottiglia |

**Cosa dire al pubblico:**

> "I pesi del modello — i miliardi di parametri di Llama o GPT — non cambiano. Sono fissi. Il KV Cache cresce linearmente con il numero di token, ma ha un coefficiente molto grande (dipende dal numero di layer, heads e dalla dimensione di ogni head). La matrice di attenzione, invece, cresce in modo quadratico: è la curva che vedete salire molto più ripidamente delle altre."

---

### 4. Il KV Cache — Il vero costo in produzione

Questa sezione affronta un equivoco comune: molti pensano che il problema principale sia la matrice di attenzione, ma **in inferenza il vero collo di bottiglia è il KV Cache**.

Il grafico mostra due curve:
- **KV Cache (MB)**: cresce linearmente, ma con un coefficiente enorme.
- **Attn Matrix (MB)**: in training cresce molto più velocemente, in inferenza con FlashAttention è gestita a blocchi.

**Esempio concreto da citare:**

> "Llama-3 70B ha 80 layer, 64 heads, d_head=128. Con 128K token di contesto, il solo KV Cache occupa circa 160 GB di VRAM. Più del doppio del modello stesso caricato in fp16. Questo è il motivo per cui servire contesti lunghi con LLM open source richiede infrastrutture GPU importanti."

---

### 5. Le ottimizzazioni — Il panorama attuale

Chiudi questa sezione con una panoramica delle strategie di ottimizzazione. Il messaggio deve essere:

> "Non siamo bloccati sul problema quadratico. Ci sono diverse soluzioni, ognuna con trade-off diversi. La scelta dipende dal caso d'uso."

**FlashAttention**: non riduce il numero di operazioni matematiche (ancora O(n²) in FLOPs) ma minimizza i trasferimenti tra memoria GPU (HBM) e cache on-chip (SRAM). Risultato: stessa qualità, ~3-8x più veloce, memoria quasi lineare in pratica.

**Grouped Query Attention (GQA)**: usato in Llama-3. Più query heads condividono le stesse K e V → KV Cache ridotto di 4-8x senza degrado significativo della qualità.

**Sliding Window Attention**: ogni token guarda solo i w token precedenti. Usato in Mistral. Ottimo per task locali (summarization di paragrafi), meno efficace per task che richiedono ragionamento globale.

**SSM (Mamba, RWKV)**: vera complessità O(n), ottime performance su contesti molto lunghi, ma il "recall" su informazioni distanti nel contesto è peggiore della full attention.

---

## Domande frequenti dal pubblico

**"Quanto conta davvero il contesto lungo in pratica?"**
Dipende fortemente dal task. Per RAG con chunk corti, contesti di 4K-8K sono spesso sufficienti. Per analisi di documenti lunghi, codebases intere o conversazioni multi-ora, contesti da 32K-200K fanno la differenza.

**"Claude e GPT-4 come gestiscono 100K+ token?"**
Usano combinazioni di FlashAttention, GQA e ottimizzazioni proprietarie di sistema (batching, KV cache management). Il costo computazionale rimane alto — si riflette nei prezzi API per i contesti lunghi.

**"Perché non si usa sempre Mamba/SSM allora?"**
Il recall preciso su informazioni distanti nel contesto è ancora peggiore rispetto alla full attention. Per molti task di ragionamento complesso, questa differenza è significativa.

---

## Note tecniche per il presentatore

- La slide usa **Recharts** per i grafici — funziona come artifact React nel browser.
- I dati del KV Cache sono calcolati con parametri tipici di Llama-3 70B (L=32, H=32, d_head=128).
- La formula `O(n²)` si riferisce alla complessità in **memoria**, non solo in FLOPs — il prodotto `Q·Kᵀ` produce una matrice che deve essere allocata.
