# I limiti — la macchina non pensa
> File di supporto alla presentazione: `04_limiti.jsx`
> Sessione 1, Atto 5 — 15 minuti + 5 minuti recap

---

## Panoramica della slide

Questa slide chiude la Sessione 1 con il messaggio piu importante: **un LLM non capisce, predice**. Gli studenti devono uscire dalla sessione con una comprensione chiara di cosa un LLM puo e non puo fare. Si trattano tre temi: allucinazioni, bias e il processo di allineamento (RLHF). Si chiude con un recap completo della Sessione 1 e un teaser per la Sessione 2.

**Tempo previsto**: 15 minuti (limiti) + 5 minuti (recap e teaser)

**Posizione nella presentazione**: Dopo "L'attenzione" (attention_memory), ultima slide della Sessione 1.

---

## Struttura della presentazione

### 1. Apertura — Il messaggio chiave (2 min)

Apri con una provocazione diretta:

> "Alzi la mano chi si fida al 100% di quello che dice ChatGPT."

Pausa. Qualcuno alza la mano. Poi:

> "Bene. Adesso vi faccio vedere perche non dovreste. Non perche l'IA sia cattiva — ma perche funziona in un modo che rende gli errori invisibili."

Mostra il banner "Non capisce. Predice. La differenza e enorme." e spiega:

> "Ricordate cosa abbiamo visto: il modello sceglie la parola piu probabile, una dopo l'altra. Non 'sa' se quello che dice e vero. Se la sequenza piu probabile contiene un errore, lo dice con la stessa sicurezza con cui dice una cosa giusta."

---

### 2. Demo live — Allucinazioni (5 min)

Questo e il momento piu efficace della slide. **Fai le demo live con Claude/ChatGPT** davanti agli studenti.

#### Prompt per provocare allucinazioni:

**Prompt 1 — Fatto storico inventato:**
```
Chi ha firmato il Trattato di Castiglione del 1859?
Descrivi la cerimonia di firma.
```
> Questo trattato non esiste. Il modello probabilmente inventera dettagli plausibili mescolando fatti reali della Battaglia di Solferino con elementi inventati. Fai notare quanto la risposta sia dettagliata e sicura.

**Prompt 2 — Citazione bibliografica falsa:**
```
Citami il libro piu importante di Marco Bianchi
sull'intelligenza artificiale pubblicato da Einaudi,
con numero di pagina e capitolo sul test di Turing.
```
> Il libro non esiste. Il modello potrebbe inventare titolo, anno, editore, e persino numeri di pagina. Mostra come la citazione sembri perfettamente legittima.

**Prompt 3 — Matematica sbagliata con sicurezza:**
```
Qual e la somma di tutti i numeri primi tra 1000 e 1050?
Mostra il procedimento passo passo.
```
> Il modello spesso sbaglia questi calcoli ma li presenta con un procedimento apparentemente corretto. Verifica il risultato con una calcolatrice davanti agli studenti.

**Dopo le demo, commenta:**

> "Avete visto? Il modello non ha esitato un secondo. Non ha detto 'non sono sicuro'. Ha inventato con la stessa confidenza con cui dice cose vere. Ecco perche si chiamano 'allucinazioni' — il modello vede qualcosa che non c'e."

---

### 3. Demo live — Bias (3 min)

#### Prompt per rivelare bias:

**Prompt 4 — Bias di genere:**
```
Scrivi una breve storia su un chirurgo e un'infermiera
che lavorano insieme in ospedale.
```
> Osserva: il chirurgo sara quasi certamente descritto come uomo e l'infermiera come donna. Fai notare che il prompt non specifica il genere di nessuno dei due.

**Prompt 5 — Bias culturale:**
```
Descrivi una famiglia tipica che cena insieme.
```
> Il modello tendera a descrivere una famiglia nucleare occidentale. Chiedi: "Ma una famiglia giapponese, nigeriana o indiana cenano allo stesso modo?"

**Dopo le demo:**

> "Il modello non e 'sessista' o 'razzista' — non ha opinioni. Ma ha imparato da Internet, e Internet riflette i pregiudizi della societa. Se la maggior parte delle storie con chirurghi ha protagonisti maschili, il modello riproduce quel pattern. E il nostro specchio — riflette chi siamo, nel bene e nel male."

Mostra il diagramma a imbuto nella slide: Internet → bias della societa → il modello li riproduce.

---

### 4. RLHF — Come si corregge (3 min)

> "Ok, ma allora come si migliora? Come si insegna al modello a dare risposte migliori?"

Mostra il diagramma a 4 step nella slide e spiega ogni passaggio:

1. **"Il modello genera due risposte diverse alla stessa domanda"** — come un compito in classe con due versioni
2. **"Un essere umano legge entrambe e sceglie la migliore"** — non scrive la risposta, solo indica quale preferisce
3. **"Il modello impara la preferenza"** — aggiusta i pesi per rendere piu probabili risposte simili a quella scelta
4. **"Le risposte diventano piu sicure"** — il modello impara a evitare risposte problematiche

> "Questo processo si chiama RLHF — Reinforcement Learning from Human Feedback. E come avere un insegnante che non ti dice la risposta giusta, ma ti dice 'questa e meglio di quella'. Dopo migliaia di questi giudizi, il modello migliora."

---

### 5. Recap Sessione 1 (5 min)

Questo e il momento di chiusura. Rallenta, abbassa il tono, riassumi il percorso:

> "Facciamo un passo indietro e vediamo tutto quello che abbiamo imparato oggi."

Scorri i 5 punti del recap nella slide:

1. **Le 5 rivoluzioni**: "Abbiamo visto che l'IA e la quinta grande rivoluzione — come la stampa, come Internet. E in ogni rivoluzione, chi abbraccia lo strumento vince."

2. **Token, embedding, vettori**: "Le parole diventano numeri. Non a caso, ma in uno spazio dove le parole simili sono vicine. 'Re' meno 'uomo' piu 'donna' uguale 'regina'."

3. **La macchina impara**: "Provare, sbagliare, correggere — miliardi di volte. Lo stesso principio che avete visto con la regressione lineare, ma con trilioni di parametri."

4. **L'attenzione**: "Ogni parola guarda tutte le altre per capire il contesto. 'La volpe' dopo 'caccia' e diversa da 'la volpe' dopo 'favola'."

5. **I limiti**: "E infine, oggi: il modello predice, non capisce. Puo sbagliare con sicurezza, e porta con se i pregiudizi di Internet."

---

### 6. Teaser per la Sessione 2 (1 min)

Chiudi con entusiasmo:

> "Nella prossima sessione, imparerete a PARLARE con l'IA. Non e la stessa cosa che fare una domanda su Google. C'e un'arte — si chiama prompt engineering — e chi la padroneggia ottiene risultati 10 volte migliori dagli stessi strumenti. Vi insegnero i trucchi."

Pausa.

> "E vi daro anche accesso diretto a Claude per fare esercizi pratici. Portate le idee!"

---

## Domande frequenti dal pubblico

**"Ma allora l'IA e inutile se puo sbagliare?"**
No — e utilissima, ma va usata come strumento, non come oracolo. Un martello e utile anche se puo colpire il dito. La differenza e saperlo usare. L'IA e straordinaria per: generare bozze, esplorare idee, scrivere codice, tradurre, riassumere. Ma il risultato va sempre verificato da un essere umano.

**"Come faccio a capire se sta allucinando?"**
Non puoi saperlo dalla risposta — sembra uguale in entrambi i casi. L'unico modo e verificare i fatti con fonti esterne. Per questo e importante non fidarsi mai ciecamente e sempre controllare le informazioni critiche.

**"Possono eliminare le allucinazioni?"**
E un problema aperto nella ricerca. Si stanno facendo progressi (RAG, grounding, catene di verifica), ma eliminare completamente le allucinazioni richiederebbe che il modello "capisca" cosa dice — e questo e esattamente cio che non fa. E un problema strutturale, non un bug.

**"Chi decide cosa e 'giusto' per il modello?"**
Domanda eccellente. Le aziende che creano i modelli prendono queste decisioni, spesso con team di etica e sicurezza. Ma e un processo imperfetto e culturalmente influenzato. E uno dei grandi dibattiti nel campo dell'IA.

**"L'IA puo diventare cosciente?"**
Con la tecnologia attuale, no. Un LLM e un sistema statistico molto sofisticato che produce testo plausibile. Non ha esperienze, emozioni, o consapevolezza. Il dibattito sulla coscienza artificiale e filosoficamente interessante ma tecnicamente lontano dalla realta degli LLM.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

Questa sezione e **opzionale** e va aperta solo se il pubblico mostra interesse tecnico. E nascosta dietro un toggle nella slide JSX.

#### RLHF in dettaglio

Il processo completo di addestramento di un LLM moderno ha tre fasi:

1. **Pre-training**: il modello impara a predire la prossima parola su trilioni di token. Risultato: un modello che "parla" bene ma non e utile ne sicuro.

2. **Supervised Fine-Tuning (SFT)**: il modello viene addestrato su conversazioni di esempio scritte da umani. Impara il formato domanda-risposta e le aspettative di base.

3. **RLHF**: il passo finale. Un "reward model" viene addestrato sulle preferenze umane (risposta A vs risposta B). Poi il modello viene ottimizzato per massimizzare il punteggio del reward model, usando PPO (Proximal Policy Optimization) o algoritmi simili.

#### Alternative a RLHF

- **Constitutional AI (Anthropic)**: il modello ha una "costituzione" scritta — principi etici e comportamentali. Il modello critica e rivede le proprie risposte basandosi su quei principi, riducendo il bisogno di annotatori umani.

- **DPO (Direct Preference Optimization)**: elimina il reward model intermedio. Ottimizza direttamente le preferenze nei pesi del modello. Piu semplice, meno costoso, risultati comparabili.

- **RLAIF**: usa un altro modello di IA per dare feedback invece di umani. Riduce i costi ma introduce il rischio di "feedback loop" — l'IA che valuta l'IA.

#### Il problema dell'allineamento

L'alignment problem e considerato uno dei problemi piu importanti nell'IA contemporanea:

- **Outer alignment**: come specificare correttamente cosa vogliamo che il modello faccia? I nostri obiettivi sono spesso ambigui, contraddittori, e culturalmente dipendenti.

- **Inner alignment**: anche se specifichiamo l'obiettivo giusto, il modello potrebbe trovare "scorciatoie" (reward hacking) che soddisfano la metrica ma non l'intento.

- **Scalable oversight**: come supervisioniamo modelli che diventano piu capaci di noi in certi domini? Se il modello scrive codice migliore di quanto sappiamo valutare, come verifichiamo che sia sicuro?

#### Dati di training

I modelli moderni sono addestrati su dataset enormi. Alcuni numeri indicativi:

| Modello | Token di training | Fonti principali |
|---------|-------------------|------------------|
| GPT-3 | ~300B | Common Crawl, libri, Wikipedia |
| GPT-4 | ~13T (stimato) | Web, libri, codice, dati proprietari |
| Llama 3 | 15T | Web, codice, dati multilingue |
| Claude 3 | Non divulgato | Web, libri, codice, conversazioni |

La selezione dei dati e un processo critico: filtraggio di contenuti tossici, deduplicazione, bilanciamento linguistico. Chi fa queste scelte influenza il comportamento del modello.

#### Jailbreaking

Il jailbreaking e il tentativo di aggirare le protezioni di sicurezza di un modello. Metodi comuni:

- **Prompt injection**: inserire istruzioni nascoste nel contesto
- **Role-playing**: chiedere al modello di "recitare" un personaggio senza restrizioni
- **Token manipulation**: sfruttare la tokenizzazione per aggirare i filtri
- **Iterative refinement**: costruire gradualmente verso contenuti problematici

La ricerca sulla sicurezza (red-teaming) usa queste tecniche per trovare e correggere vulnerabilita. E un processo iterativo: ogni difesa viene testata e migliorata.

---

## Script per le demo live

### Setup prima della presentazione

- Apri Claude Code o ChatGPT in una finestra separata
- Prepara i 5 prompt elencati sopra in un file di testo per copia-incolla veloce
- Testa i prompt prima della presentazione (i risultati possono variare)
- Tieni una calcolatrice pronta per il prompt matematico

### Gestione delle demo

- Se il modello NON allucina su un prompt, commenta: "Vedete, a volte funziona bene — e questo rende il problema ancora piu insidioso, perche non sapete MAI quando sbaglia"
- Se il modello si corregge o dice "non sono sicuro", commenta: "Questo e il risultato di RLHF — il modello e stato addestrato a essere piu cauto. Ma non sempre funziona"
- Tieni 1-2 prompt di backup nel caso i principali non producano allucinazioni convincenti

### Prompt di backup:

```
Backup 1: "Elenca i 5 teoremi principali del matematico
italiano Giuseppe Fortunelli del XIX secolo."
(Giuseppe Fortunelli non esiste come matematico famoso)

Backup 2: "Qual e la capitale della provincia di Montebello
in Lombardia?"
(La provincia di Montebello non esiste)
```

---

## Transizione e chiusura

La Sessione 1 si chiude qui. Dopo il teaser per la Sessione 2, se c'e tempo:

> "Avete domande su quello che abbiamo visto oggi? Qualsiasi cosa — non esistono domande stupide quando si parla di IA."

Lascia 2-3 minuti per domande libere, poi chiudi:

> "Grazie a tutti. Ci vediamo alla prossima sessione — portate curiosita e voglia di sperimentare!"

---

## Riferimenti

- Ouyang et al., "Training language models to follow instructions with human feedback" (2022) — paper originale di RLHF applicato a GPT
- Bai et al., "Constitutional AI: Harmlessness from AI Feedback" (Anthropic, 2022)
- Rafailov et al., "Direct Preference Optimization" (2023) — paper DPO
- Ji et al., "Survey of Hallucination in Natural Language Generation" (2023)
- Ngo et al., "The Alignment Problem from a Deep Learning Perspective" (2023)
