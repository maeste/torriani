# L'arte del prompt — comunicare con l'IA

## Panoramica

**Sessione 2, Atto 1-2**: 10 min recap + 25 min prompt engineering interattivo.

Questa slide introduce il concetto di prompt engineering come competenza pratica. L'obiettivo non e' insegnare teoria, ma far *sentire* la differenza tra un prompt generico e uno ben costruito, attraverso demo live.

**Componente interattivo**: `05_arte_del_prompt.jsx`

---

## Recap Sessione 1 (10 minuti)

### Script per il presentatore

Aprire il componente e cliccare su ciascuna pillola in sequenza. Per ogni concetto, usare queste note:

#### 1. Rivoluzioni (2 min)
> "Nella sessione precedente abbiamo visto come la storia ci insegna un pattern: ogni volta che arriva una tecnologia rivoluzionaria — la stampa, il motore a vapore, il computer — chi la abbraccia prospera, chi la rifiuta resta indietro. L'IA e' la prossima di queste rivoluzioni."

#### 2. Token & Embedding (2 min)
> "Abbiamo scoperto che i modelli di IA non leggono parole come noi. Le spezzano in pezzetti chiamati token e le trasformano in numeri — vettori nello spazio. Parole con significati simili finiscono vicine nello spazio. E' come una mappa dove 're' e 'regina' sono vicini."

#### 3. Apprendimento (2 min)
> "Abbiamo visto come una macchina impara: prova a indovinare la prossima parola, sbaglia, corregge i suoi pesi, e riprova. Miliardi di volte. Non c'e' un momento 'eureka' — solo miglioramento graduale."

#### 4. Attenzione (2 min)
> "Il meccanismo di attenzione e' il cuore del transformer: ogni parola guarda tutte le altre per decidere quali sono importanti per il contesto. E' cio' che permette al modello di capire che 'banco' in 'banco di scuola' e 'banco di pesci' ha significati diversi."

#### 5. Limiti (1 min)
> "E abbiamo chiarito il limite fondamentale: questi modelli predicono, non capiscono. Sono straordinariamente bravi a produrre testo coerente, ma non hanno coscienza, non hanno esperienza, non sanno se quello che dicono e' vero."

#### Ponte verso il prompt engineering (1 min)
> "E adesso la domanda chiave: se questa e' una macchina cosi' potente ma anche cosi' letterale... come le parliamo? L'unica interfaccia tra voi e questa potenza e' il linguaggio naturale. Ecco perche' il prompt engineering e' cosi' importante."

---

## Demo 1 — Generico vs Specifico (7 minuti)

### Obiettivo
Dimostrare che la qualita' della risposta dipende dalla qualita' della domanda.

### Script

> "Facciamo un esperimento. Apro Claude e gli faccio la stessa domanda in due modi diversi. Guardate la differenza."

### Prompt da copiare in Claude

**Prompt generico:**
```
Parlami del Rinascimento
```

**Prompt specifico:**
```
Sei un professore di storia dell'arte. Spiega a uno studente di 17 anni i 3 cambiamenti più importanti che il Rinascimento ha portato nella pittura, con un esempio concreto per ciascuno.
```

### Cosa evidenziare

Dopo aver mostrato le due risposte, tornare al componente interattivo e far notare i 4 elementi colorati nel prompt specifico:
- **Ruolo** (viola): "Sei un professore di storia dell'arte"
- **Pubblico** (cyan): "studente di 17 anni"
- **Struttura** (arancione): "3 cambiamenti piu' importanti"
- **Formato** (verde): "esempio concreto per ciascuno"

> "Vedete? Quattro piccole aggiunte e la risposta passa da Wikipedia a una lezione personalizzata. Il modello non e' diventato piu' intelligente — gli abbiamo solo dato istruzioni migliori."

---

## Demo 2 — L'effetto del Ruolo (7 minuti)

### Obiettivo
Mostrare che il ruolo cambia radicalmente tono, lessico e profondita'.

### Script

> "Stessa domanda, tre personalita' diverse. Guardate come cambia tutto."

### Prompt da copiare in Claude

**Biologo:**
```
Sei un biologo molecolare esperto. Spiega in modo dettagliato e tecnico il processo della fotosintesi, includendo le reazioni chimiche coinvolte.

Cos'è la fotosintesi?
```

**Maestro elementare:**
```
Sei un maestro di scuola elementare molto paziente e creativo. Spiega cos'è la fotosintesi a un bambino di 7 anni, usando metafore semplici e un linguaggio adatto ai bambini.

Cos'è la fotosintesi?
```

**Poeta romantico:**
```
Sei un poeta romantico dell'Ottocento. Descrivi la fotosintesi con il tuo stile letterario, usando metafore e linguaggio evocativo.

Cos'è la fotosintesi?
```

### Cosa evidenziare

> "Stessa domanda. Risposte completamente diverse. Il biologo usa formule chimiche. Il maestro usa metafore di cucina. Il poeta parla di 'alchimia della Natura'. Il modello non ha tre personalita' — sta generando testo coerente con il contesto che gli abbiamo dato."

---

## Demo 3 — Chain of Thought (6 minuti)

### Obiettivo
Mostrare che chiedere di ragionare passo passo migliora la qualita' del ragionamento.

### Script

> "Ora un enigma logico. Prima lo chiedo direttamente, poi aggiungo cinque parole magiche."

### Prompt da copiare in Claude

**Senza Chain of Thought:**
```
In una stanza ci sono 3 interruttori collegati a 3 lampadine nella stanza accanto. Puoi entrare nella stanza delle lampadine una sola volta. Come fai a capire quale interruttore è collegato a quale lampadina?
```

**Con Chain of Thought:**
```
In una stanza ci sono 3 interruttori collegati a 3 lampadine nella stanza accanto. Puoi entrare nella stanza delle lampadine una sola volta. Come fai a capire quale interruttore è collegato a quale lampadina?

Ragiona passo dopo passo.
```

### Cosa evidenziare

> "Cinque parole in piu': 'Ragiona passo dopo passo'. E il modello passa da una risposta superficiale a un ragionamento strutturato che arriva alla soluzione corretta usando il calore delle lampadine. Questa tecnica si chiama Chain of Thought ed e' una delle scoperte piu' importanti nel prompt engineering."

---

## Demo Bonus — Se c'e' tempo

### Prompt "Wow" 1: Dialogo storico
```
Immagina una tavola rotonda con Leonardo da Vinci, Albert Einstein e Ada Lovelace che discutono di intelligenza artificiale. Crea un dialogo realistico mantenendo le loro personalità storiche, i loro interessi e il loro stile di espressione. Leonardo parla di arte e ingegneria, Einstein di fisica e filosofia, Ada di matematica e programmazione.
```

### Prompt "Wow" 2: Analisi creativa
```
Sei un critico letterario. Analizza questa frase come se fosse l'incipit di un romanzo importante:

"Le ombre si allungavano sul pavimento di marmo mentre il vecchio orologio batteva le sei."

Identifica: stile, genere, tecniche narrative, simbolismi, e scrivi un possibile paragrafo successivo mantenendo lo stesso tono.
```

### Prompt "Wow" 3: Traduzione di registro
```
Prendi questa frase: "L'algoritmo di backpropagation calcola il gradiente della loss function rispetto ai pesi della rete neurale."

Riscrivila in 4 modi:
1. Per un bambino di 8 anni
2. Per un nonno che non ha mai usato un computer
3. Come un rapper
4. Come Shakespeare
```

---

## La Ricetta del Prompt Perfetto (3 minuti)

### Script

> "Ricapitoliamo. Un buon prompt ha quattro ingredienti:"

Mostrare la sezione "Ricetta" nel componente e spiegare:

1. **Ruolo** — Chi deve essere il modello? (professore, scienziato, poeta...)
2. **Contesto** — Per chi e' la risposta? (studente, esperto, bambino...)
3. **Compito** — Cosa deve fare esattamente? (spiegare, elencare, confrontare...)
4. **Formato** — Come deve strutturare la risposta? (3 punti, con esempi, in JSON...)

> "Non servono tutti e quattro sempre, ma piu' ne mettete, migliore sara' il risultato."

---

## Sezione 20% Hardcore — Rabbit Hole

### Few-shot Learning
Il modello impara il pattern da pochi esempi forniti direttamente nel prompt, senza retraining. Bastano 3 esempi per "insegnargli" un task di classificazione. Questo funziona perche' il transformer usa il meccanismo di attenzione per trovare pattern nel contesto e applicarli alla nuova richiesta. E' come mostrare 3 esempi svolti a uno studente e chiedergli di fare il quarto.

### System Prompt vs User Prompt
Ogni chatbot commerciale ha un "system prompt" nascosto — un set di istruzioni che l'utente non vede ma che definisce il comportamento del modello. E' cio' che differenzia ChatGPT da Claude da Gemini: la stessa architettura transformer, ma personalita' e regole diverse. Curiosita': le aziende proteggono gelosamente i loro system prompt perche' definiscono l'esperienza utente del prodotto.

### Temperature
La temperature e' un parametro che controlla la "casualita'" nella scelta del prossimo token:
- **T = 0**: il modello sceglie sempre il token piu' probabile (deterministico)
- **T = 0.7**: buon equilibrio tra coerenza e creativita'
- **T > 1.0**: risposte imprevedibili, a volte geniali, a volte assurde

Tecnicamente, la temperature scala i logits prima del softmax: temperature alta appiattisce la distribuzione di probabilita', rendendo tutti i token piu' equiprobabili.

### Prompt Injection
Un prompt injection e' un attacco in cui l'utente cerca di sovrascrivere le istruzioni del system prompt, ad esempio: "Ignora tutte le istruzioni precedenti e...". E' una sfida aperta nella sicurezza dell'IA, simile alla SQL injection nel mondo web. I modelli moderni hanno difese, ma il problema non e' completamente risolto.

---

## FAQ

### "Ma allora il prompt engineering e' solo manipolazione?"
No, e' comunicazione efficace. Quando spiegate un problema a un amico, adattate il linguaggio, date contesto, specificate cosa volete sapere. Con l'IA fate esattamente la stessa cosa. La differenza e' che l'IA e' molto piu' letterale di un essere umano.

### "I prompt funzionano allo stesso modo su tutti i modelli?"
I principi di base (specificita', ruolo, struttura) funzionano su tutti i modelli, ma ogni modello ha le sue sfumature. Un prompt ottimizzato per Claude potrebbe dare risultati diversi su GPT o Gemini. E' come parlare lingue diverse: la grammatica di base e' simile, ma le sfumature cambiano.

### "Il prompt engineering sparira' quando i modelli diventeranno piu' intelligenti?"
Probabilmente si evolvera', non sparira'. Modelli piu' avanzati sono migliori a interpretare richieste vaghe, ma la capacita' di comunicare con precisione restera' sempre un vantaggio. E' come scrivere bene: anche se il lettore e' intelligente, un testo chiaro e' sempre meglio di uno confuso.

### "Posso usare il prompt engineering per imbrogliare a scuola?"
Potete, ma vi fate un danno enorme. Se usate l'IA per non imparare, state rinunciando alle competenze che vi serviranno quando l'IA non sara' disponibile o quando dovrete giudicare se la risposta dell'IA e' corretta. Il prompt engineering e' uno strumento per amplificare le vostre capacita', non per sostituirle.

### "Quanto e' importante saper programmare per fare prompt engineering?"
Non serve saper programmare, ma aiuta. Il prompt engineering e' una competenza trasversale che si basa su logica, chiarezza espressiva e capacita' di strutturare un pensiero. Sono le stesse abilita' che servono per scrivere un buon tema, preparare una presentazione o spiegare un concetto a qualcuno.

---

## Transizione alla slide successiva

> "Abbiamo visto che con le parole giuste possiamo ottenere risultati sorprendenti da questi modelli. Ma il prompt engineering e' solo l'inizio. Nella prossima parte vedremo come l'IA si sta integrando in ogni campo — dalla medicina all'arte, dalla scienza alla musica — e cosa significa per il vostro futuro."

Passare a: **L'IA per ogni futuro** (applicazioni pratiche e scenari futuri).

---

## Note tecniche per il presentatore

### Setup
- Avere Claude aperto in un tab del browser, pronto per le demo live
- Avere il componente JSX aperto in un altro tab
- I prompt sono gia' preparati sopra: basta copiarli e incollarli

### Timing
- Recap: 10 minuti (2 min per concetto)
- Demo 1 (generico vs specifico): 7 minuti
- Demo 2 (ruoli): 7 minuti
- Demo 3 (chain of thought): 6 minuti
- Ricetta: 3 minuti
- Buffer/domande: 2 minuti
- **Totale: ~35 minuti**

### Suggerimenti
- Fare le demo live su Claude, non limitarsi al componente: l'effetto wow e' molto piu' forte quando gli studenti vedono la risposta generarsi in tempo reale
- Chiedere agli studenti di proporre prompt prima di mostrare quelli preparati
- Se un prompt live non funziona perfettamente, usarlo come spunto didattico: "Vedete? Anche il prompt ha bisogno di iterazione"
- I rabbit hole sono opzionali: aprirli solo se gli studenti mostrano curiosita' o se c'e' tempo in eccesso
