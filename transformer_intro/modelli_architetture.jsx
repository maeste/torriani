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

const RED = "#ef4444";

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

const MODEL_CATEGORIES = [
  {
    id: "piccoli",
    label: "Piccoli",
    range: "1 — 7B",
    params: 4,
    color: COLORS.accent4,
    icon: "\ud83d\udcf1",
    hardware: "Telefono / Laptop",
    examples: ["Phi-3 (3.8B)", "Gemma-2 (2B)", "Llama-3.2 (3B)"],
    useCases: "Chatbot locali, riassunti, classificazione testi, assistenti personali offline",
    vram: "2 — 8 GB",
  },
  {
    id: "medi",
    label: "Medi",
    range: "7 — 70B",
    params: 35,
    color: COLORS.accent2,
    icon: "\ud83d\udda5\ufe0f",
    hardware: "1-2 GPU dedicate",
    examples: ["Llama-3 70B", "Mixtral 8x7B", "Qwen-72B"],
    useCases: "Coding assistant, analisi documenti, traduzione professionale, RAG aziendale",
    vram: "16 — 80 GB",
  },
  {
    id: "grandi",
    label: "Grandi",
    range: "70B — 1.8T+",
    params: 900,
    color: COLORS.accent3,
    icon: "\u2601\ufe0f",
    hardware: "Cluster cloud / Data center",
    examples: ["GPT-4 (~1.8T)", "Claude 3.5", "Gemini Ultra"],
    useCases: "Ragionamento complesso, ricerca, creativita' avanzata, agenti autonomi",
    vram: "Centinaia di GB — TB",
  },
];

const COST_ITEMS = [
  { label: "Inference (per query)", cost: "~$0.001 — $0.05", color: COLORS.accent4, width: 4 },
  { label: "Fine-tuning", cost: "~$100 — $1.000", color: COLORS.accent, width: 15 },
  { label: "Training modello piccolo", cost: "~$10K — $100K", color: COLORS.accent2, width: 45 },
  { label: "Training scala GPT-4", cost: "~$100M+", color: COLORS.accent3, width: 100 },
];

const LOCAL_TOOLS = [
  {
    id: "ollama",
    name: "Ollama",
    icon: "\ud83e\uddec",
    color: COLORS.accent4,
    difficulty: "Facile",
    desc: "Il modo piu' semplice. Un comando nel terminale e sei pronto.",
    command: "ollama run llama3",
    pros: ["Un solo comando", "Gestione automatica modelli", "API REST inclusa"],
    cons: ["Solo terminale", "Meno opzioni avanzate"],
  },
  {
    id: "lmstudio",
    name: "LM Studio",
    icon: "\ud83d\udda5\ufe0f",
    color: COLORS.accent,
    difficulty: "Facilissimo",
    desc: "Interfaccia grafica completa. Scarica, clicca, chatta.",
    command: null,
    pros: ["GUI intuitiva", "Download integrato", "Chat visuale"],
    cons: ["Piu' pesante", "Closed source"],
  },
  {
    id: "llamacpp",
    name: "llama.cpp",
    icon: "\u26a1",
    color: COLORS.accent2,
    difficulty: "Avanzato",
    desc: "Prestazioni massime. Scritto in C++, il piu' veloce e flessibile.",
    command: "./main -m model.gguf -p \"Ciao!\"",
    pros: ["Massime prestazioni", "Quantizzazione avanzata", "Altamente configurabile"],
    cons: ["Richiede compilazione", "Curva di apprendimento"],
  },
];

const TRADEOFF_ROWS = [
  { label: "Costo", icon: "\ud83d\udcb0" },
  { label: "Privacy", icon: "\ud83d\udd12" },
  { label: "Qualita'", icon: "\u2b50" },
  { label: "Velocita'", icon: "\u26a1" },
  { label: "Offline", icon: "\ud83d\udcf4" },
  { label: "Personalizzazione", icon: "\ud83d\udd27" },
];

const TRADEOFF_COLS = [
  { label: "Cloud (grande)", sub: "GPT-4, Claude" },
  { label: "Cloud (API piccola)", sub: "GPT-4o-mini" },
  { label: "Locale (GPU)", sub: "70B quantizzato" },
  { label: "Locale (CPU)", sub: "7B quantizzato" },
];

// 3 = green, 2 = yellow, 1 = red
const TRADEOFF_DATA = [
  [1, 3, 2, 3], // Costo
  [1, 1, 3, 3], // Privacy
  [3, 2, 2, 1], // Qualita'
  [3, 3, 2, 1], // Velocita'
  [1, 1, 3, 3], // Offline
  [1, 2, 3, 3], // Personalizzazione
];

const TRADEOFF_COLORS = { 3: COLORS.accent4, 2: COLORS.highlight, 1: RED };
const TRADEOFF_LABELS = { 3: "Ottimo", 2: "Medio", 1: "Scarso" };

const MOE_EXPERTS = [
  "Matematica", "Codice", "Lingua", "Logica",
  "Scienza", "Creativita'", "Traduzione", "Analisi",
];

const QUANT_LEVELS = [
  { bits: 32, label: "FP32", size: "100%", quality: "Perfetta", color: COLORS.accent4 },
  { bits: 16, label: "FP16 / BF16", size: "50%", quality: "Quasi perfetta", color: COLORS.accent },
  { bits: 8, label: "INT8", size: "25%", quality: "Molto buona", color: COLORS.highlight },
  { bits: 4, label: "INT4 / GPTQ", size: "12.5%", quality: "Buona (piccole perdite)", color: COLORS.accent2 },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTool, setSelectedTool] = useState(0);
  const [highlightCol, setHighlightCol] = useState(null);
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [moeActive, setMoeActive] = useState([0, 2, 5]);
  const [quantLevel, setQuantLevel] = useState(0);
  const [terminalVisible, setTerminalVisible] = useState(false);

  const logScale = (v) => Math.log10(v + 1) * 25;

  return (
    <div style={{
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: "32px 24px",
      maxWidth: 900,
      margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 2 · Atto 4
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Sotto il Cofano
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Cosa c'e' dentro un modello di IA: dimensioni, costi, hardware e come farlo girare sul tuo computer
        </p>
      </div>

      {/* ============ SECTION 1: Lo Spettro delle Dimensioni ============ */}
      <Section title="Lo Spettro delle Dimensioni" accent={COLORS.accent}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20 }}>
          I modelli linguistici variano enormemente: da pochi miliardi a migliaia di miliardi di parametri.
          Clicca su una categoria per esplorare.
        </p>

        {/* Size bar visualization */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 24, height: 120, padding: "0 12px" }}>
          {MODEL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{
                fontSize: 11,
                color: cat.color,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 4,
                fontWeight: selectedCategory === cat.id ? 700 : 400,
              }}>
                {cat.range}
              </div>
              <div style={{
                width: "100%",
                height: logScale(cat.params),
                background: selectedCategory === cat.id
                  ? `linear-gradient(180deg, ${cat.color}, ${cat.color}66)`
                  : `${cat.color}44`,
                borderRadius: "6px 6px 0 0",
                border: selectedCategory === cat.id ? `2px solid ${cat.color}` : `1px solid ${cat.color}44`,
                transition: "all 0.3s ease",
                minHeight: 12,
              }} />
              <div style={{
                background: cat.color + "22",
                border: `1px solid ${cat.color}44`,
                borderRadius: "0 0 6px 6px",
                padding: "6px 8px",
                width: "100%",
                textAlign: "center",
              }}>
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: cat.color }}>{cat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category cards */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {MODEL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              style={{
                flex: 1,
                background: selectedCategory === cat.id ? `${cat.color}22` : COLORS.bg,
                border: `1px solid ${selectedCategory === cat.id ? cat.color : COLORS.border}`,
                borderRadius: 8,
                padding: "10px 12px",
                cursor: "pointer",
                color: selectedCategory === cat.id ? cat.color : COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: selectedCategory === cat.id ? 700 : 400,
                transition: "all 0.2s ease",
              }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Expanded detail */}
        {selectedCategory && (() => {
          const cat = MODEL_CATEGORIES.find((c) => c.id === selectedCategory);
          return (
            <div style={{
              background: COLORS.bg,
              border: `1px solid ${cat.color}44`,
              borderRadius: 8,
              padding: 16,
              animation: "fadeIn 0.3s ease",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <span style={{ fontSize: 20, marginRight: 8 }}>{cat.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: cat.color }}>{cat.label}</span>
                  <span style={{ color: COLORS.muted, fontSize: 13, marginLeft: 8 }}>({cat.range} parametri)</span>
                </div>
                <Tag color={cat.color}>{cat.hardware}</Tag>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.muted, fontSize: 12 }}>VRAM necessaria: </span>
                <span style={{ color: cat.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{cat.vram}</span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.muted, fontSize: 12 }}>Esempi: </span>
                {cat.examples.map((ex, i) => (
                  <Tag key={i} color={cat.color}>{ex}</Tag>
                ))}
              </div>
              <p style={{ color: COLORS.text, fontSize: 14, margin: 0 }}>
                <strong style={{ color: cat.color }}>Casi d'uso:</strong> {cat.useCases}
              </p>
            </div>
          );
        })()}
      </Section>

      {/* ============ SECTION 2: L'Hardware ============ */}
      <Section title="L'Hardware — Quanto Costa l'IA" accent={COLORS.accent2}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20 }}>
          Addestrare e far girare modelli richiede hardware specializzato. Ecco i costi reali.
        </p>

        {/* GPU Card */}
        <div style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.accent2}44`,
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
          display: "flex",
          gap: 16,
          alignItems: "center",
          flexWrap: "wrap",
        }}>
          <div style={{
            width: 80,
            height: 100,
            background: `linear-gradient(135deg, ${COLORS.accent2}33, ${COLORS.accent3}33)`,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            border: `1px solid ${COLORS.accent2}44`,
            flexShrink: 0,
          }}>
            {"\ud83d\udd33"}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent2, marginBottom: 6 }}>
              NVIDIA A100 / H100
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              <Tag color={COLORS.accent2}>80 GB VRAM</Tag>
              <Tag color={COLORS.accent3}>~$30.000 / unita'</Tag>
              <Tag color={COLORS.accent}>312 TFLOPS (FP16)</Tag>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, margin: 0 }}>
              Le GPU piu' usate per l'IA. La VRAM (Video RAM) e' il collo di bottiglia:
              i parametri del modello devono stare tutti in memoria durante l'inferenza.
            </p>
          </div>
        </div>

        {/* VRAM explanation */}
        <div style={{
          background: `${COLORS.accent}11`,
          border: `1px solid ${COLORS.accent}33`,
          borderRadius: 8,
          padding: 14,
          marginBottom: 20,
        }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.accent, marginBottom: 8 }}>
            PERCHE' SERVE TANTA MEMORIA?
          </div>
          <p style={{ fontSize: 13, color: COLORS.text, margin: "0 0 8px" }}>
            Ogni parametro occupa spazio in memoria. Un modello da <strong style={{ color: COLORS.highlight }}>70 miliardi</strong> di parametri
            in precisione FP16 richiede circa <strong style={{ color: COLORS.accent2 }}>140 GB</strong> di VRAM — quasi 2 GPU A100.
          </p>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: COLORS.highlight, background: "#000", padding: "8px 12px", borderRadius: 6 }}>
            VRAM = Parametri x Byte per parametro (FP16 = 2 byte)
          </div>
        </div>

        {/* Cost infographic */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.muted, marginBottom: 10 }}>
          SCALA DEI COSTI
        </div>
        {COST_ITEMS.map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: COLORS.text }}>{item.label}</span>
              <span style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{item.cost}</span>
            </div>
            <div style={{ background: COLORS.bg, borderRadius: 4, height: 10, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
              <div style={{
                width: `${item.width}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                borderRadius: 4,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        ))}
      </Section>

      {/* ============ SECTION 3: Modelli Locali ============ */}
      <Section title="Modelli Locali — L'IA sul Tuo Computer" accent={COLORS.accent4}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 12 }}>
          Non serve il cloud. Puoi far girare modelli di IA direttamente sul tuo computer.
        </p>

        {/* Why it matters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {[
            { icon: "\ud83d\udd12", text: "Privacy totale" },
            { icon: "\ud83d\udcf4", text: "Funziona offline" },
            { icon: "\ud83d\udcb0", text: "Zero costi" },
            { icon: "\ud83c\udf93", text: "Impari come funziona" },
          ].map((item, i) => (
            <div key={i} style={{
              background: `${COLORS.accent4}11`,
              border: `1px solid ${COLORS.accent4}33`,
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 13,
              color: COLORS.accent4,
            }}>
              {item.icon} {item.text}
            </div>
          ))}
        </div>

        {/* Tool selector tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {LOCAL_TOOLS.map((tool, i) => (
            <button
              key={tool.id}
              onClick={() => { setSelectedTool(i); setTerminalVisible(false); }}
              style={{
                flex: 1,
                background: selectedTool === i ? `${tool.color}22` : COLORS.bg,
                border: `1px solid ${selectedTool === i ? tool.color : COLORS.border}`,
                borderRadius: 8,
                padding: "10px",
                cursor: "pointer",
                color: selectedTool === i ? tool.color : COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                fontWeight: selectedTool === i ? 700 : 400,
                transition: "all 0.2s ease",
              }}
            >
              {tool.icon} {tool.name}
              <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>{tool.difficulty}</div>
            </button>
          ))}
        </div>

        {/* Tool detail */}
        {(() => {
          const tool = LOCAL_TOOLS[selectedTool];
          return (
            <div style={{
              background: COLORS.bg,
              border: `1px solid ${tool.color}44`,
              borderRadius: 8,
              padding: 16,
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: tool.color, marginBottom: 8 }}>
                {tool.icon} {tool.name}
              </div>
              <p style={{ color: COLORS.text, fontSize: 14, margin: "0 0 12px" }}>{tool.desc}</p>

              <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: COLORS.accent4, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>PRO</div>
                  {tool.pros.map((p, i) => (
                    <div key={i} style={{ fontSize: 13, color: COLORS.text, marginBottom: 2 }}>+ {p}</div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: RED, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>CONTRO</div>
                  {tool.cons.map((c, i) => (
                    <div key={i} style={{ fontSize: 13, color: COLORS.muted, marginBottom: 2 }}>- {c}</div>
                  ))}
                </div>
              </div>

              {/* Terminal demo */}
              {tool.command && (
                <div>
                  <button
                    onClick={() => setTerminalVisible(!terminalVisible)}
                    style={{
                      background: "transparent",
                      border: `1px solid ${tool.color}44`,
                      borderRadius: 6,
                      color: tool.color,
                      padding: "6px 12px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontFamily: "'JetBrains Mono', monospace",
                      marginBottom: terminalVisible ? 8 : 0,
                    }}
                  >
                    {terminalVisible ? "\u25bc" : "\u25b6"} Vedi nel terminale
                  </button>
                  {terminalVisible && (
                    <div style={{
                      background: "#000",
                      borderRadius: 8,
                      padding: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      border: `1px solid ${COLORS.border}`,
                    }}>
                      <div style={{ color: COLORS.muted, marginBottom: 6 }}>$ {tool.command}</div>
                      <div style={{ color: COLORS.accent4 }}>{"\u2588"} Modello in esecuzione...</div>
                      <div style={{ color: COLORS.text, marginTop: 8 }}>
                        {">"} Ciao! Sono un modello locale. Come posso aiutarti?
                      </div>
                      <div style={{ color: COLORS.muted, marginTop: 6, fontSize: 11 }}>
                        Tutto gira sul tuo computer. Nessun dato esce dalla tua rete.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}
      </Section>

      {/* ============ SECTION 4: Il Trade-off ============ */}
      <Section title="Il Trade-off — Matrice Decisionale" accent={COLORS.highlight}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 16 }}>
          Cloud o locale? Grande o piccolo? Ogni scelta ha pro e contro.
          Passa il mouse sulle colonne per confrontare.
        </p>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 2, fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 10px", color: COLORS.muted, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                  Criterio
                </th>
                {TRADEOFF_COLS.map((col, ci) => (
                  <th
                    key={ci}
                    onClick={() => setHighlightCol(highlightCol === ci ? null : ci)}
                    style={{
                      textAlign: "center",
                      padding: "8px 6px",
                      cursor: "pointer",
                      background: highlightCol === ci ? `${COLORS.accent}22` : "transparent",
                      borderRadius: 6,
                      transition: "all 0.2s ease",
                      minWidth: 100,
                    }}
                  >
                    <div style={{ color: highlightCol === ci ? COLORS.accent : COLORS.text, fontSize: 12, fontWeight: 600 }}>
                      {col.label}
                    </div>
                    <div style={{ color: COLORS.muted, fontSize: 10 }}>{col.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRADEOFF_ROWS.map((row, ri) => (
                <tr key={ri}>
                  <td style={{ padding: "8px 10px", color: COLORS.text, fontWeight: 500 }}>
                    {row.icon} {row.label}
                  </td>
                  {TRADEOFF_DATA[ri].map((val, ci) => (
                    <td
                      key={ci}
                      onClick={() => setHighlightCol(highlightCol === ci ? null : ci)}
                      style={{
                        textAlign: "center",
                        padding: "6px",
                        cursor: "pointer",
                        background: highlightCol === ci
                          ? `${TRADEOFF_COLORS[val]}22`
                          : `${TRADEOFF_COLORS[val]}11`,
                        borderRadius: 4,
                        transition: "all 0.2s ease",
                        border: highlightCol === ci ? `1px solid ${TRADEOFF_COLORS[val]}66` : "1px solid transparent",
                      }}
                    >
                      <div style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: TRADEOFF_COLORS[val],
                        marginRight: 4,
                      }} />
                      <span style={{ color: TRADEOFF_COLORS[val], fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                        {TRADEOFF_LABELS[val]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 12, justifyContent: "center" }}>
          {[
            { color: COLORS.accent4, label: "Ottimo" },
            { color: COLORS.highlight, label: "Medio" },
            { color: RED, label: "Scarso" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: COLORS.muted }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </Section>

      {/* ============ DEEP DIVE: Rabbit Hole ============ */}
      <div style={{
        border: `1px solid ${COLORS.accent3}44`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
      }}>
        <button
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            width: "100%",
            background: rabbitHoleOpen ? `${COLORS.accent3}22` : COLORS.card,
            border: "none",
            padding: "16px 24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: COLORS.accent3,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>{"\ud83d\udc07"} Rabbit Hole — Tecniche Avanzate</span>
          <span style={{ fontSize: 18, transition: "transform 0.3s ease", transform: rabbitHoleOpen ? "rotate(180deg)" : "rotate(0)" }}>
            {"\u25bc"}
          </span>
        </button>

        {rabbitHoleOpen && (
          <div style={{ padding: 24, background: COLORS.card, borderTop: `1px solid ${COLORS.accent3}33` }}>

            {/* MoE */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent3, marginBottom: 8 }}>
                Mixture of Experts (MoE)
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
                Esempio: <strong style={{ color: COLORS.accent }}>Mixtral 8x7B</strong> ha 47B parametri totali,
                ma solo <strong style={{ color: COLORS.accent4 }}>~13B sono attivi</strong> per ogni token.
                Un "router" sceglie quali esperti attivare.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {MOE_EXPERTS.map((expert, i) => {
                  const isActive = moeActive.includes(i);
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (isActive) {
                          setMoeActive(moeActive.filter((x) => x !== i));
                        } else if (moeActive.length < 3) {
                          setMoeActive([...moeActive, i]);
                        } else {
                          setMoeActive([...moeActive.slice(1), i]);
                        }
                      }}
                      style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        cursor: "pointer",
                        background: isActive ? `${COLORS.accent3}33` : COLORS.bg,
                        border: `1px solid ${isActive ? COLORS.accent3 : COLORS.border}`,
                        color: isActive ? COLORS.accent3 : COLORS.muted,
                        transition: "all 0.2s ease",
                        boxShadow: isActive ? `0 0 12px ${COLORS.accent3}33` : "none",
                      }}
                    >
                      {isActive ? "\ud83d\udfe2" : "\u26ab"} {expert}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                Clicca per attivare/disattivare esperti (max 3 attivi alla volta) — Attivi: {moeActive.length}/3
              </div>
            </div>

            {/* Quantization */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent2, marginBottom: 8 }}>
                Quantizzazione — Comprimere i Modelli
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
                Ridurre la precisione dei numeri per usare meno memoria, con minime perdite di qualita'.
              </p>
              <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                {QUANT_LEVELS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuantLevel(i)}
                    style={{
                      flex: 1,
                      background: quantLevel === i ? `${q.color}22` : COLORS.bg,
                      border: `1px solid ${quantLevel === i ? q.color : COLORS.border}`,
                      borderRadius: 6,
                      padding: "8px 4px",
                      cursor: "pointer",
                      color: quantLevel === i ? q.color : COLORS.muted,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: quantLevel === i ? 700 : 400,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {q.bits}-bit
                  </button>
                ))}
              </div>
              <div style={{
                background: COLORS.bg,
                border: `1px solid ${QUANT_LEVELS[quantLevel].color}44`,
                borderRadius: 8,
                padding: 14,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ color: QUANT_LEVELS[quantLevel].color, fontWeight: 600 }}>
                    {QUANT_LEVELS[quantLevel].label}
                  </span>
                  <Tag color={QUANT_LEVELS[quantLevel].color}>
                    Dimensione: {QUANT_LEVELS[quantLevel].size}
                  </Tag>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>Dimensione relativa:</div>
                  <div style={{ background: "#000", borderRadius: 4, height: 14, overflow: "hidden" }}>
                    <div style={{
                      width: QUANT_LEVELS[quantLevel].size,
                      height: "100%",
                      background: `linear-gradient(90deg, ${QUANT_LEVELS[quantLevel].color}88, ${QUANT_LEVELS[quantLevel].color})`,
                      borderRadius: 4,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.text }}>
                  Qualita': <span style={{ color: QUANT_LEVELS[quantLevel].color }}>{QUANT_LEVELS[quantLevel].quality}</span>
                </div>
                {quantLevel === 3 && (
                  <p style={{ fontSize: 12, color: COLORS.highlight, margin: "8px 0 0", fontStyle: "italic" }}>
                    Con INT4 un modello da 70B puo' girare su una singola GPU da 24 GB!
                  </p>
                )}
              </div>
            </div>

            {/* Fine-tuning & LoRA */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>
                Fine-tuning e LoRA/QLoRA
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
                Invece di addestrare da zero, si "adatta" un modello esistente a un compito specifico.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  {
                    title: "Fine-tuning completo",
                    desc: "Si aggiornano tutti i parametri. Costoso ma potente.",
                    tag: "100% parametri",
                    color: COLORS.accent2,
                  },
                  {
                    title: "LoRA",
                    desc: "Si aggiungono piccole matrici 'adattatori'. Solo ~1% dei parametri addestrati.",
                    tag: "~1% parametri",
                    color: COLORS.accent4,
                  },
                  {
                    title: "QLoRA",
                    desc: "LoRA + quantizzazione: fine-tuning di un 65B su una singola GPU da 48 GB.",
                    tag: "~0.5% parametri",
                    color: COLORS.accent,
                  },
                ].map((item, i) => (
                  <div key={i} style={{
                    flex: "1 1 200px",
                    background: COLORS.bg,
                    border: `1px solid ${item.color}44`,
                    borderRadius: 8,
                    padding: 12,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: item.color, marginBottom: 4 }}>{item.title}</div>
                    <Tag color={item.color}>{item.tag}</Tag>
                    <p style={{ fontSize: 12, color: COLORS.muted, margin: "8px 0 0" }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Distillation */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.highlight, marginBottom: 8 }}>
                Distillazione — Insegnare ai Piccoli
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
                Un modello grande (il "maestro") genera dati su cui un modello piccolo (l'"allievo") viene addestrato.
                Il piccolo impara a imitare il grande, raggiungendo qualita' sorprendenti.
              </p>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "12px 0",
              }}>
                <div style={{
                  background: `${COLORS.accent3}22`,
                  border: `1px solid ${COLORS.accent3}44`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 24 }}>{"\ud83e\udde0"}</div>
                  <div style={{ fontSize: 12, color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace" }}>Maestro (400B)</div>
                </div>
                <div style={{ fontSize: 24, color: COLORS.highlight }}>{"\u27a1"}</div>
                <div style={{
                  background: `${COLORS.highlight}22`,
                  border: `1px solid ${COLORS.highlight}44`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2 }}>Dati generati</div>
                  <div style={{ fontSize: 12, color: COLORS.highlight, fontFamily: "'JetBrains Mono', monospace" }}>milioni di esempi</div>
                </div>
                <div style={{ fontSize: 24, color: COLORS.highlight }}>{"\u27a1"}</div>
                <div style={{
                  background: `${COLORS.accent4}22`,
                  border: `1px solid ${COLORS.accent4}44`,
                  borderRadius: 8,
                  padding: "12px 16px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 20 }}>{"\ud83c\udf31"}</div>
                  <div style={{ fontSize: 12, color: COLORS.accent4, fontFamily: "'JetBrains Mono', monospace" }}>Allievo (7B)</div>
                </div>
              </div>
            </div>

            {/* Alternative architectures */}
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>
                Architetture Alternative
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
                I Transformer non sono l'unica strada. Nuove architetture promettono di superare i loro limiti.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  {
                    name: "Mamba",
                    sub: "State Space Models",
                    desc: "Complessita' lineare invece che quadratica. Velocissimo su sequenze lunghe.",
                    color: COLORS.accent4,
                  },
                  {
                    name: "RWKV",
                    sub: "Linear Attention",
                    desc: "Combina vantaggi di RNN e Transformer. Inferenza costante per token.",
                    color: COLORS.accent2,
                  },
                  {
                    name: "Ibridi",
                    sub: "Transformer + SSM",
                    desc: "Jamba, Zamba: il meglio di entrambi i mondi. Attenzione dove serve, efficienza altrove.",
                    color: COLORS.accent3,
                  },
                ].map((arch, i) => (
                  <div key={i} style={{
                    flex: "1 1 200px",
                    background: COLORS.bg,
                    border: `1px solid ${arch.color}44`,
                    borderRadius: 8,
                    padding: 12,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: arch.color }}>{arch.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", marginBottom: 6 }}>
                      {arch.sub}
                    </div>
                    <p style={{ fontSize: 12, color: COLORS.text, margin: 0 }}>{arch.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "16px 0",
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.muted,
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        Sotto il Cofano — Modelli e Architetture · Sessione 2 · Atto 4
      </div>
    </div>
  );
}
