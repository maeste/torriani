# Come impara una macchina: Regressione Lineare e Gradient Descent

## Il segreto dietro l'intelligenza artificiale

Hai mai pensato a come fa un computer a "imparare"? Non ha un cervello, non ha intuizioni, eppure riesce a fare cose incredibili: riconoscere volti nelle foto, tradurre lingue, scrivere testi. Il segreto, per quanto possa sembrare sorprendente, si riduce a un meccanismo semplicissimo: **provare, sbagliare, correggere**. Ripetuto un numero enorme di volte.

Per capire come funziona, facciamo un gioco. Immagina di essere un agente immobiliare alle prime armi. Il tuo capo ti dà una lista di 30 case vendute di recente, con due informazioni per ciascuna: i metri quadrati e il prezzo di vendita. Poi ti dice: "La prossima volta che arriva un cliente con una casa da 85 metri quadri, devi dirgli quanto vale." Come faresti?

Probabilmente faresti quello che farebbe chiunque: guarderesti i dati, cercheresti un andamento, e proveresti a tracciare mentalmente una linea che "segue" i punti. Le case più grandi costano di più, quindi la linea sale. Ma quanto sale? E da dove parte? Ecco, queste due domande corrispondono esattamente a quello che in matematica si chiama **pendenza** e **intercetta** di una retta. E un computer fa esattamente lo stesso ragionamento -- solo che lo fa in modo sistematico e preciso.

### La retta e i suoi due "pomelli"

Una retta sul piano cartesiano si scrive come **y = mx + b**, dove **m** è la pendenza (quanto sale la retta per ogni passo in avanti) e **b** è l'intercetta (dove la retta incrocia l'asse verticale). Puoi pensare a m e b come a due manopole da girare: cambiando i loro valori, la retta si inclina e si sposta. Il compito della macchina è trovare la combinazione di m e b che fa passare la retta il più vicino possibile a tutti i 30 punti.

Ma "il più vicino possibile" è un concetto vago. Ci serve un modo per misurare *quanto* la retta sbaglia. Qui entra in gioco l'**errore quadratico medio**, che gli informatici chiamano MSE (Mean Squared Error). Funziona così: per ogni punto, calcoli la distanza verticale tra il punto vero e il punto sulla retta, la elevi al quadrato (così non importa se l'errore è sopra o sotto, conta sempre), e poi fai la media di tutti questi errori. Il risultato è un singolo numero: più è basso, meglio la retta si adatta ai dati.

### Provare a mano: più difficile di quanto sembri

Se provassi a girare le due manopole a mano, cercando di abbassare l'errore, ti accorgeresti che è sorprendentemente difficile. Muovi la pendenza e l'errore scende, ma poi muovi l'intercetta e l'errore risale. Trovi una buona combinazione, ma sei sicuro che sia la migliore? Magari c'è un'altra posizione della retta che funziona ancora meglio.

Quando hai solo due manopole, con un po' di pazienza ci si può arrivare. Ma ora pensa a questo: un modello come GPT-4 non ha 2 manopole, ne ha circa **1.800 miliardi** (1,8 trilioni). Impossibile regolarle a mano. Serve un metodo automatico.

### Gradient descent: scendere dalla montagna nella nebbia

Ed eccoci al cuore del machine learning: il **gradient descent**, ovvero la "discesa del gradiente". L'idea è geniale nella sua semplicità.

Immagina di essere in cima a una montagna, immerso nella nebbia. Non vedi la valle, non hai una mappa. L'unica cosa che puoi fare è sentire con i piedi in che direzione il terreno scende e fare un piccolo passo in quella direzione. Poi ti fermi, senti di nuovo, fai un altro passo. Piano piano, passo dopo passo, arrivi a valle.

Il computer fa esattamente questo con l'errore. Per ogni manopola (parametro), calcola: "Se giro questa manopola un pochino, l'errore sale o scende?" Questo calcolo si fa con le **derivate** -- quel concetto di matematica che forse avete iniziato a vedere in classe. La derivata dell'errore rispetto a un parametro dice precisamente quanto e in che direzione l'errore cambia se quel parametro viene modificato. Il computer prende questa informazione e fa un piccolo aggiustamento nella direzione che riduce l'errore.

Quanto è grande il passo? Dipende da un valore chiamato **learning rate** (tasso di apprendimento). Se è troppo grande, il modello "salta" avanti e indietro come un escursionista che fa passi enormi e finisce per rimbalzare da un lato all'altro della valle senza mai fermarsi. Se è troppo piccolo, il modello impiega un'eternità a scendere. Trovare il learning rate giusto è una delle sfide pratiche di chi addestra modelli.

### Il ciclo magico

Quello che succede durante il training di qualsiasi modello di machine learning è un ciclo che si ripete miliardi di volte:

1. **Prova**: il modello fa una previsione con i parametri attuali
2. **Misura**: si calcola quanto la previsione è lontana dalla realtà (l'errore)
3. **Correggi**: si aggiustano i parametri nella direzione che riduce l'errore

Nel nostro esempio con la retta e le 30 case, questo ciclo si ripete 15 volte e in pochi secondi la retta si posiziona nel punto ottimale. All'inizio l'errore scende rapidamente, poi sempre più piano, finché il modello **converge**: ha trovato la migliore retta possibile e ulteriori aggiustamenti non portano miglioramenti significativi.

### Dalla retta a GPT: cambia la scala, non il principio

Ecco la cosa straordinaria: il principio è **identico** sia per la nostra semplice retta sia per i modelli di linguaggio più potenti del mondo. Cambia solo la scala. La nostra retta aveva 2 parametri e 30 punti dati. GPT-4 ha circa 1,8 trilioni di parametri ed è stato addestrato su 13 trilioni di token (pezzi di testo). Il suo training è durato mesi su migliaia di GPU ed è costato circa 100 milioni di dollari. Ma ogni singolo passo del suo addestramento è stato esattamente quel ciclo: prova, misura, correggi.

Non c'è magia dentro un LLM. Non c'è una scintilla di coscienza nascosta. C'è matematica -- tanta, tantissima matematica -- che ripete lo stesso meccanismo che hai appena visto, solo più veloce e con molte più manopole da girare. Sapere questo ti dà un superpotere: puoi guardare a ChatGPT, a Claude, a qualsiasi modello, e capire che sotto il cofano non c'è nulla di misterioso. Solo un metodo molto elegante per imparare dai dati.

---

## 5 Cose da Ricordare

- **Il machine learning è un ciclo**: provare, misurare l'errore, correggere. Qualsiasi modello, dal più semplice al più complesso, funziona così.
- **I parametri sono le "manopole"** che il modello regola per adattarsi ai dati. Una retta ne ha 2, GPT-4 ne ha 1,8 trilioni.
- **L'errore (MSE) è il giudice**: è un numero che dice quanto il modello sta sbagliando. L'obiettivo del training è renderlo il più basso possibile.
- **Il gradient descent è la strategia**: come scendere da una montagna nella nebbia, un piccolo passo alla volta nella direzione giusta, guidati dalle derivate.
- **La scala cambia, il principio no**: la differenza tra il nostro esempio e GPT-4 è solo nel numero di parametri e nella quantità di dati, non nel meccanismo fondamentale.

---

## 3 Cose da Fare

1. **Gioca con la simulazione interattiva**: apri la slide JSX della lezione e prova a regolare gli slider a mano per trovare la retta migliore. Poi premi "Addestra!" e osserva come la macchina ci arriva da sola. Confronta il tuo risultato con quello del computer.

2. **Sperimenta con un foglio di calcolo**: prendi 10 coppie di dati inventati (ad esempio altezza e peso di 10 persone), mettili in un foglio Excel o Google Sheets, e usa la funzione "linea di tendenza" del grafico. Stai facendo regressione lineare senza scrivere una riga di codice.

3. **Esplora Teachable Machine di Google**: vai su [teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com) e addestra un modello a riconoscere oggetti con la tua webcam. Vedrai lo stesso principio (prova, misura, correggi) applicato a immagini reali.

---

## Domande Frequenti

**Come fa il computer a "sentire" in che direzione andare?**
Usa le derivate, cioè il gradiente. La derivata dell'errore rispetto a ogni parametro indica esattamente in che direzione e di quanto l'errore cambierebbe se quel parametro fosse modificato. Il computer calcola tutte le derivate e si muove nella direzione opposta al gradiente (dove l'errore diminuisce).

**Perché non si calcola direttamente la soluzione perfetta?**
Per una semplice retta in realtà si può fare, con una formula chiamata "minimi quadrati". Ma per le reti neurali con miliardi di parametri non esiste una formula diretta. L'unico modo è procedere per tentativi con il gradient descent, che per fortuna funziona sorprendentemente bene anche con trilioni di parametri.

**Cosa succede se il learning rate è sbagliato?**
Se è troppo alto, il modello "rimbalza" senza mai trovare la soluzione, come chi fa salti troppo grandi scendendo da una montagna. Se è troppo basso, l'addestramento diventa lentissimo. In pratica, trovare il learning rate giusto è una delle prime cose che un ingegnere di machine learning deve decidere.

**Quanto tempo ci vuole per addestrare un modello grande come GPT-4?**
Settimane o mesi, usando migliaia di GPU in parallelo. Un singolo ciclo di addestramento di GPT-4 ha richiesto circa 25.000 GPU A100 per diversi mesi, con un costo stimato di circa 100 milioni di dollari, dominato da elettricità e hardware.

**Cos'è l'R-squared che si vede nella simulazione?**
È un numero tra 0 e 1 che indica quanto bene la retta spiega i dati. R-squared = 1 significa che la retta passa perfettamente per tutti i punti. R-squared = 0 significa che la retta non spiega nulla. Un valore sopra 0,8 è generalmente considerato buono.

**Ma se il principio è così semplice, perché i modelli di AI sembrano così "intelligenti"?**
Perché la scala fa la differenza. Quando hai miliardi di parametri e li addestri su una quantità enorme di testo, il modello riesce a catturare pattern incredibilmente sofisticati: grammatica, ragionamento, conoscenza del mondo. Il meccanismo è semplice, ma applicato a una scala immensa produce risultati che sembrano magici.

**Perché l'errore scende veloce all'inizio e poi rallenta?**
All'inizio il modello è molto lontano dalla soluzione, quindi anche piccoli aggiustamenti producono grandi miglioramenti. Man mano che si avvicina alla soluzione ottimale, i miglioramenti diventano sempre più piccoli. È come avvicinarsi alla cima di una collina: gli ultimi metri sono i più faticosi per il minor guadagno.

**Il training si paga ogni volta che uso ChatGPT?**
No. Il costo del training si paga una volta sola: è l'investimento iniziale per creare il modello. Quando usi ChatGPT o Claude, il costo per ogni domanda (chiamato "inferenza") è molto più basso. È come costruire una fabbrica: costa molto all'inizio, ma poi ogni prodotto costa relativamente poco.

---

## Mettiti alla Prova

**1. Qual è il ciclo fondamentale del machine learning?**
- A) Leggere, memorizzare, ripetere
- B) Provare, misurare l'errore, correggere- C) Copiare, incollare, modificare
- D) Programmare, compilare, eseguire

**2. Nel gradient descent, cosa indica il gradiente?**
- A) La velocità del computer
- B) Il numero totale di parametri
- C) La direzione in cui l'errore cresce di più- D) Il costo dell'addestramento

**3. Cosa succede se il learning rate è troppo alto?**
- A) Il modello impara più velocemente e meglio
- B) Il modello rimbalza senza convergere alla soluzione- C) Il modello non si muove affatto
- D) Il modello cancella i dati di training

**4. Qual è la differenza fondamentale tra la nostra retta e GPT-4?**
- A) Usano algoritmi completamente diversi
- B) GPT-4 ha coscienza, la retta no
- C) La scala: GPT-4 ha trilioni di parametri invece di 2- D) La retta usa matematica, GPT-4 usa magia

**5. Perché l'MSE eleva al quadrato gli errori?**
- A) Per rendere i calcoli più difficili
- B) Per far sembrare l'errore più grande di quello che è
- C) Per rendere gli errori sempre positivi e penalizzare di più quelli grandi- D) Perché il computer può fare solo moltiplicazioni
