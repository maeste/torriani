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

/* ── Spectrum step for the digital-to-physical progression ── */
const SpectrumStep = ({ icon, label, color, active, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: active ? `${color}18` : hover ? `${color}0c` : "#0a0e1a",
        border: `1px solid ${active ? color : hover ? `${color}66` : COLORS.border}`,
        borderRadius: 12,
        padding: "16px 12px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flex: 1,
        minWidth: 80,
        boxShadow: active ? `0 0 20px ${color}22` : "none",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: active ? color : COLORS.muted, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
    </div>
  );
};

/* ── Robot card component ── */
const RobotCard = ({ robot, isActive, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: isActive ? `${robot.color}12` : hover ? `${robot.color}08` : "#0a0e1a",
        border: `1px solid ${isActive ? robot.color : hover ? `${robot.color}55` : COLORS.border}`,
        borderRadius: 14,
        padding: isActive ? "20px" : "16px",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: isActive ? `0 4px 24px ${robot.color}20` : hover ? `0 2px 12px ${robot.color}10` : "none",
        transform: hover && !isActive ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isActive ? 12 : 0 }}>
        <div style={{ fontSize: 32, filter: isActive ? "none" : "grayscale(0.3)" }}>{robot.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: isActive ? robot.color : COLORS.text }}>{robot.name}</div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>{robot.maker}</div>
        </div>
        <div style={{ fontSize: 11, color: robot.color, fontFamily: "'JetBrains Mono', monospace", opacity: isActive ? 1 : 0.5 }}>
          {isActive ? "▼" : "▶"}
        </div>
      </div>
      {isActive && (
        <div style={{ animation: "fadeSlide 0.3s ease" }}>
          <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, marginBottom: 12, marginTop: 8 }}>
            {robot.desc}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {robot.tags.map((tag, i) => (
              <Tag key={i} color={robot.color}>{tag}</Tag>
            ))}
          </div>
          {robot.special && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: `${robot.color}0a`, borderRadius: 8, border: `1px solid ${robot.color}22` }}>
              <div style={{ fontSize: 12, color: robot.color, fontWeight: 600, marginBottom: 4 }}>Cosa lo rende speciale</div>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{robot.special}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Data ── */

const SPECTRUM = [
  { icon: "📝", label: "Testo", color: COLORS.accent },
  { icon: "🖼️", label: "Immagini", color: COLORS.accent3 },
  { icon: "💻", label: "Codice", color: COLORS.accent4 },
  { icon: "🎬", label: "Video", color: COLORS.highlight },
  { icon: "🤖", label: "Robot", color: COLORS.accent2 },
  { icon: "🌍", label: "Mondo", color: COLORS.accent2 },
];

const WORLD_MODEL_STEPS = [
  { icon: "👁️", title: "Osserva", desc: "L'IA guarda milioni di video del mondo reale", color: COLORS.accent },
  { icon: "🧠", title: "Impara", desc: "Capisce le regole: gravita, collisioni, attrito", color: COLORS.accent3 },
  { icon: "🎮", title: "Simula", desc: "Prova milioni di azioni in un mondo virtuale", color: COLORS.highlight },
  { icon: "🤖", title: "Agisce", desc: "Esegue nel mondo reale con sicurezza", color: COLORS.accent4 },
];

const ROBOTS = [
  {
    name: "Figure 02",
    maker: "Figure AI",
    color: COLORS.accent,
    icon: "🏭",
    desc: "Robot umanoide che lavora nelle fabbriche BMW. Cammina, manipola oggetti, segue istruzioni vocali. Usa un LLM (GPT-4V) per capire cosa vede e cosa gli viene chiesto.",
    tags: ["Umanoide", "Manifattura", "LLM integrato"],
    special: "Primo robot a combinare visione, linguaggio e manipolazione in un ambiente industriale reale.",
  },
  {
    name: "Atlas",
    maker: "Boston Dynamics",
    color: COLORS.accent2,
    icon: "🤸",
    desc: "Il robot piu agile del mondo. Capace di parkour, salti, equilibrio dinamico. Ora in versione completamente elettrica (non piu idraulica).",
    tags: ["Agilita estrema", "Elettrico", "Parkour"],
    special: "Esegue movimenti che la maggior parte degli umani non riesce a fare. La versione elettrica e piu silenziosa ed efficiente.",
  },
  {
    name: "Optimus",
    maker: "Tesla",
    color: COLORS.highlight,
    icon: "⚡",
    desc: "Robot umanoide general-purpose. Obiettivo: fare compiti domestici e lavoro in fabbrica. Tesla punta alla produzione di massa.",
    tags: ["General-purpose", "Produzione di massa", "Domestico"],
    special: "Tesla vuole produrlo come un'auto: milioni di unita, costo accessibile. Potrebbe democratizzare la robotica.",
  },
  {
    name: "Digit",
    maker: "Agility Robotics",
    color: COLORS.accent4,
    icon: "📦",
    desc: "Robot bipede progettato per la logistica. Gia in fase di test nei magazzini Amazon. Solleva scatole, naviga tra gli scaffali.",
    tags: ["Logistica", "Bipede", "Amazon"],
    special: "Progettato specificamente per funzionare in spazi costruiti per gli umani, senza modificare l'ambiente.",
  },
  {
    name: "1X NEO",
    maker: "1X Technologies",
    color: COLORS.accent3,
    icon: "🏠",
    desc: "Robot per la casa con design quasi umano e movimenti fluidi. Pensato per assistere nelle attivita domestiche quotidiane.",
    tags: ["Domestico", "Design umano", "Movimenti fluidi"],
    special: "Investito da OpenAI. Punta a essere il primo robot domestico che non fa paura alle persone.",
  },
];

const DOMAINS = [
  {
    id: "manifattura",
    icon: "🏭",
    title: "Manifattura",
    color: COLORS.accent,
    content: "Robot collaborativi (cobot) che lavorano fianco a fianco con gli umani, non piu in gabbie separate. Saldano, assemblano, controllano qualita — e si fermano se un umano si avvicina troppo.",
    stat: "500K+",
    statLabel: "cobot installati nel mondo",
  },
  {
    id: "logistica",
    icon: "📦",
    title: "Logistica",
    color: COLORS.accent2,
    content: "I magazzini Amazon hanno migliaia di robot che spostano merci. Droni per le consegne dell'ultimo miglio. Il pacco che ordini oggi potrebbe essere stato impacchettato da un robot.",
    stat: "750K",
    statLabel: "robot nei magazzini Amazon",
  },
  {
    id: "medicina",
    icon: "🏥",
    title: "Medicina",
    color: COLORS.accent4,
    content: "Il robot chirurgico Da Vinci opera con precisione sub-millimetrica, guidato dal chirurgo. Protesi intelligenti che imparano i movimenti del paziente. Esoscheletri per la riabilitazione.",
    stat: "10M+",
    statLabel: "interventi con Da Vinci",
  },
  {
    id: "agricoltura",
    icon: "🌾",
    title: "Agricoltura",
    color: COLORS.highlight,
    content: "Droni per monitoraggio colture con visione IA. Robot per raccolta frutta che riconoscono la maturazione. Trattori autonomi che arano di notte senza conducente.",
    stat: "24/7",
    statLabel: "lavoro continuo possibile",
  },
  {
    id: "spazio",
    icon: "🚀",
    title: "Spazio",
    color: COLORS.accent3,
    content: "I rover marziani hanno IA autonoma: la comunicazione con la Terra ha 20 minuti di ritardo, quindi devono decidere da soli come evitare ostacoli e dove scavare.",
    stat: "20 min",
    statLabel: "ritardo Terra-Marte",
  },
  {
    id: "domestico",
    icon: "🏠",
    title: "Domestico",
    color: COLORS.muted,
    content: "Oggi: aspirapolvere robot (semplici ma utili). Domani: assistenti domestici umanoidi che cucinano, puliscono, aiutano gli anziani. Il prossimo grande mercato della robotica.",
    stat: "2030",
    statLabel: "primi robot domestici umanoidi",
  },
];

const RABBIT_HOLE = [
  {
    title: "Sim-to-Real Transfer",
    icon: "🎮→🌍",
    color: COLORS.accent,
    content: "Il gap tra simulazione e realta e il problema piu grande della robotica. Le simulazioni non sono mai perfette: un robot addestrato solo in simulazione spesso fallisce nel mondo reale. La tecnica del domain randomization aggiunge rumore e variazioni casuali alla simulazione, cosi il robot impara a gestire l'imprevisto.",
  },
  {
    title: "Embodied AI vs Disembodied AI",
    icon: "🧠↔🤖",
    color: COLORS.accent3,
    content: "Perche avere un corpo cambia tutto. L'intelligenza emerge dall'interazione con l'ambiente (teoria dell'embodied cognition). Un'IA che manipola fisicamente oggetti 'capisce' la fisica in modo diverso da una che la legge nei libri. Un bambino che gioca con i blocchi sviluppa intuizioni che nessun libro puo dare.",
  },
  {
    title: "Foundation Models per la Robotica",
    icon: "🏗️",
    color: COLORS.accent2,
    content: "Come RT-2 (Google) e Octo — modelli pre-addestrati su dati robotici massivi. Sono il GPT della robotica: un unico modello che capisce istruzioni in linguaggio naturale e le traduce in azioni fisiche. 'Prendi la mela rossa dal tavolo' → sequenza precisa di movimenti del braccio.",
  },
  {
    title: "La Sfida dell'Hardware",
    icon: "⚙️",
    color: COLORS.highlight,
    content: "I chip per l'IA digitale (GPU) non bastano per i robot. Servono sensori tattili, attuatori precisi, batterie leggere e potenti, materiali resistenti ma flessibili. Il software e avanti di 10 anni rispetto all'hardware. Il collo di bottiglia non e l'intelligenza, ma il corpo.",
  },
  {
    title: "Le Leggi di Asimov nel 2026",
    icon: "📜",
    color: COLORS.accent4,
    content: "Le tre leggi della robotica di Asimov (1942): 1) Non nuocere agli umani, 2) Obbedire agli ordini, 3) Proteggere se stesso. Sembrano semplici, ma come le implementi in un robot reale? Come definisci 'nuocere'? Se un robot chirurgico taglia (per operare), sta nuocendo? La sicurezza nei robot autonomi e un problema aperto e cruciale.",
  },
];

const WORLD_MODEL_EXAMPLES = [
  { name: "NVIDIA Cosmos", desc: "World model per la robotica industriale", color: COLORS.accent4 },
  { name: "Google GENIE", desc: "Genera mondi interattivi 3D da video", color: COLORS.accent },
  { name: "Tesla FSD", desc: "World model per la guida autonoma", color: COLORS.highlight },
];

export default function App() {
  const [spectrumStep, setSpectrumStep] = useState(4);
  const [activeRobot, setActiveRobot] = useState(0);
  const [activeDomain, setActiveDomain] = useState("manifattura");
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [activeRabbit, setActiveRabbit] = useState(null);
  const [worldModelStep, setWorldModelStep] = useState(0);
  const [hoveredDomain, setHoveredDomain] = useState(null);

  const currentDomain = DOMAINS.find(d => d.id === activeDomain);

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
      {/* CSS Keyframes */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(255,107,53,0.15); }
          50% { box-shadow: 0 0 28px rgba(255,107,53,0.35); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 4000px; }
        }
        @keyframes pipelinePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent2, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 2 · Atto 9 · Physical AI
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Physical AI: Quando l'IA Tocca il Mondo Reale
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 650, margin: "0 auto" }}>
          Dai pixel agli atomi — l'intelligenza artificiale esce dallo schermo e impara ad agire
        </p>
      </div>

      {/* ───────── Section 1: Dai pixel agli atomi ───────── */}
      <Section title="Dai pixel agli atomi" accent={COLORS.accent2}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text, marginBottom: 20 }}>
          Finora l'IA ha lavorato con <Tag color={COLORS.accent}>TESTO</Tag> <Tag color={COLORS.accent3}>IMMAGINI</Tag> <Tag color={COLORS.accent4}>CODICE</Tag> — tutto digitale, tutto dentro uno schermo. Ma il prossimo grande salto e un'IA che non solo <em>pensa</em>, ma <strong style={{ color: COLORS.accent2 }}>AGISCE nel mondo reale</strong>.
        </p>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10, textAlign: "center" }}>
            LO SPETTRO: DAL DIGITALE AL FISICO
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {SPECTRUM.map((s, i) => (
              <SpectrumStep
                key={i}
                icon={s.icon}
                label={s.label}
                color={s.color}
                active={i <= spectrumStep}
                onClick={() => setSpectrumStep(i)}
              />
            ))}
          </div>
          {/* Progress bar underneath */}
          <div style={{ marginTop: 12, height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              width: `${((spectrumStep + 1) / SPECTRUM.length) * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }} />
          </div>
          <div style={{ textAlign: "center", marginTop: 10, fontSize: 13, color: spectrumStep >= 4 ? COLORS.accent2 : COLORS.muted, transition: "color 0.3s" }}>
            {spectrumStep < 3 && "IA Digitale — lavora con dati dentro il computer"}
            {spectrumStep === 3 && "IA Generativa — crea contenuti multimediali"}
            {spectrumStep === 4 && "Physical AI — robot, veicoli autonomi, droni"}
            {spectrumStep === 5 && "Il futuro — IA che interagisce con tutto il mondo fisico"}
          </div>
        </div>

        <div style={{ marginTop: 20, padding: "16px 20px", background: `${COLORS.accent2}0a`, borderRadius: 10, border: `1px solid ${COLORS.accent2}22`, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🚀</div>
          <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6, fontStyle: "italic" }}>
            "Il prossimo grande salto: l'IA che non solo pensa, ma <strong style={{ color: COLORS.accent2 }}>agisce</strong> nel mondo reale — robot, veicoli autonomi, droni, dispositivi medici."
          </div>
        </div>
      </Section>

      {/* ───────── Section 2: World Models ───────── */}
      <Section title="World Models — Come un robot capisce il mondo" accent={COLORS.accent3}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text, marginBottom: 16 }}>
          Un bambino impara la fisica <em>giocando</em>: lascia cadere oggetti, li lancia, li impila. I <strong style={{ color: COLORS.accent3 }}>World Models</strong> fanno la stessa cosa: simulano il mondo fisico per capire come funziona.
        </p>

        {/* Pipeline visualization */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {WORLD_MODEL_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  onClick={() => setWorldModelStep(i)}
                  style={{
                    background: worldModelStep === i ? `${step.color}18` : "#0a0e1a",
                    border: `1px solid ${worldModelStep === i ? step.color : COLORS.border}`,
                    borderRadius: 12,
                    padding: "14px 18px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    minWidth: 120,
                    boxShadow: worldModelStep === i ? `0 0 16px ${step.color}22` : "none",
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 4 }}>{step.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: worldModelStep === i ? step.color : COLORS.muted }}>{step.title}</div>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4, lineHeight: 1.4 }}>{step.desc}</div>
                </div>
                {i < WORLD_MODEL_STEPS.length - 1 && (
                  <div style={{
                    color: worldModelStep > i ? COLORS.accent4 : COLORS.muted,
                    fontSize: 20,
                    fontWeight: 700,
                    transition: "color 0.3s",
                    animation: worldModelStep === i ? "pipelinePulse 1.5s ease-in-out infinite" : "none",
                  }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Why it matters */}
        <div style={{ padding: "14px 18px", background: `${COLORS.accent3}0a`, borderRadius: 10, border: `1px solid ${COLORS.accent3}22`, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.accent3, marginBottom: 6 }}>Perche servono i World Models?</div>
          <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
            Un robot non puo provare 1 milione di volte a prendere un bicchiere nella realta — <strong>si romperebbe!</strong> Nel world model simula tutto virtualmente, poi agisce nel mondo reale con sicurezza.
          </div>
        </div>

        {/* Examples */}
        <div style={{ fontSize: 12, color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>ESEMPI CONCRETI</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {WORLD_MODEL_EXAMPLES.map((ex, i) => (
            <div key={i} style={{
              flex: 1,
              minWidth: 160,
              background: "#0a0e1a",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "12px 14px",
              borderTop: `2px solid ${ex.color}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ex.color, marginBottom: 4 }}>{ex.name}</div>
              <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.4 }}>{ex.desc}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────── Section 3: Robot intelligenti ───────── */}
      <Section title="Robot intelligenti — Lo stato dell'arte" accent={COLORS.accent}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text, marginBottom: 16 }}>
          Non e fantascienza: questi robot esistono <strong style={{ color: COLORS.accent }}>oggi</strong>. Clicca per scoprire cosa sanno fare.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ROBOTS.map((robot, i) => (
            <RobotCard
              key={i}
              robot={robot}
              isActive={activeRobot === i}
              onClick={() => setActiveRobot(activeRobot === i ? -1 : i)}
            />
          ))}
        </div>
      </Section>

      {/* ───────── Section 4: Dal magazzino alla sala operatoria ───────── */}
      <Section title="Dal magazzino alla sala operatoria" accent={COLORS.accent4}>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: COLORS.text, marginBottom: 16 }}>
          La Physical AI e gia al lavoro in settori molto diversi. Esplora i campi di applicazione.
        </p>

        {/* Domain tabs */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {DOMAINS.map(d => (
            <div
              key={d.id}
              onClick={() => setActiveDomain(d.id)}
              onMouseEnter={() => setHoveredDomain(d.id)}
              onMouseLeave={() => setHoveredDomain(null)}
              style={{
                background: activeDomain === d.id ? `${d.color}18` : hoveredDomain === d.id ? `${d.color}0c` : "#0a0e1a",
                border: `1px solid ${activeDomain === d.id ? d.color : COLORS.border}`,
                borderRadius: 8,
                padding: "8px 14px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>{d.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: activeDomain === d.id ? d.color : COLORS.muted }}>{d.title}</span>
            </div>
          ))}
        </div>

        {/* Active domain content */}
        {currentDomain && (
          <div key={currentDomain.id} style={{ animation: "fadeSlide 0.3s ease" }}>
            <div style={{
              background: "#0a0e1a",
              border: `1px solid ${currentDomain.color}33`,
              borderRadius: 12,
              padding: "20px 24px",
              borderLeft: `3px solid ${currentDomain.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: currentDomain.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 24 }}>{currentDomain.icon}</span>
                    {currentDomain.title}
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.7 }}>
                    {currentDomain.content}
                  </div>
                </div>
                <div style={{
                  textAlign: "center",
                  padding: "14px 18px",
                  background: `${currentDomain.color}0a`,
                  borderRadius: 10,
                  border: `1px solid ${currentDomain.color}22`,
                  minWidth: 100,
                }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: currentDomain.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {currentDomain.stat}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 4, lineHeight: 1.3 }}>
                    {currentDomain.statLabel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ───────── Section 5: Rabbit Hole ───────── */}
      <div
        onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
        style={{
          background: COLORS.card,
          border: `1px solid ${rabbitHoleOpen ? COLORS.accent3 : COLORS.border}`,
          borderRadius: 16,
          padding: "20px 28px",
          marginBottom: 32,
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderLeft: `3px solid ${COLORS.accent3}`,
          boxShadow: rabbitHoleOpen ? `0 0 20px ${COLORS.accent3}15` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>🐇</span>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent3, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>
                Tana del Bianconiglio
              </h2>
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
                Per chi vuole andare piu a fondo: sim-to-real, embodied cognition, le leggi di Asimov
              </div>
            </div>
          </div>
          <div style={{ fontSize: 18, color: COLORS.accent3, transition: "transform 0.3s", transform: rabbitHoleOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
            ▶
          </div>
        </div>

        {rabbitHoleOpen && (
          <div onClick={e => e.stopPropagation()} style={{ marginTop: 20, animation: "slideDown 0.4s ease" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RABBIT_HOLE.map((item, i) => (
                <div key={i}>
                  <div
                    onClick={() => setActiveRabbit(activeRabbit === i ? null : i)}
                    style={{
                      background: activeRabbit === i ? `${item.color}10` : "#0a0e1a",
                      border: `1px solid ${activeRabbit === i ? item.color : COLORS.border}`,
                      borderRadius: 10,
                      padding: "14px 18px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18, minWidth: 40, textAlign: "center" }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: activeRabbit === i ? item.color : COLORS.text }}>
                          {item.title}
                        </div>
                      </div>
                      <div style={{ fontSize: 14, color: item.color, transition: "transform 0.2s", transform: activeRabbit === i ? "rotate(90deg)" : "rotate(0deg)" }}>
                        ▶
                      </div>
                    </div>
                    {activeRabbit === i && (
                      <div style={{ marginTop: 12, paddingLeft: 50, animation: "fadeSlide 0.3s ease" }}>
                        <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.7 }}>
                          {item.content}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>
          Il futuro non e solo <Tag color={COLORS.accent}>digitale</Tag> — e <Tag color={COLORS.accent2}>fisico</Tag>
        </div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 8, fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>
          Physical AI · 2026
        </div>
      </div>
    </div>
  );
}
