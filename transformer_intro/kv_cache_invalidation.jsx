import { useState, useCallback } from "react";

const C = {
  bg: "#0a0e1a",
  card: "#0f1729",
  border: "#1e2d4a",
  cyan: "#00d4ff",
  orange: "#ff6b35",
  purple: "#a855f7",
  green: "#22c55e",
  yellow: "#fbbf24",
  red: "#ef4444",
  text: "#e2e8f0",
  muted: "#64748b",
  dark: "#060912",
};

const Label = ({ children, color, size = 12 }) => (
  <span style={{
    background: `${color}22`, color, border: `1px solid ${color}55`,
    borderRadius: 4, padding: "2px 8px", fontSize: size,
    fontFamily: "monospace", whiteSpace: "nowrap", display: "inline-block",
  }}>{children}</span>
);

const Callout = ({ color = C.cyan, icon, title, children }) => (
  <div style={{
    background: `${color}0d`, border: `1px solid ${color}44`,
    borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "12px 16px",
    marginBottom: 12,
  }}>
    {title && <div style={{ color, fontWeight: 700, fontSize: 13, fontFamily: "monospace", marginBottom: 6 }}>
      {icon && <span style={{ marginRight: 6 }}>{icon}</span>}{title}
    </div>}
    <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>{children}</div>
  </div>
);

// ─── KV CACHE INVALIDATION SIMULATOR ────────────────────────────────────────
const SCENARIOS = [
  {
    id: "prefix",
    label: "Prefix Cache Hit",
    tokens: ["[SYS]", "Sei", "un", "assistente", "utile", ".", "[USER]", "Ciao", "come", "stai", "?", "[ASS]", "Sto", "bene"],
    cached: [true, true, true, true, true, true, true, true, true, true, true, false, false, false],
    modified: [],
    desc: "La sequenza è identica al turno precedente fino a [ASS]. Il prefix fino a '?' è già in cache → si riusa tutto.",
    color: C.green,
  },
  {
    id: "insert_middle",
    label: "Modifica in mezzo",
    tokens: ["[SYS]", "Sei", "un", "assistente", "⚡NUOVO", "utile", ".", "[USER]", "Ciao", "come", "stai", "?", "[ASS]", "..."],
    cached: [true, true, true, true, false, false, false, false, false, false, false, false, false, false],
    modified: [4],
    desc: "Un token viene inserito/modificato al centro (es. si cambia il system prompt). Tutti i token successivi vengono invalidati — anche se identici.",
    color: C.red,
  },
  {
    id: "system_prompt",
    label: "System prompt stabile",
    tokens: ["[SYS]", "Sei", "un", "assistente", "utile", ".", "[USER]", "Cosa", "è", "Python", "?", "[ASS]", "Python", "è"],
    cached: [true, true, true, true, true, true, true, false, false, false, false, false, false, false],
    modified: [],
    desc: "Il system prompt non cambia mai → rimane in cache. Solo la nuova domanda dell'utente va ricalcolata. Ottimizzazione fondamentale in produzione.",
    color: C.cyan,
  },
  {
    id: "rag",
    label: "RAG: documento prima o dopo?",
    tokens: ["[SYS]", "...", "[DOC]", "Testo", "lungo", "recuperato", "...", "[USER]", "Domanda", "?", "[ASS]", "..."],
    cached: [true, true, true, true, true, true, true, true, false, false, false, false],
    modified: [],
    desc: "In RAG, metti il documento recuperato PRIMA della domanda utente. Così il prefix [SYS]+[DOC] può essere cachato se il documento è lo stesso. La domanda cambia, il documento no.",
    color: C.purple,
  },
];

function TokenBar({ tokens, cached, modified }) {
  const colors = { cached: C.green, invalidated: C.red, modified: C.orange, tbd: C.muted };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {tokens.map((tok, i) => {
          const isMod = modified.includes(i);
          const isCached = cached[i];
          let bg, border, textColor, statusLabel;

          if (isMod) {
            bg = `${C.orange}33`; border = C.orange; textColor = C.orange; statusLabel = "CHANGED";
          } else if (isCached) {
            bg = `${C.green}22`; border = C.green; textColor = C.green; statusLabel = "HIT ✓";
          } else {
            bg = `${C.red}18`; border = C.red; textColor = C.red; statusLabel = "MISS ✗";
          }

          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{
                padding: "6px 10px", borderRadius: 6,
                background: bg, border: `1.5px solid ${border}`,
                fontSize: 12, fontFamily: "monospace",
                color: textColor, fontWeight: 600,
                whiteSpace: "nowrap",
              }}>{tok}</div>
              <div style={{ fontSize: 9, color: border, fontFamily: "monospace" }}>{statusLabel}</div>
            </div>
          );
        })}
      </div>

      {/* Legend + stats */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
        {[
          { color: C.green, label: `Cache HIT (${tokens.filter((_, i) => cached[i] && !modified.includes(i)).length})` },
          { color: C.red, label: `Cache MISS (${tokens.filter((_, i) => !cached[i] && !modified.includes(i)).length})` },
          { color: C.orange, label: `Token modificato (${modified.length})` },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, opacity: 0.7 }} />
            <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvalidationSimulator() {
  const [activeScenario, setActiveScenario] = useState(0);
  const s = SCENARIOS[activeScenario];
  const hits = s.cached.filter(Boolean).length;
  const total = s.tokens.length;
  const hitRate = Math.round((hits / total) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {SCENARIOS.map((sc, i) => (
          <button key={i} onClick={() => setActiveScenario(i)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer",
            fontFamily: "monospace", border: `1px solid ${i === activeScenario ? sc.color : C.border}`,
            background: i === activeScenario ? `${sc.color}22` : C.card,
            color: i === activeScenario ? sc.color : C.muted,
            fontWeight: i === activeScenario ? 700 : 400,
            transition: "all 0.15s",
          }}>{sc.label}</button>
        ))}
      </div>

      <div style={{ background: C.dark, borderRadius: 10, padding: 16, border: `1px solid ${C.border}` }}>
        <TokenBar tokens={s.tokens} cached={s.cached} modified={s.modified} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{
          flex: 1, background: `${s.color}11`, border: `1px solid ${s.color}44`,
          borderRadius: 8, padding: "10px 14px",
        }}>
          <div style={{ color: s.color, fontFamily: "monospace", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
            Cache Hit Rate
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "monospace" }}>
            {hitRate}%
          </div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>
            {hits}/{total} token da cache
          </div>
        </div>
        <div style={{
          flex: 3, background: C.dark, borderRadius: 8, padding: "10px 14px",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ color: C.text, fontSize: 13, lineHeight: 1.7 }}>{s.desc}</div>
        </div>
      </div>
    </div>
  );
}

// ─── PROPAGATION VISUAL ──────────────────────────────────────────────────────
function PropagationViz() {
  const [changeAt, setChangeAt] = useState(3);
  const n = 10;
  const tokens = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "."];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
        Sposta il cursore per cambiare quale token viene modificato.
        Nota come l'invalidazione si propaga in avanti — <strong style={{ color: C.red }}>sempre tutti i token successivi</strong>.
      </p>

      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {tokens.map((tok, i) => {
          const isChanged = i === changeAt;
          const isInvalidated = i > changeAt;
          const isOk = i < changeAt;

          return (
            <div
              key={i}
              onClick={() => setChangeAt(i)}
              style={{
                cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                transition: "transform 0.1s",
              }}
            >
              <div style={{
                padding: "8px 12px", borderRadius: 6,
                background: isChanged ? `${C.orange}33` : isInvalidated ? `${C.red}18` : `${C.green}22`,
                border: `2px solid ${isChanged ? C.orange : isInvalidated ? C.red : C.green}`,
                fontSize: 13, fontFamily: "monospace",
                color: isChanged ? C.orange : isInvalidated ? C.red : C.green,
                fontWeight: 600,
                transform: isChanged ? "scale(1.1)" : "scale(1)",
                boxShadow: isChanged ? `0 0 12px ${C.orange}55` : "none",
              }}>
                {tok}
              </div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: isChanged ? C.orange : isInvalidated ? C.red : C.green }}>
                {isChanged ? "CHANGED" : isInvalidated ? "INVALID" : "✓"}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        <div style={{ flex: 1, background: `${C.green}11`, borderRadius: 8, padding: "8px 14px", border: `1px solid ${C.green}33` }}>
          <div style={{ color: C.green, fontFamily: "monospace", fontSize: 11 }}>Token cached</div>
          <div style={{ color: C.green, fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}>{changeAt}</div>
        </div>
        <div style={{ flex: 1, background: `${C.red}11`, borderRadius: 8, padding: "8px 14px", border: `1px solid ${C.red}33` }}>
          <div style={{ color: C.red, fontFamily: "monospace", fontSize: 11 }}>Token da ricalcolare</div>
          <div style={{ color: C.red, fontSize: 20, fontWeight: 800, fontFamily: "monospace" }}>{n - changeAt}</div>
        </div>
        <div style={{ flex: 2, background: C.dark, borderRadius: 8, padding: "8px 14px", border: `1px solid ${C.border}` }}>
          <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>
            Perché? Ogni token in inferenza <strong style={{ color: C.text }}>dipende causalmente</strong> da tutti i token precedenti.
            Se cambio il token {changeAt}, il token {changeAt + 1} potrebbe produrre un output diverso → e così via.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 4 }}>
        <label style={{ fontSize: 12, color: C.muted, fontFamily: "monospace" }}>
          Clicca su un token per scegliere dove cambia → oppure trascina: posizione {changeAt + 1}/{n}
        </label>
        <input type="range" min={0} max={n - 1} value={changeAt}
          onChange={e => setChangeAt(Number(e.target.value))}
          style={{ width: "100%", marginTop: 4, accentColor: C.orange }} />
      </div>
    </div>
  );
}

// ─── STRATEGIES TABLE ────────────────────────────────────────────────────────
function StrategiesTable() {
  const strategies = [
    {
      pattern: "System prompt fisso in cima",
      good: true,
      why: "Il prefix più lungo possibile rimane stabile → max hit rate",
      example: "[SYS sempre uguale] → [storia chat] → [nuova domanda]",
      color: C.green,
    },
    {
      pattern: "System prompt che cambia ad ogni chiamata",
      good: false,
      why: "Invalida tutto ciò che segue — zero cache hit",
      example: "Inserire timestamp o variabili dinamiche nel system prompt",
      color: C.red,
    },
    {
      pattern: "RAG: documento PRIMA della domanda",
      good: true,
      why: "Se uso lo stesso documento per più domande, il KV del doc è già caldo",
      example: "[SYS] + [DOC stabile] + [domanda che cambia]",
      color: C.green,
    },
    {
      pattern: "RAG: documento DOPO la domanda",
      good: false,
      why: "Il prefix cambia ad ogni query → il documento viene sempre ricalcolato",
      example: "[SYS] + [domanda che cambia] + [DOC]",
      color: C.red,
    },
    {
      pattern: "Few-shot examples stabili",
      good: true,
      why: "Esempi identici a ogni chiamata → si cachano come parte del prefix",
      example: "[SYS] + [ex1] + [ex2] + [ex3] + [nuova query]",
      color: C.green,
    },
    {
      pattern: "Temperatura/sampling diverso",
      good: true,
      why: "Non impatta il KV cache — riguarda solo il decoding, non il prefill",
      example: "Cambiare temp non invalida niente",
      color: C.cyan,
    },
    {
      pattern: "Multi-turn chat con history",
      good: true,
      why: "La history precedente è già cachata — si ricalcola solo il nuovo turno",
      example: "turn1 + turn2 + turn3 (cached) + [nuovo turno]",
      color: C.green,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {strategies.map((s, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 2fr",
          gap: 10, alignItems: "start",
          background: i % 2 === 0 ? C.dark : "transparent",
          borderRadius: 8, padding: "10px 12px",
          border: `1px solid ${C.border}33`,
          borderLeft: `3px solid ${s.color}`,
        }}>
          <div>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginBottom: 2 }}>
              {s.good ? "✅" : "❌"} {s.pattern}
            </div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{s.example}</div>
          </div>
          <div style={{ fontSize: 12, color: s.color, lineHeight: 1.5 }}>{s.why}</div>
          <div />
        </div>
      ))}
    </div>
  );
}

// ─── SEMANTIC DIAGRAM ────────────────────────────────────────────────────────
function CacheStructureDiagram() {
  const parts = [
    { label: "System Prompt", sublabel: "fisso, riusato sempre", color: C.green, w: "25%", icon: "⚙️" },
    { label: "Documento / Contesto", sublabel: "stabile per sessione", color: C.cyan, w: "30%", icon: "📄" },
    { label: "Chat History", sublabel: "cresce nel tempo", color: C.purple, w: "28%", icon: "💬" },
    { label: "Nuovo Turno", sublabel: "sempre ricalcolato", color: C.orange, w: "17%", icon: "✏️" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 3, alignItems: "stretch", height: 52 }}>
        {parts.map((p, i) => (
          <div key={i} style={{
            width: p.w, background: `${p.color}22`,
            border: `2px solid ${p.color}66`,
            borderRadius: i === 0 ? "8px 0 0 8px" : i === parts.length - 1 ? "0 8px 8px 0" : 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "4px 6px",
          }}>
            <span style={{ fontSize: 10, color: p.color, fontFamily: "monospace", textAlign: "center", fontWeight: 600 }}>
              {p.icon} {p.label}
            </span>
          </div>
        ))}
      </div>

      {/* Cache status indicators */}
      <div style={{ display: "flex", gap: 3, alignItems: "stretch" }}>
        {parts.map((p, i) => (
          <div key={i} style={{ width: p.w, textAlign: "center" }}>
            <div style={{ fontSize: 9, color: p.color, fontFamily: "monospace", lineHeight: 1.4 }}>
              {p.sublabel}
            </div>
            {i < parts.length - 1 && (
              <div style={{ fontSize: 9, color: C.green, fontFamily: "monospace", marginTop: 2 }}>CACHED ✓</div>
            )}
            {i === parts.length - 1 && (
              <div style={{ fontSize: 9, color: C.orange, fontFamily: "monospace", marginTop: 2 }}>PREFILL →</div>
            )}
          </div>
        ))}
      </div>

      <Callout color={C.yellow} icon="💡" title="La regola d'oro">
        Tutto ciò che sta a <strong style={{ color: C.text }}>sinistra del primo token che cambia</strong> è potenzialmente cachabile.
        Costruisci i tuoi prompt in ordine di <strong style={{ color: C.text }}>stabilità decrescente</strong>: cose fisse prima, cose variabili dopo.
      </Callout>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const TABS = [
  { label: "1 · Cos'è l'invalidazione", color: C.red },
  { label: "2 · Propagazione visiva", color: C.orange },
  { label: "3 · Scenari pratici", color: C.cyan },
  { label: "4 · Best practice", color: C.green },
];

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{
      background: C.bg, minHeight: "100vh", color: C.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: "28px 20px", maxWidth: 860, margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "monospace", color: C.red, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
          KV Cache Internals
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          Invalidazione della KV Cache
        </h1>
        <p style={{ color: C.muted, fontSize: 15, margin: 0 }}>
          Perché cambiare un token in mezzo è catastrofico per le performance
        </p>
      </div>

      {/* Tabs */}
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
        {tab === 0 && (
          <div>
            <h3 style={{ color: TABS[0].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Il problema
            </h3>

            <Callout color={C.cyan} icon="🔑" title="Come funziona la KV Cache (recap)">
              Durante il <strong style={{ color: C.text }}>prefill</strong> (elaborazione dell'input), per ogni token il modello calcola
              K e V in ogni layer. Questi vengono salvati in cache. Durante la <strong style={{ color: C.text }}>generazione</strong>,
              ogni nuovo token può usare i K, V già calcolati senza ricalcolarli.
            </Callout>

            <Callout color={C.red} icon="💥" title="L'invalidazione">
              La KV Cache funziona su <strong style={{ color: C.text }}>prefissi</strong>. Se il token in posizione <em>i</em> cambia,
              tutti i K, V delle posizioni successive diventano <strong style={{ color: C.red }}>invalidi</strong> e vanno ricalcolati.
              Questo perché ogni token dipende causalmente da tutti i token che lo precedono
              (via attention con la causal mask).
            </Callout>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 12, lineHeight: 1.7 }}>
                Analogia: immagina di star trascrivendo un libro. Se qualcuno cambia una parola a pagina 5,
                devi <strong style={{ color: C.text }}>rileggere e riscrivere tutto da pagina 5 in poi</strong> — anche se
                il testo da pagina 6 in poi è identico. Il senso delle frasi precedenti influenza la comprensione di quelle successive.
              </div>
            </div>

            <div style={{
              background: C.dark, borderRadius: 10, padding: 16,
              border: `1px solid ${C.border}`, fontFamily: "monospace",
            }}>
              <div style={{ color: C.yellow, fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Le due fasi di un'inferenza</div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[
                  {
                    phase: "PREFILL",
                    color: C.cyan,
                    desc: "Elabora l'intero input in parallelo. Costruisce il KV Cache. Costo: O(n²) in memoria/tempo.",
                    tokens: ["tok₁", "tok₂", "tok₃", "tok₄"],
                    arrow: "tutto insieme →",
                  },
                  {
                    phase: "DECODE",
                    color: C.green,
                    desc: "Genera un token alla volta. Usa il KV Cache esistente. Costo: O(n) per token.",
                    tokens: ["gen₁", "gen₂", "gen₃"],
                    arrow: "uno per volta →",
                  },
                ].map(ph => (
                  <div key={ph.phase} style={{ flex: 1, minWidth: 200 }}>
                    <div style={{
                      color: ph.color, fontWeight: 700, fontSize: 13, marginBottom: 8,
                      borderBottom: `1px solid ${ph.color}44`, paddingBottom: 6,
                    }}>{ph.phase}</div>
                    <div style={{ display: "flex", gap: 3, marginBottom: 8, flexWrap: "wrap" }}>
                      {ph.tokens.map((t, i) => (
                        <div key={i} style={{
                          padding: "4px 8px", borderRadius: 4,
                          background: `${ph.color}22`, border: `1px solid ${ph.color}55`,
                          color: ph.color, fontSize: 11,
                        }}>{t}</div>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{ph.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 1 && (
          <div>
            <h3 style={{ color: TABS[1].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              La propagazione dell'invalidazione
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              Clicca su un token per vedere come l'invalidazione si propaga — come una <strong style={{ color: C.orange }}>cascata</strong> verso destra.
            </p>
            <PropagationViz />
          </div>
        )}

        {tab === 2 && (
          <div>
            <h3 style={{ color: TABS[2].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Scenari pratici
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              Quattro scenari reali. Ogni scenario mostra quanti token vengono serviti dalla cache vs ricalcolati.
            </p>
            <InvalidationSimulator />
          </div>
        )}

        {tab === 3 && (
          <div>
            <h3 style={{ color: TABS[3].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Come strutturare i prompt per massimizzare il cache hit
            </h3>

            <CacheStructureDiagram />

            <div style={{ marginTop: 20 }}>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 14, marginBottom: 12, fontFamily: "monospace" }}>
                Pattern ✅ / ❌
              </div>
              <StrategiesTable />
            </div>

            <div style={{
              marginTop: 20, background: C.dark, borderRadius: 10, padding: 16,
              border: `1px solid ${C.yellow}44`,
            }}>
              <div style={{ color: C.yellow, fontWeight: 700, fontSize: 13, fontFamily: "monospace", marginBottom: 10 }}>
                ⚡ Prompt Caching — Anthropic API
              </div>
              <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 10px" }}>
                L'API di Anthropic supporta il <Label color={C.yellow}>prompt caching</Label> esplicito:
                si aggiunge <code style={{ background: "#0004", padding: "1px 4px", borderRadius: 3, color: C.cyan }}>cache_control: &#123;"type": "ephemeral"&#125;</code> sui blocchi
                che vuoi cachare. Il server mantiene la cache per ~5 minuti (riutilizzabile).
              </p>
              <div style={{ background: "#000", borderRadius: 8, padding: 12, fontFamily: "monospace", fontSize: 12, color: C.cyan }}>
                <div style={{ color: C.muted }}>// Esempio: system prompt lungo cachato</div>
                <div style={{ color: C.text, marginTop: 6 }}>
                  {`{
  "role": "user", 
  "content": [
    {
      "type": "text",
      "text": "...system prompt lungo...",`}
                </div>
                <div style={{ color: C.yellow }}>
                  {`      "cache_control": {"type": "ephemeral"}`}
                </div>
                <div style={{ color: C.text }}>
                  {`    },
    { "type": "text", "text": "domanda utente" }
  ]
}`}
                </div>
              </div>
              <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.6, margin: "10px 0 0" }}>
                Costo: i token cachati costano ~10% del costo normale in input. Risparmio tipico: 60-90% dei costi
                su pipeline con system prompt / documenti fissi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
