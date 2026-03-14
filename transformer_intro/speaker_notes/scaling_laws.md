# Il Paper che ha Cambiato Tutto — Scaling Laws
> File di supporto alla presentazione: `scaling_laws.jsx`

---

## Panoramica della slide

Quinta slide della Sessione 1. Dopo l'attenzione (03), mostriamo il contesto storico che ha portato alla rivoluzione dei transformer: il paper "Attention Is All You Need", le scaling laws, e la scommessa sulla scala che ha portato a ChatGPT. L'obiettivo e far capire che dietro all'IA di oggi c'e una scoperta scientifica precisa e una scommessa imprenditoriale coraggiosa.

**Tempo previsto**: 20-25 minuti

**Posizione nella presentazione**: Dopo "L'Attenzione" (03), prima di "Imparare Giocando — Reinforcement Learning".

---

## Struttura della presentazione

### 1. Apertura — Il paper che ha iniziato tutto

> "Nel 2017, otto ricercatori di Google pubblicano un paper con un titolo ambizioso: 'Attention Is All You Need' — L'Attenzione e Tutto Cio di Cui Hai Bisogno. Quel paper ha cambiato il mondo. E curiosamente, tutti e otto gli autori hanno poi lasciato Google."

Mostra la sezione RNN vs Transformer:

> "Prima del 2017, le reti neurali per il linguaggio funzionavano come leggere un libro parola per parola, in ordine. Lente. I transformer hanno cambiato tutto: guardano tutte le parole contemporaneamente. E questo li rende parallelizzabili — cioe molto, molto piu veloci da addestrare."

Usa il toggle interattivo per mostrare la differenza visiva.

---

### 2. Le Leggi di Scala

> "Nel 2020, un team di OpenAI (con Dario Amodei come co-autore senior) fa una scoperta sorprendente: le prestazioni dei modelli seguono leggi di potenza prevedibili. Piu parametri, piu dati, piu calcolo = modello migliore. E lo fanno in modo regolare, quasi come una legge fisica."

Mostra il grafico a barre CSS:

> "Guardate: GPT-1 aveva 117 milioni di parametri. GPT-2, un anno dopo, 1.5 miliardi — 13 volte di piu. GPT-3? 175 miliardi. Ogni volta, il modello diventa significativamente piu capace."

> "La cosa rivoluzionaria e che questo miglioramento e *prevedibile*. Non e un colpo di fortuna — e una legge."

---

### 3. La Scommessa sulla Scala — Timeline Interattiva

Usa la timeline interattiva. Clicca su ogni punto e racconta la storia:

> "Questa e una storia di persone che hanno fatto una scommessa enorme."

- **2014**: "Dario Amodei e a Baidu in Cina e osserva che i modelli piu grandi funzionano sempre meglio."
- **2015**: "Ilya Sutskever co-fonda OpenAI, convinto che 'piu grande = migliore'."
- **2017**: "Il paper Attention Is All You Need cambia le regole del gioco."
- **2018-2019**: "GPT-1 e GPT-2. OpenAI dice che GPT-2 e 'troppo pericoloso' per essere rilasciato pubblicamente."
- **2020**: "Il paper sulle Scaling Laws conferma matematicamente la scommessa. Cinque mesi dopo, GPT-3 dimostra che funziona."
- **2022**: "ChatGPT. Il mondo non sara piu lo stesso."

> "NOTA IMPORTANTE: Dario Amodei poi lascio OpenAI e fondo Anthropic — non perche non credesse nella scala, ma perche era preoccupato per la sicurezza."

---

### 4. Perche Conta

> "La lezione e semplice ma profonda: 'more is more'. Ma non e tutto. Servono tre ingredienti: parametri, dati e potenza di calcolo. Se manca uno dei tre, gli altri non bastano."

Mostra la visualizzazione dei tre pilastri.

---

### 5. Tana del Bianconiglio

Apri solo se c'e interesse:

- **Chinchilla**: "DeepMind nel 2022 ha dimostrato che GPT-3 era in realta *sotto-addestrato*. Servivano piu dati, non solo piu parametri."
- **Il dibattito attuale**: "Sutskever nel 2025 ha detto: 'Stiamo passando dall'era della scala all'era della ricerca.' La scala da sola potrebbe non bastare piu."

---

## Domande frequenti dal pubblico

**"Perche tutti gli autori hanno lasciato Google?"**
Perche hanno capito il potenziale di quello che avevano creato e hanno voluto costruire aziende proprie. Alcuni hanno fondato startup (Cohere, Character.AI, Adept, Essential AI), altri sono andati in aziende come OpenAI o Google DeepMind con ruoli diversi. E un fenomeno comune nella ricerca: chi fa una scoperta rivoluzionaria vuole portarla nel mondo reale.

**"Quanto costa addestrare un modello come GPT-4?"**
Le stime parlano di $100 milioni o piu solo per il calcolo. Ma il costo reale include anche: raccogliere e pulire i dati (miliardi di pagine web), pagare i ricercatori (stipendi da $500K-1M l'anno nella Silicon Valley), l'infrastruttura hardware (migliaia di GPU). Il costo totale potrebbe essere $500M-1B+.

**"Ma se basta rendere il modello piu grande, perche non lo fanno tutti?"**
Perche servono risorse enormi. Solo poche aziende al mondo hanno i soldi (miliardi), i dati (web-scale), e le GPU (decine di migliaia di A100/H100) per farlo. E comunque non basta la scala — servono anche innovazioni nell'architettura e nei dati.

**"Cosa sono le 'leggi di potenza'?"**
Sono relazioni matematiche della forma y = x^a, dove raddoppiare x non raddoppia y ma lo aumenta in modo prevedibile. In pratica: raddoppiare i parametri non raddoppia le prestazioni, ma le migliora di una percentuale costante. E lo stesso tipo di legge che governa i terremoti, le citta e molti fenomeni naturali.

**"Il miglioramento continuera per sempre?"**
Questa e LA grande domanda. Le scaling laws suggeriscono di si, ma ci sono limiti pratici: i dati di qualita sono finiti, l'energia necessaria e enorme, e ci sono rendimenti decrescenti. Molti ricercatori pensano che servano nuove idee architetturali, non solo modelli piu grandi.

---

## Note tecniche per il presentatore

### Dati storici verificati

- **"Attention Is All You Need"**: Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin. Pubblicato a NeurIPS 2017. Tutti e 8 hanno effettivamente lasciato Google Brain/Research tra il 2018 e il 2022.
- **Scaling Laws paper**: "Scaling Laws for Neural Language Models", Kaplan, McCandlish, Henighan, Brown, Chess, Child, Gray, Radford, Wu, Amodei. Pubblicato gennaio 2020.
- **Dario Amodei**: VP of Research a OpenAI, lascio nel 2021 per fondare Anthropic. La motivazione principale era la sicurezza dell'IA, non un disaccordo sulla scala.
- **GPT-1**: 117M parametri, giugno 2018
- **GPT-2**: 1.5B parametri, febbraio 2019
- **GPT-3**: 175B parametri, maggio 2020
- **ChatGPT**: basato su GPT-3.5, lanciato 30 novembre 2022
- **Chinchilla** (Hoffmann et al., 2022): "Training Compute-Optimal Large Language Models". Regola: parametri e token di training dovrebbero scalare proporzionalmente.

### Scaling Laws — dettagli tecnici

- La relazione e: L(N) ∝ N^(-0.076) dove L e la loss e N il numero di parametri
- Questo significa che raddoppiare i parametri riduce la loss di circa il 5%
- Le leggi valgono su 7 ordini di grandezza (da 768 parametri a 1.5B)
- Tre variabili indipendenti: parametri N, dati D, compute C
- La scoperta chiave e che la performance e una funzione fluida e prevedibile di tutte e tre

### Il dibattito sul plateau

- Sutskever (NeurIPS 2024, poi confermato 2025): "Pre-training as we know it will end"
- Motivo: i dati di alta qualita sul web sono finiti, il miglioramento rallenta
- Nuove direzioni: test-time compute (o1/o3), synthetic data, reasoning, multimodal
- Ma: ogni volta che qualcuno prevede un plateau, arriva un breakthrough

---

## Transizione alla slide successiva

> "Abbiamo visto come i transformer sono nati e come la scala li ha resi potenti. Ma c'e un altro ingrediente segreto che ha trasformato GPT-3 in ChatGPT: il reinforcement learning. Nella prossima slide vediamo come le macchine imparano... giocando."

Questo collega naturalmente alla slide successiva: "Imparare Giocando — Reinforcement Learning".

---

## Riferimenti

- Vaswani et al., "Attention Is All You Need" (2017)
- Kaplan et al., "Scaling Laws for Neural Language Models" (2020)
- Hoffmann et al., "Training Compute-Optimal Large Language Models" (Chinchilla, 2022)
- Brown et al., "Language Models are Few-Shot Learners" (GPT-3, 2020)
