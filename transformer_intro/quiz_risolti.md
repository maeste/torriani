# Quiz Risolti — Tutte le Risposte Corrette

Questo documento contiene tutte le domande dei quiz "Mettiti alla Prova" con le risposte corrette evidenziate e una breve spiegazione.

---

## La Quinta Rivoluzione: Come l'Intelligenza Artificiale Cambia il Mondo (di Nuovo)

**1. Qual e il pattern ricorrente in tutte le rivoluzioni industriali?**

a) Nuova tecnologia, entusiasmo generale, adozione immediata, obsolescenza rapida
b) **Nuova tecnologia, paura e resistenza, chi la adotta prospera, diventa indispensabile** ✅
c) Nuova tecnologia, regolamentazione governativa, adozione forzata, miglioramento graduale
d) Nuova tecnologia, guerra tra nazioni, vincono i piu ricchi, scompaiono i vecchi lavori

> Dal vapore a internet, ogni rivoluzione ha seguito lo stesso schema: iniziale resistenza seguita da adozione progressiva che ha premiato i pionieri.

**2. Perche l'avvento del computer (anni '50) rappresenta un salto qualitativo rispetto alle rivoluzioni precedenti?**

a) Perche i computer sono piu costosi delle macchine a vapore
b) **Perche per la prima volta si automatizza il lavoro mentale ripetitivo, non solo quello fisico** ✅
c) Perche i computer hanno eliminato tutti i lavori manuali
d) Perche i computer funzionano con l'elettricita, che e piu potente del vapore

> Le rivoluzioni precedenti (vapore, elettricita) automatizzavano la forza fisica; il computer e stato il primo strumento a sostituire il calcolo mentale ripetitivo.

**3. Cosa si intende con l'espressione "siamo nel 1995 di internet" riferita all'IA?**

a) Che l'IA e vecchia quanto internet nel 1995, cioe ha circa trent'anni
b) Che l'IA ha raggiunto lo stesso numero di utenti di internet nel 1995
c) **Che siamo all'inizio di una fase di crescita enorme, e il grosso dei cambiamenti deve ancora arrivare** ✅
d) Che l'IA funziona grazie a internet e senza internet non esisterebbe

> Come internet nel 1995 era appena diventato accessibile al pubblico (con Netscape), ChatGPT nel 2022 ha reso l'IA accessibile a tutti, e il potenziale e ancora largamente inesplorato.

**4. Cosa distingue la quinta rivoluzione (IA) dalle precedenti?**

a) E la prima rivoluzione che non spaventa nessuno
b) **E la prima in cui le macchine gestiscono compiti cognitivi complessi come scrivere, tradurre e ragionare** ✅
c) E la prima rivoluzione che non crea nuovi posti di lavoro
d) E la prima rivoluzione guidata da un singolo paese

> Per la prima volta, la tecnologia non automatizza solo operazioni fisiche o calcoli ripetitivi, ma compiti che richiedono capacita cognitive complesse.

**5. Perche il confronto diretto tra parametri di un'IA e neuroni del cervello umano va preso con cautela?**

a) Perche i parametri sono misurati in byte e i neuroni in volt
b) **Perche un neurone biologico e enormemente piu complesso di un singolo parametro artificiale** ✅
c) Perche i neuroni funzionano solo di giorno e i parametri funzionano sempre
d) Perche nessuno ha mai contato i neuroni del cervello umano

> Un neurone biologico e una cellula estremamente complessa con migliaia di connessioni sinaptiche, mentre un parametro artificiale e un singolo numero; il confronto diretto e quindi fuorviante.

---

## Dalle Parole ai Numeri: Come una Macchina "Legge" il Testo

**1. Cosa fa un tokenizer?**

- A) Traduce il testo da una lingua all'altra
- **B) Spezza il testo in pezzi (token) e assegna a ciascuno un numero identificativo** ✅
- C) Corregge gli errori grammaticali nel testo
- D) Genera nuove frasi a partire da parole chiave

> Il tokenizer e il primo passo: trasforma il testo in una sequenza di numeri identificativi che il modello puo elaborare.

**2. Perche i modelli usano la subword tokenization invece di avere un token per ogni parola?**

- A) Perche le parole intere occupano troppa memoria nel computer
- B) Perche cosi il modello puo anche generare immagini
- **C) Perche con un vocabolario ridotto di sotto-parti si puo rappresentare qualsiasi testo, anche parole mai viste** ✅
- D) Perche le parole italiane sono troppo lunghe per i computer americani

> Con 30.000-50.000 sotto-parti si puo rappresentare qualsiasi testo, anche parole nuove o rare, senza un vocabolario enorme.

**3. Cosa significa che "parole con significato simile hanno vettori vicini"?**

- A) Che le parole simili hanno lo stesso numero identificativo
- **B) Che le liste di numeri che rappresentano parole con significato simile sono matematicamente vicine nello spazio** ✅
- C) Che le parole simili vengono sempre spezzate nello stesso modo dal tokenizer
- D) Che il modello ha un dizionario dei sinonimi incorporato

> I vettori (liste di migliaia di numeri) di parole come "gatto" e "cane" sono vicini nello spazio multidimensionale, perche appaiono in contesti simili nei dati di addestramento.

**4. Nell'esempio dell'aritmetica vettoriale, perche Marito - Uomo + Donna da un risultato vicino a Moglie?**

- A) Perche qualcuno ha programmato manualmente questa relazione nel modello
- B) Perche il modello ha memorizzato un elenco di coppie sposate
- **C) Perche il modello ha scoperto autonomamente che la relazione maschio/femmina e parallela alla relazione marito/moglie, leggendo molti testi** ✅
- D) Perche "moglie" e semplicemente la parola piu simile a "marito" nel vocabolario

> Il modello ha appreso le relazioni semantiche dai dati: la "direzione" nello spazio vettoriale da "uomo" a "donna" e la stessa da "marito" a "moglie".

**5. Come fa il modello a imparare dove posizionare ogni parola nello spazio degli embedding?**

- A) Un team di linguisti inserisce manualmente la posizione di ogni parola
- B) Le posizioni sono generate casualmente e non cambiano mai
- **C) Il modello osserva i contesti in cui le parole appaiono in miliardi di frasi e impara automaticamente le posizioni durante l'addestramento** ✅
- D) Il modello copia le posizioni da un dizionario enciclopedico digitale

> E l'ipotesi distribuzionale: "una parola e caratterizzata dalla compagnia che tiene". Il modello impara le posizioni osservando i contesti d'uso nelle miliardi di frasi lette.

---

## Come impara una macchina: Regressione Lineare e Gradient Descent

**1. Qual e il ciclo fondamentale del machine learning?**

- A) Leggere, memorizzare, ripetere
- **B) Provare, misurare l'errore, correggere** ✅
- C) Copiare, incollare, modificare
- D) Programmare, compilare, eseguire

> Ogni modello di ML funziona con questo ciclo: fa una previsione, misura quanto e lontana dalla realta (l'errore), e aggiusta i parametri per ridurre l'errore.

**2. Nel gradient descent, cosa indica il gradiente?**

- A) La velocita del computer
- B) Il numero totale di parametri
- **C) La direzione in cui l'errore cresce di piu** ✅
- D) Il costo dell'addestramento

> Il gradiente indica la direzione di massima crescita dell'errore; il modello si muove nella direzione opposta per ridurlo, come scendere da una montagna nella nebbia.

**3. Cosa succede se il learning rate e troppo alto?**

- A) Il modello impara piu velocemente e meglio
- **B) Il modello rimbalza senza convergere alla soluzione** ✅
- C) Il modello non si muove affatto
- D) Il modello cancella i dati di training

> Con passi troppo grandi, il modello "salta" avanti e indietro senza mai stabilizzarsi sulla soluzione, come un escursionista che fa passi enormi e rimbalza da un lato all'altro della valle.

**4. Qual e la differenza fondamentale tra la nostra retta e GPT-4?**

- A) Usano algoritmi completamente diversi
- B) GPT-4 ha coscienza, la retta no
- **C) La scala: GPT-4 ha trilioni di parametri invece di 2** ✅
- D) La retta usa matematica, GPT-4 usa magia

> Il principio (provare, misurare, correggere) e identico; cambia solo la scala: 2 parametri per la retta contro circa 1.800 miliardi per GPT-4.

**5. Perche l'MSE eleva al quadrato gli errori?**

- A) Per rendere i calcoli piu difficili
- B) Per far sembrare l'errore piu grande di quello che e
- **C) Per rendere gli errori sempre positivi e penalizzare di piu quelli grandi** ✅
- D) Perche il computer puo fare solo moltiplicazioni

> Elevando al quadrato si eliminano i segni negativi (cosi errori sopra e sotto contano uguale) e si penalizzano maggiormente gli errori grandi, che sono piu problematici.

---

## L'Attenzione: il segreto dei Transformer

**1. Nella frase "Il gatto si sedette sul tappeto perche era stanco", come fa il modello a collegare "era stanco" a "gatto"?**

A) Ha una regola scritta dal programmatore che dice "stanco si riferisce sempre agli animali"
**B) Usa il meccanismo di attenzione, che assegna un peso alto a "gatto" basandosi su pattern appresi durante il training** ✅
C) Legge la frase al contrario e trova "gatto" come prima parola utile
D) Sceglie sempre il soggetto piu vicino alla parola "era"

> Il meccanismo di attenzione assegna pesi alle parole precedenti; avendo appreso da miliardi di frasi, sa che aggettivi come "stanco" si associano a esseri viventi.

**2. Cosa impedisce al modello di "guardare avanti" e vedere le parole future della frase?**

A) Una limitazione hardware delle GPU
B) La temperatura, che restringe il campo visivo del modello
**C) La maschera causale, che blocca l'accesso alle parole successive** ✅
D) Il fatto che il modello legge le parole al contrario

> La maschera causale impedisce al modello di vedere parole che non sono ancora state generate, poiche il testo viene prodotto da sinistra a destra.

**3. Quando un LLM deve generare la prossima parola, cosa fa esattamente?**

A) Cerca la parola giusta in un dizionario incorporato
**B) Calcola le probabilita di tutti i possibili token successivi e ne campiona uno** ✅
C) Copia la parola piu frequente nei testi di addestramento
D) Sceglie sempre la parola con la probabilita piu alta, senza eccezioni

> Il modello assegna una probabilita a ogni possibile token successivo e ne sceglie uno tramite campionamento, non sempre quello piu probabile.

**4. Perche se fai la stessa domanda a ChatGPT due volte puoi ottenere risposte diverse?**

A) Perche il modello viene ri-addestrato tra una domanda e l'altra
B) Perche la connessione internet influenza le risposte
**C) Perche il modello campiona dalle probabilita invece di scegliere sempre la parola piu probabile, e il parametro temperatura regola questa variabilita** ✅
D) Perche ogni utente ha una versione diversa del modello

> Il campionamento introduce casualita: il modello non sceglie sempre la parola piu probabile, e la temperatura controlla il grado di questa variabilita.

**5. Perche i modelli linguistici hanno un limite massimo di token (lunghezza del contesto)?**

A) Perche dopo un certo numero di parole il modello si "dimentica" le prime
**B) Perche il numero di calcoli dell'attenzione cresce con il quadrato della lunghezza del testo, rendendo contesti molto lunghi troppo costosi** ✅
C) Perche i server di OpenAI e Anthropic non hanno abbastanza spazio su disco
D) Perche le lingue umane non producono mai testi piu lunghi del limite

> L'attenzione confronta ogni parola con tutte le altre: raddoppiando la lunghezza, i calcoli si quadruplicano, rendendo i contesti lunghi estremamente costosi.

---

## Il Paper che ha Cambiato Tutto: Scaling Laws e la Rivoluzione dell'IA

**1. Qual e la differenza fondamentale tra RNN e Transformer nell'elaborazione del linguaggio?**

- A) Le RNN sono piu veloci dei Transformer
- **B) I Transformer elaborano le parole in parallelo, le RNN in sequenza** ✅
- C) Le RNN usano piu parametri dei Transformer
- D) I Transformer funzionano solo in inglese

> Le RNN leggono le parole una alla volta in sequenza; i Transformer usano il meccanismo di self-attention per guardarle tutte contemporaneamente, sfruttando le GPU.

**2. Secondo le scaling laws, cosa succede quando si raddoppiano i parametri di un modello?**

- A) Le prestazioni raddoppiano esattamente
- B) Le prestazioni peggiorano per eccesso di complessita
- **C) Le prestazioni migliorano di una percentuale costante e prevedibile** ✅
- D) Non cambia nulla perche contano solo i dati

> Le scaling laws descrivono una legge di potenza: raddoppiare i parametri produce un miglioramento costante (circa il 5%), non proporzionale ma prevedibile.

**3. Quali sono i tre ingredienti fondamentali delle scaling laws?**

- A) Velocita, memoria, connessione internet
- **B) Parametri, dati e potenza di calcolo (compute)** ✅
- C) Hardware, software e programmatori
- D) Testo, immagini e audio

> Come le gambe di uno sgabello, servono tutti e tre in equilibrio: se manca uno, gli altri non compensano.

**4. Perche ChatGPT ha avuto un impatto cosi grande quando e stato lanciato nel 2022?**

- A) Era il primo modello di IA mai creato
- **B) Era gratuito e accessibile a tutti, rendendo l'IA un'esperienza diretta per milioni di persone** ✅
- C) Aveva piu parametri di qualsiasi altro modello
- D) Era l'unico modello che parlava italiano

> ChatGPT ha reso l'IA accessibile a chiunque con una connessione internet, raggiungendo 100 milioni di utenti in due mesi, la crescita piu rapida nella storia.

**5. Cosa ha dimostrato lo studio "Chinchilla" di DeepMind?**

- A) Che i modelli piu piccoli sono sempre migliori
- B) Che i parametri non contano, solo i dati
- **C) Che modelli come GPT-3 erano sotto-addestrati: servivano piu dati in proporzione ai parametri** ✅
- D) Che le scaling laws sono false

> Chinchilla ha dimostrato che per ottenere il massimo da un modello, parametri e dati devono crescere in modo proporzionale; GPT-3 aveva troppi parametri rispetto ai dati usati.

---

## Imparare Giocando: il Reinforcement Learning

**1. Qual e il ciclo fondamentale del reinforcement learning?**

a) Dati → Modello → Previsione → Errore
**b) Agente → Azione → Ambiente → Ricompensa** ✅
c) Input → Elaborazione → Output → Verifica
d) Domanda → Ricerca → Risposta → Valutazione

> Nel reinforcement learning, un agente compie azioni che modificano l'ambiente, il quale restituisce una ricompensa positiva o negativa, guidando l'apprendimento.

**2. Cosa rese la Mossa 37 di AlphaGo cosi straordinaria?**

a) Fu la mossa piu veloce mai calcolata da un computer
b) Era una mossa che violava le regole tradizionali del Go
**c) Era una mossa che nessun professionista umano avrebbe considerato, ma si rivelo geniale** ✅
d) Fu copiata da una partita storica del 1800

> La probabilita che un professionista facesse quella mossa era stimata a meno di una su diecimila, eppure cambio l'intero corso della partita.

**3. Quale problema principale risolve l'RLHF rispetto al modello base GPT-3?**

a) Aumenta la velocita di calcolo del modello
**b) Trasforma un modello che genera testo in modo incontrollato in un assistente utile e strutturato** ✅
c) Permette al modello di navigare su internet in tempo reale
d) Riduce le dimensioni del modello per farlo girare su smartphone

> GPT-3 era potente ma incontrollabile; l'RLHF usa il feedback umano per insegnare al modello a dare risposte chiare, utili e sicure.

**4. In quale situazione l'RLVR e preferibile all'RLHF?**

a) Quando bisogna valutare se una poesia e bella o brutta
b) Quando bisogna decidere se il tono di una risposta e appropriato
**c) Quando bisogna verificare se un esercizio di matematica e stato risolto correttamente** ✅
d) Quando bisogna giudicare se un'immagine e artistica

> L'RLVR usa verificatori automatici per compiti con risposte oggettivamente giuste o sbagliate (matematica, codice), risultando piu veloce, economico e oggettivo dell'RLHF.

**5. Cos'e il "reward hacking"?**

a) Un attacco informatico che modifica il sistema di ricompense dall'esterno
b) Una tecnica usata dai programmatori per velocizzare l'addestramento
**c) Quando l'IA trova scorciatoie impreviste per massimizzare la ricompensa senza fare davvero cio che volevamo** ✅
d) Un metodo per premiare l'IA quando commette errori, cosi impara dai propri sbagli

> Come uno studente che impara a fare bella figura al test senza capire la materia, l'IA puo trovare modi furbi per ottenere la ricompensa senza raggiungere il vero obiettivo.

---

## I limiti dell'IA: la macchina non pensa

**1. Perche le allucinazioni di un LLM sono particolarmente pericolose?**

a) Perche il modello sa di mentire ma lo fa comunque
**b) Perche il modello le presenta con la stessa sicurezza delle risposte corrette, rendendole indistinguibili** ✅
c) Perche il modello allucina solo su argomenti scientifici
d) Perche le allucinazioni sono facilmente riconoscibili dal tono della risposta

> Il modello non distingue tra verita e invenzione: genera il testo piu probabile con la stessa sicurezza, rendendo impossibile distinguere errori dalla risposta corretta guardando solo il testo.

**2. Da dove vengono i bias di un modello di linguaggio?**

a) Sono programmati intenzionalmente dagli sviluppatori
b) Si formano casualmente durante l'addestramento, senza alcuna causa specifica
**c) Riflettono i pregiudizi presenti nei dati su cui il modello e stato addestrato, che provengono da testi scritti da esseri umani** ✅
d) Vengono inseriti dagli utenti durante le conversazioni

> Il modello riproduce i pattern statistici trovati nei dati di addestramento (testi di Internet), i quali riflettono i pregiudizi della societa.

**3. Cosa fa esattamente un essere umano nel processo RLHF?**

a) Scrive la risposta corretta che il modello deve imparare a memoria
b) Corregge direttamente i parametri del modello
**c) Confronta due risposte del modello e indica quale preferisce** ✅
d) Elimina le risposte sbagliate dal database del modello

> Nell'RLHF, gli esseri umani non scrivono risposte: indicano quale tra due risposte e migliore, e il modello impara da queste preferenze.

**4. Quale strategia e piu efficace per usare l'IA in modo responsabile?**

a) Usarla solo per argomenti di cui si sa gia tutto
b) Fidarsi completamente perche i modelli moderni sono molto accurati
c) Non usarla mai perche potrebbe sbagliare
**d) Usarla come punto di partenza e verificare le informazioni importanti con fonti esterne** ✅

> L'IA e utilissima come strumento, ma le informazioni critiche vanno sempre verificate con fonti indipendenti, perche il modello puo allucinare.

**5. Perche il modello presenta un chirurgo come uomo quando il prompt non specifica il genere?**

a) Perche il modello ha opinioni sessiste
**b) Perche nei dati di addestramento la parola "chirurgo" appare statisticamente piu spesso associata a descrizioni maschili** ✅
c) Perche gli sviluppatori hanno programmato questa associazione
d) Perche il modello conosce le statistiche reali sulla distribuzione di genere tra i chirurghi e le applica

> Il modello non ha opinioni: riproduce il pattern statistico trovato nei dati. Se nei testi "chirurgo" appare piu spesso con pronomi maschili, il modello riflette questo bias.

---

## Creare con l'IA: Le Immagini

**1. Come funziona il processo di generazione nei modelli di diffusione?**

a) L'IA copia pezzi di immagini esistenti e li incolla insieme
**b) L'IA parte da rumore casuale e lo trasforma gradualmente in un'immagine, guidata dal testo** ✅
c) L'IA disegna l'immagine pixel per pixel da sinistra a destra, come una stampante
d) L'IA cerca l'immagine piu simile alla descrizione in un database di foto

> I modelli di diffusione imparano a rimuovere rumore progressivamente: partendo da puro rumore casuale, lo "ripuliscono" passo dopo passo fino a ottenere un'immagine coerente.

**2. Qual e il ruolo di CLIP nel processo di generazione delle immagini?**

a) Aggiunge filtri artistici all'immagine finale
b) Comprime l'immagine per ridurne le dimensioni
**c) Collega il significato del testo alla rappresentazione visiva, guidando la generazione** ✅
d) Controlla che l'immagine non contenga contenuti inappropriati

> CLIP traduce il testo in un vettore numerico che rappresenta il significato visivo delle parole, guidando il processo di denoising nella direzione giusta.

**3. Cosa permette di fare la tecnica LoRA?**

a) Generare immagini in altissima risoluzione
**b) Personalizzare un modello con poche immagini e risorse limitate** ✅
c) Eliminare completamente il bias dalle immagini generate
d) Proteggere le immagini dal copyright

> LoRA (Low-Rank Adaptation) permette di insegnare nuovi concetti al modello con solo 5-10 immagini e risorse computazionali limitate, senza riaddestrare l'intero modello.

**4. Quale tra queste affermazioni sui rischi dell'IA generativa e CORRETTA?**

a) I deepfake sono facili da riconoscere grazie a errori evidenti nelle immagini
b) Il bias visivo e un problema minore che riguarda solo pochi modelli obsoleti
**c) L'IA puo riprodurre e amplificare stereotipi presenti nei dati di addestramento** ✅
d) Il copyright delle immagini generate e stato definito in modo chiaro e uniforme a livello mondiale

> I modelli tendono a riprodurre gli stereotipi dei dati su cui sono addestrati (es. "un dottore" generato quasi sempre come uomo bianco), amplificando i pregiudizi sociali.

**5. Qual e la differenza principale tra un modello chiuso e uno open source?**

a) I modelli chiusi generano immagini migliori in ogni caso
b) I modelli open source richiedono sempre una connessione internet
**c) I modelli open source permettono di scaricare, studiare e modificare liberamente il codice e i pesi del modello** ✅
d) I modelli chiusi sono gratuiti, quelli open source sono a pagamento

> Un modello open source e come avere la ricetta completa di un piatto: puoi scaricarlo, studiarlo e modificarlo liberamente, a differenza dei modelli chiusi accessibili solo tramite le piattaforme dei creatori.

---

## Creare con l'IA: I Video

**1. Perche generare un video con l'IA e molto piu difficile che generare una singola immagine?**

a) Perche i video richiedono piu colori delle immagini
**b) Perche ogni frame deve essere coerente con tutti gli altri nel tempo (coerenza temporale)** ✅
c) Perche i video sono sempre in alta definizione
d) Perche i video richiedono una connessione internet piu veloce

> Un video richiede che ogni singolo frame (24-30 al secondo) sia coerente con i precedenti e i successivi: oggetti, luci, ombre e movimenti devono evolvere in modo fluido.

**2. Cosa fa il transformer nell'architettura Diffusion Transformer (DiT) usata per generare video?**

a) Aggiunge il sonoro al video
b) Comprime il video per ridurne le dimensioni
**c) Gestisce le relazioni tra i frame, assicurando coerenza spaziale e temporale** ✅
d) Converte il video da 2D a 3D

> Il transformer controlla che ogni pezzo del video sia coerente con i pezzi vicini sia nello spazio che nel tempo, come un revisore che verifica che la trama non abbia buchi.

**3. Quale di questi NON e un artefatto tipico dei video generati dall'IA?**

a) Mani con un numero sbagliato di dita
b) Testo illeggibile che cambia tra un frame e l'altro
**c) Video sempre in bianco e nero** ✅
d) Fisica innaturale, come oggetti che galleggiano senza motivo

> I video generati dall'IA sono a colori; gli artefatti tipici sono mani anomale, testo illeggibile, fisica innaturale e sfarfallio temporale, non la mancanza di colore.

**4. Perche i deepfake video sono considerati piu pericolosi delle immagini false?**

a) Perche i video occupano piu spazio sul telefono
**b) Perche il nostro cervello si fida dei video molto piu delle fotografie** ✅
c) Perche i video si possono condividere solo sui social media
d) Perche i video non possono essere verificati in nessun modo

> Il video e tradizionalmente considerato una "prova" affidabile di un evento; un video falso ben fatto puo convincere in modo molto piu efficace di un'immagine manipolata.

**5. Cos'e il C2PA e a cosa serve?**

a) Un programma per creare deepfake piu realistici
b) Un social network dedicato ai video generati dall'IA
**c) Uno standard aperto che incorpora metadati verificabili nei contenuti digitali per certificarne l'origine** ✅
d) Un filtro di Instagram per riconoscere i volti falsi

> C2PA (Coalition for Content Provenance and Authenticity) e come un "certificato di nascita" digitale che accompagna foto e video, certificandone l'origine e la storia.

---

## Quando l'IA Ragiona — Modelli che Pensano Prima di Rispondere

**1. Qual e la differenza principale tra un modello standard e un reasoning model?**

a) Il reasoning model e piu veloce nel rispondere
**b) Il reasoning model genera passaggi di ragionamento intermedi prima della risposta finale** ✅
c) Il reasoning model usa meno potenza di calcolo
d) Il reasoning model funziona solo con la matematica

> I reasoning models generano "token di ragionamento" interni -- passaggi intermedi del pensiero -- prima di produrre la risposta finale, a differenza dei modelli standard che rispondono direttamente.

**2. Per quale di questi compiti un reasoning model offre il maggior vantaggio?**

a) Tradurre un testo dall'inglese all'italiano
b) Scrivere una poesia creativa
**c) Risolvere un problema di logica con piu passaggi** ✅
d) Riassumere un articolo di giornale

> I reasoning models eccellono nei problemi che richiedono ragionamento multi-step (matematica, logica, debugging), dove scomporre il problema in passaggi riduce drasticamente gli errori.

**3. Cosa ha dimostrato DeepSeek-R1 di particolarmente sorprendente?**

a) Che i modelli open source non possono ragionare
**b) Che la catena di pensiero puo emergere spontaneamente dall'addestramento con ricompense verificabili** ✅
c) Che il ragionamento funziona solo con modelli molto grandi
d) Che Google ha i migliori modelli di ragionamento

> Nessuno ha insegnato esplicitamente a DeepSeek-R1 a ragionare passo per passo: la capacita e emersa spontaneamente grazie all'addestramento con RLVR.

**4. Perche non conviene usare sempre un reasoning model?**

a) Perche da risposte meno accurate
b) Perche non funziona con le lingue diverse dall'inglese
**c) Perche e piu lento e costoso, e per compiti semplici non aggiunge valore** ✅
d) Perche e disponibile solo a pagamento

> Un reasoning model puo impiegare 30 secondi invece di 2 e costare 10-50 volte di piu; per domande semplici come traduzioni o riassunti, e uno spreco senza alcun vantaggio.

**5. Cosa si intende per "test-time compute"?**

a) Il tempo impiegato per addestrare il modello
**b) La potenza di calcolo usata durante la fase di risposta, quando il modello "pensa"** ✅
c) La velocita di connessione a Internet del server
d) Il numero di utenti che possono usare il modello contemporaneamente

> Il test-time compute e la potenza di calcolo investita nel momento della risposta (non dell'addestramento): piu token di ragionamento il modello genera, piu calcolo serve.

---

## Sotto il Cofano — Modelli e Architetture

**1. Un modello da 7 miliardi di parametri in precisione FP16 (2 byte per parametro) occupa circa:**

- A) 700 MB
- B) 7 GB
- **C) 14 GB** ✅
- D) 70 GB

> 7 miliardi di parametri x 2 byte ciascuno = 14 miliardi di byte = 14 GB. E un calcolo diretto che permette di stimare quanta VRAM serve.

**2. Quale vantaggio principale offre la tecnica Mixture of Experts (MoE)?**

- A) Riduce il numero totale di parametri del modello
- **B) Permette di usare solo una parte dei parametri per ogni risposta, risparmiando calcolo** ✅
- C) Elimina la necessita di GPU
- D) Rende il modello completamente gratuito da addestrare

> MoE attiva solo alcuni "esperti" per ogni domanda: Mixtral ha 47 miliardi di parametri totali ma ne usa solo 13 miliardi alla volta, con prestazioni da modello grande e costi da modello piccolo.

**3. Se vuoi far girare un modello di IA sul tuo portatile con la massima semplicita, quale strumento sceglieresti?**

- A) llama.cpp, perche e il piu veloce
- B) Un cluster di GPU nel cloud
- **C) LM Studio o Ollama, perche hanno interfacce semplici e gestiscono tutto automaticamente** ✅
- D) Addestrare un modello da zero sul tuo computer

> Ollama e LM Studio sono progettati per l'utente finale: un'interfaccia semplice che gestisce download e configurazione automaticamente, senza competenze tecniche avanzate.

**4. Qual e la differenza principale tra il costo di addestramento e il costo di utilizzo di un modello come GPT-4?**

- A) Non c'e differenza, costano uguale
- **B) L'addestramento costa milioni di dollari, ma ogni singola domanda costa frazioni di centesimo** ✅
- C) L'utilizzo costa di piu perche ci sono milioni di utenti
- D) L'addestramento e gratuito, si paga solo l'utilizzo

> E come la differenza tra costruire un'autostrada (costo enorme, una tantum) e pagare il pedaggio (frazioni di centesimo per ogni passaggio).

**5. La quantizzazione a 4 bit di un modello permette di:**

- A) Quadruplicare il numero di parametri
- **B) Ridurre la memoria necessaria a circa un ottavo dell'originale (32 bit), con una piccola perdita di qualita** ✅
- C) Eliminare completamente la necessita di GPU
- D) Aumentare la qualita delle risposte rispetto alla precisione piena

> Passando da 32 bit a 4 bit per parametro, la memoria si riduce di 8 volte, rendendo possibile far girare modelli grandi su hardware piu accessibile con una perdita di qualita minima.

---

## L'arte del prompt — comunicare con l'IA

**1. Quale di questi e' un esempio di prompt ben strutturato?**

- A) "Dimmi qualcosa sulla storia"
- **B) "Sei un professore di storia. Spiega a uno studente di 17 anni le 3 cause principali della Rivoluzione francese con un esempio per ciascuna."** ✅
- C) "Storia Rivoluzione francese cause"
- D) "Scrivi tanto sulla Rivoluzione francese per favore"

> Contiene tutti e quattro gli ingredienti del prompt perfetto: ruolo (professore di storia), contesto (studente di 17 anni), compito specifico (3 cause principali) e formato (con un esempio per ciascuna).

**2. Cosa fa la tecnica "Chain of Thought"?**

- A) Collega il modello a Internet per cercare informazioni
- **B) Chiede al modello di esplicitare i passaggi intermedi del ragionamento** ✅
- C) Aumenta automaticamente la temperatura del modello
- D) Permette al modello di ricordare le conversazioni precedenti

> "Ragiona passo dopo passo" spinge il modello a costruire un ragionamento strutturato, dove ogni passaggio diventa contesto per il successivo, migliorando la qualita complessiva.

**3. Perche' assegnare un "ruolo" al modello cambia la risposta?**

- A) Perche' il modello ha diverse personalita' pre-programmate
- B) Perche' il ruolo attiva un database diverso all'interno del modello
- **C) Perche' il modello genera testo coerente con il contesto fornito, adattando stile e registro** ✅
- D) Perche' il ruolo modifica i parametri tecnici del modello in tempo reale

> Il modello non ha personalita separate: il ruolo orienta la generazione del testo verso un certo stile, vocabolario e livello di approfondimento, perche genera testo coerente con il contesto.

**4. Cos'e' il system prompt?**

- A) Il primo messaggio che l'utente scrive in una chat
- **B) Un set di istruzioni invisibili che definisce il comportamento del modello** ✅
- C) Il codice sorgente del modello di IA
- D) Una password segreta per sbloccare funzionalita' avanzate

> Il system prompt e un'istruzione nascosta all'utente che le aziende usano per definire personalita e regole del chatbot; e cio che rende Claude diverso da ChatGPT.

**5. Se un modello risponde in modo impreciso a una domanda, qual e' l'approccio migliore?**

- A) Cambiare modello immediatamente
- B) Ripetere la stessa domanda identica piu' volte
- **C) Riformulare il prompt aggiungendo piu' contesto, specificita' e struttura** ✅
- D) Concludere che l'IA non e' in grado di rispondere a quel tipo di domanda

> Il prompt engineering e iterativo: riformulare con piu contesto e specificita e quasi sempre la strategia migliore prima di arrendersi o cambiare strumento.

---

## L'IA per ogni futuro: scenari per ogni campo professionale

**1. Perche' l'IA viene paragonata al foglio di calcolo degli anni '80?**

- a) Perche' entrambi servono solo per fare calcoli matematici
- **b) Perche' entrambi sono stati inizialmente percepiti come strumenti di nicchia, ma si sono rivelati utili in ogni campo** ✅
- c) Perche' l'IA sostituira' Excel in tutte le aziende
- d) Perche' entrambi sono stati inventati in Italia

> Come Excel e passato dall'essere "roba da contabili" a strumento universale, l'IA si sta rivelando utile in medicina, arte, legge, economia e ogni altro campo.

**2. Un medico usa l'IA per ottenere una lista di diagnosi differenziali a partire dai sintomi di un paziente. Qual e' l'affermazione corretta?**

- a) Il medico puo' fidarsi ciecamente della lista e prescrivere direttamente le cure
- b) L'IA ha sostituito completamente il lavoro diagnostico del medico
- **c) La lista e' un punto di partenza utile, ma il medico deve validarla con la propria esperienza e la visita del paziente** ✅
- d) L'IA non e' in grado di produrre diagnosi differenziali attendibili

> L'IA non visita il paziente, non sente il suo tono di voce, non coglie le sfumature; il medico deve sempre validare con la propria esperienza professionale e l'esame diretto.

**3. Cosa si intende quando si dice che i modelli linguistici possono "allucinare"?**

- a) Che l'IA ha dei bug che la fanno crashare frequentemente
- **b) Che l'IA puo' generare informazioni che sembrano plausibili ma sono in realta' false o inventate** ✅
- c) Che l'IA funziona solo quando ha accesso a internet
- d) Che l'IA vede immagini che non esistono

> I modelli generano il testo piu probabile, non il piu vero: possono inventare fatti, citazioni e numeri presentandoli con totale sicurezza.

**4. Qual e' il modo piu' corretto di usare l'IA per un compito scolastico?**

- a) Copiare la risposta dell'IA e consegnarla come propria
- b) Non usare mai l'IA perche' e' sempre scorretto
- **c) Usarla per capire meglio l'argomento e generare una bozza, poi rielaborare con il proprio pensiero critico** ✅
- d) Usarla solo per le materie scientifiche, mai per quelle umanistiche

> L'uso corretto e come un dizionario o un manuale: si usa per capire meglio, generare bozze da rielaborare e verificare ragionamenti, ma il pensiero critico finale deve essere proprio.

**5. Perche' studiare e' ancora importante nell'era dell'IA?**

- a) Perche' l'IA non funziona bene e non si puo' usare nella pratica
- **b) Perche' la conoscenza personale permette di valutare criticamente le risposte dell'IA e di usarla come amplificatore delle proprie competenze** ✅
- c) Perche' le scuole vietano l'uso dell'IA e quindi bisogna fare tutto da soli
- d) Perche' l'IA e' troppo costosa e accessibile solo alle grandi aziende

> L'IA e un amplificatore: se sapete poco, amplifica poco; se sapete molto, amplifica moltissimo. Senza conoscenza, non potete nemmeno valutare se una risposta e corretta.

---

## La Cassetta degli Attrezzi dello Studente IA

**1. Qual e la caratteristica principale che distingue NotebookLM da ChatGPT?**

- A) NotebookLM e piu veloce
- **B) NotebookLM risponde solo basandosi sui documenti che gli carichi tu** ✅
- C) NotebookLM e disponibile solo in italiano
- D) NotebookLM non ha bisogno di una connessione internet

> A differenza degli assistenti generici, NotebookLM usa la tecnologia RAG per rispondere esclusivamente basandosi sui documenti caricati, riducendo quasi a zero le allucinazioni.

**2. Quale di questi prompt trasforma l'IA in un tutor socratico?**

- A) "Qual e la risposta alla domanda 5?"
- B) "Scrivi un riassunto del capitolo 3"
- **C) "Non darmi la risposta, guidami passo per passo verso la soluzione"** ✅
- D) "Copia il testo del libro a pagina 42"

> Chiedendo all'IA di guidare verso la risposta senza darla direttamente, si attiva un processo di apprendimento socratico che stimola il ragionamento dello studente.

**3. Perche copiare con l'IA e considerato peggio che copiare da un compagno?**

- A) Perche l'IA costa di piu
- **B) Perche con l'IA non serve nemmeno capire cosa si sta copiando, creando dipendenza senza apprendimento** ✅
- C) Perche l'IA viene sempre scoperta, i compagni no
- D) Perche copiare da un compagno e legale, con l'IA no

> Copiando da un compagno si deve almeno capire e rielaborare; con l'IA basta un copia-incolla, senza nessun apprendimento reale e creando una dipendenza pericolosa.

**4. Cosa fa Consensus rispetto a un motore di ricerca tradizionale?**

- A) Cerca solo su Wikipedia
- **B) Cerca nei paper scientifici e mostra il grado di accordo della comunita scientifica su un tema** ✅
- C) Traduce automaticamente i risultati in italiano
- D) Genera automaticamente le tesine complete

> Consensus e specializzato nella ricerca di paper scientifici e mostra la percentuale di studi che supportano una determinata tesi, utile per ricerche serie e tesine.

**5. Cos'e una "allucinazione" nel contesto dell'intelligenza artificiale?**

- A) Un errore di connessione al server
- B) Un virus informatico che colpisce i modelli IA
- **C) Quando l'IA genera informazioni false presentandole come vere** ✅
- D) Quando l'IA si rifiuta di rispondere a una domanda

> Come una persona che vede qualcosa che non c'e, il modello "vede" fatti inesistenti e li presenta con sicurezza; e un limite strutturale dei modelli linguistici.

---

## Il Vostro Ruolo nella Quinta Rivoluzione

**1. Perche la frase "chi usa l'IA sostituira chi non la usa" e importante?**

a) Perche l'IA eliminera tutti i lavori entro pochi anni
**b) Perche le persone che sanno usare l'IA saranno piu produttive e competitive rispetto a chi non la usa** ✅
c) Perche solo i programmatori potranno lavorare in futuro
d) Perche le aziende assumeranno solo robot

> Non e l'IA a sostituire le persone, ma le persone che sanno usarla a diventare piu produttive, veloci e creative di chi non la usa.

**2. Qual e il rischio principale delle "allucinazioni" dell'IA?**

a) Il computer si surriscalda e si blocca
b) L'IA smette di funzionare dopo troppe domande
**c) Le risposte false sembrano scritte con la stessa sicurezza di quelle vere, rendendo difficile distinguerle** ✅
d) Le allucinazioni avvengono solo con modelli vecchi e non sono piu un problema

> Le allucinazioni sono pericolose proprio perche sono scritte in modo convincente, sicuro e autorevole, rendendo impossibile distinguerle dalla verita guardando solo il testo.

**3. Quale di queste azioni protegge meglio la vostra privacy quando usate un chatbot?**

a) Usare un nickname invece del vostro nome nel prompt
**b) Usare un modello locale come Llama tramite Ollama, cosi nessun dato lascia il vostro computer** ✅
c) Cancellare la cronologia delle chat ogni sera
d) Usare la modalita in incognito del browser

> Un modello locale gira interamente sul proprio computer senza inviare dati a server esterni, garantendo la massima privacy possibile.

**4. Cosa si intende quando si dice che "l'IA amplifica, non sostituisce"?**

a) Che l'IA rende il suono piu forte, come un amplificatore musicale
**b) Che l'IA potenzia le competenze che gia avete, ma potenzia anche le lacune se non capite quello che fate** ✅
c) Che l'IA copia sempre le risposte da Internet senza aggiungere nulla
d) Che l'IA funziona solo se avete gia tutte le risposte

> L'IA amplifica tutto: se sapete scrivere bene, vi aiuta a scrivere ancora meglio; se copiate senza capire, otterrete testi apparentemente perfetti ma potenzialmente sbagliati.

**5. Per costruire il futuro dell'intelligenza artificiale servono:**

a) Solo informatici e programmatori
b) Solo matematici e fisici
**c) Competenze diverse: informatica, matematica, filosofia, linguistica, neuroscienze e altre discipline** ✅
d) Nessuna competenza specifica, basta saper usare un computer

> L'IA richiede un approccio multidisciplinare: matematici per l'algebra, filosofi per l'etica, linguisti per il linguaggio, neuroscienziati per il cervello, e molte altre competenze.

---

## Agenti IA: Quando l'Intelligenza Artificiale Impara ad Agire

**1. Qual e la differenza principale tra un chatbot e un agente IA?**

a) L'agente IA e piu veloce nel rispondere alle domande
**b) L'agente IA puo pianificare, usare strumenti ed eseguire azioni in autonomia per raggiungere un obiettivo** ✅
c) Il chatbot e gratuito mentre l'agente IA e sempre a pagamento
d) L'agente IA funziona solo per la programmazione

> Un chatbot risponde a domande singole; un agente pianifica, usa strumenti, esegue azioni, verifica i risultati e corregge il tiro autonomamente fino a raggiungere l'obiettivo.

**2. Perche si dice che il programmatore diventa un "direttore d'orchestra" quando usa agenti IA?**

a) Perche deve imparare a suonare tutti gli strumenti musicali
b) Perche non deve piu fare nulla e l'IA fa tutto
**c) Perche il suo ruolo si sposta dalla scrittura del codice alla guida, progettazione e verifica del lavoro dell'agente** ✅
d) Perche deve dirigere un team di molti programmatori umani

> Il programmatore non scrive piu ogni riga di codice ma guida l'agente, progetta l'architettura e verifica la qualita del risultato, servendo piu competenze di prima.

**3. Cos'e il "ciclo agente" (agentic loop)?**

a) Un errore in cui l'IA si blocca e ripete sempre la stessa risposta
**b) Un processo in cui l'agente pianifica, esegue, osserva il risultato, riflette e ripianifica fino a completare l'obiettivo** ✅
c) Un tipo di chatbot che risponde in modo circolare
d) Un algoritmo usato solo per la ricerca su internet

> Il ciclo agente e un processo iterativo: l'agente riceve un obiettivo, pianifica i passi, li esegue, verifica i risultati, e se necessario corregge e riprova.

**4. Cosa rappresenta MCP (Model Context Protocol) per gli agenti IA?**

a) Un linguaggio di programmazione per creare chatbot
**b) Uno standard universale per connettere gli agenti a strumenti esterni, come una "presa USB" per l'IA** ✅
c) Un sistema di sicurezza che impedisce all'IA di fare errori
d) Un social network per intelligenze artificiali

> MCP e uno standard aperto che permette agli agenti di collegarsi a qualsiasi strumento esterno (database, file, browser, Slack, GitHub) con un formato comune e universale.

**5. Come cambia la distribuzione del tempo di un programmatore che usa agenti IA?**

a) Passa tutto il tempo a scrivere codice perche l'IA lo rende piu veloce
b) Non lavora piu perche l'IA fa tutto
**c) Dedica meno tempo alla scrittura di codice e piu tempo a pensare, progettare, revisionare e comunicare** ✅
d) Passa la maggior parte del tempo a correggere gli errori dell'IA

> Il tempo dedicato alla scrittura di codice scende dal 60% al 20%; il tempo risparmiato va in attivita a piu alto valore: pensiero, progettazione, revisione e comunicazione.

---

## Il Lavoro che Cambia: Rivoluzioni, Mestieri e il Futuro Cognitivo

**1. Qual e la caratteristica unica della rivoluzione dell'IA rispetto alle precedenti?**

- A) E la piu veloce di tutte
- **B) E la prima a toccare i lavori cognitivi e creativi** ✅
- C) Eliminera piu posti di lavoro di tutte le altre
- D) Riguarda solo il settore informatico

> Le rivoluzioni precedenti automatizzavano forza fisica (vapore), produzione (elettricita), calcolo (computer) e distribuzione (internet); l'IA e la prima a toccare il pensiero creativo.

**2. Cosa e successo storicamente ogni volta che una nuova tecnologia ha trasformato il lavoro?**

- A) L'occupazione totale e diminuita drasticamente
- B) I lavori sono rimasti identici ma con strumenti diversi
- **C) Alcuni lavori specifici sono spariti, ma ne sono nati piu di quanti ne sono scomparsi** ✅
- D) Solo i lavoratori giovani hanno trovato nuove occupazioni

> In 260 anni di rivoluzioni industriali, il tasso di occupazione e sempre aumentato: i lavori si trasformano e ne nascono di nuovi e spesso migliori.

**3. Cosa si intende per "lavoratore centauro"?**

- A) Un lavoratore che fa il doppio delle ore
- **B) Un professionista che usa l'IA come alleato per amplificare le proprie capacita** ✅
- C) Un robot con sembianze umane
- D) Un programmatore specializzato in intelligenza artificiale

> Come negli scacchi dove la squadra umano+computer batte sia l'umano che il computer da soli, il "centauro" e il professionista che sa usare l'IA come alleato potente.

**4. Nell'esempio della dattilografa, cosa ha fatto la tecnologia al suo lavoro?**

- A) Lo ha eliminato completamente senza alternative
- B) Lo ha lasciato identico, cambiando solo gli strumenti
- **C) Ha eliminato la parte ripetitiva e ha liberato tempo per competenze umane piu preziose** ✅
- D) Ha ridotto lo stipendio perche il lavoro e diventato piu semplice

> La stenografia e lo schedario sono spariti, ma il ruolo si e trasformato in "assistente di direzione" con competenze piu preziose (organizzazione, relazioni, strategia) e stipendio triplicato.

**5. Qual e la differenza fondamentale tra "automation" e "augmentation"?**

- A) L'automation riguarda le fabbriche, l'augmentation gli uffici
- **B) Nell'automation l'IA sostituisce il lavoratore, nell'augmentation lo rende piu produttivo** ✅
- C) L'automation e piu costosa dell'augmentation
- D) Non c'e differenza, sono sinonimi

> L'automation elimina il compito umano; l'augmentation potenzia il lavoratore: l'IA gestisce i compiti ripetitivi, il professionista si concentra su giudizio, creativita e relazioni.

---

## Physical AI: Quando l'Intelligenza Artificiale Tocca il Mondo Reale

**1. Perche i robot usano i World Models invece di imparare direttamente nel mondo reale?**

a) Perche i World Models sono piu precisi della realta
**b) Perche provare milioni di tentativi nel mondo reale sarebbe troppo costoso, lento e distruttivo** ✅
c) Perche i robot non hanno sensori per percepire il mondo reale
d) Perche la realta e troppo semplice per addestrare un robot

> Non si possono rompere un milione di bicchieri per insegnare a un robot come afferrarne uno; la simulazione e sicura, veloce e molto meno costosa.

**2. Qual e il vantaggio principale di un robot umanoide rispetto a un robot specializzato?**

a) E sempre piu veloce ed efficiente in ogni compito
b) Costa meno da produrre
**c) Puo operare in ambienti progettati per gli esseri umani senza doverli modificare** ✅
d) Non ha bisogno di intelligenza artificiale per funzionare

> Il mondo e progettato per la forma umana (porte, scale, maniglie, strumenti); un robot umanoide puo usare tutto cio che usiamo noi senza riprogettare gli ambienti.

**3. Cosa si intende per "sim-to-real gap"?**

a) La differenza di prezzo tra un robot simulato e uno reale
**b) Il divario tra le prestazioni di un robot in simulazione e le sue prestazioni nel mondo reale** ✅
c) Il tempo necessario per costruire un robot dopo averlo progettato al computer
d) La distanza fisica tra il centro di simulazione e la fabbrica

> Un robot addestrato in simulazione spesso fatica nel mondo reale perche materiali, illuminazione e attrito non sono mai identici alla simulazione.

**4. Perche i rover su Marte hanno bisogno di IA autonoma?**

a) Perche su Marte non c'e connessione internet
**b) Perche i segnali radio tra Terra e Marte impiegano circa 20 minuti, rendendo impossibile il controllo in tempo reale** ✅
c) Perche la NASA non ha abbastanza operatori per controllarli
d) Perche i rover sono troppo vecchi per ricevere aggiornamenti software

> Con un ritardo di 20 minuti per l'andata e altrettanti per il ritorno del segnale, il rover deve saper decidere autonomamente come evitare ostacoli o reagire a situazioni impreviste.

**5. Cosa fanno i "cobot" di diverso rispetto ai robot industriali tradizionali?**

a) Sono completamente autonomi e non richiedono supervisione umana
b) Lavorano solo di notte quando non ci sono persone in fabbrica
**c) Sono progettati per lavorare in sicurezza fianco a fianco con le persone, fermandosi se qualcuno si avvicina troppo** ✅
d) Sono piu potenti e veloci dei robot industriali tradizionali

> I cobot (robot collaborativi) hanno sensori che rilevano la presenza umana e si fermano automaticamente, permettendo la collaborazione diretta senza barriere di sicurezza.

---

## Verso l'AGI: Intelligenza Artificiale Generale e il Futuro

**1. Quale dei seguenti e' un esempio di ANI (Artificial Narrow Intelligence)?**

- A) Un sistema che sa fare qualsiasi compito cognitivo umano
- B) Un'intelligenza che supera gli esseri umani in ogni campo
- **C) ChatGPT che genera testo e risponde a domande** ✅
- D) Un robot cosciente di se stesso

> ChatGPT e un esempio perfetto di ANI: e bravissimo nel generare testo e rispondere a domande, ma non sa cucinare, guidare un'auto o fare qualsiasi cosa al di fuori del suo dominio.

**2. Cosa descrive il concetto di "singolarita' tecnologica"?**

- A) Il momento in cui l'IA viene spenta definitivamente
- **B) Il punto in cui un'IA migliora se stessa innescando un ciclo esponenziale** ✅
- C) La data precisa in cui l'AGI verra' creata
- D) Il giorno in cui i computer sostituiranno tutti i lavoratori

> La singolarita e il punto teorico in cui un'IA abbastanza intelligente migliora il proprio codice, creando una versione migliore che si migliora ancora, in una spirale esponenziale.

**3. Secondo la visione presentata nella lezione, quali competenze umane resteranno centrali nell'era dell'IA?**

- A) Velocita' di calcolo e capacita' di memorizzazione
- B) Capacita' di scrivere codice e gestire database
- **C) Giudizio etico, empatia, creativita' originale e leadership** ✅
- D) Conoscenza enciclopedica e multilinguismo

> Se l'IA fara il 90% dei compiti cognitivi, resteranno centrali le competenze piu profondamente umane: decidere cosa e giusto, connettersi con gli altri, creare con visione originale e ispirare.

**4. In cosa concordano le visioni "Machines of Loving Grace" e "Adolescence of Technology"?**

- A) L'IA non avra' alcun impatto significativo sulla societa'
- B) Bisogna fermare immediatamente lo sviluppo dell'IA
- **C) L'IA sara' trasformativa e servono istituzioni giuste per distribuire equamente i benefici** ✅
- D) L'AGI arrivera' sicuramente entro il 2030

> Le due visioni di Dario Amodei, pur differendo nel tono (ottimismo vs cautela), concordano che l'IA sara trasformativa e che servono istituzioni forti e distribuzione equa dei benefici.

**5. Perche' AlphaFold e' considerato un risultato rivoluzionario?**

- A) Perche' e' il primo chatbot in grado di conversare in italiano
- **B) Perche' ha previsto la struttura di oltre 200 milioni di proteine, risolvendo un problema aperto da decenni** ✅
- C) Perche' ha dimostrato che l'AGI esiste gia'
- D) Perche' ha sostituito tutti i ricercatori nei laboratori di biologia

> AlphaFold ha risolto in pochi mesi un problema su cui i biologi lavoravano da 50 anni, prevedendo la struttura 3D di quasi tutte le proteine conosciute e vincendo il Premio Nobel per la Chimica 2024.

---

## Deep Dive: Memoria e Contesto nei Transformer

**1. Se un modello ha un contesto di 8.000 token, quante celle ha la matrice di attenzione per un singolo layer e una singola head?**

a) 8.000
b) 16.000
**c) 64.000.000** ✅
d) 8.000.000

> La matrice di attenzione è n×n. Con n=8.000, la matrice ha 8.000 × 8.000 = 64.000.000 celle. Questa crescita quadratica è il vincolo fondamentale dei Transformer.

**2. Quale componente della memoria GPU NON cresce con il numero di token nel contesto?**

a) Il KV Cache
b) La matrice di attenzione
**c) I pesi del modello** ✅
d) Tutti crescono con il contesto

> I pesi del modello (i miliardi di parametri) vengono caricati una volta e restano fissi indipendentemente dalla lunghezza del contesto. Solo il KV Cache e la matrice di attenzione crescono con n.

**3. FlashAttention migliora le prestazioni principalmente perché:**

a) Riduce il numero di operazioni matematiche da O(n²) a O(n)
b) Elimina la necessità del KV Cache
**c) Minimizza i trasferimenti di dati tra memoria principale (HBM) e cache on-chip (SRAM)** ✅
d) Usa meno head di attenzione

> FlashAttention non cambia la complessità algoritmica (resta O(n²) in FLOPs). Il suo contributo è processare la matrice a blocchi nella SRAM velocissima, evitando di materializzarla nella HBM molto più lenta.

**4. Perché il KV Cache di Llama-3 70B con 128K token occupa più memoria del modello stesso?**

a) Perché il KV Cache include anche i pesi del modello
**b) Perché i vettori K e V devono essere memorizzati per ogni token, per ogni layer, per ogni head** ✅
c) Perché il KV Cache usa fp32 mentre il modello usa fp16
d) Perché il KV Cache cresce in modo quadratico

> Il KV Cache cresce linearmente con n (non quadraticamente), ma il coefficiente è enorme: 2 × 80 layer × 64 head × 128 d_head × 2 byte per ogni token. Con 128K token, il totale supera i 160 GB.

**5. Qual è il principale svantaggio della Sliding Window Attention?**

a) Non è compatibile con i modelli decoder-only
b) Richiede più memoria della full attention
**c) Ogni token può guardare solo un numero limitato di token precedenti, perdendo informazioni distanti** ✅
d) Funziona solo durante il training, non durante l'inferenza

> La Sliding Window limita l'attenzione ai w token precedenti. Questo la rende efficiente (O(n·w) invece di O(n²)) ma inadatta per compiti che richiedono ragionamento su informazioni distanti nel contesto.

---

## Deep Dive: Anatomia del Transformer — Layers, Heads e d_head

**1. Se un modello ha d_model = 8192 e 64 head di attenzione, qual è il valore di d_head?**

a) 64
**b) 128** ✅
c) 256
d) 512

> d_model = heads × d_head, quindi d_head = d_model / heads = 8192 / 64 = 128. Questo è il valore tipico usato nei modelli moderni come Llama-3.

**2. Perché i Transformer usano molte head di attenzione invece di una sola?**

a) Per risparmiare memoria durante l'inferenza
**b) Perché ogni head si specializza nel catturare un tipo diverso di relazione tra token** ✅
c) Perché una sola head sarebbe troppo lenta da calcolare
d) Per compatibilità con le GPU moderne

> Le multi-head attention imparano relazioni diverse e complementari: una head può specializzarsi in relazioni grammaticali, un'altra in semantiche, un'altra in dipendenze a lunga distanza. Non è ridondanza, è specializzazione parallela.

**3. Quale componente del Transformer è direttamente responsabile della crescita del KV Cache con il numero di layer?**

a) Il positional encoding, che deve essere ricalcolato per ogni layer
**b) Il fatto che ogni layer ha il suo blocco di attention con K e V indipendenti** ✅
c) La funzione softmax, che richiede più memoria con più layer
d) La concatenazione finale delle head

> Ogni layer ha il suo blocco di Multi-Head Attention con vettori K e V propri. Il KV Cache è la somma dei K e V di tutti i layer, quindi cresce proporzionalmente al numero di layer.

**4. In un Transformer, cosa catturano tipicamente i layer più profondi (alti)?**

a) Le relazioni grammaticali tra parole adiacenti
b) Il positional encoding dei token
**c) Il ragionamento complesso e le relazioni a lunga distanza nel contesto** ✅
d) La pronuncia e la fonetica delle parole

> I layer bassi catturano pattern sintattici locali; i layer intermedi catturano semantica; i layer alti catturano ragionamento complesso e relazioni a lunga distanza. È una proprietà emergente del training.

**5. Se il KV Cache di Llama-3 70B occupa 20 GB con 8K token, quanto occuperà approssimativamente con 32K token?**

a) 40 GB
**b) 80 GB** ✅
c) 160 GB
d) 320 GB

> Il KV Cache cresce linearmente con il numero di token. 32K è 4× rispetto a 8K, quindi il KV Cache sarà circa 4 × 20 GB = 80 GB.

---

## Deep Dive: Invalidazione della KV Cache

**1. Cosa succede quando un singolo token nel mezzo di un prompt viene modificato?**

a) Solo quel token viene ricalcolato
b) Tutti i token del prompt vengono ricalcolati
**c) Tutti i token da quel punto in poi vengono ricalcolati, quelli prima restano in cache** ✅
d) La cache viene completamente svuotata e il modello riparte da zero

> L'invalidazione si propaga sempre verso destra: ogni token dipende causalmente da tutti quelli che lo precedono. Cambiare un token in posizione i invalida tutto da i in poi, ma i token prima di i restano validi.

**2. Qual è l'ordine ottimale dei componenti in un prompt per massimizzare il cache hit?**

a) Domanda → System prompt → Documento → Cronologia
b) Cronologia → Domanda → System prompt → Documento
**c) System prompt fisso → Documento/Contesto → Cronologia → Nuovo turno** ✅
d) L'ordine non influenza la cache

> La regola d'oro è mettere le parti più stabili a sinistra e quelle più variabili a destra. Tutto ciò che sta a sinistra del primo token che cambia è potenzialmente cachabile.

**3. Perché mettere `Oggi è {data}` nel system prompt è problematico per la cache?**

a) Perché le date occupano troppa memoria
**b) Perché il system prompt cambia ogni giorno, invalidando tutta la cache ad ogni richiesta** ✅
c) Perché i LLM non capiscono le date
d) Perché le date non possono essere tokenizzate

> Se il system prompt contiene dati dinamici (data, timestamp, ID), cambia ad ogni richiesta. Poiché è all'inizio della sequenza, l'invalidazione si propaga a tutto ciò che segue, azzerando il cache hit rate.

**4. In una pipeline RAG, perché è meglio mettere il documento prima della domanda?**

a) Perché i LLM leggono da sinistra a destra e capiscono meglio il contesto
b) Perché il documento è più lungo e deve essere elaborato per primo
**c) Perché se il documento non cambia tra query diverse, mettendolo prima della domanda si cacha come parte del prefisso stabile** ✅
d) Perché le API richiedono questo ordine specifico

> In RAG, spesso si fanno molte domande sullo stesso documento. Se il documento precede la domanda, rimane come prefisso stabile e viene cachato. Se la domanda precede il documento, il prefisso cambia ad ogni query.

**5. Il Prompt Caching di Anthropic riduce i costi dei token cachati di circa:**

a) 10% rispetto al prezzo normale
b) 50% rispetto al prezzo normale
**c) 90% rispetto al prezzo normale (i token cachati costano ~10% del prezzo normale)** ✅
d) 100% — i token cachati sono gratuiti

> I token cachati con Anthropic costano circa il 10% del prezzo normale dei token di input. Su pipeline con system prompt da 10-50K token, il risparmio totale sui costi di input può essere del 60-80%.

---

## Deep Dive: Attention Matrix — Dove Vive, Come Funziona, Perché Costa

**1. La matrice di attenzione viene conservata nel KV Cache per essere riutilizzata?**

a) Sì, è la parte principale del KV Cache
b) Sì, ma solo durante il training
**c) No, viene calcolata al volo e poi scartata; nel KV Cache si conservano solo K e V** ✅
d) Dipende dall'implementazione del modello

> La matrice di attenzione è una struttura temporanea calcolata durante ogni forward pass. Nel KV Cache vengono conservati solo i vettori Key e Value precalcolati, non gli score di attenzione.

**2. Perché nella formula dell'attenzione si divide per √d_head?**

a) Per ridurre la complessità da O(n²) a O(n)
**b) Per normalizzare la varianza dei dot product e impedire che la softmax saturi** ✅
c) Per ridurre la dimensione della matrice risultante
d) Per rendere il calcolo compatibile con la GPU

> Con d_head grande, i dot product tendono ad avere magnitudine alta, portando la softmax a produrre distribuzioni quasi binarie con gradienti quasi zero. La divisione per √d_head normalizza la varianza.

**3. Se un modello ha un contesto di 16K token, quante volte è più grande la sua matrice di attenzione rispetto a un contesto di 4K token?**

a) 2 volte
b) 4 volte
c) 8 volte
**d) 16 volte** ✅

> La matrice è n×n. Con 4K: 4K² = 16M celle. Con 16K: 16K² = 256M celle. 256M / 16M = 16 volte. In generale, se n si moltiplica per k, la matrice si moltiplica per k².

**4. Durante la fase di decode (generazione token per token), qual è il principale collo di bottiglia?**

a) Il calcolo della matrice di attenzione n×n completa
**b) La lettura dei vettori K e V del KV Cache dalla HBM** ✅
c) La funzione softmax
d) La proiezione Q, K, V

> Nel decode si genera un token alla volta: la "matrice" è un vettore 1×n, il calcolo è veloce. Ma per calcolarlo bisogna leggere tutti i K e V dall'HBM, e la bandwidth della memoria diventa il fattore limitante (il modello è "memory-bound").

**5. FlashAttention migliora le prestazioni del calcolo di attenzione principalmente perché:**

a) Usa meno head di attenzione
b) Approssima il risultato del prodotto Q·Kᵀ con meno operazioni
**c) Processa la matrice a blocchi nella SRAM on-chip, riducendo i trasferimenti da/verso la HBM** ✅
d) Elimina la necessità della causal mask

> FlashAttention non approssima né riduce le operazioni. Il suo contributo chiave è il tiling: processa la matrice a blocchi nella SRAM (~20MB, ~19 TB/s) evitando di materializzarla nella HBM (~80GB, ~2 TB/s). Il risultato è 3-8x più veloce con la stessa correttezza matematica.
