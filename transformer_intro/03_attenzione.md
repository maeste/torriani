# L'Attenzione: il segreto dei Transformer

## Come fa una macchina a capire una frase?

Immagina di essere in classe e il professore legge ad alta voce questa frase: *"Il gatto si sedette sul tappeto perche era stanco."* Poi ti chiede: chi era stanco? Il gatto o il tappeto? La risposta ti sembra ovvia: il gatto, naturalmente. Ma fermati un secondo a pensare a *come* lo hai capito. Il tuo cervello ha fatto qualcosa di straordinario: ha letto "era stanco", e istantaneamente andato a cercare nella frase chi potesse essere il soggetto di quell'aggettivo, ha scartato il tappeto (i tappeti non si stancano) e ha collegato "stanco" a "gatto". Tutto questo in una frazione di secondo, senza che tu te ne rendessi conto.

Ora, un computer non ha il buon senso che hai tu. Non sa che i tappeti non si stancano. Eppure i modelli linguistici moderni — quelli dietro ChatGPT, Claude, Llama — riescono a fare questo collegamento in modo sorprendentemente accurato. Come ci riescono? Grazie a un meccanismo che si chiama **attenzione**, ed e il cuore pulsante di tutti i Transformer.

### Le parole che si guardano tra loro

Per capire l'attenzione, devi dimenticarti l'idea che una macchina legga le parole una alla volta, come fai tu con un libro. Un Transformer fa qualcosa di diverso: quando incontra una parola, guarda *tutte* le parole che sono venute prima e si chiede: "Quali di queste sono importanti per capire *me*?"

Torniamo alla nostra frase. Quando il modello arriva alla parola "era", non la legge in isolamento. Guarda indietro e assegna un **peso** a ogni parola precedente. Nella nostra frase, "gatto" riceve il peso piu alto — circa 0.52 su 1 — perche il modello ha imparato, leggendo miliardi di frasi durante il suo addestramento, che quando compare "era stanco" dopo un animale e un oggetto, di solito e l'animale a essere stanco. Non "capisce" nel senso umano: riconosce un pattern statistico. Ma il risultato e impressionante.

Lo stesso succede con "sedette": il modello assegna il peso maggiore a "gatto", perche e il gatto che si siede. E con "tappeto", l'attenzione va soprattutto a "sul" e "sedette", perche il tappeto e l'oggetto su cui ci si siede. Ogni parola costruisce il suo significato guardando le altre.

### La maschera causale: niente spoiler!

C'e una regola fondamentale: ogni parola puo guardare solo le parole che vengono *prima* di lei, mai quelle *dopo*. Questo si chiama **maschera causale** (causal mask). Perche questa regola? Perche il modello genera testo da sinistra a destra, una parola alla volta. Quando sta decidendo la terza parola, la quarta semplicemente non esiste ancora. Sarebbe come chiedere a qualcuno di prevedere il finale di un film mentre lo sta ancora guardando: non puo barare e guardare avanti.

La prima parola della frase — "Il" — puo guardare solo se stessa, perche non c'e niente prima di lei. L'ultima parola, "stanco", puo guardare tutte le otto parole precedenti. Piu la frase va avanti, piu contesto ha a disposizione il modello.

### La matrice di attenzione: una mappa delle relazioni

Se prendi tutti i pesi di attenzione di tutte le parole e li metti in una griglia, ottieni quella che si chiama **matrice di attenzione**. Immagina una tabella: sulle righe ci sono le parole che "chiedono" (ogni parola vuole capire il suo significato), sulle colonne ci sono le parole che "rispondono" (ogni parola offre informazioni alle altre). Il numero nella cella indica quanta attenzione la parola della riga presta alla parola della colonna.

Questa matrice ha una caratteristica visiva interessante: la meta superiore destra e vuota (o grigia), proprio a causa della maschera causale. Le parole non possono guardare nel futuro, quindi quelle celle restano a zero. La diagonale — dove ogni parola presta attenzione a se stessa — e sempre presente, ma non e mai il peso dominante: il valore vero dell'attenzione sta nei collegamenti *tra* parole diverse.

In un modello reale, questa matrice puo avere migliaia o centinaia di migliaia di righe e colonne. E non ce n'e una sola: ogni "strato" (layer) del modello ha la sua matrice, e ogni strato ha piu "teste" (head) di attenzione. Llama-3 8B, per esempio, ha 32 layer con 32 head ciascuno: un totale di 1.024 meccanismi di attenzione diversi che lavorano in parallelo, ognuno specializzato in un tipo diverso di relazione tra parole.

### Come nasce la prossima parola

L'attenzione non serve solo a capire il significato di una frase. E anche il motore che permette al modello di **generare** testo nuovo. Ecco come funziona, passo dopo passo.

Immagina che il modello abbia la frase incompleta: "Il gatto si sedette sul ___". Usa l'attenzione per capire il contesto — un gatto che si siede su qualcosa — e poi calcola le probabilita di *tutte* le possibili parole successive. Non decide una parola sola: assegna una probabilita a ciascuna. "Tappeto" potrebbe avere il 35%, "divano" il 20%, "pavimento" il 15%, "letto" il 10%, e cosi via. Poi **sceglie** una parola, di solito quella con la probabilita piu alta, ma non sempre. Questo processo si chiama **campionamento**.

Ecco perche se fai la stessa domanda a ChatGPT due volte, puoi ottenere risposte diverse: il modello non e deterministico. C'e un parametro chiamato **temperatura** che controlla quanto il modello "rischia": con temperatura bassa sceglie quasi sempre la parola piu probabile; con temperatura alta esplora di piu e puo sorprendere con scelte creative (ma anche meno prevedibili).

Una volta scelta la parola — per esempio "tappeto" — il processo ricomincia. Ora la frase e "Il gatto si sedette sul tappeto ___" e il modello ripete tutto da capo: attenzione sul nuovo contesto, calcolo delle probabilita, scelta. E cosi via, parola dopo parola, finche non decide di mettere un punto o raggiunge il limite massimo.

### La formula (per i curiosi)

Dietro l'attenzione c'e una formula elegante. Non devi memorizzarla, ma l'idea e semplice. Ogni parola genera tre cose: una **Query** (Q — "cosa sto cercando?"), una **Key** (K — "cosa posso offrire?") e un **Value** (V — "ecco la mia informazione"). L'attenzione confronta la Query di una parola con le Key di tutte le altre, calcola quanto combaciano, e usa quei punteggi per decidere quanto leggere di ogni Value.

L'analogia migliore e una **biblioteca**: hai una domanda (la Query), ogni libro ha un titolo (la Key) e un contenuto (il Value). Confronti la tua domanda con i titoli di tutti i libri e leggi soprattutto quelli il cui titolo corrisponde meglio alla tua ricerca. Semplice, ma potentissimo.

### Perche i modelli hanno un limite di token?

Ultima curiosita: l'attenzione confronta ogni parola con tutte le altre. Questo significa che se raddoppi la lunghezza del testo, i calcoli non raddoppiano — si *quadruplicano*. Con 1.000 parole servono un milione di calcoli; con 100.000 parole ne servono dieci miliardi. Questa crescita "quadratica" e il motivo per cui i modelli hanno un limite di contesto e perche i contesti lunghissimi costano cosi tanto in termini di memoria e tempo di calcolo.

---

## 5 Cose da Ricordare

- **L'attenzione e il meccanismo chiave dei Transformer**: permette a ogni parola di "guardare" tutte le parole precedenti e decidere quali sono importanti per capire il proprio significato.
- **La maschera causale impedisce di guardare nel futuro**: il modello genera testo da sinistra a destra, quindi ogni parola puo vedere solo cio che viene prima di lei.
- **I pesi di attenzione non sono programmati a mano**: emergono automaticamente dal training su miliardi di frasi. Il modello impara da solo che "stanco" si collega a esseri viventi, non a oggetti.
- **Un LLM genera testo una parola alla volta**, calcolando le probabilita di tutti i possibili token successivi e scegliendone uno tramite campionamento. Per questo le risposte possono variare.
- **La scalabilita e quadratica**: raddoppiando la lunghezza del testo i calcoli si quadruplicano, ed e per questo che i modelli hanno limiti di contesto.

---

## 3 Cose da Fare

1. **Prova a giocare con la temperatura**: apri ChatGPT o un altro chatbot e fai la stessa domanda piu volte. Nota come le risposte cambiano leggermente ogni volta. Se hai accesso alle impostazioni, prova a cambiare la temperatura e osserva la differenza tra risposte "conservative" e "creative".

2. **Inventa frasi ambigue e testale**: scrivi frasi come "La mamma guardo la figlia perche era preoccupata" e chiedi a un LLM chi era preoccupata. Prova con frasi sempre piu ambigue e vedi quando il modello sbaglia. Questo ti aiutera a capire i limiti del meccanismo di attenzione.

3. **Guarda il video "Attention Is All You Need" su YouTube**: cerca spiegazioni visuali del paper originale del 2017 di Vaswani e colleghi. Ci sono ottimi video con animazioni che mostrano come funziona la matrice di attenzione in tempo reale, e rendono tutto ancora piu chiaro.

---

## Domande Frequenti

**Il modello capisce davvero chi e "era" nella frase?**
Non nel senso umano del termine. Il modello non ha comprensione: ha imparato pattern statistici da miliardi di frasi. Quando vede "X si sedette... perche era stanco", riconosce un pattern che associa il soggetto dell'azione a "era". E riconoscimento di pattern, non comprensione.

**Perche il modello non puo guardare le parole successive?**
Perche genera testo da sinistra a destra, una parola alla volta. Quando sta generando la terza parola, la quarta non esiste ancora. La maschera causale impone questa regola. Esistono pero modelli come BERT che *possono* guardare in entrambe le direzioni, perche il loro compito non e generare testo ma analizzarlo.

**Come fa il modello a sapere che "gatto" e piu rilevante di "tappeto" per la parola "era"?**
Lo ha imparato durante il training, leggendo miliardi di frasi. Ha visto che aggettivi come "stanco" si associano piu spesso a esseri viventi che a oggetti. I pesi di attenzione non vengono programmati: emergono dall'addestramento.

**Se non e sicuro al 100%, come sceglie la parola giusta?**
In realta non sceglie sempre "la migliore" in senso assoluto: campiona dalle probabilita. Con la temperatura bassa tende a scegliere la parola piu probabile; con temperatura alta esplora scelte meno ovvie. Per questo le risposte possono variare ad ogni richiesta.

**Cosa sono le "teste" (head) di attenzione?**
Il modello non ha un unico meccanismo di attenzione, ma molti che lavorano in parallelo. Ogni "testa" si specializza in un tipo diverso di relazione: una potrebbe catturare relazioni grammaticali (soggetto-verbo), un'altra la coreferenza (a chi si riferisce "era"?), un'altra le relazioni di vicinanza. Llama-3 8B ne ha 1.024 in totale.

**Cosa significano Query, Key e Value?**
Sono tre "trasformazioni" che ogni parola subisce. La Query e la domanda che una parola fa ("cosa cerco?"), la Key e l'etichetta che offre ("cosa posso offrire?"), il Value e il contenuto informativo effettivo. L'attenzione confronta le Query con le Key per decidere quanto leggere di ogni Value. Pensala come cercare un libro in biblioteca: la tua domanda e la Query, i titoli dei libri sono le Key, il contenuto dei libri e il Value.

**Perche si chiama "Transformer"?**
Il nome viene dal paper "Attention Is All You Need" del 2017 di Vaswani e colleghi. L'idea e che il modello "trasforma" la rappresentazione di ogni parola attraverso molteplici layer di attenzione, arricchendola progressivamente con informazioni sul contesto. Ogni layer aggiunge un po' di comprensione in piu.

**Perche i modelli hanno un limite di token?**
Perche il numero di calcoli dell'attenzione cresce con il quadrato della lunghezza del testo. Con 1.000 token servono 1 milione di confronti; con 100.000 token ne servono 10 miliardi. Questo rende i contesti molto lunghi estremamente costosi in termini di memoria e di tempo.

---

## Mettiti alla Prova

**1. Nella frase "Il gatto si sedette sul tappeto perche era stanco", come fa il modello a collegare "era stanco" a "gatto"?**

A) Ha una regola scritta dal programmatore che dice "stanco si riferisce sempre agli animali"
B) Usa il meccanismo di attenzione, che assegna un peso alto a "gatto" basandosi su pattern appresi durante il training
C) Legge la frase al contrario e trova "gatto" come prima parola utile
D) Sceglie sempre il soggetto piu vicino alla parola "era"

**2. Cosa impedisce al modello di "guardare avanti" e vedere le parole future della frase?**

A) Una limitazione hardware delle GPU
B) La temperatura, che restringe il campo visivo del modello
C) La maschera causale, che blocca l'accesso alle parole successive
D) Il fatto che il modello legge le parole al contrario

**3. Quando un LLM deve generare la prossima parola, cosa fa esattamente?**

A) Cerca la parola giusta in un dizionario incorporato
B) Calcola le probabilita di tutti i possibili token successivi e ne campiona uno
C) Copia la parola piu frequente nei testi di addestramento
D) Sceglie sempre la parola con la probabilita piu alta, senza eccezioni

**4. Perche se fai la stessa domanda a ChatGPT due volte puoi ottenere risposte diverse?**

A) Perche il modello viene ri-addestrato tra una domanda e l'altra
B) Perche la connessione internet influenza le risposte
C) Perche il modello campiona dalle probabilita invece di scegliere sempre la parola piu probabile, e il parametro temperatura regola questa variabilita
D) Perche ogni utente ha una versione diversa del modello

**5. Perche i modelli linguistici hanno un limite massimo di token (lunghezza del contesto)?**

A) Perche dopo un certo numero di parole il modello si "dimentica" le prime
B) Perche il numero di calcoli dell'attenzione cresce con il quadrato della lunghezza del testo, rendendo contesti molto lunghi troppo costosi
C) Perche i server di OpenAI e Anthropic non hanno abbastanza spazio su disco
D) Perche le lingue umane non producono mai testi piu lunghi del limite

