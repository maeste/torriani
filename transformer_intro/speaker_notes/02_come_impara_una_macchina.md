# Come impara una macchina — Regressione Lineare & Gradient Descent
> File di supporto alla presentazione: `02_come_impara_una_macchina.jsx`
> Contenuto derivato dal notebook: `how_llms_work.ipynb` (celle 0-3)

---

## Panoramica della slide

Questa slide converte la sezione interattiva del notebook `how_llms_work.ipynb` — che usava matplotlib e ipywidgets — in un componente React autonomo. L'obiettivo e far capire agli studenti **il cuore del machine learning**: provare, misurare l'errore, correggere. Tutto il resto (reti neurali, transformer, GPT) e una versione piu grande e complessa di questo stesso meccanismo.

**Tempo previsto**: 12-15 minuti

**Posizione nella presentazione**: Dopo "Dalle parole ai numeri" (01), prima di "L'attenzione" (attention_memory).

---

## Struttura della presentazione

### 1. Apertura — L'analogia

Apri con un esempio concreto:

> "Immaginate di dover indovinare il prezzo di una casa conoscendo solo i metri quadrati. Avete 30 case come esempio. Come fareste?"

Lascia che gli studenti rispondano. Tipicamente diranno "guardo la media" o "faccio un grafico". Perfetto — e esattamente quello che faremo.

> "La macchina fa la stessa cosa: prova a tracciare una riga che passi il piu vicino possibile a tutti i punti. Ma come fa a sapere se la riga e buona o cattiva?"

---

### 2. Fase interattiva — Gli slider

Questo e il momento piu coinvolgente. Chiedi a uno studente di venire alla lavagna (o usa il proiettore):

> "Chi vuole provare a trovare la riga migliore?"

Lo studente muove i due slider:
- **Pendenza** (slope): controlla quanto e "ripida" la riga
- **Intercetta** (intercept): controlla dove la riga "parte" sull'asse y

Mentre lo studente prova:
- Fai notare che il numero MSE cambia in tempo reale
- Chiedi: "Sta migliorando o peggiorando?"
- Fai provare 2-3 studenti per mostrare che trovare il punto ottimo a mano e difficile

> "Vedete quanto e difficile? Adesso immaginate di avere non 2 manopole, ma 1.8 trilioni di manopole. Come fa GPT-4 a regolarle tutte?"

---

### 3. Il bottone "Addestra!" — Il momento magico

Dopo che gli studenti hanno provato a mano:

> "Ok, adesso lasciamo fare alla macchina. Guardate cosa succede."

Premi **Addestra!**. La riga si muove da sola verso la posizione ottimale. Mentre l'animazione procede:

- Fai notare che la riga si muove velocemente all'inizio e poi rallenta
- Indica il grafico dell'errore che scende
- Spiega: "A ogni passo, la macchina calcola *in che direzione* l'errore diminuisce e fa un piccolo passo in quella direzione"

> "Questo si chiama **gradient descent** — discesa del gradiente. E come scendere da una montagna nella nebbia: non vedi la valle, ma senti con i piedi in che direzione il terreno scende e vai da li."

---

### 4. Il messaggio chiave

Dopo che il training finisce, appare il box evidenziato. Leggilo ad alta voce:

> "Tutto il machine learning e questo: provare, misurare l'errore, correggere. Miliardi di volte."

Poi fai il confronto:

> "Noi abbiamo usato 2 parametri e 15 passi. GPT-4 ha 1.8 trilioni di parametri e ha fatto questo processo con 13 trilioni di parole. Il training e costato circa 100 milioni di dollari. Ma il principio e identico a quello che avete appena visto."

---

### 5. Chiusura della slide

Puoi chiudere con:

> "Adesso sapete il segreto: non c'e magia dentro un LLM. C'e matematica — tanta, tantissima matematica — che fa la stessa cosa che avete fatto voi con gli slider. Solo piu veloce, e con molte piu manopole."

---

## Domande frequenti dal pubblico

**"Ma come fa il computer a 'sentire' in che direzione andare?"**
Usa il calcolo delle derivate (il gradiente). La derivata dell'errore rispetto a ogni parametro dice esattamente quanto e in che direzione l'errore cambierebbe se cambiassimo quel parametro. Il computer calcola tutte queste derivate e fa un piccolo passo nella direzione opposta al gradiente.

**"Perche non calcola direttamente la soluzione perfetta?"**
Per la regressione lineare in realta si puo fare (formula dei minimi quadrati). Ma per le reti neurali con miliardi di parametri non esiste una formula chiusa — l'unico modo e provare e migliorare iterativamente. E il gradient descent e sorprendentemente efficace anche con trilioni di parametri.

**"Cosa succede se il learning rate e sbagliato?"**
Se e troppo alto, il modello "rimbalza" avanti e indietro senza mai trovare il minimo (come fare salti troppo grandi scendendo da una montagna). Se e troppo basso, ci mette troppo tempo. Trovare il learning rate giusto e una delle sfide pratiche del training.

**"Quanto ci mette a fare il training di GPT-4?"**
Settimane o mesi su migliaia di GPU. Il costo e dominato dall'elettricita e dall'hardware. Un singolo training run di GPT-4 ha usato circa 25.000 GPU A100 per diversi mesi.

**"L'R-squared cosa significa?"**
Quanto bene la nostra linea spiega i dati. R-squared = 1.0 significa perfetto (tutti i punti sulla linea). R-squared = 0 significa che la linea non spiega niente. Sopra 0.8 e generalmente considerato un buon modello.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

Questa sezione e **opzionale** e va aperta solo se il pubblico mostra interesse tecnico. E nascosta dietro un toggle nella slide JSX.

#### MSE (Mean Squared Error)
- La formula MSE = (1/n) * SUM((y_i - y_pred)^2) e la funzione di **loss** piu comune per problemi di regressione.
- Si eleva al quadrato per due motivi: (1) rendere gli errori sempre positivi, (2) penalizzare di piu gli errori grandi.
- Esistono altre funzioni di loss: MAE (errore assoluto medio), Huber loss (combinazione), cross-entropy (per classificazione).

#### Gradient Descent
- Le formule mostrate sono per il gradient descent "vanilla". In pratica si usano varianti ottimizzate:
  - **SGD con momentum**: accumula velocita nelle direzioni consistenti
  - **Adam**: il piu usato, combina momentum e learning rate adattivo per ogni parametro
  - **AdamW**: Adam con weight decay corretto (usato per il training di tutti i modelli recenti)
- Il learning rate di 0.01 usato nella demo e alto per scopi didattici. In pratica i modelli grandi usano lr ~1e-4 o piu basso, con warm-up e scheduling.

#### Costi di training
- I costi riportati sono stime basate su informazioni pubbliche. Per modelli proprietari (GPT-4, Claude, Gemini) i dettagli di architettura e training non sono confermati.
- Il costo del training e dominato da: GPU time, elettricita, infrastruttura di rete, personale.
- Il costo di training e pagato **una volta**; il costo di inferenza (usare il modello) e un costo ricorrente molto inferiore per query singola.

#### Dal notebook al componente React
- Il notebook originale usava matplotlib per il rendering statico e ipywidgets per l'interattivita. Il componente React offre un'esperienza piu fluida e funziona senza un kernel Python.
- I dati sono generati con lo stesso seed (42) e la stessa distribuzione del notebook originale: y = 1.5x + 2 + noise.
- Il gradient descent nel componente usa la versione analitica dei gradienti MSE, non la versione a "trial" del notebook. Questo e piu corretto dal punto di vista didattico.

---

## Transizione alla slide successiva

> "Ora sapete come una macchina impara: prova, sbaglia, corregge. Ma un LLM non impara solo a tracciare una riga — impara a capire il significato delle parole e le relazioni tra di loro. Come fa? Con un meccanismo chiamato **attenzione**. Vediamo come funziona."

Questo collega naturalmente alla slide successiva: "Memoria & Contesto nei Transformer" (attention_memory).

---

## Riferimenti

- Notebook originale: `how_llms_work.ipynb` (celle 0-3, sezione regressione lineare)
- Kaplan et al., "Scaling Laws for Neural Language Models" (2020) — per le scaling laws menzionate nella tana del bianconiglio
- Training cost estimates: Epoch AI, SemiAnalysis (fonti pubbliche)
