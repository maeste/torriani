# Physical AI — Quando l'IA Tocca il Mondo Reale
> File di supporto alla presentazione: `11_physical_ai.jsx`

---

## Panoramica della slide

Dai world models ai robot intelligenti: questa slide mostra come l'IA sta uscendo dal mondo digitale per entrare in quello fisico. Focus su world models, stato dell'arte dei robot umanoidi, e applicazioni concrete.

**Tempo previsto**: 10-12 minuti

---

## Struttura della presentazione

### 1. Apertura — "Dai pixel agli atomi"

> "Finora abbiamo parlato di IA che lavora con testo, immagini, codice — tutto digitale. Ma la prossima frontiera è un'IA che *agisce nel mondo reale*: robot che camminano, manipolano oggetti, guidano veicoli. Si chiama Physical AI."

---

### 2. World Models — Come un robot capisce il mondo

> "Un bambino impara la fisica giocando: lascia cadere un cucchiaio e scopre la gravità. Lancia una palla e impara le traiettorie. I World Models fanno la stessa cosa — ma guardando milioni di video."

Punti chiave:
- L'IA osserva milioni di video del mondo reale e impara le "regole" (gravità, collisioni, attrito)
- Il robot simula le azioni virtualmente prima di farle nella realtà
- Perché serve: non puoi rompere 1 milione di bicchieri per imparare a prenderli

Esempi concreti:
- **NVIDIA Cosmos**: world model per la robotica industriale
- **Google DeepMind GENIE**: genera mondi interattivi 3D partendo da video
- **Tesla FSD**: world model per la guida autonoma

---

### 3. Robot intelligenti — Lo stato dell'arte

#### Figure 02 (Figure AI)
> "Robot umanoide che lavora *davvero* nelle fabbriche BMW. Cammina, manipola oggetti, segue istruzioni vocali. Ha un LLM integrato per capire cosa vede e cosa gli viene chiesto. Costa meno di un'auto di lusso."

#### Atlas (Boston Dynamics)
> "Il robot più agile del mondo. Fa parkour, salti, equilibrio dinamico. La versione nuova è completamente elettrica — più silenziosa, più efficiente, più praticamente utile."

#### Optimus (Tesla)
> "Elon Musk vuole produrre milioni di robot umanoidi. Obiettivo: fare lavori domestici e di fabbrica. Se il prezzo scende sotto i $20.000, cambia tutto."

#### Digit (Agility Robotics)
> "Bipede progettato per la logistica. Già in test nei magazzini Amazon. Non sembra umano — è ottimizzato per essere *utile*, non per sembrare una persona."

#### 1X NEO (1X Technologies)
> "Robot domestico con design quasi umano. Movimenti fluidi e naturali. Progettato per vivere nelle nostre case."

---

### 4. Dal magazzino alla sala operatoria

Applicazioni per dominio:

#### 🏭 Manifattura
Cobot (robot collaborativi) che lavorano fianco a fianco con gli umani. Non più in gabbie separate.

#### 📦 Logistica
Magazzini Amazon con migliaia di robot. Droni per consegne. Il futuro della supply chain è autonomo.

#### 🏥 Medicina
Robot chirurgico Da Vinci: più preciso della mano umana. Protesi intelligenti controllate dal pensiero. Esoscheletri per la riabilitazione.

#### 🌾 Agricoltura
Droni per monitoraggio colture, robot per raccolta frutta delicata, trattori autonomi che arano 24/7.

#### 🚀 Spazio
Rover marziani con IA autonoma — la comunicazione con la Terra ha 20 minuti di ritardo, devono decidere *da soli*.

#### 🏠 Domestico
Dagli aspirapolvere robot (semplici) agli assistenti domestici umanoidi (prossimo futuro).

---

### 5. Chiusura

> "L'IA sta uscendo dallo schermo ed entrando nel mondo. I robot del futuro non saranno come quelli dei film — saranno collaboratori silenziosi che ci aiuteranno a fare cose che oggi sono impossibili, pericolose o semplicemente noiose."

---

## Domande frequenti

**"I robot ci ruberanno il lavoro fisico?"**
Come per ogni rivoluzione: trasformeranno il lavoro, non lo elimineranno. Un robot in fabbrica fa i compiti pericolosi e ripetitivi. L'operaio diventa supervisore, programmatore, manutentore — con stipendio più alto e rischio più basso.

**"Quanto costano questi robot?"**
Figure 02: non ancora in vendita, stimato ~$50-100K. Optimus: obiettivo <$20K. Per confronto, un operaio costa ~$40-60K/anno. Quando il robot costa meno di un anno di stipendio, l'adozione accelera.

**"Perché i robot umanoidi? Non sarebbe meglio avere robot specializzati?"**
Il mondo è progettato per gli umani: porte, scale, maniglie, strumenti. Un robot umanoide può usare tutto ciò che usiamo noi senza modificare l'ambiente. Un robot specializzato (braccio industriale) è più efficiente nel suo compito specifico, ma non può fare altro.

---

## Note tecniche per il presentatore

### Sezione 20% — Tana del bianconiglio

#### Sim-to-Real Transfer
- Il gap tra simulazione e realtà è il problema #1 della robotica IA
- Una presa perfetta in simulazione spesso fallisce nella realtà (attrito diverso, illuminazione, deformazione)
- **Domain Randomization**: variare casualmente i parametri della simulazione (colori, attrito, massa) per rendere il modello robusto
- **Digital Twins**: copie virtuali esatte di ambienti reali per simulazione precisa

#### Embodied AI vs Disembodied AI
- L'IA "senza corpo" (ChatGPT) capisce il mondo leggendo
- L'IA "con corpo" (robot) capisce il mondo *interagendo*
- Teoria dell'embodied cognition: l'intelligenza emerge dall'interazione con l'ambiente
- Un robot che ha manipolato oggetti "capisce" la fisica diversamente da un LLM che l'ha letta

#### Foundation Models per la robotica
- **RT-2** (Google): Robotic Transformer — modello linguaggio-azione che traduce istruzioni verbali in movimenti robotici
- **Octo**: foundation model open-source per la manipolazione robotica
- Come GPT ma per le azioni fisiche: pre-addestrato su dati robotici massivi, poi fine-tuned per compiti specifici

#### La sfida dell'hardware
- I chip per l'IA digitale (GPU NVIDIA) sono eccezionali
- Ma i robot servono anche: sensori tattili, attuatori precisi, batterie durature, materiali leggeri
- Il software è avanti di ~10 anni rispetto all'hardware
- Il costo dell'hardware è il vero collo di bottiglia per l'adozione di massa

#### Le Leggi di Asimov sono ancora rilevanti?
1. Un robot non può recare danno a un essere umano
2. Un robot deve obbedire agli ordini degli umani
3. Un robot deve proteggere la propria esistenza

Nella realtà: non abbiamo "leggi" hardcoded ma sistemi di sicurezza probabilistici. Un robot autonomo deve bilanciare obiettivi conflittuali in tempo reale — molto più complesso delle tre leggi di Asimov.
