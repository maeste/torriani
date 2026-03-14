# Invalidazione della KV Cache
> File di supporto alla presentazione: `kv_cache_invalidation.jsx`

---

## Panoramica della slide

Questa visualizzazione affronta un tema spesso trascurato ma cruciale in produzione: **come la struttura del prompt influenza direttamente i costi di inferenza**. È particolarmente rilevante per chi progetta pipeline LLM, system prompt, agenti e architetture RAG.

---

## Struttura della presentazione

### Tab 1 — Cos'è l'invalidazione

**Come aprire il tema:**

Prima di entrare nell'invalidazione, fai un recap rapido del KV Cache in due frasi:

> "Durante il prefill — l'elaborazione dell'input — il modello calcola, per ogni token, i vettori K e V in ogni layer. Questi vengono salvati. Durante la generazione, ogni nuovo token usa questi vettori già calcolati, senza doverli ricalcolare da zero."

Poi introduci il problema:

> "Il KV Cache funziona solo se la sequenza è identica al prefisso cachato. Se un token cambia — anche uno solo, anche nel mezzo — tutti i K e V successivi diventano matematicamente non più validi. Vanno buttati e ricalcolati."

**L'analogia del libro:**

> "È come copiare un libro a mano. Se qualcuno cambia una parola a pagina 5, dovete rileggere e riscrivere tutto da pagina 5 in poi — anche se il testo da pagina 6 in poi è identico. Il senso delle frasi precedenti influenza il modo in cui si comprende e trascrive ciò che segue."

**Le due fasi:**

La distinzione **Prefill / Decode** è fondamentale:

- **Prefill**: l'intero input viene processato in parallelo. Costoso ma fatto una volta. Costo O(n²).
- **Decode**: si genera un token alla volta. Usa il KV Cache. Costo O(n) per token — ma è il costo dominante in conversazioni lunghe perché viene ripetuto per ogni token generato.

---

### Tab 2 — Propagazione visiva

Questo è il momento più didattico. Chiedi al pubblico di osservare mentre clicchi su token diversi:

**Demo consigliata:**
1. Clicca sul primo token → tutto invalido, hit rate 0%.
2. Clicca sull'ultimo token → quasi tutto cachato, hit rate ~90%.
3. Clicca su un token nel mezzo → mostra come la cascata taglia a metà.

**Messaggio chiave:**

> "L'invalidazione si propaga sempre verso destra. Mai verso sinistra. Ogni token dipende causalmente da tutti quelli che lo precedono, tramite la causal mask dell'attention. Cambia un token in posizione i → invalidi tutto da i in poi, non importa quanto identico sia il testo successivo."

---

### Tab 3 — Scenari pratici

Questo tab porta il discorso dal teorico al pratico con quattro scenari reali.

**Scenario 1 — Prefix Cache Hit (hit rate ~80%)**
La conversazione continua normalmente: system prompt, history e nuova domanda. Il prefix fino alla nuova domanda è già in cache → risparmio massimo. Questo è il comportamento "felice".

**Scenario 2 — Modifica in mezzo (hit rate ~28%)**
Si cambia un token nel system prompt. Risultato: tutto ciò che segue va ricalcolato, anche se identico al turno precedente. Questo scenario è più comune di quanto si pensi: qualsiasi system prompt che contiene variabili dinamiche (timestamp, ID utente, data corrente) invalida l'intera cache ad ogni richiesta.

> "Se mettete `Oggi è {date}` nel vostro system prompt, ogni giorno il KV Cache è zero. Ogni richiesta riparte da zero. Su un'API con 100K richieste al giorno, il costo può essere significativo."

**Scenario 3 — System prompt stabile (hit rate ~50%)**
Il system prompt non cambia mai → rimane in cache come prefisso. Solo la nuova domanda viene ricalcolata. Questa è la base del **Prompt Caching** di Anthropic.

**Scenario 4 — RAG con documento prima della domanda (hit rate ~66%)**
Se si usa lo stesso documento di contesto per più domande diverse, metterlo *prima* della domanda permette di cacharlo. La domanda cambia, il documento no → risparmio massiccio su pipeline RAG.

---

### Tab 4 — Best practice

**Lo schema dell'ordine ottimale:**

```
[System Prompt fisso] → [Documento/Contesto] → [Chat History] → [Nuovo Turno]
←────────── più stabile ────────────────────────── più variabile ──────────→
```

> "La regola d'oro è semplice: metti le cose più stabili a sinistra, quelle più variabili a destra. Tutto ciò che sta a sinistra del primo token che cambia è potenzialmente cachabile."

**I pattern da evidenziare:**

✅ **System prompt fisso in cima** — base di tutto. Non inserire mai dati dinamici nel system prompt.

✅ **RAG: documento prima della domanda** — se il documento è lo stesso per più query, cacharlo è gratis.

✅ **Few-shot examples stabili** — esempi identici ad ogni chiamata si cachano come parte del prefix.

❌ **System prompt con timestamp/data** — invalida tutto ad ogni richiesta.

❌ **Documento dopo la domanda in RAG** — il prefix cambia ad ogni query, il documento non si mai ca.

**Il Prompt Caching di Anthropic:**

Chiudi con il codice di esempio del Prompt Caching. È una feature concreta che le persone possono usare oggi:

> "Anthropic ha reso esplicito il prompt caching nell'API. Si aggiunge `cache_control: ephemeral` sui blocchi che si vogliono cachare. I token cachati costano circa il 10% del costo normale in input. Su pipeline con system prompt da 10-50K token, il risparmio può essere dell'ordine del 60-80% sui costi totali di input."

---

## Domande frequenti dal pubblico

**"Il KV Cache è condiviso tra richieste diverse di utenti diversi?"**
Dipende dall'implementazione. In Anthropic's Prompt Caching e in alcuni server di inferenza (vLLM con prefix caching), il cache del system prompt può essere condiviso tra utenti diversi che usano lo stesso system prompt. Il cache dei messaggi utente è invece sempre privato.

**"Quanto dura il KV Cache in cache?"**
Nella Anthropic API, i blocchi con `cache_control: ephemeral` durano circa 5 minuti dall'ultimo utilizzo. Altri sistemi hanno policy diverse.

**"In sviluppo locale (Ollama, LM Studio) funziona lo stesso?"**
Sì, tutti i server di inferenza basati su llama.cpp o vLLM implementano il prefix caching. L'ottimizzazione sull'ordine del prompt vale sempre, indipendentemente dall'infrastruttura.

---

## Note tecniche per il presentatore

- Gli hit rate negli scenari sono calcolati sul numero di token nell'esempio, non su modelli reali.
- Il risparmio sul costo API dipende da quanto spesso si riusa lo stesso prefix. Con una singola richiesta non c'è risparmio; il risparmio diventa significativo con molte richieste che condividono il prefix.
- vLLM implementa il prefix caching automaticamente (senza annotazioni esplicite) per i prefix identici tra richieste.
