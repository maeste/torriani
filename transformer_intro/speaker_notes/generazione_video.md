# Creare con l'IA: I Video
> File di supporto alla presentazione: `generazione_video.jsx`

---

## Panoramica della slide

Seconda slide della Sessione 2. Evoluzione naturale dalla slide sulle immagini: se l'IA crea immagini, cosa succede quando le mettiamo in sequenza? L'obiettivo e mostrare lo stato dell'arte nella generazione video, gli strumenti disponibili, e i rischi amplificati rispetto alle immagini statiche.

**Tempo previsto**: 15 minuti

**Posizione nella presentazione**: Dopo "Creare con l'IA: Le Immagini", prima di "Quando l'IA Ragiona".

---

## Struttura della presentazione

### 1. Apertura — Da immagine a video

> "Nella slide precedente abbiamo visto come l'IA crea immagini singole. Un video non e altro che una sequenza di immagini — tipicamente 24 o 30 al secondo. Ma c'e una sfida enorme: ogni fotogramma deve essere coerente con quello precedente. Se il gatto si muove a sinistra nel frame 1, non puo teletrasportarsi a destra nel frame 2."

Mostra la visualizzazione dei frame:

> "Questo si chiama coerenza temporale. E il motivo per cui generare video e molto piu difficile che generare immagini."

---

### 2. Gli strumenti

Passa in rassegna i tool con le cards interattive:

- **Sora (OpenAI)**: "Ha scioccato il mondo nel febbraio 2024. Video fotorealistici fino a 1 minuto."
- **Runway Gen-3**: "Lo strumento dell'industria. Usato in film e pubblicita professionali."
- **Kling**: "Made in China, qualita sorprendente, sfida diretta a Sora."
- **Veo 2 (Google)**: "Capisce la fisica — gli oggetti cadono, l'acqua scorre in modo realistico."
- **Pika**: "Accessibile e intuitivo, perfetto per clip brevi e social media."

---

### 3. Le potenzialita

> "Pensate a cosa significa: un regista indipendente puo creare un cortometraggio senza budget. Un insegnante puo creare video educativi personalizzati. Uno studente puo visualizzare concetti astratti."

---

### 4. I rischi amplificati

> "Se un'immagine falsa e pericolosa, un video falso e devastante. Perche il nostro cervello si fida dei video molto piu delle foto."

Punti chiave:

- **Deepfake video**: "Video di politici che dicono cose mai dette. Gia successo."
- **Fake news**: "Video di eventi mai accaduti, indistinguibili dal vero."
- **Prove false**: "Video manipolati presentati come prove in tribunale."
- **Impatto lavorativo**: "Attori, doppiatori, animatori — mestieri a rischio."

> "Come si riconosce un video generato? Guardate le mani, il testo scritto, la fisica degli oggetti. Ma ogni mese questi artefatti diminuiscono."

---

## Domande frequenti dal pubblico

**"Sora puo creare video di qualsiasi cosa?"**
In teoria si, in pratica ha molte restrizioni. OpenAI blocca la generazione di volti di persone reali, contenuti violenti, e materiale sessuale. Ma essendo una tecnologia, altri strumenti meno regolamentati possono farlo.

**"Quanto costa generare un video con l'IA?"**
Dipende dallo strumento: Runway offre piani da $12/mese, Pika ha un piano gratuito limitato. I costi computazionali sono alti — generare 1 minuto di video puo richiedere minuti di GPU time su hardware costoso.

**"I film del futuro saranno fatti tutti dall'IA?"**
Probabilmente no, ma l'IA cambiera profondamente il processo. E piu realistico pensare all'IA come strumento nelle mani dei creativi: pre-visualizzazione, effetti speciali, colonne sonore. Il regista umano resta fondamentale per la visione creativa.

**"Come posso verificare se un video e generato dall'IA?"**
Oggi: cerca artefatti (mani, testo, fisica innaturale), usa strumenti di detection (TrueMedia.org), verifica la fonte. Domani: standard come C2PA/Content Credentials integreranno metadata verificabili nei contenuti autentici.

---

## Note tecniche per il presentatore

### Diffusion Transformer (DiT)

- Architettura che combina diffusion models con transformer (invece di U-Net)
- Usata da Sora, Veo 2, e modelli di nuova generazione
- Il transformer gestisce meglio le relazioni spaziali e temporali a lungo raggio
- Scala meglio con piu compute rispetto all'U-Net tradizionale

### Coerenza temporale

- Il modello deve mantenere: identita degli oggetti, fisica, illuminazione, prospettiva
- Approcci: 3D-aware generation, motion fields, temporal attention layers
- Ancora il punto debole principale: mani che cambiano, oggetti che appaiono/scompaiono

### World models

- Idea: il modello non genera solo pixel ma "capisce" il mondo fisico
- Sora e descritto da OpenAI come un "world simulator"
- Controverso: genera video realistici ma non capisce davvero la fisica
- Direzione futura: modelli che combinano generazione video con simulazione fisica

### C2PA e watermarking

- C2PA (Coalition for Content Provenance and Authenticity): standard open per metadata di provenienza
- Supportato da Adobe, Microsoft, Google, BBC, e altri
- SynthID (Google): watermark invisibile integrato nei contenuti generati
- Non risolvono il problema completamente — i watermark possono essere rimossi

---

## Transizione alla slide successiva

> "Abbiamo visto come l'IA crea immagini e video. Ma c'e un'altra frontiera: l'IA che non si limita a generare contenuti, ma che ragiona, che pensa prima di rispondere. Nella prossima slide vediamo i reasoning models."

Collega a "Quando l'IA Ragiona — Reasoning Models".

---

## Riferimenti

- Brooks et al., "Video generation models as world simulators" (Sora technical report, 2024)
- Blattmann et al., "Stable Video Diffusion" (2023)
- C2PA specification: https://c2pa.org/specifications/
