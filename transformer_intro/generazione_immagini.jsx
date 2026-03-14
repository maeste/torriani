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

/* ── Seeded random for deterministic "noise" grids ── */
const seededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
};

/* ── Generate a noise grid that progressively resolves into a cat silhouette ── */
const generateGrid = (step, size) => {
  const rng = seededRandom(42);
  const noisePalette = ["#ff004d", "#29adff", "#00e436", "#ffec27", "#ff77a8", "#ab5236", "#c2c3c7", "#7e2553", "#ff6b35", "#a855f7"];
  const catPalette = {
    bg: "#1a1a2e",
    body: "#4a4a6a",
    ears: "#3a3a5a",
    eyes: COLORS.accent,
    nose: COLORS.accent2,
    mouth: COLORS.accent2,
  };

  /* 8x8 cat pattern: 1=body, 2=ears, 3=eyes, 4=nose, 5=mouth, 0=background */
  const catPattern = [
    [0, 2, 0, 0, 0, 0, 2, 0],
    [0, 2, 1, 1, 1, 1, 2, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 3, 1, 1, 3, 1, 0],
    [0, 1, 1, 4, 4, 1, 1, 0],
    [0, 1, 1, 5, 5, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ];

  const patternColors = {
    0: catPalette.bg,
    1: catPalette.body,
    2: catPalette.ears,
    3: catPalette.eyes,
    4: catPalette.nose,
    5: catPalette.mouth,
  };

  const grid = [];
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      const noiseColor = noisePalette[Math.floor(rng() * noisePalette.length)];
      const targetColor = patternColors[catPattern[r][c]];
      const blend = step / 5;
      if (blend >= 1) {
        row.push(targetColor);
      } else if (blend <= 0) {
        row.push(noiseColor);
      } else {
        /* Mix noise and target based on step */
        const useTarget = rng() < blend;
        row.push(useTarget ? targetColor : noiseColor);
      }
    }
    grid.push(row);
  }
  return grid;
};

/* ── Denoising step labels ── */
const stepLabels = [
  "Rumore puro — come un blocco di marmo grezzo",
  "Si intravedono forme vaghe...",
  "Le strutture principali emergono",
  "I dettagli si definiscono",
  "Quasi completo — ultimi ritocchi",
  "Immagine finale! Un gatto prende forma",
];

/* ── Tool data ── */
const tools = [
  {
    name: "Midjourney",
    emoji: "🎨",
    tagline: "La qualita artistica al top",
    open: false,
    price: "$10-60/mese",
    details: "Famoso per la qualita estetica eccezionale. Si usa tramite Discord con comandi testuali. Forte in stili artistici, fotorealistici e concettuali. La community condivide prompt e risultati in tempo reale.",
    strengths: ["Estetica superiore", "Community attiva", "Stili diversificati"],
    color: COLORS.accent3,
  },
  {
    name: "DALL-E 3",
    emoji: "🤖",
    tagline: "L'IA di OpenAI dentro ChatGPT",
    open: false,
    price: "Incluso in ChatGPT Plus ($20/mese)",
    details: "Integrato direttamente in ChatGPT, capisce descrizioni complesse in linguaggio naturale. Eccellente comprensione del testo e delle relazioni spaziali. Genera immagini sicure con filtri integrati.",
    strengths: ["Comprensione testo", "Facile da usare", "Integrato in ChatGPT"],
    color: COLORS.accent4,
  },
  {
    name: "Stable Diffusion",
    emoji: "🔓",
    tagline: "Open source — gira sul tuo PC",
    open: true,
    price: "Gratuito (serve una GPU)",
    details: "Modello completamente open source di Stability AI. Puoi scaricarlo e farlo girare sul tuo computer. La community crea migliaia di modelli personalizzati (checkpoint, LoRA). Totale controllo e personalizzazione.",
    strengths: ["Open source", "Personalizzabile", "Nessun costo ricorrente"],
    color: COLORS.accent,
  },
  {
    name: "Flux",
    emoji: "⚡",
    tagline: "Nuova generazione open source",
    open: true,
    price: "Gratuito / API a pagamento",
    details: "Creato da Black Forest Labs (gli stessi ricercatori dietro Stable Diffusion). Architettura nuova basata su DiT (Diffusion Transformer). Qualita paragonabile ai modelli chiusi, ma con spirito open source.",
    strengths: ["Architettura moderna", "Alta qualita", "Open source"],
    color: COLORS.highlight,
  },
  {
    name: "Ideogram",
    emoji: "✍️",
    tagline: "Il migliore per il testo nelle immagini",
    open: false,
    price: "Freemium / $7-20/mese",
    details: "Specializzato nella generazione di testo leggibile dentro le immagini — un punto debole di quasi tutti gli altri modelli. Ottimo per loghi, poster, grafiche con scritte. Interfaccia web intuitiva.",
    strengths: ["Testo nelle immagini", "Loghi e grafiche", "Facile da usare"],
    color: COLORS.accent2,
  },
];

/* ── Application areas ── */
const applications = [
  { emoji: "🎨", title: "Arte e illustrazione", desc: "Creare opere digitali, concept art, illustrazioni per libri e fumetti" },
  { emoji: "📐", title: "Design e prototipi", desc: "Generare mockup di prodotti, interfacce, packaging in pochi secondi" },
  { emoji: "🏛️", title: "Architettura e interni", desc: "Visualizzare edifici, arredamenti, spazi prima di costruirli" },
  { emoji: "👗", title: "Moda e fashion design", desc: "Progettare abiti, tessuti, collezioni con infinite variazioni" },
  { emoji: "📢", title: "Marketing e pubblicita", desc: "Creare campagne visive personalizzate senza servizi fotografici" },
  { emoji: "📚", title: "Educazione e didattica", desc: "Illustrare concetti scientifici, storici, matematici in modo visivo" },
];

/* ── Risks data ── */
const risks = [
  {
    emoji: "👤",
    title: "Deepfakes",
    desc: "Foto e video falsi di persone reali",
    example: "Un'immagine falsa del Papa con un piumino Balenciaga e diventata virale nel 2023, ingannando milioni di persone.",
    color: "#ef4444",
  },
  {
    emoji: "©️",
    title: "Copyright",
    desc: "Chi possiede l'immagine generata?",
    example: "Se l'IA si addestra su opere di artisti, le immagini generate sono originali o copie? Artisti hanno fatto causa a Stability AI.",
    color: COLORS.highlight,
  },
  {
    emoji: "🔄",
    title: "Bias visivo",
    desc: "Stereotipi amplificati dall'IA",
    example: "Chiedendo 'un dottore' l'IA genera quasi sempre un uomo bianco. I pregiudizi dei dati di addestramento vengono riprodotti.",
    color: COLORS.accent2,
  },
  {
    emoji: "📰",
    title: "Manipolazione",
    desc: "Fake news visive sempre piu convincenti",
    example: "Immagini false di eventi mai accaduti possono influenzare l'opinione pubblica, le elezioni, i mercati finanziari.",
    color: COLORS.accent3,
  },
];

/* ── Potenzialita data ── */
const potenzialita = [
  { emoji: "🚀", title: "Democratizzazione creativa", desc: "Tutti possono creare immagini professionali, non serve saper disegnare" },
  { emoji: "⏱️", title: "Velocita di iterazione", desc: "Centinaia di variazioni in minuti invece che giorni o settimane" },
  { emoji: "💡", title: "Esplorazione creativa", desc: "Esplorare idee visive impossibili o troppo costose da realizzare" },
  { emoji: "♿", title: "Accessibilita", desc: "Persone con disabilita possono esprimere la propria visione artistica" },
];

/* ── Rabbit hole deep dive data ── */
const deepDiveTopics = [
  {
    title: "Forward e Reverse Diffusion",
    icon: "🔬",
    content: "Il processo forward aggiunge rumore gaussiano all'immagine in T passi fino a ottenere puro rumore. Il modello impara il processo inverso: dato un'immagine rumorosa, predice il rumore da rimuovere. A inferenza, partiamo da rumore casuale e applichiamo T passi di denoising per generare un'immagine.",
  },
  {
    title: "CLIP — Collegare testo e immagini",
    icon: "🔗",
    content: "CLIP (Contrastive Language-Image Pre-training) di OpenAI mappa testo e immagini nello stesso spazio vettoriale. Quando scrivi 'un gatto rosso su un tetto', CLIP traduce queste parole in un vettore numerico che guida il processo di diffusione verso immagini che corrispondono alla descrizione.",
  },
  {
    title: "LoRA — Fine-tuning leggero",
    icon: "🎯",
    content: "Low-Rank Adaptation permette di personalizzare un modello con poche immagini (5-20) e risorse limitate. Invece di riaddestare miliardi di parametri, LoRA modifica solo piccole matrici aggiuntive. Cosi puoi insegnare al modello il tuo stile, il tuo volto, o un concetto specifico.",
  },
  {
    title: "Spazio latente",
    icon: "🌌",
    content: "I modelli moderni (Stable Diffusion, Flux) non lavorano direttamente sui pixel ma in uno spazio compresso chiamato 'latente'. Un encoder comprime l'immagine 512x512 in una rappresentazione 64x64, il modello lavora li (molto piu veloce!), poi un decoder ricostruisce i pixel finali.",
  },
  {
    title: "Caso legale: Stability AI vs Getty Images",
    icon: "⚖️",
    content: "Getty Images ha citato in giudizio Stability AI nel 2023, sostenendo che Stable Diffusion si e addestrato su milioni di foto protette da copyright senza autorizzazione. Il caso e ancora in corso e potrebbe definire il futuro legale dell'IA generativa per le immagini.",
  },
];

export default function App() {
  const [denoiseStep, setDenoiseStep] = useState(0);
  const [expandedTool, setExpandedTool] = useState(null);
  const [viewMode, setViewMode] = useState("potenzialita"); // "potenzialita" | "rischi"
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [expandedDive, setExpandedDive] = useState(null);
  const [hoveredApp, setHoveredApp] = useState(null);

  const gridSize = 8;
  const grid = generateGrid(denoiseStep, gridSize);

  return (
    <div style={{
      background: COLORS.bg,
      color: COLORS.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      maxWidth: 900,
      margin: "0 auto",
      padding: "32px 24px",
      minHeight: "100vh",
    }}>
      {/* ── Header ── */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{
          display: "inline-block",
          background: `${COLORS.accent3}22`,
          border: `1px solid ${COLORS.accent3}44`,
          borderRadius: 20,
          padding: "4px 16px",
          fontSize: 13,
          color: COLORS.accent3,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: 1,
          marginBottom: 12,
        }}>
          Sessione 2 &middot; Atto 1
        </div>
        <h1 style={{
          fontSize: 36,
          fontWeight: 800,
          margin: "12px 0 8px",
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}>
          Creare con l'IA: Le Immagini
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          Dall'immaginazione al pixel — come l'intelligenza artificiale
          trasforma le parole in immagini, e perche questo cambia tutto.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE 1 — Come Funziona: Lo Scultore Digitale
          ══════════════════════════════════════════════════════════════ */}
      <Section title="Come Funziona — Lo Scultore Digitale" accent={COLORS.accent}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
          Immagina uno scultore che parte da un <strong style={{ color: COLORS.accent }}>blocco di marmo grezzo</strong> (rumore casuale)
          e, colpo dopo colpo, rimuove il materiale in eccesso fino a rivelare la statua nascosta dentro.
          I modelli di <strong style={{ color: COLORS.accent2 }}>diffusione</strong> fanno esattamente questo: partono dal caos
          e, passo dopo passo, scolpiscono un'immagine guidati dalla tua descrizione testuale.
        </p>

        {/* Analogy steps */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { icon: "🪨", label: "Blocco grezzo", sub: "(rumore)" },
            { icon: "→", label: "", sub: "" },
            { icon: "🔨", label: "Scolpire", sub: "(denoising)" },
            { icon: "→", label: "", sub: "" },
            { icon: "🗿", label: "Statua", sub: "(immagine)" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: item.icon === "→" ? 30 : 80 }}>
              <div style={{ fontSize: item.icon === "→" ? 24 : 32, marginBottom: 4, color: item.icon === "→" ? COLORS.muted : undefined }}>
                {item.icon}
              </div>
              {item.label && <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{item.label}</div>}
              {item.sub && <div style={{ fontSize: 11, color: COLORS.muted }}>{item.sub}</div>}
            </div>
          ))}
        </div>

        {/* Interactive denoising grid */}
        <div style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: 20,
        }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <Tag color={COLORS.accent}>Passo {denoiseStep} / 5</Tag>
            <span style={{ color: COLORS.muted, fontSize: 13, marginLeft: 8 }}>
              {stepLabels[denoiseStep]}
            </span>
          </div>

          {/* Grid visualization */}
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: 3,
            maxWidth: 320,
            margin: "0 auto 16px",
            borderRadius: 8,
            overflow: "hidden",
            border: `1px solid ${COLORS.border}`,
          }}>
            {grid.flat().map((color, i) => (
              <div
                key={`${denoiseStep}-${i}`}
                style={{
                  aspectRatio: "1",
                  background: color,
                  transition: "background 0.5s ease",
                }}
              />
            ))}
          </div>

          {/* Slider */}
          <div style={{ textAlign: "center" }}>
            <input
              type="range"
              min={0}
              max={5}
              value={denoiseStep}
              onChange={(e) => setDenoiseStep(Number(e.target.value))}
              style={{
                width: "80%",
                maxWidth: 320,
                accentColor: COLORS.accent,
                cursor: "pointer",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 320, margin: "4px auto 0", fontSize: 11, color: COLORS.muted }}>
              <span>Rumore</span>
              <span>Immagine</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE 2 — Gli Strumenti
          ══════════════════════════════════════════════════════════════ */}
      <Section title="Gli Strumenti" accent={COLORS.accent2}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          Clicca su ogni strumento per scoprire i dettagli. Oggi esistono decine di modelli —
          ecco i cinque piu importanti.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tools.map((tool, idx) => {
            const isExpanded = expandedTool === idx;
            return (
              <div
                key={tool.name}
                onClick={() => setExpandedTool(isExpanded ? null : idx)}
                style={{
                  background: isExpanded ? `${tool.color}10` : COLORS.bg,
                  border: `1px solid ${isExpanded ? tool.color : COLORS.border}`,
                  borderRadius: 10,
                  padding: "14px 18px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: isExpanded ? `0 0 20px ${tool.color}15` : "none",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 26 }}>{tool.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.text }}>{tool.name}</div>
                      <div style={{ fontSize: 13, color: COLORS.muted }}>{tool.tagline}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Tag color={tool.open ? COLORS.accent4 : COLORS.accent3}>
                      {tool.open ? "Open Source" : "Closed Source"}
                    </Tag>
                    <span style={{
                      color: COLORS.muted,
                      fontSize: 18,
                      transition: "transform 0.3s",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      display: "inline-block",
                    }}>
                      ▼
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
                    <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.7, marginBottom: 12 }}>
                      {tool.details}
                    </p>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      {tool.strengths.map((s) => (
                        <Tag key={s} color={tool.color}>{s}</Tag>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.muted }}>
                      <strong style={{ color: COLORS.highlight }}>Prezzo:</strong> {tool.price}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE 3 — Le Potenzialita (Application Gallery)
          ══════════════════════════════════════════════════════════════ */}
      <Section title="Le Potenzialita — Dove si Usano" accent={COLORS.accent4}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240, 1fr))",
          gap: 12,
        }}>
          {applications.map((app, idx) => (
            <div
              key={app.title}
              onMouseEnter={() => setHoveredApp(idx)}
              onMouseLeave={() => setHoveredApp(null)}
              style={{
                background: hoveredApp === idx ? `${COLORS.accent4}12` : COLORS.bg,
                border: `1px solid ${hoveredApp === idx ? COLORS.accent4 : COLORS.border}`,
                borderRadius: 10,
                padding: "16px",
                transition: "all 0.3s ease",
                cursor: "default",
                transform: hoveredApp === idx ? "translateY(-2px)" : "none",
                boxShadow: hoveredApp === idx ? `0 4px 16px ${COLORS.accent4}15` : "none",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{app.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, marginBottom: 4 }}>
                {app.title}
              </div>
              <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.5 }}>
                {app.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          SEZIONE 4 — Potenzialita vs Rischi (Toggle)
          ══════════════════════════════════════════════════════════════ */}
      <Section title="Due Facce della Medaglia" accent={COLORS.highlight}>
        {/* Toggle button */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <div style={{
            display: "inline-flex",
            background: COLORS.bg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <button
              onClick={() => setViewMode("potenzialita")}
              style={{
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: viewMode === "potenzialita" ? COLORS.accent4 : "transparent",
                color: viewMode === "potenzialita" ? COLORS.bg : COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ✨ Potenzialita
            </button>
            <button
              onClick={() => setViewMode("rischi")}
              style={{
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: viewMode === "rischi" ? "#ef4444" : "transparent",
                color: viewMode === "rischi" ? "#fff" : COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ⚠️ Rischi
            </button>
          </div>
        </div>

        {/* Potenzialita view */}
        {viewMode === "potenzialita" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {potenzialita.map((p) => (
              <div key={p.title} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                background: `${COLORS.accent4}08`,
                border: `1px solid ${COLORS.accent4}33`,
                borderRadius: 10,
                padding: "14px 18px",
              }}>
                <span style={{ fontSize: 26, flexShrink: 0 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.accent4, marginBottom: 2 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Rischi view */}
        {viewMode === "rischi" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {risks.map((risk) => (
              <div key={risk.title} style={{
                background: `${risk.color}08`,
                border: `1px solid ${risk.color}33`,
                borderRadius: 10,
                padding: "14px 18px",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{risk.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: risk.color, marginBottom: 2 }}>
                      {risk.title}
                    </div>
                    <div style={{ fontSize: 14, color: COLORS.text, marginBottom: 8 }}>
                      {risk.desc}
                    </div>
                    <div style={{
                      background: `${risk.color}10`,
                      borderLeft: `3px solid ${risk.color}`,
                      borderRadius: "0 6px 6px 0",
                      padding: "8px 12px",
                      fontSize: 13,
                      color: COLORS.muted,
                      lineHeight: 1.5,
                      fontStyle: "italic",
                    }}>
                      {risk.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          RABBIT HOLE — Deep Dive (Collapsible)
          ══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.accent3}44`,
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            width: "100%",
            background: `${COLORS.accent3}15`,
            border: "none",
            padding: "16px 24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: COLORS.accent3,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🐇</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}>
              Rabbit Hole — Per i Curiosi
            </span>
          </div>
          <span style={{
            fontSize: 18,
            transition: "transform 0.3s ease",
            transform: rabbitHoleOpen ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}>
            ▼
          </span>
        </button>

        {rabbitHoleOpen && (
          <div style={{ padding: "16px 24px 24px" }}>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
              Per chi vuole capire cosa succede davvero sotto il cofano.
              Clicca su ogni argomento per approfondire.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {deepDiveTopics.map((topic, idx) => {
                const isOpen = expandedDive === idx;
                return (
                  <div
                    key={topic.title}
                    style={{
                      background: isOpen ? `${COLORS.accent3}10` : COLORS.bg,
                      border: `1px solid ${isOpen ? COLORS.accent3 : COLORS.border}`,
                      borderRadius: 8,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <button
                      onClick={() => setExpandedDive(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        padding: "12px 16px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: isOpen ? COLORS.accent3 : COLORS.text,
                        transition: "color 0.3s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>{topic.icon}</span>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{topic.title}</span>
                      </div>
                      <span style={{
                        fontSize: 14,
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        display: "inline-block",
                        color: COLORS.muted,
                      }}>
                        ▶
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{
                        padding: "0 16px 14px",
                        fontSize: 14,
                        color: COLORS.text,
                        lineHeight: 1.7,
                        borderTop: `1px solid ${COLORS.border}`,
                        paddingTop: 12,
                      }}>
                        {topic.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        textAlign: "center",
        padding: "16px 0",
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.muted,
        fontSize: 12,
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <span style={{ opacity: 0.6 }}>
          generazione_immagini.jsx — Creare con l'IA: Le Immagini
        </span>
      </div>
    </div>
  );
}
