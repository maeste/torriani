# Sotto il Cofano — Modelli e Architetture

## Cosa c'e dentro un modello di intelligenza artificiale?

Immagina di aprire il cofano di un'automobile. Dentro trovi il motore, i cavi, i tubi, i serbatoi. Tutto ha una funzione precisa, e dalla dimensione del motore dipende quanta potenza puoi avere. Con i modelli di intelligenza artificiale funziona in modo sorprendentemente simile: sotto l'interfaccia amichevole di ChatGPT o Claude si nascondono miliardi di numeri, hardware specializzato e scelte ingegneristiche affascinanti. Vediamo cosa si nasconde sotto il cofano.

### I parametri: i mattoncini dell'intelligenza

Quando senti dire "un modello da 70 miliardi di parametri", cosa significa concretamente? Ogni parametro e un numero — un peso della rete neurale. Pensalo come una minuscola manopola che regola il comportamento del modello. Se il modello fosse un mixer musicale enorme, ogni parametro sarebbe una delle manopole: girandola un pochino cambia il suono finale. Moltiplica questa idea per 70 miliardi e hai un'idea della complessita.

I modelli di oggi si dividono grosso modo in tre famiglie di taglia. I **modelli piccoli**, da 1 a 7 miliardi di parametri, sono abbastanza leggeri da girare su un telefono o un portatile: pensa a Phi-3 di Microsoft o a Gemma di Google. Sono perfetti per chatbot personali, riassunti e classificazione di testi. Poi ci sono i **modelli medi**, da 7 a 70 miliardi di parametri, come Llama-3 70B o Mixtral: servono una o due GPU dedicate, ma possono fare cose notevoli come assistere nella programmazione, analizzare documenti lunghi o tradurre con qualita professionale. Infine ci sono i **modelli grandi**, da 70 miliardi fino a oltre mille miliardi di parametri: GPT-4, Claude, Gemini Ultra. Questi vivono nei data center e sono capaci di ragionamento complesso, creativita avanzata e agire come agenti autonomi.

### L'hardware: perche servono le GPU

Ma dove girano fisicamente tutti questi numeri? Sulle **GPU** — le schede grafiche. Nate per disegnare pixel nei videogiochi, le GPU sanno fare milioni di operazioni matematiche in parallelo. E le reti neurali hanno bisogno esattamente di questo: montagne di moltiplicazioni tra matrici, tutte insieme. Non e un caso che NVIDIA, il principale produttore di GPU, sia diventata una delle aziende piu preziose al mondo.

Il collo di bottiglia e la **VRAM**, la memoria della scheda grafica. Tutti i parametri del modello devono stare in questa memoria durante l'uso. La regola e semplice: un parametro in precisione standard (16-bit) occupa 2 byte. Quindi un modello da 70 miliardi di parametri richiede circa 140 GB di VRAM — quasi due GPU NVIDIA A100 da 80 GB l'una, che costano circa 30.000 dollari ciascuna.

### Quanto costa tutto questo?

La scala dei costi nell'IA e vertiginosa. **Usare** un modello costa frazioni di centesimo per domanda — tra 0,001 e 0,05 dollari. E come pagare il pedaggio autostradale. Ma **addestrare** quel modello? Addestrare un modello piccolo costa tra 10.000 e 100.000 dollari. Addestrare qualcosa come GPT-4 supera i 100 milioni di dollari. E come la differenza tra guidare su un'autostrada e costruirla da zero.

### L'IA sul tuo computer

Ed ecco la notizia bella: non serve per forza il cloud. Esistono strumenti gratuiti che ti permettono di far girare modelli di IA direttamente sul tuo computer, senza internet e senza che nessun dato esca dalla tua rete.

**Ollama** e il piu semplice: apri il terminale, scrivi `ollama run llama3` e in pochi secondi hai un modello che risponde alle tue domande. **LM Studio** offre un'interfaccia grafica completa: scarichi il programma, scegli un modello, e cominci a chattare come faresti con ChatGPT, ma tutto in locale. Per chi vuole il massimo delle prestazioni c'e **llama.cpp**, scritto in C++, il piu veloce e configurabile — ma richiede un po' piu di esperienza tecnica.

I vantaggi di usare modelli locali sono importanti: **privacy totale** (nessun dato viene inviato a server esterni), **funzionamento offline**, **zero costi** dopo il download iniziale, e soprattutto l'opportunita di **capire davvero come funziona** l'IA mettendoci le mani sopra.

### Il grande compromesso

Non esiste il modello perfetto. Ogni scelta comporta un compromesso. I modelli cloud grandi come GPT-4 offrono la migliore qualita e velocita, ma costano e non garantiscono privacy. Un modello locale su GPU ti da privacy totale, possibilita di personalizzazione e funzionamento offline, ma la qualita sara inferiore a quella dei giganti del cloud. Un modello piccolo su CPU e il piu accessibile e privato, ma anche il meno potente.

La scelta giusta dipende dall'uso. Per un compito critico dove serve il massimo della qualita, il cloud e la risposta. Per sperimentare, imparare o gestire dati sensibili, i modelli locali sono fantastici.

### Il rabbit hole: tecniche avanzate

Per i piu curiosi, ci sono alcune tecniche ingegnose che vale la pena conoscere. La **quantizzazione** permette di comprimere un modello riducendo la precisione dei numeri: invece di usare 32 bit per parametro (la massima precisione), si puo scendere a 16, 8 o persino 4 bit. A 4 bit la qualita resta buona per molti compiti, e un modello da 70 miliardi di parametri puo girare su una singola GPU da 24 GB. E come comprimere una foto: perde un po' di dettaglio, ma resta perfettamente utilizzabile.

Il **Mixture of Experts (MoE)** e un'altra idea geniale. Invece di avere un unico modello monolitico, si creano tanti "esperti" specializzati — uno bravo in matematica, uno nel codice, uno nelle lingue — e un piccolo network "router" decide quali attivare per ogni domanda. Mixtral, ad esempio, ha 47 miliardi di parametri totali, ma ne usa solo 13 miliardi per ogni risposta. E come avere otto specialisti in una clinica e consultarne solo due o tre per ogni paziente: molto piu efficiente.

Infine, la **distillazione** permette a un modello piccolo di imparare da uno grande. Il modello "maestro" genera milioni di esempi, e il modello "allievo" viene addestrato su quei dati, imparando a imitare le risposte del grande. Il risultato e un modello compatto ma sorprendentemente capace.

---

## 5 Cose da Ricordare

- **I parametri sono i mattoncini**: un modello da 70 miliardi di parametri contiene 70 miliardi di numeri che, insieme, producono le risposte. Piu parametri generalmente significa piu capacita, ma anche piu risorse necessarie.
- **Le GPU sono il motore dell'IA**: le schede grafiche, nate per i videogiochi, sono diventate essenziali per l'intelligenza artificiale perche sanno fare milioni di calcoli in parallelo. La VRAM e il principale collo di bottiglia.
- **Usare l'IA costa poco, addestrarla costa tantissimo**: una singola domanda costa frazioni di centesimo, ma creare il modello da zero puo costare centinaia di milioni di dollari.
- **Puoi far girare l'IA sul tuo computer**: con strumenti come Ollama o LM Studio puoi usare modelli linguistici in locale, gratis, offline e con privacy totale.
- **Non esiste il modello perfetto**: ogni scelta e un compromesso tra qualita, costo, velocita, privacy e personalizzazione. La scelta giusta dipende sempre dal contesto d'uso.

---

## 3 Cose da Fare

1. **Installa Ollama e prova un modello locale.** Vai su [ollama.com](https://ollama.com), scarica il programma, apri il terminale e scrivi `ollama run llama3`. Fai qualche domanda e confronta le risposte con quelle di ChatGPT: noterai differenze interessanti tra un modello piccolo locale e uno grande nel cloud.

2. **Calcola quanta VRAM servirebbe per un modello.** Prendi un modello qualsiasi (es. 13 miliardi di parametri) e applica la formula: parametri x 2 byte (per FP16) = memoria necessaria. Poi prova a calcolare quanto si riduce con la quantizzazione a 4 bit (parametri x 0,5 byte). Confronta il risultato con la RAM del tuo computer o della tua scheda grafica.

3. **Esplora la libreria di modelli su Hugging Face.** Vai su [huggingface.co/models](https://huggingface.co/models), filtra per dimensione e tipo di compito, e scopri quanti modelli open source esistono. Leggi le schede dei modelli per capire per cosa sono ottimizzati e come sono stati addestrati.

---

## Domande Frequenti

**Posso far girare ChatGPT sul mio portatile?**
Non ChatGPT specificamente, perche quello gira sui server di OpenAI. Ma puoi far girare modelli simili come Llama-3 8B. Con 16 GB di RAM puoi usare un modello da 7-8 miliardi di parametri. Non sara potente come GPT-4, ma funziona sorprendentemente bene per molti compiti quotidiani.

**Cosa sono esattamente le GPU e perche sono cosi importanti per l'IA?**
Le GPU (Graphics Processing Units) sono processori nati per i videogiochi, progettati per eseguire milioni di operazioni in parallelo. Le reti neurali richiedono esattamente questo tipo di calcolo massiccio e parallelo, motivo per cui le GPU sono diventate l'hardware fondamentale dell'intelligenza artificiale moderna.

**Perche non si puo semplicemente rendere il modello piu piccolo senza perdere qualita?**
In parte si puo, grazie a tecniche come la quantizzazione (ridurre la precisione dei numeri) e la distillazione (far imparare un modello piccolo da uno grande). Ma c'e un limite fisico: sotto una certa dimensione, il modello non riesce a catturare pattern sufficientemente complessi per dare risposte di qualita.

**Cosa significa MoE (Mixture of Experts)?**
E un'architettura in cui il modello contiene tanti "esperti" specializzati, ma ne attiva solo alcuni per ogni domanda. Mixtral, ad esempio, ha 47 miliardi di parametri totali ma ne usa solo 13 miliardi alla volta. Questo permette di avere le prestazioni di un modello grande con il costo computazionale di uno piu piccolo.

**Quanto costa davvero usare un modello come GPT-4?**
Per l'utente finale, ogni domanda costa tra 0,001 e 0,05 dollari — frazioni di centesimo. Il costo enorme e per chi crea il modello: addestrare GPT-4 e costato oltre 100 milioni di dollari. E la differenza tra costruire un'autostrada e pagare il pedaggio per percorrerla.

**Cosa vuol dire "quantizzazione" in parole semplici?**
E come scegliere quante cifre decimali usare. Se un parametro vale 3,14159265, a 32 bit lo memorizzi esattamente cosi. A 4 bit lo memorizzi come "circa 3". Perdi un po' di precisione, ma risparmi un sacco di memoria — e per molti compiti la differenza e trascurabile.

**Esistono alternative ai Transformer?**
Si, la ricerca e molto attiva. Architetture come Mamba (basata su State Space Models) e RWKV offrono complessita lineare invece che quadratica, il che le rende potenzialmente molto piu veloci su testi lunghi. Esistono anche modelli ibridi come Jamba che combinano Transformer e nuove architetture. Pero, al momento, nessuna ha sostituito completamente i Transformer.

**I modelli locali sono sicuri da usare?**
Si, anzi sono piu sicuri dal punto di vista della privacy rispetto ai servizi cloud. Tutti i dati restano sul tuo computer e nessuna informazione viene inviata a server esterni. Questo li rende ideali per lavorare con dati sensibili o personali.

---

## Mettiti alla Prova

**1. Un modello da 7 miliardi di parametri in precisione FP16 (2 byte per parametro) occupa circa:**
- A) 700 MB
- B) 7 GB
- C) 14 GB- D) 70 GB

**2. Quale vantaggio principale offre la tecnica Mixture of Experts (MoE)?**
- A) Riduce il numero totale di parametri del modello
- B) Permette di usare solo una parte dei parametri per ogni risposta, risparmiando calcolo- C) Elimina la necessita di GPU
- D) Rende il modello completamente gratuito da addestrare

**3. Se vuoi far girare un modello di IA sul tuo portatile con la massima semplicita, quale strumento sceglieresti?**
- A) llama.cpp, perche e il piu veloce
- B) Un cluster di GPU nel cloud
- C) LM Studio o Ollama, perche hanno interfacce semplici e gestiscono tutto automaticamente- D) Addestrare un modello da zero sul tuo computer

**4. Qual e la differenza principale tra il costo di addestramento e il costo di utilizzo di un modello come GPT-4?**
- A) Non c'e differenza, costano uguale
- B) L'addestramento costa milioni di dollari, ma ogni singola domanda costa frazioni di centesimo- C) L'utilizzo costa di piu perche ci sono milioni di utenti
- D) L'addestramento e gratuito, si paga solo l'utilizzo

**5. La quantizzazione a 4 bit di un modello permette di:**
- A) Quadruplicare il numero di parametri
- B) Ridurre la memoria necessaria a circa un ottavo dell'originale (32 bit), con una piccola perdita di qualita- C) Eliminare completamente la necessita di GPU
- D) Aumentare la qualita delle risposte rispetto alla precisione piena
