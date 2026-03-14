import { useState, useMemo, useCallback, useRef, useEffect } from "react";

const COLORS = {
  bg: "#0a0e1a", card: "#0f1729", border: "#1e2d4a",
  accent: "#00d4ff", accent2: "#ff6b35", accent3: "#a855f7",
  accent4: "#22c55e", text: "#e2e8f0", muted: "#64748b",
  highlight: "#fbbf24",
};

const Section = ({ title, children, accent = COLORS.accent }) => (
  <div style={{ marginBottom: 32, padding: "24px 28px", background: COLORS.card, borderRadius: 16, border: `1px solid ${COLORS.border}` }}>
    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: accent, letterSpacing: 0.5 }}>{title}</h2>
    {children}
  </div>
);

const Tag = ({ children, color }) => (
  <span style={{
    display: "inline-block", background: `${color}22`, color, border: `1px solid ${color}44`,
    borderRadius: 999, padding: "2px 12px", fontSize: 14, fontWeight: 600, margin: "0 4px",
    fontFamily: "'JetBrains Mono', monospace",
  }}>{children}</span>
);

const REVOLUTIONS = [
  {
    id: "vapore",
    year: "~1760",
    emoji: "🏭",
    title: "Vapore",
    color: COLORS.accent2,
    before: "Tessitori a mano",
    after: "Operai di fabbrica",
    quote: "Il telaio meccanico non ha eliminato il lavoro tessile — lo ha spostato dalla casa alla fabbrica.",
    impactPosition: 10,
  },
  {
    id: "elettricita",
    year: "~1870",
    emoji: "⚡",
    title: "Elettricita",
    color: COLORS.highlight,
    before: "Artigiani",
    after: "Operai specializzati",
    quote: "Ford ha creato la catena di montaggio. Servivano meno artigiani, ma piu operai qualificati. Sono nati i sindacati.",
    impactPosition: 20,
  },
  {
    id: "computer",
    year: "~1950",
    emoji: "🖥️",
    title: "Computer",
    color: COLORS.accent,
    before: "Calcolatori umani",
    after: "Programmatori",
    quote: "Si, 'computer' era un mestiere — persone che facevano calcoli a mano. Oggi i loro pronipoti scrivono software.",
    impactPosition: 35,
  },
  {
    id: "internet",
    year: "~1990",
    emoji: "🌐",
    title: "Internet",
    color: COLORS.accent3,
    before: "Agenzie di viaggio, edicole, videoteche",
    after: "E-commerce, social media, streaming",
    quote: "Blockbuster e fallita. Netflix ha assunto migliaia di ingegneri.",
    impactPosition: 50,
  },
  {
    id: "ia",
    year: "~2020",
    emoji: "🤖",
    title: "Intelligenza Artificiale",
    color: COLORS.accent4,
    before: "Traduttori, data entry, customer service base",
    after: "Prompt engineer, AI trainer, AI auditor",
    quote: "Per la prima volta si toccano i lavori COGNITIVI.",
    impactPosition: 85,
  },
];

const CURRENT_JOBS = [
  {
    role: "Medico",
    emoji: "🩺",
    color: COLORS.accent,
    before: "Ricorda tutto",
    after: "Interpreta con l'aiuto dell'IA",
    detail: "L'IA legge le radiografie, il medico decide la cura.",
  },
  {
    role: "Avvocato",
    emoji: "⚖️",
    color: COLORS.accent3,
    before: "Cerca precedenti a mano",
    after: "L'IA trova i casi rilevanti in secondi",
    detail: "L'avvocato costruisce la strategia.",
  },
  {
    role: "Designer",
    emoji: "🎨",
    color: COLORS.accent2,
    before: "Pixel per pixel",
    after: "Genera con Midjourney, raffina con competenza",
    detail: "Il gusto e la visione restano umani.",
  },
  {
    role: "Programmatore",
    emoji: "💻",
    color: COLORS.accent4,
    before: "Scrivi ogni riga",
    after: "Guida l'agente IA",
    detail: "L'architettura e il pensiero critico contano di piu.",
  },
];

export default function App() {
  const [activeRevolution, setActiveRevolution] = useState(4);
  const [hoveredJob, setHoveredJob] = useState(null);
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const [spectrumAnimated, setSpectrumAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSpectrumAnimated(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const activeRev = REVOLUTIONS[activeRevolution];

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
      <style>{`
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(168,85,247,0.2); }
          50% { text-shadow: 0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(168,85,247,0.4); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandWidth {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(34,197,94,0.3); }
          50% { box-shadow: 0 0 20px rgba(34,197,94,0.6); }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: ${COLORS.accent3}44; }
          50% { border-color: ${COLORS.accent3}aa; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 2 · Atto 7 · Il Lavoro
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Il Lavoro che Cambia
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Come ogni rivoluzione industriale ha trasformato i mestieri — e perche questa volta e diverso
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 1: Le rivoluzioni e i mestieri                        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <Section title="Le rivoluzioni e i mestieri" accent={COLORS.accent}>
        {/* Timeline bar */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24, position: "relative" }}>
          <div style={{
            position: "absolute", top: "50%", left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${COLORS.accent2}44, ${COLORS.highlight}44, ${COLORS.accent}44, ${COLORS.accent3}44, ${COLORS.accent4}44)`,
            borderRadius: 2, transform: "translateY(-50%)", zIndex: 0,
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", position: "relative", zIndex: 1 }}>
            {REVOLUTIONS.map((rev, i) => (
              <button
                key={rev.id}
                onClick={() => setActiveRevolution(i)}
                style={{
                  background: activeRevolution === i ? rev.color : COLORS.card,
                  border: `2px solid ${activeRevolution === i ? rev.color : COLORS.border}`,
                  borderRadius: 12,
                  padding: "10px 14px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: activeRevolution === i ? "scale(1.08)" : "scale(1)",
                  boxShadow: activeRevolution === i ? `0 0 20px ${rev.color}44` : "none",
                  minWidth: 110,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 2 }}>{rev.emoji}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: activeRevolution === i ? "#fff" : COLORS.muted,
                  fontWeight: 700, letterSpacing: 0.5,
                }}>
                  {rev.year}
                </div>
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: activeRevolution === i ? "#fff" : COLORS.text,
                  marginTop: 2,
                }}>
                  {rev.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active revolution detail */}
        <div
          key={activeRev.id}
          style={{
            background: COLORS.bg,
            borderRadius: 12,
            padding: 24,
            border: `1px solid ${activeRev.color}33`,
            borderLeft: `4px solid ${activeRev.color}`,
            animation: "slideIn 0.35s ease-out",
          }}
        >
          <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6,
              }}>
                Prima
              </div>
              <div style={{
                background: `${COLORS.accent2}15`,
                border: `1px solid ${COLORS.accent2}33`,
                borderRadius: 8, padding: "12px 16px",
                color: COLORS.accent2, fontWeight: 600, fontSize: 15,
              }}>
                {activeRev.before}
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", color: activeRev.color,
              fontSize: 28, fontWeight: 700, paddingTop: 18,
            }}>
              →
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6,
              }}>
                Dopo
              </div>
              <div style={{
                background: `${COLORS.accent4}15`,
                border: `1px solid ${COLORS.accent4}33`,
                borderRadius: 8, padding: "12px 16px",
                color: COLORS.accent4, fontWeight: 600, fontSize: 15,
              }}>
                {activeRev.after}
              </div>
            </div>
          </div>
          <div style={{
            background: `${activeRev.color}0a`,
            borderRadius: 8, padding: "14px 18px",
            borderLeft: `3px solid ${activeRev.color}66`,
          }}>
            <p style={{
              color: COLORS.text, fontSize: 14, lineHeight: 1.7,
              margin: 0, fontStyle: "italic",
            }}>
              "{activeRev.quote}"
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 2: La prima volta per il lavoro cognitivo              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        marginBottom: 32, padding: "32px 28px",
        background: `linear-gradient(135deg, ${COLORS.card} 0%, #0d1530 50%, ${COLORS.card} 100%)`,
        borderRadius: 16, border: `1px solid ${COLORS.border}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at 70% 50%, ${COLORS.accent4}08 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <h2 style={{
          fontSize: 26, fontWeight: 800, marginBottom: 8,
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent3} 50%, ${COLORS.accent2} 100%)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          animation: "glowPulse 3s ease-in-out infinite",
          textAlign: "center",
        }}>
          La prima volta per il lavoro cognitivo
        </h2>
        <p style={{ color: COLORS.muted, fontSize: 14, textAlign: "center", marginBottom: 28, maxWidth: 650, marginLeft: "auto", marginRight: "auto" }}>
          Le rivoluzioni precedenti hanno automatizzato il lavoro <strong style={{ color: COLORS.accent2 }}>fisico</strong> e <strong style={{ color: COLORS.highlight }}>mentale ripetitivo</strong>.
          L'IA e la prima a toccare il lavoro <strong style={{ color: COLORS.accent4 }}>creativo e cognitivo</strong>.
        </p>

        {/* Spectrum bar */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.accent2, fontWeight: 700, letterSpacing: 1 }}>
              MANUALE / FISICO
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.accent4, fontWeight: 700, letterSpacing: 1 }}>
              COGNITIVO / CREATIVO
            </span>
          </div>

          {/* Background bar */}
          <div style={{
            height: 40, borderRadius: 8, position: "relative",
            background: `linear-gradient(90deg, ${COLORS.accent2}22 0%, ${COLORS.highlight}22 30%, ${COLORS.accent}22 50%, ${COLORS.accent3}22 70%, ${COLORS.accent4}22 100%)`,
            border: `1px solid ${COLORS.border}`,
            overflow: "hidden",
          }}>
            {/* Revolution markers */}
            {REVOLUTIONS.map((rev, i) => (
              <div
                key={rev.id}
                style={{
                  position: "absolute",
                  left: `${rev.impactPosition}%`,
                  top: 0, bottom: 0, width: i === 4 ? 120 : 60,
                  background: `linear-gradient(90deg, transparent, ${rev.color}${i === 4 ? "44" : "22"}, transparent)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.6s ease",
                  transform: spectrumAnimated ? "scaleX(1)" : "scaleX(0)",
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                <span style={{ fontSize: 16 }}>{rev.emoji}</span>
              </div>
            ))}
          </div>

          {/* Labels below */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, position: "relative" }}>
            {REVOLUTIONS.map((rev) => (
              <div
                key={rev.id}
                style={{
                  position: "absolute",
                  left: `${rev.impactPosition}%`,
                  transform: "translateX(-50%)",
                  textAlign: "center",
                }}
              >
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: rev.color, fontWeight: 600, whiteSpace: "nowrap",
                }}>
                  {rev.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI callout */}
        <div style={{
          marginTop: 36, padding: "16px 20px", borderRadius: 10,
          background: `${COLORS.accent4}12`,
          border: `1px solid ${COLORS.accent4}33`,
          textAlign: "center",
          animation: "pulseGlow 3s ease-in-out infinite",
        }}>
          <p style={{ color: COLORS.accent4, fontSize: 16, fontWeight: 700, margin: "0 0 4px" }}>
            Scrittura, analisi, traduzione, programmazione, design
          </p>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: 0 }}>
            Per la prima volta, l'automazione arriva nei lavori che richiedono <strong style={{ color: COLORS.text }}>pensiero, creativita e giudizio</strong>.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 3: Da dattilografa ad assistente di direzione          */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <Section title="Da dattilografa ad assistente di direzione" accent={COLORS.highlight}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
          Un esempio concreto di come la tecnologia trasforma un mestiere senza eliminarlo.
          Clicca per vedere la trasformazione.
        </p>

        {/* Toggle button */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <button
            onClick={() => setShowAfter(!showAfter)}
            style={{
              background: showAfter
                ? `linear-gradient(135deg, ${COLORS.accent4}, ${COLORS.accent})`
                : `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.highlight})`,
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 32px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.4s ease",
              boxShadow: showAfter
                ? `0 0 24px ${COLORS.accent4}44`
                : `0 0 24px ${COLORS.accent2}44`,
              letterSpacing: 0.5,
            }}
          >
            {showAfter ? "⏪  Torna agli anni '60" : "⏩  Vai agli anni '90-oggi"}
          </button>
        </div>

        {/* Before/After comparison */}
        <div
          key={showAfter ? "after" : "before"}
          style={{ animation: "slideIn 0.4s ease-out" }}
        >
          <div style={{
            background: COLORS.bg,
            borderRadius: 14,
            border: `1px solid ${showAfter ? COLORS.accent4 : COLORS.accent2}33`,
            overflow: "hidden",
          }}>
            {/* Header bar */}
            <div style={{
              background: showAfter
                ? `linear-gradient(90deg, ${COLORS.accent4}22, ${COLORS.accent}22)`
                : `linear-gradient(90deg, ${COLORS.accent2}22, ${COLORS.highlight}22)`,
              padding: "14px 20px",
              borderBottom: `1px solid ${COLORS.border}`,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>{showAfter ? "💼" : "📝"}</span>
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase",
                }}>
                  {showAfter ? "Anni '90 — Oggi" : "Anni '60 — '70"}
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 700,
                  color: showAfter ? COLORS.accent4 : COLORS.accent2,
                }}>
                  {showAfter ? "Assistente di Direzione / Office Manager" : "Dattilografa / Segretaria"}
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div style={{ padding: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Compiti */}
                <div style={{
                  background: `${showAfter ? COLORS.accent4 : COLORS.accent2}0a`,
                  borderRadius: 10, padding: 16,
                  border: `1px solid ${showAfter ? COLORS.accent4 : COLORS.accent2}22`,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: showAfter ? COLORS.accent4 : COLORS.accent2,
                    letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontWeight: 700,
                  }}>
                    Compiti
                  </div>
                  <ul style={{ color: COLORS.text, fontSize: 13, lineHeight: 2, paddingLeft: 16, margin: 0 }}>
                    {showAfter ? (
                      <>
                        <li>Gestione agenda e priorita</li>
                        <li>Organizzazione eventi</li>
                        <li>Preparazione presentazioni</li>
                        <li>Coordinamento team</li>
                        <li>Analisi dati e report</li>
                      </>
                    ) : (
                      <>
                        <li>Battere a macchina lettere</li>
                        <li>Archiviare documenti</li>
                        <li>Rispondere al telefono</li>
                        <li>Prendere appunti in stenografia</li>
                        <li>Copiare documenti a mano</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Competenze */}
                <div style={{
                  background: `${showAfter ? COLORS.accent : COLORS.highlight}0a`,
                  borderRadius: 10, padding: 16,
                  border: `1px solid ${showAfter ? COLORS.accent : COLORS.highlight}22`,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: showAfter ? COLORS.accent : COLORS.highlight,
                    letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontWeight: 700,
                  }}>
                    Competenze
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {(showAfter
                      ? ["Comunicazione", "Problem solving", "Software", "Lingue straniere", "Leadership", "Pensiero strategico"]
                      : ["Velocita di battitura", "Calligrafia", "Stenografia", "Precisione", "Ordine", "Memoria"]
                    ).map(skill => (
                      <Tag key={skill} color={showAfter ? COLORS.accent : COLORS.highlight}>
                        {skill}
                      </Tag>
                    ))}
                  </div>
                </div>

                {/* Strumenti */}
                <div style={{
                  gridColumn: "1 / -1",
                  background: `${COLORS.accent3}0a`,
                  borderRadius: 10, padding: 16,
                  border: `1px solid ${COLORS.accent3}22`,
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: COLORS.accent3,
                    letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, fontWeight: 700,
                  }}>
                    Strumenti
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                    {(showAfter
                      ? [
                        { icon: "💻", name: "PC" },
                        { icon: "📧", name: "Email" },
                        { icon: "📊", name: "Software gestionale" },
                        { icon: "📹", name: "Videoconferenze" },
                        { icon: "☁️", name: "Cloud" },
                      ]
                      : [
                        { icon: "⌨️", name: "Macchina da scrivere" },
                        { icon: "🗂️", name: "Schedario" },
                        { icon: "📞", name: "Telefono a filo" },
                        { icon: "📋", name: "Blocco appunti" },
                        { icon: "🖊️", name: "Carta carbone" },
                      ]
                    ).map(tool => (
                      <div key={tool.name} style={{
                        textAlign: "center", padding: "10px 14px",
                        background: COLORS.card, borderRadius: 8,
                        border: `1px solid ${COLORS.border}`,
                        minWidth: 100,
                      }}>
                        <div style={{ fontSize: 24, marginBottom: 4 }}>{tool.icon}</div>
                        <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600 }}>{tool.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div style={{
          marginTop: 20, padding: "18px 22px", borderRadius: 10,
          background: `linear-gradient(135deg, ${COLORS.highlight}0a, ${COLORS.accent4}0a)`,
          border: `1px solid ${COLORS.highlight}33`,
          borderLeft: `4px solid ${COLORS.highlight}`,
        }}>
          <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: "0 0 12px", fontWeight: 600 }}>
            La tecnologia ha eliminato la parte noiosa e ripetitiva del lavoro. Ha liberato tempo per le competenze umane: relazioni, organizzazione, pensiero strategico.
          </p>
          <p style={{ color: COLORS.accent4, fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Con l'IA succedera lo stesso. I lavori non scompariranno — si trasformeranno. E chi impara ad usare gli strumenti avra un vantaggio enorme.
          </p>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 4: Cosa succede ADESSO                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <Section title="Cosa succede ADESSO" accent={COLORS.accent4}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
          Quattro professioni che si stanno trasformando in questo momento. Passa il mouse (o clicca) per i dettagli.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {CURRENT_JOBS.map((job, i) => {
            const isActive = hoveredJob === i;
            return (
              <div
                key={job.role}
                onMouseEnter={() => setHoveredJob(i)}
                onMouseLeave={() => setHoveredJob(null)}
                onClick={() => setHoveredJob(isActive ? null : i)}
                style={{
                  background: isActive ? `${job.color}12` : COLORS.bg,
                  borderRadius: 12,
                  padding: 20,
                  border: `1px solid ${isActive ? job.color + "55" : COLORS.border}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  boxShadow: isActive ? `0 4px 20px ${job.color}22` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 28 }}>{job.emoji}</span>
                  <h3 style={{ color: job.color, fontSize: 18, fontWeight: 700, margin: 0 }}>
                    {job.role}
                  </h3>
                </div>

                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                  <div style={{
                    flex: 1, background: `${COLORS.accent2}15`, borderRadius: 6, padding: "6px 10px",
                    fontSize: 12, color: COLORS.accent2, fontWeight: 600, textAlign: "center",
                  }}>
                    {job.before}
                  </div>
                  <span style={{ color: job.color, fontWeight: 700, fontSize: 16 }}>→</span>
                  <div style={{
                    flex: 1, background: `${COLORS.accent4}15`, borderRadius: 6, padding: "6px 10px",
                    fontSize: 12, color: COLORS.accent4, fontWeight: 600, textAlign: "center",
                  }}>
                    {job.after}
                  </div>
                </div>

                <div style={{
                  overflow: "hidden",
                  maxHeight: isActive ? 60 : 0,
                  opacity: isActive ? 1 : 0,
                  transition: "all 0.3s ease",
                }}>
                  <p style={{
                    color: COLORS.text, fontSize: 13, fontStyle: "italic",
                    margin: 0, paddingTop: 8,
                    borderTop: `1px solid ${COLORS.border}`,
                    lineHeight: 1.6,
                  }}>
                    {job.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SECTION 5: Rabbit Hole — Tana del bianconiglio                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        marginBottom: 32,
        overflow: "hidden",
      }}>
        <button
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            borderLeft: `4px solid ${COLORS.accent3}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🐇</span>
            <span style={{
              color: COLORS.accent3,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}>
              Tana del Bianconiglio — I numeri dietro il cambiamento
            </span>
          </div>
          <span style={{
            color: COLORS.accent3,
            fontSize: 20,
            transition: "transform 0.3s",
            transform: rabbitHoleOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}>
            ▸
          </span>
        </button>

        {rabbitHoleOpen && (
          <div style={{ padding: "0 24px 24px", borderLeft: `4px solid ${COLORS.accent3}`, animation: "slideIn 0.3s ease-out" }}>

            {/* Historical displacement vs creation */}
            <div style={{
              background: COLORS.bg, borderRadius: 10, padding: 18, marginBottom: 16,
              borderTop: `2px solid ${COLORS.accent}`,
            }}>
              <h4 style={{ color: COLORS.accent, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                📊 I dati storici: distruzione vs creazione di posti di lavoro
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Rivoluzione industriale (1760-1840)", lost: "~35%", created: "~50%", net: "+15%", color: COLORS.accent2 },
                  { label: "Automazione (1950-1980)", lost: "~20%", created: "~30%", net: "+10%", color: COLORS.highlight },
                  { label: "Digitalizzazione (1990-2020)", lost: "~15%", created: "~25%", net: "+10%", color: COLORS.accent },
                  { label: "IA (proiezione 2020-2035)", lost: "~15%", created: "~20-25%", net: "+5-10%", color: COLORS.accent4 },
                ].map(era => (
                  <div key={era.label} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 8,
                    background: `${era.color}08`, border: `1px solid ${era.color}22`,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: era.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{era.label}</div>
                    <div style={{ display: "flex", gap: 16, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                      <span style={{ color: COLORS.accent2 }}>-{era.lost}</span>
                      <span style={{ color: COLORS.accent4 }}>+{era.created}</span>
                      <span style={{ color: COLORS.highlight, fontWeight: 700 }}>netto: {era.net}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 12, fontStyle: "italic", marginTop: 10, marginBottom: 0 }}>
                Fonte: stime aggregate da McKinsey Global Institute, World Economic Forum, OECD.
                Ogni rivoluzione ha creato piu posti di quanti ne ha distrutti.
              </p>
            </div>

            {/* McKinsey/WEF projections */}
            <div style={{
              background: COLORS.bg, borderRadius: 10, padding: 18, marginBottom: 16,
              borderTop: `2px solid ${COLORS.accent3}`,
            }}>
              <h4 style={{ color: COLORS.accent3, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                📈 Le proiezioni attuali (McKinsey / WEF)
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { stat: "85M", desc: "posti di lavoro spostati dall'IA entro il 2030", color: COLORS.accent2 },
                  { stat: "97M", desc: "nuovi ruoli creati nello stesso periodo", color: COLORS.accent4 },
                  { stat: "60%", desc: "dei lavori avra almeno il 30% di compiti automatizzabili", color: COLORS.highlight },
                ].map(item => (
                  <div key={item.stat} style={{
                    textAlign: "center", padding: 16, borderRadius: 10,
                    background: `${item.color}0a`, border: `1px solid ${item.color}22`,
                  }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: item.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.stat}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 6, lineHeight: 1.4 }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 12, fontStyle: "italic", marginTop: 10, marginBottom: 0 }}>
                World Economic Forum, "Future of Jobs Report 2023"
              </p>
            </div>

            {/* Augmentation vs Automation */}
            <div style={{
              background: COLORS.bg, borderRadius: 10, padding: 18, marginBottom: 16,
              borderTop: `2px solid ${COLORS.highlight}`,
            }}>
              <h4 style={{ color: COLORS.highlight, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                🤝 Augmentation vs Automation
              </h4>
              <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                La maggior parte dei lavori non sara <em>sostituita</em> dall'IA — sara <strong style={{ color: COLORS.accent4 }}>aumentata</strong>.
                La differenza e fondamentale:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{
                  padding: 14, borderRadius: 8,
                  background: `${COLORS.accent2}0a`, border: `1px solid ${COLORS.accent2}22`,
                }}>
                  <div style={{ color: COLORS.accent2, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                    Automation (pochi lavori)
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                    L'IA sostituisce completamente il lavoratore. Riguarda compiti altamente ripetitivi e prevedibili con poco giudizio umano.
                  </p>
                </div>
                <div style={{
                  padding: 14, borderRadius: 8,
                  background: `${COLORS.accent4}0a`, border: `1px solid ${COLORS.accent4}22`,
                }}>
                  <div style={{ color: COLORS.accent4, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                    Augmentation (la maggioranza)
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                    L'IA diventa uno strumento che rende il lavoratore piu produttivo. Il giudizio, la creativita e le relazioni restano umane.
                  </p>
                </div>
              </div>
            </div>

            {/* Centaur workers */}
            <div style={{
              background: COLORS.bg, borderRadius: 10, padding: 18,
              borderTop: `2px solid ${COLORS.accent4}`,
            }}>
              <h4 style={{ color: COLORS.accent4, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                🐴 I "Centauri": umano + IA batte entrambi
              </h4>
              <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
                Negli scacchi, dopo che Deep Blue ha battuto Kasparov (1997), e emersa una categoria ibrida: i <strong style={{ color: COLORS.accent }}>centauri</strong> — giocatori umani assistiti dall'IA che battono sia i soli umani che la sola IA.
              </p>
              <div style={{
                display: "flex", justifyContent: "center", gap: 16, alignItems: "center",
                padding: "14px 0",
              }}>
                {[
                  { emoji: "🧑", label: "Solo umano", perf: "Buono", color: COLORS.accent2 },
                  { emoji: "🤖", label: "Solo IA", perf: "Ottimo", color: COLORS.accent },
                  { emoji: "🧑‍🤝‍🧑🤖", label: "Centauro", perf: "Migliore", color: COLORS.accent4 },
                ].map((item, i) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {i > 0 && <span style={{ color: COLORS.muted, fontSize: 20, marginRight: 4 }}>&lt;</span>}
                    <div style={{
                      textAlign: "center", padding: "12px 18px", borderRadius: 10,
                      background: `${item.color}12`, border: `2px solid ${item.color}44`,
                    }}>
                      <div style={{ fontSize: 26, marginBottom: 4 }}>{item.emoji}</div>
                      <div style={{ fontSize: 12, color: item.color, fontWeight: 700 }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>{item.perf}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.highlight, fontSize: 13, fontStyle: "italic", textAlign: "center", marginBottom: 0 }}>
                Questo schema si sta ripetendo in medicina, diritto, design e programmazione. Il futuro e dei centauri.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", paddingBottom: 32 }}>
        IIS AI — Introduzione all'Intelligenza Artificiale per le scuole superiori
      </div>
    </div>
  );
}
