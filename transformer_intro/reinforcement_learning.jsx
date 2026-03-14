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

/* ── Cycle box for RL loop ── */
const CycleBox = ({ label, icon, color, active, onClick, description }) => (
  <div
    onClick={onClick}
    style={{
      background: active ? `${color}18` : COLORS.bg,
      border: `2px solid ${active ? color : COLORS.border}`,
      borderRadius: 12,
      padding: "16px 20px",
      textAlign: "center",
      cursor: "pointer",
      transition: "all 0.4s ease",
      boxShadow: active ? `0 0 20px ${color}33` : "none",
      minWidth: 120,
      userSelect: "none",
    }}
  >
    <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 14, fontWeight: 700, color: active ? color : COLORS.text, marginBottom: 4 }}>
      {label}
    </div>
    {active && description && (
      <div style={{
        fontSize: 12,
        color: COLORS.muted,
        marginTop: 8,
        lineHeight: 1.5,
        transition: "all 0.3s ease",
      }}>
        {description}
      </div>
    )}
  </div>
);

/* ── Arrow connector ── */
const CycleArrow = ({ direction = "right", color = COLORS.accent }) => {
  const arrows = { right: "→", down: "↓", left: "←", up: "↑" };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: color,
      fontSize: 22,
      fontWeight: 700,
      padding: "4px 8px",
    }}>
      {arrows[direction]}
    </div>
  );
};

/* ── Stat comparison card ── */
const StatCard = ({ label, value, subtext, color, icon }) => (
  <div style={{
    background: `${color}10`,
    border: `1px solid ${color}44`,
    borderRadius: 10,
    padding: "16px",
    textAlign: "center",
    flex: 1,
    minWidth: 140,
  }}>
    <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
    <div style={{ fontSize: 24, fontWeight: 800, color: color, marginBottom: 4 }}>
      {value}
    </div>
    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>
      {label}
    </div>
    <div style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.4 }}>
      {subtext}
    </div>
  </div>
);

/* ── Timeline node ── */
const TimelineNode = ({ year, title, detail, color, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      flex: 1,
      transition: "all 0.3s ease",
    }}
  >
    <div style={{
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: active ? color : COLORS.border,
      border: `2px solid ${active ? color : COLORS.muted}`,
      transition: "all 0.3s ease",
      boxShadow: active ? `0 0 12px ${color}55` : "none",
      marginBottom: 8,
    }} />
    <div style={{ fontSize: 13, fontWeight: 700, color: active ? color : COLORS.muted, marginBottom: 2 }}>
      {year}
    </div>
    <div style={{ fontSize: 12, fontWeight: 600, color: active ? COLORS.text : COLORS.muted, textAlign: "center", marginBottom: 4 }}>
      {title}
    </div>
    {active && (
      <div style={{
        fontSize: 11,
        color: COLORS.muted,
        textAlign: "center",
        maxWidth: 160,
        lineHeight: 1.4,
        marginTop: 4,
      }}>
        {detail}
      </div>
    )}
  </div>
);

/* ── Pipeline step ── */
const PipelineStep = ({ label, icon, color, active, description }) => (
  <div style={{
    background: active ? `${color}18` : COLORS.bg,
    border: `1px solid ${active ? color : COLORS.border}`,
    borderRadius: 10,
    padding: "12px 16px",
    textAlign: "center",
    flex: 1,
    transition: "all 0.4s ease",
    boxShadow: active ? `0 0 14px ${color}22` : "none",
  }}>
    <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
    <div style={{ fontSize: 12, fontWeight: 700, color: active ? color : COLORS.text }}>
      {label}
    </div>
    {active && description && (
      <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 6, lineHeight: 1.4 }}>
        {description}
      </div>
    )}
  </div>
);

export default function App() {
  /* Section 1: RL cycle */
  const [activeCycleBox, setActiveCycleBox] = useState(null);

  /* Section 2: AlphaGo */
  const [activeTimeline, setActiveTimeline] = useState(0);

  /* Section 3: RLHF */
  const [showAfterRLHF, setShowAfterRLHF] = useState(false);
  const [activePipeline, setActivePipeline] = useState(null);

  /* Section 4: RLVR */
  const [showRLVR, setShowRLVR] = useState(false);

  /* Deep Dive */
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [activeRabbit, setActiveRabbit] = useState(null);

  const cycleData = [
    {
      id: "agente",
      label: "Agente",
      icon: "🤖",
      color: COLORS.accent,
      description: "Chi decide cosa fare. Puo essere un cane, un algoritmo, un modello di IA. Osserva lo stato dell'ambiente e sceglie un'azione.",
    },
    {
      id: "azione",
      label: "Azione",
      icon: "🎯",
      color: COLORS.accent2,
      description: "Quello che l'agente decide di fare: sedersi, muovere un pezzo sulla scacchiera, generare una risposta.",
    },
    {
      id: "ambiente",
      label: "Ambiente",
      icon: "🌍",
      color: COLORS.accent3,
      description: "Il mondo in cui l'agente agisce. Reagisce all'azione e cambia stato. Puo essere un gioco, una conversazione, il mondo reale.",
    },
    {
      id: "ricompensa",
      label: "Ricompensa",
      icon: "⭐",
      color: COLORS.highlight,
      description: "Il feedback: +1 se va bene, -1 se va male. Il cane riceve un biscotto, il modello un punteggio. L'agente impara a massimizzare questa ricompensa.",
    },
  ];

  const timelineData = [
    {
      year: "2016",
      title: "AlphaGo",
      detail: "Addestrato su milioni di partite umane. Batte Lee Sedol 4-1. La Mossa 37 lascia il mondo senza parole.",
      color: COLORS.accent,
    },
    {
      year: "2017",
      title: "AlphaGo Zero",
      detail: "Zero partite umane. Impara solo giocando contro se stesso. Batte AlphaGo originale 100-0.",
      color: COLORS.accent2,
    },
    {
      year: "2017",
      title: "AlphaZero",
      detail: "Un solo algoritmo impara Scacchi, Go e Shogi. In 4 ore supera Stockfish (scacchi). In 40 ore, supera AlphaGo Zero (Go).",
      color: COLORS.accent3,
    },
  ];

  const rabbitHoles = [
    {
      id: "reward-hacking",
      title: "🎮 Reward Hacking",
      color: COLORS.accent2,
      content: "Il modello trova scorciatoie per massimizzare la ricompensa senza fare davvero cio che vogliamo. Esempio classico: un agente RL per un gioco di barche impara a girare in cerchio raccogliendo bonus invece di finire la gara. Nei LLM, il modello puo imparare a scrivere risposte che 'sembrano' buone senza esserlo davvero.",
    },
    {
      id: "constitutional",
      title: "📜 Constitutional AI (Anthropic)",
      color: COLORS.accent3,
      content: "Invece di far valutare ogni risposta a umani, Anthropic ha creato un sistema dove l'IA segue principi scritti (una 'costituzione'). L'IA critica le proprie risposte basandosi su questi principi, poi si auto-migliora. Meno dipendenza da feedback umano, piu scalabile e coerente.",
    },
    {
      id: "alignment",
      title: "⚠️ Il Problema dell'Allineamento",
      color: COLORS.highlight,
      content: "Come ci assicuriamo che un'IA superintelligente faccia quello che VOGLIAMO e non solo quello che le DICIAMO? Se chiedi 'massimizza la felicita umana', potrebbe decidere di drogarci tutti. Il problema dell'allineamento e considerato uno dei piu importanti della nostra epoca.",
    },
    {
      id: "multiagent",
      title: "🤼 Multi-Agent Self-Play",
      color: COLORS.accent4,
      content: "Piu agenti IA che competono e collaborano tra loro, scoprendo strategie emergenti che nessun umano ha mai pensato. OpenAI ha mostrato agenti che in hide-and-seek hanno inventato l'uso di strumenti e la costruzione di strutture, senza che nessuno gliel'abbia insegnato.",
    },
  ];

  return (
    <div style={{
      maxWidth: 900,
      margin: "0 auto",
      padding: "32px 24px",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: COLORS.text,
      background: COLORS.bg,
      minHeight: "100vh",
    }}>
      {/* ── Header ── */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: COLORS.muted,
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          Sessione 1 &middot; Atto 6
        </div>
        <h1 style={{
          fontSize: 42,
          fontWeight: 800,
          margin: "8px 0",
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}>
          Imparare Giocando
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "12px auto 0" }}>
          Come le macchine imparano per tentativi, errori e ricompense &mdash;
          dal cane che si siede per un biscotto all'IA che batte i campioni del mondo.
        </p>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <Tag color={COLORS.accent}>Reinforcement Learning</Tag>
          <Tag color={COLORS.accent2}>AlphaGo</Tag>
          <Tag color={COLORS.accent3}>RLHF</Tag>
          <Tag color={COLORS.accent4}>RLVR</Tag>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SEZIONE 1: Il Rinforzo
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="Il Rinforzo — Come un Cane Impara 'Seduto'" accent={COLORS.accent}>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
          Il <strong style={{ color: COLORS.accent }}>Reinforcement Learning</strong> (apprendimento per rinforzo)
          e il modo piu intuitivo di imparare: <em>provi qualcosa, vedi se funziona, e aggiusti il tiro</em>.
          Esattamente come un cane impara a sedersi: fa l'azione giusta, riceve un biscotto, e la ripete.
        </p>

        <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
          Clicca su ogni elemento del ciclo per scoprire cosa fa:
        </p>

        {/* RL Cycle visualization */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 16,
        }}>
          {cycleData.map((item, i) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <CycleBox
                label={item.label}
                icon={item.icon}
                color={item.color}
                active={activeCycleBox === item.id}
                onClick={() => setActiveCycleBox(activeCycleBox === item.id ? null : item.id)}
                description={item.description}
              />
              {i < cycleData.length - 1 && <CycleArrow direction="right" color={item.color} />}
            </div>
          ))}
          {/* Closing arrow back to Agente */}
          <CycleArrow direction="right" color={COLORS.highlight} />
          <div style={{
            fontSize: 11,
            color: COLORS.highlight,
            fontWeight: 700,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            LOOP
          </div>
        </div>

        <div style={{
          background: `${COLORS.accent}08`,
          border: `1px solid ${COLORS.accent}22`,
          borderRadius: 8,
          padding: "14px 18px",
          marginTop: 16,
        }}>
          <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
            <strong style={{ color: COLORS.accent }}>💡 L'intuizione chiave:</strong>{" "}
            Nessuno dice al cane <em>come</em> sedersi. Lui prova, riceve feedback, e migliora.
            Lo stesso vale per l'IA: non le diamo le regole, le diamo solo un <strong>obiettivo</strong> e
            un sistema di <strong>ricompense</strong>.
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          SEZIONE 2: AlphaGo
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="AlphaGo — La Macchina che ha Battuto 3000 Anni di Strategia" accent={COLORS.accent2}>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
          <strong style={{ color: COLORS.accent2 }}>Marzo 2016, Seoul.</strong>{" "}
          Lee Sedol, il piu grande giocatore di Go al mondo, si siede davanti a una macchina di Google DeepMind.
          Il Go ha piu configurazioni possibili degli atomi nell'universo. Gli esperti dicevano:
          <em> "Ci vorranno almeno 10 anni prima che un'IA batta un campione di Go."</em>
        </p>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          AlphaGo vinse <strong>4 a 1</strong>. Ma la cosa che sconvolse il mondo non fu la vittoria &mdash;
          fu la <strong style={{ color: COLORS.highlight }}>Mossa 37</strong>: una mossa talmente creativa e
          controintuitiva che nessun umano in 3000 anni di storia del Go l'aveva mai giocata.
          I commentatori rimasero in silenzio. Lee Sedol si alzo dal tavolo per 15 minuti.
        </p>

        {/* Human vs AlphaZero comparison */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <StatCard
            icon="🧑‍🎓"
            label="Giocatore Umano"
            value="10+ anni"
            subtext="Studio costante, maestri, migliaia di partite analizzate"
            color={COLORS.muted}
          />
          <StatCard
            icon="⚡"
            label="AlphaZero"
            value="40 ore"
            subtext="Da zero conoscenza a miglior giocatore di Go della storia"
            color={COLORS.accent2}
          />
          <StatCard
            icon="🎯"
            label="Mossa 37"
            value="P(umano) < 1/10.000"
            subtext="Probabilita che un professionista la giocasse. L'IA l'ha trovata da sola."
            color={COLORS.highlight}
          />
        </div>

        {/* Timeline */}
        <div style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 10,
          padding: "20px 16px",
        }}>
          <div style={{
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.muted,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 16,
            textAlign: "center",
          }}>
            Evoluzione &mdash; clicca per dettagli
          </div>

          {/* Timeline line */}
          <div style={{ position: "relative", marginBottom: 8 }}>
            <div style={{
              position: "absolute",
              top: 8,
              left: "10%",
              right: "10%",
              height: 2,
              background: COLORS.border,
              zIndex: 0,
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", position: "relative", zIndex: 1 }}>
            {timelineData.map((item, i) => (
              <TimelineNode
                key={i}
                year={item.year}
                title={item.title}
                detail={item.detail}
                color={item.color}
                active={activeTimeline === i}
                onClick={() => setActiveTimeline(i)}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          SEZIONE 3: RLHF
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="RLHF — Rendere gli LLM Educati" accent={COLORS.accent3}>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
          GPT-3 era potentissimo, ma aveva un problema: rispondeva in modo imprevedibile,
          a volte offensivo, spesso inutile. Come trasformarlo nel ChatGPT che conosciamo?
        </p>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          La risposta e <strong style={{ color: COLORS.accent3 }}>RLHF</strong> (Reinforcement Learning from
          Human Feedback): esseri umani valutano le risposte, e il modello impara quali piacciono di piu.
          E come insegnare le buone maniere a un genio un po' maleducato.
        </p>

        {/* Before/After toggle */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <div
            onClick={() => setShowAfterRLHF(false)}
            style={{
              padding: "10px 24px",
              cursor: "pointer",
              borderRadius: "8px 0 0 8px",
              fontSize: 13,
              fontWeight: 700,
              background: !showAfterRLHF ? `${COLORS.accent2}22` : COLORS.bg,
              color: !showAfterRLHF ? COLORS.accent2 : COLORS.muted,
              border: `1px solid ${!showAfterRLHF ? COLORS.accent2 : COLORS.border}`,
              transition: "all 0.3s ease",
            }}
          >
            Prima (GPT-3 base)
          </div>
          <div
            onClick={() => setShowAfterRLHF(true)}
            style={{
              padding: "10px 24px",
              cursor: "pointer",
              borderRadius: "0 8px 8px 0",
              fontSize: 13,
              fontWeight: 700,
              background: showAfterRLHF ? `${COLORS.accent4}22` : COLORS.bg,
              color: showAfterRLHF ? COLORS.accent4 : COLORS.muted,
              border: `1px solid ${showAfterRLHF ? COLORS.accent4 : COLORS.border}`,
              borderLeft: "none",
              transition: "all 0.3s ease",
            }}
          >
            Dopo (RLHF)
          </div>
        </div>

        {/* Comparison card */}
        <div style={{
          background: COLORS.bg,
          border: `1px solid ${showAfterRLHF ? COLORS.accent4 : COLORS.accent2}44`,
          borderRadius: 10,
          padding: "20px",
          transition: "all 0.4s ease",
          marginBottom: 20,
        }}>
          <div style={{
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: showAfterRLHF ? COLORS.accent4 : COLORS.accent2,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 12,
          }}>
            {showAfterRLHF ? "✅ Dopo RLHF — ChatGPT" : "⚠️ Prima di RLHF — GPT-3 base"}
          </div>

          <div style={{
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: COLORS.muted,
            marginBottom: 8,
          }}>
            Prompt: "Spiegami la fotosintesi"
          </div>

          <div style={{
            background: `${COLORS.card}`,
            borderRadius: 8,
            padding: "14px 18px",
            fontSize: 13,
            color: COLORS.text,
            lineHeight: 1.7,
            borderLeft: `3px solid ${showAfterRLHF ? COLORS.accent4 : COLORS.accent2}`,
          }}>
            {!showAfterRLHF ? (
              <div>
                <p>La fotosintesi. La fotosintesi clorofilliana. Clorofilla. Verde.
                Le piante sono verdi perche hanno la clorofilla che serve per la fotosintesi
                che e un processo chimico dove la CO2 e l'acqua e la luce solare producono
                glucosio e ossigeno. La formula e 6CO2 + 6H2O + luce...</p>
                <p style={{ color: COLORS.muted, fontStyle: "italic", marginTop: 8, fontSize: 11 }}>
                  Risposta dispersiva, senza struttura, stile "completamento di testo"
                </p>
              </div>
            ) : (
              <div>
                <p><strong>La fotosintesi</strong> e il processo con cui le piante trasformano luce solare,
                acqua e CO2 in energia (glucosio) e ossigeno.</p>
                <p style={{ marginTop: 8 }}><strong>In 3 punti semplici:</strong></p>
                <p>1. La pianta assorbe luce con la <strong>clorofilla</strong> (per questo e verde)</p>
                <p>2. Usa la luce per spezzare molecole d'acqua e CO2</p>
                <p>3. Produce <strong>glucosio</strong> (cibo per la pianta) e <strong>ossigeno</strong> (cibo per noi!)</p>
                <p style={{ color: COLORS.muted, fontStyle: "italic", marginTop: 8, fontSize: 11 }}>
                  Risposta strutturata, chiara, orientata all'utente
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pipeline visualization */}
        <div style={{
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          color: COLORS.muted,
          textTransform: "uppercase",
          letterSpacing: 2,
          marginBottom: 12,
          textAlign: "center",
        }}>
          La pipeline di addestramento &mdash; clicca ogni fase
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <PipelineStep
            label="Pre-training"
            icon="📚"
            color={COLORS.accent}
            active={activePipeline === "pre"}
            description="Il modello legge internet. Impara la lingua, i fatti, i pattern. Ma non sa essere utile."
          />
          <div
            onClick={() => setActivePipeline(activePipeline === "pre" ? null : "pre")}
            style={{ cursor: "pointer", color: COLORS.accent, fontSize: 18 }}
          >
            →
          </div>

          <PipelineStep
            label="SFT"
            icon="🎓"
            color={COLORS.accent3}
            active={activePipeline === "sft"}
            description="Supervised Fine-Tuning: umani scrivono risposte 'perfette' come esempio. Il modello impara il formato."
          />
          <div
            onClick={() => setActivePipeline(activePipeline === "sft" ? null : "sft")}
            style={{ cursor: "pointer", color: COLORS.accent3, fontSize: 18 }}
          >
            →
          </div>

          <PipelineStep
            label="RLHF"
            icon="👍"
            color={COLORS.accent4}
            active={activePipeline === "rlhf"}
            description="Umani votano le risposte. Un 'reward model' impara i gusti umani. Il LLM si ottimizza per piacere di piu."
          />
        </div>

        {/* Make pipeline steps clickable */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          marginTop: 8,
        }}>
          {[
            { key: "pre", label: "1" },
            { key: "sft", label: "2" },
            { key: "rlhf", label: "3" },
          ].map((step) => (
            <div
              key={step.key}
              onClick={() => setActivePipeline(activePipeline === step.key ? null : step.key)}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: activePipeline === step.key ? COLORS.accent3 : COLORS.border,
                color: activePipeline === step.key ? COLORS.bg : COLORS.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {step.label}
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          SEZIONE 4: RLVR
      ══════════════════════════════════════════════════════════════════ */}
      <Section title="RLVR — Verificatori Automatici" accent={COLORS.accent4}>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 8 }}>
          RLHF funziona, ma ha un limite: gli umani sono <strong>lenti</strong>,{" "}
          <strong>costosi</strong> e <strong>soggettivi</strong>. Se chiedi a 10 persone di valutare una risposta,
          ottieni 10 opinioni diverse.
        </p>
        <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
          <strong style={{ color: COLORS.accent4 }}>RLVR</strong> (Reinforcement Learning with Verifiable Rewards)
          risolve questo con <strong>verificatori automatici</strong>: la risposta e giusta o sbagliata, punto.
          Un esercizio di matematica ha una sola risposta corretta. Un programma funziona o non funziona.
          Questo approccio e usato per addestrare i modelli di <em>reasoning</em> come DeepSeek-R1 e o3.
        </p>

        {/* Toggle RLHF vs RLVR */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 20,
        }}>
          <div
            onClick={() => setShowRLVR(false)}
            style={{
              padding: "10px 24px",
              cursor: "pointer",
              borderRadius: "8px 0 0 8px",
              fontSize: 13,
              fontWeight: 700,
              background: !showRLVR ? `${COLORS.accent3}22` : COLORS.bg,
              color: !showRLVR ? COLORS.accent3 : COLORS.muted,
              border: `1px solid ${!showRLVR ? COLORS.accent3 : COLORS.border}`,
              transition: "all 0.3s ease",
            }}
          >
            RLHF
          </div>
          <div
            onClick={() => setShowRLVR(true)}
            style={{
              padding: "10px 24px",
              cursor: "pointer",
              borderRadius: "0 8px 8px 0",
              fontSize: 13,
              fontWeight: 700,
              background: showRLVR ? `${COLORS.accent4}22` : COLORS.bg,
              color: showRLVR ? COLORS.accent4 : COLORS.muted,
              border: `1px solid ${showRLVR ? COLORS.accent4 : COLORS.border}`,
              borderLeft: "none",
              transition: "all 0.3s ease",
            }}
          >
            RLVR
          </div>
        </div>

        {/* Comparison cards */}
        <div style={{
          display: "flex",
          gap: 16,
          marginBottom: 16,
          flexWrap: "wrap",
        }}>
          <div style={{
            flex: 1,
            minWidth: 200,
            background: COLORS.bg,
            border: `1px solid ${!showRLVR ? COLORS.accent3 : COLORS.border}`,
            borderRadius: 10,
            padding: "18px",
            opacity: !showRLVR ? 1 : 0.5,
            transition: "all 0.4s ease",
            boxShadow: !showRLVR ? `0 0 16px ${COLORS.accent3}22` : "none",
          }}>
            <div style={{ fontSize: 22, textAlign: "center", marginBottom: 8 }}>{"👥"}</div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.accent3,
              textAlign: "center",
              marginBottom: 12,
            }}>
              RLHF &mdash; Giudici Umani
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "💰", text: "Costoso: serve pagare valutatori" },
                { icon: "⏳", text: "Lento: gli umani hanno i loro tempi" },
                { icon: "🎭", text: "Soggettivo: opinioni diverse" },
                { icon: "✅", text: "Ottimo per: tono, stile, sicurezza" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: COLORS.text, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            flex: 1,
            minWidth: 200,
            background: COLORS.bg,
            border: `1px solid ${showRLVR ? COLORS.accent4 : COLORS.border}`,
            borderRadius: 10,
            padding: "18px",
            opacity: showRLVR ? 1 : 0.5,
            transition: "all 0.4s ease",
            boxShadow: showRLVR ? `0 0 16px ${COLORS.accent4}22` : "none",
          }}>
            <div style={{ fontSize: 22, textAlign: "center", marginBottom: 8 }}>{"⚙️"}</div>
            <div style={{
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.accent4,
              textAlign: "center",
              marginBottom: 12,
            }}>
              RLVR &mdash; Verificatori Automatici
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "💸", text: "Economico: nessun costo umano" },
                { icon: "⚡", text: "Veloce: feedback in millisecondi" },
                { icon: "🎯", text: "Oggettivo: giusto o sbagliato" },
                { icon: "✅", text: "Ottimo per: matematica, codice, logica" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: COLORS.text, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          background: `${COLORS.accent4}08`,
          border: `1px solid ${COLORS.accent4}22`,
          borderRadius: 8,
          padding: "14px 18px",
        }}>
          <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
            <strong style={{ color: COLORS.accent4 }}>💡 Esempio concreto:</strong>{" "}
            Il modello prova a risolvere "Quanto fa 847 × 293?" &mdash; se la risposta e 248.171, il verificatore
            automatico da ricompensa +1. Se sbaglia, -1. Nessun umano necessario, feedback istantaneo,
            migliaia di problemi al secondo.
          </div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════
          DEEP DIVE: Rabbit Hole
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
      }}>
        <div
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            padding: "18px 24px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: `3px solid ${COLORS.highlight}`,
            transition: "all 0.3s ease",
            background: rabbitHoleOpen ? `${COLORS.highlight}08` : "transparent",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>{"🐇"}</span>
            <div>
              <h2 style={{
                color: COLORS.highlight,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                margin: 0,
              }}>
                Rabbit Hole &mdash; Per chi vuole andare oltre
              </h2>
              <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>
                Reward hacking, Constitutional AI, allineamento e multi-agent
              </div>
            </div>
          </div>
          <div style={{
            fontSize: 18,
            color: COLORS.highlight,
            transition: "transform 0.3s ease",
            transform: rabbitHoleOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>
            {"▼"}
          </div>
        </div>

        {rabbitHoleOpen && (
          <div style={{ padding: "0 24px 24px", borderLeft: `3px solid ${COLORS.highlight}` }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
              marginTop: 16,
            }}>
              {rabbitHoles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveRabbit(activeRabbit === item.id ? null : item.id)}
                  style={{
                    background: activeRabbit === item.id ? `${item.color}12` : COLORS.bg,
                    border: `1px solid ${activeRabbit === item.id ? item.color : COLORS.border}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: activeRabbit === item.id ? `0 0 14px ${item.color}22` : "none",
                  }}
                >
                  <div style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: activeRabbit === item.id ? item.color : COLORS.text,
                    marginBottom: activeRabbit === item.id ? 10 : 0,
                    transition: "all 0.3s ease",
                  }}>
                    {item.title}
                  </div>
                  {activeRabbit === item.id && (
                    <div style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      lineHeight: 1.6,
                    }}>
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              background: `${COLORS.highlight}08`,
              border: `1px solid ${COLORS.highlight}22`,
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 16,
            }}>
              <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6 }}>
                <strong style={{ color: COLORS.highlight }}>{"🤔"} Domanda per voi:</strong>{" "}
                Se un'IA puo imparare a giocare a Go meglio di qualsiasi umano in 40 ore,
                cosa succedera quando applicheremo le stesse tecniche alla scoperta di farmaci,
                alla ricerca scientifica o alla progettazione di nuovi materiali?
                Il reinforcement learning non e solo un modo per vincere ai giochi &mdash;
                e un modo per <em>esplorare lo spazio delle possibilita</em> che nessun umano
                potrebbe esplorare in una vita intera.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{
        textAlign: "center",
        padding: "16px 0",
        borderTop: `1px solid ${COLORS.border}`,
        marginTop: 16,
      }}>
        <div style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.6 }}>
          <Tag color={COLORS.accent}>RL</Tag>
          <Tag color={COLORS.accent2}>AlphaGo</Tag>
          <Tag color={COLORS.accent3}>RLHF</Tag>
          <Tag color={COLORS.accent4}>RLVR</Tag>
          <span style={{ marginLeft: 8 }}>
            Sessione 1 &middot; Atto 6 &mdash; Imparare Giocando
          </span>
        </div>
      </div>
    </div>
  );
}
