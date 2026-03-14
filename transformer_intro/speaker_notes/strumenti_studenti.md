# La Cassetta degli Attrezzi dello Studente IA
> File di supporto alla presentazione: `strumenti_studenti.jsx`

---

## Panoramica della slide

Terza slide della Sessione 3. Dopo l'arte del prompt e l'IA per ogni futuro, presentiamo gli strumenti concreti che gli studenti possono usare oggi. L'obiettivo e duplice: mostrare strumenti utili per lo studio E affrontare in modo forte e chiaro l'etica dell'uso.

**Tempo previsto**: 20 minuti

**Posizione nella presentazione**: Dopo "L'IA per Ogni Futuro" (06), prima di "Il Vostro Ruolo" (07).

---

## Struttura della presentazione

### 1. Apertura — Gli strumenti esistono, il punto e come usarli

> "Oggi vi faccio vedere gli strumenti IA che potete usare per studiare meglio. Ma prima, una premessa importante: un coltello puo tagliare il pane o fare danni. La differenza sta in chi lo usa e come. Lo stesso vale per questi strumenti."

---

### 2. NotebookLM

> "Immaginate un tutor che conosce perfettamente i vostri libri di testo, i vostri appunti, le dispense del professore. Gli caricate i materiali e lui vi fa riassunti, quiz, domande di verifica. Non inventa nulla — usa solo quello che gli avete dato."

Mostra il flusso interattivo.

> "La cosa geniale e che lavora solo con i vostri materiali. Se il professore ha spiegato un concetto in un certo modo, il riassunto riflette quella spiegazione."

---

### 3. Modalita Tutor

> "ChatGPT, Claude, Gemini — tutti possono essere usati come tutor. Il trucco e nel prompt."

Mostra il confronto modalita normale vs tutor:

> "Se chiedete 'Qual e la risposta?', l'IA vi da la risposta e non avete imparato nulla. Se chiedete 'Guidami verso la risposta senza dirmela', l'IA diventa un tutor socratico."

Mostra i prompt template:

> "Copiate questi prompt e usateli. Sono la differenza tra usare l'IA per imparare e usarla per non imparare."

---

### 4. Strumenti di ricerca

Mostra le cards per Perplexity, Consensus, Connected Papers.

> "Perplexity e come Google ma vi da risposte con le fonti. Consensus cerca nei paper scientifici. Connected Papers vi mostra come i paper sono collegati tra loro."

---

### 5. Etica — LA SEZIONE PIU IMPORTANTE

> "Ora arriviamo al punto fondamentale. C'e una linea sottile tra usare l'IA come tutor e usarla come ghostwriter. E quella linea fa la differenza tra imparare e non imparare."

Mostra il confronto tutor vs ghostwriter. ENFATIZZA visivamente.

> "Il tutor vi aiuta a capire. Il ghostwriter fa il lavoro al posto vostro. Uno vi rende piu forti, l'altro vi rende dipendenti."

> "E vi dico una cosa: copiare con l'IA e PEGGIO che copiare da un compagno. Perche dal compagno almeno dovete capire la risposta per copiarla. Con l'IA non capite nulla E create una dipendenza."

> "I professori se ne accorgono. I temi generati dall'IA hanno pattern riconoscibili. E all'interrogazione orale, ChatGPT non puo venire con voi."

---

## Domande frequenti dal pubblico

**"Ma tutti copiano con ChatGPT, perche non dovrei farlo anch'io?"**
Perche stai investendo nella persona che sarai tra 5 anni. All'universita, al lavoro, non avrai qualcuno che fa le cose per te. Le competenze che costruisci ora — pensiero critico, scrittura, problem solving — sono il tuo vantaggio competitivo. L'IA le puo amplificare, ma non sostituire.

**"Come fa il professore a sapere se ho usato l'IA?"**
Diversi indizi: vocabolario troppo sofisticato per il livello, struttura troppo perfetta, mancanza di errori tipici, contenuti non coperti a lezione. Inoltre esistono strumenti come Turnitin, GPTZero, Compilatio. Ma il test definitivo e l'interrogazione orale: se non sai spiegare quello che hai scritto, e evidente.

**"NotebookLM e gratuito?"**
Si, attualmente e gratuito con un account Google. Ci sono limiti sul numero di notebook e fonti caricabili, ma per uso scolastico e piu che sufficiente.

**"Posso usare l'IA per correggere i miei temi?"**
Si, e un uso legittimo e intelligente. Chiedere "cosa posso migliorare in questo testo?" e diverso da "scrivi il tema per me". Il primo ti fa imparare, il secondo no.

**"E se l'IA mi da informazioni sbagliate?"**
Succede, e si chiama "allucinazione". Per questo e fondamentale verificare sempre: controllate le fonti, incrociate le informazioni, non fidatevi ciecamente. Questa capacita di verifica e una competenza fondamentale — con o senza IA.

---

## Note tecniche per il presentatore

### RAG — come funziona NotebookLM

- RAG = Retrieval Augmented Generation
- Il sistema non "legge" i documenti come un umano — li indicizza in chunk
- Per ogni domanda, cerca i chunk piu rilevanti e li fornisce al modello come contesto
- Il modello genera la risposta basandosi SOLO sui chunk forniti
- Riduce drasticamente le allucinazioni perche il modello "cita" materiale fornito

### AI Detection — stato dell'arte

- I detector (GPTZero, Compilatio, Turnitin AI) hanno ~80-90% di accuratezza
- Falsi positivi: testi umani classificati come IA (~5-10%)
- Falsi negativi: testi IA non rilevati, specialmente se parafrasati (~10-20%)
- Non sono perfetti, ma combinati con l'interrogazione orale sono efficaci
- L'approccio migliore e educativo, non poliziesco: insegnare l'uso responsabile

### Prompt engineering per lo studio

- "Spiegami [concetto] come se avessi 15 anni"
- "Fammi 5 domande su [argomento] per verificare se ho capito"
- "Non darmi la risposta. Guidami passo per passo verso la soluzione"
- "Trova errori nel mio ragionamento: [ragionamento]"
- "Crea un quiz a scelta multipla su [capitolo]"

### AI Literacy

- Competenza emergente: capire cosa l'IA puo e non puo fare
- Include: prompt engineering, verifica critica, uso etico, comprensione dei limiti
- Paragonabile all'information literacy degli anni 2000 (saper cercare su Google)
- Sara probabilmente parte dei curricula scolastici nel prossimo futuro

---

## Transizione alla slide successiva

> "Vi ho dato gli strumenti. Ora la scelta e vostra: potete usare l'IA per diventare piu bravi, o per diventare piu pigri. La prossima slide parla proprio di questo: il vostro ruolo in un mondo con l'IA."

Collega a "Il Vostro Ruolo" (07).

---

## Riferimenti

- Google, "NotebookLM" (2023-presente)
- Gao et al., "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (RAG, 2020)
- UNESCO, "Guidance for generative AI in education and research" (2023)
