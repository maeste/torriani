# Gli Agenti IA — Da Chatbot a Collaboratori Autonomi
> File di supporto alla presentazione: `08_agenti_ia.jsx`

---

## Panoramica della slide

Questa slide introduce il concetto di agente IA come evoluzione del chatbot, mostrando applicazioni concrete nel coding e nella vita quotidiana. L'obiettivo è far capire agli studenti che l'IA non è solo "fare domande a ChatGPT" — sta diventando un collaboratore attivo che pianifica, esegue e verifica.

**Tempo previsto**: 10-12 minuti

---

## Struttura della presentazione

### 1. Apertura — "Non solo chatbot"

> "Quanti di voi hanno usato ChatGPT o Claude? Bene. Quello che avete usato è un chatbot: voi chiedete, lui risponde. Ma c'è qualcosa di molto più potente che sta emergendo: gli **agenti IA**. Un agente non si limita a rispondere — pianifica, usa strumenti, esegue compiti complessi in autonomia."

Mostra la differenza visuale nella slide:
- **Chatbot**: domanda → risposta (una freccia)
- **Agente**: obiettivo → pianifica → usa strumenti → esegue → verifica → risultato (un ciclo)

---

### 2. Agenti per scrivere codice

> "Immaginate di programmare. Prima scrivevate ogni riga a mano. Ora ci sono agenti che leggono il vostro codice, capiscono cosa volete fare, scrivono il codice, lo testano e lo correggono da soli."

Per ogni strumento, evidenzia il punto chiave:

#### Claude Code (Anthropic)
> "Un agente da terminale. Gli dici 'aggiungi il login con Google' e lui legge il progetto, crea i file, esegue i test, corregge gli errori. Come un programmatore junior instancabile che lavora 24/7."

#### GitHub Copilot
> "Integrato nell'editor. Mentre scrivi, suggerisce il completamento. Come avere qualcuno che legge sopra la tua spalla e ti dice 'forse intendi questo?'"

#### Cursor / Windsurf
> "Editor completi con IA integrata. L'agente capisce l'intero progetto, non solo il file che stai guardando. Può fare refactoring di migliaia di righe in minuti."

**Punto chiave**: "Il programmatore non scompare — diventa un **direttore d'orchestra**. Deve sapere cosa costruire, come verificarlo, e guidare l'agente nella direzione giusta."

---

### 3. Assistenti personali IA

> "Non è solo per i programmatori. Gli assistenti IA stanno diventando il **coltellino svizzero digitale** per tutti."

- **Claude**: ragionamento complesso, analisi di documenti lunghi, scrittura strutturata
- **ChatGPT**: il più diffuso, gestisce testo, immagini, voce
- **Gemini**: integrato con Google, ottimo per ricerca e Workspace

> "Pensate a quante cose potete fare: tradurre un paper scientifico, analizzare un bilancio, preparare una presentazione, fare brainstorming per un progetto. Tutto con lo stesso strumento."

---

### 3b. Dall'assistente all'agente autonomo — Sistemi agentici

> "Il passo successivo: agenti che non aspettano le vostre domande, ma lavorano in autonomia su compiti complessi."

#### Claude for Work (Anthropic)
> "Claude integrato nei processi aziendali. Non è solo un chatbot: accede ai documenti dell'azienda, conosce le procedure, risponde in base al contesto reale del team. Esempio: 'Prepara il report trimestrale usando i dati del CRM e le slide del Q2' — l'agente accede ai sistemi, raccoglie i dati, genera il report."

#### OpenClaw (Open Source)
> "Framework open-source per costruire agenti IA personalizzati. Come Linux per i sistemi operativi: trasparente, modificabile, controllato da te. Nessun vendor lock-in, i tuoi dati restano tuoi."

**Spettro dell'autonomia IA**: Chatbot → Assistente → Copilota → Agente → Autonomo. Ci stiamo muovendo rapidamente verso destra.

---

### 4. Come sta cambiando il software

> "Il 2024-2025 è stato un punto di svolta. Il modo di scrivere software sta cambiando radicalmente."

Dati chiave:
- Developer con agenti IA producono 2-3x più codice
- Ma la quantità non è tutto: servono pensiero critico, architettura, revisione del codice
- Il tempo si sta spostando: meno "scrivere" → più "pensare, verificare, progettare"

> "È come passare dalla calligrafia alla tastiera. Non scrivete più lentamente a mano — ma dovete comunque sapere *cosa* scrivere."

---

### 5. Chiusura della slide

> "Gli agenti IA sono il prossimo passo. Non sostituiscono le persone — le potenziano. Un programmatore con un agente IA è come un pilota con il navigatore: va più veloce, sbaglia meno, arriva più lontano."

---

## Domande frequenti dal pubblico

**"Ma allora non serve più imparare a programmare?"**
Al contrario! Serve *di più*. Per guidare un agente IA devi capire cosa stai facendo. Un agente può scrivere codice, ma sei tu a decidere l'architettura, a valutare la qualità, a definire i requisiti. È come dire "non serve imparare a guidare perché esiste il navigatore" — il navigatore ti dice dove andare, ma devi saper guidare.

**"Questi strumenti sono gratuiti?"**
Molti hanno versioni gratuite limitate. GitHub Copilot è gratuito per studenti. ChatGPT e Claude hanno piani free. Il costo dei piani pro è paragonabile a un abbonamento Netflix — 20€/mese.

**"Posso usarli per i compiti?"**
Puoi usarli per *imparare*, non per *copiare*. La differenza è fondamentale: usare l'IA per capire un concetto è come usare un tutor. Farle fare il compito al posto tuo è come copiare — non impari nulla e il professore se ne accorge.

**"Qual è la differenza tra Claude e ChatGPT?"**
Sono come iPhone e Android: fanno cose simili ma con approcci diversi. Claude tende ad essere più riflessivo e preciso su testi lunghi. ChatGPT è più versatile con immagini e voce. La cosa migliore è provarli entrambi.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

#### Tool Use / Function Calling
- Gli agenti possono chiamare funzioni esterne: cercare su internet, leggere file, eseguire codice
- Il modello genera una "chiamata di funzione" in formato strutturato, il sistema la esegue, il risultato torna al modello
- Esempio: "Che tempo fa a Roma?" → il modello chiama `get_weather("Roma")` → riceve i dati → formula la risposta

#### ReAct Pattern
- **Re**asoning + **Act**ing: il modello alterna tra pensare e agire
- Ciclo: Pensiero → Azione → Osservazione → Pensiero → ...
- Permette di risolvere problemi multi-step con feedback dal mondo reale

#### MCP (Model Context Protocol)
- Standard aperto creato da Anthropic per connettere agenti IA a strumenti esterni
- Come una "presa USB universale" per l'IA: qualsiasi strumento può essere collegato
- Database, API, file system, browser — tutto diventa accessibile all'agente

#### Agentic Loops
- Pianifica → Esegui → Osserva → Rifletti → Ripianifica
- Il modello può auto-correggersi guardando i risultati delle proprie azioni
- Limiti: può entrare in loop infiniti, può "allucinare" azioni, costo computazionale elevato

---

## Transizione alla slide successiva

> "Abbiamo visto cosa possono fare gli agenti IA. Ma come cambierà il *vostro* lavoro? Nella prossima slide vediamo come ogni rivoluzione ha trasformato i mestieri — e perché questa volta è diverso."

Questo collega naturalmente alla Slide 09: "Il Lavoro che Cambia".
