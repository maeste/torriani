# Layers, Heads & d_head — Anatomia del Transformer
> File di supporto alla presentazione: `transformer_anatomy.jsx`

---

## Panoramica della slide

Questa visualizzazione spiega i tre parametri fondamentali che determinano la dimensione e le capacità di un Transformer: **layers**, **heads** e **d_head**. È progettata per dare un modello mentale solido a chi deve poi ragionare sui costi del KV Cache e sulle scelte architetturali dei modelli.

---

## Struttura della presentazione

### Tab 1 — d_model e heads: il vettore di un token

**Come introdurre il concetto:**

> "Ogni parola — o più precisamente ogni token — viene rappresentata come un lungo vettore di numeri. Questo vettore ha dimensione `d_model`. In Llama-3 8B è 4096: ogni token è un punto in uno spazio a 4096 dimensioni."

Il visual mostra un vettore colorato a blocchi, dove ogni colore rappresenta una head. Il messaggio visivo è immediato: **il vettore viene spezzato in sottogruppi paralleli**.

**La relazione fondamentale da sottolineare:**

```
d_model = heads × d_head
```

Con d_model=4096 e 32 heads → d_head=128. Non è una scelta casuale: si è osservato empiricamente che un rapporto d_head tra 64 e 128 funziona bene per la maggior parte dei modelli.

**Analogia da usare:**

> "Immaginate un team di analisti che devono esaminare un documento. Invece di farne leggere l'intero documento a una sola persona, lo dividete in sezioni specializzate: un analista studia la grammatica, uno la semantica, uno le relazioni tra entità. Ognuno lavora su una porzione del vettore — la sua head — e poi i risultati vengono ricombinati."

---

### Tab 2 — Multi-Head Attention step by step

Questo tab è il più importante per la comprensione del meccanismo. Guida il pubblico attraverso i 5 step in modo sequenziale.

**Step 1 — Input**
I token sono già stati convertiti in vettori (embedding + positional encoding). A questo punto il modello non "vede" parole, vede numeri.

**Step 2 — Proiezione Q, K, V**
Ogni head proietta l'input in tre spazi diversi tramite matrici di proiezione apprese:
- **Query (Q)**: "cosa sto cercando?"
- **Key (K)**: "cosa offro agli altri token?"
- **Value (V)**: "qual è il mio contenuto reale?"

> "È come se ogni token indossasse tre cappelli diversi: uno da interrogante (Query), uno da risposta a un'interrogazione (Key) e uno da portatore di informazione (Value)."

**Step 3 — Attention Scores**
Il dot product Q·Kᵀ misura la "compatibilità" tra la query di un token e la key di un altro. Il risultato è la matrice n×n che abbiamo visto nella prima slide.

**Step 4 — Softmax + weighted sum**
I punteggi diventano probabilità. Il token non "riceve" informazioni da un solo token — riceve una **media pesata** delle informazioni di tutti.

**Step 5 — Concatenazione e proiezione finale**
Gli output di tutte le heads vengono concatenati e proiettati nello spazio originale d_model. Ogni head ha catturato relazioni diverse → la fusione è ricca di informazioni.

---

### Tab 3 — Lo stack di layer

**Come spiegare i layer:**

> "Un singolo strato di attention è potente ma limitato. Impilando 32, 48, 80 strati, ogni strato può raffinarsi su ciò che il precedente ha prodotto. I layer bassi tendono a catturare relazioni sintattiche e locali. I layer alti catturano semantica, ragionamento e contesto ampio."

**L'impatto sui costi — collegamento con il KV Cache:**

La formula del KV Cache include il numero di layer come moltiplicatore diretto:

```
KV Cache = 2 × L × H × n × d_head × sizeof(fp16)
```

Ogni layer ha il suo blocco di attention con le sue K e V. Più layer → KV Cache proporzionalmente più grande. Questo è il motivo per cui i modelli grandi (70B, 405B) hanno KV Cache enormi anche a parità di contesto.

**Hover interattivo:** incoraggia il pubblico a passare il mouse sui layer per vedere la struttura interna (Multi-Head Attention → Add&Norm → Feed Forward → Add&Norm).

---

### Tab 4 — Intuizione finale: il cheat sheet

Questo tab chiude il cerchio con la tabella dei parametri reali. È utile per ancorare i numeri a modelli concreti.

**Come leggere la tabella dei KV Cache:**

| Modello | Parametri chiave | KV Cache @ ctx |
|---|---|---|
| GPT-2 small | L=12, H=12, d_h=64 | ~0.1 GB @ 1K |
| Llama-3 8B | L=32, H=32, d_h=128 | ~2 GB @ 8K |
| Llama-3 70B | L=80, H=64, d_h=128 | ~20 GB @ 8K |
| Claude-style @ 100K | L=48, H=64, d_h=128 | ~75 GB @ 100K |

> "Notate come il KV Cache di Llama-3 70B con 8K di contesto sia già 20 GB. Se volete servire 100 richieste in parallelo (batch size=100), moltiplicatelo per 100: 2 TB di VRAM solo per il cache. Questo spiega i costi dell'inferenza distribuita."

---

## Domande frequenti dal pubblico

**"Perché non usare una sola head grande invece di tante heads piccole?"**
Sperimentalmente, le multi-head attention imparano relazioni diverse e complementari — non è ridondanza, è specializzazione. Una sola head grande tenderebbe a dominare un unico tipo di relazione.

**"Il numero di heads è sempre uguale in tutti i layer?"**
In architetture standard sì. Alcune architetture recenti usano heads diverse per layer diversi, ma è relativamente raro.

**"Cosa determina d_model in pratica?"**
È una scelta di design che scala con la dimensione del modello. Più grande è d_model, più espressiva è la rappresentazione, ma più costosa è ogni operazione. Tipicamente scala come la radice quadrata del numero di parametri.

---

## Note tecniche per il presentatore

- La visualizzazione del vettore nel Tab 1 usa d_model=16, heads=4 per chiarezza visiva — i numeri reali sarebbero troppo grandi per essere rappresentati.
- I calcoli del KV Cache nel Tab 4 usano fp16 (2 byte per valore).
- Il fattore `2` nella formula del KV Cache viene da K e V — vengono memorizzati entrambi per ogni layer.
