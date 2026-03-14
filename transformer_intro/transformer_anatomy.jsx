import { useState } from "react";

const C = {
  bg: "#0a0e1a",
  card: "#0f1729",
  border: "#1e2d4a",
  cyan: "#00d4ff",
  orange: "#ff6b35",
  purple: "#a855f7",
  green: "#22c55e",
  yellow: "#fbbf24",
  text: "#e2e8f0",
  muted: "#64748b",
  red: "#ef4444",
};

const Label = ({ children, color, size = 12 }) => (
  <span style={{
    background: `${color}22`, color, border: `1px solid ${color}55`,
    borderRadius: 4, padding: "2px 8px", fontSize: size,
    fontFamily: "monospace", whiteSpace: "nowrap",
  }}>{children}</span>
);

const Arrow = ({ label, color = C.muted, vertical = false }) => (
  <div style={{
    display: "flex", flexDirection: vertical ? "column" : "row",
    alignItems: "center", gap: 4,
    margin: vertical ? "4px auto" : "0 4px",
  }}>
    {!vertical && <div style={{ width: 24, height: 2, background: color }} />}
    {vertical && <div style={{ width: 2, height: 16, background: color, margin: "0 auto" }} />}
    <span style={{ fontSize: 10, color: C.muted, fontFamily: "monospace", whiteSpace: "nowrap" }}>{label}</span>
    {!vertical && <div style={{ fontSize: 14, color }}>→</div>}
    {vertical && <div style={{ fontSize: 14, color, lineHeight: 1 }}>↓</div>}
  </div>
);

// ─── SECTION 1: d_model = d_head × heads ────────────────────────────────────
function VectorVisual({ dModel = 8, heads = 4 }) {
  const dHead = dModel / heads;
  const cellW = 28, cellH = 28;
  const headColors = [C.cyan, C.orange, C.purple, C.green, C.yellow, C.red, "#ec4899", "#06b6d4"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>
        Un token → vettore di dimensione <Label color={C.cyan}>d_model={dModel}</Label>
      </div>

      {/* d_model vector */}
      <div style={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        {Array.from({ length: dModel }).map((_, i) => {
          const headIdx = Math.floor(i / dHead);
          return (
            <div key={i} style={{
              width: cellW, height: cellH, borderRadius: 4,
              background: `${headColors[headIdx]}44`,
              border: `2px solid ${headColors[headIdx]}88`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: headColors[headIdx], fontFamily: "monospace",
            }}>h{headIdx}
            </div>
          );
        })}
        <span style={{ marginLeft: 8, fontSize: 12, color: C.muted, fontFamily: "monospace" }}>← d_model</span>
      </div>

      <Arrow label="ogni blocco colorato = 1 head" vertical color={C.cyan} />

      {/* Heads */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Array.from({ length: heads }).map((_, h) => (
          <div key={h} style={{
            border: `2px solid ${headColors[h]}88`,
            borderRadius: 8, padding: "8px 10px",
            background: `${headColors[h]}11`,
          }}>
            <div style={{ fontSize: 11, color: headColors[h], fontFamily: "monospace", marginBottom: 4 }}>
              Head {h}
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: dHead }).map((_, i) => (
                <div key={i} style={{
                  width: cellW, height: cellH, borderRadius: 4,
                  background: `${headColors[h]}55`,
                  border: `1px solid ${headColors[h]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: headColors[h],
                }}>·</div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 4, fontFamily: "monospace" }}>
              d_head={dHead}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "#000", borderRadius: 8, padding: "10px 14px",
        border: `1px solid ${C.border}`, fontFamily: "monospace",
        color: C.yellow, fontSize: 14, textAlign: "center",
      }}>
        d_model = heads × d_head = {heads} × {dHead} = {dModel}
      </div>
    </div>
  );
}

// ─── SECTION 2: Multi-Head Attention step by step ──────────────────────────
function MultiHeadViz({ nTokens = 3, heads = 2, dHead = 4 }) {
  const [step, setStep] = useState(0);
  const headColors = [C.cyan, C.orange, C.purple, C.green];
  const tokenLabels = ["il", "gatto", "dorme", "sul", "tappeto"];
  const tokens = tokenLabels.slice(0, nTokens);

  const steps = [
    {
      title: "Input: n token, ognuno è un vettore d_model",
      desc: "Ogni token (parola) viene rappresentato come un vettore denso di numeri — il suo embedding. Dimensione: d_model.",
    },
    {
      title: "Proiezione Q, K, V — per ogni head",
      desc: "Ogni head proietta l'input in 3 spazi diversi: Query (cosa cerco?), Key (cosa offro?), Value (cosa porto?). Ogni proiezione riduce la dimensione da d_model a d_head.",
    },
    {
      title: "Calcolo Attention Scores: Q·Kᵀ",
      desc: "Per ogni head, ogni token fa il dot product della sua Query con le Key di tutti gli altri. Risultato: matrice n×n di 'quanto mi interessa questo token?'",
    },
    {
      title: "Softmax + weighted sum dei Values",
      desc: "I punteggi diventano probabilità (softmax). Si usa per pesare i Values: ogni token aggrega informazioni da tutti gli altri proporzionalmente all'attenzione.",
    },
    {
      title: "Concatenazione heads + proiezione finale",
      desc: "Gli output di tutti gli heads vengono concatenati (dim: n × d_model) e proiettati con Wₒ. Ogni head ha 'visto' relazioni diverse → fusione ricca.",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Step nav */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer",
            fontFamily: "monospace", border: "none",
            background: step === i ? C.cyan : C.border,
            color: step === i ? C.bg : C.muted,
            fontWeight: step === i ? 700 : 400,
            transition: "all 0.15s",
          }}>
            Step {i + 1}
          </button>
        ))}
      </div>

      <div style={{
        background: "#000", borderRadius: 8, padding: "12px 16px",
        borderLeft: `3px solid ${C.cyan}`,
      }}>
        <div style={{ color: C.cyan, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{steps[step].title}</div>
        <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{steps[step].desc}</div>
      </div>

      {/* Visual per step */}
      <div style={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {step === 0 && (
          <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
            {tokens.map((t, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {Array.from({ length: dHead * heads }).map((_, j) => (
                    <div key={j} style={{
                      width: 28, height: 6, borderRadius: 2,
                      background: `rgba(0, 212, 255, ${0.2 + Math.random() * 0.6})`,
                    }} />
                  ))}
                </div>
                <div style={{ fontSize: 12, color: C.text, fontFamily: "monospace", fontWeight: 700 }}>{t}</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>d_model</div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: heads }).map((_, h) => (
              <div key={h} style={{
                border: `2px solid ${headColors[h]}88`, borderRadius: 10,
                padding: 14, background: `${headColors[h]}0a`,
              }}>
                <div style={{ color: headColors[h], fontFamily: "monospace", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                  Head {h}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Q", "K", "V"].map(proj => (
                    <div key={proj} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 11, color: headColors[h], fontFamily: "monospace", fontWeight: 700 }}>{proj}</div>
                      {tokens.map((t, i) => (
                        <div key={i} style={{ display: "flex", gap: 1 }}>
                          {Array.from({ length: dHead }).map((_, j) => (
                            <div key={j} style={{
                              width: 10, height: 10, borderRadius: 2,
                              background: `${headColors[h]}${Math.floor(30 + Math.random() * 70).toString(16)}`,
                            }} />
                          ))}
                        </div>
                      ))}
                      <div style={{ fontSize: 9, color: C.muted, fontFamily: "monospace" }}>d_head={dHead}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: heads }).map((_, h) => (
              <div key={h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ color: headColors[h], fontSize: 12, fontFamily: "monospace", fontWeight: 700 }}>
                  Head {h} — Attention Scores
                </div>
                <div style={{ display: "grid", gap: 2, gridTemplateColumns: `repeat(${nTokens}, 1fr)` }}>
                  {tokens.map((_, row) => tokens.map((_, col) => {
                    const v = col <= row ? 0.2 + Math.random() * 0.75 : 0.04;
                    return (
                      <div key={`${row}-${col}`} title={`${tokens[row]}→${tokens[col]}`} style={{
                        width: 36, height: 36, borderRadius: 4,
                        background: `${headColors[h]}${Math.floor(v * 220).toString(16).padStart(2, "0")}`,
                        border: `1px solid ${headColors[h]}33`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 9, color: headColors[h], fontFamily: "monospace",
                      }}>
                        {v > 0.1 ? v.toFixed(1) : "·"}
                      </div>
                    );
                  }))}
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {tokens.map((t, i) => (
                    <div key={i} style={{ width: 36, textAlign: "center", fontSize: 10, color: C.muted, fontFamily: "monospace" }}>{t}</div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>{nTokens}×{nTokens}</div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {Array.from({ length: heads }).map((_, h) => (
              <div key={h} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <div style={{ color: headColors[h], fontSize: 12, fontFamily: "monospace", fontWeight: 700 }}>
                  Head {h} — Output
                </div>
                {tokens.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontFamily: "monospace", width: 42, textAlign: "right" }}>{t}</div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: dHead }).map((_, j) => (
                        <div key={j} style={{
                          width: 14, height: 14, borderRadius: 3,
                          background: `${headColors[h]}${Math.floor(40 + Math.random() * 180).toString(16).padStart(2, "0")}`,
                          border: `1px solid ${headColors[h]}44`,
                        }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "monospace" }}>d_head</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {step === 4 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", width: "100%" }}>
            <div style={{ fontSize: 12, color: C.muted }}>Concatenazione di tutti gli heads per ogni token:</div>
            {tokens.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <div style={{ fontSize: 12, color: C.text, fontFamily: "monospace", width: 50, textAlign: "right", fontWeight: 700 }}>{t}</div>
                {Array.from({ length: heads }).map((_, h) => (
                  <div key={h} style={{ display: "flex", gap: 1 }}>
                    {Array.from({ length: dHead }).map((_, j) => (
                      <div key={j} style={{
                        width: 12, height: 20, borderRadius: 2,
                        background: headColors[h],
                        opacity: 0.5 + Math.random() * 0.5,
                      }} />
                    ))}
                  </div>
                ))}
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "monospace" }}>→ d_model = {heads * dHead}</div>
              </div>
            ))}
            <div style={{
              marginTop: 8, background: "#000", borderRadius: 8, padding: "10px 16px",
              fontFamily: "monospace", color: C.yellow, fontSize: 13,
              border: `1px solid ${C.border}`,
            }}>
              concat(head₀, head₁, …) · Wₒ  →  output d_model
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTION 3: Layer stack ──────────────────────────────────────────────────
function LayerStack({ nLayers = 6 }) {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {/* Input */}
        <div style={{
          border: `2px dashed ${C.muted}`, borderRadius: 8,
          padding: "6px 20px", fontSize: 12, color: C.muted, fontFamily: "monospace",
        }}>Input Embeddings</div>
        <Arrow vertical label="" color={C.muted} />

        {/* Layers */}
        {Array.from({ length: nLayers }).map((_, i) => {
          const isHov = hoveredLayer === i;
          const t = i / (nLayers - 1);
          const r = Math.round(0 + t * 255);
          const g = Math.round(212 - t * 100);
          const b = Math.round(255 - t * 180);
          const col = `rgb(${r},${g},${b})`;
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}
                style={{
                  width: 220, borderRadius: 10, cursor: "pointer",
                  border: `2px solid ${isHov ? col : col + "66"}`,
                  background: isHov ? `${col}22` : `${col}0a`,
                  padding: "10px 16px",
                  transition: "all 0.15s",
                  transform: isHov ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: col }}>
                  Layer {i + 1}
                </div>
                {isHov && (
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Multi-Head Attention", "Add & Norm", "Feed Forward", "Add & Norm"].map((sub, j) => (
                      <div key={j} style={{
                        fontSize: 11, fontFamily: "monospace",
                        color: j % 2 === 0 ? col : C.muted,
                        paddingLeft: 8, borderLeft: `2px solid ${j % 2 === 0 ? col : C.border}`,
                      }}>{sub}</div>
                    ))}
                  </div>
                )}
              </div>
              {i < nLayers - 1 && (
                <div style={{ width: 2, height: 8, background: col + "55" }} />
              )}
            </div>
          );
        })}

        <Arrow vertical label="" color={C.muted} />
        <div style={{
          border: `2px dashed ${C.green}`, borderRadius: 8,
          padding: "6px 20px", fontSize: 12, color: C.green, fontFamily: "monospace",
        }}>Output / Logits</div>
      </div>

      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginTop: 0 }}>
          <strong style={{ color: C.text }}>Perché tanti layer?</strong><br />
          Ogni layer raffina la rappresentazione. I layer bassi catturano sintassi e pattern locali, i layer alti catturano semantica e ragionamento.
        </p>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: C.text }}>Hover</strong> su un layer per vedere cosa contiene.
        </p>
        <div style={{
          background: "#000", borderRadius: 8, padding: "10px 14px",
          border: `1px solid ${C.border}`, fontFamily: "monospace",
          color: C.yellow, fontSize: 12, marginTop: 8,
        }}>
          KV Cache = layer × heads × n × d_head × 2<br />
          <span style={{ color: C.muted }}>           ↑ per ogni layer si memorizzano K e V</span>
        </div>
        <p style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginTop: 12 }}>
          <strong style={{ color: C.orange }}>Più layer → più KV Cache.</strong> Con {nLayers} layer, il KV cache è {nLayers}× quello di un singolo layer.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN ───────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = [
    { label: "1 · d_model & heads", color: C.cyan },
    { label: "2 · Multi-Head step-by-step", color: C.orange },
    { label: "3 · I Layer", color: C.purple },
    { label: "4 · Intuizione finale", color: C.green },
  ];

  return (
    <div style={{
      background: C.bg, minHeight: "100vh", color: C.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      padding: "28px 20px", maxWidth: 860, margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontFamily: "monospace", color: C.cyan, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
          Transformer Anatomy
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>
          Layers, Heads & d_head
        </h1>
        <p style={{ color: C.muted, fontSize: 15, margin: 0 }}>
          Cosa sono davvero i tre parametri che guidano la memoria
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            padding: "7px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer",
            fontFamily: "monospace", border: "none",
            background: tab === i ? t.color : C.card,
            color: tab === i ? C.bg : C.muted,
            fontWeight: tab === i ? 700 : 400,
            border: `1px solid ${tab === i ? t.color : C.border}`,
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: 24,
        borderTop: `3px solid ${tabs[tab].color}`,
      }}>
        {tab === 0 && (
          <div>
            <h3 style={{ color: tabs[0].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Il vettore di un token
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Ogni token viene rappresentato come un vettore di <Label color={C.cyan}>d_model</Label> numeri.
              Questo vettore viene <em>spezzato</em> in <Label color={C.orange}>heads</Label> blocchi da <Label color={C.purple}>d_head</Label> elementi ciascuno.
              È come dividere un team di lavoro in sottogruppi specializzati.
            </p>
            <VectorVisual dModel={16} heads={4} />
          </div>
        )}

        {tab === 1 && (
          <div>
            <h3 style={{ color: tabs[1].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Come funziona Multi-Head Attention
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              Naviga i 5 step per vedere come i token interagiscono attraverso gli heads.
            </p>
            <MultiHeadViz nTokens={3} heads={2} dHead={4} />
          </div>
        )}

        {tab === 2 && (
          <div>
            <h3 style={{ color: tabs[2].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              Lo stack di layer
            </h3>
            <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              Un Transformer è fatto di <Label color={C.purple}>L layer</Label> identici impilati. Ogni layer ha la sua Multi-Head Attention
              — e quindi il suo pezzo di KV Cache.
            </p>
            <LayerStack nLayers={6} />
          </div>
        )}

        {tab === 3 && (
          <div>
            <h3 style={{ color: tabs[3].color, fontFamily: "monospace", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginTop: 0 }}>
              L'analogia completa
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { icon: "🏢", param: "layers", val: "L", analogy: "Piani di un grattacielo", desc: "Ogni piano elabora l'informazione in modo più astratto. Piano 1 = parole. Piano 32 = concetti.", color: C.purple },
                { icon: "👥", param: "heads", val: "H", analogy: "Team di analisti paralleli", desc: "Ogni head studia relazioni diverse nello stesso testo: sintassi, semantica, coreference...", color: C.orange },
                { icon: "📐", param: "d_head", val: "d_h", analogy: "Dimensione del quaderno di ogni analista", desc: "Quanti numeri usa ogni head per rappresentare una relazione. Più grande = più espressivo.", color: C.cyan },
                { icon: "📏", param: "d_model", val: "d_m", analogy: "Dimensione totale del vettore token", desc: "d_model = heads × d_head. È la 'larghezza' del modello.", color: C.yellow },
              ].map(item => (
                <div key={item.param} style={{
                  background: "#0a0e1a", borderRadius: 10, padding: 14,
                  borderTop: `2px solid ${item.color}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <div>
                      <Label color={item.color}>{item.param}</Label>
                      <span style={{ fontFamily: "monospace", color: item.color, fontSize: 13, marginLeft: 6 }}>({item.val})</span>
                    </div>
                  </div>
                  <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.analogy}</div>
                  <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "#000", borderRadius: 10, padding: 16,
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontFamily: "monospace", color: C.yellow, fontSize: 13, marginBottom: 12, fontWeight: 700 }}>
                KV Cache — perché scala così tanto
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", fontFamily: "monospace", fontSize: 14 }}>
                {[
                  { label: "2", desc: "K e V", color: C.muted },
                  { label: "×", color: C.muted },
                  { label: "L", desc: "layer", color: C.purple },
                  { label: "×", color: C.muted },
                  { label: "H", desc: "heads", color: C.orange },
                  { label: "×", color: C.muted },
                  { label: "n", desc: "token", color: C.red },
                  { label: "×", color: C.muted },
                  { label: "d_h", desc: "d_head", color: C.cyan },
                  { label: "×", color: C.muted },
                  { label: "2B", desc: "fp16", color: C.muted },
                ].map((item, i) => (
                  item.label === "×" ? (
                    <span key={i} style={{ color: C.muted, fontSize: 16 }}>×</span>
                  ) : (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{
                        background: `${item.color}22`, color: item.color,
                        border: `1px solid ${item.color}55`,
                        borderRadius: 6, padding: "4px 10px",
                        fontSize: 16, fontWeight: 700,
                      }}>{item.label}</div>
                      {item.desc && <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{item.desc}</div>}
                    </div>
                  )
                ))}
              </div>
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { model: "GPT-2 (small)", L: 12, H: 12, dh: 64, ctx: 1024, color: C.green },
                  { model: "Llama-3 8B", L: 32, H: 32, dh: 128, ctx: 8192, color: C.cyan },
                  { model: "Llama-3 70B", L: 80, H: 64, dh: 128, ctx: 8192, color: C.orange },
                  { model: "Claude @ 100K", L: 48, H: 64, dh: 128, ctx: 100000, color: C.purple },
                ].map(m => {
                  const bytes = 2 * m.L * m.H * m.ctx * m.dh * 2;
                  const gb = (bytes / 1e9).toFixed(1);
                  return (
                    <div key={m.model} style={{
                      background: `${m.color}0a`, borderRadius: 8,
                      padding: "8px 12px", border: `1px solid ${m.color}33`,
                    }}>
                      <div style={{ color: m.color, fontFamily: "monospace", fontSize: 12, fontWeight: 700 }}>{m.model}</div>
                      <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", marginTop: 2 }}>
                        L={m.L} H={m.H} d_h={m.dh} ctx={m.ctx >= 1000 ? m.ctx / 1000 + "K" : m.ctx}
                      </div>
                      <div style={{ color: C.text, fontWeight: 700, fontSize: 15, marginTop: 4, fontFamily: "monospace" }}>
                        ~{gb} GB
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
