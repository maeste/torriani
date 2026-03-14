# Quando l'IA Ragiona — Modelli che Pensano Prima di Rispondere

## La storia di un'intelligenza artificiale che ha imparato a fermarsi a pensare

Immagina di essere a un quiz televisivo. Il conduttore ti fa una domanda di matematica e tu hai due opzioni: sparare la prima risposta che ti viene in mente, oppure prenderti qualche secondo per ragionare con calma. Quale strategia funziona meglio? Ovvio: pensare prima di rispondere. Eppure, fino a poco tempo fa, i modelli di intelligenza artificiale facevano esattamente il contrario: rispondevano di getto, senza mai fermarsi a riflettere.

Per capire perche questo sia un problema, facciamo un passo indietro. I modelli linguistici (LLM) funzionano generando una parola alla volta, in sequenza. Ogni parola viene scelta in base a quella precedente, un po' come completare una frase per inerzia. Questo approccio funziona benissimo per tante cose: scrivere un'email, tradurre una frase, riassumere un testo. Ma quando il problema richiede ragionamento — tipo un problema di matematica con piu passaggi — "andare a istinto" non basta piu.

Ecco un esempio concreto. Prova a risolvere questo problema: *Un negozio ha 15 mele. Ne vende un terzo la mattina e due quinti di quelle rimaste il pomeriggio. Quante mele restano?* Se rispondi di getto, potresti dire "4" o "7" e sbaglieresti. Ma se ti fermi a ragionare passo per passo — 15 diviso 3 fa 5, ne restano 10, poi 2/5 di 10 fa 4, ne restano 6 — arrivi alla risposta corretta: 6 mele. Ecco, i **reasoning models** fanno esattamente questo: si prendono tempo per pensare prima di rispondere.

### La Chain of Thought: pensare passo per passo

La tecnica che sta alla base di tutto si chiama **Chain of Thought** (catena di pensiero). L'idea e semplice ma potente: invece di chiedere al modello di dare subito la risposta finale, gli si chiede di mostrare tutti i passaggi intermedi del ragionamento. E la cosa sorprendente e che basta aggiungere una frase come *"pensa passo per passo"* al proprio prompt per attivare questa modalita anche nei modelli standard. La probabilita di risposta corretta su problemi complessi sale drasticamente.

Ma i veri reasoning models vanno oltre. Non hanno bisogno che tu gli dica di ragionare: lo fanno automaticamente. Generano una serie di "token di ragionamento" — cioe parole e frasi che rappresentano il processo di pensiero — prima di produrre la risposta finale. Piu token di ragionamento significa piu tempo dedicato a pensare, e generalmente risposte migliori.

### I protagonisti: chi ragiona oggi?

Nel 2024-2025 diversi laboratori hanno lanciato i loro reasoning models, e la corsa e stata entusiasmante.

**o1 e o3 di OpenAI** sono stati i pionieri. Lanciato a settembre 2024, o1 ha dimostrato che investire potenza di calcolo durante la risposta (non solo durante l'addestramento) migliora enormemente le prestazioni. Il successore o3, arrivato a gennaio 2025, ha polverizzato i record sui benchmark matematici. La particolarita? La catena di pensiero e nascosta: l'utente non vede come il modello ragiona, solo il risultato finale.

**Claude Extended Thinking di Anthropic** ha preso la strada opposta sulla trasparenza: mostra all'utente il processo di ragionamento. Puoi letteralmente leggere i "pensieri" del modello mentre lavora al problema. Questo rende il processo verificabile — se il modello sbaglia al passaggio 3, lo puoi vedere e correggere.

**DeepSeek-R1** e forse la storia piu affascinante. E un modello open source, cioe chiunque puo scaricarlo e usarlo. E stato addestrato con una tecnica chiamata RLVR (Reinforcement Learning with Verifiable Rewards): in pratica, il modello veniva premiato quando la risposta matematica era corretta e penalizzato quando era sbagliata. La cosa straordinaria? Nessuno ha insegnato esplicitamente al modello a ragionare passo per passo. La catena di pensiero e *emersa spontaneamente* durante l'addestramento. Il modello ha scoperto da solo che pensare prima di rispondere funziona meglio.

**Gemini Thinking di Google** completa il quadro, integrando il ragionamento nell'ecosistema Google con un approccio multimodale: puo ragionare non solo su testo, ma anche su immagini e video.

### Quando usare un reasoning model (e quando no)

Attenzione pero: il ragionamento non serve sempre. Usare un reasoning model per chiedere "Qual e la capitale della Francia?" e come usare un cannone per aprire una noce. E piu lento (puo impiegare 30 secondi invece di 2), costa molto di piu in termini di calcolo (da 10 a 50 volte tanto), e per domande semplici non aggiunge nulla.

La regola pratica e questa: se il problema richiede piu passaggi di ragionamento — problemi di matematica, puzzle logici, debugging del codice, analisi complesse con molte variabili — allora un reasoning model fa la differenza. Se invece devi scrivere un testo creativo, tradurre, fare conversazione o riassumere qualcosa, un modello standard va benissimo (e spesso anche meglio, perche la creativita fluisce meglio senza i vincoli del ragionamento strutturato).

Un consiglio pratico: se un modello standard sbaglia una risposta che richiede ragionamento, prima di passare a un modello specializzato prova ad aggiungere al tuo prompt frasi come *"pensa passo per passo"*, *"ragiona prima di rispondere"* o *"mostra il tuo ragionamento"*. Spesso basta questo per migliorare la risposta.

### Il grande dibattito: ragionano davvero?

C'e una domanda che i ricercatori si fanno continuamente: questi modelli ragionano *davvero*? La risposta onesta e: dipende da cosa intendi per "ragionare". Non pensano come un essere umano — non hanno coscienza, non capiscono il significato profondo di quello che fanno. Quello che fanno e generare sequenze di token che assomigliano molto a un ragionamento, seguendo pattern appresi durante l'addestramento. Ma i risultati pratici sono impressionanti: sui problemi di matematica olimpica, o3 supera il 99% degli esseri umani. Sui test scientifici di livello dottorato, batte anche gli esperti.

C'e chi sostiene che sia vero ragionamento perche questi modelli risolvono problemi mai visti prima e generalizzano a domini nuovi. C'e chi replica che e pattern matching sofisticato, perche a volte falliscono su varianti banali di problemi che dovrebbero saper risolvere. La verita probabilmente sta nel mezzo, e questo e uno dei dibattiti piu affascinanti dell'intelligenza artificiale contemporanea.

---

## 5 Cose da Ricordare

- **I reasoning models pensano prima di rispondere**: generano una "catena di pensiero" interna fatta di passaggi intermedi prima di dare la risposta finale, a differenza dei modelli standard che rispondono di getto.

- **La Chain of Thought funziona**: scomporre un problema in passaggi intermedi riduce drasticamente gli errori, e si puo attivare anche nei modelli normali con prompt come "pensa passo per passo".

- **Esistono diversi reasoning models**: o1/o3 (OpenAI), Claude Extended Thinking (Anthropic), DeepSeek-R1 (open source) e Gemini Thinking (Google), ciascuno con caratteristiche diverse in termini di trasparenza e accessibilita.

- **Non servono sempre**: il ragionamento e utile per problemi complessi (matematica, logica, debugging) ma e sprecato (e costoso) per compiti semplici come traduzione, conversazione o riassunti.

- **Il ragionamento puo emergere spontaneamente**: DeepSeek-R1 ha dimostrato che con il giusto sistema di addestramento (RLVR), i modelli possono scoprire da soli la strategia del pensiero passo per passo.

---

## 3 Cose da Fare

1. **Sperimenta la Chain of Thought**: la prossima volta che un chatbot sbaglia una risposta complessa, aggiungi "pensa passo per passo" al tuo prompt e confronta i risultati. Prova con problemi di matematica, indovinelli logici o qualsiasi domanda che richieda ragionamento.

2. **Confronta i modelli**: prova lo stesso problema su ChatGPT (con o3), Claude (con Extended Thinking) e altri assistenti. Osserva le differenze nel processo di ragionamento e nella trasparenza. Quale ti convince di piu? Quale spiega meglio come arriva alla risposta?

3. **Rifletti su cosa significa "ragionare"**: dopo aver visto un modello risolvere un problema passo per passo, chiediti: sta davvero ragionando o sta imitando un ragionamento? Discutine con i compagni — e un dibattito filosofico aperto che non ha una risposta definitiva, ed e proprio questo che lo rende interessante.

---

## Domande Frequenti

**Il modello "pensa" davvero come un essere umano?**
No, non nel senso in cui pensiamo noi. Non ha coscienza, emozioni o comprensione profonda. Genera sequenze di parole che assomigliano a un ragionamento, seguendo pattern appresi durante l'addestramento. Pero il risultato pratico e sorprendente: su molti test di ragionamento, questi modelli battono la maggior parte degli esseri umani.

**Perche non usare sempre un reasoning model se e piu bravo?**
Perche pensare costa. Un reasoning model puo impiegare 30 secondi per una risposta che un modello standard da in 2. In termini di calcolo, costa da 10 a 50 volte di piu. Per domande semplici come "Traduci questa frase" o "Qual e la capitale della Francia?", e uno spreco enorme senza alcun vantaggio.

**Cosa sono i "token di ragionamento"?**
Sono le parole e le frasi che il modello genera internamente durante la fase di pensiero, prima della risposta finale. Rappresentano i passaggi intermedi del ragionamento. Piu token di ragionamento = piu tempo dedicato a pensare = generalmente risposte migliori.

**Posso vedere come ragiona il modello?**
Dipende. Claude mostra i suoi "pensieri estesi" all'utente. DeepSeek-R1, essendo open source, mostra tutto il processo. OpenAI con o1 e o3 invece nasconde la catena di pensiero interna e mostra solo un riassunto o direttamente la risposta.

**Cos'e la RLVR e perche e importante?**
RLVR sta per Reinforcement Learning with Verifiable Rewards. E un metodo di addestramento dove il modello viene premiato quando da risposte verificabilmente corrette (come in matematica). La cosa rivoluzionaria e che con questo metodo la capacita di ragionare passo per passo emerge da sola, senza che nessuno la programmi esplicitamente.

**I reasoning models possono sbagliare?**
Assolutamente si. Sono molto piu precisi dei modelli standard sui problemi complessi, ma non sono infallibili. A volte piccoli cambiamenti nel modo in cui formuli la domanda possono causare grandi cambiamenti nel ragionamento. E un fenomeno chiamato "fragilita del ragionamento".

**Cosa sono i benchmark come MATH, GPQA e ARC-AGI?**
Sono test standardizzati per misurare le capacita dei modelli. MATH contiene problemi di matematica da competizione, GPQA sono domande scientifiche di livello dottorato, ARC-AGI testa il ragionamento astratto su pattern visivi. Attenzione: i benchmark misurano le prestazioni su compiti specifici, non l'"intelligenza" in senso generale.

**I reasoning models sono un passo verso l'intelligenza artificiale generale (AGI)?**
E una domanda aperta. Alcuni ricercatori pensano di si, perche il ragionamento era la capacita cognitiva chiave che mancava. Altri sono scettici: risolvere problemi di matematica non equivale a comprendere il mondo. Una cosa certa e che modelli come o3 ottengono punteggi altissimi su test progettati per misurare l'intelligenza generale, come ARC-AGI.

---

## Mettiti alla Prova

**1. Qual e la differenza principale tra un modello standard e un reasoning model?**

a) Il reasoning model e piu veloce nel rispondere
b) Il reasoning model genera passaggi di ragionamento intermedi prima della risposta finalec) Il reasoning model usa meno potenza di calcolo
d) Il reasoning model funziona solo con la matematica

**2. Per quale di questi compiti un reasoning model offre il maggior vantaggio?**

a) Tradurre un testo dall'inglese all'italiano
b) Scrivere una poesia creativa
c) Risolvere un problema di logica con piu passaggid) Riassumere un articolo di giornale

**3. Cosa ha dimostrato DeepSeek-R1 di particolarmente sorprendente?**

a) Che i modelli open source non possono ragionare
b) Che la catena di pensiero puo emergere spontaneamente dall'addestramento con ricompense verificabilic) Che il ragionamento funziona solo con modelli molto grandi
d) Che Google ha i migliori modelli di ragionamento

**4. Perche non conviene usare sempre un reasoning model?**

a) Perche da risposte meno accurate
b) Perche non funziona con le lingue diverse dall'inglese
c) Perche e piu lento e costoso, e per compiti semplici non aggiunge valored) Perche e disponibile solo a pagamento

**5. Cosa si intende per "test-time compute"?**

a) Il tempo impiegato per addestrare il modello
b) La potenza di calcolo usata durante la fase di risposta, quando il modello "pensa"c) La velocita di connessione a Internet del server
d) Il numero di utenti che possono usare il modello contemporaneamente
