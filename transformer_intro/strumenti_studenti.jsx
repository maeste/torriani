import { useState } from "react";

const COLORS = {
  bg: "#0a0e1a",
  card: "#0f1729",
  border: "#1e2d4a",
  accent: "#00d4ff",
  accent2: "#ff6b35",
  accent3: "#a855f7",
  accent4: "#22c55e",
  text: "#e2e8f0",
  muted: "#64748b",
  highlight: "#fbbf24",
};

const Section = ({ title, children, accent = COLORS.accent }) => (
  <div style={{
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "24px",
    marginBottom: 24,
    borderLeft: `3px solid ${accent}`,
  }}>
    <h2 style={{ color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
      {title}
    </h2>
    {children}
  </div>
);

const Tag = ({ children, color }) => (
  <span style={{
    background: `${color}22`,
    color: color,
    border: `1px solid ${color}44`,
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
    marginRight: 6,
  }}>{children}</span>
);

/* ── NotebookLM Flow Data ──────────────────────────────── */

const NOTEBOOK_STEPS = [
  { emoji: "\u{1F4DA}", label: "Carica i tuoi appunti/PDF", detail: "Carica fino a 50 fonti: appunti, PDF, slide, pagine web. NotebookLM indicizza tutto." },
  { emoji: "\u{1F916}", label: "L'IA li analizza e comprende", detail: "L'IA legge e comprende il contenuto usando RAG (Retrieval Augmented Generation). Non inventa: cerca solo nei TUOI documenti." },
  { emoji: "\u{1F3AF}", label: "Scegli il formato di output", detail: "Clicca su uno dei formati qui sotto per vedere cosa puoi ottenere." },
];

const NOTEBOOK_OUTPUTS = [
  { emoji: "\u{1F4DD}", label: "Riassunto", color: COLORS.accent, description: "Genera riassunti strutturati dei tuoi appunti, evidenziando i concetti chiave e le relazioni tra gli argomenti. Perfetto prima di un esame." },
  { emoji: "\u{2753}", label: "Quiz", color: COLORS.accent2, description: "Crea domande a risposta multipla e aperte basate SOLO sui tuoi materiali. Ideale per testare la tua preparazione." },
  { emoji: "\u{1F3A7}", label: "Podcast", color: COLORS.accent3, description: "Trasforma i tuoi appunti in una conversazione audio tra due conduttori che discutono gli argomenti. Perfetto per ripassare in autobus!" },
  { emoji: "\u{2754}", label: "Domande", color: COLORS.accent4, description: "Genera domande di comprensione profonda per verificare se hai davvero capito i concetti, non solo memorizzato." },
];

/* ── Tutor Mode Data ───────────────────────────────────── */

const TUTOR_PROMPTS = [
  { text: "Non darmi la risposta, guidami passo per passo", emoji: "\u{1F9ED}" },
  { text: "Fammi domande per verificare se ho capito", emoji: "\u{2753}" },
  { text: "Spiegami come se avessi 15 anni", emoji: "\u{1F4A1}" },
  { text: "Dammi un'analogia dalla vita quotidiana", emoji: "\u{1F50D}" },
  { text: "Quali errori fanno spesso gli studenti su questo?", emoji: "\u{26A0}\u{FE0F}" },
];

/* ── Research Tools Data ───────────────────────────────── */

const RESEARCH_TOOLS = [
  {
    name: "Perplexity",
    emoji: "\u{1F50E}",
    color: COLORS.accent,
    tagline: "Ricerca con fonti citate",
    description: "Motore di ricerca IA che mostra SEMPRE da dove vengono le informazioni. Ogni risposta ha link alle fonti originali, cos\u00EC puoi verificare tutto.",
    bestFor: "Ricerche scolastiche, verificare fatti, trovare fonti affidabili",
    pricing: "Gratuito (base) / Pro 20$/mese",
    keyFeature: "Ogni affermazione ha una citazione verificabile",
  },
  {
    name: "Consensus",
    emoji: "\u{1F52C}",
    color: COLORS.accent4,
    tagline: "Cerca negli articoli scientifici",
    description: "Cerca in milioni di paper scientifici e mostra il consenso della ricerca. Ti dice se gli scienziati sono d'accordo o in disaccordo su un tema.",
    bestFor: "Tesine, ricerche scientifiche, verificare claim controversi",
    pricing: "Gratuito (limitato) / Premium per studenti",
    keyFeature: "Mostra la percentuale di studi a favore/contro",
  },
  {
    name: "Connected Papers",
    emoji: "\u{1F578}\u{FE0F}",
    color: COLORS.accent3,
    tagline: "Mappa visuale delle pubblicazioni",
    description: "Inserisci un paper scientifico e ottieni una mappa visuale di tutti i paper collegati. Vedi le connessioni tra le ricerche come una rete.",
    bestFor: "Esplorare un campo di ricerca, trovare paper correlati, capire l'evoluzione di un tema",
    pricing: "Gratuito (5 grafi/mese) / Premium",
    keyFeature: "Grafo interattivo delle relazioni tra pubblicazioni",
  },
  {
    name: "Elicit",
    emoji: "\u{1F4CA}",
    color: COLORS.highlight,
    tagline: "Assistente di ricerca IA",
    description: "Fai una domanda di ricerca e Elicit trova i paper pi\u00F9 rilevanti, estrae i risultati chiave e li organizza in tabelle comparative.",
    bestFor: "Literature review, confrontare studi, estrarre dati da paper",
    pricing: "Gratuito (limitato) / Plus per studenti",
    keyFeature: "Estrae automaticamente metodi, risultati e conclusioni",
  },
];

/* ── Ethics Data ───────────────────────────────────────── */

const TUTOR_ITEMS = [
  { text: "Chiedere spiegazioni", emoji: "\u{1F4D6}" },
  { text: "Farsi guidare passo per passo", emoji: "\u{1F9ED}" },
  { text: "Verificare la propria comprensione", emoji: "\u2705" },
  { text: "Imparare il metodo di studio", emoji: "\u{1F4A1}" },
  { text: "Riformulare con parole proprie", emoji: "\u270D\u{FE0F}" },
];

const GHOST_ITEMS = [
  { text: "Copiare risposte", emoji: "\u274C" },
  { text: "Generare temi e saggi", emoji: "\u{1F6AB}" },
  { text: "Far fare i compiti all'IA", emoji: "\u{1F645}" },
  { text: "Zero apprendimento reale", emoji: "\u{1F4AD}" },
  { text: "Dipendenza dallo strumento", emoji: "\u26D3\u{FE0F}" },
];

const DETECTION_TOOLS = [
  { name: "Turnitin", desc: "Usato dalla maggior parte delle universit\u00E0 italiane" },
  { name: "GPTZero", desc: "Rileva testo generato da IA con alta precisione" },
  { name: "Compilatio", desc: "Integrato in molte piattaforme scolastiche europee" },
];

/* ── RabbitHole Data ───────────────────────────────────── */

const RABBIT_TOPICS = [
  {
    title: "RAG: Come funziona NotebookLM",
    emoji: "\u{1F9E0}",
    color: COLORS.accent,
    content: "RAG (Retrieval Augmented Generation) \u00E8 la tecnica che permette a NotebookLM di rispondere SOLO basandosi sui tuoi documenti. Funziona in 3 fasi: 1) I tuoi documenti vengono spezzati in chunk e trasformati in vettori numerici (embedding). 2) Quando fai una domanda, l'IA cerca i chunk pi\u00F9 rilevanti usando la similarit\u00E0 tra vettori. 3) I chunk trovati vengono passati al modello linguistico come contesto, insieme alla tua domanda. Risultato: l'IA risponde usando SOLO le informazioni nei tuoi documenti, riducendo drasticamente le allucinazioni.",
  },
  {
    title: "Validare le risposte dell'IA",
    emoji: "\u{1F50D}",
    color: COLORS.accent2,
    content: "Come verificare se l'IA ti sta dicendo la verit\u00E0? Regola 1: Chiedi le fonti \u2014 un'IA affidabile cita da dove prende le informazioni. Regola 2: Cross-reference \u2014 verifica su almeno 2-3 fonti diverse. Regola 3: Controlla le date \u2014 l'IA potrebbe avere informazioni obsolete. Regola 4: Attenzione ai numeri \u2014 le IA spesso inventano statistiche precise. Regola 5: Se sembra troppo perfetto, probabilmente \u00E8 inventato. Il pensiero critico \u00E8 la skill pi\u00F9 importante dell'era IA.",
  },
  {
    title: "Prompt Engineering per lo Studio",
    emoji: "\u{1F3AF}",
    color: COLORS.accent3,
    content: "Tecniche avanzate per usare l'IA come tutor: Chain-of-Thought: 'Ragiona passo per passo prima di rispondere'. Few-Shot: 'Ecco un esempio di come vorrei la risposta: [esempio]. Ora fai lo stesso per [argomento]'. Persona: 'Sei un professore di fisica del liceo, spiegami [concetto] come faresti a lezione'. Metacognizione: 'Dopo la spiegazione, dimmi quali sono i malintesi pi\u00F9 comuni su questo argomento'. Socratic: 'Non rispondere direttamente, fammi arrivare alla risposta con domande guidate'.",
  },
  {
    title: "AI Literacy: Competenza Fondamentale",
    emoji: "\u{1F310}",
    color: COLORS.accent4,
    content: "L'AI Literacy \u00E8 la capacit\u00E0 di capire, usare e valutare criticamente gli strumenti IA. Non significa saper programmare, ma: capire COSA pu\u00F2 e cosa NON pu\u00F2 fare l'IA; riconoscere quando l'IA sbaglia o ha bias; scegliere lo strumento giusto per ogni compito; usare l'IA per amplificare le proprie capacit\u00E0, non sostituirle. Il World Economic Forum la indica come una delle competenze fondamentali per il 2030. Chi la padroneggia avr\u00E0 un vantaggio competitivo enorme nel mondo del lavoro.",
  },
];

/* ══════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════ */

export default function App() {
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [tutorMode, setTutorMode] = useState("normale");
  const [selectedTool, setSelectedTool] = useState(null);
  const [ethicsView, setEthicsView] = useState("tutor");
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [expandedRabbit, setExpandedRabbit] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  return (
    <div style={{
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      minHeight: "100vh",
      padding: "32px 24px",
      maxWidth: 900,
      margin: "0 auto",
    }}>

      {/* ── Header ─────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: 3, marginBottom: 8 }}>
          SESSIONE 3 &middot; ATTO 3
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 8px 0", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          La Cassetta degli Attrezzi
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, margin: 0 }}>
          Gli strumenti IA che ogni studente dovrebbe conoscere
        </p>
      </div>

      {/* ══ Section 1: NotebookLM ══════════════════════════ */}
      <Section title="NotebookLM \u2014 Il Tutor che Conosce i Tuoi Libri" accent={COLORS.accent}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          <Tag color={COLORS.accent}>Google</Tag>
          <Tag color={COLORS.accent4}>Gratuito</Tag>
          Carica i tuoi appunti, PDF o slide e ottieni riassunti, quiz e persino podcast.
          La particolarit&agrave;: usa <strong style={{ color: COLORS.highlight }}>SOLO i tuoi materiali</strong>, non inventa nulla al di fuori di essi.
        </p>

        {/* Interactive Flow */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          {NOTEBOOK_STEPS.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                background: activeStep === i ? `${COLORS.accent}15` : "transparent",
                border: `1px solid ${activeStep === i ? COLORS.accent : COLORS.border}`,
                borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: activeStep === i ? COLORS.accent : COLORS.border,
                color: activeStep === i ? COLORS.bg : COLORS.text,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>
                  {step.emoji} {step.label}
                </div>
                {activeStep === i && (
                  <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>
                    {step.detail}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Output Format Selector */}
        <div style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, letterSpacing: 1 }}>
          FORMATI DI OUTPUT
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          {NOTEBOOK_OUTPUTS.map((out, i) => (
            <button
              key={i}
              onClick={() => setSelectedOutput(selectedOutput === i ? null : i)}
              style={{
                background: selectedOutput === i ? `${out.color}20` : `${COLORS.bg}`,
                border: `1px solid ${selectedOutput === i ? out.color : COLORS.border}`,
                borderRadius: 8, padding: "12px 8px", cursor: "pointer",
                transition: "all 0.2s", textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 4 }}>{out.emoji}</div>
              <div style={{ color: selectedOutput === i ? out.color : COLORS.text, fontSize: 12, fontWeight: 600 }}>
                {out.label}
              </div>
            </button>
          ))}
        </div>

        {selectedOutput !== null && (
          <div style={{
            background: `${NOTEBOOK_OUTPUTS[selectedOutput].color}10`,
            border: `1px solid ${NOTEBOOK_OUTPUTS[selectedOutput].color}44`,
            borderRadius: 8, padding: "16px",
            animation: "fadeIn 0.2s ease",
          }}>
            <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              {NOTEBOOK_OUTPUTS[selectedOutput].description}
            </p>
          </div>
        )}

        {/* Key Point */}
        <div style={{
          background: `${COLORS.accent4}10`,
          border: `1px solid ${COLORS.accent4}44`,
          borderRadius: 8, padding: "12px 16px", marginTop: 16,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>{"\u{1F6E1}\u{FE0F}"}</span>
          <span style={{ color: COLORS.accent4, fontSize: 13, fontWeight: 500 }}>
            Zero allucinazioni: NotebookLM risponde SOLO con informazioni dai tuoi documenti.
          </span>
        </div>
      </Section>

      {/* ══ Section 2: Learning Mode ═══════════════════════ */}
      <Section title="Learning Mode \u2014 L'IA come Tutor Socratico" accent={COLORS.accent2}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Claude, ChatGPT e Gemini possono funzionare come tutor socratici: invece di darti la risposta,
          ti <strong style={{ color: COLORS.accent2 }}>guidano a trovarla da solo</strong>.
        </p>

        {/* Mode Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["normale", "tutor"].map((mode) => (
            <button
              key={mode}
              onClick={() => setTutorMode(mode)}
              style={{
                flex: 1,
                background: tutorMode === mode
                  ? (mode === "normale" ? `${COLORS.muted}30` : `${COLORS.accent2}20`)
                  : "transparent",
                border: `2px solid ${tutorMode === mode
                  ? (mode === "normale" ? COLORS.muted : COLORS.accent2)
                  : COLORS.border}`,
                borderRadius: 8, padding: "12px", cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div style={{
                color: tutorMode === mode
                  ? (mode === "normale" ? COLORS.text : COLORS.accent2)
                  : COLORS.muted,
                fontWeight: 700, fontSize: 14, textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {mode === "normale" ? "\u{1F4AC} Modalit\u00E0 Normale" : "\u{1F393} Modalit\u00E0 Tutor"}
              </div>
            </button>
          ))}
        </div>

        {/* Conversation Simulation */}
        <div style={{
          background: COLORS.bg, borderRadius: 8,
          border: `1px solid ${COLORS.border}`, padding: "16px",
          marginBottom: 20,
        }}>
          {/* Student Question */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
            <div style={{
              background: `${COLORS.accent}20`, border: `1px solid ${COLORS.accent}44`,
              borderRadius: "12px 12px 4px 12px", padding: "10px 14px", maxWidth: "70%",
            }}>
              <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 4 }}>{"\u{1F9D1}\u200D\u{1F393}"} Studente</div>
              <div style={{ color: COLORS.text, fontSize: 14 }}>Qual &egrave; la capitale della Francia?</div>
            </div>
          </div>

          {/* AI Response */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              background: tutorMode === "normale" ? `${COLORS.muted}15` : `${COLORS.accent2}15`,
              border: `1px solid ${tutorMode === "normale" ? COLORS.muted + "44" : COLORS.accent2 + "44"}`,
              borderRadius: "12px 12px 12px 4px", padding: "10px 14px", maxWidth: "75%",
              transition: "all 0.3s",
            }}>
              <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 4 }}>{"\u{1F916}"} IA</div>
              {tutorMode === "normale" ? (
                <div style={{ color: COLORS.text, fontSize: 14 }}>
                  La capitale della Francia &egrave; <strong>Parigi</strong>.
                </div>
              ) : (
                <div style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6 }}>
                  <span style={{ color: COLORS.accent2 }}>Buona domanda!</span> Ragioniamoci insieme:{"\n"}
                  <br />
                  {"\u{1F914}"} Cosa sai gi&agrave; della Francia? Quale citt&agrave; &egrave; famosa per la Torre Eiffel?
                  <br />
                  {"\u{1F4A1}"} Pensa anche: qual &egrave; la citt&agrave; francese pi&ugrave; grande e sede del governo?
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Prompt Templates */}
        <div style={{ color: COLORS.muted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10, letterSpacing: 1 }}>
          PROMPT TEMPLATE PER STUDENTI
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {TUTOR_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(prompt.text).then(() => {
                    setCopiedPrompt(i);
                    setTimeout(() => setCopiedPrompt(null), 1500);
                  });
                }
              }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                background: copiedPrompt === i ? `${COLORS.accent4}15` : COLORS.bg,
                border: `1px solid ${copiedPrompt === i ? COLORS.accent4 : COLORS.border}`,
                borderRadius: 6, padding: "10px 14px", cursor: "pointer",
                transition: "all 0.2s", textAlign: "left",
              }}
            >
              <span style={{ fontSize: 18 }}>{prompt.emoji}</span>
              <span style={{ color: COLORS.text, fontSize: 13, flex: 1, fontStyle: "italic" }}>
                &ldquo;{prompt.text}&rdquo;
              </span>
              <span style={{ color: copiedPrompt === i ? COLORS.accent4 : COLORS.muted, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                {copiedPrompt === i ? "\u2705 copiato!" : "click = copia"}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* ══ Section 3: Strumenti di Ricerca ════════════════ */}
      <Section title="Strumenti di Ricerca IA" accent={COLORS.accent3}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Oltre a Google, esistono strumenti di ricerca potenziati dall&apos;IA che citano le fonti
          e cercano direttamente nella letteratura scientifica.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {RESEARCH_TOOLS.map((tool, i) => (
            <button
              key={i}
              onClick={() => setSelectedTool(selectedTool === i ? null : i)}
              style={{
                background: selectedTool === i ? `${tool.color}12` : COLORS.bg,
                border: `1px solid ${selectedTool === i ? tool.color : COLORS.border}`,
                borderRadius: 10, padding: "16px", cursor: "pointer",
                transition: "all 0.25s", textAlign: "left",
                gridColumn: selectedTool === i ? "1 / -1" : "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{tool.emoji}</span>
                <div>
                  <div style={{ color: tool.color, fontWeight: 700, fontSize: 16 }}>{tool.name}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12 }}>{tool.tagline}</div>
                </div>
              </div>

              {selectedTool === i && (
                <div style={{ marginTop: 8 }}>
                  <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.6, margin: "0 0 10px 0" }}>
                    {tool.description}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Tag color={COLORS.accent4}>Ideale per</Tag>
                      <span style={{ color: COLORS.text, fontSize: 12 }}>{tool.bestFor}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <Tag color={COLORS.highlight}>Prezzo</Tag>
                      <span style={{ color: COLORS.text, fontSize: 12 }}>{tool.pricing}</span>
                    </div>
                    <div style={{
                      background: `${tool.color}10`, border: `1px solid ${tool.color}33`,
                      borderRadius: 6, padding: "8px 12px", marginTop: 4,
                    }}>
                      <span style={{ color: tool.color, fontSize: 12, fontWeight: 600 }}>
                        {"\u2B50"} {tool.keyFeature}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* ══ Section 4: Etica e Uso Responsabile ════════════ */}
      <div style={{
        background: COLORS.card,
        border: `2px solid ${COLORS.highlight}`,
        borderRadius: 12,
        padding: "28px 24px",
        marginBottom: 24,
        position: "relative",
        boxShadow: `0 0 30px ${COLORS.highlight}15`,
      }}>
        {/* Prominent Badge */}
        <div style={{
          position: "absolute", top: -14, left: 24,
          background: COLORS.highlight, color: COLORS.bg,
          padding: "4px 16px", borderRadius: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12, fontWeight: 800, letterSpacing: 2,
        }}>
          {"\u26A0\u{FE0F}"} FONDAMENTALE
        </div>

        <h2 style={{
          color: COLORS.highlight,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 16, letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 20, marginTop: 8,
        }}>
          Etica e Uso Responsabile
        </h2>

        {/* Tutor vs Ghostwriter Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["tutor", "ghostwriter"].map((view) => (
            <button
              key={view}
              onClick={() => setEthicsView(view)}
              style={{
                flex: 1,
                background: ethicsView === view
                  ? (view === "tutor" ? `${COLORS.accent4}20` : "#ef444420")
                  : "transparent",
                border: `2px solid ${ethicsView === view
                  ? (view === "tutor" ? COLORS.accent4 : "#ef4444")
                  : COLORS.border}`,
                borderRadius: 10, padding: "14px", cursor: "pointer",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>
                {view === "tutor" ? "\u{1F393}" : "\u{1F47B}"}
              </div>
              <div style={{
                color: ethicsView === view
                  ? (view === "tutor" ? COLORS.accent4 : "#ef4444")
                  : COLORS.muted,
                fontWeight: 800, fontSize: 16,
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {view === "tutor" ? "TUTOR" : "GHOSTWRITER"}
              </div>
              <div style={{
                color: COLORS.muted, fontSize: 11, marginTop: 4,
              }}>
                {view === "tutor"
                  ? "L'IA ti aiuta a CAPIRE"
                  : "L'IA fa il lavoro AL POSTO TUO"}
              </div>
            </button>
          ))}
        </div>

        {/* Content based on view */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16,
          marginBottom: 24,
        }}>
          {/* TUTOR column */}
          <div style={{
            background: ethicsView === "tutor" ? `${COLORS.accent4}10` : COLORS.bg,
            border: `1px solid ${ethicsView === "tutor" ? COLORS.accent4 : COLORS.border}`,
            borderRadius: 10, padding: "16px",
            transition: "all 0.3s",
            opacity: ethicsView === "ghostwriter" ? 0.5 : 1,
          }}>
            <div style={{ color: COLORS.accent4, fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              {"\u2705"} USO CORRETTO
            </div>
            {TUTOR_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 0", borderBottom: i < TUTOR_ITEMS.length - 1 ? `1px solid ${COLORS.border}` : "none",
              }}>
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
                <span style={{ color: COLORS.text, fontSize: 13 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* GHOSTWRITER column */}
          <div style={{
            background: ethicsView === "ghostwriter" ? "#ef444410" : COLORS.bg,
            border: `1px solid ${ethicsView === "ghostwriter" ? "#ef4444" : COLORS.border}`,
            borderRadius: 10, padding: "16px",
            transition: "all 0.3s",
            opacity: ethicsView === "tutor" ? 0.5 : 1,
          }}>
            <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
              {"\u274C"} USO SCORRETTO
            </div>
            {GHOST_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 0", borderBottom: i < GHOST_ITEMS.length - 1 ? `1px solid ${COLORS.border}` : "none",
              }}>
                <span style={{ fontSize: 16 }}>{item.emoji}</span>
                <span style={{ color: COLORS.text, fontSize: 13 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why AI copying is WORSE */}
        <div style={{
          background: "#ef444412",
          border: `2px solid #ef444466`,
          borderRadius: 10, padding: "20px",
          marginBottom: 20,
        }}>
          <div style={{
            color: "#ef4444", fontWeight: 800, fontSize: 15, marginBottom: 14,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            {"\u{1F6A8}"} PERCH\u00C9 COPIARE CON L&apos;IA \u00C8 PEGGIO CHE COPIARE SENZA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#ef4444", fontSize: 18, flexShrink: 0 }}>{"\u{1F9E0}"}</span>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>Non impari E crei dipendenza</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>Chi copia da un compagno almeno deve capire cosa sta copiando. Con l&apos;IA non serve neanche quello.</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#ef4444", fontSize: 18, flexShrink: 0 }}>{"\u{1F50D}"}</span>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>I professori se ne accorgono</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>Il testo generato dall&apos;IA ha pattern riconoscibili: troppo perfetto, struttura prevedibile, mancanza di voce personale.</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#ef4444", fontSize: 18, flexShrink: 0 }}>{"\u{1F399}\u{FE0F}"}</span>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14 }}>Al colloquio orale non avrai ChatGPT</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>Alla maturit&agrave;, al colloquio di lavoro, all&apos;universit&agrave; &mdash; dovrai dimostrare di sapere davvero.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Tools */}
        <div style={{
          background: COLORS.bg, borderRadius: 8,
          border: `1px solid ${COLORS.border}`, padding: "14px 16px",
        }}>
          <div style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 10 }}>
            {"\u{1F6E1}\u{FE0F}"} STRUMENTI ANTI-PLAGIO IA IN USO NELLE SCUOLE
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {DETECTION_TOOLS.map((tool, i) => (
              <div key={i} style={{
                background: `${COLORS.highlight}10`,
                border: `1px solid ${COLORS.highlight}33`,
                borderRadius: 6, padding: "8px 12px", flex: "1 1 200px",
              }}>
                <div style={{ color: COLORS.highlight, fontWeight: 700, fontSize: 13 }}>{tool.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>{tool.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Message Box */}
        <div style={{
          marginTop: 20,
          background: `linear-gradient(135deg, ${COLORS.accent4}15, ${COLORS.accent}15)`,
          border: `2px solid ${COLORS.accent4}`,
          borderRadius: 10, padding: "20px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{"\u{1F3AF}"}</div>
          <div style={{
            color: COLORS.accent4, fontWeight: 800, fontSize: 18,
            fontFamily: "'JetBrains Mono', monospace", marginBottom: 8,
          }}>
            L&apos;IA migliore &egrave; quella che ti rende pi&ugrave; intelligente,
            <br />non quella che pensa al posto tuo.
          </div>
          <div style={{ color: COLORS.muted, fontSize: 13 }}>
            Usa l&apos;IA per amplificare le tue capacit&agrave;, non per sostituirle.
          </div>
        </div>
      </div>

      {/* ══ RabbitHole: Deep Dive ══════════════════════════ */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${rabbitHoleOpen ? COLORS.accent3 : COLORS.border}`,
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
        transition: "all 0.3s",
      }}>
        <button
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            width: "100%",
            background: rabbitHoleOpen ? `${COLORS.accent3}10` : "transparent",
            border: "none", padding: "18px 24px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>{"\u{1F407}"}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{
                color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, fontWeight: 700, letterSpacing: 2,
              }}>
                RABBIT HOLE &mdash; DEEP DIVE
              </div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>
                Per chi vuole saperne di pi&ugrave;
              </div>
            </div>
          </div>
          <span style={{
            color: COLORS.accent3, fontSize: 20,
            transform: rabbitHoleOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}>
            {"\u25BC"}
          </span>
        </button>

        {rabbitHoleOpen && (
          <div style={{ padding: "0 24px 24px 24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RABBIT_TOPICS.map((topic, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpandedRabbit(expandedRabbit === i ? null : i)}
                    style={{
                      width: "100%",
                      background: expandedRabbit === i ? `${topic.color}12` : COLORS.bg,
                      border: `1px solid ${expandedRabbit === i ? topic.color : COLORS.border}`,
                      borderRadius: 8, padding: "12px 16px", cursor: "pointer",
                      display: "flex", alignItems: "center", gap: 10,
                      transition: "all 0.2s", textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{topic.emoji}</span>
                    <span style={{ color: expandedRabbit === i ? topic.color : COLORS.text, fontWeight: 600, fontSize: 14, flex: 1 }}>
                      {topic.title}
                    </span>
                    <span style={{
                      color: topic.color, fontSize: 14,
                      transform: expandedRabbit === i ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}>
                      {"\u25B6"}
                    </span>
                  </button>
                  {expandedRabbit === i && (
                    <div style={{
                      background: `${topic.color}08`,
                      border: `1px solid ${topic.color}33`,
                      borderTop: "none",
                      borderRadius: "0 0 8px 8px",
                      padding: "16px",
                    }}>
                      <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
                        {topic.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "16px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <p style={{ color: COLORS.muted, fontSize: 12, margin: 0 }}>
          Sessione 3 &middot; Atto 3 &mdash; La Cassetta degli Attrezzi dello Studente IA
        </p>
      </div>
    </div>
  );
}
