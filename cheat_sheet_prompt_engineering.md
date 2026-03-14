# Cheat Sheet - Prompt Engineering

> **Per studenti del 5 anno - Liceo Scientifico opzione Scienze Applicate**
> Stampa questo documento e tienilo a portata di mano quando lavori con l'IA.

---

## 1. Tecniche fondamentali

### Specificita

Piu il prompt e dettagliato, migliore sara la risposta. Indica cosa vuoi, in che formato, con quale livello di dettaglio.

- **❌ Prompt vago:** `Parlami della cellula`
- **✅ Prompt specifico:** `Descrivi le differenze tra cellula procariote e eucariote in una tabella con 5 caratteristiche: dimensione, nucleo, organelli, DNA, esempi di organismi`

---

### Ruolo (Role Prompting)

Assegna un'identita all'IA per ottenere risposte con il tono e la competenza giusta.

- **❌ Senza ruolo:** `Spiegami le derivate`
- **✅ Con ruolo:** `Sei un professore di matematica del liceo scientifico. Spiegami le derivate come faresti a uno studente di quinta che ha gia studiato i limiti. Usa esempi pratici e un linguaggio chiaro.`

---

### Chain of Thought (Catena di pensiero)

Chiedi all'IA di ragionare passo dopo passo. Migliora drasticamente i risultati su problemi logici e matematici.

- **❌ Diretto:** `Quanto vale l'integrale definito di 3x^2 da 0 a 2?`
- **✅ Chain of Thought:** `Calcola l'integrale definito di 3x^2 da 0 a 2. Ragiona passo dopo passo: scrivi la primitiva, applica il teorema fondamentale del calcolo integrale, mostra tutti i passaggi numerici.`

---

### Few-shot (Apprendimento con esempi)

Dai 2-3 esempi del formato o dello stile che vuoi prima della richiesta vera. L'IA capira il pattern e lo seguira.

- **❌ Zero-shot:** `Traduci questa frase in inglese formale: "Ci vediamo domani"`
- **✅ Few-shot:**
  ```
  Traduci queste frasi in inglese formale:

  Italiano: "Come stai?"
  Inglese formale: "How do you do?"

  Italiano: "Grazie mille per l'aiuto"
  Inglese formale: "I am most grateful for your assistance"

  Italiano: "Ci vediamo domani"
  Inglese formale:
  ```

---

### Output strutturato

Specifica esattamente il formato che vuoi: tabella, elenco puntato, JSON, schema, mappa concettuale.

- **❌ Generico:** `Dimmi le differenze tra moto rettilineo uniforme e uniformemente accelerato`
- **✅ Strutturato:** `Confronta il moto rettilineo uniforme e il moto uniformemente accelerato. Usa una tabella con queste colonne: Caratteristica, MRU, MRUA. Includi: definizione, velocita, accelerazione, legge oraria, grafico s-t, esempio reale.`

---

## 2. Template pronti per materie LSA

Copia il template, sostituisci i `[PLACEHOLDER]` con il tuo contenuto, incolla nella chat con l'IA.

---

### Italiano / Letteratura

**Analisi del testo:**
```
Sei un docente di letteratura italiana esperto.
Analizza il seguente testo di [AUTORE]:

"[INCOLLA IL TESTO]"

Struttura la tua analisi cosi:
1. Contestualizzazione storico-letteraria (periodo, corrente, opera)
2. Analisi del contenuto (temi principali, messaggio)
3. Analisi stilistica (figure retoriche, registro linguistico, metrica se poesia)
4. Significato e attualita del testo
Usa un linguaggio adatto a uno studente di quinta superiore.
```

**Confronto autori:**
```
Confronta [AUTORE 1] e [AUTORE 2] rispetto al tema di [TEMA].
Per ciascun autore indica:
- Periodo storico e corrente letteraria
- Opera/e di riferimento per questo tema
- Come trattano il tema (con citazioni se possibile)
- Punti in comune e differenze principali
Concludi con una sintesi critica personale.
```

**Preparazione tema (tipologia B - testo argomentativo):**
```
Aiutami a preparare una scaletta per un testo argomentativo su: [ARGOMENTO].

Struttura la scaletta cosi:
1. Introduzione con aggancio e presentazione della tesi
2. Almeno 3 argomenti a favore con esempi concreti
3. Antitesi: 1-2 obiezioni possibili e come confutarle
4. Conclusione che riprende la tesi rafforzandola
Per ogni punto suggeriscimi fonti o riferimenti culturali che posso citare.
```

---

### Matematica

**Risoluzione problemi step-by-step:**
```
Sei un tutor di matematica. Risolvi il seguente problema passo dopo passo:

[INSERISCI IL PROBLEMA]

Per ogni passaggio:
- Scrivi la regola o il teorema che stai applicando
- Mostra il calcolo completo
- Spiega brevemente PERCHE fai quel passaggio
Alla fine, verifica il risultato con un metodo alternativo se possibile.
```

**Spiegazione concetti:**
```
Spiegami [CONCETTO MATEMATICO] come se fossi uno studente di quinta
che ha gia studiato [PREREQUISITI].

Includi:
- Definizione intuitiva (senza formalismi eccessivi)
- Definizione formale
- 2-3 esempi risolti di difficolta crescente
- A cosa serve nella pratica o in altre materie
- Errori comuni da evitare
```

---

### Fisica

**Comprensione fenomeni:**
```
Spiega il fenomeno fisico di [FENOMENO] a uno studente di quinta liceo scientifico.

Organizza la spiegazione cosi:
1. Descrizione qualitativa del fenomeno (cosa succede e perche)
2. Leggi fisiche coinvolte con le formule
3. Un esempio numerico realistico svolto passo dopo passo
4. Applicazioni nella vita quotidiana o nella tecnologia
5. Collegamento con [ALTRO ARGOMENTO DI FISICA/MATEMATICA] se rilevante
```

**Risoluzione esercizi:**
```
Risolvi questo esercizio di fisica ragionando passo dopo passo:

[INSERISCI L'ESERCIZIO]

Segui questo schema:
1. Dati e incognite (con unita di misura)
2. Schema o disegno concettuale (descrivilo a parole)
3. Leggi fisiche applicabili
4. Svolgimento con tutti i passaggi
5. Risultato con unita di misura e verifica dimensionale
```

---

### Scienze naturali

**Biologia:**
```
Spiega [ARGOMENTO DI BIOLOGIA] in modo chiaro e dettagliato.

Struttura:
- Definizione e inquadramento nel contesto biologico
- Meccanismo o processo (descrivi passo dopo passo)
- Schema riassuntivo (usa elenchi e sotto-elenchi)
- Importanza biologica e medica
- Un collegamento con [CHIMICA / FISICA / ATTUALITA]
Livello: studente quinta liceo scientifico con basi di biochimica.
```

**Chimica:**
```
Spiega [ARGOMENTO DI CHIMICA] a uno studente di quinta liceo scientifico.

Includi:
- Concetto fondamentale con definizione
- Meccanismo di reazione o processo (se applicabile)
- Esempi concreti con equazioni bilanciate
- Applicazioni pratiche o industriali
- Esercizio tipo con svolgimento
```

**Scienze della Terra:**
```
Descrivi [FENOMENO GEOLOGICO/ASTRONOMICO] in modo approfondito.

Organizza:
1. Descrizione del fenomeno
2. Cause e meccanismi (con riferimenti alla fisica se rilevante)
3. Evidenze scientifiche
4. Effetti e conseguenze
5. Collegamento con l'attualita (cambiamento climatico, rischio sismico, ecc.)
```

---

### Informatica

**Debug codice:**
```
Ho scritto questo codice in [LINGUAGGIO] ma non funziona come previsto:

```[LINGUAGGIO]
[INCOLLA IL CODICE]
```

Comportamento atteso: [COSA DOVREBBE FARE]
Comportamento attuale: [COSA FA INVECE / ERRORE]

Analizza il codice, trova il/i bug e:
1. Spiega cosa causa il problema
2. Mostra il codice corretto
3. Spiega cosa hai cambiato e perche
```

**Spiegazione algoritmi:**
```
Spiega l'algoritmo di [NOME ALGORITMO] a uno studente di informatica del liceo.

Includi:
1. A cosa serve (problema che risolve)
2. Come funziona (spiegazione intuitiva con un esempio concreto)
3. Pseudocodice commentato passo dopo passo
4. Complessita computazionale (O grande) spiegata in modo semplice
5. Implementazione in Python con commenti
```

**Progettazione:**
```
Devo progettare [TIPO DI PROGETTO SOFTWARE].

Requisiti: [ELENCO REQUISITI]

Aiutami a:
1. Definire le strutture dati necessarie
2. Identificare le funzioni/classi principali
3. Scrivere lo pseudocodice della logica principale
4. Suggerire come organizzare i file del progetto
Linguaggio: [PYTHON / JAVA / C++ / ALTRO]
```

---

### Inglese

**Traduzione contestuale:**
```
Traduci il seguente testo da [ITALIANO/INGLESE] a [INGLESE/ITALIANO]:

"[TESTO]"

Non fare una traduzione letterale. Per ogni scelta lessicale significativa,
spiega brevemente perche hai scelto quella parola/espressione.
Indica il registro (formale/informale) e adattalo al contesto: [CONTESTO].
```

**Writing practice:**
```
Aiutami a scrivere un [ESSAY / LETTER / ARTICLE / REVIEW] in inglese su [ARGOMENTO].

Livello richiesto: B2/C1
Lunghezza: circa [NUMERO] parole
Registro: [FORMALE / INFORMALE / ACCADEMICO]

Fornisci:
1. Una bozza completa
2. Evidenzia 5 espressioni o strutture grammaticali avanzate usate
3. Suggerisci 3 modi per migliorare il testo
```

**Grammar explanation:**
```
Spiegami in italiano la regola grammaticale inglese di [ARGOMENTO GRAMMATICALE].

Includi:
- Regola spiegata in modo chiaro
- 3 esempi corretti con traduzione
- 2 errori comuni da evitare (con la correzione)
- Un esercizio con 5 frasi da completare (e le soluzioni alla fine)
```

---

### Storia

**Analisi eventi:**
```
Analizza [EVENTO STORICO] in modo approfondito.

Struttura:
1. Contesto: situazione politica, economica e sociale precedente
2. Cause immediate e cause profonde
3. Svolgimento dei fatti principali (cronologia essenziale)
4. Conseguenze a breve e lungo termine
5. Interpretazioni storiografiche diverse (almeno 2 punti di vista)
6. Collegamento con [ALTRO EVENTO / SITUAZIONE ATTUALE]
```

**Preparazione interrogazione:**
```
Sto preparando un'interrogazione di storia su [PERIODO/ARGOMENTO].

Crea:
1. Schema riassuntivo con i concetti chiave (date, personaggi, eventi)
2. 10 domande probabili che il professore potrebbe fare
3. Per ogni domanda, una risposta sintetica ma completa (5-6 righe)
4. 3 collegamenti interdisciplinari da poter menzionare
```

---

### Filosofia

**Confronto pensatori:**
```
Confronta il pensiero di [FILOSOFO 1] e [FILOSOFO 2] sul tema di [TEMA].

Per ciascun filosofo:
- Contesto storico e corrente filosofica
- Concetti chiave relativi al tema
- Opera/e di riferimento
- Citazione significativa (se nota)

Poi:
- Punti di convergenza e divergenza
- Quale posizione ti sembra piu convincente e perche (stimola il mio pensiero critico)
```

**Analisi concetti:**
```
Spiega il concetto di [CONCETTO FILOSOFICO] nel pensiero di [FILOSOFO].

Struttura:
1. Definizione del concetto
2. Come si inserisce nel sistema filosofico dell'autore
3. Da quali problemi o domande nasce
4. Esempio concreto che lo illustra
5. Critiche principali mosse a questo concetto
6. Rilevanza attuale del concetto
```

**Argomentazione:**
```
Aiutami a costruire un'argomentazione filosofica su: [TESI DA SOSTENERE].

Segui questa struttura:
1. Enunciazione chiara della tesi
2. 3 argomenti a sostegno, ciascuno con un riferimento filosofico
3. Possibili obiezioni (almeno 2) e come rispondere
4. Conclusione che rafforza la tesi
Usa un linguaggio filosofico appropriato ma comprensibile.
```

---

## 3. Strumenti consigliati

### Chatbot via web

| Strumento | Gratis | Piano a pagamento | Punto di forza | Limite principale |
|-----------|--------|-------------------|----------------|-------------------|
| **ChatGPT** (OpenAI) | Si, GPT-4o mini | Plus ~20$/mese | Versatile, ampia community | Limiti di utilizzo nel piano gratuito |
| **Claude** (Anthropic) | Si, Claude Sonnet | Pro ~20$/mese | Ragionamento, testi lunghi, codice | Meno diffuso, limiti giornalieri gratis |
| **Gemini** (Google) | Si, Gemini Flash | Advanced ~22$/mese | Integrazione Google (Drive, Docs) | A volte meno preciso su compiti tecnici |
| **Perplexity** | Si, base | Pro ~20$/mese | Ricerca con fonti citate | Meno adatto per compiti creativi |

**Quando usare quale:**

- **ChatGPT** -- Scelta sicura per tutto: studio, scrittura, codice, brainstorming
- **Claude** -- Analisi di testi lunghi, ragionamento complesso, programmazione, quando serve precisione
- **Gemini** -- Se usi Google Workspace (Docs, Sheets) e vuoi integrazione diretta
- **Perplexity** -- Quando ti serve una ricerca con fonti verificabili (tesine, approfondimenti)

---

### CLI (Command Line Interface)

**Claude Code** -- Strumento da terminale di Anthropic per chi programma.

- **Cos'e:** Un assistente IA che lavora direttamente nel terminale, legge i tuoi file, scrive codice, esegue comandi
- **Per chi e:** Studenti di informatica che gia usano il terminale e un editor di codice
- **Quando ha senso:** Progetti di programmazione, debug complessi, automazione
- **Come iniziare:** `npm install -g @anthropic-ai/claude-code` (richiede Node.js)

---

### App integrate

| Tipo | Esempi | Quando usarlo |
|------|--------|---------------|
| **Web (browser)** | ChatGPT, Claude, Gemini | Uso generale, studio, domande rapide |
| **Estensioni browser** | Estensioni ChatGPT per Chrome | Riassunti pagine web, traduzioni al volo |
| **Plugin VS Code** | GitHub Copilot, Continue | Mentre scrivi codice nell'editor |
| **CLI** | Claude Code | Progetti di programmazione dal terminale |

**Tabella decisionale:**

| Devo... | Usa |
|---------|-----|
| Studiare, capire un argomento | Web (ChatGPT, Claude, Gemini) |
| Fare una ricerca con fonti | Web (Perplexity) |
| Scrivere o correggere codice nell'editor | Plugin VS Code |
| Lavorare su un progetto di programmazione | CLI (Claude Code) |
| Riassumere un articolo web | Estensione browser |

---

## 4. Video consigliati

### Canali e risorse in italiano

| Cosa cercare | Tipo di contenuto | Note |
|--------------|-------------------|------|
| Cerca su YouTube: `"prompt engineering tutorial italiano"` | Guide pratiche | Molti creator italiani pubblicano tutorial aggiornati |
| Cerca su YouTube: `"come usare ChatGPT per lo studio"` | Uso pratico per studenti | Filtra per "ultimo mese" per contenuti aggiornati |
| Cerca su YouTube: `"intelligenza artificiale spiegata semplice"` | Concetti base IA | Buon punto di partenza |

### Canali YouTube da esplorare

- **Marcello Ascani** -- Creator italiano che tratta tecnologia e produttivita. Cerca i suoi video su IA e strumenti digitali.
- **Andrea Galeazzi** -- Recensioni tech. Ha trattato strumenti IA e il loro utilizzo pratico.
- **Kurzgesagt - In a Nutshell** -- Canale internazionale con sottotitoli italiani. Video animati che spiegano concetti scientifici e tecnologici in modo chiaro. Cerca i loro video su intelligenza artificiale.

### Risorse in inglese (con sottotitoli)

- Cerca su YouTube: `"prompt engineering for students"` -- Molti video hanno sottotitoli automatici in italiano
- Cerca su YouTube: `"3Blue1Brown neural networks"` -- Eccellente serie animata su come funzionano le reti neurali (sottotitoli IT disponibili)

> **Consiglio:** I video su YouTube invecchiano rapidamente in questo campo. Filtra sempre per **"ultimo anno"** nei risultati di ricerca per avere contenuti aggiornati.

---

## 5. Consigli pratici

### Come verificare le risposte dell'IA (fact-checking)

L'IA puo generare informazioni **plausibili ma false** (hallucination). Verifica sempre:

1. **Fonti primarie** -- Se l'IA cita un dato, un articolo o una legge, cercalo su Google per conferma
2. **Incrocia le fonti** -- Chiedi la stessa cosa a un'altra IA o cerca su fonti autorevoli (enciclopedie, siti istituzionali, libri di testo)
3. **Formule e calcoli** -- Ricalcola a mano i passaggi matematici. L'IA puo sbagliare i conti
4. **Date e nomi** -- L'IA a volte confonde date, nomi di persona e titoli di opere. Controlla sempre
5. **Codice** -- Esegui sempre il codice generato. Non fidarti che funzioni solo perche "sembra giusto"

> **Regola d'oro:** L'IA e un punto di partenza, non la risposta definitiva.

---

### Privacy: cosa NON inserire nei prompt

- **MAI** dati personali (nome completo, indirizzo, telefono, codice fiscale)
- **MAI** password, credenziali, codici di accesso
- **MAI** foto di documenti di identita
- **MAI** informazioni sensibili su altre persone
- **MAI** dati medici personali
- **Attenzione** a caricare file che contengono dati personali (PDF, fogli Excel)

> I dati che inserisci potrebbero essere usati per addestrare il modello. Tratta ogni prompt come se fosse pubblico.

---

### Uso etico: studiare vs copiare

| Studiare CON l'IA (OK) | Copiare DALL'IA (NO) |
|-------------------------|----------------------|
| Farsi spiegare un concetto che non capisci | Copiare e incollare un tema senza leggerlo |
| Chiedere un esercizio svolto per capire il metodo | Consegnare un esercizio fatto dall'IA come tuo |
| Usare l'IA per verificare la tua soluzione | Usare l'IA durante un compito in classe |
| Generare quiz per auto-valutarti | Farsi scrivere un'intera tesina |
| Chiedere feedback su un tuo testo | Presentare codice generato senza capirlo |

> **Il test:** Se qualcuno ti chiedesse di spiegare quello che hai consegnato, saresti in grado di farlo? Se no, stai copiando.

---

### Come iterare: migliora il prompt

Se la prima risposta non ti soddisfa, non arrenderti. Migliora il prompt:

1. **Troppo generico?** -- Aggiungi dettagli e vincoli: lunghezza, formato, livello
2. **Troppo complesso?** -- Chiedi: `"Semplifica la spiegazione, usa un linguaggio da liceo"`
3. **Manca qualcosa?** -- Chiedi: `"Aggiungi anche un esempio numerico"`
4. **Formato sbagliato?** -- Specifica: `"Riscrivi sotto forma di tabella/elenco/schema"`
5. **Tono sbagliato?** -- Chiedi: `"Riscrivi in modo piu formale/informale/sintetico"`

> Non cancellare la chat. Continua la conversazione: l'IA ricorda il contesto e ogni messaggio la guida meglio.

---

## 6. Errori comuni

### 1. Prompt troppo vaghi
- **❌** `Spiegami la storia` -- Quale storia? Quale periodo? Per fare cosa?
- **✅** `Spiegami le cause della Prima Guerra Mondiale in 10 punti sintetici, adatti a preparare un'interrogazione`

### 2. Non dare contesto
- **❌** `Risolvi questo esercizio: trova x` -- L'IA non sa di quale materia o argomento si tratta
- **✅** `Risolvi questa equazione di secondo grado: 2x^2 - 5x + 3 = 0. Mostra tutti i passaggi usando la formula risolutiva.`

### 3. Fidarsi ciecamente della prima risposta
- L'IA puo sbagliare, specialmente con calcoli, date, e citazioni
- **Soluzione:** Verifica sempre, chiedi `"Sei sicuro? Controlla il passaggio 3"` oppure ricalcola a mano

### 4. Fare prompt troppo lunghi e confusi
- Un prompt con 10 richieste diverse confonde l'IA
- **Soluzione:** Una richiesta per messaggio, o numera chiaramente le sotto-richieste

### 5. Non specificare il formato di output
- Se non chiedi un formato preciso, l'IA sceglie quello che vuole
- **Soluzione:** Specifica sempre: `"Rispondi con una tabella"`, `"Usa un elenco numerato"`, `"Dammi la risposta in massimo 100 parole"`

### 6. Usare l'IA senza aver provato da soli
- Se chiedi la soluzione prima di aver provato, non impari nulla
- **Soluzione:** Prova prima da solo, poi chiedi all'IA di **verificare** la tua soluzione o di **spiegare** dove hai sbagliato

---

> **Ultima nota:** Il prompt engineering e una competenza pratica. Piu la usi, piu diventi bravo. Sperimenta, sbaglia, migliora. Buon lavoro!
