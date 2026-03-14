# L'Attenzione — il segreto dei Transformer
> File di supporto alla presentazione: `03_attenzione.jsx`
> Versione "lite" — per l'approfondimento tecnico vedi `01_attention_memory.md` e `04_attention_matrix_deep.md`

---

## Panoramica della slide

Questa slide e il quarto atto della Sessione 1. Dopo aver visto come una macchina impara (02), ora mostriamo *il meccanismo chiave* che rende i transformer cosi potenti: l'attenzione. L'obiettivo e far capire che il modello non legge le parole una alla volta come noi — le guarda tutte contemporaneamente e decide quali sono importanti per capire ogni singola parola.

**Tempo previsto**: 20 minuti

**Posizione nella presentazione**: Dopo "Come impara una macchina" (02), prima di "I limiti — la macchina non pensa" (04).

---

## Struttura della presentazione

### 1. Apertura — Il problema della coreference

Apri con una domanda concreta:

> "Leggiamo insieme questa frase: 'Il gatto si sedette sul tappeto perche era stanco.' Domanda: chi e stanco? Il gatto o il tappeto?"

Lascia che gli studenti rispondano (diranno "il gatto", ovviamente).

> "Bravi. Ma *come* lo sapete? Ci avete pensato un attimo, e il vostro cervello ha collegato 'era stanco' a 'gatto' e non a 'tappeto'. Un computer deve fare la stessa cosa — ma come? Ecco il meccanismo dell'attenzione."

Questo aggancia l'attenzione degli studenti con un problema intuitivo e mostra subito perche serve un meccanismo sofisticato.

---

### 2. Demo interattiva — Le parole che si guardano

Usa la prima sezione del componente: "A chi presta attenzione ogni parola?"

#### Come usarla con gli studenti

1. La slide si apre con "era" gia selezionata. Mostra il risultato:

> "Guardate: quando il modello legge 'era', guarda tutte le parole precedenti. Ma non le guarda tutte con la stessa intensita. 'Gatto' riceve il peso piu alto: 0.52. Il modello ha capito che 'era stanco' si riferisce al gatto."

2. Chiedi a uno studente di cliccare su "sedette":

> "E 'sedette'? A chi presta attenzione? Soprattutto a 'gatto' — perche e il gatto che si siede. Vedete come il meccanismo ricostruisce chi fa cosa?"

3. Clicca su "Il" (la prima parola):

> "La prima parola puo guardare solo se stessa — non ha niente prima. Ogni parola puo guardare solo le parole precedenti, mai quelle future. Questo si chiama *maschera causale*."

#### Il messaggio chiave

> "L'attenzione e questo: ogni parola chiede 'chi e importante per capire me?' e guarda tutte le parole precedenti. Alcune ricevono molta attenzione, altre quasi niente."

---

### 3. La matrice di attenzione — Visualizzazione

Passa alla seconda sezione. Questa e una versione semplificata della matrice di attenzione.

> "Questa griglia mostra tutti i pesi di attenzione della frase. Ogni riga e una parola che 'chiede', ogni colonna e una parola che 'risponde'. Il colore mostra quanta attenzione viene data."

Punti da sottolineare:

1. **Il triangolo grigio**: "Vedete il triangolo in alto a destra? E grigio perche quelle parole sono 'nel futuro'. Il modello non puo barare e guardare avanti."

2. **La diagonale**: "I numeri sulla diagonale sono l'attenzione che ogni parola da a se stessa. E sempre presente, ma non e mai il peso piu alto."

3. **Hover sulle celle**: Fai passare il mouse sulle celle per mostrare i dettagli. "Vedete: 'era' verso 'gatto' ha peso 0.52. E il collegamento piu forte di quella riga."

> "In un modello reale, questa matrice ha migliaia di righe e colonne. E ogni layer del modello ha la sua matrice — decine di matrici diverse che catturano relazioni diverse."

---

### 4. Predizione del prossimo token — Generazione

Questa sezione mostra come il modello genera testo. E il momento per collegare attenzione e generazione.

> "Ok, il modello ha capito le relazioni tra le parole. Ma come genera la prossima parola? Guardate."

#### Demo passo passo

1. Mostra la frase incompleta: "Il gatto si sedette sul ___"

> "Il modello guarda la frase finora, usa l'attenzione per capire il contesto, e poi calcola le probabilita per la prossima parola."

2. Indica il grafico a barre:

> "Non sceglie UNA parola — calcola le probabilita di TUTTE le parole possibili. 'Tappeto' ha il 35%, 'divano' il 20%, 'pavimento' il 15%... Non e mai sicuro al 100%."

3. Premi "Rivela la parola scelta":

> "Ha scelto 'tappeto' perche aveva la probabilita piu alta. Ma avrebbe potuto scegliere 'divano' — e per questo i modelli danno risposte diverse ogni volta. Si chiama *campionamento*."

4. Premi "Prossima parola" per continuare la generazione:

> "Ora la frase e piu lunga e il modello ripete il processo. Nota che le probabilita cambiano completamente — il contesto e diverso."

#### Il messaggio chiave

> "Un LLM genera testo una parola alla volta, scegliendo ogni volta la prossima parola piu probabile. L'attenzione e il meccanismo che gli permette di capire il contesto e fare una scelta sensata."

---

### 5. La formula — Solo se il pubblico lo chiede

Questa sezione puo essere saltata o trattata rapidamente, a seconda del pubblico.

> "Per chi vuole la formula: eccola. Non vi chiedo di capire la matematica, ma vi spiego l'idea."

Indica i tre riquadri Q, K, V:

> "Ogni parola genera tre cose: una Domanda (Q: cosa sto cercando?), un'Etichetta (K: cosa posso offrire?) e un Contenuto (V: ecco la mia informazione). L'attenzione confronta le domande con le etichette per decidere quanto ogni contenuto e importante."

Usa l'analogia della biblioteca:

> "E come essere in una biblioteca: avete una domanda, guardate i titoli dei libri, e leggete quelli il cui titolo corrisponde di piu alla vostra domanda."

---

### 6. Tana del bianconiglio — Solo per i curiosi

La sezione collassabile va aperta solo se qualcuno chiede approfondimenti. Contiene:
- La scalabilita quadratica (1.000 parole = 1.000.000 calcoli)
- Multi-head attention (32 head x 32 layer = 1.024 meccanismi)
- Link ai moduli di approfondimento

> "Chi vuole sapere perche i modelli hanno un limite di token? Apriamo la tana del bianconiglio..."

---

### 7. Chiusura della slide

> "Ricapitoliamo: l'attenzione e il meccanismo che permette al modello di capire le relazioni tra le parole. Ogni parola guarda tutte le altre e decide quali sono importanti. Questo e il segreto dei transformer — e il motivo per cui funzionano cosi bene. Ma attenzione: funzionare bene non significa *pensare*. Nella prossima slide vediamo i limiti di questa macchina."

---

## Domande frequenti dal pubblico

**"Ma il modello capisce davvero chi e 'era'?"**
Non nel senso umano. Il modello ha imparato pattern statistici da miliardi di frasi: quando vede "X si sedette... perche era stanco", ha visto migliaia di esempi simili dove il soggetto dell'azione e anche il soggetto di "era". Non "capisce" — riconosce un pattern.

**"Perche puo guardare solo le parole precedenti e non quelle successive?"**
Perche il modello genera testo da sinistra a destra, una parola alla volta. Quando genera la terza parola, la quarta non esiste ancora. Questa restrizione si chiama "maschera causale" o "causal mask". In altri contesti (come la traduzione o BERT) il modello puo guardare in entrambe le direzioni.

**"Come fa a sapere che 'gatto' e piu rilevante di 'tappeto' per 'era'?"**
Lo ha imparato durante il training, leggendo miliardi di frasi. Ha visto che gli aggettivi come "stanco" si associano piu spesso a esseri viventi che a oggetti. I pesi di attenzione non sono programmati — emergono dal training.

**"Se il modello non e sicuro al 100%, come fa a scegliere la parola giusta?"**
Non sceglie sempre "la migliore" — campiona dalle probabilita. Per questo se fai la stessa domanda a ChatGPT due volte, ottieni risposte diverse. Il parametro "temperatura" controlla quanto il modello e "creativo" vs "conservatore": temperatura bassa = sceglie quasi sempre la parola piu probabile; temperatura alta = esplora di piu.

**"Quante di queste matrici di attenzione ci sono in un modello?"**
In Llama-3 8B: 32 layer, ciascuno con 32 "teste" (head) di attenzione. Totale: 1.024 meccanismi di attenzione diversi, ognuno specializzato in un tipo diverso di relazione. Alcuni head catturano la grammatica, altri la semantica, altri le relazioni a lunga distanza.

**"Perche si chiama 'transformer'?"**
Il paper originale si intitola "Attention Is All You Need" (Vaswani et al., 2017). Il nome "transformer" viene dall'idea che il modello *trasforma* le rappresentazioni delle parole attraverso molteplici layer di attenzione. Ogni layer aggiunge informazioni sul contesto alla rappresentazione di ogni parola.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

Questa sezione e **opzionale** e va aperta solo se il pubblico mostra interesse tecnico.

#### I pesi di attenzione nella demo

- I pesi mostrati nella slide sono **simulati** e semplificati per scopi didattici. In un modello reale, i pesi dipendono dai parametri appresi durante il training e sono diversi per ogni head.
- In un modello reale, la riga di attenzione somma a 1.0 (effetto del softmax). I pesi nella demo sono stati arrotondati per semplicita ma rispettano questa proprieta.
- La matrice mostrata e per **un singolo head**. In un modello reale ci sono 32-128 head per layer, e ogni head cattura relazioni diverse.

#### Scalabilita quadratica — perche e un problema

- La matrice di attenzione ha dimensioni n x n dove n e il numero di token. In memoria servono n x n valori floating point.
- Per un contesto di 128K token (come Claude): 128.000 x 128.000 = ~16 miliardi di valori. A 16 bit (fp16) = ~32 GB solo per UNA matrice di attenzione di UN head di UN layer.
- Le ottimizzazioni come FlashAttention non riducono il numero di operazioni (sempre O(n^2) FLOPs) ma evitano di materializzare l'intera matrice in memoria, calcolandola a blocchi.
- Altre ottimizzazioni (Sliding Window, Linear Attention) riducono effettivamente la complessita ma con trade-off sulla qualita.

#### Multi-Head Attention — cosa fa davvero

- Ogni head ha le sue matrici W_Q, W_K, W_V che proiettano l'input in uno spazio di dimensione d_head = d_model / num_heads.
- In Llama-3 8B: d_model = 4096, num_heads = 32, d_head = 128.
- La Grouped Query Attention (GQA) usata in Llama-3 condivide le K e V tra gruppi di head per ridurre il KV Cache.
- I diversi head si specializzano: studi di probing hanno mostrato head che catturano relazioni sintattiche (soggetto-verbo), semantiche (coreference), e posizionali (parola adiacente).

#### Next token prediction — i dettagli

- Le probabilita mostrate nella demo sono semplificate. In realta, il modello calcola un "logit" per ogni token nel vocabolario (30K-128K valori), poi applica softmax per ottenere probabilita.
- Il campionamento puo essere top-k (considera solo le k parole piu probabili), top-p/nucleus (considera le parole fino a una probabilita cumulativa p), o greedy (prende sempre la piu probabile).
- La temperatura scala i logit prima del softmax: T < 1 rende la distribuzione piu "picchiata" (meno variabilita), T > 1 la rende piu "piatta" (piu variabilita).
- Beam search mantiene le n sequenze piu probabili in parallelo — usato principalmente nella traduzione.

#### Il paper originale

- "Attention Is All You Need" (Vaswani et al., 2017) ha introdotto l'architettura transformer.
- L'innovazione chiave: sostituire le reti ricorrenti (RNN/LSTM) con pura attenzione, permettendo la parallelizzazione del training.
- Il transformer originale aveva un encoder e un decoder. I modelli generativi moderni (GPT, Claude, Llama) usano solo il decoder.
- Il nome "self-attention" indica che le Query, Key e Value provengono tutte dalla stessa sequenza di input (a differenza della "cross-attention" usata nella traduzione).

---

## Transizione alla slide successiva

> "Ora sapete il segreto dei transformer: l'attenzione permette al modello di capire le relazioni tra le parole e generare testo una parola alla volta. Ma questo meccanismo, per quanto potente, ha dei limiti importanti. Il modello non *pensa* — riconosce pattern. Vediamo cosa significa nella prossima slide."

Questo collega naturalmente alla slide successiva: "I limiti — la macchina non pensa".

---

## Riferimenti

- Vaswani et al., "Attention Is All You Need" (2017) — il paper originale del transformer
- Moduli di approfondimento: `01_attention_memory.md`, `04_attention_matrix_deep.md`, `02_transformer_anatomy.md`
- Vig, "A Multiscale Visualization of Attention in the Transformer Model" (2019) — visualizzazione dei pattern di attenzione
- Clark et al., "What Does BERT Look At?" (2019) — analisi di cosa catturano i diversi head
