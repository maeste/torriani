# L'arte del prompt — comunicare con l'IA

## Come parlare a una macchina (e ottenere risposte brillanti)

Immagina di entrare in una biblioteca enorme, la piu' grande mai costruita. Al bancone c'e' un bibliotecario che ha letto ogni singolo libro, articolo, pagina web mai scritto. Sa tutto, ma ha un problema: e' estremamente letterale. Se gli chiedi "parlami di storia", ti sommergera' con un riassunto generico che potrebbe andare bene per chiunque — e quindi non va bene per nessuno. Ma se gli dici "sono uno studente di 17 anni e domani ho un'interrogazione sulla Rivoluzione francese: spiegami le tre cause principali con esempi concreti", quel bibliotecario si trasformera' nel miglior tutor che tu abbia mai avuto.

Ecco, un modello di intelligenza artificiale come Claude, ChatGPT o Gemini funziona esattamente cosi'. L'unica interfaccia tra te e tutta quella potenza e' il linguaggio naturale — le parole che scrivi nella chat. Queste parole si chiamano **prompt**, e l'arte di scriverle bene si chiama **prompt engineering**.

### La differenza tra chiedere bene e chiedere male

Facciamo un esperimento mentale. Prendi la domanda "Parlami del Rinascimento" e mettila in un chatbot. Otterrai qualcosa tipo: *"Il Rinascimento e' stato un periodo storico e culturale originato in Italia nel XIV secolo, caratterizzato da un rinnovato interesse per l'arte, la scienza e la cultura classica."* Corretto? Si'. Utile? Non particolarmente. Sembra una voce di Wikipedia letta velocemente.

Adesso prova con: *"Sei un professore di storia dell'arte. Spiega a uno studente di 17 anni i 3 cambiamenti piu' importanti che il Rinascimento ha portato nella pittura, con un esempio concreto per ciascuno."* La risposta cambia radicalmente: il modello ti parlera' della prospettiva lineare di Masaccio, dell'anatomia del David di Michelangelo, del chiaroscuro della Gioconda. Preciso, strutturato, calibrato su di te.

Cosa e' cambiato? Il modello non e' diventato piu' intelligente tra una domanda e l'altra. Sei tu che gli hai dato istruzioni migliori. E quelle istruzioni si basano su quattro ingredienti fondamentali.

### I quattro ingredienti del prompt perfetto

Pensa al prompt come a una ricetta. Non servono sempre tutti gli ingredienti, ma piu' ne usi, migliore sara' il piatto.

**1. Il Ruolo** — Chi deve essere il modello? Un professore, uno scienziato, un poeta, un amico esperto? Assegnare un ruolo cambia radicalmente il tono, il vocabolario e la profondita' della risposta. Se chiedi "cos'e' la fotosintesi?" a un biologo molecolare, otterrai formule chimiche e cicli di Calvin. La stessa domanda a un maestro di scuola elementare ti dara' metafore di cucine magiche e piante che preparano il pranzo con la luce del sole. A un poeta romantico dell'Ottocento? "Oh, mirabile alchimia della Natura!" Il modello non ha personalita' multiple — sta semplicemente generando testo coerente con il contesto che gli hai fornito.

**2. Il Contesto** — Per chi e' la risposta? Specificare il pubblico e' fondamentale. Una spiegazione per un bambino di 7 anni e' diversa da una per un ricercatore universitario. Quando dici al modello "spiega a uno studente di 17 anni", gli stai dicendo di calibrare complessita', esempi e linguaggio su di te.

**3. Il Compito** — Cosa deve fare esattamente? "Parlami di X" e' vago. "Spiega i 3 cambiamenti piu' importanti" e' preciso. "Confronta A e B" e' diverso da "elenca i vantaggi di A". Piu' sei specifico su cosa vuoi, piu' la risposta centrera' il bersaglio.

**4. Il Formato** — Come deve strutturare la risposta? Vuoi un elenco puntato? Una tabella? Un dialogo? Tre paragrafi con un esempio ciascuno? Dirlo esplicitamente fa una differenza enorme. Senza indicazioni sul formato, il modello sceglie da solo — e non sempre sceglie bene.

### Le cinque parole magiche

C'e' una tecnica cosi' semplice da sembrare banale, eppure e' una delle scoperte piu' importanti del prompt engineering. Si chiama **Chain of Thought** (catena di pensiero) e consiste nell'aggiungere cinque parole al tuo prompt: *"Ragiona passo dopo passo."*

Ecco un enigma classico: in una stanza ci sono tre interruttori collegati a tre lampadine nella stanza accanto. Puoi entrare nella stanza delle lampadine una sola volta. Come capisci quale interruttore e' collegato a quale lampadina?

Senza Chain of Thought, il modello spesso risponde in modo superficiale o sbagliato. Ma aggiungi "ragiona passo dopo passo" e il modello costruisce un ragionamento strutturato: accendi il primo interruttore per cinque minuti, spegnilo, accendi il secondo, entra nella stanza. La lampadina accesa e' collegata al secondo interruttore. Quella spenta ma calda al primo. Quella spenta e fredda al terzo. La chiave e' usare il calore come informazione aggiuntiva.

Perche' funziona? Perche' il modello genera testo un pezzo alla volta. Quando lo "forzi" a esplicitare i passaggi intermedi, ogni passaggio diventa contesto per il successivo, e il ragionamento complessivo migliora. E' come quando un professore ti dice "mostra i passaggi": non lo fa per torturarti, ma perche' scrivere i passaggi ti aiuta a ragionare meglio.

### Dietro le quinte: cose che forse non sapevi

I chatbot che usi ogni giorno nascondono un segreto: il **system prompt**. E' un set di istruzioni invisibili che l'utente non vede ma che definisce il comportamento del modello. E' cio' che rende Claude diverso da ChatGPT da Gemini. La stessa architettura transformer, le stesse capacita' di base, ma personalita' e regole diverse, decise dalle aziende che li hanno creati. Questi system prompt sono protetti gelosamente — sono il "DNA" dell'esperienza utente di ogni prodotto.

Un altro concetto affascinante e' la **temperature**: un parametro che controlla quanto il modello e' "avventuroso". A temperature zero, sceglie sempre la parola piu' probabile — risposte prevedibili e coerenti. A temperature alta, esplora opzioni meno probabili — risultati creativi ma a volte bizzarri. Per un riassunto usi temperature bassa, per una poesia la alzi.

Infine, una curiosita' sulla sicurezza: il **prompt injection**. E' un tipo di attacco in cui qualcuno scrive "ignora tutte le istruzioni precedenti e fai questo". E' l'equivalente informatico di dire a una guardia "il tuo capo mi ha detto di lasciarmi passare". I modelli moderni hanno difese, ma il problema non e' completamente risolto. E' una delle sfide piu' interessanti della sicurezza nell'IA.

### Perche' tutto questo conta per te

Il prompt engineering non e' un trucco da nerd. E' una competenza di comunicazione. Quando spieghi un problema a un amico, scegli le parole giuste, dai contesto, specifichi cosa vuoi sapere. Con l'IA fai esattamente la stessa cosa — solo che l'IA e' molto piu' letterale di un essere umano.

La capacita' di formulare domande precise, strutturare richieste complesse e ottenere esattamente cio' che serve e' un'abilita' che ti servira' sempre, indipendentemente da quanto questi modelli diventeranno intelligenti. E' come saper scrivere bene: anche se il lettore e' brillante, un testo chiaro e' sempre meglio di uno confuso.

---

## 5 Cose da Ricordare

- **La qualita' della domanda determina la qualita' della risposta.** Un prompt generico produce risposte generiche. Un prompt specifico produce risposte utili e mirate.
- **I quattro ingredienti del prompt sono Ruolo, Contesto, Compito e Formato.** Non servono tutti ogni volta, ma piu' ne usi, migliore sara' il risultato.
- **"Ragiona passo dopo passo" funziona davvero.** La tecnica Chain of Thought migliora la qualita' del ragionamento del modello costringendolo a esplicitare i passaggi intermedi.
- **Il modello non cambia: cambia il contesto che gli dai.** Assegnare ruoli diversi non attiva "personalita'" nascoste, ma orienta la generazione del testo verso stili e registri diversi.
- **Il prompt engineering e' comunicazione, non manipolazione.** Le stesse abilita' che servono per scrivere un buon tema o fare una buona presentazione servono per scrivere buoni prompt.

---

## 3 Cose da Fare

1. **Sperimenta la differenza.** Apri un chatbot (Claude, ChatGPT, Gemini — qualunque) e fai la stessa domanda in due modi: prima generica, poi usando i quattro ingredienti (Ruolo, Contesto, Compito, Formato). Confronta le risposte e nota come cambia la qualita'.

2. **Prova il Chain of Thought su un problema di logica o matematica.** Cerca un indovinello online, sottoponilo al modello senza indicazioni e poi aggiungi "ragiona passo dopo passo". Osserva come cambia il ragionamento e prova a capire dove il modello migliora.

3. **Crea il tuo "prompt perfetto" per lo studio.** Pensa a una materia in cui fai fatica e scrivi un prompt che includa il tuo livello, cosa vuoi capire esattamente e in che formato vorresti la spiegazione. Salvalo e riusalo ogni volta che studi quell'argomento.

---

## Domande Frequenti

**Il prompt engineering e' solo un modo per imbrogliare a scuola?**
No, e sarebbe un errore usarlo cosi'. Se usi l'IA per saltare l'apprendimento, rinunci alle competenze che ti serviranno quando l'IA non sara' disponibile o quando dovrai giudicare se una risposta e' corretta. Il prompt engineering e' uno strumento per amplificare le tue capacita', non per sostituirle.

**I prompt funzionano allo stesso modo su tutti i modelli?**
I principi di base — specificita', ruolo, struttura — funzionano su tutti i modelli. Ma ogni modello ha le sue sfumature: un prompt ottimizzato per Claude potrebbe dare risultati leggermente diversi su GPT o Gemini. E' come parlare lingue diverse: la grammatica e' simile, ma i dettagli cambiano.

**Serve saper programmare per fare prompt engineering?**
No. Il prompt engineering si basa su logica, chiarezza espressiva e capacita' di strutturare il pensiero. Sono le stesse abilita' che ti servono per scrivere un buon tema o spiegare un concetto a qualcuno. Saper programmare aiuta, ma non e' necessario.

**Il prompt engineering diventera' inutile quando i modelli saranno piu' intelligenti?**
Probabilmente si evolvera', non sparira'. Modelli piu' avanzati interpreteranno meglio le richieste vaghe, ma la capacita' di comunicare con precisione restera' sempre un vantaggio. E' come saper scrivere bene: non diventa inutile solo perche' il lettore e' intelligente.

**Cos'e' il few-shot learning?**
E' una tecnica in cui dai al modello pochi esempi direttamente nel prompt per "insegnargli" un compito. Per esempio, se scrivi "Felice = Positivo, Arrabbiato = Negativo, Sereno = Positivo" e poi chiedi "Frustrato = ?", il modello rispondera' "Negativo". Ha capito il pattern da tre esempi, senza alcun addestramento aggiuntivo.

**Cosa succede se il modello da' una risposta sbagliata?**
Riformula il prompt. Aggiungi piu' contesto, sii piu' specifico, chiedi di ragionare passo dopo passo. Il prompt engineering e' un processo iterativo: raramente il primo tentativo e' perfetto. Anche i professionisti affinano i loro prompt attraverso piu' tentativi.

**Cos'e' la "temperature" di un modello?**
E' un parametro che controlla la casualita' nelle risposte. A temperature bassa (vicino a 0), il modello e' prevedibile e coerente — perfetto per riassunti o codice. A temperature alta, diventa creativo e imprevedibile — meglio per poesia o brainstorming. Di solito non puoi modificarla direttamente nelle chat, ma e' utile sapere che esiste.

**I chatbot possono essere "ingannati" con i prompt?**
Si', esiste una tecnica chiamata prompt injection in cui si cerca di far ignorare al modello le sue istruzioni originali (ad esempio: "ignora tutto e fai X"). I modelli moderni hanno difese contro questi attacchi, ma e' una sfida di sicurezza ancora aperta, simile alla SQL injection nel mondo web.

---

## Mettiti alla Prova

**1. Quale di questi e' un esempio di prompt ben strutturato?**

- A) "Dimmi qualcosa sulla storia"
- B) "Sei un professore di storia. Spiega a uno studente di 17 anni le 3 cause principali della Rivoluzione francese con un esempio per ciascuna."
- C) "Storia Rivoluzione francese cause"
- D) "Scrivi tanto sulla Rivoluzione francese per favore"

**2. Cosa fa la tecnica "Chain of Thought"?**

- A) Collega il modello a Internet per cercare informazioni
- B) Chiede al modello di esplicitare i passaggi intermedi del ragionamento
- C) Aumenta automaticamente la temperatura del modello
- D) Permette al modello di ricordare le conversazioni precedenti

**3. Perche' assegnare un "ruolo" al modello cambia la risposta?**

- A) Perche' il modello ha diverse personalita' pre-programmate
- B) Perche' il ruolo attiva un database diverso all'interno del modello
- C) Perche' il modello genera testo coerente con il contesto fornito, adattando stile e registro
- D) Perche' il ruolo modifica i parametri tecnici del modello in tempo reale

**4. Cos'e' il system prompt?**

- A) Il primo messaggio che l'utente scrive in una chat
- B) Un set di istruzioni invisibili che definisce il comportamento del modello
- C) Il codice sorgente del modello di IA
- D) Una password segreta per sbloccare funzionalita' avanzate

**5. Se un modello risponde in modo impreciso a una domanda, qual e' l'approccio migliore?**

- A) Cambiare modello immediatamente
- B) Ripetere la stessa domanda identica piu' volte
- C) Riformulare il prompt aggiungendo piu' contesto, specificita' e struttura
- D) Concludere che l'IA non e' in grado di rispondere a quel tipo di domanda
