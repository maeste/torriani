# Demo live con Claude Code — Sessione 2, Atto 4

> **Sessione 2, Atto 4**: 4 demo live (~15 min totali) per mostrare la potenza pratica dell'IA come strumento di studio e lavoro.

L'obiettivo e' creare un effetto "wow" negli studenti, dimostrando che l'IA non e' un giocattolo ma uno strumento professionale. Ogni demo ha un messaggio chiave diverso, e insieme costruiscono la narrativa: **l'IA amplifica le vostre capacita', non le sostituisce**.

---

## Panoramica timing

| # | Demo | Tempo | Messaggio chiave |
|---|------|-------|------------------|
| 1 | Analisi testo di maturita' | ~4 min | "Questo non e' copiare. E' studiare meglio." |
| 2 | Debug di codice | ~3 min | "La macchina trova in secondi quello che vi farebbe perdere ore." |
| 3 | L'assistente di studio perfetto | ~4 min | "Avete appena costruito il vostro tutor personale." |
| 4 | Analisi multidisciplinare | ~4 min | "Un solo strumento, infiniti punti di vista." |
| | **Totale** | **~15 min** | |

---

## Prima di iniziare

### Setup tecnico

1. **Claude Code aperto** nel terminale, visibile sul proiettore
2. **Tutti i prompt copiati** in un file di appunti (o in questo documento) per il copia-incolla rapido
3. **Connessione internet** verificata e stabile
4. **Font size** del terminale aumentato (almeno 18pt) perche' tutti possano leggere

### Test pre-presentazione

**Obbligatorio**: eseguire ogni demo almeno una volta prima della presentazione. I modelli sono non-deterministici: la stessa domanda puo' dare risposte diverse ogni volta. Il test serve a:
- Verificare che le risposte siano di qualita' sufficiente
- Familiarizzare con i tempi di generazione
- Preparare varianti dei prompt nel caso qualcosa non funzioni
- Salvare screenshot delle risposte migliori come fallback

### Stato mentale del presentatore

> "Queste demo sono conversazioni, non esecuzioni di script. Se qualcosa va storto, e' un momento didattico. Se va bene, e' un momento wow. In entrambi i casi, vincete."

---

## Demo 1 — Analisi testo di maturita' (~4 min)

### Titolo per gli studenti
> "L'IA alla maturita': studiare, non copiare"

### Setup (30 secondi)

> "Adesso vi faccio vedere qualcosa che vi interessa direttamente: la maturita'. Prendo un testo vero di un esame passato e chiedo a Claude di analizzarlo. Ma attenzione: non gli chiedo di scrivere il tema al posto vostro. Gli chiedo di aiutarvi a *capire* il testo. E' la differenza tra copiare e studiare."

### Prompt esatto

Copiare e incollare in Claude Code:

```
Leggi questa poesia di Giuseppe Ungaretti e aiutami a studiarla per la maturita'.

"Si sta come
d'autunno
sugli alberi
le foglie"

— Giuseppe Ungaretti, "Soldati", 1918

Per favore:
1. **Analisi stilistica**: Analizza le scelte formali (brevita', enjambement, assenza di punteggiatura) e spiega perche' Ungaretti le usa. Che effetto creano sul lettore?

2. **Analisi tematica**: Quali temi emergono? Come si collegano al contesto storico (Prima guerra mondiale, trincea)?

3. **Collegamenti interdisciplinari** — trovane 3:
   - Storia: un evento o fenomeno specifico collegabile
   - Filosofia: un pensatore o corrente di pensiero rilevante
   - Arte: un'opera visiva che esprime lo stesso sentimento

4. **Domande d'esame**: Suggerisci 2 domande che un professore potrebbe fare su questo testo all'orale di maturita', e per ciascuna dai una traccia di risposta in 3 punti.

Scrivi in modo chiaro e adatto a uno studente di quinta superiore.
```

### Output atteso

Claude dovrebbe produrre:
- Un'analisi stilistica che evidenzia la tecnica ermetica di Ungaretti (la similitudine compressa, l'enjambement estremo, ogni parola e' essenziale)
- Un'analisi tematica sulla precarieta' della vita in trincea, la fragilita' umana, il rapporto uomo-natura
- Tre collegamenti concreti (es. Battaglia del Carso / Heidegger sull'essere-per-la-morte / "Guernica" di Picasso o un'opera espressionista)
- Due domande d'esame plausibili con tracce di risposta strutturate

### Talking points (da dire mentre l'output appare)

> "Guardate cosa sta facendo: non sta scrivendo il tema. Sta facendo quello che farebbe un professore in una lezione privata — vi spiega il testo, vi mostra i collegamenti, vi prepara alle domande."

Quando appaiono i collegamenti interdisciplinari:

> "Questi collegamenti li avreste trovati da soli? Forse si', dopo ore di ricerca. L'IA li trova in secondi. Ma il punto e': adesso *voi* dovete capirli, approfondirli, farli vostri. L'IA ha acceso la luce, ma il lavoro di studio resta vostro."

### Messaggio chiave

> "Questo non e' copiare. E' studiare meglio. La differenza? Copiare e' incollare la risposta nel tema. Studiare e' leggere questa analisi, capirla, e poi chiudere Claude e scrivere il tema con le vostre parole."

### Fallback plan

Se la risposta e' troppo lunga o troppo generica:
- Interrompere la generazione e commentare: "Vedete, la risposta e' buona ma lunga. In pratica, dovreste iterare: chiedere di essere piu' specifico, di concentrarsi su un aspetto. Anche con l'IA, la comunicazione e' un processo."

Se Claude non conosce bene la poesia:
- Questo e' improbabile con Ungaretti, ma nel caso: "Ecco un limite reale. Il modello sa molto, ma non tutto. Per questo *voi* dovete sempre verificare. Il pensiero critico non e' opzionale."

---

## Demo 2 — Debug di codice (~3 min)

### Titolo per gli studenti
> "Trovare un ago in un pagliaio di codice"

### Setup (20 secondi)

> "Ora cambiamo completamente registro. Quanti di voi hanno provato a programmare? Chi ha passato un'ora a cercare un errore stupido nel codice? Guardate questo programma Python. Ha un bug subdolo. Vediamo se Claude lo trova."

### Il codice con il bug

Questo e' un programma completo e eseguibile. Il bug e' un classico errore di *mutable default argument* in Python: la lista `risultati` viene condivisa tra tutte le chiamate alla funzione, accumulando risultati delle chiamate precedenti.

```python
# registro_voti.py — Programma per gestire i voti degli studenti
# ATTENZIONE: questo codice ha un bug subdolo!

def aggiungi_voti(nome: str, nuovi_voti: list, risultati: list = []) -> list:
    """Aggiunge i voti di uno studente alla lista risultati."""
    risultati.append({"studente": nome, "voti": nuovi_voti})
    return risultati


def calcola_media(voti: list) -> float:
    """Calcola la media di una lista di voti."""
    if not voti:
        return 0.0
    return sum(voti) / len(voti)


def stampa_report(registro: list) -> None:
    """Stampa il report dei voti."""
    print("\n--- REPORT VOTI ---")
    for entry in registro:
        nome = entry["studente"]
        voti = entry["voti"]
        media = calcola_media(voti)
        print(f"{nome}: voti={voti}, media={media:.1f}")
    print("-------------------\n")


# Test del programma
print("=== Test 1: Classe di Italiano ===")
italiano = aggiungi_voti("Marco", [7, 8, 6])
italiano = aggiungi_voti("Sara", [9, 8, 9])
stampa_report(italiano)

print("=== Test 2: Classe di Matematica ===")
matematica = aggiungi_voti("Luca", [6, 7, 5])
matematica = aggiungi_voti("Anna", [10, 9, 8])
stampa_report(matematica)

# Risultato atteso: la classe di matematica dovrebbe avere solo Luca e Anna.
# Risultato reale: ???
```

### Prompt esatto

```
Ho scritto questo programma Python per gestire i voti degli studenti.
Il Test 1 funziona bene, ma nel Test 2 succede qualcosa di strano:
nella classe di matematica compaiono anche Marco e Sara che sono
della classe di italiano.

Trova il bug, spiegami PERCHE' succede (non solo COSA succede),
e dammi il codice corretto.
```

**Nota per il presentatore**: incollare prima il codice nella sessione Claude Code (salvandolo come file o incollandolo nel prompt), poi aggiungere la domanda.

### Output atteso

Claude dovrebbe:
1. Identificare il bug: il parametro default `risultati: list = []` e' un *mutable default argument*
2. Spiegare il perche': in Python, i valori default dei parametri vengono creati una sola volta al momento della definizione della funzione, non a ogni chiamata. Quindi tutte le chiamate senza argomento esplicito condividono la stessa lista
3. Fornire il codice corretto con il pattern `None` / creazione interna:

```python
def aggiungi_voti(nome: str, nuovi_voti: list, risultati: list = None) -> list:
    """Aggiunge i voti di uno studente alla lista risultati."""
    if risultati is None:
        risultati = []
    risultati.append({"studente": nome, "voti": nuovi_voti})
    return risultati
```

### Talking points

Mentre Claude analizza:

> "Guardate: il bug non e' un errore di sintassi, il programma gira senza errori. E' un errore *logico*, il tipo piu' difficile da trovare. E' come un errore di grammatica che non viene sottolineato in rosso ma cambia il significato della frase."

Quando Claude spiega il mutable default argument:

> "Questo bug e' cosi' insidioso che c'e' un nome specifico per lui in Python. Programmatori professionisti con anni di esperienza ci cascano ancora. Claude lo ha trovato e spiegato in pochi secondi."

### Messaggio chiave

> "La macchina trova in secondi quello che vi farebbe perdere ore. Ma attenzione: dovete *capire* la spiegazione, non solo applicare la correzione. La prossima volta che incontrate questo bug, dovete saperlo riconoscere da soli."

### Fallback plan

Se Claude non identifica il bug correttamente (improbabile per questo classico):
- Mostrare l'output del programma eseguendolo: "Guardate, la classe di matematica ha 4 studenti invece di 2. Il bug e' nella riga 4. Qualcuno ha un'idea?" Poi rivelare la spiegazione.

Se gli studenti non programmano e sembrano persi:
- Semplificare: "Immaginatelo cosi': e' come se ogni nuova classe usasse lo stesso foglio del registro invece di uno nuovo. I nomi della classe precedente restano sul foglio."

---

## Demo 3 — L'assistente di studio perfetto (~4 min)

### Titolo per gli studenti
> "Costruiamo un tutor in 3 passi"

### Setup (30 secondi)

> "Adesso costruiamo qualcosa insieme. Vi faccio vedere come, con tre tentativi progressivi, potete trasformare una domanda generica in un assistente di studio personalizzato. E' prompt engineering in azione."

### Versione 1 — Il prompt generico (1 min)

> "Parto dalla domanda piu' semplice possibile."

```
Spiegami la fotosintesi
```

**Cosa aspettarsi**: una risposta corretta ma generica, tipo Wikipedia. Tono neutro, nessuna personalizzazione, probabilmente troppo lunga o troppo corta per le esigenze di uno studente.

**Commento del presentatore**:

> "Ok, la risposta e' corretta. Ma e' utile? E' come chiedere a un passante 'Dov'e' il centro?' senza dire in che citta' siete. La risposta sara' vaga."

### Versione 2 — Ruolo + pubblico + struttura (1 min)

> "Adesso aggiungo tre ingredienti: chi deve essere, per chi parla, e come deve organizzare la risposta."

```
Sei un professore di biologia che ama usare analogie dalla vita quotidiana.

Spiega la fotosintesi a uno studente di terza superiore che ha un'interrogazione domani. Organizza la spiegazione in:
1. Cosa succede (in parole semplici)
2. La formula chimica (spiegando ogni elemento)
3. Perche' e' importante per la vita sulla Terra
4. Un'analogia memorabile per ricordarla

Usa un tono incoraggiante ma preciso.
```

**Cosa aspettarsi**: risposta molto migliore, strutturata, con tono adatto. L'analogia rende il concetto memorabile.

**Commento del presentatore**:

> "Enorme differenza, vero? Stessa domanda di base, ma ora la risposta sembra una lezione privata. E non abbiamo ancora finito."

### Versione 3 — Few-shot + formato specifico (1.5 min)

> "L'ultimo passo: gli mostro *esattamente* come voglio che risponda, dandogli un esempio."

```
Sei un tutor di biologia per studenti di terza superiore. Il tuo metodo:
- Inizi sempre con una domanda che lo studente puo' gia' sapere
- Usi analogie dalla cucina o dallo sport
- Chiudi con una "domanda-trappola" che testa se lo studente ha davvero capito

Ecco un esempio del tuo stile:

ARGOMENTO: La cellula
DOMANDA INIZIALE: "Hai mai visto una fabbrica? Una con uffici, magazzini, operai... Ecco, la cellula funziona esattamente cosi'."
SPIEGAZIONE: Il nucleo e' l'ufficio del direttore (contiene le istruzioni). I ribosomi sono gli operai (producono le proteine). La membrana e' il muro di cinta (decide chi entra e chi esce). I mitocondri sono la centrale elettrica (producono energia).
ANALOGIA SPORTIVA: "Pensa a una squadra di calcio: il nucleo e' l'allenatore, i ribosomi sono i giocatori, la membrana e' il campo con le righe."
DOMANDA-TRAPPOLA: "Se i mitocondri smettessero di funzionare, la cellula morirebbe subito o lentamente? E perche'?"

---

Adesso usa lo stesso formato per spiegare: LA FOTOSINTESI
```

**Cosa aspettarsi**: risposta eccellente che segue esattamente il formato dell'esempio. Domanda iniziale coinvolgente, analogie concrete, domanda-trappola intelligente.

### Talking points (dopo la versione 3)

> "Guardate il percorso che abbiamo fatto. Versione 1: Wikipedia. Versione 2: lezione privata. Versione 3: tutor personalizzato con il vostro metodo preferito. Tre prompt, tre minuti, zero costo."

### Messaggio chiave

> "Avete appena costruito il vostro tutor personale. Potete farlo per qualsiasi materia, qualsiasi argomento. Il segreto non e' la tecnologia — e' la vostra capacita' di comunicare con precisione quello che volete."

### Fallback plan

Se una delle versioni non mostra un miglioramento chiaro rispetto alla precedente:
- "Ok, in questo caso la differenza e' meno evidente. Nella pratica, a volte il salto e' enorme, a volte meno. Il punto e' che *in media*, piu' contesto date, migliore e' il risultato. E' statistica, non magia."

Se il tempo stringe:
- Saltare la versione 2 e mostrare solo il contrasto tra versione 1 (generica) e versione 3 (few-shot). Il salto e' piu' drammatico e l'effetto wow e' uguale.

---

## Demo 4 — Analisi multidisciplinare (~4 min)

### Titolo per gli studenti
> "Un tema, quattro prospettive, zero fatica"

### Setup (30 secondi)

> "Ultima demo. Alla maturita' vi chiedono di fare collegamenti tra materie diverse. E' la parte piu' difficile: pensare a un tema da angolazioni diverse. Guardate cosa succede se chiediamo a Claude di farlo."

### Prompt esatto

```
Analizza il tema "cambiamento climatico" da 4 prospettive diverse, come se fossero 4 professori diversi che preparano uno studente per l'orale di maturita'.

Per ogni prospettiva, scrivi esattamente:
- Un fatto chiave con dati specifici (numeri, date, nomi)
- Un collegamento con un altro argomento del programma di quinta superiore
- Una domanda che il professore potrebbe fare all'orale

Le 4 prospettive:

🔬 **SCIENTIFICA** (professore di scienze)
Cause fisiche e chimiche, dati misurabili, effetti documentati.

💰 **ECONOMICA** (professore di economia/diritto)
Costi della transizione, opportunita' economiche, politiche internazionali.

🤔 **FILOSOFICA** (professore di filosofia)
Responsabilita' intergenerazionale, etica ambientale, rapporto uomo-natura.

🎨 **ARTISTICA** (professore di storia dell'arte/letteratura)
Come l'arte, la letteratura o il cinema hanno rappresentato il cambiamento climatico o il rapporto uomo-ambiente.

Scrivi in modo adatto a uno studente di quinta superiore. Sii specifico: nomi, date, opere, autori concreti.
```

### Output atteso

Claude dovrebbe produrre quattro sezioni ben distinte, ciascuna con:
- **Scientifica**: dati sull'aumento della CO2 (da ~280 ppm pre-industriale a ~420 ppm oggi), effetto serra, dati IPCC, collegamento con chimica organica o termodinamica
- **Economica**: accordi di Parigi, costi della transizione energetica, concetto di esternalita' negativa, green economy, collegamento con diritto internazionale
- **Filosofica**: Hans Jonas e il "principio responsabilita'", etica intergenerazionale, Heidegger sul rapporto tecnica-natura, collegamento con il programma di filosofia
- **Artistica**: land art (es. Christo), cinema (es. "Una scomoda verita'"), letteratura (es. Calvino e la natura, o "cli-fi"), collegamento con correnti artistiche studiate

### Talking points

All'inizio della generazione:

> "Notate una cosa: ho chiesto lo stesso formato per tutti e quattro. Fatto, collegamento, domanda. Questa struttura rende la risposta immediatamente utile per ripassare."

Quando appaiono le diverse sezioni:

> "Guardate: quattro professori diversi, quattro linguaggi diversi, quattro modi di vedere lo stesso problema. Il modello cambia registro, vocabolario e livello di astrazione in base alla disciplina."

### Messaggio chiave

> "Un solo strumento, infiniti punti di vista. Questa e' la versatilita'. E la cosa bella e' che questo non e' il punto di arrivo: e' il punto di partenza. Prendete questa analisi e approfondite il punto che vi interessa di piu'. Chiedete di espandere la parte filosofica. Chiedete un confronto tra due artisti. Iterate."

### Fallback plan

Se la risposta e' troppo lunga e il tempo scorre:
- Interrompere dopo la seconda prospettiva: "Vi faccio vedere le prime due per questioni di tempo. Il pattern e' chiaro: potete chiedere quante prospettive volete, su qualsiasi tema."

Se una sezione e' debole o generica:
- "Notate che la sezione artistica e' meno specifica delle altre. Questo ci dice qualcosa: il modello ha piu' dati su scienza e economia che su connessioni arte-clima. E' un limite reale, e sapere dove il modello e' debole e' una competenza importante."

Se Claude produce fatti imprecisi:
- "Ecco! Vedete quel dato? Andrebbe verificato. Ed e' esattamente per questo che nella Demo 1 abbiamo detto che l'IA e' un punto di partenza, non una fonte autorevole. Sempre verificare."

---

## Consigli per il presentatore

### Ritmo e pacing

- **Non leggere l'output ad alta voce**. Lasciare qualche secondo di silenzio mentre il testo appare, poi commentare i punti salienti. Gli studenti leggono piu' velocemente di quanto pensiate.
- **Guardare la platea, non lo schermo**. Il testo appare da solo. La vostra attenzione deve essere sugli studenti: chi e' colpito, chi e' scettico, chi ha domande.
- **Rispettare i tempi**. Se una demo si allunga, tagliare il commento, non il prompt. L'effetto wow viene dall'output, non dalla spiegazione.
- **Pause strategiche**. Dopo ogni messaggio chiave, fare una pausa di 2-3 secondi. Lasciare che il concetto si depositi.

### Coinvolgimento del pubblico

- **Prima della Demo 1**: "Qualcuno ha la maturita' quest'anno? Questo e' per voi."
- **Prima della Demo 2**: "Chi ha mai programmato? Anche solo un'ora? Anche solo Scratch?" (alzata di mano)
- **Dopo la Demo 3**: "Quale materia vorreste come tutor? Ditemi un argomento." (se c'e' tempo, fare un prompt improvvisato con il loro suggerimento)
- **Dopo la Demo 4**: "Quale prospettiva vi ha sorpreso di piu'?"

### Gestire l'imprevisto

| Situazione | Reazione |
|------------|----------|
| Output troppo lungo | Interrompere e commentare: "Vedete quanta roba? Il trucco e' chiedere di essere sintetico." |
| Output di bassa qualita' | "Ecco perche' il prompt engineering conta. Proviamo a riformulare..." |
| Claude rifiuta il prompt | "Vedete? Il modello ha dei paletti. Questo si chiama alignment." |
| Connessione internet cade | Passare agli screenshot salvati durante il test pre-presentazione. |
| Studenti chiedono di provare | "Ottima idea. Alla fine vi do 5 minuti per provare con i vostri prompt." |
| Studente dice "Ma allora non serve studiare" | "Hai appena visto un bisturi. Serve un chirurgo per usarlo, non il contrario." |

### Narrativa complessiva

Le 4 demo costruiscono un arco narrativo:
1. **Demo 1** (maturita'): l'IA come strumento di studio serio
2. **Demo 2** (debug): l'IA come strumento di lavoro professionale
3. **Demo 3** (tutor): la vostra capacita' di guidare l'IA fa la differenza
4. **Demo 4** (multidisciplinare): la versatilita' e' il vero superpotere

Il filo conduttore e': **non e' lo strumento che conta, e' come lo usate. E per usarlo bene, dovete sapere le cose. L'IA amplifica, non sostituisce.**

### Transizione dopo le demo

> "In quindici minuti abbiamo analizzato un testo per la maturita', fatto debugging di codice, costruito un tutor personalizzato e analizzato un tema da quattro prospettive diverse. Tutto con lo stesso strumento, tutto con il linguaggio naturale. Adesso la domanda importante: cosa ne fate voi di tutto questo?"
