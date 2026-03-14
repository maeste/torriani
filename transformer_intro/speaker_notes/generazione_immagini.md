# Creare con l'IA: Le Immagini
> File di supporto alla presentazione: `generazione_immagini.jsx`

---

## Panoramica della slide

Prima slide della Sessione 2. Apre il blocco "L'IA Oltre il Testo" mostrando come l'IA crea immagini dal nulla. L'obiettivo e spiegare i diffusion model in modo intuitivo, presentare gli strumenti, e affrontare sia le potenzialita che i rischi.

**Tempo previsto**: 15-20 minuti

**Posizione nella presentazione**: Dopo "I Limiti" (04), apre la Sessione 2. Prima di "Creare con l'IA: I Video".

---

## Struttura della presentazione

### 1. Apertura — Lo scultore digitale

> "Immaginate uno scultore che parte da un blocco di marmo grezzo — pieno di imperfezioni, senza forma. Colpo dopo colpo, rimuove il superfluo finche non emerge una statua. I modelli di diffusione fanno esattamente questo: partono da rumore puro e, passo dopo passo, lo trasformano in un'immagine."

Usa lo slider di denoising:

> "Guardate: a sinistra, rumore casuale. Muovete lo slider verso destra e vedete l'immagine emergere. Ogni passo rimuove un po' di rumore e aggiunge un po' di struttura."

---

### 2. Gli strumenti

> "Oggi ci sono decine di strumenti per generare immagini. Vediamone cinque."

Mostra le cards interattive. Per ciascuno:

- **Midjourney**: "Il preferito degli artisti. Qualita estetica incredibile. Si usa via Discord."
- **DALL-E 3**: "Integrato in ChatGPT. Capisce bene il testo e le istruzioni complesse."
- **Stable Diffusion**: "Open source. Lo puoi scaricare e usare gratis sul tuo computer."
- **Flux**: "Nuova generazione open source. Creato da ex-ricercatori di Stable Diffusion."
- **Ideogram**: "Il migliore per testo nelle immagini — un punto debole degli altri."

> "Notate la differenza: alcuni sono chiusi (paghi per usarli), altri aperti (li scarichi gratis). Entrambi gli approcci hanno vantaggi."

---

### 3. Le potenzialita

Panoramica rapida delle applicazioni. Non servono troppi dettagli — le immagini parlano.

---

### 4. I rischi — La parte piu importante

> "Con grande potere viene grande responsabilita. E non sto citando Spider-Man a caso."

Usa il toggle potenzialita/rischi:

> "I deepfake sono foto false di persone reali. Possono rovinare reputazioni, creare fake news, manipolare elezioni. Il copyright e un campo minato: se l'IA ha imparato dai lavori di un artista, chi possiede l'immagine generata?"

---

## Domande frequenti dal pubblico

**"Come fa l'IA a 'capire' cosa disegnare dal testo?"**
Usa un modello chiamato CLIP che collega testo e immagini. CLIP ha visto miliardi di coppie testo-immagine dal web e ha imparato che "gatto rosso su divano blu" corrisponde a certi pattern visivi. Il diffusion model usa questa comprensione per guidare il processo di denoising.

**"Si possono creare deepfake di chiunque?"**
Tecnicamente si, e questo e il problema. Esistono gia casi di deepfake usati per cyberbullismo, revenge porn, e truffe. Molti paesi stanno legiferando per regolamentare l'uso. In Italia, creare deepfake non consensuali puo configurare reati come la diffamazione o il trattamento illecito di dati personali.

**"L'immagine generata e mia o dell'IA?"**
Dipende dal servizio e dalla giurisdizione. In USA, il Copyright Office ha stabilito che le immagini generate puramente da IA non sono proteggibili da copyright. In Europa la situazione e ancora in evoluzione. Midjourney e DALL-E danno diritti commerciali agli utenti paganti, ma il dibattito legale e aperto.

**"Un artista puo impedire che la sua arte venga usata per addestrare l'IA?"**
E il tema della causa Stability AI vs Getty Images (2023). Alcuni strumenti come Stable Diffusion sono stati addestrati su immagini senza il consenso degli artisti. Alcuni artisti usano strumenti come Glaze per "avvelenare" le loro immagini online, rendendole inutilizzabili per il training.

---

## Note tecniche per il presentatore

### Diffusion models — come funzionano davvero

- **Forward process**: si aggiunge rumore gaussiano all'immagine in T step (tipicamente 1000)
- **Reverse process**: una rete neurale (U-Net o DiT) impara a predire e rimuovere il rumore
- **Latent diffusion** (Stable Diffusion): il processo avviene in uno spazio compresso (latent space), non sui pixel. Riduce il costo computazionale di ~100x
- **Classifier-free guidance**: il modello genera sia con che senza il prompt, poi amplifica la differenza. Scale tipiche: 7-15

### CLIP — il ponte testo-immagine

- Contrastive Language-Image Pre-training (OpenAI, 2021)
- Addestrato su 400M coppie testo-immagine dal web
- Crea uno spazio condiviso dove testo e immagini "vicini" hanno significati simili
- Usato come guida nel processo di diffusione

### LoRA — fine-tuning accessibile

- Low-Rank Adaptation: modifica solo una piccola parte dei parametri (~1-5%)
- Permette di specializzare un modello con poche immagini (5-20) e poco compute
- Usato per stili artistici, volti specifici, concetti personalizzati
- File risultante: ~10-100 MB invece di ~5 GB del modello completo

---

## Transizione alla slide successiva

> "Le immagini sono impressionanti, ma l'IA non si ferma qui. Cosa succede quando le immagini si muovono? Nella prossima slide vediamo come l'IA crea video — e perche i rischi si amplificano."

Collega a "Creare con l'IA: I Video".

---

## Riferimenti

- Ho et al., "Denoising Diffusion Probabilistic Models" (DDPM, 2020)
- Rombach et al., "High-Resolution Image Synthesis with Latent Diffusion Models" (Stable Diffusion, 2022)
- Radford et al., "Learning Transferable Visual Models From Natural Language Supervision" (CLIP, 2021)
