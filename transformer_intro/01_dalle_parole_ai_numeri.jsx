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

const Formula = ({ children }) => (
  <div style={{
    background: "#000",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "12px 20px",
    fontFamily: "'JetBrains Mono', monospace",
    color: COLORS.highlight,
    fontSize: 16,
    textAlign: "center",
    margin: "12px 0",
    letterSpacing: 1,
  }}>
    {children}
  </div>
);

/* ─── Tokenizer logic ─── */

const TOKEN_PALETTE = [
  COLORS.accent, COLORS.accent2, COLORS.accent3, COLORS.accent4,
  COLORS.highlight, "#f472b6", "#38bdf8", "#fb923c",
  "#34d399", "#c084fc", "#fbbf24", "#22d3ee",
];

const SUBWORD_RULES = {
  intelligenza: ["intel", "ligenza"],
  artificiale: ["art", "ificiale"],
  apprendimento: ["appren", "dimento"],
  automatico: ["auto", "matico"],
  elaborazione: ["elabor", "azione"],
  linguaggio: ["lingu", "aggio"],
  naturale: ["natur", "ale"],
  trasformatore: ["trasform", "atore"],
  rappresentazione: ["rappresent", "azione"],
  calcolatrice: ["calcol", "atrice"],
  comprensione: ["compren", "sione"],
  generazione: ["gener", "azione"],
};

function tokenize(text) {
  if (!text.trim()) return [];
  const tokens = [];
  let idCounter = 1000;

  // Split preserving punctuation as separate tokens
  const rawParts = text.split(/(\s+|[.,;:!?'"()\-])/);

  for (const part of rawParts) {
    if (!part || /^\s+$/.test(part)) continue;

    // Check punctuation
    if (/^[.,;:!?'"()\-]$/.test(part)) {
      tokens.push({ text: part, id: idCounter++, isSubword: false, subwordIndex: 0 });
      continue;
    }

    const lower = part.toLowerCase();
    if (SUBWORD_RULES[lower]) {
      const pieces = SUBWORD_RULES[lower];
      // Reconstruct with original casing
      let offset = 0;
      pieces.forEach((piece, i) => {
        const original = part.substring(offset, offset + piece.length);
        tokens.push({ text: original, id: idCounter++, isSubword: true, subwordIndex: i });
        offset += piece.length;
      });
    } else {
      tokens.push({ text: part, id: idCounter++, isSubword: false, subwordIndex: 0 });
    }
  }
  return tokens;
}

/* ─── Embedding space data ─── */

const WORDS_2D = [
  // Animals
  { word: "gatto", x: 0.72, y: 0.78, cluster: "animali" },
  { word: "cane", x: 0.68, y: 0.85, cluster: "animali" },
  { word: "topo", x: 0.78, y: 0.72, cluster: "animali" },
  { word: "pesce", x: 0.82, y: 0.82, cluster: "animali" },
  // Family
  { word: "marito", x: 0.22, y: 0.25, cluster: "famiglia" },
  { word: "moglie", x: 0.35, y: 0.18, cluster: "famiglia" },
  { word: "figlio", x: 0.28, y: 0.12, cluster: "famiglia" },
  // Gender
  { word: "uomo", x: 0.18, y: 0.55, cluster: "persone" },
  { word: "donna", x: 0.32, y: 0.48, cluster: "persone" },
  { word: "ragazzo", x: 0.22, y: 0.65, cluster: "persone" },
  { word: "ragazza", x: 0.35, y: 0.58, cluster: "persone" },
  // Food
  { word: "pizza", x: 0.65, y: 0.25, cluster: "cibo" },
  { word: "pasta", x: 0.72, y: 0.32, cluster: "cibo" },
  { word: "pane", x: 0.58, y: 0.30, cluster: "cibo" },
  { word: "gelato", x: 0.68, y: 0.18, cluster: "cibo" },
  // Extra semantic anchors
  { word: "città", x: 0.48, y: 0.52, cluster: "luoghi" },
  { word: "casa", x: 0.42, y: 0.60, cluster: "luoghi" },
  { word: "scuola", x: 0.52, y: 0.45, cluster: "luoghi" },
];

const CLUSTER_COLORS = {
  animali: COLORS.accent4,
  famiglia: COLORS.highlight,
  persone: COLORS.accent,
  cibo: COLORS.accent2,
  luoghi: COLORS.accent3,
};

/* ─── Vector arithmetic data ─── */

// Positions forming a parallelogram: uomo→marito ≈ donna→moglie
const VEC = {
  uomo:   { x: 80, y: 200 },
  donna:  { x: 230, y: 185 },
  marito: { x: 120, y: 70 },
  moglie: { x: 270, y: 55 },
};

/* ─── Components ─── */

function InteractiveTokenizer() {
  const [text, setText] = useState("L'intelligenza artificiale elabora il linguaggio naturale");
  const tokens = tokenize(text);

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, lineHeight: 1.7 }}>
        Scrivi del testo e osserva come viene spezzato in <strong style={{ color: COLORS.accent }}>token</strong>.
        Le parole lunghe vengono divise in sotto-parti (subword tokenization), proprio come fanno i modelli reali.
      </p>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Scrivi una frase in italiano..."
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "#0a0e1a",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          color: COLORS.text,
          fontSize: 16,
          fontFamily: "'IBM Plex Sans', sans-serif",
          outline: "none",
          boxSizing: "border-box",
          marginBottom: 16,
        }}
      />

      {/* Token display */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {tokens.map((tok, i) => {
          const color = TOKEN_PALETTE[i % TOKEN_PALETTE.length];
          return (
            <div key={i} style={{
              background: `${color}22`,
              border: `1px solid ${color}55`,
              borderRadius: 6,
              padding: "6px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              transition: "all 0.2s",
            }}>
              <span style={{ color: COLORS.text, fontSize: 15, fontWeight: 500 }}>
                {tok.isSubword && tok.subwordIndex > 0 ? "##" : ""}{tok.text}
              </span>
              <span style={{ color, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                id:{tok.id}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, fontSize: 13, color: COLORS.muted }}>
        <span>Caratteri: <strong style={{ color: COLORS.text }}>{text.length}</strong></span>
        <span>Token: <strong style={{ color: COLORS.accent }}>{tokens.length}</strong></span>
        <span>Subword: <strong style={{ color: COLORS.accent3 }}>{tokens.filter(t => t.isSubword).length}</strong></span>
      </div>

      {tokens.length > 0 && (
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#0a0e1a", borderRadius: 8, borderLeft: `3px solid ${COLORS.accent}` }}>
          <div style={{ color: COLORS.muted, fontSize: 12, fontFamily: "monospace", lineHeight: 1.6 }}>
            Il modello non vede lettere, ma una sequenza di numeri:{" "}
            <span style={{ color: COLORS.accent }}>
              [{tokens.map(t => t.id).join(", ")}]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function EmbeddingSpace() {
  const [hovered, setHovered] = useState(null);
  const W = 520;
  const H = 380;
  const PAD = 50;

  function toSvg(x, y) {
    return {
      sx: PAD + x * (W - 2 * PAD),
      sy: PAD + y * (H - 2 * PAD),
    };
  }

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, lineHeight: 1.7 }}>
        Ogni parola diventa un <strong style={{ color: COLORS.accent }}>vettore</strong> — un punto nello spazio.
        Parole con significato simile finiscono <strong style={{ color: COLORS.accent4 }}>vicine</strong>.
        Passa il mouse sopra le parole per esplorare.
      </p>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
        {Object.entries(CLUSTER_COLORS).map(([name, color]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            <span style={{ color: COLORS.muted, fontSize: 12, fontFamily: "monospace" }}>{name}</span>
          </div>
        ))}
      </div>

      <svg width={W} height={H} style={{ background: "#0a0e1a", borderRadius: 8, border: `1px solid ${COLORS.border}`, display: "block", margin: "0 auto" }}>
        {/* Grid */}
        {[0.2, 0.4, 0.6, 0.8].map(v => {
          const { sx } = toSvg(v, 0);
          const { sy } = toSvg(0, v);
          return (
            <g key={v}>
              <line x1={sx} y1={PAD} x2={sx} y2={H - PAD} stroke={COLORS.border} strokeWidth={0.5} />
              <line x1={PAD} y1={sy} x2={W - PAD} y2={sy} stroke={COLORS.border} strokeWidth={0.5} />
            </g>
          );
        })}

        {/* Axes */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke={COLORS.muted} strokeWidth={1} />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke={COLORS.muted} strokeWidth={1} />
        <text x={W / 2} y={H - 10} fill={COLORS.muted} fontSize={11} textAnchor="middle" fontFamily="monospace">dimensione 1</text>
        <text x={12} y={H / 2} fill={COLORS.muted} fontSize={11} textAnchor="middle" fontFamily="monospace" transform={`rotate(-90, 12, ${H / 2})`}>dimensione 2</text>

        {/* Cluster ellipses (subtle background grouping) */}
        {[
          { cx: 0.75, cy: 0.79, rx: 0.12, ry: 0.10, cluster: "animali" },
          { cx: 0.28, cy: 0.18, rx: 0.12, ry: 0.10, cluster: "famiglia" },
          { cx: 0.27, cy: 0.57, rx: 0.13, ry: 0.12, cluster: "persone" },
          { cx: 0.66, cy: 0.26, rx: 0.12, ry: 0.10, cluster: "cibo" },
          { cx: 0.47, cy: 0.52, rx: 0.10, ry: 0.10, cluster: "luoghi" },
        ].map((c, i) => {
          const { sx: cx, sy: cy } = toSvg(c.cx, c.cy);
          const rx = c.rx * (W - 2 * PAD);
          const ry = c.ry * (H - 2 * PAD);
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
              fill={`${CLUSTER_COLORS[c.cluster]}08`}
              stroke={`${CLUSTER_COLORS[c.cluster]}22`}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Word dots */}
        {WORDS_2D.map((w, i) => {
          const { sx, sy } = toSvg(w.x, w.y);
          const isHovered = hovered === i;
          const color = CLUSTER_COLORS[w.cluster];
          return (
            <g key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Glow on hover */}
              {isHovered && (
                <circle cx={sx} cy={sy} r={18} fill={`${color}22`} />
              )}
              <circle cx={sx} cy={sy} r={isHovered ? 7 : 5} fill={color}
                stroke={isHovered ? "#fff" : "none"} strokeWidth={1.5}
                style={{ transition: "r 0.2s" }}
              />
              <text
                x={sx}
                y={sy - (isHovered ? 14 : 10)}
                fill={isHovered ? COLORS.text : `${color}cc`}
                fontSize={isHovered ? 13 : 11}
                textAnchor="middle"
                fontFamily="'IBM Plex Sans', sans-serif"
                fontWeight={isHovered ? 600 : 400}
              >
                {w.word}
              </text>
              {/* Coordinates tooltip */}
              {isHovered && (
                <text x={sx} y={sy + 20} fill={COLORS.muted} fontSize={10} textAnchor="middle" fontFamily="monospace">
                  [{w.x.toFixed(2)}, {w.y.toFixed(2)}]
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function VectorArithmetic() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const W = 400;
  const H = 300;

  function playAnimation() {
    setStep(0);
    setPlaying(true);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current > 3) {
        clearInterval(interval);
        setPlaying(false);
        return;
      }
      setStep(current);
    }, 1200);
  }

  // The relationship vector: from Uomo to Marito
  const relVec = {
    dx: VEC.marito.x - VEC.uomo.x,
    dy: VEC.marito.y - VEC.uomo.y,
  };

  // Result: applying same relationship from Donna
  const result = {
    x: VEC.donna.x + relVec.dx,
    y: VEC.donna.y + relVec.dy,
  };

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, lineHeight: 1.7 }}>
        Se le parole sono vettori, possiamo fare <strong style={{ color: COLORS.highlight }}>aritmetica con i significati</strong>.
        La relazione tra "marito" e "uomo" e la stessa tra "moglie" e "donna".
      </p>

      <Formula>vec(Marito) - vec(Uomo) + vec(Donna) ≈ vec(Moglie)</Formula>

      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <svg width={W} height={H} style={{ background: "#0a0e1a", borderRadius: 8, border: `1px solid ${COLORS.border}` }}>
          <defs>
            {[COLORS.accent, COLORS.accent2, COLORS.accent4, COLORS.highlight].map(c => (
              <marker key={c} id={`arrow-${c.replace("#", "")}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill={c} />
              </marker>
            ))}
          </defs>

          {/* Grid */}
          {[60, 120, 180, 240, 300, 360].map(v => (
            <g key={v}>
              <line x1={v} y1={20} x2={v} y2={H - 20} stroke={COLORS.border} strokeWidth={0.3} />
            </g>
          ))}
          {[40, 80, 120, 160, 200, 240].map(v => (
            <g key={v}>
              <line x1={20} y1={v} x2={W - 20} y2={v} stroke={COLORS.border} strokeWidth={0.3} />
            </g>
          ))}

          {/* Word labels (always visible) */}
          {[
            { label: "Uomo", pos: VEC.uomo, color: COLORS.accent },
            { label: "Donna", pos: VEC.donna, color: COLORS.accent2 },
            { label: "Marito", pos: VEC.marito, color: COLORS.highlight },
            { label: "Moglie", pos: VEC.moglie, color: COLORS.accent4 },
          ].map((item, i) => (
            <g key={i}>
              <circle cx={item.pos.x} cy={item.pos.y} r={5} fill={item.color} />
              <text x={item.pos.x} y={item.pos.y - 12} fill={item.color} fontSize={13}
                textAnchor="middle" fontWeight={600} fontFamily="'IBM Plex Sans', sans-serif">
                {item.label}
              </text>
            </g>
          ))}

          {/* Step 1: Arrow from Uomo to Marito (the relationship vector) */}
          {step >= 1 && (
            <line x1={VEC.uomo.x} y1={VEC.uomo.y} x2={VEC.marito.x} y2={VEC.marito.y}
              stroke={COLORS.highlight} strokeWidth={2.5} fill="none"
              markerEnd={`url(#arrow-${COLORS.highlight.replace("#", "")})`}
              opacity={step === 1 ? 1 : 0.4}
            />
          )}

          {/* Step 2: Same arrow from Donna (parallel - the analogy) */}
          {step >= 2 && (
            <line x1={VEC.donna.x} y1={VEC.donna.y} x2={result.x} y2={result.y}
              stroke={COLORS.accent2} strokeWidth={2.5} fill="none"
              markerEnd={`url(#arrow-${COLORS.accent2.replace("#", "")})`}
              strokeDasharray="8 4"
              opacity={step === 2 ? 1 : 0.6}
            />
          )}

          {/* Step 3: Result near Moglie - pulsing circle */}
          {step >= 3 && (
            <g>
              <circle cx={result.x} cy={result.y} r={12} fill="none" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="4 4">
                <animate attributeName="r" values="10;18;10" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <text x={result.x} y={result.y + 30} fill={COLORS.accent4} fontSize={12}
                textAnchor="middle" fontFamily="monospace" fontWeight={600}>
                ≈ Moglie!
              </text>
              {/* Parallelogram outline */}
              <polygon
                points={`${VEC.uomo.x},${VEC.uomo.y} ${VEC.marito.x},${VEC.marito.y} ${result.x},${result.y} ${VEC.donna.x},${VEC.donna.y}`}
                fill="none" stroke={COLORS.muted} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.4}
              />
            </g>
          )}
        </svg>

        <div style={{ flex: 1, minWidth: 200 }}>
          {/* Step indicator */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {[
              { label: "Uomo → Marito", color: COLORS.highlight, desc: "La relazione 'coniugale'" },
              { label: "Donna → ???", color: COLORS.accent2, desc: "Stessa direzione da Donna" },
              { label: "≈ Moglie!", color: COLORS.accent4, desc: "Il vettore cattura la relazione" },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                opacity: step >= i + 1 ? 1 : 0.3,
                transition: "opacity 0.3s",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: step >= i + 1 ? s.color : COLORS.border,
                  transition: "background 0.3s",
                }} />
                <div>
                  <span style={{ color: s.color, fontFamily: "monospace", fontSize: 13, fontWeight: 600 }}>{s.label}</span>
                  <span style={{ color: COLORS.muted, fontSize: 12, marginLeft: 8 }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={playAnimation}
            disabled={playing}
            style={{
              background: playing ? COLORS.border : `${COLORS.accent}22`,
              border: `1px solid ${playing ? COLORS.border : COLORS.accent}`,
              borderRadius: 8,
              padding: "10px 20px",
              color: playing ? COLORS.muted : COLORS.accent,
              fontSize: 14,
              fontFamily: "'JetBrains Mono', monospace",
              cursor: playing ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {playing ? "Animazione in corso..." : step > 0 ? "▶ Ripeti animazione" : "▶ Avvia animazione"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RabbitHole() {
  const [open, setOpen] = useState(false);

  return (
    <Section title="🐇 Tana del bianconiglio" accent={COLORS.accent3}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: COLORS.accent3,
          fontSize: 14,
          marginBottom: open ? 16 : 0,
        }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
        {open ? "Nascondi dettagli tecnici" : "Mostra dettagli tecnici (20% hardcore)"}
      </div>

      {open && (
        <div>
          {/* Real dimensionality */}
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: `3px solid ${COLORS.highlight}` }}>
            <div style={{ color: COLORS.highlight, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              IN REALTA: 4096 DIMENSIONI, NON 2
            </div>
            <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              I grafici sopra mostrano solo 2 dimensioni per semplicita. Nella realta, ogni parola viene rappresentata
              da un vettore con <strong style={{ color: COLORS.accent }}>migliaia di dimensioni</strong>. Ad esempio:
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
              {[
                { model: "GPT-2", dims: "768", color: COLORS.muted },
                { model: "Llama-3 8B", dims: "4.096", color: COLORS.accent },
                { model: "GPT-4", dims: "~12.288", color: COLORS.accent2 },
                { model: "Claude", dims: "~8.192", color: COLORS.accent3 },
              ].map((m, i) => (
                <div key={i} style={{
                  background: COLORS.card,
                  borderRadius: 6,
                  padding: "8px 12px",
                  borderTop: `2px solid ${m.color}`,
                }}>
                  <div style={{ fontSize: 11, color: m.color, fontFamily: "monospace" }}>{m.model}</div>
                  <div style={{ fontSize: 16, color: COLORS.text, fontWeight: 700 }}>{m.dims} dim</div>
                </div>
              ))}
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginTop: 12, marginBottom: 0, lineHeight: 1.6 }}>
              Con 2 dimensioni puoi distinguere pochi concetti. Con 4096 puoi codificare sfumature come
              genere, tempo verbale, formalita, dominio semantico — tutto simultaneamente.
            </p>
          </div>

          {/* Embedding matrix */}
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: `3px solid ${COLORS.accent}` }}>
            <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              LA MATRICE DI EMBEDDING
            </div>
            <p style={{ color: COLORS.text, fontSize: 14, margin: "0 0 12px", lineHeight: 1.7 }}>
              Tutti i vettori delle parole sono memorizzati in una singola matrice gigante:
            </p>
            <Formula>E ∈ ℝ^(V × d) dove V = vocabolario, d = dimensioni</Formula>
            <p style={{ color: COLORS.muted, fontSize: 13, margin: "8px 0 0", lineHeight: 1.6 }}>
              Per Llama-3: V = 128.000 token, d = 4.096 → la matrice ha <strong style={{ color: COLORS.text }}>524 milioni</strong> di parametri
              solo per gli embedding. E questa e solo la prima operazione del modello!
            </p>
          </div>

          {/* Softmax and similarity */}
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16, borderLeft: `3px solid ${COLORS.accent2}` }}>
            <div style={{ color: COLORS.accent2, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              SIMILARITA TRA VETTORI: COSENO
            </div>
            <p style={{ color: COLORS.text, fontSize: 14, margin: "0 0 12px", lineHeight: 1.7 }}>
              Per trovare parole "vicine" nello spazio, si usa la similarita del coseno — l'angolo tra i vettori:
            </p>
            <Formula>cos(θ) = (A · B) / (||A|| × ||B||)</Formula>
            <p style={{ color: COLORS.muted, fontSize: 13, margin: "8px 0 0", lineHeight: 1.6 }}>
              cos(θ) = 1 → identici, cos(θ) = 0 → ortogonali (nessuna relazione), cos(θ) = -1 → opposti.
              Questo e il fondamento del meccanismo di <Tag color={COLORS.accent3}>attention</Tag> che vedremo nella prossima slide.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <Tag color={COLORS.accent}>word2vec</Tag>
            <Tag color={COLORS.accent2}>embedding matrix</Tag>
            <Tag color={COLORS.accent3}>cosine similarity</Tag>
            <Tag color={COLORS.highlight}>distributional hypothesis</Tag>
          </div>
        </div>
      )}
    </Section>
  );
}

export default function App() {
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
          Sessione 1 · Atto 2
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Dalle Parole ai Numeri
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Come fa una macchina a "capire" il testo? Trasformando ogni parola in un vettore numerico.
        </p>
      </div>

      {/* 1. Tokenizer */}
      <Section title="✂️ Tokenizzazione: spezzare il testo" accent={COLORS.accent}>
        <InteractiveTokenizer />
      </Section>

      {/* 2. Embedding Space */}
      <Section title="🗺️ Lo spazio degli embedding" accent={COLORS.accent4}>
        <EmbeddingSpace />
      </Section>

      {/* 3. Vector Arithmetic */}
      <Section title="➕ Aritmetica dei significati" accent={COLORS.highlight}>
        <VectorArithmetic />
      </Section>

      {/* 4. Rabbit Hole */}
      <RabbitHole />

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Digita il tuo testo nel tokenizer · Esplora lo spazio degli embedding · Sessione 1, Atto 2 (12 min)
      </div>
    </div>
  );
}
