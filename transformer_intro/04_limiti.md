# I limiti dell'IA: la macchina non pensa

## Quando il computer parla sicuro... ma sbaglia

Immagina di avere un compagno di classe brillantissimo. Uno di quelli che alza sempre la mano, che risponde a ogni domanda con voce sicura e dettagli impressionanti. Un giorno il prof chiede: "Chi ha firmato il Trattato di Castiglione del 1859?" e il tuo compagno parte: "Il Trattato di Castiglione fu firmato il 3 agosto 1859 da Napoleone III e Francesco Giuseppe I nella cattedrale di San Marco a Castiglione delle Stiviere, dopo la sanguinosa Battaglia di Solferino..."

Wow, pensa la classe. Che preparazione.

Peccato che il Trattato di Castiglione non sia mai esistito. Il trattato vero si chiama Armistizio di Villafranca, fu firmato l'11 luglio 1859, e la cattedrale menzionata non c'entra nulla. Il tuo compagno ha mescolato fatti veri con dettagli inventati, e l'ha fatto con una sicurezza disarmante.

Ecco: i modelli di linguaggio come ChatGPT, Claude o Gemini fanno esattamente questo. E lo fanno per un motivo preciso che, una volta capito, cambia completamente il modo in cui li usi.

### Il cuore del problema: predire non e capire

Ricordi come funziona un LLM? Sceglie la prossima parola piu probabile, una dopo l'altra, basandosi su tutto quello che ha letto durante l'addestramento. Questo meccanismo produce testo fluido, coerente, spesso corretto. Ma il modello non "sa" se quello che dice e vero. Non ha un database di fatti da consultare, non controlla le fonti, non ha un campanello d'allarme che suona quando sta per dire qualcosa di sbagliato.

Se la sequenza di parole piu probabile contiene un errore, il modello lo scrive con la stessa identica sicurezza con cui scrive una cosa giusta. Per il modello non c'e differenza tra verita e invenzione: c'e solo probabilita linguistica.

Questo fenomeno ha un nome che rende bene l'idea: **allucinazioni**. Come una persona che vede qualcosa che non c'e, il modello "vede" fatti, citazioni, numeri che non esistono nella realta, e li presenta come se fossero ovvi.

### Tre tipi di allucinazioni che devi conoscere

Le allucinazioni non sono tutte uguali, e riconoscere i diversi tipi ti aiuta a difenderti.

**La mescolanza vero-falso** e la piu insidiosa. Il modello prende fatti reali e li mescola con dettagli inventati. La Battaglia di Solferino e vera, la data e giusta, ma il trattato successivo e inventato. E come un piatto con ingredienti buoni e uno andato a male: l'aspetto e ottimo, ma ti fa stare male.

**La fonte inventata** e impressionante nella sua sfacciataggine. Chiedi al modello di citare un libro, e lui ti da titolo, autore, editore, anno di pubblicazione e persino il numero di pagina. Tutto perfetto. Tranne che il libro non esiste. Il modello ha imparato il *formato* delle citazioni accademiche, e lo riempie con contenuti plausibili ma fittizi.

**L'errore matematico sicuro** e forse il piu istruttivo. Il modello puo spiegarti perfettamente la formula di Gauss per sommare i numeri da 1 a 100 (che fa 5.050, corretto), e poi applicarla sbagliata nel passaggio successivo, dicendoti che la somma da 1 a 1000 fa 500.050 invece di 500.500. Ha capito il concetto? No. Ha imparato a produrre testo che *sembra* un ragionamento matematico.

### I bias: lo specchio imperfetto della societa

C'e un altro problema, forse ancora piu importante. I modelli di linguaggio imparano da Internet, e Internet e scritta da esseri umani. Esseri umani con i loro pregiudizi, consapevoli e inconsapevoli.

Prova questo esperimento mentale. Se chiedi a un LLM di scrivere una storia su "un chirurgo e un'infermiera che lavorano insieme in ospedale", quasi certamente il chirurgo sara descritto come uomo e l'infermiera come donna. Ma nel prompt non c'era scritto il genere di nessuno dei due. Perche succede?

Perche nella maggior parte dei testi su Internet, la parola "chirurgo" appare piu spesso vicino a pronomi maschili, e "infermiera" vicino a pronomi femminili. Il modello non ha "deciso" nulla: ha semplicemente riprodotto il pattern statistico che ha trovato nei dati. Non e sessista o razzista -- non ha opinioni. Ma riflette i pregiudizi della societa come uno specchio. E come ogni specchio, ci mostra chi siamo, nel bene e nel male.

Questo vale per il genere, per la cultura, per la provenienza geografica. Chiedi di descrivere "una famiglia che cena insieme" e probabilmente otterrai una famiglia nucleare occidentale seduta attorno a un tavolo. Ma una famiglia giapponese, indiana o nigeriana cena in modi molto diversi. Il modello tende a riprodurre il "default" che ha visto piu spesso -- e quel default e quasi sempre occidentale e anglofono, perche la maggior parte dei dati di addestramento sono in inglese.

### RLHF: come gli umani insegnano al modello a fare meglio

Se tutto questo ti sembra preoccupante, sappi che c'e un processo pensato proprio per migliorare le cose. Si chiama **RLHF**, che sta per *Reinforcement Learning from Human Feedback* -- apprendimento per rinforzo dal feedback umano.

Funziona in quattro passaggi:

1. **Il modello genera due risposte diverse** alla stessa domanda. Come due versioni diverse di un compito in classe.
2. **Un essere umano legge entrambe** e sceglie quale e migliore -- piu utile, piu sicura, piu corretta. Non scrive la risposta giusta: indica solo quale preferisce.
3. **Il modello impara dalla preferenza**. Aggiusta i suoi parametri per rendere piu probabili risposte simili a quella scelta dall'umano.
4. **Le risposte migliorano**. Dopo migliaia di questi giudizi, il modello inizia a evitare risposte problematiche e a preferire quelle piu utili e sicure.

E come avere un insegnante che non ti dice mai la risposta giusta, ma ti dice sempre "questa e meglio di quella". Dopo abbastanza feedback, migliori. Il percorso completo di un modello moderno e: pre-training (impara a parlare), fine-tuning (impara il formato domanda-risposta), e infine RLHF (impara a essere utile e sicuro).

Ma attenzione: RLHF non risolve tutto. Chi decide cosa e "migliore"? Chi sono gli esseri umani che danno il feedback? Le loro preferenze sono influenzate dalla loro cultura, dai loro valori, dai loro pregiudizi. E un processo imperfetto che migliora le cose, ma non le rende perfette.

### E allora, serve o no?

La risposta breve e: serve moltissimo, ma va usato con intelligenza. Un LLM e uno strumento potentissimo per generare bozze, esplorare idee, scrivere codice, tradurre, riassumere. Ma il risultato va sempre verificato. Non e un oracolo che detiene la verita: e un assistente molto bravo a produrre testo plausibile.

La differenza tra chi usa bene l'IA e chi la usa male sta tutta qui: sapere che puo sbagliare, e verificare sempre le informazioni importanti con fonti esterne. Non fidarti mai ciecamente. Controlla, confronta, ragiona con la tua testa. L'IA e il tuo strumento, non il tuo sostituto.

---

## 5 Cose da Ricordare

- **Un LLM non capisce, predice.** Sceglie la prossima parola piu probabile. Non distingue tra verita e invenzione: per lui conta solo la probabilita linguistica.
- **Le allucinazioni sono errori detti con sicurezza.** Il modello puo inventare fatti, citazioni e calcoli presentandoli come certi. Non c'e modo di distinguerli dalla risposta corretta guardando solo il testo.
- **I bias vengono dai dati di addestramento.** Il modello impara da Internet e ne riproduce i pregiudizi: di genere, di cultura, di prospettiva. Non ha opinioni, ma riflette quelle della societa.
- **RLHF migliora il modello grazie al feedback umano.** Attraverso migliaia di giudizi "questa risposta e migliore di quella", il modello impara a dare risposte piu sicure e utili. Ma non e una soluzione perfetta.
- **L'IA e uno strumento, non un oracolo.** Va usata con spirito critico: verifica sempre le informazioni importanti, confronta con altre fonti, e non delegare mai il tuo pensiero a una macchina.

---

## 3 Cose da Fare

1. **Metti alla prova un chatbot.** Apri ChatGPT, Claude o un altro assistente IA e prova a fargli inventare qualcosa: chiedigli di un evento storico che non esiste, o di un libro scritto da un autore inventato. Osserva con quanta sicurezza risponde e quanto sono dettagliate le invenzioni.

2. **Fai l'esperimento dei bias.** Chiedi a un LLM di descrivere "un dottore", "un leader" o "una famiglia a cena" senza specificare genere, etnia o cultura. Analizza la risposta: quali assunzioni ha fatto il modello? Sono giustificate dal prompt o sono pregiudizi nascosti nei dati?

3. **Diventa un verificatore.** La prossima volta che usi l'IA per una ricerca scolastica, prendi almeno tre affermazioni dalla risposta e verificale con fonti esterne (Wikipedia, enciclopedie, siti ufficiali). Segna quante erano corrette e quante no. Questo esercizio ti insegnera a calibrare la tua fiducia.

---

## Domande Frequenti

**"Ma allora l'IA e inutile se puo sbagliare?"**
No, tutt'altro. E utilissima, ma va usata come strumento, non come fonte di verita assoluta. Pensa a un martello: e utile anche se puoi colpirti il dito. La differenza sta nel saperlo usare. L'IA e straordinaria per generare bozze, esplorare idee, scrivere codice, tradurre e riassumere. Ma il risultato va sempre verificato.

**"Come faccio a capire se il modello sta allucinando?"**
Purtroppo non puoi capirlo dalla risposta stessa, perche le allucinazioni hanno lo stesso aspetto delle risposte corrette. L'unico modo e verificare le informazioni con fonti esterne e indipendenti. Per questo e fondamentale non fidarsi mai ciecamente e controllare sempre i dati critici.

**"Possono eliminare completamente le allucinazioni?"**
E un problema aperto nella ricerca. Si stanno facendo progressi con tecniche come RAG (Retrieval-Augmented Generation), che permette al modello di consultare documenti reali prima di rispondere. Ma eliminare del tutto le allucinazioni richiederebbe che il modello "capisse" davvero cio che dice, e questo e esattamente cio che non fa. E un limite strutturale, non un semplice bug da correggere.

**"Chi decide cosa e 'giusto' nell'addestramento del modello?"**
Ottima domanda. Le aziende che creano i modelli (OpenAI, Anthropic, Google, Meta) prendono queste decisioni, spesso con team dedicati di etica e sicurezza. Ma e un processo imperfetto e culturalmente influenzato. Cosa e considerato "appropriato" varia tra culture, e non esiste una risposta universale. E uno dei grandi dibattiti nel campo dell'IA.

**"Il modello puo diventare cosciente?"**
Con la tecnologia attuale, no. Un LLM e un sistema statistico molto sofisticato che produce testo plausibile. Non ha esperienze, emozioni o consapevolezza. Quando sembra "pensare", sta in realta producendo la sequenza di parole piu probabile. Il dibattito sulla coscienza artificiale e filosoficamente affascinante, ma tecnicamente molto lontano dalla realta degli LLM di oggi.

**"Perche i modelli sono piu bravi in inglese che in italiano?"**
Perche la stragrande maggioranza dei dati di addestramento e in inglese. Se un modello e stato addestrato su 15 trilioni di parole e il 60% e in inglese, mentre solo il 2-3% e in italiano, e naturale che le sue risposte in inglese siano piu ricche e precise. E un riflesso di quale parte del mondo produce piu contenuti digitali.

**"Cos'e il jailbreaking dei modelli?"**
E il tentativo di aggirare le protezioni di sicurezza di un modello per fargli dire cose che normalmente rifiuterebbe. I ricercatori di sicurezza studiano queste tecniche per trovare vulnerabilita e migliorare le difese, un po' come gli hacker etici nel mondo della cybersecurity. E un campo di ricerca attivo e in continua evoluzione.

**"Se RLHF usa giudizi umani, il modello eredita anche i pregiudizi dei giudici?"**
Si, in parte. Gli esseri umani che valutano le risposte portano con se i propri bias culturali e personali. Le aziende cercano di minimizzare questo effetto usando gruppi diversificati di valutatori e linee guida precise, ma il problema non e completamente risolvibile. Esistono anche approcci alternativi come Constitutional AI, dove il modello si auto-corregge seguendo principi scritti, riducendo la dipendenza dai giudizi individuali.

---

## Mettiti alla Prova

**1. Perche le allucinazioni di un LLM sono particolarmente pericolose?**

a) Perche il modello sa di mentire ma lo fa comunque
b) Perche il modello le presenta con la stessa sicurezza delle risposte corrette, rendendole indistinguibili
c) Perche il modello allucina solo su argomenti scientifici
d) Perche le allucinazioni sono facilmente riconoscibili dal tono della risposta

**2. Da dove vengono i bias di un modello di linguaggio?**

a) Sono programmati intenzionalmente dagli sviluppatori
b) Si formano casualmente durante l'addestramento, senza alcuna causa specifica
c) Riflettono i pregiudizi presenti nei dati su cui il modello e stato addestrato, che provengono da testi scritti da esseri umani
d) Vengono inseriti dagli utenti durante le conversazioni

**3. Cosa fa esattamente un essere umano nel processo RLHF?**

a) Scrive la risposta corretta che il modello deve imparare a memoria
b) Corregge direttamente i parametri del modello
c) Confronta due risposte del modello e indica quale preferisce
d) Elimina le risposte sbagliate dal database del modello

**4. Quale strategia e piu efficace per usare l'IA in modo responsabile?**

a) Usarla solo per argomenti di cui si sa gia tutto
b) Fidarsi completamente perche i modelli moderni sono molto accurati
c) Non usarla mai perche potrebbe sbagliare
d) Usarla come punto di partenza e verificare le informazioni importanti con fonti esterne

**5. Perche il modello presenta un chirurgo come uomo quando il prompt non specifica il genere?**

a) Perche il modello ha opinioni sessiste
b) Perche nei dati di addestramento la parola "chirurgo" appare statisticamente piu spesso associata a descrizioni maschili
c) Perche gli sviluppatori hanno programmato questa associazione
d) Perche il modello conosce le statistiche reali sulla distribuzione di genere tra i chirurghi e le applica
