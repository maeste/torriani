# Anatomia del Transformer: Layers, Heads e d_head

## I tre parametri che definiscono un modello

Quando si parla di un Large Language Model, si sente spesso dire "ha 8 miliardi di parametri" o "ne ha 70 miliardi". Ma cosa sono esattamente questi parametri, e come sono organizzati? La risposta sta in tre numeri fondamentali: il numero di **layer** (strati), il numero di **head** (teste di attenzione) e la dimensione **d_head** (la larghezza di ogni testa). Capire come interagiscono questi tre numeri significa capire perché un modello è grande, quanto costa farlo funzionare, e quali sono i suoi limiti.

### d_model: il vettore di un token

Ogni token — ogni parola o sotto-parola che il modello elabora — viene rappresentato come un lungo vettore di numeri. La lunghezza di questo vettore si chiama **d_model**. In Llama-3 8B, d_model è 4096: ogni singolo token è un punto in uno spazio a 4.096 dimensioni. In modelli più grandi, d_model può arrivare a 8192 o 12288.

Ma il modello non lavora su questo vettore come un blocco unico. Lo **spezza** in sottogruppi paralleli, uno per ogni head di attenzione. La relazione è semplice:

```
d_model = heads × d_head
```

Con d_model = 4096 e 32 head, ogni head lavora su un vettore di d_head = 128 dimensioni. Non è una scelta casuale: valori di d_head tra 64 e 128 si sono dimostrati empiricamente ottimali per la maggior parte delle architetture.

L'analogia più utile è quella di un team di analisti. Invece di far analizzare un intero documento a una sola persona, lo dividi in sezioni specializzate: un analista studia la grammatica, uno la semantica, uno le relazioni tra entità. Ogni analista lavora sulla sua porzione del vettore — la sua head — e poi i risultati vengono ricombinati.

### Multi-Head Attention: il meccanismo passo per passo

Il cuore di ogni layer del Transformer è il meccanismo di Multi-Head Attention, che procede in cinque passi:

**Passo 1 — Input**: i token sono già stati convertiti in vettori numerici (embedding + positional encoding). Il modello non "vede" parole, vede sequenze di numeri.

**Passo 2 — Proiezione Q, K, V**: ogni head proietta l'input in tre spazi diversi tramite matrici di proiezione apprese durante il training:
- **Query (Q)**: "cosa sto cercando?"
- **Key (K)**: "cosa posso offrire agli altri token?"
- **Value (V)**: "qual è il mio contenuto informativo?"

È come se ogni token indossasse tre cappelli contemporaneamente: interrogante, rispondente e portatore di informazione.

**Passo 3 — Attention Scores**: il prodotto scalare (dot product) tra Q e Kᵀ misura la "compatibilità" tra ogni coppia di token. Il risultato è la matrice n×n degli score di attenzione.

**Passo 4 — Softmax + somma pesata**: gli score diventano probabilità tramite la funzione softmax. Ogni token non riceve informazioni da un solo altro token, ma una **media pesata** delle informazioni di tutti i token precedenti.

**Passo 5 — Concatenazione e proiezione finale**: gli output di tutte le head vengono concatenati e proiettati nello spazio originale d_model. Ogni head ha catturato relazioni diverse e complementari — la fusione è ricca di informazioni.

### Lo stack di layer: profondità = ragionamento

Un singolo strato di attention è potente ma limitato. Impilando 32, 48, 80 strati, ogni strato può raffinarsi su ciò che il precedente ha prodotto. La ricerca ha mostrato che:

- I **layer bassi** tendono a catturare relazioni **sintattiche e locali**: accordo soggetto-verbo, punteggiatura, struttura della frase.
- I **layer intermedi** catturano relazioni **semantiche**: significato delle parole nel contesto, riferimenti pronominali.
- I **layer alti** catturano **ragionamento e contesto ampio**: inferenze logiche, coerenza del discorso, comprensione globale.

Ogni layer ha il suo blocco di attention completo, il che significa che il suo KV Cache è indipendente. Più layer → KV Cache proporzionalmente più grande. La formula:

```
KV Cache = 2 × L × H × n × d_head × sizeof(fp16)
```

Il fattore 2 viene dal fatto che si memorizzano sia K che V per ogni layer.

### Numeri reali: dal piccolo al grande

| Modello | Layer | Head | d_head | d_model | KV Cache @ 8K |
|---|---|---|---|---|---|
| GPT-2 small | 12 | 12 | 64 | 768 | ~0.1 GB |
| Llama-3 8B | 32 | 32 | 128 | 4096 | ~2 GB |
| Llama-3 70B | 80 | 64 | 128 | 8192 | ~20 GB |
| Claude-style @ 100K | 48 | 64 | 128 | 8192 | ~75 GB |

Il dato che sorprende è sempre l'ultimo: il KV Cache di un modello grande con contesto lungo può superare la dimensione del modello stesso. Se si vogliono servire 100 utenti in parallelo (batch size = 100), il KV Cache va moltiplicato per 100: 2 TB di VRAM solo per il cache. Questo spiega i costi dell'inferenza distribuita.

### Perché tante head e non una sola grande?

Una domanda naturale è: perché non usare una singola head grande con d_head = d_model, invece di tante head piccole? La risposta è che le multi-head attention imparano relazioni **diverse e complementari**. Ogni head si specializza: una può concentrarsi sulle relazioni grammaticali, un'altra sul significato semantico, un'altra ancora sulle dipendenze a lunga distanza. Non è ridondanza, è **specializzazione parallela**. Una singola head grande tenderebbe a dominare un unico tipo di relazione.

---

## 5 Cose da Ricordare

- **d_model = heads × d_head**: la dimensione del vettore di un token è il prodotto del numero di head per la dimensione di ogni head. Questa relazione è la base dell'architettura Transformer.
- **Ogni head si specializza**: le diverse head di attenzione catturano relazioni diverse — grammaticali, semantiche, logiche. Non è ridondanza ma specializzazione parallela.
- **La profondità (numero di layer) abilita il ragionamento**: i layer bassi catturano pattern locali, quelli alti ragionamento complesso. Più layer significano capacità cognitive più sofisticate.
- **Il KV Cache scala con i layer**: ogni layer ha il suo cache indipendente. Un modello con 80 layer ha un KV Cache 80 volte più grande di un modello con un solo layer, a parità di contesto.
- **I numeri reali sono enormi**: il KV Cache di un modello da 70B parametri con 8K token di contesto occupa già 20 GB di VRAM. Con contesti lunghi e batch grandi, può superare la dimensione del modello stesso.

---

## 3 Cose da Fare

1. **Esplora una model card su Hugging Face**: cerca un modello come Llama-3 o Mistral, trova i valori di layer, head e d_head nella documentazione, e verifica che d_model = heads × d_head. Calcola il KV Cache per diversi contesti.

2. **Visualizza le attention head**: usa strumenti come BertViz o Ecco su un modello piccolo (GPT-2) per vedere cosa cattura ogni head di attenzione. Noterai che alcune head si specializzano in relazioni sintattiche, altre in semantiche.

3. **Confronta modelli con lo stesso numero di parametri ma architetture diverse**: cerca modelli che hanno parametri simili ma diverso rapporto layer/head (ad esempio un modello "largo e poco profondo" vs uno "stretto e profondo") e confronta le loro performance su benchmark. Questo ti aiuterà a capire l'impatto delle scelte architetturali.

---

## Domande Frequenti

**Perché non usare una sola head grande invece di tante head piccole?**
Sperimentalmente, le multi-head attention imparano relazioni diverse e complementari. Una sola head grande tenderebbe a specializzarsi in un unico tipo di relazione, perdendo la ricchezza informativa che emerge dalla specializzazione parallela.

**Il numero di head è sempre uguale in tutti i layer?**
Nelle architetture standard sì. Alcune architetture recenti sperimentano con configurazioni diverse per layer diversi, ma è relativamente raro nei modelli di produzione.

**Cosa determina d_model in pratica?**
È una scelta di design che scala con la dimensione del modello. Più grande è d_model, più espressiva è la rappresentazione, ma più costosa è ogni operazione. Tipicamente scala come la radice quadrata del numero totale di parametri.

**Perché i layer bassi catturano la grammatica e quelli alti il ragionamento?**
È una proprietà emergente del training, non una scelta progettuale. Si ipotizza che il modello impari prima le regolarità più semplici (sintassi) nei layer iniziali, e poi costruisca rappresentazioni sempre più astratte nei layer successivi — in modo simile a come le reti neurali convoluzionali imparano prima i bordi e poi le forme complesse.

---

## Mettiti alla Prova

**1. Se un modello ha d_model = 8192 e 64 head di attenzione, qual è il valore di d_head?**

a) 64
b) 128
c) 256
d) 512

**2. Perché i Transformer usano molte head di attenzione invece di una sola?**

a) Per risparmiare memoria durante l'inferenza
b) Perché ogni head si specializza nel catturare un tipo diverso di relazione tra token
c) Perché una sola head sarebbe troppo lenta da calcolare
d) Per compatibilità con le GPU moderne

**3. Quale componente del Transformer è direttamente responsabile della crescita del KV Cache con il numero di layer?**

a) Il positional encoding, che deve essere ricalcolato per ogni layer
b) Il fatto che ogni layer ha il suo blocco di attention con K e V indipendenti
c) La funzione softmax, che richiede più memoria con più layer
d) La concatenazione finale delle head

**4. In un Transformer, cosa catturano tipicamente i layer più profondi (alti)?**

a) Le relazioni grammaticali tra parole adiacenti
b) Il positional encoding dei token
c) Il ragionamento complesso e le relazioni a lunga distanza nel contesto
d) La pronuncia e la fonetica delle parole

**5. Se il KV Cache di Llama-3 70B occupa 20 GB con 8K token, quanto occuperà approssimativamente con 32K token?**

a) 40 GB
b) 80 GB
c) 160 GB
d) 320 GB
