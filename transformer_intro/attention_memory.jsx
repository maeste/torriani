import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell
} from "recharts";

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

function AttentionGrid({ seqLen }) {
  const maxShow = Math.min(seqLen, 8);
  const cellSize = Math.floor(200 / maxShow);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "monospace" }}>
        Attention Matrix ({seqLen}×{seqLen} = {seqLen * seqLen} valori)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${maxShow}, ${cellSize}px)`, gap: 2 }}>
        {Array.from({ length: maxShow * maxShow }).map((_, i) => {
          const row = Math.floor(i / maxShow);
          const col = i % maxShow;
          const intensity = col <= row ? 0.7 + Math.random() * 0.3 : 0.05;
          return (
            <div key={i} style={{
              width: cellSize,
              height: cellSize,
              borderRadius: 2,
              background: col <= row
                ? `rgba(0, 212, 255, ${intensity})`
                : `rgba(30, 45, 74, 0.8)`,
              transition: "all 0.2s",
            }} />
          );
        })}
      </div>
      {seqLen > 8 && (
        <div style={{ fontSize: 11, color: COLORS.accent2 }}>
          ↑ mostrando solo {maxShow}×{maxShow} — reale: {seqLen}×{seqLen}
        </div>
      )}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        fontFamily: "monospace",
      }}>
        <div style={{ color: COLORS.muted, marginBottom: 4 }}>n = {label} token</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [seqLen, setSeqLen] = useState(16);

  const chartData = useMemo(() => {
    return [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192].map(n => ({
      n,
      "O(n²) Attention": n * n,
      "O(n) KV Cache": n * 128,  // n * d_head
      "O(1) Pesi modello": 1000000,
    }));
  }, []);

  const breakdownData = useMemo(() => {
    const n = seqLen;
    const dModel = 512;
    const heads = 8;
    const dHead = dModel / heads;
    return [
      { name: "Q, K, V projections", value: 3 * n * dModel, color: COLORS.accent },
      { name: "Attention scores (Q·Kᵀ)", value: heads * n * n, color: COLORS.accent2 },
      { name: "Attention weights (softmax)", value: heads * n * n, color: COLORS.accent3 },
      { name: "Output projection", value: n * dModel, color: COLORS.accent4 },
    ];
  }, [seqLen]);

  const kvData = useMemo(() => {
    return [64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072].map(n => {
      const layers = 32;
      const heads = 32;
      const dHead = 128;
      const bytes = 2 * layers * heads * n * dHead * 2; // K + V, fp16
      return {
        n,
        "KV Cache (MB)": Math.round(bytes / 1024 / 1024),
        "Attn Matrix (MB)": Math.round(heads * layers * n * n * 2 / 1024 / 1024),
      };
    });
  }, []);

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
          Deep Dive · Transformer Internals
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Memoria & Contesto nei Transformer
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Perché raddoppiare il contesto non significa raddoppiare la memoria
        </p>
      </div>

      {/* Analogia */}
      <Section title="🧠 L'Analogia" accent={COLORS.highlight}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16 }}>
            <div style={{ color: COLORS.highlight, fontWeight: 600, marginBottom: 8 }}>
              📝 Riunione con n persone
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Ogni persona deve <strong style={{ color: COLORS.text }}>prestare attenzione</strong> a tutte le altre.
              Con 10 persone → 100 interazioni. Con 100 persone → 10.000 interazioni.
              <br /><br />
              L'attention fa <em>esattamente</em> questo: ogni token "guarda" tutti gli altri token.
            </p>
          </div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16 }}>
            <div style={{ color: COLORS.accent2, fontWeight: 600, marginBottom: 8 }}>
              📊 In formule
            </div>
            <Formula>Attn(Q,K,V) = softmax(QKᵀ/√d) · V</Formula>
            <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>
              Il prodotto <Tag color={COLORS.accent}>Q</Tag>·<Tag color={COLORS.accent}>Kᵀ</Tag> produce
              una matrice <strong style={{ color: COLORS.accent2 }}>n×n</strong> — qui sta il collo di bottiglia.
            </p>
          </div>
        </div>
      </Section>

      {/* Visualizzazione matrice interattiva */}
      <Section title="🔲 La Matrice di Attenzione" accent={COLORS.accent}>
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <AttentionGrid seqLen={seqLen} />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>
              Ogni cella <span style={{ color: COLORS.accent }}>■</span> rappresenta il "peso di attenzione"
              tra due token. Con <strong style={{ color: COLORS.text }}>n={seqLen}</strong> token:
            </p>
            <Formula>{seqLen} × {seqLen} = {seqLen * seqLen} valori da memorizzare</Formula>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6 }}>
              Il triangolo inferiore (causal mask) viene usato in decoder-only models come GPT/Claude:
              ogni token vede solo i token precedenti, ma la matrice è <em>comunque allocata</em> in memoria.
            </p>
            <div style={{ marginTop: 12 }}>
              <label style={{ color: COLORS.muted, fontSize: 13, fontFamily: "monospace" }}>
                Lunghezza sequenza: <strong style={{ color: COLORS.accent }}>{seqLen}</strong>
              </label>
              <input type="range" min={4} max={64} value={seqLen}
                onChange={e => setSeqLen(Number(e.target.value))}
                style={{ width: "100%", marginTop: 8, accentColor: COLORS.accent }}
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Grafico complessità */}
      <Section title="📈 Crescita della Memoria per Componente" accent={COLORS.accent2}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 16, marginTop: 0 }}>
          Non tutta la memoria scala allo stesso modo — i pesi del modello sono fissi, il KV cache è lineare, ma la matrice di attenzione è <strong style={{ color: COLORS.accent2 }}>quadratica</strong>.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData.filter(d => d.n <= 2048)} margin={{ left: 10, right: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="n" stroke={COLORS.muted} tick={{ fontSize: 11, fill: COLORS.muted }}
              label={{ value: "Lunghezza contesto (n)", position: "insideBottom", offset: -10, fill: COLORS.muted, fontSize: 12 }} />
            <YAxis stroke={COLORS.muted} tick={{ fontSize: 11, fill: COLORS.muted }} tickFormatter={v => v >= 1e6 ? `${(v/1e6).toFixed(1)}M` : v >= 1e3 ? `${(v/1e3).toFixed(0)}K` : v} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Line type="monotone" dataKey="O(n²) Attention" stroke={COLORS.accent2} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="O(n) KV Cache" stroke={COLORS.accent} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="O(1) Pesi modello" stroke={COLORS.muted} strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      {/* KV Cache */}
      <Section title="💾 KV Cache: il vero costo in produzione" accent={COLORS.accent3}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 8, marginTop: 0, lineHeight: 1.7 }}>
          In inferenza con generazione token-by-token, si usa il <Tag color={COLORS.accent3}>KV Cache</Tag> per non
          ricalcolare K e V a ogni step. Scala <strong style={{ color: COLORS.accent4 }}>O(n)</strong> — ma con un coefficiente
          enorme: <code style={{ color: COLORS.highlight }}>2 × layers × heads × d_head × n × sizeof(fp16)</code>
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={kvData} margin={{ left: 10, right: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="kvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.accent3} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.accent3} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="attnGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.accent2} stopOpacity={0.4} />
                <stop offset="95%" stopColor={COLORS.accent2} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="n" stroke={COLORS.muted} tick={{ fontSize: 10, fill: COLORS.muted }}
              tickFormatter={v => v >= 1000 ? `${v/1000}K` : v}
              label={{ value: "Contesto (token)", position: "insideBottom", offset: -10, fill: COLORS.muted, fontSize: 12 }} />
            <YAxis stroke={COLORS.muted} tick={{ fontSize: 11, fill: COLORS.muted }}
              label={{ value: "MB", angle: -90, position: "insideLeft", fill: COLORS.muted, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            <Area type="monotone" dataKey="KV Cache (MB)" stroke={COLORS.accent3} fill="url(#kvGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="Attn Matrix (MB)" stroke={COLORS.accent2} fill="url(#attnGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, borderLeft: `3px solid ${COLORS.accent3}` }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.accent3, marginBottom: 4 }}>Llama-3 70B @ 128K ctx</div>
            <div style={{ color: COLORS.text, fontWeight: 700 }}>~160 GB solo di KV Cache</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>più del modello stesso (fp16)</div>
          </div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, borderLeft: `3px solid ${COLORS.accent2}` }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.accent2, marginBottom: 4 }}>Training full attention</div>
            <div style={{ color: COLORS.text, fontWeight: 700 }}>OOM oltre ~4-8K token</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>senza gradient checkpointing</div>
          </div>
        </div>
      </Section>

      {/* Ottimizzazioni */}
      <Section title="⚡ Le Ottimizzazioni: da O(n²) verso O(n)" accent={COLORS.accent4}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            {
              name: "FlashAttention",
              tag: "I/O aware",
              desc: "Non riduce la complessità algoritmica (ancora O(n²) FLOPs) ma minimizza i trasferimenti HBM↔SRAM. Ricalcola on-the-fly durante il backward. Risultato: ~3-8x speedup, memoria quasi O(n).",
              color: COLORS.accent4,
            },
            {
              name: "Sliding Window Attention",
              tag: "local context",
              desc: "Ogni token guarda solo una finestra di w token vicini. Complessità: O(n·w). Usato in Mistral. Limite: perde il contesto globale; si compensa con alcuni 'global tokens'.",
              color: COLORS.accent,
            },
            {
              name: "Multi-Query / GQA",
              tag: "KV compression",
              desc: "Più query heads condividono le stesse K, V. Grouped Query Attention (Llama3) riduce il KV cache di 4-8x senza grosso impatto sulla qualità.",
              color: COLORS.accent3,
            },
            {
              name: "Linear Attention / SSMs",
              tag: "O(n)",
              desc: "Mamba, RWKV usano una ricorrenza che porta a O(n) in memoria e tempo. Trade-off: il 'recall' su contesti lunghi è peggiore della full attention.",
              color: COLORS.accent2,
            },
          ].map(opt => (
            <div key={opt.name} style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 14,
              borderTop: `2px solid ${opt.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontWeight: 700, color: COLORS.text, fontSize: 14 }}>{opt.name}</span>
                <Tag color={opt.color}>{opt.tag}</Tag>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Summary table */}
      <Section title="📋 Cheat Sheet: Complessità in Inferenza" accent={COLORS.highlight}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "monospace" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {["Componente", "Complessità", "Scala con n?", "Note"].map(h => (
                <th key={h} style={{ color: COLORS.muted, padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Pesi del modello", "O(1)", "No", "Fissi, caricati una volta"],
              ["Activation buffer", "O(n)", "Lineare", "Layer by layer"],
              ["KV Cache", "O(n × L × H × d)", "Lineare*", "*coefficiente alto!"],
              ["Attention Matrix", "O(n²)", "Quadratica 🔴", "Collo di bottiglia principale"],
              ["Attention (FlashAttn)", "O(n)", "Lineare*", "*stesso FLOP, meno I/O"],
              ["Attn Sliding Window", "O(n × w)", "Lineare", "w = window size"],
              ["Linear Attn / SSM", "O(n)", "Lineare ✅", "Peggiore recall"],
            ].map(([comp, compl, scale, note], i) => (
              <tr key={i} style={{
                borderBottom: `1px solid ${COLORS.border}22`,
                background: i % 2 === 0 ? "transparent" : "#00000022",
              }}>
                <td style={{ padding: "10px 12px", color: COLORS.text }}>{comp}</td>
                <td style={{ padding: "10px 12px", color: COLORS.highlight }}>{compl}</td>
                <td style={{ padding: "10px 12px", color: scale.includes("🔴") ? COLORS.accent2 : scale.includes("✅") ? COLORS.accent4 : COLORS.muted }}>{scale}</td>
                <td style={{ padding: "10px 12px", color: COLORS.muted }}>{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Valori di esempio: d_model=4096, heads=32, d_head=128, layers=32 (stile Llama-3 70B)
      </div>
    </div>
  );
}
