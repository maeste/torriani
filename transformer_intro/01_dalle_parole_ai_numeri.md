# Dalle Parole ai Numeri: Come una Macchina "Legge" il Testo

## Come i computer imparano a capire le parole

Immagina di dover spiegare il significato della parola "gatto" a qualcuno che non parla la tua lingua, senza usare nessuna parola. Difficile, vero? Ora immagina di doverlo spiegare a qualcuno che capisce *solo* i numeri. Niente lettere, niente immagini, niente suoni: solo numeri. Questo e esattamente il problema che i ricercatori di intelligenza artificiale hanno dovuto risolvere.

I computer, sotto la superficie, sono macchine calcolatrici. Per quanto possano sembrare intelligenti quando rispondono alle tue domande su ChatGPT o Claude, alla base di tutto ci sono operazioni matematiche su sequenze di numeri. Quindi la prima domanda fondamentale e: **come si trasforma una frase in numeri?**

### Il tokenizer: lo "spezzatino" delle parole

Il primo passo si chiama **tokenizzazione**. Quando scrivi una frase come "Il gatto mangia il pesce", il modello non la legge come faresti tu, lettera per lettera o parola per parola. Invece, la spezza in pezzi chiamati **token**. Pensa ai token come alle tessere di un puzzle: ogni tessera rappresenta un pezzo di testo.

Per le parole corte e comuni, un token corrisponde a una parola intera. "Il", "gatto", "mangia" sono ciascuno un singolo token. Ma cosa succede con le parole lunghe? Prendi "intelligenza": e troppo lunga e poco frequente per stare in un unico token. Viene quindi spezzata in pezzi piu piccoli, ad esempio "intel" e "ligenza". Questo processo si chiama **subword tokenization** (tokenizzazione in sotto-parole).

Perche fare cosi? Immagina di dover creare un vocabolario con tutte le parole italiane: ne servirebbero centinaia di migliaia. Con i subword bastano circa 30.000-50.000 pezzi per rappresentare *qualsiasi* testo, anche parole mai viste prima. E un compromesso geniale tra efficienza e flessibilita.

Ogni token riceve poi un **numero identificativo** (un ID). Cosi la frase "il gatto mangia" diventa qualcosa come [1045, 1067, 1023]. Per il modello, la tua frase e solo questa sequenza di numeri. Niente lettere, niente significato apparente. Solo numeri.

Un dettaglio curioso: in italiano, un token corrisponde mediamente a 3-4 caratteri. Ecco perche quando senti dire che un modello ha un "limite di 100.000 token", non vuol dire 100.000 parole: sono molte di meno.

### Lo spazio degli embedding: dove i significati diventano geometria

Ok, abbiamo trasformato le parole in numeri. Ma c'e un problema enorme: il numero 1045 non dice assolutamente nulla sul *significato* della parola. "Gatto" e "cane" avranno ID diversi, eppure hanno significati molto vicini (sono entrambi animali domestici). Come facciamo a catturare questa vicinanza?

Qui arriva un'idea che ha rivoluzionato l'intelligenza artificiale. Invece di rappresentare ogni parola con *un solo* numero, la rappresentiamo con una **lista di numeri**: un **vettore**. Puoi pensare a un vettore come alle coordinate di un punto nello spazio. Solo che invece di avere 2 coordinate (come su una mappa) o 3 (come nel mondo reale), ne ha *migliaia*. I modelli come Llama-3 usano 4.096 numeri per ogni parola, GPT-4 ne usa circa 12.288.

E la parte magica e questa: durante il suo addestramento (in cui legge miliardi di frasi), il modello impara a posizionare le parole nello spazio in modo che **parole con significato simile finiscano vicine**. "Gatto", "cane", "topo" e "pesce" si ritrovano tutti in una stessa zona dello spazio. "Pizza", "pasta", "pane" e "gelato" in un'altra. "Uomo", "donna", "ragazzo", "ragazza" in un'altra ancora.

Come fa il modello a sapere dove mettere ogni parola? Non glielo dice nessuno esplicitamente. Impara da solo, semplicemente osservando i contesti in cui le parole appaiono. Se in migliaia di frasi "gatto" e "cane" compaiono in situazioni simili ("il ___ dorme sul divano", "ho portato il ___ dal veterinario"), il modello capisce che devono stare vicini nello spazio. Questa intuizione ha un nome: **ipotesi distribuzionale** - "una parola e caratterizzata dalla compagnia che tiene".

Il modello non sa cos'e un gatto. Non ha mai visto un gatto, ne accarezzato uno. Ma sa che "gatto" sta vicino a "cane" e lontano da "pizza". E, sorprendentemente, questo basta per ragionare sui significati.

### L'aritmetica dei significati: il momento "wow"

Ma la cosa piu straordinaria deve ancora arrivare. Se le parole sono punti nello spazio, possiamo fare **aritmetica con i significati**. Si, hai letto bene: sommare e sottrarre concetti come se fossero numeri.

L'esempio piu famoso e questo:

**Marito - Uomo + Donna = ?**

Tradotto: prendi il vettore della parola "Marito". Sottrai il vettore di "Uomo" (cioe togli il concetto di "maschio"). Aggiungi il vettore di "Donna" (cioe aggiungi il concetto di "femmina"). Il risultato? Un punto nello spazio vicinissimo a **"Moglie"**.

Fermati un attimo a pensarci. Nessuno ha *programmato* questa relazione. Il modello ha scoperto *da solo*, leggendo testi, che la relazione tra "marito" e "uomo" e parallela alla relazione tra "moglie" e "donna". I significati hanno una geometria.

E non finisce qui. Questo funziona con tantissime relazioni:
- **Italia - Roma + Parigi ≈ Francia** (relazione capitale-nazione)
- **Buono - Migliore + Peggiore ≈ Cattivo** (relazione tra gradi di aggettivi)

Questo risultato, dimostrato per la prima volta nel 2013 da un team di Google con un modello chiamato Word2Vec, ha cambiato il modo in cui pensiamo alla comprensione del linguaggio da parte delle macchine.

### Ricapitoliamo il viaggio

Abbiamo percorso tre tappe fondamentali. Prima, il testo viene spezzato in **token** (pezzi di parole). Poi, ogni token viene trasformato in un **vettore** — un punto in uno spazio a migliaia di dimensioni. Infine, in questo spazio i **significati diventano geometria**: parole simili stanno vicine e le relazioni tra concetti si esprimono come operazioni matematiche. Tutto questo e il punto di partenza, il primo passo di quello che succede dentro un modello di intelligenza artificiale ogni volta che gli scrivi un messaggio.

---

## 5 Cose da Ricordare

- **I computer capiscono solo numeri**: il primo passo per elaborare il linguaggio e trasformare le parole in sequenze numeriche attraverso la tokenizzazione.
- **I token non sono sempre parole intere**: le parole lunghe o rare vengono spezzate in sotto-parti (subword). Con circa 30.000-50.000 pezzi si puo rappresentare qualsiasi testo.
- **Ogni token diventa un vettore**: una lista di migliaia di numeri (da 768 a oltre 12.000) che rappresenta il significato della parola come un punto nello spazio.
- **Parole simili, vettori vicini**: il modello impara autonomamente a posizionare le parole in modo che quelle con significato simile siano vicine nello spazio, osservando i contesti in cui appaiono.
- **I significati hanno una geometria**: si puo fare aritmetica con i vettori delle parole (Marito - Uomo + Donna ≈ Moglie), rivelando relazioni semantiche profonde.

---

## 3 Cose da Fare

1. **Esplora il Embedding Projector di TensorFlow** (projector.tensorflow.org): e uno strumento gratuito che ti permette di visualizzare in 3D lo spazio degli embedding di parole reali. Cerca parole che conosci e osserva quali sono vicine e quali lontane.

2. **Prova un tokenizer online**: vai su platform.openai.com/tokenizer e scrivi frasi in italiano. Osserva come vengono spezzate e conta quanti token servono. Prova a confrontare una frase in italiano con la stessa frase in inglese: noterai che l'italiano richiede piu token.

3. **Inventa analogie vettoriali**: su un foglio, prova a inventare relazioni del tipo "A sta a B come C sta a D" (ad esempio: Parigi:Francia = Roma:Italia). Pensa a quali funzionerebbero con l'aritmetica dei vettori e quali no. Questo ti aiutera a capire i limiti e le potenzialita di queste rappresentazioni.

---

## Domande Frequenti

**Come fa il modello a sapere dove mettere le parole nello spazio, se nessuno glielo dice?**
Il modello impara le posizioni durante l'addestramento, leggendo miliardi di frasi. Se in molti testi "gatto" e "cane" appaiono in contesti simili ("il ___ dorme", "ho portato il ___ dal veterinario"), il modello scopre che devono stare vicini. E un apprendimento completamente automatico.

**Perche usare vettori e non un semplice dizionario?**
Un dizionario ti dice la definizione, ma non cattura le *relazioni* tra parole in modo che un computer possa calcolarci sopra. Con i vettori puoi misurare quanto due parole sono simili (calcolando la distanza), trovare analogie (con l'aritmetica), e fare tutto questo con semplici operazioni matematiche.

**L'esempio Marito/Moglie funziona davvero nella pratica?**
Si. Questo tipo di aritmetica vettoriale e stato dimostrato nel 2013 dal team di Google che ha creato Word2Vec. Non funziona sempre alla perfezione, ma funziona sorprendentemente bene per moltissime relazioni semantiche. I modelli moderni (GPT, Claude, Llama) hanno embedding ancora piu sofisticati che catturano relazioni molto piu complesse.

**Ma quanti numeri servono davvero per rappresentare una parola?**
Dipende dal modello. GPT-2 usava 768 numeri, Llama-3 ne usa 4.096, GPT-4 circa 12.288. Piu numeri significano piu sfumature di significato. Pensa ai colori: con 3 numeri (rosso, verde, blu) puoi descrivere milioni di colori. Con 4.096 numeri puoi distinguere milioni di sfumature di significato.

**Il grafico 2D che si vede nelle presentazioni e realistico?**
No, e una semplificazione estrema. I vettori reali hanno migliaia di dimensioni. Per visualizzarli in 2D si usano tecniche matematiche (come t-SNE o UMAP) che cercano di preservare le distanze tra i punti, ma inevitabilmente distorcono la realta. E un po' come proiettare la Terra sferica su una mappa piatta: utile, ma non perfetto.

**Ma allora le macchine capiscono davvero il significato delle parole?**
Questa e una delle grandi domande aperte della ricerca. I modelli catturano le relazioni statistiche tra parole, il che *assomiglia molto* alla comprensione del significato. Ma e davvero la stessa cosa? I filosofi e i ricercatori ne discutono ancora. Quello che e certo e che il risultato pratico e impressionante.

**Perche le parole in italiano costano piu token di quelle in inglese?**
I modelli vengono addestrati prevalentemente su testi in inglese. Questo significa che le parole inglesi piu comuni sono spesso token interi, mentre le parole italiane (meno rappresentate nei dati) vengono spezzate piu frequentemente. Il risultato e che la stessa frase in italiano richiede piu token, il che "consuma" piu contesto.

**Cosa vuol dire che nei modelli moderni gli embedding sono "contestuali"?**
Nei primi modelli (come Word2Vec), la parola "pesca" aveva sempre lo stesso vettore, che si parlasse del frutto o dell'attivita di pescare. Nei transformer moderni, lo stesso token riceve vettori diversi a seconda del contesto della frase. Il modello riesce cosi a distinguere i diversi significati di una stessa parola.

---

## Mettiti alla Prova

**1. Cosa fa un tokenizer?**
- A) Traduce il testo da una lingua all'altra
- B) Spezza il testo in pezzi (token) e assegna a ciascuno un numero identificativo
- C) Corregge gli errori grammaticali nel testo
- D) Genera nuove frasi a partire da parole chiave

**2. Perche i modelli usano la subword tokenization invece di avere un token per ogni parola?**
- A) Perche le parole intere occupano troppa memoria nel computer
- B) Perche cosi il modello puo anche generare immagini
- C) Perche con un vocabolario ridotto di sotto-parti si puo rappresentare qualsiasi testo, anche parole mai viste
- D) Perche le parole italiane sono troppo lunghe per i computer americani

**3. Cosa significa che "parole con significato simile hanno vettori vicini"?**
- A) Che le parole simili hanno lo stesso numero identificativo
- B) Che le liste di numeri che rappresentano parole con significato simile sono matematicamente vicine nello spazio
- C) Che le parole simili vengono sempre spezzate nello stesso modo dal tokenizer
- D) Che il modello ha un dizionario dei sinonimi incorporato

**4. Nell'esempio dell'aritmetica vettoriale, perche Marito - Uomo + Donna da un risultato vicino a Moglie?**
- A) Perche qualcuno ha programmato manualmente questa relazione nel modello
- B) Perche il modello ha memorizzato un elenco di coppie sposate
- C) Perche il modello ha scoperto autonomamente che la relazione maschio/femmina e parallela alla relazione marito/moglie, leggendo molti testi
- D) Perche "moglie" e semplicemente la parola piu simile a "marito" nel vocabolario

**5. Come fa il modello a imparare dove posizionare ogni parola nello spazio degli embedding?**
- A) Un team di linguisti inserisce manualmente la posizione di ogni parola
- B) Le posizioni sono generate casualmente e non cambiano mai
- C) Il modello osserva i contesti in cui le parole appaiono in miliardi di frasi e impara automaticamente le posizioni durante l'addestramento
- D) Il modello copia le posizioni da un dizionario enciclopedico digitale
