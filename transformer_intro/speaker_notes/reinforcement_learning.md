# Imparare Giocando — Reinforcement Learning
> File di supporto alla presentazione: `reinforcement_learning.jsx`

---

## Panoramica della slide

Sesta slide della Sessione 1. Dopo le scaling laws, mostriamo come il reinforcement learning ha trasformato i modelli linguistici da strumenti grezzi a assistenti utili. L'obiettivo e spiegare RL classico (con AlphaGo), poi RLHF (ponte GPT-3→ChatGPT), poi RLVR (evoluzione per reasoning models).

**Tempo previsto**: 20 minuti

**Posizione nella presentazione**: Dopo "Scaling Laws", prima di "I Limiti" (04).

---

## Struttura della presentazione

### 1. Apertura — L'analogia del cane

> "Come insegnate a un cane a sedersi? Non gli spiegate la grammatica del comando. Gli dite 'seduto', se lo fa gli date un biscotto, se non lo fa niente biscotto. Dopo un po', il cane impara. Questo e il reinforcement learning: apprendere per rinforzo."

Mostra il ciclo interattivo: Agente → Azione → Ambiente → Ricompensa.

> "La macchina e come il cane: prova azioni, riceve ricompense, e impara a ripetere le azioni che danno ricompense positive."

---

### 2. AlphaGo — La storia che ha cambiato tutto

> "9 marzo 2016, Seoul. Lee Sedol, il piu forte giocatore di Go al mondo, si siede davanti a uno schermo. Dall'altra parte non c'e un umano, ma AlphaGo di Google DeepMind. Il Go ha piu posizioni possibili degli atomi nell'universo. Nessun computer avrebbe dovuto vincere per almeno altri 10 anni."

Pausa drammatica.

> "AlphaGo vinse 4 a 1. Alla mossa 37 della seconda partita, fece una mossa che nessun umano avrebbe mai fatto — e che si rivelo geniale. Lee Sedol pianse."

Mostra la timeline AlphaGo → AlphaGo Zero → AlphaZero:

> "Ma la cosa piu incredibile viene dopo. AlphaZero impara da ZERO — senza studiare nessuna partita umana. In 40 ore batte la versione che aveva battuto Lee Sedol. 3000 anni di strategia umana, superati in meno di due giorni."

---

### 3. RLHF — Il segreto di ChatGPT

> "GPT-3 era potente ma grezzo. Se gli chiedevi qualcosa, poteva rispondere con un'oscenita, un'informazione falsa, o semplicemente continuare a scrivere senza mai fermarsi. Non era utilizzabile dal pubblico."

Usa il toggle prima/dopo:

> "Guardate la differenza. Prima dell'RLHF, il modello completava il testo come un autocomplete impazzito. Dopo, risponde in modo utile e strutturato. Cosa e cambiato?"

Spiega il processo:

> "Degli esseri umani votano le risposte: 'questa e meglio di questa'. Il modello impara le preferenze umane e si adatta. E come avere migliaia di insegnanti che dicono 'bravo' o 'sbagliato' per ogni risposta."

---

### 4. RLVR — L'evoluzione

> "L'RLHF funziona ma ha un problema: gli umani sono soggettivi, lenti e costosi. Per la matematica o il codice, possiamo fare di meglio: usare verificatori automatici."

Mostra il confronto RLHF vs RLVR:

> "Se il modello dice che 2+2=5, non serve un umano per dire che e sbagliato. Un calcolatore basta. Questo e RLVR: Reinforcement Learning con Verifiable Rewards."

---

## Domande frequenti dal pubblico

**"AlphaGo 'pensa' davvero?"**
No, nel senso umano. AlphaGo valuta milioni di posizioni future e sceglie la mossa con il punteggio piu alto. La mossa 37 non era "creativa" — era il risultato di un'esplorazione computazionale enorme che ha trovato un pattern che gli umani non avevano mai considerato.

**"Perche Lee Sedol ha pianto?"**
Perche ha capito che il mondo era cambiato. Il Go non e solo un gioco — e parte della cultura e dell'identita dell'Asia orientale. Un computer che batte il campione mondiale e un momento simbolico enorme. Sedol si e poi ritirato dal Go professionistico nel 2019, dicendo che l'IA era "imbattibile".

**"Chi sono gli umani che votano le risposte nell'RLHF?"**
Lavoratori specializzati, spesso in paesi con costi del lavoro piu bassi (Kenya, India, Filippine). Il lavoro e ripetitivo e puo essere psicologicamente difficile (devono leggere contenuti tossici per insegnare al modello cosa NON dire). E un tema etico importante.

**"L'IA puo 'imparare' cose sbagliate con il rinforzo?"**
Si, e questo si chiama "reward hacking". Se la ricompensa e mal definita, l'IA trova scorciatoie inaspettate. Esempio: un IA addestrata per giocare a un videogioco ha scoperto un bug nel gioco per ottenere punti infiniti invece di giocare come previsto.

---

## Note tecniche per il presentatore

### AlphaGo — dettagli storici

- AlphaGo (2016): combinava supervised learning (partite umane) + RL (self-play) + Monte Carlo Tree Search
- AlphaGo Zero (2017): solo RL da self-play, nessun dato umano. Supero AlphaGo in 3 giorni
- AlphaZero (2017): generalizzato a scacchi, Go, e shogi. 4 ore per superare Stockfish a scacchi
- La mossa 37 della partita 2 aveva una probabilita stimata 1:10.000 di essere giocata da un professionista umano

### RLHF — pipeline tecnica

1. **Pre-training**: next-token prediction su web-scale data (GPT-3)
2. **SFT (Supervised Fine-Tuning)**: fine-tuning su esempi di dialogo curati da umani
3. **Reward Model**: addestrato sulle preferenze umane (A meglio di B)
4. **PPO (Proximal Policy Optimization)**: il modello viene ottimizzato per massimizzare il reward model

### RLVR — come funziona

- Reward verificabile: la risposta e corretta o sbagliata (math, code, logic)
- Non serve reward model umano: il verificatore e deterministico
- Usato da DeepSeek-R1, o1/o3 (presumibilmente), e molti reasoning models
- Collegamento con test-time compute: piu tempo di ragionamento → risposte verificabili migliori

---

## Transizione alla slide successiva

> "Il reinforcement learning ha reso i modelli utilizzabili e utili. Ma non li ha resi perfetti. Nella prossima slide vediamo i limiti di questa macchina — perche non pensa, non capisce, e puo sbagliare in modi sorprendenti."

Collega a "I Limiti" (04).

---

## Riferimenti

- Silver et al., "Mastering the game of Go with deep neural networks and tree search" (AlphaGo, 2016)
- Silver et al., "Mastering the game of Go without human knowledge" (AlphaGo Zero, 2017)
- Ouyang et al., "Training language models to follow instructions with human feedback" (InstructGPT/RLHF, 2022)
- Lambert et al., "RLHF: Reinforcement Learning from Human Feedback" (survey, 2023)
