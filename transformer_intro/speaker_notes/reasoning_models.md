# Quando l'IA Ragiona — Reasoning Models
> File di supporto alla presentazione: `reasoning_models.jsx`

---

## Panoramica della slide

Terza slide della Sessione 2. Dopo immagini e video, mostriamo l'evoluzione piu recente degli LLM: modelli che "pensano" prima di rispondere. L'obiettivo e spiegare Chain of Thought, i reasoning models, e quando usarli nella pratica.

**Tempo previsto**: 15-20 minuti

**Posizione nella presentazione**: Dopo "I Video", prima di "Sotto il Cofano".

---

## Struttura della presentazione

### 1. Apertura — Pensa prima di rispondere

> "Finora abbiamo visto modelli che rispondono istantaneamente — come dire la prima cosa che ti viene in mente. Ma cosa succede se chiedi al modello di *pensare* prima di rispondere? Succede qualcosa di sorprendente."

Mostra il confronto standard vs reasoning:

> "Un modello standard genera la risposta token per token, senza fermarsi a riflettere. Un reasoning model si prende tempo: esplora possibilita, verifica i propri ragionamenti, e solo alla fine risponde."

---

### 2. Chain of Thought — Demo interattiva

> "Proviamo con un problema matematico."

Mostra il problema e usa il toggle:

> "Senza Chain of Thought, il modello spara una risposta. A volte giusta, a volte sbagliata. Con Chain of Thought, ragiona passo per passo — e la probabilita di risposta corretta sale drammaticamente."

Fai cliccare gli studenti su "prossimo passo" per rivelare il ragionamento:

> "Vedete? Ogni passo e verificabile. Se sbaglia al passo 2, possiamo vederlo e correggerlo."

---

### 3. I modelli

Mostra le cards comparative:

- **o1/o3 (OpenAI)**: "Il primo grande reasoning model. Ha rivoluzionato i benchmark matematici."
- **Claude Extended Thinking**: "Mostra il processo di ragionamento all'utente."
- **DeepSeek-R1**: "Open source, addestrato con RLVR. Dimostra che il reasoning e accessibile."
- **Gemini Thinking**: "La risposta di Google, integrata in Gemini."

---

### 4. Quando usarlo — Guida pratica

> "Non serve sempre un reasoning model. Per 'Qual e la capitale della Francia?', e sprecato. Per 'Dimostra che la radice di 2 e irrazionale', e fondamentale."

Usa la guida decisionale interattiva.

> "Consiglio pratico: se un modello standard sbaglia, provate a dirgli 'pensa passo per passo'. Spesso basta questo per migliorare la risposta."

---

## Domande frequenti dal pubblico

**"Il modello 'pensa' davvero?"**
Non nel senso umano. Genera token che assomigliano a ragionamento, seguendo pattern appresi dal training. Ma il risultato pratico e sorprendente: su problemi di matematica olimpica, o3 supera il 99% degli umani. Che lo si chiami "pensiero" o no, funziona.

**"Perche non usare sempre il reasoning model?"**
Perche e piu lento e piu costoso. Un reasoning model puo impiegare 30 secondi per rispondere a una domanda semplice. Costa 10-50x di piu in compute. Per domande semplici e sprecato.

**"Come funziona il 'tempo di pensiero'?"**
Il modello genera una sequenza di "token di ragionamento" prima della risposta finale. Questi token rappresentano l'esplorazione dello spazio delle soluzioni. Piu token di ragionamento = piu compute = (generalmente) migliori risposte.

**"Posso vedere il ragionamento?"**
Dipende dal modello. Claude mostra l'extended thinking. OpenAI nasconde i "reasoning tokens" di o1/o3 (l'utente vede solo un riassunto). DeepSeek-R1 mostra tutto il processo.

---

## Note tecniche per il presentatore

### Test-time compute

- Idea: invece di usare piu compute durante il training, usarlo durante l'inferenza
- Collegamento con le scaling laws: se la performance scala con il compute di training, scala anche con il compute di inferenza?
- I risultati suggeriscono di si: piu token di ragionamento → risposte migliori
- Trade-off: costo e latenza vs qualita della risposta

### Benchmark rilevanti

- **MATH**: problemi matematici di competizione. o3 raggiunge ~96%, umani esperti ~90%
- **GPQA**: domande di PhD-level in scienze. o3 ~88%, umani PhD ~65%
- **ARC-AGI**: test di ragionamento astratto. o3 ~88%, umani ~85%
- **IMPORTANTE**: i benchmark non misurano "intelligenza" ma performance su task specifici

### Collegamento con RLVR

- I reasoning models sono spesso addestrati con RLVR (dalla slide precedente sul RL)
- Il verificatore controlla la correttezza del ragionamento, non solo della risposta
- DeepSeek-R1 e il caso studio: open source, addestrato con RLVR, prestazioni competitive con o1

### Limiti del reasoning

- Ragionamento "fragile": piccoli cambiamenti nel prompt possono causare grandi cambiamenti nel ragionamento
- Faithfulness: il ragionamento mostrato potrebbe non riflettere il processo interno reale
- Reasoning non e comprensione: il modello puo seguire catene logiche senza "capire" cosa significano

---

## Transizione alla slide successiva

> "Abbiamo visto modelli che creano immagini, video, e che ragionano. Ma cosa c'e sotto il cofano? Quanto sono grandi? Quanto costano? Si possono usare sul proprio computer? Nella prossima slide apriamo il cofano e guardiamo dentro."

Collega a "Sotto il Cofano — Modelli e Architetture".

---

## Riferimenti

- Wei et al., "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models" (2022)
- OpenAI, "Learning to Reason with LLMs" (o1 system card, 2024)
- DeepSeek, "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL" (2025)
