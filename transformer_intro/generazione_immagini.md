# Creare con l'IA: Le Immagini

## Dall'immaginazione al pixel: come l'intelligenza artificiale trasforma le parole in immagini

Immagina di avere uno scultore personale. Gli descrivi a parole cosa vuoi — "un gatto rosso seduto su un tetto al tramonto" — e lui, partendo da un blocco di marmo informe, inizia a lavorare. Colpo dopo colpo, il superfluo cade via, e dal caos emerge esattamente quello che avevi in mente. Ecco, i modelli di intelligenza artificiale che generano immagini funzionano proprio cosi. Solo che il loro "blocco di marmo" non e pietra: e rumore. Rumore digitale, puro caos di pixel colorati a caso, come la neve sulle vecchie televisioni analogiche.

Questa famiglia di modelli si chiama **diffusion models** (modelli di diffusione), e il loro funzionamento e tanto elegante quanto controintuitivo. Il trucco sta nell'imparare a fare una cosa apparentemente inutile: *rovinare immagini*. Durante l'addestramento, il modello prende milioni di foto reali e le corrompe gradualmente, aggiungendo rumore un po' alla volta, fino a trasformarle in macchie casuali irriconoscibili. Poi impara il processo inverso: dato un passo di rumore, il modello impara a prevedere quale rumore togliere per tornare indietro di un passo verso l'immagine originale. Quando vuoi generare un'immagine nuova, il modello parte da rumore completamente casuale e applica questo processo di "pulizia" ripetutamente — tipicamente per decine o centinaia di passi — fino a far emergere un'immagine nitida e coerente.

Ma come fa il modello a sapere *cosa* disegnare a partire dalla tua descrizione testuale? Qui entra in gioco un componente fondamentale chiamato **CLIP** (Contrastive Language-Image Pre-training), sviluppato da OpenAI nel 2021. CLIP e stato addestrato su centinaia di milioni di coppie testo-immagine raccolte dal web, e ha imparato a creare una sorta di "dizionario universale" che collega parole e immagini. Quando scrivi "gatto rosso su un tetto al tramonto", CLIP traduce questa frase in una serie di numeri (un vettore) che rappresenta il significato visivo di quelle parole. Questo vettore guida il processo di denoising, dicendo al modello: "non scolpire una scultura qualsiasi, scolpine una che assomigli a *questo*."

I modelli moderni come Stable Diffusion e Flux hanno un altro asso nella manica: lavorano in uno **spazio latente**. Invece di manipolare direttamente i pixel dell'immagine (che possono essere milioni), comprimono tutto in una rappresentazione molto piu piccola. E come se lo scultore, invece di lavorare su una statua a grandezza naturale, scolpisse prima un modellino in miniatura perfetto, e poi lo ingrandisse alla dimensione finale. Questo rende il processo enormemente piu veloce e accessibile: un'immagine che richiederebbe ore da calcolare sui pixel puo essere generata in pochi secondi nello spazio latente.

### Gli strumenti a disposizione

Oggi il panorama degli strumenti per generare immagini e ricco e variegato. **Midjourney** e il preferito degli artisti: produce immagini di qualita estetica straordinaria e si usa attraverso Discord, un'app che probabilmente conosci gia. **DALL-E 3** di OpenAI e integrato direttamente in ChatGPT, il che lo rende facilissimo da usare — basta descrivere quello che vuoi in linguaggio naturale. **Stable Diffusion** e il campione del mondo open source: puoi scaricarlo gratuitamente e farlo girare sul tuo computer, a patto di avere una scheda grafica decente. **Flux**, creato dagli stessi ricercatori che hanno sviluppato Stable Diffusion, rappresenta la nuova generazione open source con un'architettura ancora piu moderna. Infine **Ideogram** ha risolto uno dei problemi piu ostici: generare testo leggibile all'interno delle immagini, perfetto per loghi e poster.

Una distinzione importante e quella tra modelli **chiusi** (come Midjourney e DALL-E, che si usano a pagamento tramite i servizi dei creatori) e **aperti** (come Stable Diffusion e Flux, che puoi scaricare, studiare e modificare liberamente). Entrambi gli approcci hanno vantaggi: i modelli chiusi offrono facilita d'uso e qualita costante, quelli aperti danno liberta totale e trasparenza.

Un concetto affascinante del mondo open source e **LoRA** (Low-Rank Adaptation): una tecnica che permette di personalizzare un modello con pochissime immagini — anche solo cinque o dieci — e risorse computazionali limitate. Vuoi che il modello impari il tuo stile artistico, o che sappia disegnare il tuo gatto? Con LoRA puoi "insegnargli" nuovi concetti senza dover riaddestrare miliardi di parametri. Il file risultante pesa appena qualche decina di megabyte, contro i gigabyte del modello completo.

### Le applicazioni sono ovunque

Le possibilita creative sono esplose: dall'arte digitale e le illustrazioni per libri, al design di prodotti e interfacce, dall'architettura (visualizzare un edificio prima di costruirlo) alla moda (progettare collezioni con infinite variazioni istantanee), dal marketing (creare campagne visive senza servizi fotografici) all'educazione (illustrare concetti complessi in modo visivo). La democratizzazione creativa e reale: oggi chiunque, anche senza saper disegnare, puo trasformare un'idea in un'immagine professionale.

### I rischi: il lato oscuro della medaglia

Ma come ogni tecnologia potente, anche questa ha un lato oscuro, e va affrontato con onesta. Il rischio piu immediato e viscerale sono i **deepfake**: immagini false di persone reali, cosi convincenti da ingannare chiunque. Nel 2023 un'immagine falsa del Papa con un piumino Balenciaga e diventata virale, ingannando milioni di persone. Ma i deepfake non sono solo curiosita: vengono usati per cyberbullismo, truffe, manipolazione politica. In Italia, creare deepfake non consensuali puo configurare reati come la diffamazione o il trattamento illecito di dati personali.

C'e poi la questione del **copyright**: se un modello si e addestrato sulle opere di migliaia di artisti senza il loro consenso, chi possiede le immagini generate? E una domanda a cui i tribunali di tutto il mondo stanno cercando di rispondere. Getty Images ha citato in giudizio Stability AI proprio per questo motivo, e il caso potrebbe ridefinire il futuro legale dell'IA generativa.

Non dimentichiamo il **bias visivo**: i modelli tendono a riprodurre gli stereotipi presenti nei dati su cui sono stati addestrati. Se chiedi "un dottore", l'IA genera quasi sempre un uomo bianco. Questo non e un dettaglio tecnico: e un problema sociale che l'IA rischia di amplificare.

Con grande potere viene grande responsabilita. E non e solo una citazione da Spider-Man: e la sfida concreta di questa generazione.

---

## 5 Cose da Ricordare

- **I modelli di diffusione partono dal rumore e arrivano all'immagine**: come uno scultore che toglie il superfluo dal marmo, il modello rimuove rumore passo dopo passo, guidato dalla descrizione testuale dell'utente.

- **CLIP e il ponte tra parole e immagini**: traduce il testo in una rappresentazione numerica che il modello usa per sapere *cosa* generare, grazie all'addestramento su centinaia di milioni di coppie testo-immagine.

- **Esistono modelli chiusi e aperti**: Midjourney e DALL-E sono servizi a pagamento; Stable Diffusion e Flux sono open source e scaricabili gratuitamente. Entrambi gli approcci hanno vantaggi.

- **LoRA permette di personalizzare i modelli con poche risorse**: bastano poche immagini e un computer normale per insegnare al modello nuovi stili o concetti specifici.

- **I rischi sono reali e vanno conosciuti**: deepfake, violazioni di copyright, bias visivi e manipolazione dell'informazione sono sfide concrete che richiedono consapevolezza e regolamentazione.

---

## 3 Cose da Fare

1. **Prova a generare un'immagine**: usa la versione gratuita di uno strumento come Ideogram, Microsoft Copilot o la versione free di DALL-E in Bing. Scrivi una descrizione dettagliata e osserva come cambia il risultato modificando le parole. Nota cosa il modello interpreta bene e dove invece fatica.

2. **Fai un esperimento sul bias**: chiedi allo stesso strumento di generare "un medico", "un ingegnere" e "un insegnante" senza specificare genere o etnia. Osserva i risultati: quali stereotipi emergono? Discutine con i tuoi compagni.

3. **Esplora il mondo open source**: cerca "Stable Diffusion online" o "Flux online" per trovare interfacce web gratuite che ti permettono di sperimentare senza installare nulla. Prova a generare la stessa immagine con strumenti diversi e confronta i risultati.

---

## Domande Frequenti

**Come fa l'IA a "capire" cosa disegnare dal testo?**
Usa un modello chiamato CLIP che ha imparato le corrispondenze tra testo e immagini analizzando centinaia di milioni di coppie dal web. CLIP traduce la tua descrizione in numeri che guidano il processo di generazione, come un navigatore GPS che indica allo scultore digitale la direzione giusta.

**L'immagine generata e mia o dell'IA?**
Dipende dal servizio e dal paese. In USA, il Copyright Office ha stabilito che le immagini generate puramente da IA non sono proteggibili. In Europa la situazione e ancora in evoluzione. Servizi come Midjourney e DALL-E concedono diritti commerciali agli utenti paganti, ma il dibattito legale e tutt'altro che chiuso.

**Un artista puo impedire che la sua arte venga usata per addestrare l'IA?**
E una questione legale aperta. Alcuni artisti usano strumenti come Glaze per "avvelenare" le loro immagini online, rendendole inutilizzabili per l'addestramento. Cause legali importanti come Stability AI vs Getty Images potrebbero definire nuove regole.

**Si possono creare deepfake di chiunque?**
Tecnicamente si, ed e un problema serio. Deepfake vengono gia usati per cyberbullismo, truffe e manipolazione politica. In Italia, creare deepfake non consensuali puo costituire reato. Molti paesi stanno introducendo leggi specifiche per regolamentare questa pratica.

**Cosa vuol dire che un modello e "open source"?**
Significa che il codice e i pesi del modello sono pubblici: chiunque puo scaricarli, studiarli, modificarli e usarli senza pagare. E come avere la ricetta completa di un piatto, non solo il piatto pronto al ristorante.

**Perche le IA faticano a scrivere testo nelle immagini?**
I modelli di diffusione lavorano sui pattern visivi, non sulla comprensione linguistica. Le lettere richiedono precisione al pixel che il processo di denoising fatica a garantire. Ideogram ha affrontato questo problema specifico con tecniche dedicate, diventando il migliore in questa nicchia.

**Cosa significa "spazio latente"?**
E una rappresentazione compressa dell'immagine: invece di lavorare su milioni di pixel, il modello opera su una versione molto piu piccola e densa di informazione. E come lavorare sulla bozza di un progetto prima di realizzare il disegno tecnico definitivo — molto piu veloce e pratico.

**Quanto costa generare immagini con l'IA?**
Va dal completamente gratuito (Stable Diffusion sul proprio PC, versioni free di vari servizi) a circa 10-60 euro al mese per i servizi premium. Serve pero una scheda grafica discreta per far girare i modelli open source in locale.

---

## Mettiti alla Prova

**1. Come funziona il processo di generazione nei modelli di diffusione?**

a) L'IA copia pezzi di immagini esistenti e li incolla insieme
b) L'IA parte da rumore casuale e lo trasforma gradualmente in un'immagine, guidata dal testo
c) L'IA disegna l'immagine pixel per pixel da sinistra a destra, come una stampante
d) L'IA cerca l'immagine piu simile alla descrizione in un database di foto

**2. Qual e il ruolo di CLIP nel processo di generazione delle immagini?**

a) Aggiunge filtri artistici all'immagine finale
b) Comprime l'immagine per ridurne le dimensioni
c) Collega il significato del testo alla rappresentazione visiva, guidando la generazione
d) Controlla che l'immagine non contenga contenuti inappropriati

**3. Cosa permette di fare la tecnica LoRA?**

a) Generare immagini in altissima risoluzione
b) Personalizzare un modello con poche immagini e risorse limitate
c) Eliminare completamente il bias dalle immagini generate
d) Proteggere le immagini dal copyright

**4. Quale tra queste affermazioni sui rischi dell'IA generativa e CORRETTA?**

a) I deepfake sono facili da riconoscere grazie a errori evidenti nelle immagini
b) Il bias visivo e un problema minore che riguarda solo pochi modelli obsoleti
c) L'IA puo riprodurre e amplificare stereotipi presenti nei dati di addestramento
d) Il copyright delle immagini generate e stato definito in modo chiaro e uniforme a livello mondiale

**5. Qual e la differenza principale tra un modello chiuso e uno open source?**

a) I modelli chiusi generano immagini migliori in ogni caso
b) I modelli open source richiedono sempre una connessione internet
c) I modelli open source permettono di scaricare, studiare e modificare liberamente il codice e i pesi del modello
d) I modelli chiusi sono gratuiti, quelli open source sono a pagamento
