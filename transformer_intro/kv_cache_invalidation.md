# Invalidazione della KV Cache: Come la Struttura del Prompt Influenza i Costi

## Perché l'ordine delle parole conta per il portafoglio

Ogni volta che invii un messaggio a un LLM, il modello deve elaborare l'intero input — il system prompt, la cronologia della conversazione, il contesto, la tua domanda — prima di generare una risposta. Questa elaborazione è costosa: richiede tempo e memoria GPU. Ma c'è un trucco fondamentale per risparmiare: la **KV Cache**, che permette di riutilizzare calcoli già fatti nelle richieste precedenti.

Il problema è che la KV Cache è estremamente fragile. Se cambi anche un solo token nell'input, tutto ciò che viene dopo quel token deve essere ricalcolato da zero. Capire questa meccanica è essenziale per chiunque progetti pipeline LLM, agenti, o architetture RAG.

### Due fasi: Prefill e Decode

L'inferenza di un LLM si divide in due fasi distinte:

**Prefill**: l'intero input viene elaborato in parallelo. Il modello calcola, per ogni token, i vettori Key (K) e Value (V) in ogni layer, e li salva nella KV Cache. Questa fase ha complessità O(n²) — è costosa, ma viene fatta una sola volta.

**Decode**: il modello genera un token alla volta. Per ogni nuovo token, usa i vettori K e V già calcolati nella cache, senza doverli ricalcolare. Ogni step di generazione ha complessità O(n), ma viene ripetuto per ogni token generato.

La KV Cache è ciò che rende il decode efficiente: senza di essa, il modello dovrebbe rielaborare l'intero contesto ad ogni singolo token generato.

### Come funziona l'invalidazione

La KV Cache funziona solo se la sequenza di input è **identica** al prefisso già in cache. Se un token cambia — anche uno solo, anche nel mezzo della sequenza — tutti i vettori K e V successivi diventano matematicamente non più validi e devono essere ricalcolati.

L'analogia più efficace è quella del libro copiato a mano. Se qualcuno cambia una parola a pagina 5, devi rileggere e riscrivere tutto da pagina 5 in poi — anche se il testo delle pagine successive è identico. Il senso delle frasi precedenti influenza come si comprendono e si elaborano quelle successive.

L'invalidazione si propaga **sempre verso destra, mai verso sinistra**. Ogni token dipende causalmente da tutti quelli che lo precedono, tramite la causal mask dell'attention. Cambia un token in posizione i → invalidi tutto da i in poi, non importa quanto identico sia il testo successivo.

### Scenari pratici: dove si spreca e dove si risparmia

**Scenario 1 — Prefix Cache Hit (hit rate ~80%)**
La conversazione continua normalmente: system prompt fisso, cronologia, nuova domanda. Il prefisso fino alla nuova domanda è già in cache → il modello ricalcola solo la nuova domanda. Questo è il caso "felice", il massimo risparmio.

**Scenario 2 — Modifica nel system prompt (hit rate ~28%)**
Si cambia un token nel system prompt. Tutto ciò che segue va ricalcolato, anche se identico al turno precedente. Questo scenario è più comune di quanto si pensi: qualsiasi system prompt che contiene variabili dinamiche (timestamp, ID utente, data corrente) invalida l'intera cache ad ogni richiesta.

> Se metti `Oggi è {date}` nel system prompt, ogni giorno il KV Cache parte da zero. Su un'API con 100.000 richieste al giorno, il costo aggiuntivo può essere significativo.

**Scenario 3 — System prompt stabile (hit rate ~50%)**
Il system prompt non cambia mai → rimane in cache come prefisso. Solo la nuova domanda viene ricalcolata. Questa è la base del **Prompt Caching** di Anthropic e del prefix caching di vLLM.

**Scenario 4 — RAG con documento prima della domanda (hit rate ~66%)**
Se usi lo stesso documento di contesto per più domande diverse, mettere il documento *prima* della domanda permette di cacharlo. La domanda cambia, il documento no → risparmio massiccio nelle pipeline RAG.

### La regola d'oro: ordine di stabilità

L'ordine ottimale di un prompt è:

```
[System Prompt fisso] → [Documento/Contesto] → [Chat History] → [Nuovo Turno]
←──── più stabile ─────────────────────────────── più variabile ────→
```

Metti le parti più stabili a sinistra e quelle più variabili a destra. Tutto ciò che sta a sinistra del primo token che cambia è potenzialmente cachabile.

**Pattern da seguire**:
- System prompt fisso in cima — base di tutto, non inserire mai dati dinamici
- RAG: documento prima della domanda — se il documento è lo stesso per più query, si cacha gratis
- Few-shot examples stabili — esempi identici ad ogni chiamata si cachano come parte del prefix

**Pattern da evitare**:
- System prompt con timestamp o data — invalida tutto ad ogni richiesta
- Documento dopo la domanda in RAG — il prefisso cambia ad ogni query, il documento non si cacha mai

### Prompt Caching nelle API

Anthropic ha reso esplicito il prompt caching nella sua API. Si aggiunge `cache_control: ephemeral` sui blocchi che si vogliono cachare. I token cachati costano circa il 10% del costo normale in input. Su pipeline con system prompt da 10-50K token, il risparmio può essere del 60-80% sui costi totali di input.

Anche altri sistemi implementano il prefix caching in modo automatico: vLLM, per esempio, cacha automaticamente i prefissi identici tra richieste diverse senza bisogno di annotazioni esplicite.

---

## 5 Cose da Ricordare

- **La KV Cache è fragile**: basta cambiare un solo token per invalidare tutti i calcoli successivi. L'invalidazione si propaga sempre verso destra, mai verso sinistra.
- **L'ordine del prompt conta economicamente**: mettere le parti stabili all'inizio e quelle variabili alla fine massimizza il riutilizzo della cache e riduce i costi.
- **Non mettere dati dinamici nel system prompt**: timestamp, date, ID utente nel system prompt invalidano l'intera cache ad ogni richiesta.
- **In RAG, il documento va prima della domanda**: se il documento non cambia tra una query e l'altra, mettendolo prima della domanda si cacha automaticamente.
- **Il Prompt Caching può ridurre i costi del 60-80%**: le API moderne permettono di cachare esplicitamente i blocchi stabili, con costi fino al 90% inferiori per i token cachati.

---

## 3 Cose da Fare

1. **Analizza i tuoi prompt**: prendi un prompt che usi regolarmente con un LLM e identifica quali parti cambiano tra una richiesta e l'altra. Riordinalo mettendo le parti stabili all'inizio. Se hai variabili dinamiche nel system prompt, spostale alla fine.

2. **Calcola il risparmio potenziale**: se usi API LLM (OpenAI, Anthropic), calcola quanto spendi in token di input al mese. Poi stima quanto potresti risparmiare con il prompt caching, considerando che i token cachati costano circa il 10% del prezzo normale.

3. **Sperimenta con il Prompt Caching di Anthropic**: se hai accesso all'API, prova ad aggiungere `cache_control: ephemeral` al tuo system prompt e confronta i costi prima e dopo su un batch di richieste identiche.

---

## Domande Frequenti

**Il KV Cache è condiviso tra richieste diverse di utenti diversi?**
Dipende dall'implementazione. Nel Prompt Caching di Anthropic e in server come vLLM con prefix caching, il cache del system prompt può essere condiviso tra utenti che usano lo stesso prompt. I messaggi utente restano sempre privati.

**Quanto dura il KV Cache in memoria?**
Nell'API di Anthropic, i blocchi con `cache_control: ephemeral` durano circa 5 minuti dall'ultimo utilizzo. Altri sistemi hanno policy diverse. In Ollama o LM Studio, la cache dura per tutta la sessione attiva.

**In sviluppo locale (Ollama, LM Studio) funziona lo stesso?**
Sì, tutti i server di inferenza basati su llama.cpp o vLLM implementano il prefix caching. L'ottimizzazione sull'ordine del prompt è valida sempre, indipendentemente dall'infrastruttura.

**Perché non si può cachare il testo dopo il punto di modifica, anche se è identico?**
Perché nel Transformer ogni token dipende causalmente da tutti quelli che lo precedono. Anche se il testo successivo è identico lettera per lettera, il suo significato contestuale — e quindi i vettori K e V — cambia se qualcosa prima di esso è stato modificato.

---

## Mettiti alla Prova

**1. Cosa succede quando un singolo token nel mezzo di un prompt viene modificato?**

a) Solo quel token viene ricalcolato
b) Tutti i token del prompt vengono ricalcolati
c) Tutti i token da quel punto in poi vengono ricalcolati, quelli prima restano in cache
d) La cache viene completamente svuotata e il modello riparte da zero

**2. Qual è l'ordine ottimale dei componenti in un prompt per massimizzare il cache hit?**

a) Domanda → System prompt → Documento → Cronologia
b) Cronologia → Domanda → System prompt → Documento
c) System prompt fisso → Documento/Contesto → Cronologia → Nuovo turno
d) L'ordine non influenza la cache

**3. Perché mettere `Oggi è {data}` nel system prompt è problematico per la cache?**

a) Perché le date occupano troppa memoria
b) Perché il system prompt cambia ogni giorno, invalidando tutta la cache ad ogni richiesta
c) Perché i LLM non capiscono le date
d) Perché le date non possono essere tokenizzate

**4. In una pipeline RAG, perché è meglio mettere il documento prima della domanda?**

a) Perché i LLM leggono da sinistra a destra e capiscono meglio il contesto
b) Perché il documento è più lungo e deve essere elaborato per primo
c) Perché se il documento non cambia tra query diverse, mettendolo prima della domanda si cacha come parte del prefisso stabile
d) Perché le API richiedono questo ordine specifico

**5. Il Prompt Caching di Anthropic riduce i costi dei token cachati di circa:**

a) 10% rispetto al prezzo normale
b) 50% rispetto al prezzo normale
c) 90% rispetto al prezzo normale (i token cachati costano ~10% del prezzo normale)
d) 100% — i token cachati sono gratuiti
