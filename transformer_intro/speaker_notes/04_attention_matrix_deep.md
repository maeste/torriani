# L'Attention Matrix — Deep Dive
> File di supporto alla presentazione: `attention_matrix_deep.jsx`

---

## Panoramica della slide

Questa visualizzazione risponde a tre domande precise sull'attention matrix: **dove vive fisicamente**, **come funziona la formula matematica**, e **perché la complessità è quadratica**. È la slide più tecnica del set e si presta a pubblici con background in ML o ingegneria del software.

---

## Struttura della presentazione

### Tab 1 — Dove vive la matrice

**Il punto di partenza:**

> "La prima cosa da chiarire è che l'attention matrix non viene conservata permanentemente. Non fa parte del KV Cache. Viene calcolata al volo durante ogni forward pass e poi scartata. Quello che rimane è il KV Cache — K e V precalcolati. La matrice degli attention scores è una struttura temporanea, e come viene gestita dipende molto dalla fase in cui ci troviamo."

**Le tre fasi — come presentarle:**

**Prefill:**
> "Durante il prefill, elaboriamo l'intera sequenza in parallelo. La matrice n×n degli scores viene calcolata, ma con FlashAttention non viene mai scritta tutta nella memoria principale (HBM). Viene processata a blocchi nella cache on-chip (SRAM), che è molto più veloce ma molto più piccola — circa 20MB su un A100 contro 80GB di HBM. Questo è il principale contributo di FlashAttention: non riduce le operazioni matematiche, riduce i trasferimenti di memoria."

**Decode:**
> "Durante la generazione token per token, la situazione cambia radicalmente. Il nuovo token deve fare attention su tutti i token precedenti, ma produce un solo vettore di output. La matrice degenera a 1×n — un singolo vettore di scores. Il collo di bottiglia non è più il calcolo, ma la lettura: bisogna leggere dall'HBM tutti i K e V del KV Cache per ogni step di generazione."

**Training:**
> "Nel training è qui che le cose diventano davvero pesanti. Per calcolare i gradienti nel backward pass, la matrice n×n deve essere materializzata completamente in HBM. Con n=4096, 32 heads e fp32, solo gli scores di un singolo layer occupano circa 8 GB. Senza ottimizzazioni come gradient checkpointing, si va in OOM molto presto."

**La gerarchia di memoria:**

Spiega la tabella della gerarchia GPU in modo semplice:

- **HBM (High Bandwidth Memory)**: la VRAM principale. Lenta ma grande (80GB su A100). Qui vivono i pesi, il KV Cache, e in training la matrice degli scores.
- **SRAM (on-chip cache)**: velocissima ma minuscola (~20MB). FlashAttention cerca di tenere i calcoli qui il più possibile.
- **Registri/L1**: pochi kilobyte, velocità massima. Solo i valori in elaborazione istantanea.

---

### Tab 2 — Formula passo per passo

Questo tab è il più ricco. Usa l'interattività per rallentare e spiegare ogni componente.

**Come introdurre la formula:**

> "La formula dell'attention può sembrare intimidatoria, ma ogni componente ha un significato preciso e intuitivo. Vi faccio cliccare su ogni pezzo."

**Q·Kᵀ — il dot product:**

> "Query e Key sono due vettori per ogni token. Il prodotto scalare (dot product) misura quanto sono 'allineati' nello spazio vettoriale. Se Q di un token e K di un altro token puntano nella stessa direzione, il prodotto è alto → alta attenzione. Se puntano in direzioni opposte, il prodotto è basso o negativo → bassa attenzione. Il risultato è la matrice n×n degli scores."

La visualizzazione delle shapes è fondamentale: `(n×d) · (d×n) = (n×n)`. È qui che nasce la complessità quadratica.

**/ √d — lo scaling:**

> "Con d_head grande, i dot product tendono ad avere magnitudine alta, il che porta la softmax a saturare verso 0 e 1 — e i gradienti diventano quasi zero, il che rende il training difficile. Dividere per la radice quadrata di d_head normalizza la varianza. È un trick matematico elegante e semplice."

**softmax(·) — la normalizzazione:**

> "Il softmax trasforma gli scores in una distribuzione di probabilità. Ogni riga della matrice somma a 1. Il token i 'distribuisce la sua attenzione' tra tutti gli altri: può concentrarsi su uno o due token, o distribuirsi uniformemente, o qualsiasi cosa nel mezzo. Con la causal mask nei decoder, i token futuri vengono mascherati con meno infinito prima del softmax, quindi ricevono peso zero."

**· V — la weighted sum:**

> "Questa è la parte che produce l'output effettivo. I pesi di attenzione — la matrice n×n normalizzata — vengono usati per fare una media pesata dei Values. L'output di ogni token è una combinazione lineare delle informazioni di tutti gli altri token, pesata da quanto quel token era 'attento' a ciascuno. Ecco come il token 'gatto' in 'il gatto nero dorme' può incorporare informazioni sia da 'nero' che da 'dorme'."

---

### Tab 3 — Complessità O(n²)

**L'argomento matematico in linguaggio semplice:**

> "La complessità quadratica non è una scelta di design — è una conseguenza matematica. Quando moltiplicate una matrice n×d per una matrice d×n, il risultato è sempre n×n. Con n token e d dimensioni: n² prodotti scalari, ognuno da d moltiplicazioni. Non esiste modo di calcolare questo prodotto con meno di O(n²) operazioni se volete il risultato esatto per ogni coppia di token."

**La heatmap interattiva:**

Usa lo slider per mostrare visivamente la crescita:

- n=4: 16 celle, banale.
- n=8: 64 celle.
- n=16: 256 celle.
- n=32: 1024 celle.

Ogni raddoppio di n → quadruplicazione della matrice. Non è qualcosa di percepibile con n=10, ma con n=1000 si parla di un milione di celle per layer per head.

**La tabella del "raddoppio":**

| n | n² | Δ | Memoria (32h, 1 layer, fp16) |
|---|---|---|---|
| 512 | 262K | — | ~8 MB |
| 1K | 1M | ×4 | ~32 MB |
| 2K | 4M | ×4 | ~128 MB |
| 4K | 16M | ×4 | ~512 MB |
| 8K | 64M | ×4 | ~2 GB |
| 16K | 262M | ×4 | ~8 GB |
| 32K | 1B | ×4 | ~32 GB 💀 |

> "Con n=32K token, solo la matrice degli scores per un singolo layer in training occupa 32 GB. Su 80 layer, stiamo parlando di 2.5 TB. Ecco perché il training su contesti lunghi è così costoso e complesso."

**Chiusura — il trade-off fondamentale:**

> "La complessità quadratica non è un bug — è la conseguenza della full attention, che permette a ogni token di avere accesso a ogni altro token. Le alternative (linear attention, Mamba, sliding window) approssimano o limitano questo accesso globale, guadagnando efficienza ma rinunciando a qualcosa di espressività. Non c'è un pranzo gratis: la scelta dipende sempre dal task."

---

## Domande frequenti dal pubblico

**"FlashAttention riduce davvero la complessità quadratica?"**
No — riduce i trasferimenti di memoria tra HBM e SRAM, non il numero di operazioni matematiche. Il numero di FLOPs è lo stesso. Il miglioramento è in velocità (3-8x) e memoria pratica usata, ma la complessità algoritmica rimane O(n²).

**"Con il causal mask, calcoliamo solo metà della matrice?"**
Matematicamente sì — solo il triangolo inferiore è significativo. Ma l'ottimizzazione dipende dall'implementazione. Con FlashAttention il causal mask è gestito in modo efficiente, ma la matrice viene comunque allocata nella sua interezza (n×n) in implementazioni naive.

**"Qual è il limite pratico di n per il training oggi?"**
Con FlashAttention 2/3 e gradient checkpointing, si arriva a n=32K-64K su GPU singola (A100/H100). Contesti più lunghi richiedono tecniche di sequence parallelism su più GPU.

---

## Note tecniche per il presentatore

- La heatmap degli scores è simulata con valori random — i pattern di attention reali variano molto per modello e layer.
- I calcoli della memoria assumono fp16 (2 byte) e 32 heads. In training fp32, moltiplicate per 2.
- La formula `O(n² · d_head)` per `Q·Kᵀ` descrive i FLOPs totali; la formula `O(n²)` descrive la memoria per la matrice risultante (indipendente da d_head).
