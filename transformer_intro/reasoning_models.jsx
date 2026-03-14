import { useState } from "react";

const COLORS = {
  bg: "#0a0e1a", card: "#0f1729", border: "#1e2d4a",
  accent: "#00d4ff", accent2: "#ff6b35", accent3: "#a855f7",
  accent4: "#22c55e", text: "#e2e8f0", muted: "#64748b",
  highlight: "#fbbf24",
};

const Section = ({ title, children, accent = COLORS.accent }) => (
  <div style={{ marginBottom: 32, padding: "24px 28px", background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${accent}` }}>
    <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: accent, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>{title}</h2>
    {children}
  </div>
);

const Tag = ({ children, color }) => (
  <span style={{
    display: "inline-block", background: `${color}22`, color, border: `1px solid ${color}44`,
    borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 600, margin: "0 4px",
    fontFamily: "'JetBrains Mono', monospace",
  }}>{children}</span>
);

const REASONING_MODELS = [
  {
    id: "o1",
    name: "o1 / o3",
    maker: "OpenAI",
    emoji: "🟢",
    color: COLORS.accent4,
    feature: "Primo grande modello di ragionamento. Pensa in una \"catena di pensiero nascosta\" prima di rispondere.",
    released: "o1: Set 2024 · o3: Gen 2025",
    open: false,
    details: "Addestrato con reinforcement learning per generare catene di ragionamento interne. o3 migliora drasticamente su benchmark matematici e di coding. La catena di pensiero non viene mostrata all'utente, ma il modello la usa internamente per arrivare a risposte migliori.",
  },
  {
    id: "claude",
    name: "Claude Extended Thinking",
    maker: "Anthropic",
    emoji: "🟠",
    color: COLORS.accent2,
    feature: "Mostra il processo di ragionamento in modo trasparente. L'utente vede i \"pensieri\" del modello.",
    released: "Mar 2025",
    open: false,
    details: "Claude usa un budget di token dedicato al ragionamento. A differenza di o1, il pensiero esteso viene mostrato all'utente, rendendo il processo trasparente e verificabile. Permette di controllare quanto tempo il modello 'pensa' prima di rispondere.",
  },
  {
    id: "deepseek",
    name: "DeepSeek-R1",
    maker: "DeepSeek",
    emoji: "🔵",
    color: COLORS.accent,
    feature: "Open source! Addestrato con RLVR (Reinforcement Learning with Verifiable Rewards).",
    released: "Gen 2025",
    open: true,
    details: "Ha dimostrato che il ragionamento emerge naturalmente dal reinforcement learning con ricompense verificabili (come la correttezza matematica). Il modello ha 'scoperto' da solo la catena di pensiero durante l'addestramento, senza che gliela insegnassero esplicitamente. Pesi aperti e paper pubblico.",
  },
  {
    id: "gemini",
    name: "Gemini Thinking",
    maker: "Google",
    emoji: "🟣",
    color: COLORS.accent3,
    feature: "Ragionamento integrato nell'ecosistema Google. Pensiero strutturato con accesso a strumenti.",
    released: "Dic 2024",
    open: false,
    details: "Gemini 2.0 Flash Thinking integra il ragionamento in un modello veloce. Combina il pensiero strutturato con la capacità di usare strumenti (ricerca, codice, ecc.). Approccio multimodale: può ragionare anche su immagini e video.",
  },
];

const TASK_CATEGORIES = [
  {
    id: "math",
    label: "Problemi di matematica",
    emoji: "🧮",
    recommendation: "reasoning",
    reason: "I problemi multi-step richiedono ragionamento strutturato per evitare errori.",
  },
  {
    id: "logic",
    label: "Puzzle logici",
    emoji: "🧩",
    recommendation: "reasoning",
    reason: "La logica formale beneficia enormemente dal pensiero passo per passo.",
  },
  {
    id: "debug",
    label: "Debugging del codice",
    emoji: "🐛",
    recommendation: "reasoning",
    reason: "Trovare bug richiede analisi sistematica di causa-effetto.",
  },
  {
    id: "analysis",
    label: "Analisi complessa",
    emoji: "📊",
    recommendation: "reasoning",
    reason: "Confrontare molte variabili richiede organizzazione mentale.",
  },
  {
    id: "creative",
    label: "Scrittura creativa",
    emoji: "✍️",
    recommendation: "standard",
    reason: "La creatività fluisce meglio senza vincoli di ragionamento rigido.",
  },
  {
    id: "translate",
    label: "Traduzione",
    emoji: "🌍",
    recommendation: "standard",
    reason: "La traduzione standard non richiede ragionamento multi-step.",
  },
  {
    id: "chat",
    label: "Conversazione semplice",
    emoji: "💬",
    recommendation: "standard",
    reason: "Domande semplici non necessitano di pensiero deliberato.",
  },
  {
    id: "summary",
    label: "Riassunto di un testo",
    emoji: "📝",
    recommendation: "standard",
    reason: "Riassumere è una capacità base dei modelli linguistici.",
  },
];

const BENCHMARKS = [
  { name: "MATH", desc: "Problemi di matematica competitiva (algebra, geometria, teoria dei numeri)", icon: "🧮" },
  { name: "GPQA", desc: "Domande graduate-level in fisica, chimica, biologia — difficili anche per PhD", icon: "🎓" },
  { name: "ARC-AGI", desc: "Ragionamento astratto su pattern visivi — test di intelligenza fluida", icon: "🧩" },
  { name: "HumanEval", desc: "Generazione di codice funzionante da specifiche — test per coding", icon: "💻" },
];

const COT_STEPS = [
  { step: 1, text: "15 mele totali", icon: "🍎", color: COLORS.accent },
  { step: 2, text: "Mattina: vende 1/3 = 5 mele → restano 10", icon: "🌅", color: COLORS.accent2 },
  { step: 3, text: "Pomeriggio: vende 2/5 di 10 = 4 mele → restano 6", icon: "🌇", color: COLORS.accent3 },
  { step: 4, text: "Risposta: 6 mele ✓", icon: "✅", color: COLORS.accent4 },
];

export default function App() {
  const [mode, setMode] = useState("standard");
  const [cotMode, setCotMode] = useState("without");
  const [cotStep, setCotStep] = useState(0);
  const [expandedModel, setExpandedModel] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      maxWidth: 900,
      margin: "0 auto",
      padding: "32px 24px",
    }}>
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 13, color: COLORS.muted, letterSpacing: 3, fontWeight: 600, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
          SESSIONE 2 · ATTO 3
        </div>
        <h1 style={{ fontSize: 38, fontWeight: 800, margin: "8px 0", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Quando l'IA Ragiona
        </h1>
        <p style={{ fontSize: 17, color: COLORS.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          Modelli che <strong style={{ color: COLORS.highlight }}>pensano prima di rispondere</strong>: la nuova frontiera dell'intelligenza artificiale
        </p>
      </div>

      {/* SECTION 1: EVOLUTION */}
      <Section title="L'Evoluzione — Da 'Prossimo Token' a 'Pensa Prima'" accent={COLORS.accent}>
        <p style={{ fontSize: 15, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
          I primi LLM generavano la risposta <Tag color={COLORS.accent}>un token alla volta</Tag>, senza mai fermarsi a ragionare.
          I nuovi modelli dedicano tempo a <Tag color={COLORS.accent3}>pensare</Tag> prima di rispondere.
        </p>

        {/* Toggle */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 28, borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.border}`, width: "fit-content", margin: "0 auto 28px" }}>
          {["standard", "reasoning"].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              padding: "10px 28px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              background: mode === m ? (m === "standard" ? COLORS.accent : COLORS.accent3) : "transparent",
              color: mode === m ? COLORS.bg : COLORS.muted,
              transition: "all 0.3s ease",
            }}>
              {m === "standard" ? "Standard" : "Reasoning"}
            </button>
          ))}
        </div>

        {/* Visual paths */}
        <div style={{
          background: `${COLORS.bg}aa`,
          borderRadius: 12,
          padding: 28,
          border: `1px solid ${COLORS.border}`,
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.4s ease",
        }}>
          {mode === "standard" ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ padding: "12px 20px", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`, borderRadius: 10, fontWeight: 600, fontSize: 15 }}>
                📥 Input
              </div>
              <div style={{ fontSize: 28, color: COLORS.accent, animation: "none" }}>→</div>
              <div style={{ padding: "12px 20px", background: `${COLORS.accent}22`, border: `1px solid ${COLORS.accent}44`, borderRadius: 10, fontWeight: 600, fontSize: 15 }}>
                📤 Output
              </div>
              <div style={{ width: "100%", textAlign: "center", marginTop: 12 }}>
                <Tag color={COLORS.accent}>Veloce</Tag>
                <Tag color={COLORS.muted}>Nessun ragionamento esplicito</Tag>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ padding: "12px 20px", background: `${COLORS.accent3}22`, border: `1px solid ${COLORS.accent3}44`, borderRadius: 10, fontWeight: 600, fontSize: 15 }}>
                📥 Input
              </div>
              <div style={{ fontSize: 24, color: COLORS.accent3 }}>→</div>
              <div style={{
                padding: "12px 20px",
                background: `${COLORS.highlight}15`,
                border: `1px dashed ${COLORS.highlight}66`,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                color: COLORS.highlight,
                animation: "pulse 2s ease-in-out infinite",
              }}>
                🧠 Thinking...
              </div>
              <div style={{ fontSize: 24, color: COLORS.accent3 }}>→</div>
              <div style={{
                padding: "12px 20px",
                background: `${COLORS.highlight}15`,
                border: `1px dashed ${COLORS.highlight}66`,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 14,
                color: COLORS.highlight,
                animation: "pulse 2s ease-in-out infinite 0.5s",
              }}>
                🧠 Thinking...
              </div>
              <div style={{ fontSize: 24, color: COLORS.accent3 }}>→</div>
              <div style={{ padding: "12px 20px", background: `${COLORS.accent4}22`, border: `1px solid ${COLORS.accent4}44`, borderRadius: 10, fontWeight: 600, fontSize: 15, color: COLORS.accent4 }}>
                ✅ Output
              </div>
              <div style={{ width: "100%", textAlign: "center", marginTop: 12 }}>
                <Tag color={COLORS.accent3}>Deliberato</Tag>
                <Tag color={COLORS.highlight}>Ragionamento multi-step</Tag>
                <Tag color={COLORS.accent4}>Più accurato</Tag>
              </div>
            </div>
          )}
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </Section>

      {/* SECTION 2: CHAIN OF THOUGHT */}
      <Section title="Chain of Thought — Pensare Passo per Passo" accent={COLORS.highlight}>
        <p style={{ fontSize: 15, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
          La tecnica <strong style={{ color: COLORS.highlight }}>Chain of Thought</strong> (catena di pensiero) permette al modello
          di scomporre un problema in passaggi intermedi, riducendo gli errori.
        </p>

        {/* Problem */}
        <div style={{
          background: `${COLORS.bg}cc`,
          borderRadius: 10,
          padding: 20,
          border: `1px solid ${COLORS.border}`,
          marginBottom: 20,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>PROBLEMA</div>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, margin: 0, color: COLORS.text }}>
            "Un negozio ha <strong style={{ color: COLORS.accent }}>15 mele</strong>. Ne vende <strong style={{ color: COLORS.accent2 }}>1/3 la mattina</strong> e{" "}
            <strong style={{ color: COLORS.accent3 }}>2/5 di quelle rimaste</strong> il pomeriggio. Quante mele restano?"
          </p>
        </div>

        {/* Toggle CoT */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center", marginBottom: 24, borderRadius: 10, overflow: "hidden", border: `1px solid ${COLORS.border}`, width: "fit-content", margin: "0 auto 24px" }}>
          {[
            { key: "without", label: "Senza CoT" },
            { key: "with", label: "Con CoT" },
          ].map(({ key, label }) => (
            <button key={key} onClick={() => { setCotMode(key); if (key === "with") setCotStep(0); }} style={{
              padding: "10px 24px", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600,
              fontFamily: "'JetBrains Mono', monospace",
              background: cotMode === key ? COLORS.highlight : "transparent",
              color: cotMode === key ? COLORS.bg : COLORS.muted,
              transition: "all 0.3s ease",
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Answer area */}
        <div style={{
          background: `${COLORS.bg}aa`,
          borderRadius: 12,
          padding: 24,
          border: `1px solid ${cotMode === "with" ? COLORS.accent4 + "66" : COLORS.accent2 + "66"}`,
          minHeight: 140,
          transition: "all 0.3s ease",
        }}>
          {cotMode === "without" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>RISPOSTA DIRETTA (senza ragionamento)</div>
              <div style={{
                fontSize: 28,
                fontWeight: 700,
                color: COLORS.accent2,
                padding: "16px 0",
              }}>
                "Restano 4 mele"
              </div>
              <div style={{
                display: "inline-block",
                background: `${COLORS.accent2}22`,
                border: `1px solid ${COLORS.accent2}44`,
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 14,
                color: COLORS.accent2,
                marginTop: 8,
              }}>
                ❌ Sbagliato! Il modello ha "indovinato" senza ragionare
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>RAGIONAMENTO PASSO PER PASSO</div>
              {COT_STEPS.map((s, i) => (
                <div key={s.step} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "12px 16px",
                  marginBottom: 8,
                  background: i <= cotStep ? `${s.color}15` : `${COLORS.bg}66`,
                  border: `1px solid ${i <= cotStep ? s.color + "44" : COLORS.border}`,
                  borderRadius: 10,
                  opacity: i <= cotStep ? 1 : 0.3,
                  transition: "all 0.4s ease",
                  transform: i <= cotStep ? "translateX(0)" : "translateX(20px)",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: i <= cotStep ? `${s.color}33` : COLORS.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                    border: `2px solid ${i <= cotStep ? s.color : "transparent"}`,
                    transition: "all 0.3s ease",
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: 12, color: s.color, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                      STEP {s.step}
                    </span>
                    <div style={{ fontSize: 15, fontWeight: 500, color: i <= cotStep ? COLORS.text : COLORS.muted }}>
                      {s.text}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: "center", marginTop: 16 }}>
                {cotStep < COT_STEPS.length - 1 ? (
                  <button onClick={() => setCotStep(cotStep + 1)} style={{
                    padding: "10px 24px",
                    background: `${COLORS.accent4}22`,
                    border: `1px solid ${COLORS.accent4}66`,
                    borderRadius: 10,
                    color: COLORS.accent4,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    transition: "all 0.2s ease",
                  }}>
                    Prossimo passo →
                  </button>
                ) : (
                  <div style={{
                    display: "inline-block",
                    background: `${COLORS.accent4}22`,
                    border: `1px solid ${COLORS.accent4}44`,
                    borderRadius: 8,
                    padding: "8px 16px",
                    fontSize: 14,
                    color: COLORS.accent4,
                  }}>
                    ✅ Corretto! Il ragionamento strutturato porta alla risposta giusta
                  </div>
                )}
                {cotStep > 0 && cotStep < COT_STEPS.length - 1 && (
                  <button onClick={() => setCotStep(0)} style={{
                    padding: "10px 16px", background: "transparent", border: `1px solid ${COLORS.border}`,
                    borderRadius: 10, color: COLORS.muted, fontSize: 13, cursor: "pointer", marginLeft: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    Ricomincia
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* SECTION 3: THE MODELS */}
      <Section title="I Modelli — Chi Ragiona Oggi?" accent={COLORS.accent3}>
        <p style={{ fontSize: 15, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
          Nel 2024-2025 diversi laboratori hanno rilasciato modelli specializzati nel ragionamento.
          Clicca su ciascuno per scoprire i dettagli.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {REASONING_MODELS.map((model) => {
            const isExpanded = expandedModel === model.id;
            return (
              <div key={model.id} onClick={() => setExpandedModel(isExpanded ? null : model.id)} style={{
                background: isExpanded ? `${model.color}10` : `${COLORS.bg}aa`,
                border: `1px solid ${isExpanded ? model.color + "66" : COLORS.border}`,
                borderRadius: 12,
                padding: 20,
                cursor: "pointer",
                transition: "all 0.3s ease",
                gridColumn: isExpanded ? "1 / -1" : "auto",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 22 }}>{model.emoji}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: model.color }}>{model.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>{model.maker}</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Tag color={model.open ? COLORS.accent4 : COLORS.accent2}>
                      {model.open ? "Open Source" : "Closed"}
                    </Tag>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.5, margin: "0 0 8px 0" }}>
                  {model.feature}
                </p>
                <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                  📅 {model.released}
                </div>
                {isExpanded && (
                  <div style={{
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: `1px solid ${model.color}33`,
                    fontSize: 14,
                    color: COLORS.muted,
                    lineHeight: 1.7,
                    animation: "fadeIn 0.3s ease",
                  }}>
                    {model.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </Section>

      {/* SECTION 4: WHEN TO USE */}
      <Section title="Quando Usarlo? — Guida Interattiva" accent={COLORS.accent4}>
        <p style={{ fontSize: 15, color: COLORS.muted, marginBottom: 20, lineHeight: 1.6 }}>
          Il ragionamento non serve sempre! Seleziona un tipo di attività per scoprire se conviene
          usare un modello <Tag color={COLORS.accent3}>reasoning</Tag> o <Tag color={COLORS.accent}>standard</Tag>.
        </p>

        {/* Task grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          {TASK_CATEGORIES.map((task) => {
            const isSelected = selectedTask === task.id;
            const isReasoning = task.recommendation === "reasoning";
            const taskColor = isReasoning ? COLORS.accent3 : COLORS.accent;
            return (
              <button key={task.id} onClick={() => setSelectedTask(isSelected ? null : task.id)} style={{
                padding: "14px 8px",
                background: isSelected ? `${taskColor}22` : `${COLORS.bg}aa`,
                border: `1px solid ${isSelected ? taskColor + "66" : COLORS.border}`,
                borderRadius: 10,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                color: isSelected ? taskColor : COLORS.muted,
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{task.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3 }}>{task.label}</div>
              </button>
            );
          })}
        </div>

        {/* Recommendation */}
        {selectedTask && (() => {
          const task = TASK_CATEGORIES.find((t) => t.id === selectedTask);
          const isReasoning = task.recommendation === "reasoning";
          const recColor = isReasoning ? COLORS.accent3 : COLORS.accent;
          return (
            <div style={{
              background: `${recColor}10`,
              border: `1px solid ${recColor}44`,
              borderRadius: 12,
              padding: 20,
              marginBottom: 20,
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{task.emoji}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: recColor }}>
                    {task.label}
                  </div>
                  <Tag color={recColor}>
                    {isReasoning ? "🧠 Usa Reasoning" : "⚡ Usa Standard"}
                  </Tag>
                </div>
              </div>
              <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, margin: 0 }}>
                {task.reason}
              </p>
            </div>
          );
        })()}

        {/* Prompting tips */}
        <div style={{
          background: `${COLORS.bg}aa`,
          borderRadius: 10,
          padding: 20,
          border: `1px solid ${COLORS.border}`,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.highlight, marginBottom: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            💡 PROMPTING TIPS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { prompt: '"Pensa passo per passo"', desc: "Attiva il ragionamento esplicito" },
              { prompt: '"Ragiona prima di rispondere"', desc: "Forza il pensiero deliberato" },
              { prompt: '"Mostra il tuo ragionamento"', desc: "Rende trasparente il processo" },
              { prompt: '"Verifica la tua risposta"', desc: "Aggiunge auto-correzione" },
            ].map((tip, i) => (
              <div key={i} style={{
                padding: "10px 14px",
                background: `${COLORS.highlight}10`,
                border: `1px solid ${COLORS.highlight}22`,
                borderRadius: 8,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.highlight, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                  {tip.prompt}
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DEEP DIVE / RABBIT HOLE */}
      <div style={{ marginBottom: 32 }}>
        <button onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)} style={{
          width: "100%",
          padding: "18px 28px",
          background: rabbitHoleOpen ? `${COLORS.accent2}15` : COLORS.card,
          border: `1px solid ${rabbitHoleOpen ? COLORS.accent2 + "66" : COLORS.border}`,
          borderRadius: 16,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: COLORS.text,
          transition: "all 0.3s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🐇</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent2 }}>
                Rabbit Hole — Per i più curiosi
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>
                Test-time compute, RLVR, benchmark, e i limiti del ragionamento
              </div>
            </div>
          </div>
          <span style={{
            fontSize: 18, color: COLORS.accent2, transition: "transform 0.3s ease",
            transform: rabbitHoleOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}>
            ▶
          </span>
        </button>

        {rabbitHoleOpen && (
          <div style={{
            padding: "24px 28px",
            background: COLORS.card,
            borderRadius: "0 0 16px 16px",
            borderLeft: `3px solid ${COLORS.accent2}`,
            border: `1px solid ${COLORS.border}`,
            borderTop: "none",
            animation: "fadeIn 0.3s ease",
          }}>
            {/* Test-Time Compute */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 10 }}>
                ⏱️ Test-Time Compute
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 12px 0" }}>
                Tradizionalmente, si investiva compute (potenza di calcolo) solo durante l'<strong style={{ color: COLORS.text }}>addestramento</strong>.
                I reasoning models introducono un cambio di paradigma: si spende compute anche durante l'<strong style={{ color: COLORS.highlight }}>inferenza</strong> (quando il modello risponde).
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1, padding: 14, background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}33`, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>PRIMA</div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>Tanto compute in training → risposta istantanea</div>
                </div>
                <div style={{ flex: 1, padding: 14, background: `${COLORS.accent3}10`, border: `1px solid ${COLORS.accent3}33`, borderRadius: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent3, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>ORA</div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>Tanto compute in training + compute extra per pensare</div>
                </div>
              </div>
            </div>

            {/* RLVR Connection */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 10 }}>
                🔗 Connessione con RLVR
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: 0 }}>
                Ricordate il <strong style={{ color: COLORS.accent4 }}>Reinforcement Learning</strong> della slide precedente?
                DeepSeek-R1 ha dimostrato qualcosa di straordinario: usando <strong style={{ color: COLORS.highlight }}>ricompense verificabili</strong> (la risposta matematica è giusta o sbagliata),
                il modello ha <em>spontaneamente sviluppato</em> la catena di pensiero. Nessuno glielo ha insegnato esplicitamente:
                il ragionamento è <strong style={{ color: COLORS.accent2 }}>emerso</strong> dall'addestramento RL.
              </p>
            </div>

            {/* Benchmarks */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 14 }}>
                📊 I Benchmark del Ragionamento
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {BENCHMARKS.map((b) => (
                  <div key={b.name} style={{
                    padding: 14,
                    background: `${COLORS.bg}aa`,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 18 }}>{b.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, fontFamily: "'JetBrains Mono', monospace" }}>{b.name}</span>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.5 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Limits */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 10 }}>
                🤔 I Modelli Ragionano Davvero?
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 12px 0" }}>
                Questa è la grande domanda. Ci sono due posizioni:
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 1, padding: 14, background: `${COLORS.accent4}10`, border: `1px solid ${COLORS.accent4}33`, borderRadius: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent4, marginBottom: 8 }}>
                    "Sì, è ragionamento"
                  </div>
                  <ul style={{ fontSize: 12, color: COLORS.muted, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
                    <li>Risolvono problemi mai visti</li>
                    <li>Generalizzano a nuovi domini</li>
                    <li>La catena di pensiero emerge spontaneamente</li>
                  </ul>
                </div>
                <div style={{ flex: 1, padding: 14, background: `${COLORS.accent2}10`, border: `1px solid ${COLORS.accent2}33`, borderRadius: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent2, marginBottom: 8 }}>
                    "No, è simulazione"
                  </div>
                  <ul style={{ fontSize: 12, color: COLORS.muted, margin: 0, paddingLeft: 16, lineHeight: 1.6 }}>
                    <li>Pattern matching sofisticato</li>
                    <li>Falliscono su varianti banali</li>
                    <li>Nessuna comprensione causale vera</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AGI Connection */}
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 10 }}>
                🌟 Connessione con AGI
              </h3>
              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: 0 }}>
                I reasoning models sono un passo verso l'<strong style={{ color: COLORS.accent3 }}>AGI</strong>?
                Alcuni ricercatori pensano di sì: il ragionamento è la capacità cognitiva chiave che mancava.
                Altri sono scettici: risolvere problemi di matematica non equivale a comprendere il mondo.
                Una cosa è certa: la distanza tra IA ristretta e IA generale si sta riducendo, e modelli come o3
                segnano <strong style={{ color: COLORS.highlight }}>i punteggi più alti mai visti</strong> su benchmark
                progettati per misurare l'intelligenza generale (come ARC-AGI).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", padding: "16px 0 8px", borderTop: `1px solid ${COLORS.border}` }}>
        <p style={{ fontSize: 12, color: COLORS.muted, margin: 0 }}>
          Sessione 2 · Atto 3 — Quando l'IA Ragiona
        </p>
      </div>
    </div>
  );
}
