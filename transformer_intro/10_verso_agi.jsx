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

const AGI_LEVELS = [
  {
    id: "ani",
    title: "IA Ristretta (ANI)",
    subtitle: "Artificial Narrow Intelligence",
    emoji: "🎯",
    color: COLORS.accent,
    description: "Sa fare UNA cosa bene. Tutti i sistemi attuali.",
    examples: ["ChatGPT (testo)", "DALL-E (immagini)", "AlphaGo (gioco)", "Siri (comandi vocali)"],
    current: true,
  },
  {
    id: "agi",
    title: "IA Generale (AGI)",
    subtitle: "Artificial General Intelligence",
    emoji: "🧠",
    color: COLORS.highlight,
    description: "Sa fare QUALSIASI compito cognitivo umano. Non esiste ancora.",
    examples: ["Ragionamento astratto", "Apprendimento autonomo", "Trasferimento tra domini", "Comprensione causale"],
    current: false,
  },
  {
    id: "asi",
    title: "Superintelligenza (ASI)",
    subtitle: "Artificial Super Intelligence",
    emoji: "✨",
    color: COLORS.accent3,
    description: "Supera gli umani in TUTTO. Pura speculazione.",
    examples: ["Oltre la comprensione umana", "Auto-miglioramento illimitato", "Nuova fisica?", "Scenario ipotetico"],
    current: false,
  },
];

const SCIENCE_AREAS = [
  {
    id: "ipotesi",
    emoji: "💡",
    title: "Generazione di ipotesi",
    color: COLORS.accent,
    description: "L'IA legge TUTTA la letteratura scientifica e trova connessioni che nessun umano potrebbe vedere.",
    example: "Un ricercatore legge ~250 paper/anno. PubMed ne contiene 36 milioni. L'IA li analizza tutti.",
  },
  {
    id: "esperimenti",
    emoji: "🧪",
    title: "Progettazione di esperimenti",
    color: COLORS.accent2,
    description: "Ottimizza protocolli automaticamente, riducendo tempi e costi.",
    example: "Robot da laboratorio guidati dall'IA eseguono migliaia di esperimenti in parallelo.",
  },
  {
    id: "farmaci",
    emoji: "💊",
    title: "Scoperta di farmaci",
    color: COLORS.accent4,
    description: "AlphaFold ha previsto la struttura di 200M di proteine - e questo e solo l'inizio.",
    example: "Sviluppare un farmaco costa ~2.6 miliardi di $ e 10-15 anni. L'IA potrebbe ridurre entrambi drasticamente.",
  },
  {
    id: "teorie",
    emoji: "🔬",
    title: "Nuove teorie scientifiche",
    color: COLORS.accent3,
    description: "Un'IA potrebbe trovare pattern nei dati che portano a nuove teorie in fisica, matematica, biologia.",
    example: "Come Keplero trovo le leggi del moto planetario nei dati di Brahe - ma su scala cosmica.",
  },
  {
    id: "architetture",
    emoji: "🏗️",
    title: "IA che progetta IA",
    color: COLORS.highlight,
    description: "Neural Architecture Search: IA che progetta architetture di IA migliori. Gia in uso oggi.",
    example: "NASNet di Google ha progettato un'architettura che batte quelle create dagli umani.",
  },
];

const IMPACT_TABS = [
  {
    id: "societa",
    title: "Societa",
    emoji: "🏛️",
    color: COLORS.accent,
    positives: [
      "Traduzione universale in tempo reale - fine delle barriere linguistiche",
      "Tutor personale IA per ogni studente del pianeta",
      "Diagnosi mediche accessibili anche in zone remote",
      "Democratizzazione della conoscenza esperta",
    ],
    risks: [
      "Deepfakes indistinguibili dalla realta",
      "Manipolazione dell'opinione pubblica su scala industriale",
      "Concentrazione del potere in chi controlla l'IA",
      "Erosione della fiducia nelle informazioni",
    ],
  },
  {
    id: "lavoro",
    title: "Lavoro",
    emoji: "💼",
    color: COLORS.accent2,
    positives: [
      "Non 'quali lavori spariranno' ma 'come cambiera il concetto stesso di lavoro'",
      "Se l'IA fa il 90% dei compiti cognitivi, il valore umano sta in:",
      "  1. Giudizio etico - decidere cosa e giusto",
      "  2. Empatia e relazioni - connessione umana",
      "  3. Creativita originale - visione artistica",
      "  4. Leadership - ispirare e guidare altri umani",
    ],
    risks: [
      "Transizione troppo rapida per l'adattamento sociale",
      "Disuguaglianza tra chi sa usare l'IA e chi no",
      "Perdita di competenze di base per eccessiva delega",
      "Crisi d'identita legata al lavoro",
    ],
  },
  {
    id: "economia",
    title: "Economia",
    emoji: "📊",
    color: COLORS.accent4,
    positives: [
      "PIL globale potrebbe raddoppiare (stime McKinsey/Goldman Sachs)",
      "Produttivita amplificata in ogni settore",
      "Nuovi mercati e industrie oggi inimmaginabili",
      "Costo marginale di molti servizi verso zero",
    ],
    risks: [
      "Chi possiede l'IA possiede il valore - rischio di concentrazione estrema",
      "Universal Basic Income come possibile risposta?",
      "Tassazione delle macchine: come redistribuire?",
      "Paesi senza IA rischiano di restare indietro per sempre",
    ],
  },
];

const AGREEMENT_POINTS = [
  { topic: "L'IA e trasformativa", loving: true, adolescence: true },
  { topic: "Servono istituzioni giuste", loving: true, adolescence: true },
  { topic: "La distribuzione equa e cruciale", loving: true, adolescence: true },
  { topic: "I rischi sono concreti, non fantascienza", loving: true, adolescence: true },
  { topic: "Tono prevalente", loving: "Ottimismo fondato", adolescence: "Cautela responsabile" },
  { topic: "Tempistica impatto", loving: "5-10 anni (rapido)", adolescence: "Graduale, serve guida" },
  { topic: "Metafora centrale", loving: "Amplificatore", adolescence: "Adolescente" },
  { topic: "Priorita", loving: "Massimizzare benefici", adolescence: "Minimizzare danni" },
];

export default function App() {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [showSingularity, setShowSingularity] = useState(false);
  const [expandedScience, setExpandedScience] = useState(null);
  const [activeImpactTab, setActiveImpactTab] = useState("societa");
  const [showRabbitHole, setShowRabbitHole] = useState(false);
  const [activeVision, setActiveVision] = useState("loving");

  const currentImpact = IMPACT_TABS.find((t) => t.id === activeImpactTab);

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      padding: "40px 20px", maxWidth: 900, margin: "0 auto",
    }}>
      {/* Hero */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌌</div>
        <h1 style={{
          fontSize: 36, fontWeight: 800, marginBottom: 8,
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3}, ${COLORS.highlight})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          Verso l'AGI
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          Dove stiamo andando? Il futuro dell'intelligenza artificiale
          tra promesse scientifiche, impatti sociali e visioni a confronto.
        </p>
      </div>

      {/* Section 1: Cos'e l'AGI? */}
      <Section title="Cos'e l'AGI?" accent={COLORS.highlight}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
          Tre livelli di intelligenza artificiale. Clicca su ciascuno per esplorare.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {AGI_LEVELS.map((level) => {
            const isHovered = hoveredLevel === level.id;
            const isExpanded = isHovered || level.current;
            return (
              <div
                key={level.id}
                onClick={() => setHoveredLevel(hoveredLevel === level.id ? null : level.id)}
                style={{
                  flex: "1 1 240px", padding: 20, borderRadius: 12,
                  background: isExpanded ? `${level.color}11` : COLORS.card,
                  border: `2px solid ${isExpanded ? level.color : COLORS.border}`,
                  cursor: "pointer", transition: "all 0.3s ease",
                  position: "relative", overflow: "hidden",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  boxShadow: isHovered ? `0 8px 32px ${level.color}22` : "none",
                }}
              >
                {level.current && (
                  <div style={{
                    position: "absolute", top: 8, right: 8,
                    background: level.color, color: COLORS.bg,
                    fontSize: 10, fontWeight: 800, padding: "2px 8px",
                    borderRadius: 4, fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: 1,
                  }}>
                    SIAMO QUI
                  </div>
                )}
                <div style={{ fontSize: 32, marginBottom: 8 }}>{level.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: level.color, marginBottom: 4 }}>
                  {level.title}
                </div>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  {level.subtitle}
                </div>
                <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5, marginBottom: 12 }}>
                  {level.description}
                </p>
                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 10, marginTop: 4 }}>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, fontWeight: 600 }}>
                      {level.current ? "Esempi attuali:" : "Caratteristiche:"}
                    </div>
                    {level.examples.map((ex, i) => (
                      <div key={i} style={{
                        fontSize: 12, color: level.color, padding: "3px 0",
                        display: "flex", alignItems: "center", gap: 6,
                      }}>
                        <span style={{ opacity: 0.5 }}>{'>'}</span> {ex}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: 20, padding: "12px 0" }}>
          <div style={{ position: "relative", height: 6, background: COLORS.border, borderRadius: 3, overflow: "visible" }}>
            <div style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: "15%", borderRadius: 3,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent}88)`,
            }} />
            <div style={{
              position: "absolute", left: "13%", top: -8,
              width: 22, height: 22, borderRadius: "50%",
              background: COLORS.accent, border: `3px solid ${COLORS.bg}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10,
              boxShadow: `0 0 12px ${COLORS.accent}66`,
            }}>
              📍
            </div>
            <div style={{
              position: "absolute", left: "50%", top: 12, transform: "translateX(-50%)",
              fontSize: 10, color: COLORS.highlight, fontFamily: "'JetBrains Mono', monospace",
              opacity: 0.6,
            }}>
              AGI?
            </div>
            <div style={{
              position: "absolute", left: "85%", top: 12, transform: "translateX(-50%)",
              fontSize: 10, color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace",
              opacity: 0.4,
            }}>
              ASI ???
            </div>
          </div>
        </div>
      </Section>

      {/* Section 2: La Singolarita Tecnologica */}
      <Section title="La Singolarita Tecnologica" accent={COLORS.accent3}>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
          Concetto di <Tag color={COLORS.accent3}>Vernor Vinge</Tag> e <Tag color={COLORS.accent3}>Ray Kurzweil</Tag>:
          il punto in cui l'IA puo migliorare <strong style={{ color: COLORS.highlight }}>se stessa</strong>.
        </p>

        <div
          onClick={() => setShowSingularity(!showSingularity)}
          style={{
            cursor: "pointer", padding: 16, borderRadius: 12,
            background: `${COLORS.accent3}08`, border: `1px dashed ${COLORS.accent3}44`,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12, fontWeight: 600 }}>
            {showSingularity ? "▼" : "▶"} Il ciclo di auto-miglioramento (clicca per espandere)
          </div>

          {showSingularity && (
            <div>
              {/* Feedback loop visualization */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 0, flexWrap: "wrap", margin: "16px 0",
              }}>
                {[
                  { text: "IA migliore", emoji: "🧠", color: COLORS.accent },
                  { text: "→", emoji: "", color: COLORS.muted },
                  { text: "Progetta IA\nancora migliore", emoji: "⚙️", color: COLORS.accent3 },
                  { text: "→", emoji: "", color: COLORS.muted },
                  { text: "Accelerazione\nesponenziale", emoji: "🚀", color: COLORS.highlight },
                  { text: "→", emoji: "", color: COLORS.muted },
                  { text: "Singolarita", emoji: "💥", color: COLORS.accent2 },
                ].map((step, i) => (
                  <div key={i} style={{
                    textAlign: "center", padding: step.emoji ? "12px 16px" : "0 8px",
                    ...(step.emoji ? {
                      background: `${step.color}11`, border: `1px solid ${step.color}33`,
                      borderRadius: 10, minWidth: 100,
                    } : {}),
                  }}>
                    {step.emoji && <div style={{ fontSize: 24, marginBottom: 4 }}>{step.emoji}</div>}
                    <div style={{
                      fontSize: step.emoji ? 11 : 20, color: step.color,
                      fontWeight: 600, whiteSpace: "pre-line",
                      fontFamily: step.emoji ? "'JetBrains Mono', monospace" : "inherit",
                    }}>
                      {step.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Exponential curve ASCII-style */}
              <div style={{
                background: COLORS.bg, borderRadius: 8, padding: 16,
                border: `1px solid ${COLORS.border}`, marginTop: 16,
              }}>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                  Capacita IA nel tempo:
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.4 }}>
                  {[
                    { bar: 2, year: "2020" },
                    { bar: 3, year: "2022" },
                    { bar: 5, year: "2024" },
                    { bar: 9, year: "2026" },
                    { bar: 16, year: "2028?" },
                    { bar: 30, year: "2030?" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                      <span style={{ color: COLORS.muted, width: 40, textAlign: "right" }}>{row.year}</span>
                      <div style={{
                        height: 14, borderRadius: 2,
                        width: `${row.bar * 12}px`,
                        background: i < 4
                          ? `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent3})`
                          : `linear-gradient(90deg, ${COLORS.accent3}, ${COLORS.highlight})`,
                        opacity: i >= 4 ? 0.5 : 1,
                      }} />
                      {i >= 4 && <span style={{ color: COLORS.highlight, fontSize: 10 }}>proiezione</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginTop: 16, padding: 12, borderRadius: 8,
                background: `${COLORS.accent2}11`, borderLeft: `3px solid ${COLORS.accent2}`,
                fontSize: 13, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic",
              }}>
                "Oltre quel punto, e impossibile prevedere cosa succedera -
                come guardare oltre l'orizzonte degli eventi di un buco nero."
              </div>

              <div style={{ marginTop: 12, fontSize: 12, color: COLORS.muted }}>
                Kurzweil predice <Tag color={COLORS.highlight}>~2045</Tag> - ma e molto controverso.
                Molti ricercatori sono scettici sulle tempistiche.
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Section 3: Ricerca scientifica automatica */}
      <Section title="Ricerca scientifica automatica" accent={COLORS.accent4}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          Come l'AGI potrebbe rivoluzionare la scienza. Clicca su un'area per approfondire.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SCIENCE_AREAS.map((area) => {
            const isExpanded = expandedScience === area.id;
            return (
              <div
                key={area.id}
                onClick={() => setExpandedScience(isExpanded ? null : area.id)}
                style={{
                  padding: "14px 18px", borderRadius: 10, cursor: "pointer",
                  background: isExpanded ? `${area.color}11` : COLORS.bg,
                  border: `1px solid ${isExpanded ? area.color : COLORS.border}`,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{area.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: area.color }}>
                      {area.title}
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>
                      {area.description}
                    </div>
                  </div>
                  <span style={{ fontSize: 14, color: COLORS.muted, transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "none" }}>
                    ▶
                  </span>
                </div>
                {isExpanded && (
                  <div style={{
                    marginTop: 12, paddingTop: 12, borderTop: `1px solid ${COLORS.border}`,
                    fontSize: 13, color: COLORS.text, lineHeight: 1.6,
                    paddingLeft: 34,
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <span style={{ color: area.color, fontWeight: 700, fontSize: 12 }}>ESEMPIO:</span>
                      <span>{area.example}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* Section 4: Impatti su societa, lavoro, economia */}
      <Section title="Impatti su societa, lavoro, economia" accent={COLORS.accent2}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {IMPACT_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveImpactTab(tab.id)}
              style={{
                flex: 1, padding: "10px 12px", borderRadius: 8,
                background: activeImpactTab === tab.id ? `${tab.color}22` : COLORS.bg,
                border: `1px solid ${activeImpactTab === tab.id ? tab.color : COLORS.border}`,
                color: activeImpactTab === tab.id ? tab.color : COLORS.muted,
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                transition: "all 0.2s ease",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tab.emoji} {tab.title}
            </button>
          ))}
        </div>

        {currentImpact && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {/* Opportunities */}
            <div style={{
              flex: "1 1 280px", padding: 16, borderRadius: 10,
              background: `${COLORS.accent4}08`, border: `1px solid ${COLORS.accent4}33`,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: COLORS.accent4,
                marginBottom: 10, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 1,
              }}>
                ✅ OPPORTUNITA
              </div>
              {currentImpact.positives.map((item, i) => (
                <div key={i} style={{
                  fontSize: 13, color: COLORS.text, padding: "4px 0",
                  lineHeight: 1.5, display: "flex", gap: 6,
                }}>
                  <span style={{ color: COLORS.accent4, flexShrink: 0 }}>
                    {item.startsWith("  ") ? "  " : "•"}
                  </span>
                  <span>{item.trimStart()}</span>
                </div>
              ))}
            </div>

            {/* Risks */}
            <div style={{
              flex: "1 1 280px", padding: 16, borderRadius: 10,
              background: `${COLORS.accent2}08`, border: `1px solid ${COLORS.accent2}33`,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: COLORS.accent2,
                marginBottom: 10, fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: 1,
              }}>
                ⚠️ RISCHI
              </div>
              {currentImpact.risks.map((item, i) => (
                <div key={i} style={{
                  fontSize: 13, color: COLORS.text, padding: "4px 0",
                  lineHeight: 1.5, display: "flex", gap: 6,
                }}>
                  <span style={{ color: COLORS.accent2, flexShrink: 0 }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Section 5: Tana del bianconiglio */}
      <div style={{ marginBottom: 32 }}>
        <div
          onClick={() => setShowRabbitHole(!showRabbitHole)}
          style={{
            padding: "20px 28px", borderRadius: 16, cursor: "pointer",
            background: showRabbitHole
              ? `linear-gradient(135deg, ${COLORS.card}, ${COLORS.accent3}08)`
              : COLORS.card,
            border: `1px solid ${showRabbitHole ? COLORS.accent3 : COLORS.border}`,
            borderLeft: `3px solid ${COLORS.accent3}`,
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>🐇</span>
            <div>
              <h2 style={{
                fontSize: 14, fontWeight: 700, color: COLORS.accent3,
                letterSpacing: 2, textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace", marginBottom: 4,
              }}>
                Tana del bianconiglio
              </h2>
              <p style={{ fontSize: 12, color: COLORS.muted }}>
                Due visioni di Dario Amodei (CEO Anthropic) sul futuro dell'IA.
                {!showRabbitHole && " Clicca per esplorare."}
              </p>
            </div>
            <span style={{
              marginLeft: "auto", fontSize: 18, color: COLORS.accent3,
              transition: "transform 0.3s",
              transform: showRabbitHole ? "rotate(180deg)" : "none",
            }}>
              ▼
            </span>
          </div>
        </div>

        {showRabbitHole && (
          <div style={{
            marginTop: -8, padding: "32px 28px", paddingTop: 40,
            background: COLORS.card, borderRadius: "0 0 16px 16px",
            border: `1px solid ${COLORS.accent3}33`, borderTop: "none",
          }}>
            {/* Vision toggle */}
            <div style={{ display: "flex", gap: 0, marginBottom: 24, borderRadius: 8, overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
              <button
                onClick={() => setActiveVision("loving")}
                style={{
                  flex: 1, padding: "12px 16px", cursor: "pointer",
                  background: activeVision === "loving" ? `${COLORS.accent4}22` : COLORS.bg,
                  border: "none", borderRight: `1px solid ${COLORS.border}`,
                  color: activeVision === "loving" ? COLORS.accent4 : COLORS.muted,
                  fontSize: 13, fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                🌱 Machines of Loving Grace
              </button>
              <button
                onClick={() => setActiveVision("adolescence")}
                style={{
                  flex: 1, padding: "12px 16px", cursor: "pointer",
                  background: activeVision === "adolescence" ? `${COLORS.highlight}22` : COLORS.bg,
                  border: "none",
                  color: activeVision === "adolescence" ? COLORS.highlight : COLORS.muted,
                  fontSize: 13, fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                🧑‍🎓 Adolescence of Technology
              </button>
            </div>

            {/* Loving Grace panel */}
            {activeVision === "loving" && (
              <div style={{
                padding: 20, borderRadius: 12,
                background: `${COLORS.accent4}08`, border: `1px solid ${COLORS.accent4}33`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>🌱</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.accent4 }}>
                      Machines of Loving Grace
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>
                      Visione OTTIMISTICA ma fondata
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7, marginBottom: 16 }}>
                  L'IA come il <strong style={{ color: COLORS.accent4 }}>piu grande amplificatore
                  della capacita umana</strong> nella storia. Non un sostituto,
                  ma uno strumento che moltiplica cio che sappiamo fare.
                </p>

                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent4, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                  5 AREE DI IMPATTO:
                </div>
                {[
                  { emoji: "🧬", area: "Biologia e salute", detail: "100 anni di progresso medico compressi in 5-10 anni" },
                  { emoji: "💰", area: "Poverta ed economia", detail: "Accesso universale a servizi oggi riservati ai ricchi" },
                  { emoji: "🏛️", area: "Governance", detail: "Decisioni pubbliche informate da analisi complete" },
                  { emoji: "💼", area: "Lavoro", detail: "Transizione gestita verso nuove forme di contributo" },
                  { emoji: "🗽", area: "Liberta individuali", detail: "Strumenti di empowerment per ogni persona" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, padding: "8px 0",
                    borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none",
                  }}>
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.accent4 }}>{item.area}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{item.detail}</div>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: 16, padding: 12, borderRadius: 8,
                  background: COLORS.bg, borderLeft: `3px solid ${COLORS.accent4}`,
                  fontSize: 13, fontStyle: "italic", color: COLORS.text, lineHeight: 1.6,
                }}>
                  "La tecnologia da sola non basta - servono istituzioni giuste
                  per distribuire equamente i benefici."
                </div>
              </div>
            )}

            {/* Adolescence panel */}
            {activeVision === "adolescence" && (
              <div style={{
                padding: 20, borderRadius: 12,
                background: `${COLORS.highlight}08`, border: `1px solid ${COLORS.highlight}33`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 28 }}>🧑‍🎓</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.highlight }}>
                      Adolescence of Technology
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.muted }}>
                      L'IA come un adolescente: potente ma immaturo
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7, marginBottom: 16 }}>
                  La fase attuale dell'IA: capace di cose <strong style={{ color: COLORS.highlight }}>straordinarie</strong> ma
                  anche di <strong style={{ color: COLORS.accent2 }}>errori gravi</strong>.
                  Come ogni adolescente, ha bisogno di guida, limiti e fiducia graduale.
                </p>

                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.highlight, marginBottom: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                  CARATTERISTICHE "ADOLESCENZIALI":
                </div>
                {[
                  { emoji: "💪", trait: "Potenza senza maturita", detail: "Capacita enormi ma senza giudizio consolidato" },
                  { emoji: "⚠️", trait: "Rischi concreti, non fantascienza", detail: "Bias, disinformazione, concentrazione del potere" },
                  { emoji: "🧭", trait: "Serve guida, non panico", detail: "Ne entusiasmo cieco ne terrore - responsible scaling" },
                  { emoji: "📈", trait: "Crescita inevitabile", detail: "Non possiamo rallentare l'adolescenza, ma possiamo accompagnarla" },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 10, padding: "8px 0",
                    borderBottom: i < 3 ? `1px solid ${COLORS.border}` : "none",
                  }}>
                    <span style={{ fontSize: 18 }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.highlight }}>{item.trait}</div>
                      <div style={{ fontSize: 12, color: COLORS.muted }}>{item.detail}</div>
                    </div>
                  </div>
                ))}

                <div style={{
                  marginTop: 16, padding: 12, borderRadius: 8,
                  background: COLORS.bg, borderLeft: `3px solid ${COLORS.highlight}`,
                  fontSize: 13, fontStyle: "italic", color: COLORS.text, lineHeight: 1.6,
                }}>
                  "Non possiamo rallentare l'adolescenza, ma possiamo accompagnarla.
                  L'approccio giusto non e ne l'entusiasmo cieco ne il panico."
                </div>
              </div>
            )}

            {/* Comparison table */}
            <div style={{ marginTop: 24 }}>
              <div style={{
                fontSize: 12, fontWeight: 700, color: COLORS.accent3, marginBottom: 12,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1,
              }}>
                CONFRONTO TRA LE DUE VISIONI
              </div>
              <div style={{
                borderRadius: 10, overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
              }}>
                {/* Header */}
                <div style={{
                  display: "flex", background: COLORS.bg,
                  borderBottom: `1px solid ${COLORS.border}`,
                  fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                }}>
                  <div style={{ flex: 2, padding: "8px 12px", color: COLORS.muted }}>TEMA</div>
                  <div style={{ flex: 2, padding: "8px 12px", color: COLORS.accent4 }}>🌱 LOVING GRACE</div>
                  <div style={{ flex: 2, padding: "8px 12px", color: COLORS.highlight }}>🧑‍🎓 ADOLESCENCE</div>
                </div>
                {AGREEMENT_POINTS.map((point, i) => {
                  const isAgreement = point.loving === true && point.adolescence === true;
                  return (
                    <div key={i} style={{
                      display: "flex",
                      background: i % 2 === 0 ? "transparent" : `${COLORS.bg}88`,
                      borderBottom: i < AGREEMENT_POINTS.length - 1 ? `1px solid ${COLORS.border}` : "none",
                    }}>
                      <div style={{
                        flex: 2, padding: "8px 12px", fontSize: 12,
                        color: isAgreement ? COLORS.text : COLORS.accent,
                        fontWeight: isAgreement ? 400 : 600,
                      }}>
                        {point.topic}
                      </div>
                      <div style={{ flex: 2, padding: "8px 12px", fontSize: 12, color: COLORS.accent4 }}>
                        {point.loving === true ? "✓ Si" : point.loving}
                      </div>
                      <div style={{ flex: 2, padding: "8px 12px", fontSize: 12, color: COLORS.highlight }}>
                        {point.adolescence === true ? "✓ Si" : point.adolescence}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{
                marginTop: 12, fontSize: 12, color: COLORS.muted, textAlign: "center", lineHeight: 1.5,
              }}>
                Le due visioni <strong style={{ color: COLORS.accent3 }}>concordano sulla maggior parte dei punti</strong>.
                La differenza principale e nel tono: ottimismo costruttivo vs cautela responsabile.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "20px 0", borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.muted, fontSize: 12,
      }}>
        <div style={{ marginBottom: 4 }}>
          <Tag color={COLORS.accent}>ANI</Tag>
          <Tag color={COLORS.highlight}>AGI</Tag>
          <Tag color={COLORS.accent3}>ASI</Tag>
          <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>
          <span>Il futuro e una scelta, non un destino</span>
        </div>
      </div>
    </div>
  );
}
