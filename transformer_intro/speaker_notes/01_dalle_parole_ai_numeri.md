# Dalle Parole ai Numeri — Tokenizzazione, Embedding e Aritmetica Vettoriale
> File di supporto alla presentazione: `01_dalle_parole_ai_numeri.jsx`

---

## Panoramica della slide

Questa slide e il secondo atto della Sessione 1. Dopo aver stabilito *perche* l'IA e importante (La Quinta Rivoluzione), ora mostriamo *come* funziona a livello base: come fa una macchina a "capire" il testo. Si parte dal problema fondamentale — i computer lavorano con numeri, non con parole — e si arriva all'intuizione che i significati possono essere rappresentati come punti nello spazio.

**Tempo previsto**: 12 minuti

---

## Struttura della presentazione

### 1. Apertura — Il problema fondamentale

Apri con una domanda diretta:

> "Ok, abbiamo visto che l'IA e la quinta rivoluzione. Ma *come* fa una macchina a capire una frase? Partiamo da un fatto: i computer non capiscono le lettere. Capiscono solo numeri. Quindi il primo passo e trasformare le parole in numeri."

Questo crea il collegamento logico con la slide precedente e stabilisce la domanda guida.

---

### 2. Il Tokenizer — Cosa dire e come dimostrarlo

#### Demo dal vivo

Digita una frase semplice nel campo di input, ad esempio:
- "Il gatto mangia il pesce" (mostra token semplici)
- Poi digita "L'intelligenza artificiale elabora il linguaggio naturale" (mostra subword)

> "Guardate cosa succede quando scrivo una frase. Il modello non legge lettere come facciamo noi. Prima di tutto, spezza il testo in pezzi chiamati *token*. Le parole corte restano intere. Ma 'intelligenza'? Troppo lunga — viene spezzata in 'intel' e 'ligenza'. Questo si chiama subword tokenization."

#### Punti da sottolineare

1. **Perche subword?** Un vocabolario di tutte le parole italiane sarebbe enorme (centinaia di migliaia). Con i subword, bastano ~30-50.000 pezzi per rappresentare qualsiasi testo.
2. **L'ID numerico**: ogni token ha un numero. Il modello vede solo questa sequenza di numeri.
3. **Il rapporto token/caratteri**: tipicamente 1 token ≈ 3-4 caratteri in italiano. Questa e la ragione per cui i modelli hanno limiti di "token" e non di "parole".

> "Notate i numeri sotto ogni token. Per il modello, la frase 'il gatto mangia' e semplicemente [1045, 1067, 1023]. Solo numeri."

---

### 3. Lo Spazio degli Embedding — Cosa dire

#### Transizione

> "Ok, abbiamo trasformato le parole in numeri. Ma c'e un problema: il numero 1045 non dice nulla sul *significato* della parola. 'Gatto' e 'cane' hanno numeri diversi ma significati simili. Quindi serviva un'idea geniale."

#### Demo dal vivo

Passa il mouse sui cluster di parole nel grafico 2D:

> "L'idea e questa: trasformiamo ogni parola non in *un* numero, ma in una lista di numeri — un vettore. E la magia e che parole con significato simile finiscono *vicine* nello spazio."

Mostra i cluster:
- **Animali**: "Guardate — gatto, cane, topo, pesce sono tutti qui vicini"
- **Cibo**: "Pizza, pasta, pane — altro cluster"
- **Persone**: "Uomo, donna, ragazzo, ragazza — raggruppati per significato"

> "Il modello non sa cos'e un gatto. Ma sa che 'gatto' sta vicino a 'cane' e lontano da 'pizza'. Questo basta per ragionare sui significati."

---

### 4. Aritmetica dei Vettori — Il momento "wow"

Questa e la parte che genera piu stupore. Preparala bene.

#### Buildup

> "Ma la cosa piu sorprendente e questa: se le parole sono punti nello spazio, possiamo fare *aritmetica* con i significati. Vi faccio vedere."

#### Demo animata

Clicca il pulsante "Avvia animazione" e commenta ogni step:

1. **Uomo → Marito**: "Guardate questa freccia: va da 'Uomo' a 'Marito'. Rappresenta la relazione 'coniugale'"
2. **Donna → ???**: "Ora applichiamo la stessa freccia, la stessa direzione, partendo da 'Donna'"
3. **≈ Moglie!**: "E il risultato... finisce vicinissimo a 'Moglie'!"

> "Marito meno Uomo piu Donna uguale Moglie. Non l'abbiamo programmato — il modello ha *scoperto da solo* che la relazione maschio/femmina e parallela alla relazione marito/moglie. Semplicemente leggendo testi."

#### Rilancia

> "Questo funziona con tante relazioni: Italia - Roma + Parigi ≈ Francia. Buono - Migliore + Peggiore ≈ Cattivo. I significati hanno una *geometria*."

---

### 5. Chiusura della slide

> "Ricapitoliamo: una macchina trasforma il testo in token, poi ogni token in un vettore. In questo spazio, il significato diventa geometria. Nella prossima slide vedremo come il modello *impara* a posizionare le parole in questo spazio."

---

## Domande frequenti dal pubblico

**"Ma come fa il modello a sapere dove mettere le parole nello spazio?"**
Il modello impara le posizioni durante il training, leggendo miliardi di frasi. Non gli diciamo dove mettere "gatto" — scopre da solo che sta vicino a "cane" perche appaiono in contesti simili. Se leggi "il ___ ha miagolato" e "il ___ ha abbaiato", sai che gatto e cane sono collegati.

**"Perche proprio i vettori? Non bastava un dizionario?"**
Un dizionario ti dice la definizione, ma non cattura le *relazioni*. Con i vettori, puoi misurare quanto due parole sono simili (distanza), trovare analogie (aritmetica), e fare tutto questo in modo che il computer possa calcolare. E la rappresentazione perfetta per le macchine.

**"L'esempio Marito/Moglie funziona davvero?"**
Si, questo tipo di aritmetica vettoriale e stato dimostrato nel paper originale di Word2Vec (Mikolov et al., 2013). Non funziona *sempre* perfettamente, ma funziona sorprendentemente bene per molte relazioni semantiche. Nei modelli moderni (GPT, Claude) gli embedding sono molto piu sofisticati e catturano relazioni ancora piu complesse.

**"Quanti numeri servono per una parola?"**
Nei modelli attuali, ogni parola e rappresentata da 4.096 a 12.288 numeri (dimensioni). Piu dimensioni = piu sfumature di significato. E come descrivere un colore: con 3 numeri (RGB) puoi distinguere milioni di colori, con 4.096 numeri puoi distinguere milioni di sfumature di significato.

**"Ma allora i modelli capiscono davvero il significato?"**
Domanda filosofica! I modelli catturano le *relazioni statistiche* tra parole — il che somiglia molto al significato, ma non e necessariamente la stessa cosa. Questa e una delle grandi domande aperte della ricerca sull'IA.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

Questa sezione e **opzionale** e va usata solo se il pubblico mostra interesse tecnico. E nascosta dietro un toggle nella slide JSX.

#### Dimensionalita reale

- I grafici 2D sono una semplificazione estrema. I vettori reali hanno migliaia di dimensioni.
- Per visualizzare embedding reali in 2D si usano tecniche come t-SNE o UMAP che preservano le distanze locali ma distorcono quelle globali.
- Link utile per mostrare embedding reali: [projector.tensorflow.org](https://projector.tensorflow.org)

#### La matrice di embedding

- La matrice E ha dimensioni V × d dove V e la dimensione del vocabolario e d la dimensione dell'embedding.
- Per Llama-3 8B: V = 128.000, d = 4.096 → 524M parametri solo per gli embedding.
- L'embedding e il primo layer del modello: token_id → lookup nella matrice → vettore.
- Questi parametri vengono appresi durante il training insieme a tutti gli altri.

#### Word2Vec e la storia degli embedding

- Word2Vec (Mikolov et al., 2013) ha dimostrato per primo l'aritmetica vettoriale.
- L'intuizione chiave e la **distributional hypothesis**: "una parola e caratterizzata dalla compagnia che tiene" (Firth, 1957).
- GloVe (Pennington et al., 2014) ha esteso l'approccio usando co-occorrenze globali.
- Nei transformer moderni, gli embedding sono **contestuali**: la stessa parola ha vettori diversi in frasi diverse. "Pesca" (frutto) e "pesca" (attivita) hanno embedding diversi in base al contesto.

#### Similarita del coseno

- La metrica standard per confrontare embedding e il coseno dell'angolo tra i vettori.
- cos(θ) = 1 → identici, 0 → ortogonali, -1 → opposti.
- Questa metrica e invariante rispetto alla lunghezza del vettore, il che e importante perche ci interessa la *direzione* (significato) non la *magnitudine*.
- Il meccanismo di attention (prossima slide) usa essenzialmente lo stesso principio: il prodotto scalare QK^T e proporzionale al coseno.

#### Subword tokenization

- I modelli moderni usano Byte-Pair Encoding (BPE) o SentencePiece.
- BPE parte dai singoli caratteri e iterativamente fonde le coppie piu frequenti.
- Il vocabolario tipico ha 32K-128K token.
- Le lingue con meno dati di training (es. ungherese, finlandese) tendono ad avere token piu corti → servono piu token per la stessa frase → sono "piu costose" in termini di contesto.

---

## Transizione alla slide successiva

> "Ora sappiamo che le parole diventano vettori e che i significati hanno una geometria. Ma chi decide *dove* va ogni parola nello spazio? La risposta e: il modello lo impara da solo. Nella prossima slide vediamo come una macchina *impara* — il processo di training."

Questo collega naturalmente alla Slide 02: "Come impara una macchina".
