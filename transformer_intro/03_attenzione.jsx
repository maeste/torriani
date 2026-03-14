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

// ---------- DATA ----------

const WORDS = ["Il", "gatto", "si", "sedette", "sul", "tappeto", "perche", "era", "stanco"];

// Predefined attention weights: ATTENTION_MAP[queryIndex][keyIndex]
// Causal mask: a word can only attend to itself and previous words
const ATTENTION_MAP = [
  // Il
  [1.0,  0,    0,    0,    0,    0,    0,    0,    0   ],
  // gatto
  [0.15, 0.85, 0,    0,    0,    0,    0,    0,    0   ],
  // si
  [0.05, 0.60, 0.35, 0,    0,    0,    0,    0,    0   ],
  // sedette
  [0.03, 0.55, 0.12, 0.30, 0,    0,    0,    0,    0   ],
  // sul
  [0.02, 0.15, 0.05, 0.48, 0.30, 0,    0,    0,    0   ],
  // tappeto
  [0.02, 0.10, 0.03, 0.20, 0.40, 0.25, 0,    0,    0   ],
  // perche
  [0.02, 0.20, 0.05, 0.30, 0.08, 0.15, 0.20, 0,    0   ],
  // era  — attends strongly to "gatto" (who is tired?)
  [0.02, 0.52, 0.03, 0.10, 0.02, 0.08, 0.13, 0.10, 0   ],
  // stanco — attends strongly to "gatto" and "era"
  [0.02, 0.40, 0.02, 0.05, 0.01, 0.05, 0.10, 0.30, 0.05],
];

const NEXT_TOKEN_CANDIDATES = [
  { word: "tappeto",   prob: 0.35, color: COLORS.accent  },
  { word: "divano",    prob: 0.20, color: COLORS.accent2 },
  { word: "pavimento", prob: 0.15, color: COLORS.accent3 },
  { word: "letto",     prob: 0.10, color: COLORS.accent4 },
  { word: "prato",     prob: 0.08, color: COLORS.highlight },
  { word: "tavolo",    prob: 0.07, color: COLORS.muted },
  { word: "altro...",  prob: 0.05, color: COLORS.muted },
];

// ---------- COMPONENTS ----------

function InteractiveSentence() {
  const [selectedWord, setSelectedWord] = useState(7); // "era" by default

  const attentionRow = ATTENTION_MAP[selectedWord];

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
        Clicca su una parola per vedere a quali altre parole "presta attenzione".
        Le parole piu luminose sono quelle che il modello considera piu importanti per capire la parola selezionata.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16, justifyContent: "center" }}>
        {WORDS.map((word, i) => {
          const isSelected = i === selectedWord;
          const weight = attentionRow[i] || 0;
          const canAttend = i <= selectedWord;
          const opacity = canAttend ? Math.max(0.15, weight) : 0.08;
          const borderColor = isSelected ? COLORS.highlight : canAttend ? `rgba(0, 212, 255, ${weight})` : COLORS.border;
          const bgAlpha = isSelected ? "44" : canAttend ? Math.round(weight * 60).toString(16).padStart(2, "0") : "08";

          return (
            <button
              key={i}
              onClick={() => setSelectedWord(i)}
              aria-label={`Seleziona la parola "${word}"`}
              aria-pressed={isSelected}
              style={{
                background: isSelected ? `${COLORS.highlight}${bgAlpha}` : `${COLORS.accent}${bgAlpha}`,
                color: canAttend ? COLORS.text : COLORS.muted,
                opacity: opacity < 0.15 ? 0.3 : 1,
                border: `2px solid ${borderColor}`,
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 16,
                fontWeight: isSelected ? 700 : canAttend && weight > 0.3 ? 600 : 400,
                cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif",
                transition: "all 0.3s ease",
                transform: isSelected ? "scale(1.1)" : canAttend && weight > 0.4 ? "scale(1.05)" : "scale(1)",
                boxShadow: isSelected ? `0 0 12px ${COLORS.highlight}66` : canAttend && weight > 0.4 ? `0 0 8px ${COLORS.accent}44` : "none",
                position: "relative",
              }}
            >
              {word}
              {canAttend && !isSelected && weight > 0 && (
                <span style={{
                  position: "absolute",
                  bottom: -6,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: 10,
                  color: COLORS.accent,
                  fontFamily: "monospace",
                  background: COLORS.bg,
                  padding: "0 4px",
                  borderRadius: 3,
                }}>
                  {weight.toFixed(2)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{
        background: "#0a0e1a",
        borderRadius: 8,
        padding: 16,
        textAlign: "center",
        borderLeft: `3px solid ${COLORS.highlight}`,
      }}>
        <p style={{ color: COLORS.text, fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          {selectedWord === 7 ? (
            <>
              Chi e "<strong style={{ color: COLORS.highlight }}>era</strong>"?
              La macchina lo capisce guardando le altre parole.
              <br />
              <span style={{ color: COLORS.accent }}>
                "gatto" riceve il peso piu alto (0.52) — il modello ha capito che "era stanco" si riferisce al gatto.
              </span>
            </>
          ) : (
            <>
              La parola "<strong style={{ color: COLORS.highlight }}>{WORDS[selectedWord]}</strong>" presta attenzione
              {selectedWord === 0 ? " solo a se stessa (e la prima parola)." : (
                <> soprattutto a "<strong style={{ color: COLORS.accent }}>
                  {WORDS[attentionRow.indexOf(Math.max(...attentionRow.slice(0, selectedWord + 1)))]}
                </strong>" (peso {Math.max(...attentionRow.slice(0, selectedWord + 1)).toFixed(2)}).</>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function AttentionMatrix() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const cellSize = 44;

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
        Ogni riga e una parola che "chiede" (Query), ogni colonna e una parola che "risponde" (Key).
        Il colore indica quanto attenzione viene data. Il triangolo superiore e grigio: la maschera causale impedisce di guardare "nel futuro".
      </p>

      <div style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ display: "inline-block", position: "relative" }}>
          {/* Column headers */}
          <div style={{ display: "flex", marginLeft: cellSize + 8 }}>
            {WORDS.map((w, i) => (
              <div key={i} style={{
                width: cellSize,
                textAlign: "center",
                fontSize: 10,
                color: COLORS.muted,
                fontFamily: "monospace",
                transform: "rotate(-45deg)",
                transformOrigin: "bottom left",
                height: 50,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                marginBottom: 4,
              }}>
                {w}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {WORDS.map((rowWord, row) => (
            <div key={row} style={{ display: "flex", alignItems: "center" }}>
              {/* Row label */}
              <div style={{
                width: cellSize + 8,
                textAlign: "right",
                paddingRight: 8,
                fontSize: 11,
                color: COLORS.muted,
                fontFamily: "monospace",
                flexShrink: 0,
              }}>
                {rowWord}
              </div>

              {/* Cells */}
              {WORDS.map((colWord, col) => {
                const weight = ATTENTION_MAP[row][col];
                const isCausal = col > row;
                const isHovered = hoveredCell && hoveredCell.row === row && hoveredCell.col === col;

                return (
                  <div
                    key={col}
                    onMouseEnter={() => setHoveredCell({ row, col })}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: 3,
                      margin: 1,
                      background: isCausal
                        ? `rgba(30, 45, 74, 0.3)`
                        : `rgba(0, 212, 255, ${weight})`,
                      border: isHovered ? `2px solid ${COLORS.highlight}` : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      fontFamily: "monospace",
                      color: isCausal ? COLORS.border : weight > 0.5 ? "#000" : COLORS.muted,
                    }}
                  >
                    {isCausal ? "" : weight > 0 ? weight.toFixed(2) : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredCell && (
        <div style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: "10px 14px",
          marginTop: 12,
          fontSize: 13,
          fontFamily: "monospace",
          textAlign: "center",
        }}>
          {hoveredCell.col > hoveredCell.row ? (
            <span style={{ color: COLORS.muted }}>
              Maschera causale: "{WORDS[hoveredCell.row]}" non puo guardare "{WORDS[hoveredCell.col]}" (e nel futuro)
            </span>
          ) : (
            <>
              <span style={{ color: COLORS.accent }}>{WORDS[hoveredCell.row]}</span>
              <span style={{ color: COLORS.muted }}> → </span>
              <span style={{ color: COLORS.accent2 }}>{WORDS[hoveredCell.col]}</span>
              <span style={{ color: COLORS.muted }}>: peso </span>
              <span style={{ color: COLORS.highlight, fontWeight: 700 }}>
                {ATTENTION_MAP[hoveredCell.row][hoveredCell.col].toFixed(2)}
              </span>
            </>
          )}
        </div>
      )}

      <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: `rgba(0, 212, 255, 0.8)` }} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Attenzione alta</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: `rgba(0, 212, 255, 0.2)` }} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Attenzione bassa</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: `rgba(30, 45, 74, 0.3)` }} />
          <span style={{ fontSize: 12, color: COLORS.muted }}>Maschera causale</span>
        </div>
      </div>
    </div>
  );
}

function NextTokenPrediction() {
  const [revealed, setRevealed] = useState(false);
  const [sentenceParts, setSentenceParts] = useState(["Il", "gatto", "si", "sedette", "sul"]);
  const [step, setStep] = useState(0);

  const STEPS = [
    { partial: ["Il", "gatto", "si", "sedette", "sul"], candidates: [
      { word: "tappeto",   prob: 0.35, color: COLORS.accent  },
      { word: "divano",    prob: 0.20, color: COLORS.accent2 },
      { word: "pavimento", prob: 0.15, color: COLORS.accent3 },
      { word: "letto",     prob: 0.10, color: COLORS.accent4 },
      { word: "prato",     prob: 0.08, color: COLORS.highlight },
      { word: "altro...",  prob: 0.12, color: COLORS.muted },
    ]},
    { partial: ["Il", "gatto", "si", "sedette", "sul", "tappeto"], candidates: [
      { word: "perche",    prob: 0.30, color: COLORS.accent  },
      { word: "e",         prob: 0.25, color: COLORS.accent2 },
      { word: ".",         prob: 0.18, color: COLORS.accent3 },
      { word: "rosso",     prob: 0.10, color: COLORS.accent4 },
      { word: "morbido",   prob: 0.08, color: COLORS.highlight },
      { word: "altro...",  prob: 0.09, color: COLORS.muted },
    ]},
    { partial: ["Il", "gatto", "si", "sedette", "sul", "tappeto", "perche"], candidates: [
      { word: "era",       prob: 0.40, color: COLORS.accent  },
      { word: "aveva",     prob: 0.20, color: COLORS.accent2 },
      { word: "il",        prob: 0.12, color: COLORS.accent3 },
      { word: "voleva",    prob: 0.10, color: COLORS.accent4 },
      { word: "si",        prob: 0.08, color: COLORS.highlight },
      { word: "altro...",  prob: 0.10, color: COLORS.muted },
    ]},
  ];

  const currentStep = STEPS[step] || STEPS[STEPS.length - 1];
  const maxProb = Math.max(...currentStep.candidates.map(c => c.prob));
  const isLastStep = step >= STEPS.length - 1;

  const handleReveal = () => {
    if (isLastStep && revealed) return;
    setRevealed(true);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      setSentenceParts(STEPS[step + 1].partial);
      setRevealed(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setSentenceParts(STEPS[0].partial);
    setRevealed(false);
  };

  return (
    <div>
      <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
        Un LLM genera testo una parola alla volta. Per ogni posizione, calcola le probabilita di tutti i possibili token successivi.
        La parola con la probabilita piu alta viene scelta (o campionata).
      </p>

      {/* Sentence display */}
      <div style={{
        background: "#0a0e1a",
        borderRadius: 8,
        padding: "16px 20px",
        marginBottom: 16,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
      }}>
        {sentenceParts.map((word, i) => (
          <span key={i} style={{
            color: COLORS.text,
            fontSize: 20,
            fontWeight: 500,
          }}>
            {word}
          </span>
        ))}
        {revealed ? (
          <span style={{
            color: COLORS.accent4,
            fontSize: 20,
            fontWeight: 700,
            background: `${COLORS.accent4}22`,
            padding: "2px 8px",
            borderRadius: 6,
            border: `1px solid ${COLORS.accent4}44`,
          }}>
            {currentStep.candidates[0].word}
          </span>
        ) : (
          <span style={{
            color: COLORS.highlight,
            fontSize: 20,
            fontWeight: 700,
            animation: "blink 1s infinite",
          }}>
            ___
          </span>
        )}
      </div>

      {/* Probability bars */}
      <div style={{ marginBottom: 16 }}>
        {currentStep.candidates.map((candidate, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 6,
          }}>
            <div style={{
              width: 90,
              textAlign: "right",
              fontSize: 14,
              fontFamily: "monospace",
              color: revealed && i === 0 ? COLORS.accent4 : COLORS.text,
              fontWeight: revealed && i === 0 ? 700 : 400,
              flexShrink: 0,
            }}>
              {candidate.word}
            </div>
            <div style={{
              flex: 1,
              height: 24,
              background: `${COLORS.border}66`,
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{
                width: `${(candidate.prob / maxProb) * 100}%`,
                height: "100%",
                background: revealed && i === 0
                  ? `linear-gradient(90deg, ${candidate.color}, ${COLORS.accent4})`
                  : candidate.color,
                borderRadius: 4,
                transition: "all 0.5s ease",
                opacity: revealed && i !== 0 ? 0.5 : 1,
              }} />
            </div>
            <div style={{
              width: 45,
              fontSize: 13,
              fontFamily: "monospace",
              color: candidate.color,
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {(candidate.prob * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        {!revealed ? (
          <button
            onClick={handleReveal}
            style={{
              background: COLORS.accent4,
              color: "#000",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            Rivela la parola scelta
          </button>
        ) : !isLastStep ? (
          <button
            onClick={handleNext}
            style={{
              background: COLORS.accent,
              color: "#000",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            Prossima parola
          </button>
        ) : null}
        <button
          onClick={handleReset}
          style={{
            background: "transparent",
            color: COLORS.muted,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.2s",
          }}
        >
          Ricomincia
        </button>
      </div>

      {revealed && (
        <p style={{ color: COLORS.muted, fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
          Il modello ha scelto "<strong style={{ color: COLORS.accent4 }}>{currentStep.candidates[0].word}</strong>" con
          probabilita {(currentStep.candidates[0].prob * 100).toFixed(0)}%. Non e certezza assoluta — anche le altre
          parole avevano una probabilita. Questo e il motivo per cui i modelli possono generare risposte diverse ogni volta.
        </p>
      )}
    </div>
  );
}

function AttentionFormula() {
  return (
    <div>
      <Formula>Attn(Q, K, V) = softmax(QK&#x1D40; / &#x221A;d) &middot; V</Formula>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
        {[
          {
            letter: "Q",
            name: "Query",
            analogy: "Cosa sto cercando?",
            desc: "La domanda che ogni parola fa alle altre",
            color: COLORS.accent,
            emoji: "?",
          },
          {
            letter: "K",
            name: "Key",
            analogy: "Cosa posso offrire?",
            desc: "L'etichetta che ogni parola mostra alle altre",
            color: COLORS.accent2,
            emoji: "K",
          },
          {
            letter: "V",
            name: "Value",
            analogy: "Il mio contenuto",
            desc: "L'informazione effettiva che viene passata",
            color: COLORS.accent3,
            emoji: "V",
          },
        ].map(item => (
          <div key={item.letter} style={{
            background: "#0a0e1a",
            borderRadius: 8,
            padding: 16,
            borderTop: `3px solid ${item.color}`,
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 28,
              fontWeight: 700,
              color: item.color,
              fontFamily: "'JetBrains Mono', monospace",
              marginBottom: 8,
            }}>
              {item.letter}
            </div>
            <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
              {item.name}
            </div>
            <div style={{
              color: item.color,
              fontSize: 13,
              fontStyle: "italic",
              marginBottom: 8,
              padding: "4px 8px",
              background: `${item.color}11`,
              borderRadius: 4,
            }}>
              "{item.analogy}"
            </div>
            <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "#0a0e1a",
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        borderLeft: `3px solid ${COLORS.highlight}`,
      }}>
        <p style={{ color: COLORS.muted, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
          <strong style={{ color: COLORS.highlight }}>L'analogia della biblioteca:</strong> Immagina di essere in una
          biblioteca. Hai una domanda (<Tag color={COLORS.accent}>Q</Tag>). Ogni libro ha un titolo
          (<Tag color={COLORS.accent2}>K</Tag>) e un contenuto (<Tag color={COLORS.accent3}>V</Tag>).
          Confronti la tua domanda con tutti i titoli. I libri il cui titolo corrisponde di piu alla tua domanda
          ricevono piu attenzione. Poi leggi principalmente quei libri.
        </p>
        <p style={{ color: COLORS.muted, fontSize: 13, margin: "12px 0 0", lineHeight: 1.6 }}>
          Il <Tag color={COLORS.highlight}>&#x221A;d</Tag> nella formula serve a evitare che i numeri diventino
          troppo grandi — e un fattore di normalizzazione. Il <strong style={{ color: COLORS.text }}>softmax</strong> trasforma
          i punteggi in probabilita che sommano a 1.
        </p>
      </div>
    </div>
  );
}

function RabbitHole() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          background: "transparent",
          color: COLORS.accent3,
          border: `1px solid ${COLORS.accent3}44`,
          borderRadius: 8,
          padding: "8px 16px",
          fontSize: 13,
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          width: "100%",
          textAlign: "left",
          transition: "all 0.2s",
        }}
      >
        {open ? "Chiudi" : "Apri"} - Per chi vuole saperne di piu {open ? "^" : "v"}
      </button>

      {open && (
        <div style={{ marginTop: 16 }}>
          {/* Quadratic scaling */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: COLORS.accent2, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
              Il problema della scalabilita quadratica
            </h3>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, marginTop: 0 }}>
              L'attenzione confronta <strong style={{ color: COLORS.text }}>ogni parola con ogni altra parola</strong>.
              Il numero di confronti cresce con il quadrato della lunghezza:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ color: COLORS.accent, fontFamily: "monospace", fontSize: 13 }}>1.000 parole</div>
                <div style={{ color: COLORS.accent2, fontWeight: 700, fontSize: 18 }}>1.000.000</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>calcoli di attenzione</div>
              </div>
              <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ color: COLORS.accent, fontFamily: "monospace", fontSize: 13 }}>100.000 parole</div>
                <div style={{ color: COLORS.accent2, fontWeight: 700, fontSize: 18 }}>10.000.000.000</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>calcoli di attenzione</div>
              </div>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 8 }}>
              100x piu parole = 10.000x piu calcoli. Per questo i modelli hanno limiti di contesto.
            </p>
          </div>

          {/* Memory table */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: COLORS.accent, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
              Cosa scala e come
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "monospace" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  {["Componente", "Scalabilita", "Esempio (1K token)"].map(h => (
                    <th key={h} style={{ color: COLORS.muted, padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Pesi del modello", "Costante", "7B parametri (fissi)"],
                  ["Matrice di attenzione", "Quadratica O(n\u00B2)", "1M valori per layer"],
                  ["KV Cache", "Lineare O(n)", "~0.5 MB per layer"],
                  ["Embedding", "Lineare O(n)", "4 MB"],
                ].map(([comp, scale, example], i) => (
                  <tr key={i} style={{
                    borderBottom: `1px solid ${COLORS.border}22`,
                    background: i % 2 === 0 ? "transparent" : "#00000022",
                  }}>
                    <td style={{ padding: "8px 12px", color: COLORS.text }}>{comp}</td>
                    <td style={{ padding: "8px 12px", color: scale.includes("Quadratica") ? COLORS.accent2 : COLORS.accent4 }}>{scale}</td>
                    <td style={{ padding: "8px 12px", color: COLORS.muted }}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Multi-head attention */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: COLORS.accent3, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
              Multi-Head Attention
            </h3>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, marginTop: 0 }}>
              In realta, il modello non ha <em>un solo</em> meccanismo di attenzione ma molti in parallelo,
              chiamati <Tag color={COLORS.accent3}>head</Tag>. Ogni head impara a prestare attenzione a cose diverse:
              un head potrebbe specializzarsi nelle relazioni grammaticali, un altro nella coreference
              (chi e "era"?), un altro nelle relazioni spaziali.
            </p>
            <p style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>
              Llama-3 8B usa <strong style={{ color: COLORS.text }}>32 head</strong> in ogni layer,
              per un totale di <strong style={{ color: COLORS.text }}>32 layer</strong>.
              Significa 32 x 32 = <strong style={{ color: COLORS.accent2 }}>1.024 meccanismi di attenzione</strong> diversi
              che lavorano contemporaneamente.
            </p>
          </div>

          {/* Reference to deeper modules */}
          <div style={{
            background: `${COLORS.accent3}11`,
            borderRadius: 8,
            padding: 16,
            border: `1px solid ${COLORS.accent3}33`,
          }}>
            <h3 style={{ color: COLORS.accent3, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
              Per approfondire
            </h3>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
              Queste slide coprono l'attenzione a livello introduttivo. Per un'analisi tecnica piu approfondita:
            </p>
            <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.8, paddingLeft: 20, marginBottom: 0 }}>
              <li><Tag color={COLORS.accent}>01_attention_memory</Tag> Memoria e contesto nei transformer — crescita quadratica, KV Cache, ottimizzazioni</li>
              <li><Tag color={COLORS.accent2}>04_attention_matrix_deep</Tag> Deep dive nella matrice di attenzione — visualizzazione avanzata, pattern reali</li>
              <li><Tag color={COLORS.accent3}>02_transformer_anatomy</Tag> Anatomia completa del transformer — tutti i componenti</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- MAIN APP ----------

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
          Sessione 1 &middot; Atto 4
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          L'Attenzione — il segreto dei Transformer
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Come fa una macchina a capire che "era stanco" si riferisce al gatto e non al tappeto?
        </p>
      </div>

      {/* 1. Interactive Sentence */}
      <Section title="A chi presta attenzione ogni parola?" accent={COLORS.highlight}>
        <InteractiveSentence />
      </Section>

      {/* 2. Attention Matrix */}
      <Section title="La matrice di attenzione" accent={COLORS.accent}>
        <AttentionMatrix />
      </Section>

      {/* 3. Next Token Prediction */}
      <Section title="Predizione del prossimo token" accent={COLORS.accent4}>
        <NextTokenPrediction />
      </Section>

      {/* 4. Attention Formula */}
      <Section title="La formula dell'attenzione" accent={COLORS.accent2}>
        <AttentionFormula />
      </Section>

      {/* 5. Rabbit Hole */}
      <Section title="Tana del bianconiglio" accent={COLORS.accent3}>
        <RabbitHole />
      </Section>

      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        L'attenzione — versione introduttiva per le scuole superiori italiane
      </div>
    </div>
  );
}
