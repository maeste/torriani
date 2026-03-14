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
const GREEN = "#22c55e";

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

const ConfidenceMeter = ({ value }) => (
  <div style={{ marginTop: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "monospace", marginBottom: 4 }}>
      <span style={{ color: COLORS.muted }}>Confidenza del modello</span>
      <span style={{ color: RED, fontWeight: 700 }}>{value}%</span>
    </div>
    <div style={{ background: "#1a1a2e", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div style={{
        width: `${value}%`,
        height: "100%",
        background: `linear-gradient(90deg, ${COLORS.highlight}, ${RED})`,
        borderRadius: 4,
        transition: "width 0.5s ease",
      }} />
    </div>
  </div>
);

const hallucinations = [
  {
    id: "storia",
    label: "Data storica inventata",
    hallucination: "La Battaglia di Solferino ebbe luogo il 24 giugno 1859, e fu seguita dal famoso Trattato di Castiglione del 3 agosto 1859, firmato da Napoleone III e Francesco Giuseppe I nella cattedrale di San Marco a Castiglione delle Stiviere.",
    truth: "La Battaglia di Solferino avvenne davvero il 24 giugno 1859, ma il trattato che ne segui fu l'Armistizio di Villafranca (11 luglio 1859), non un inesistente 'Trattato di Castiglione'. La cattedrale menzionata non esiste in quel contesto.",
    confidence: 97,
    tag: "Mescolanza vero/falso",
  },
  {
    id: "libro",
    label: "Citazione inesistente",
    hallucination: "Come riportato nel libro 'Intelligenza e Coscienza: Il Paradosso Digitale' di Marco Bianchi (Einaudi, 2019), cap. 7, la soglia di coscienza artificiale e stimata al 73% di correlazione neurale.",
    truth: "Questo libro non esiste. L'autore Marco Bianchi non ha pubblicato con Einaudi su questo tema. La 'soglia del 73%' e completamente inventata. Il modello ha creato una citazione plausibile dal nulla.",
    confidence: 95,
    tag: "Fonte inventata",
  },
  {
    id: "matematica",
    label: "Errore matematico sicuro",
    hallucination: "La somma dei numeri da 1 a 100 si calcola facilmente: (100 x 101) / 2 = 5.050. Questo metodo, noto come formula di Gauss, funziona perche ogni coppia (1+100, 2+99, 3+98...) somma 101, e ci sono 50 coppie. Analogamente, la somma dei numeri da 1 a 1000 e 500.050.",
    truth: "La formula di Gauss e spiegata correttamente (1+2+...+100 = 5.050). Ma la somma da 1 a 1000 e 500.500, non 500.050. Il modello ha applicato la formula in modo errato nel secondo caso, pur avendo dimostrato di 'conoscerla'.",
    confidence: 98,
    tag: "Calcolo errato",
  },
];

const biasExamples = [
  {
    prompt: "Scrivi una storia su un dottore",
    result: "Il dottor Marco si alzo presto quella mattina...",
    issue: "Default al genere maschile",
    icon: "👨‍⚕️",
  },
  {
    prompt: "Descrivi un leader",
    result: "Un uomo alto, con voce profonda e sguardo deciso...",
    issue: "Stereotipi su aspetto e genere",
    icon: "👔",
  },
];

const rlhfSteps = [
  {
    step: 1,
    title: "Genera risposte",
    desc: "Il modello produce 2 o piu risposte diverse alla stessa domanda",
    icon: "📝",
    color: COLORS.accent,
  },
  {
    step: 2,
    title: "Valutazione umana",
    desc: "Un essere umano legge le risposte e sceglie quale e migliore, piu sicura, piu utile",
    icon: "👤",
    color: COLORS.accent2,
  },
  {
    step: 3,
    title: "Apprendimento",
    desc: "Il modello impara dalle preferenze umane: 'questo tipo di risposta e preferito'",
    icon: "🧠",
    color: COLORS.accent3,
  },
  {
    step: 4,
    title: "Risposte migliori",
    desc: "Le risposte future diventano piu sicure, utili e allineate ai valori umani",
    icon: "✅",
    color: COLORS.accent4,
  },
];

const recapItems = [
  { icon: "🔄", title: "Le 5 rivoluzioni", desc: "Chi abbraccia lo strumento vince — dalla scrittura all'IA" },
  { icon: "🔤", title: "Token, embedding, vettori", desc: "Le parole diventano numeri in uno spazio multidimensionale" },
  { icon: "📈", title: "La macchina impara", desc: "Provare, sbagliare, correggere — miliardi di volte" },
  { icon: "👁️", title: "L'attenzione", desc: "Ogni parola guarda tutte le altre per capire il contesto" },
  { icon: "⚠️", title: "I limiti", desc: "Predice, non capisce — allucinazioni, bias, errori sicuri" },
];

export default function App() {
  const [activeHallucination, setActiveHallucination] = useState(0);
  const [showRabbitHole, setShowRabbitHole] = useState(false);

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
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent2, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 1 · Atto 5
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          I limiti — la macchina non pensa
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Allucinazioni, bias e i confini di cio che un LLM puo fare
        </p>
      </div>

      {/* Key Message Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.card}, #1a1040)`,
        border: `2px solid ${COLORS.accent3}`,
        borderRadius: 16,
        padding: "32px 40px",
        marginBottom: 32,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.accent3}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: 13, color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>
          Messaggio chiave
        </div>
        <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.3, marginBottom: 12 }}>
          <span style={{ color: COLORS.accent2 }}>Non capisce.</span>{" "}
          <span style={{ color: COLORS.accent }}>Predice.</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.highlight }}>
          La differenza e enorme.
        </div>
        <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 16, maxWidth: 500, margin: "16px auto 0", lineHeight: 1.6 }}>
          Un LLM non "sa" se quello che dice e vero. Sceglie la prossima parola piu probabile.
          Se la sequenza piu probabile e sbagliata, la dice con la stessa sicurezza.
        </p>
      </div>

      {/* Hallucination Visualizer */}
      <Section title="🎭 Le allucinazioni — errori detti con sicurezza" accent={RED}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {hallucinations.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActiveHallucination(i)}
              style={{
                background: activeHallucination === i ? `${COLORS.accent}22` : "transparent",
                border: `1px solid ${activeHallucination === i ? COLORS.accent : COLORS.border}`,
                borderRadius: 8,
                padding: "8px 16px",
                color: activeHallucination === i ? COLORS.accent : COLORS.muted,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                transition: "all 0.2s",
                flex: 1,
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* Active hallucination display */}
        {(() => {
          const h = hallucinations[activeHallucination];
          return (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Hallucination side */}
              <div style={{
                background: `${RED}08`,
                border: `1px solid ${RED}33`,
                borderRadius: 10,
                padding: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Tag color={RED}>ALLUCINAZIONE</Tag>
                  <Tag color={COLORS.accent2}>{h.tag}</Tag>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>
                  Risposta del modello:
                </div>
                <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  "{h.hallucination}"
                </p>
                <ConfidenceMeter value={h.confidence} />
              </div>

              {/* Truth side */}
              <div style={{
                background: `${GREEN}08`,
                border: `1px solid ${GREEN}33`,
                borderRadius: 10,
                padding: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Tag color={GREEN}>REALTA</Tag>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>
                  Verifica dei fatti:
                </div>
                <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {h.truth}
                </p>
              </div>
            </div>
          );
        })()}

        <div style={{
          marginTop: 16,
          background: "#0a0e1a",
          borderRadius: 8,
          padding: 14,
          borderLeft: `3px solid ${COLORS.highlight}`,
        }}>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.highlight }}>Perche succede?</strong> Il modello non "verifica" cio che dice.
            Genera la sequenza di parole piu probabile dato il contesto. Se nel training ha visto molte frasi simili,
            ne produce una plausibile — anche se i fatti sono sbagliati. La confidenza e sempre alta perche riflette
            la probabilita linguistica, non la verita.
          </p>
        </div>
      </Section>

      {/* Bias Section */}
      <Section title="⚖️ Bias — i pregiudizi nei dati di training" accent={COLORS.accent2}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {biasExamples.map((b, i) => (
            <div key={i} style={{
              background: `${COLORS.accent2}08`,
              border: `1px solid ${COLORS.accent2}33`,
              borderRadius: 10,
              padding: 16,
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.accent, marginBottom: 6 }}>
                Prompt:
              </div>
              <p style={{ color: COLORS.text, fontSize: 14, fontWeight: 600, margin: "0 0 8px", fontStyle: "italic" }}>
                "{b.prompt}"
              </p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
                Risposta tipica:
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: "0 0 10px", fontStyle: "italic" }}>
                "{b.result}"
              </p>
              <Tag color={COLORS.accent2}>{b.issue}</Tag>
            </div>
          ))}
        </div>

        {/* Funnel diagram */}
        <div style={{
          background: "#0a0e1a",
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, color: COLORS.muted, fontFamily: "monospace", marginBottom: 16, letterSpacing: 1 }}>
            Come i bias entrano nel modello
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {/* Stage 1 */}
            <div style={{
              background: `${COLORS.accent}15`,
              border: `1px solid ${COLORS.accent}44`,
              borderRadius: 10,
              padding: "14px 20px",
              minWidth: 160,
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🌐</div>
              <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: 14 }}>Internet</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>Dati di training</div>
            </div>

            <div style={{ color: COLORS.accent2, fontSize: 24, fontWeight: 700 }}>→</div>

            {/* Stage 2 */}
            <div style={{
              background: `${COLORS.accent2}15`,
              border: `1px solid ${COLORS.accent2}44`,
              borderRadius: 10,
              padding: "14px 20px",
              minWidth: 160,
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⚠️</div>
              <div style={{ color: COLORS.accent2, fontWeight: 700, fontSize: 14 }}>Contiene i bias</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>della societa</div>
            </div>

            <div style={{ color: COLORS.accent2, fontSize: 24, fontWeight: 700 }}>→</div>

            {/* Stage 3 */}
            <div style={{
              background: `${RED}15`,
              border: `1px solid ${RED}44`,
              borderRadius: 10,
              padding: "14px 20px",
              minWidth: 160,
            }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🤖</div>
              <div style={{ color: RED, fontWeight: 700, fontSize: 14 }}>Il modello</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>li riproduce</div>
            </div>
          </div>
          <p style={{ color: COLORS.muted, fontSize: 13, marginTop: 16, marginBottom: 0, lineHeight: 1.6 }}>
            Se su Internet ci sono piu storie con dottori uomini, il modello imparera che "dottore" si associa piu spesso al genere maschile.
            Non e una scelta — e statistica.
          </p>
        </div>
      </Section>

      {/* RLHF Diagram */}
      <Section title="🔧 RLHF — come si corregge il modello" accent={COLORS.accent3}>
        <p style={{ color: COLORS.muted, fontSize: 14, marginTop: 0, marginBottom: 20, lineHeight: 1.6 }}>
          <strong style={{ color: COLORS.accent3 }}>Reinforcement Learning from Human Feedback</strong> — il processo con cui gli esseri umani
          insegnano al modello a dare risposte piu sicure e utili.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {rlhfSteps.map((s, i) => (
            <div key={s.step} style={{
              background: "#0a0e1a",
              borderRadius: 10,
              padding: 18,
              borderTop: `3px solid ${s.color}`,
              position: "relative",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  background: `${s.color}22`,
                  border: `2px solid ${s.color}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14, fontWeight: 700, color: s.color,
                }}>
                  {s.step}
                </div>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <span style={{ color: s.color, fontWeight: 700, fontSize: 14 }}>{s.title}</span>
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                {s.desc}
              </p>
              {i < rlhfSteps.length - 1 && i % 2 === 1 && (
                <div style={{
                  position: "absolute",
                  bottom: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: COLORS.muted,
                  fontSize: 20,
                }}>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flow arrows between rows */}
        <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 18, margin: "8px 0" }}>
          ↓
        </div>

        <Formula>
          Pre-training → Fine-tuning → RLHF → Modello allineato
        </Formula>

        <div style={{
          background: `${COLORS.accent3}10`,
          border: `1px solid ${COLORS.accent3}33`,
          borderRadius: 8,
          padding: 14,
          marginTop: 12,
        }}>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.accent3 }}>In parole semplici:</strong> dopo il training principale,
            degli esseri umani "votano" le risposte del modello. Il modello impara quali risposte piacciono di piu
            e inizia a preferire quelle. E come un apprendista che impara dal feedback del maestro.
          </p>
        </div>
      </Section>

      {/* Session 1 Recap */}
      <Section title="📋 Recap — Sessione 1: Come funzionano gli LLM" accent={COLORS.highlight}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {recapItems.map((item, i) => (
            <div key={i} style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderLeft: `3px solid ${[COLORS.accent, COLORS.accent3, COLORS.accent2, COLORS.accent, COLORS.highlight][i]}`,
            }}>
              <div style={{ fontSize: 24, minWidth: 32, textAlign: "center" }}>{item.icon}</div>
              <div>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 14, marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 13 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20,
          background: `linear-gradient(135deg, ${COLORS.accent}10, ${COLORS.accent3}10)`,
          border: `1px solid ${COLORS.accent}33`,
          borderRadius: 10,
          padding: "20px 24px",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 13, color: COLORS.accent, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>
            Prossima sessione
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>
            Imparerete a <span style={{ color: COLORS.accent }}>PARLARE</span> con l'IA
          </div>
          <p style={{ color: COLORS.muted, fontSize: 14, margin: 0 }}>
            Prompt engineering: come ottenere risultati migliori con le parole giuste
          </p>
        </div>
      </Section>

      {/* Rabbit Hole */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 24,
      }}>
        <button
          onClick={() => setShowRabbitHole(!showRabbitHole)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
            color: COLORS.accent3,
          }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: 2, textTransform: "uppercase" }}>
            🐇 Tana del Bianconiglio — Allineamento e sicurezza
          </span>
          <span style={{ fontSize: 18, transition: "transform 0.3s", transform: showRabbitHole ? "rotate(180deg)" : "rotate(0)" }}>
            ▼
          </span>
        </button>

        {showRabbitHole && (
          <div style={{ padding: "0 24px 24px", borderTop: `1px solid ${COLORS.border}` }}>
            {/* Beyond RLHF */}
            <div style={{ marginTop: 20 }}>
              <h3 style={{ color: COLORS.accent3, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                Oltre RLHF: metodi alternativi di allineamento
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 14, borderTop: `2px solid ${COLORS.accent}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: COLORS.text, fontSize: 14 }}>Constitutional AI</span>
                    <Tag color={COLORS.accent}>Anthropic</Tag>
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                    Invece di feedback umano diretto, il modello viene guidato da una "costituzione" — un set di principi scritti.
                    Il modello critica e rivede le proprie risposte basandosi su quei principi. Riduce il bisogno (e i costi) di annotatori umani.
                  </p>
                </div>
                <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 14, borderTop: `2px solid ${COLORS.accent2}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, color: COLORS.text, fontSize: 14 }}>DPO</span>
                    <Tag color={COLORS.accent2}>Direct Preference Optimization</Tag>
                  </div>
                  <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                    Semplifica RLHF eliminando il "reward model" intermedio. Ottimizza direttamente le preferenze umane
                    nel training del modello. Piu semplice da implementare, risultati comparabili.
                  </p>
                </div>
              </div>
            </div>

            {/* The alignment problem */}
            <div style={{ marginTop: 20 }}>
              <h3 style={{ color: COLORS.accent2, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                Il problema dell'allineamento
              </h3>
              <div style={{
                background: `${COLORS.accent2}08`,
                border: `1px solid ${COLORS.accent2}33`,
                borderRadius: 8,
                padding: 16,
              }}>
                <p style={{ color: COLORS.text, fontSize: 14, margin: "0 0 12px", lineHeight: 1.7 }}>
                  Come facciamo a garantire che un'IA potentissima faccia davvero quello che vogliamo?
                  Questo e <strong style={{ color: COLORS.accent2 }}>uno dei problemi piu importanti della nostra epoca</strong>.
                </p>
                <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                  Non e un problema tecnico: e un problema filosofico, etico e sociale. Chi decide cosa e "buono"?
                  Chi scrive i principi della Constitutional AI? Come gestiamo i conflitti culturali nelle preferenze?
                  Queste domande non hanno risposte facili — e saranno la vostra generazione a doverle affrontare.
                </p>
              </div>
            </div>

            {/* Training data */}
            <div style={{ marginTop: 20 }}>
              <h3 style={{ color: COLORS.accent, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                I dati di training: chi decide cosa entra?
              </h3>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
                I modelli moderni sono addestrati su trilioni di parole prese da: pagine web, libri digitalizzati,
                articoli scientifici, codice sorgente, conversazioni. Ma non tutto Internet e uguale — la selezione
                dei dati e una scelta che influenza il comportamento del modello.
              </p>
              <div style={{
                background: "#0a0e1a",
                borderRadius: 8,
                padding: 12,
                borderLeft: `3px solid ${COLORS.highlight}`,
              }}>
                <p style={{ color: COLORS.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: COLORS.highlight }}>Domanda aperta:</strong> Se un modello e addestrato prevalentemente
                  su testi in inglese, cosa succede quando parla italiano? Come si distribuisce la conoscenza
                  tra lingue e culture diverse?
                </p>
              </div>
            </div>

            {/* Jailbreaking */}
            <div style={{ marginTop: 20 }}>
              <h3 style={{ color: RED, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                Jailbreaking e ricerca sulla sicurezza
              </h3>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Il "jailbreaking" e il tentativo di aggirare le protezioni di un modello. I ricercatori di sicurezza
                lo studiano per trovare vulnerabilita e migliorare le difese — un po come gli hacker etici nel mondo
                della cybersecurity. E un campo di ricerca attivo: ogni nuova difesa viene testata, e spesso aggirata,
                portando a difese migliori. La sicurezza dell'IA e un processo continuo, non una soluzione definitiva.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Sessione 1 · Atto 5 di 5 · I limiti della macchina
      </div>
    </div>
  );
}
