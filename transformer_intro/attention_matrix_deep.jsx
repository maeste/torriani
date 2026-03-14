import { useState, useMemo } from "react";

const C = {
  bg: "#0a0e1a", card: "#0f1729", border: "#1e2d4a",
  dark: "#060912",
  cyan: "#00d4ff", orange: "#ff6b35", purple: "#a855f7",
  green: "#22c55e", yellow: "#fbbf24", red: "#ef4444",
  pink: "#ec4899", teal: "#14b8a6",
  text: "#e2e8f0", muted: "#64748b",
};

const Tag = ({ children, color }) => (
  <span style={{
    background: `${color}22`, color, border: `1px solid ${color}55`,
    borderRadius: 4, padding: "2px 8px", fontSize: 12,
    fontFamily: "monospace", whiteSpace: "nowrap",
  }}>{children}</span>
);

const Box = ({ children, color = C.cyan, title, icon }) => (
  <div style={{
    background: `${color}0d`, border: `1px solid ${color}44`,
    borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12,
  }}>
    {title && <div style={{ color, fontWeight: 700, fontSize: 12, fontFamily: "monospace", marginBottom: 6 }}>
      {icon && <span style={{ marginRight: 6 }}>{icon}</span>}{title}
    </div>}
    <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.75 }}>{children}</div>
  </div>
);

const Mono = ({ children, color = C.yellow }) => (
  <code style={{ background: "#0005", borderRadius: 3, padding: "1px 5px", color, fontFamily: "monospace", fontSize: 13 }}>
    {children}
  </code>
);

// ─── TAB 1: Dove vive l'attention matrix ─────────────────────────────────────
function WhereTab() {
  const [phase, setPhase] = useState("prefill");

  const memZones = [
    { label: "HBM (VRAM principale)", sublabel: "es. A100 = 80GB", color: C.purple, items: ["Pesi Q,K,V,O (fissi)", "KV Cache (crescente)", "Attention matrix (solo training / flash)"] },
    { label: "SRAM (on-chip cache)", sublabel: "~20MB su A100", color: C.cyan, items: ["Tile di Q,K,V (FlashAttention)", "Blocchi della matrice di scores", "Risultati parziali softmax"] },
    { label: "Registri / L1", sublabel: "kb, velocissimi", color: C.green, items: ["Valori correnti del dot product", "Accumulator per il weighted sum"] },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Box color={C.cyan} icon="🧠" title="La domanda giusta">
        L'attention matrix <strong style={{ color: C.text }}>non viene conservata</strong> stabilmente —
        viene <strong style={{ color: C.cyan }}>calcolata al volo</strong> durante ogni forward pass e poi scartata
        (in inferenza). Ciò che rimane è il <Tag color={C.orange}>KV Cache</Tag> (K e V precalcolati),
        non la matrice degli scores.
      </Box>

      {/* Phase toggle */}
      <div style={{ display: "flex", gap: 6 }}>
        {["prefill", "decode", "training"].map(p => (
          <button key={p} onClick={() => setPhase(p)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer",
            fontFamily: "monospace", border: `1px solid ${phase === p ? C.cyan : C.border}`,
            background: phase === p ? `${C.cyan}22` : C.card,
            color: phase === p ? C.cyan : C.muted,
          }}>{p.toUpperCase()}</button>
        ))}
      </div>

      {phase === "prefill" && (
        <div>
          <Box color={C.green} icon="⚡" title="PREFILL — dove vive la matrice">
            Durante il prefill, l'intera sequenza viene processata in parallelo.
            La matrice <Mono>n × n</Mono> degli attention scores viene <strong style={{ color: C.text }}>calcolata interamente</strong>,
            ma con <Tag color={C.cyan}>FlashAttention</Tag> viene processata a <em>blocchi</em> (tiles) senza mai materializzarla
            tutta in HBM — solo piccoli frammenti passano attraverso la SRAM.
          </Box>
          <MemoryDiagram phase="prefill" />
        </div>
      )}

      {phase === "decode" && (
        <div>
          <Box color={C.orange} icon="🔁" title="DECODE — dove vive la matrice">
            Durante la generazione token per token, la matrice degenera in un semplice
            <strong style={{ color: C.text }}> vettore 1 × n</strong>: il nuovo token (query) fa attention
            su tutti i token precedenti (keys). I K,V vengono letti dal <Tag color={C.orange}>KV Cache</Tag> in HBM —
            è qui che sta il vero costo: lettura di n·layers·heads·d_head valori ad ogni step.
          </Box>
          <MemoryDiagram phase="decode" />
        </div>
      )}

      {phase === "training" && (
        <div>
          <Box color={C.red} icon="🔥" title="TRAINING — dove vive la matrice">
            Nel training, la matrice <Mono>n × n</Mono> <strong style={{ color: C.red }}>deve essere materializzata</strong> per
            calcolare i gradienti nel backward pass. Questo è il vero collo di bottiglia quadratico — con n=4096 e 32 heads
            su 32 layer si raggiunge facilmente l'OOM. Soluzioni: gradient checkpointing (ricalcola durante il backward)
            o FlashAttention (ricalcola on-chip senza HBM).
          </Box>
          <MemoryDiagram phase="training" />
        </div>
      )}

      {/* Memory hierarchy */}
      <div style={{ background: C.dark, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ color: C.yellow, fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          Gerarchia di memoria della GPU
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {memZones.map((zone, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "center",
              background: `${zone.color}0a`, border: `1px solid ${zone.color}33`,
              borderRadius: 8, padding: "8px 12px",
            }}>
              <div style={{ minWidth: 160 }}>
                <div style={{ color: zone.color, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{zone.label}</div>
                <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace" }}>{zone.sublabel}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {zone.items.map((item, j) => (
                  <span key={j} style={{
                    background: `${zone.color}18`, border: `1px solid ${zone.color}44`,
                    borderRadius: 4, padding: "2px 8px", fontSize: 11, color: zone.color, fontFamily: "monospace",
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MemoryDiagram({ phase }) {
  const config = {
    prefill: {
      steps: [
        { from: "HBM", to: "SRAM", data: "Tile di Q, K (blocchi)", color: C.cyan },
        { from: "SRAM", to: "Registri", data: "dot product Q·Kᵀ → scores", color: C.green },
        { from: "Registri", to: "SRAM", data: "softmax parziale", color: C.yellow },
        { from: "SRAM", to: "HBM", data: "output per tile (non scores)", color: C.orange },
      ],
      note: "FlashAttention evita di scrivere la matrice completa in HBM → risparmio ~3x di memoria"
    },
    decode: {
      steps: [
        { from: "HBM (KV Cache)", to: "SRAM", data: "K, V di tutti i token precedenti", color: C.orange },
        { from: "SRAM", to: "Registri", data: "query del nuovo token · K", color: C.cyan },
        { from: "Registri", to: "SRAM", data: "scores 1×n, softmax", color: C.green },
        { from: "SRAM", to: "HBM", data: "output 1×d_model", color: C.yellow },
      ],
      note: "Il collo di bottiglia è la lettura del KV Cache (memory-bandwidth bound, non compute-bound)"
    },
    training: {
      steps: [
        { from: "HBM", to: "SRAM", data: "Q, K, V interi (n×d_head)", color: C.cyan },
        { from: "SRAM", to: "HBM", data: "Matrice scores n×n (backward!)", color: C.red },
        { from: "HBM", to: "SRAM", data: "Gradienti dL/dScores", color: C.purple },
        { from: "SRAM", to: "HBM", data: "dQ, dK, dV aggiornati", color: C.orange },
      ],
      note: "Senza gradient checkpointing: n=4096, 32 heads, fp32 → ~8GB solo per gli scores di un layer"
    }
  };

  const { steps, note } = config[phase];
  return (
    <div style={{ background: C.dark, borderRadius: 10, padding: 14, border: `1px solid ${C.border}`, marginBottom: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Tag color={C.muted}>{s.from}</Tag>
            <span style={{ color: s.color, fontSize: 14 }}>→</span>
            <Tag color={s.color}>{s.data}</Tag>
            <span style={{ color: C.muted, fontSize: 12 }}>→ {s.to}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 12, color: C.green, fontFamily: "monospace", borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
        💡 {note}
      </div>
    </div>
  );
}

// ─── TAB 2: Formula breakdown ─────────────────────────────────────────────────
function FormulaTab() {
  const [step, setStep] = useState(null);

  const parts = [
    {
      id: "qkt",
      symbol: "Q·Kᵀ",
      color: C.cyan,
      title: "Dot product: quanto mi interessa?",
      formula: "Scores[i,j] = Σₖ Q[i,k] · K[j,k]",
      analogy: "Ogni token i fa una domanda (Q). Ogni token j espone una chiave (K). Il dot product misura quanto le due direzioni si allineano nello spazio vettoriale.",
      shape: "n × n",
      cost: "O(n² · d_head) FLOPs",
      detail: "Per ogni coppia (i,j) di token, si calcola il prodotto scalare dei loro vettori Query e Key. Con n token e d_head dimensioni: n² prodotti scalari, ognuno da d_head moltiplicazioni.",
    },
    {
      id: "scale",
      symbol: "/ √d",
      color: C.yellow,
      title: "Scaling: perché dividere?",
      formula: "scores_scaled = Q·Kᵀ / √d_head",
      analogy: "Con d_head grande, i dot product tendono ad avere varianza molto alta → la softmax satura verso 0 e 1 → gradienti quasi zero (vanishing). Dividere per √d_head normalizza la varianza.",
      shape: "n × n",
      cost: "O(n²) — solo divisioni",
      detail: "Se Q, K sono vettori con varianza 1, il dot product ha varianza d_head (somma di d_head prodotti). Dividere per √d_head riporta la varianza a 1. L'ha introdotto il paper 'Attention Is All You Need' (2017).",
    },
    {
      id: "softmax",
      symbol: "softmax(·)",
      color: C.orange,
      title: "Softmax: pesi che sommano a 1",
      formula: "w[i,j] = exp(s[i,j]) / Σⱼ exp(s[i,j])",
      analogy: "Trasforma gli scores in probabilità: ogni riga della matrice somma a 1. Il token i 'distribuisce la sua attenzione' tra tutti gli altri token.",
      shape: "n × n",
      cost: "O(n²) — row-wise",
      detail: "La softmax è applicata riga per riga: ogni token i ha n scores (uno per ogni altro token), che vengono normalizzati in una distribuzione di probabilità. Con causal mask, i token futuri vengono mascherati con -∞.",
    },
    {
      id: "v",
      symbol: "· V",
      color: C.green,
      title: "Weighted sum dei Values",
      formula: "Output[i] = Σⱼ w[i,j] · V[j]",
      analogy: "I pesi di attenzione (w) dicono 'quanto prendo da ogni token j'. Il valore finale di ogni token è una media pesata dei Values di tutti gli altri token.",
      shape: "n × d_head",
      cost: "O(n² · d_head) FLOPs",
      detail: "La moltiplicazione matrice-matrice (n×n) · (n×d_head) = (n×d_head). Ogni riga dell'output è una combinazione lineare dei rows di V, pesata dalla riga corrispondente della matrice di attenzione.",
    },
  ];

  const active = step !== null ? parts[step] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Formula display */}
      <div style={{
        background: C.dark, borderRadius: 10, padding: "16px 20px",
        border: `1px solid ${C.border}`, textAlign: "center",
      }}>
        <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace", marginBottom: 8 }}>
          Clicca su ogni componente per i dettagli
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 4, fontSize: 22, fontFamily: "monospace", fontWeight: 700 }}>
          <span style={{ color: C.muted }}>Attn(Q,K,V) =</span>
          {[
            { i: 2, text: "softmax", color: C.orange },
            { text: "(", color: C.muted },
            { i: 0, text: "Q·Kᵀ", color: C.cyan },
            { i: 1, text: "/√d", color: C.yellow },
            { text: ")", color: C.muted },
            { i: 3, text: "· V", color: C.green },
          ].map((item, idx) =>
            item.i !== undefined ? (
              <span key={idx} onClick={() => setStep(step === item.i ? null : item.i)}
                style={{
                  color: item.color, cursor: "pointer",
                  background: step === item.i ? `${item.color}33` : `${item.color}11`,
                  border: `2px solid ${step === item.i ? item.color : item.color + "44"}`,
                  borderRadius: 6, padding: "2px 10px",
                  transition: "all 0.15s",
                  transform: step === item.i ? "scale(1.08)" : "scale(1)",
                  display: "inline-block",
                  boxShadow: step === item.i ? `0 0 14px ${item.color}55` : "none",
                }}>{item.text}</span>
            ) : (
              <span key={idx} style={{ color: item.color }}>{item.text}</span>
            )
          )}
        </div>
      </div>

      {/* Detail panel */}
      {active ? (
        <div style={{
          background: `${active.color}0d`, border: `2px solid ${active.color}55`,
          borderRadius: 10, padding: 18, transition: "all 0.2s",
        }}>
          <div style={{ color: active.color, fontWeight: 700, fontSize: 15, fontFamily: "monospace", marginBottom: 12 }}>
            {active.symbol} — {active.title}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>FORMULA</div>
              <div style={{ background: "#000", borderRadius: 6, padding: "8px 12px", fontFamily: "monospace", color: active.color, fontSize: 13 }}>
                {active.formula}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#0005", borderRadius: 6, padding: "8px 12px" }}>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>SHAPE</div>
                <div style={{ color: active.color, fontFamily: "monospace", fontSize: 14, fontWeight: 700, marginTop: 2 }}>{active.shape}</div>
              </div>
              <div style={{ flex: 2, background: "#0005", borderRadius: 6, padding: "8px 12px" }}>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace" }}>COSTO</div>
                <div style={{ color: C.red, fontFamily: "monospace", fontSize: 13, fontWeight: 700, marginTop: 2 }}>{active.cost}</div>
              </div>
            </div>
          </div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>
            <strong style={{ color: C.yellow }}>Analogia:</strong> {active.analogy}
          </div>
          <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
            <strong style={{ color: C.text }}>Dettaglio:</strong> {active.detail}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", color: C.muted, fontSize: 13, fontFamily: "monospace", padding: 20 }}>
          ↑ clicca su un componente colorato per espanderlo
        </div>
      )}

      {/* QKV shapes visual */}
      <ShapesVisual />
    </div>
  );
}

function ShapesVisual() {
  const n = 5, d = 4;
  const cellSize = 28;

  const matrixColors = {
    Q: C.cyan, K: C.orange, V: C.green,
    Kt: C.orange, Scores: C.yellow, Attn: C.purple, Out: C.teal,
  };

  const Matrix = ({ label, rows, cols, color, caption }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ fontSize: 11, color, fontFamily: "monospace", fontWeight: 700 }}>{label}</div>
      <div style={{
        display: "grid", gap: 1,
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
      }}>
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div key={i} style={{
            width: cellSize, height: cellSize, borderRadius: 3,
            background: `${color}${Math.floor(25 + Math.random() * 70).toString(16).padStart(2, "0")}`,
            border: `1px solid ${color}44`,
          }} />
        ))}
      </div>
      <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>{caption}</div>
    </div>
  );

  const Op = ({ sym, color = C.muted }) => (
    <div style={{ color, fontSize: 20, fontFamily: "monospace", fontWeight: 700, alignSelf: "center", padding: "0 4px" }}>
      {sym}
    </div>
  );

  return (
    <div style={{ background: C.dark, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
      <div style={{ color: C.muted, fontSize: 12, fontFamily: "monospace", marginBottom: 14 }}>
        Shapes delle matrici (n={n} token, d_head={d}):
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <Matrix label="Q" rows={n} cols={d} color={C.cyan} caption={`${n}×${d}`} />
        <Op sym="·" />
        <Matrix label="Kᵀ" rows={d} cols={n} color={C.orange} caption={`${d}×${n}`} />
        <Op sym="=" color={C.yellow} />
        <Matrix label="Scores" rows={n} cols={n} color={C.yellow} caption={`${n}×${n} ← O(n²)!`} />
        <Op sym="→" color={C.purple} />
        <Matrix label="Attn W" rows={n} cols={n} color={C.purple} caption={`${n}×${n}`} />
        <Op sym="·" />
        <Matrix label="V" rows={n} cols={d} color={C.green} caption={`${n}×${d}`} />
        <Op sym="=" color={C.teal} />
        <Matrix label="Output" rows={n} cols={d} color={C.teal} caption={`${n}×${d}`} />
      </div>
    </div>
  );
}

// ─── TAB 3: Quadratic complexity ─────────────────────────────────────────────
function ComplexityTab() {
  const [n, setN] = useState(6);
  const maxShow = Math.min(n, 10);
  const cellSize = Math.max(18, Math.floor(180 / maxShow));

  const tokens = ["il", "gatto", "dorme", "sul", "tappeto", "rosso", "ogni", "giorno", "come", "sempre"];

  // Attention scores heatmap (simulated)
  const scores = useMemo(() => {
    const m = [];
    for (let i = 0; i < maxShow; i++) {
      const row = [];
      for (let j = 0; j < maxShow; j++) {
        if (j > i) row.push(0); // masked
        else row.push(j === i ? 0.9 : Math.random() * 0.5);
      }
      // normalize row
      const s = row.reduce((a, b) => a + b, 0) || 1;
      m.push(row.map(v => v / s));
    }
    return m;
  }, [maxShow]);

  // Complexity data
  const complexityData = [1, 2, 4, 8, 16, 32, 64, 128, 256].map(x => ({
    n: x,
    ops: x * x,
    linear: x * 64,
  }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      <Box color={C.red} icon="🔴" title="Perché O(n²)?">
        Per calcolare la matrice <Mono color={C.yellow}>n×n</Mono>, ogni token <strong style={{ color: C.text }}>i</strong> deve fare
        il dot product con ogni altro token <strong style={{ color: C.text }}>j</strong>. Con n token si hanno
        esattamente <strong style={{ color: C.red }}>n × n = n² operazioni</strong>.
        Raddoppiare il contesto → quadruplicare le operazioni (e la memoria).
      </Box>

      {/* Interactive: counting pairs */}
      <div style={{ background: C.dark, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ color: C.text, fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>
            Matrice di attenzione per <Tag color={C.cyan}>n={maxShow}</Tag> token
          </div>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "monospace" }}>
            {maxShow}² = <span style={{ color: C.red, fontWeight: 700 }}>{maxShow * maxShow}</span> celle
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Heatmap */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Column headers */}
            <div style={{ display: "flex", gap: 2, marginLeft: cellSize + 4 }}>
              {tokens.slice(0, maxShow).map((t, j) => (
                <div key={j} style={{ width: cellSize, fontSize: 9, color: C.orange, fontFamily: "monospace", textAlign: "center", overflow: "hidden" }}>
                  {t.slice(0, 3)}
                </div>
              ))}
            </div>
            {tokens.slice(0, maxShow).map((tok, i) => (
              <div key={i} style={{ display: "flex", gap: 2, alignItems: "center" }}>
                <div style={{ width: cellSize, fontSize: 9, color: C.cyan, fontFamily: "monospace", textAlign: "right", marginRight: 4, overflow: "hidden" }}>
                  {tok.slice(0, 3)}
                </div>
                {scores[i].map((v, j) => (
                  <div key={j} title={`${tokens[i]}→${tokens[j]}: ${v.toFixed(2)}`} style={{
                    width: cellSize, height: cellSize, borderRadius: 3,
                    background: v === 0
                      ? `${C.border}55`
                      : `rgba(168, 85, 247, ${0.1 + v * 0.9})`,
                    border: `1px solid ${v === 0 ? C.border + "33" : C.purple + "44"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 8, color: C.purple, fontFamily: "monospace",
                  }}>
                    {v > 0 && maxShow <= 6 ? v.toFixed(1) : ""}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Stats panel */}
          <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: `${C.red}11`, border: `1px solid ${C.red}33`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ color: C.red, fontFamily: "monospace", fontSize: 11 }}>Totale celle (n²)</div>
              <div style={{ color: C.red, fontSize: 22, fontWeight: 800, fontFamily: "monospace" }}>{maxShow * maxShow}</div>
            </div>
            <div style={{ background: `${C.green}11`, border: `1px solid ${C.green}33`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ color: C.green, fontFamily: "monospace", fontSize: 11 }}>Celle attive (triangolo)</div>
              <div style={{ color: C.green, fontSize: 22, fontWeight: 800, fontFamily: "monospace" }}>
                {Math.round(maxShow * (maxShow + 1) / 2)}
              </div>
              <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace" }}>≈ n²/2, ancora O(n²)</div>
            </div>
            <div style={{ background: `${C.muted}11`, border: `1px solid ${C.muted}33`, borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ color: C.muted, fontFamily: "monospace", fontSize: 11 }}>Celle mascherate</div>
              <div style={{ color: C.muted, fontSize: 22, fontWeight: 800, fontFamily: "monospace" }}>
                {Math.round(maxShow * (maxShow - 1) / 2)}
              </div>
              <div style={{ color: C.muted, fontSize: 10, fontFamily: "monospace" }}>-∞ prima del softmax</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12, color: C.muted, fontFamily: "monospace" }}>
            Token: <strong style={{ color: C.cyan }}>{maxShow}</strong>
            {n > 10 && <span style={{ color: C.orange }}> (mostrando 10/{n})</span>}
          </label>
          <input type="range" min={2} max={32} value={n}
            onChange={e => setN(Number(e.target.value))}
            style={{ width: "100%", marginTop: 4, accentColor: C.cyan }} />
        </div>
      </div>

      {/* "Raddoppio" table */}
      <div style={{ background: C.dark, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
        <div style={{ color: C.yellow, fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
          Effetto del raddoppio del contesto
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "monospace", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.border}` }}>
              {["n token", "n² cells", "Δ vs metà", "Memoria scores (fp16, 32h)"].map(h => (
                <th key={h} style={{ color: C.muted, padding: "6px 10px", textAlign: "left", fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[512, 1024, 2048, 4096, 8192, 16384, 32768, 65536].map((n2, i) => {
              const cells = n2 * n2;
              const mb = (32 * cells * 2) / 1e6;
              const delta = i === 0 ? "—" : "×4";
              return (
                <tr key={n2} style={{ borderBottom: `1px solid ${C.border}22` }}>
                  <td style={{ padding: "7px 10px", color: C.cyan, fontWeight: 600 }}>{n2 >= 1000 ? n2 / 1000 + "K" : n2}</td>
                  <td style={{ padding: "7px 10px", color: C.text }}>{cells >= 1e9 ? (cells / 1e9).toFixed(1) + "B" : cells >= 1e6 ? (cells / 1e6).toFixed(1) + "M" : (cells / 1e3).toFixed(0) + "K"}</td>
                  <td style={{ padding: "7px 10px", color: i === 0 ? C.muted : C.red, fontWeight: i > 0 ? 700 : 400 }}>{delta}</td>
                  <td style={{ padding: "7px 10px", color: mb > 10000 ? C.red : mb > 1000 ? C.orange : C.green, fontFamily: "monospace" }}>
                    {mb >= 1000 ? (mb / 1000).toFixed(1) + " GB" : mb.toFixed(0) + " MB"}
                    {mb > 80000 && <span style={{ color: C.red, fontSize: 10 }}> 💀 OOM</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontFamily: "monospace" }}>
          *Solo la matrice scores, senza KV cache, senza pesi, senza activations — per un singolo layer in training
        </div>
      </div>

      <Box color={C.purple} icon="🎯" title="Intuizione geometrica">
        La complessità quadratica nasce dall'algebra lineare: il prodotto di una matrice <Mono color={C.cyan}>(n×d)</Mono> per
        la sua trasposta <Mono color={C.orange}>(d×n)</Mono> produce una matrice <Mono color={C.red}>(n×n)</Mono>.
        Non c'è modo di evitarlo con la full attention standard — ogni token deve "guardare" ogni altro token.
        Per questo le alternative (linear attention, SSM, sliding window) <strong style={{ color: C.text }}>approssimano o vincolano</strong> questo prodotto,
        rinunciando a qualcosa di espressività in cambio di complessità inferiore.
      </Box>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const TABS = [
  { label: "1 · Dove vive la matrice", color: C.purple },
  { label: "2 · Formula passo per passo", color: C.cyan },
  { label: "3 · Complessità O(n²)", color: C.red },
];

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{
      background: C.bg, minHeight: "100vh", color: C.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: "28px 20px", maxWidth: 900, margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "monospace", color: C.cyan, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
          Transformer Internals · Deep Dive
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          L'Attention Matrix
        </h1>
        <p style={{ color: C.muted, fontSize: 15, margin: 0 }}>
          Dove vive, come funziona, perché costa O(n²)
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
            fontFamily: "monospace",
            background: tab === i ? `${t.color}22` : C.card,
            color: tab === i ? t.color : C.muted,
            fontWeight: tab === i ? 700 : 400,
            border: `1px solid ${tab === i ? t.color : C.border}`,
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: 24,
        borderTop: `3px solid ${TABS[tab].color}`,
      }}>
        {tab === 0 && <WhereTab />}
        {tab === 1 && <FormulaTab />}
        {tab === 2 && <ComplexityTab />}
      </div>
    </div>
  );
}
