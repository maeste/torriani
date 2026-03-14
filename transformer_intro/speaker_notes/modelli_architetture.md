# Sotto il Cofano — Modelli e Architetture
> File di supporto alla presentazione: `modelli_architetture.jsx`

---

## Panoramica della slide

Quarta slide della Sessione 2. Dopo aver visto cosa fanno i modelli, guardiamo dentro: dimensioni, hardware, costi, e la possibilita di usare modelli in locale. L'obiettivo e dare una comprensione concreta di cosa significa "un modello da 70 miliardi di parametri" e perche esistono modelli di dimensioni diverse.

**Tempo previsto**: 15-20 minuti

**Posizione nella presentazione**: Dopo "Reasoning Models", chiude la Sessione 2. Prima di "L'Arte del Prompt" (Sessione 3).

---

## Struttura della presentazione

### 1. Apertura — Quanto e grande un LLM?

> "Quando qualcuno dice 'un modello da 70 miliardi di parametri', cosa significa? Pensatelo cosi: ogni parametro e un numerino — un peso della rete neurale. 70 miliardi di numerini, ciascuno che contribuisce un pochino alla risposta."

Mostra lo spettro dimensioni:

> "I modelli vanno da 1 miliardo (puo girare su un telefono) a 1800 miliardi (serve un datacenter intero). Tra questi estremi, c'e un mondo di possibilita."

---

### 2. Quanto costa

> "Ecco la domanda che tutti si fanno: quanto costa tutto questo?"

Mostra l'infografica costi:

> "Addestrare un modello come GPT-4 costa quanto un palazzo. Ma usarlo costa frazioni di centesimo per domanda. E la differenza tra costruire l'autostrada e pagare il pedaggio."

---

### 3. Modelli locali

> "E qui arriva la notizia bella: potete far girare modelli IA sul vostro computer. Gratis. Senza internet."

Mostra le cards degli strumenti:

> "Ollama: un comando nel terminale e avete un LLM che gira in locale. LM Studio: scaricate, cliccate, chattate. E tutto gratuito e privato — nessun dato esce dal vostro computer."

---

### 4. Il trade-off

> "Non esiste il modello perfetto. Grande e potente ma costoso e lento. Piccolo e veloce e privato ma meno capace. La scelta giusta dipende dall'uso."

Mostra la matrice decisionale interattiva.

---

## Domande frequenti dal pubblico

**"Posso far girare ChatGPT sul mio portatile?"**
Non ChatGPT stesso (che gira sui server di OpenAI), ma modelli simili come Llama-3 8B. Con 16 GB di RAM puoi far girare un modello da 7-8 miliardi di parametri. Non sara potente come GPT-4, ma funziona sorprendentemente bene per molti compiti.

**"Cosa sono le GPU e perche servono per l'IA?"**
Le GPU (Graphics Processing Units) erano nate per i videogiochi — calcolano milioni di operazioni in parallelo per disegnare pixel sullo schermo. Le reti neurali hanno bisogno dello stesso tipo di calcolo parallelo. Per questo NVIDIA, che fa GPU, e diventata una delle aziende di maggior valore al mondo.

**"Perche non si puo semplicemente rendere il modello piu piccolo mantenendo la stessa qualita?"**
Si puo, in parte. La quantizzazione riduce la precisione dei parametri (da 32 bit a 4 bit) perdendo poco in qualita. La distillazione fa "insegnare" a un modello piccolo da uno grande. Ma c'e un limite: sotto una certa dimensione, il modello non riesce a catturare pattern complessi.

**"Cosa vuol dire MoE?"**
Mixture of Experts: il modello ha tanti "esperti" specializzati, ma ne attiva solo alcuni per ogni token. Mixtral ha 47 miliardi di parametri totali, ma ne usa solo 13 miliardi per ogni risposta. E come avere 8 specialisti e consultarne solo 2 per ogni domanda — piu efficiente.

---

## Note tecniche per il presentatore

### Dimensioni e memoria

- Regola pratica: un parametro a 16-bit = 2 byte. Modello da 7B = ~14 GB di VRAM
- A 4-bit (quantizzato): 7B = ~4 GB — gira su laptop con GPU discreta
- Llama-3 70B a 4-bit: ~35 GB — serve una GPU da gaming di fascia alta o due GPU
- GPT-4 (stimato ~1.8T MoE): non pubblicabile localmente, richiede cluster

### Mixture of Experts (MoE) — dettagli

- Mixtral 8x7B: 8 esperti da 7B, ne attiva 2 per token. Parametri totali: ~47B, attivi: ~13B
- Routing: un piccolo network decide quali esperti attivare per ogni token
- Vantaggi: performance di un modello grande con il costo computazionale di uno piccolo
- Svantaggi: tutta la memoria serve comunque (47B da tenere in RAM), solo il compute si riduce

### Quantizzazione

- FP32 (32-bit): precisione massima, 4 byte per parametro
- FP16/BF16 (16-bit): standard per il training, 2 byte per parametro
- INT8 (8-bit): buona qualita, 1 byte per parametro
- INT4 (4-bit): qualita accettabile per molti task, 0.5 byte per parametro
- GPTQ, AWQ, GGUF: formati di quantizzazione comuni

### Architetture alternative

- **Mamba** (Gu & Dao, 2023): State Space Model, complessita lineare O(n) invece di O(n^2)
- **RWKV**: combina RNN e transformer, complessita lineare per l'inferenza
- **Hybrid**: Jamba (AI21) combina transformer e Mamba layers
- Nessuna ha ancora sostituito il transformer, ma la ricerca e attiva

---

## Transizione alla slide successiva

> "Ora sapete cosa c'e sotto il cofano. Ma sapere come funziona il motore non basta — bisogna anche saper guidare. Nella prossima sessione vediamo come usare l'IA in pratica, partendo dall'arte del prompt."

Collega a "L'Arte del Prompt" (Sessione 3).

---

## Riferimenti

- Touvron et al., "Llama 2: Open Foundation and Fine-Tuned Chat Models" (2023)
- Jiang et al., "Mixtral of Experts" (2024)
- Dettmers et al., "QLoRA: Efficient Finetuning of Quantized Language Models" (2023)
- Gu & Dao, "Mamba: Linear-Time Sequence Modeling with Selective State Spaces" (2023)
