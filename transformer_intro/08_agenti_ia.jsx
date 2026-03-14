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

/* ── Flow step block used in the chatbot vs agent diagrams ── */
const FlowStep = ({ label, color, icon, active, glow }) => (
  <div style={{
    background: active ? `${color}18` : "#0a0e1a",
    border: `1px solid ${active ? color : COLORS.border}`,
    borderRadius: 10,
    padding: "10px 16px",
    textAlign: "center",
    fontSize: 13,
    fontWeight: 600,
    color: active ? color : COLORS.muted,
    transition: "all 0.4s ease",
    boxShadow: glow ? `0 0 16px ${color}33` : "none",
    minWidth: 90,
  }}>
    <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
    {label}
  </div>
);

const Arrow = ({ color, animated }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    color: animated ? color : COLORS.muted,
    fontSize: 18,
    transition: "color 0.4s",
    animation: animated ? "arrowPulse 1.5s ease-in-out infinite" : "none",
  }}>
    →
  </div>
);

/* ── Animated counter ── */
const AnimatedStat = ({ value, suffix, label, color }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? `${color}12` : "#0a0e1a",
        border: `1px solid ${hover ? color : COLORS.border}`,
        borderRadius: 10,
        padding: "20px 16px",
        textAlign: "center",
        transition: "all 0.3s ease",
        cursor: "default",
        flex: 1,
      }}
    >
      <div style={{
        fontSize: 36,
        fontWeight: 800,
        color: color,
        fontFamily: "'JetBrains Mono', monospace",
        transition: "transform 0.3s",
        transform: hover ? "scale(1.1)" : "scale(1)",
      }}>
        {value}{suffix}
      </div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 6, lineHeight: 1.4 }}>
        {label}
      </div>
    </div>
  );
};

/* ── Data ── */
const CODE_AGENTS = [
  {
    name: "Claude Code",
    maker: "Anthropic",
    color: COLORS.accent,
    icon: "🤖",
    desc: "Agente CLI che legge il codice, lo modifica, esegue test, committa. Come avere un programmatore junior instancabile che lavora 24/7.",
    tags: ["CLI", "Autonomo", "Multi-file"],
  },
  {
    name: "GitHub Copilot",
    maker: "GitHub / OpenAI",
    color: COLORS.accent4,
    icon: "✈️",
    desc: "Completamento in tempo reale nell'editor. Come un suggeritore intelligente che anticipa quello che vuoi scrivere.",
    tags: ["Editor", "Real-time", "Suggerimenti"],
  },
  {
    name: "Cursor / Windsurf",
    maker: "Anysphere / Codeium",
    color: COLORS.accent3,
    icon: "🏄",
    desc: "IDE con IA integrata: l'agente capisce l'intero progetto, naviga tra i file, propone refactoring completi.",
    tags: ["IDE", "Contesto globale", "Refactoring"],
  },
];

const PERSONAL_AGENTS = [
  {
    name: "Claude",
    maker: "Anthropic",
    color: COLORS.accent,
    icon: "🧠",
    desc: "Ragionamento complesso, analisi documenti, scrittura. Eccelle nel pensiero strutturato e nell'analisi critica.",
    strength: "Ragionamento profondo",
  },
  {
    name: "ChatGPT",
    maker: "OpenAI",
    color: COLORS.accent4,
    icon: "💬",
    desc: "Il piu diffuso al mondo. Multimodale: testo, immagini, voce. Enorme ecosistema di plugin e integrazioni.",
    strength: "Versatilita multimodale",
  },
  {
    name: "Gemini",
    maker: "Google",
    color: COLORS.accent2,
    icon: "🌐",
    desc: "Integrato con Google Workspace, ricerca web in tempo reale. Perfetto per chi usa l'ecosistema Google.",
    strength: "Integrazione Google",
  },
];

export default function App() {
  const [agentView, setAgentView] = useState("agente"); // "chatbot" | "agente"
  const [activeCodeCard, setActiveCodeCard] = useState(null);
  const [activePersonalCard, setActivePersonalCard] = useState(null);
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [devView, setDevView] = useState("dopo"); // "prima" | "dopo"

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
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.5; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(3px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(0,212,255,0.1); }
          50% { box-shadow: 0 0 24px rgba(0,212,255,0.3); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 2000px; }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 2 · Atto 6 · Agenti
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Agenti IA: quando l'intelligenza artificiale agisce
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 650, margin: "0 auto" }}>
          Da chatbot che rispondono a domande ad agenti che pianificano, ragionano e agiscono
        </p>
      </div>

      {/* ───────── Section 1: Cosa sono gli agenti IA? ───────── */}
      <Section title="Cosa sono gli agenti IA?" accent={COLORS.accent}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Un agente IA non e solo un chatbot che risponde a domande. E un sistema che puo{" "}
          <strong style={{ color: COLORS.accent }}>pianificare</strong>,{" "}
          <strong style={{ color: COLORS.accent2 }}>usare strumenti</strong> e{" "}
          <strong style={{ color: COLORS.accent3 }}>eseguire azioni</strong>{" "}
          autonomamente per raggiungere un obiettivo.
        </p>

        {/* Toggle tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20 }}>
          {[
            { key: "chatbot", label: "Chatbot tradizionale", color: COLORS.muted },
            { key: "agente", label: "Agente IA", color: COLORS.accent },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setAgentView(tab.key)}
              style={{
                flex: 1,
                padding: "12px 16px",
                background: agentView === tab.key ? `${tab.key === "agente" ? COLORS.accent : COLORS.muted}18` : "transparent",
                border: `1px solid ${agentView === tab.key ? (tab.key === "agente" ? COLORS.accent : COLORS.muted) : COLORS.border}`,
                borderRadius: tab.key === "chatbot" ? "8px 0 0 8px" : "0 8px 8px 0",
                color: agentView === tab.key ? (tab.key === "agente" ? COLORS.accent : COLORS.text) : COLORS.muted,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif",
                transition: "all 0.3s",
              }}
            >
              {tab.key === "chatbot" ? "💬 " : "🤖 "}{tab.label}
            </button>
          ))}
        </div>

        {/* Chatbot flow */}
        {agentView === "chatbot" && (
          <div style={{
            background: "#0a0e1a",
            borderRadius: 10,
            padding: "24px 20px",
            border: `1px solid ${COLORS.border}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <FlowStep label="Domanda" color={COLORS.muted} icon="❓" active glow={false} />
              <Arrow color={COLORS.muted} animated={false} />
              <FlowStep label="Risposta" color={COLORS.muted} icon="💬" active glow={false} />
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, textAlign: "center", marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>
              Un solo passaggio: domanda → risposta. Nessuna pianificazione, nessuno strumento.
            </p>
          </div>
        )}

        {/* Agent flow */}
        {agentView === "agente" && (
          <div style={{
            background: "#0a0e1a",
            borderRadius: 10,
            padding: "24px 16px",
            border: `1px solid ${COLORS.accent}33`,
            animation: "glowPulse 3s ease-in-out infinite",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
              <FlowStep label="Obiettivo" color={COLORS.accent} icon="🎯" active glow />
              <Arrow color={COLORS.accent} animated />
              <FlowStep label="Pianifica" color={COLORS.accent2} icon="📋" active glow />
              <Arrow color={COLORS.accent2} animated />
              <FlowStep label="Strumenti" color={COLORS.accent3} icon="🔧" active glow />
              <Arrow color={COLORS.accent3} animated />
              <FlowStep label="Esegue" color={COLORS.accent4} icon="⚡" active glow />
              <Arrow color={COLORS.accent4} animated />
              <FlowStep label="Verifica" color={COLORS.highlight} icon="✅" active glow />
              <Arrow color={COLORS.highlight} animated />
              <FlowStep label="Risultato" color={COLORS.accent} icon="🏆" active glow />
            </div>
            <p style={{ color: COLORS.accent, fontSize: 13, textAlign: "center", marginTop: 16, marginBottom: 0, fontStyle: "italic" }}>
              Ciclo autonomo: l'agente decide come procedere, usa strumenti, verifica il risultato e corregge gli errori.
            </p>
          </div>
        )}
      </Section>

      {/* ───────── Section 2: Agenti per scrivere codice ───────── */}
      <Section title="Agenti per scrivere codice" accent={COLORS.accent2}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Il modo in cui si scrive software sta cambiando radicalmente. Gli agenti IA non sostituiscono il programmatore —{" "}
          <strong style={{ color: COLORS.highlight }}>lo trasformano in un direttore d'orchestra</strong>.
        </p>

        {/* Code agent cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 20 }}>
          {CODE_AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              onClick={() => setActiveCodeCard(activeCodeCard === i ? null : i)}
              style={{
                background: activeCodeCard === i ? `${agent.color}10` : "#0a0e1a",
                border: `1px solid ${activeCodeCard === i ? agent.color : COLORS.border}`,
                borderRadius: 10,
                padding: 16,
                cursor: "pointer",
                transition: "all 0.3s ease",
                borderTop: `3px solid ${agent.color}`,
                transform: activeCodeCard === i ? "translateY(-2px)" : "none",
                boxShadow: activeCodeCard === i ? `0 4px 20px ${agent.color}22` : "none",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{agent.icon}</div>
              <h3 style={{ color: agent.color, fontSize: 15, fontWeight: 700, marginBottom: 2 }}>
                {agent.name}
              </h3>
              <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 10 }}>{agent.maker}</div>
              <p style={{
                color: COLORS.muted,
                fontSize: 12,
                lineHeight: 1.6,
                marginBottom: 10,
                maxHeight: activeCodeCard === i ? 200 : 40,
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                {agent.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {agent.tags.map(tag => (
                  <Tag key={tag} color={agent.color}>{tag}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Before / After toggle */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", gap: 0, marginBottom: 14 }}>
            {[
              { key: "prima", label: "Prima degli agenti", icon: "😰" },
              { key: "dopo", label: "Con gli agenti", icon: "🚀" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setDevView(tab.key)}
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: devView === tab.key
                    ? (tab.key === "dopo" ? `${COLORS.accent4}18` : `${COLORS.accent2}18`)
                    : "transparent",
                  border: `1px solid ${devView === tab.key
                    ? (tab.key === "dopo" ? COLORS.accent4 : COLORS.accent2)
                    : COLORS.border}`,
                  borderRadius: tab.key === "prima" ? "8px 0 0 8px" : "0 8px 8px 0",
                  color: devView === tab.key
                    ? (tab.key === "dopo" ? COLORS.accent4 : COLORS.accent2)
                    : COLORS.muted,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  transition: "all 0.3s",
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {devView === "prima" && (
            <div style={{
              background: "#0a0e1a",
              borderRadius: 10,
              padding: 16,
              border: `1px solid ${COLORS.accent2}33`,
            }}>
              {[
                { task: "Cercare documentazione", time: "30 min", icon: "📚" },
                { task: "Scrivere boilerplate", time: "45 min", icon: "⌨️" },
                { task: "Debugging", time: "2 ore", icon: "🐛" },
                { task: "Scrivere test", time: "1 ora", icon: "🧪" },
                { task: "Code review mentale", time: "30 min", icon: "🔍" },
              ].map(item => (
                <div key={item.task} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ flex: 1, color: COLORS.muted, fontSize: 13 }}>{item.task}</span>
                  <span style={{ color: COLORS.accent2, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                    {item.time}
                  </span>
                </div>
              ))}
              <div style={{ color: COLORS.accent2, fontSize: 13, marginTop: 12, fontWeight: 600, textAlign: "right" }}>
                Totale: ~5 ore di lavoro manuale
              </div>
            </div>
          )}

          {devView === "dopo" && (
            <div style={{
              background: "#0a0e1a",
              borderRadius: 10,
              padding: 16,
              border: `1px solid ${COLORS.accent4}33`,
            }}>
              {[
                { task: "Descrivi l'obiettivo all'agente", time: "5 min", icon: "🎯" },
                { task: "L'agente scrive il codice", time: "10 min", icon: "🤖" },
                { task: "L'agente esegue i test", time: "3 min", icon: "✅" },
                { task: "Revisione e feedback", time: "20 min", icon: "👀" },
                { task: "Iterazione finale", time: "10 min", icon: "🔄" },
              ].map(item => (
                <div key={item.task} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: `1px solid ${COLORS.border}`,
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ flex: 1, color: COLORS.text, fontSize: 13 }}>{item.task}</span>
                  <span style={{ color: COLORS.accent4, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                    {item.time}
                  </span>
                </div>
              ))}
              <div style={{ color: COLORS.accent4, fontSize: 13, marginTop: 12, fontWeight: 600, textAlign: "right" }}>
                Totale: ~48 minuti — il programmatore guida, l'agente esegue
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ───────── Section 3: Assistenti personali IA ───────── */}
      <Section title="Assistenti personali IA — il coltellino svizzero digitale" accent={COLORS.accent3}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Traduzione, ricerca, scrittura, analisi, programmazione — un unico strumento per tutto.
          Questi assistenti stanno diventando il{" "}
          <strong style={{ color: COLORS.highlight }}>coltellino svizzero digitale</strong> di chiunque lavori con le informazioni.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {PERSONAL_AGENTS.map((agent, i) => (
            <div
              key={agent.name}
              onMouseEnter={() => setActivePersonalCard(i)}
              onMouseLeave={() => setActivePersonalCard(null)}
              style={{
                background: activePersonalCard === i ? `${agent.color}10` : "#0a0e1a",
                border: `1px solid ${activePersonalCard === i ? agent.color : COLORS.border}`,
                borderRadius: 10,
                padding: 20,
                transition: "all 0.3s ease",
                borderTop: `3px solid ${agent.color}`,
                transform: activePersonalCard === i ? "translateY(-3px)" : "none",
                boxShadow: activePersonalCard === i ? `0 8px 24px ${agent.color}22` : "none",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{agent.icon}</div>
              <h3 style={{ color: agent.color, fontSize: 16, fontWeight: 700, marginBottom: 2 }}>
                {agent.name}
              </h3>
              <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 12 }}>{agent.maker}</div>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                {agent.desc}
              </p>
              <div style={{
                background: `${agent.color}15`,
                border: `1px solid ${agent.color}33`,
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 12,
                color: agent.color,
                fontWeight: 600,
                textAlign: "center",
              }}>
                {agent.strength}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────── Section 3b: Sistemi agentici per il lavoro ───────── */}
      <Section title="Dall'assistente all'agente autonomo" accent={COLORS.highlight}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
          Il passo successivo: agenti che non aspettano le vostre domande, ma{" "}
          <strong style={{ color: COLORS.highlight }}>lavorano in autonomia</strong> su compiti complessi,
          coordinando strumenti, persone e decisioni.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          {/* Claude Work */}
          <div style={{
            background: "#0a0e1a",
            border: `1px solid ${COLORS.accent}44`,
            borderRadius: 10,
            padding: 20,
            borderTop: `3px solid ${COLORS.accent}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🏢</span>
              <div>
                <h3 style={{ color: COLORS.accent, fontSize: 16, fontWeight: 700, margin: 0 }}>Claude for Work</h3>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>Anthropic</div>
              </div>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
              Claude integrato nei processi aziendali. Non e solo un chatbot: accede ai documenti dell'azienda,
              conosce le procedure, risponde in base al contesto reale del team.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {["Analisi documenti", "Ricerca interna", "Automazione workflow", "Integrazione Slack/Email"].map(t => (
                <Tag key={t} color={COLORS.accent}>{t}</Tag>
              ))}
            </div>
            <div style={{
              background: `${COLORS.accent}10`, border: `1px solid ${COLORS.accent}33`,
              borderRadius: 6, padding: "8px 12px", fontSize: 12, color: COLORS.accent, lineHeight: 1.6,
            }}>
              Esempio: "Prepara il report trimestrale usando i dati del CRM e le slide del Q2" — l'agente
              accede ai sistemi, raccoglie i dati, genera il report.
            </div>
          </div>

          {/* OpenClaw */}
          <div style={{
            background: "#0a0e1a",
            border: `1px solid ${COLORS.accent2}44`,
            borderRadius: 10,
            padding: 20,
            borderTop: `3px solid ${COLORS.accent2}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🦞</span>
              <div>
                <h3 style={{ color: COLORS.accent2, fontSize: 16, fontWeight: 700, margin: 0 }}>OpenClaw</h3>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>Open Source</div>
              </div>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
              Framework open-source per costruire agenti IA personalizzati. Chiunque puo creare il proprio
              agente, collegarlo ai propri strumenti e farlo lavorare su compiti specifici.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {["Open Source", "Personalizzabile", "Self-hosted", "Community-driven"].map(t => (
                <Tag key={t} color={COLORS.accent2}>{t}</Tag>
              ))}
            </div>
            <div style={{
              background: `${COLORS.accent2}10`, border: `1px solid ${COLORS.accent2}33`,
              borderRadius: 6, padding: "8px 12px", fontSize: 12, color: COLORS.accent2, lineHeight: 1.6,
            }}>
              Come Linux per i sistemi operativi: trasparente, modificabile, controllato da te.
              Nessun vendor lock-in, i tuoi dati restano tuoi.
            </div>
          </div>
        </div>

        {/* Spectrum: chatbot → assistant → agent → autonomous */}
        <div style={{
          background: "#0a0e1a", borderRadius: 10, padding: 20,
          border: `1px solid ${COLORS.border}`,
        }}>
          <p style={{ color: COLORS.highlight, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            Lo spettro dell'autonomia IA:
          </p>
          <div style={{ position: "relative", height: 60, marginBottom: 8 }}>
            {/* Gradient bar */}
            <div style={{
              position: "absolute", top: 20, left: 0, right: 0, height: 12, borderRadius: 6,
              background: `linear-gradient(90deg, ${COLORS.muted}, ${COLORS.accent}, ${COLORS.accent2}, ${COLORS.accent3}, ${COLORS.highlight})`,
            }} />
            {/* Markers */}
            {[
              { label: "Chatbot", pos: "5%", sub: "ChatGPT base" },
              { label: "Assistente", pos: "30%", sub: "Claude, Gemini" },
              { label: "Copilota", pos: "52%", sub: "Copilot, Cursor" },
              { label: "Agente", pos: "75%", sub: "Claude Code" },
              { label: "Autonomo", pos: "95%", sub: "Claude Work" },
            ].map(m => (
              <div key={m.label} style={{
                position: "absolute", left: m.pos, transform: "translateX(-50%)",
                textAlign: "center", top: 0,
              }}>
                <div style={{ width: 2, height: 10, background: COLORS.text, margin: "0 auto 4px" }} />
                <div style={{ position: "absolute", top: 38, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
                  <div style={{ color: COLORS.text, fontSize: 10, fontWeight: 700 }}>{m.label}</div>
                  <div style={{ color: COLORS.muted, fontSize: 9 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 30 }} />
          <p style={{ color: COLORS.muted, fontSize: 12, textAlign: "center", marginTop: 8, fontStyle: "italic" }}>
            Ci stiamo muovendo rapidamente verso destra. Ogni mese gli agenti diventano piu capaci e autonomi.
          </p>
        </div>
      </Section>

      {/* ───────── Section 4: Come sta cambiando il software ───────── */}
      <Section title="Come sta cambiando il software" accent={COLORS.highlight}>
        <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
          <AnimatedStat value="70" suffix="%" label="del codice su GitHub nel 2025 ha assistenza IA" color={COLORS.accent} />
          <AnimatedStat value="2-3" suffix="x" label="produttivita di un developer con agenti IA" color={COLORS.accent4} />
        </div>

        <div style={{
          background: "#0a0e1a",
          borderRadius: 10,
          padding: 20,
          border: `1px solid ${COLORS.border}`,
          marginBottom: 16,
        }}>
          <p style={{ color: COLORS.highlight, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            Ma il codice non e tutto. Come cambia il tempo del programmatore:
          </p>

          {/* Time balance bars */}
          {[
            { label: "Scrivere codice", before: 60, after: 20, color: COLORS.accent },
            { label: "Pensare e progettare", before: 15, after: 35, color: COLORS.accent3 },
            { label: "Revisionare e testare", before: 15, after: 30, color: COLORS.accent2 },
            { label: "Comunicare e documentare", before: 10, after: 15, color: COLORS.accent4 },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: COLORS.text, fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                <span style={{ color: COLORS.muted, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
                  {item.before}% → {item.after}%
                </span>
              </div>
              {/* Before bar */}
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: COLORS.muted, fontSize: 10, width: 42, textAlign: "right" }}>Prima</span>
                <div style={{ flex: 1, background: `${COLORS.border}`, borderRadius: 4, height: 10 }}>
                  <div style={{
                    width: `${item.before}%`,
                    background: `${item.color}66`,
                    borderRadius: 4,
                    height: 10,
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
              {/* After bar */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: COLORS.muted, fontSize: 10, width: 42, textAlign: "right" }}>Dopo</span>
                <div style={{ flex: 1, background: `${COLORS.border}`, borderRadius: 4, height: 10 }}>
                  <div style={{
                    width: `${item.after}%`,
                    background: item.color,
                    borderRadius: 4,
                    height: 10,
                    transition: "width 0.8s ease",
                  }} />
                </div>
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 16,
            padding: "12px 16px",
            background: `${COLORS.highlight}10`,
            border: `1px solid ${COLORS.highlight}33`,
            borderRadius: 8,
          }}>
            <p style={{ color: COLORS.highlight, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
              <strong>Il messaggio chiave:</strong> l'IA automatizza la scrittura ripetitiva del codice.
              Il valore umano si sposta verso il <em>pensiero critico</em>, l'<em>architettura</em> e la <em>revisione</em>.
              Servono piu competenze, non meno.
            </p>
          </div>
        </div>
      </Section>

      {/* ───────── Section 5: Tana del bianconiglio ───────── */}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        marginBottom: 24,
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
            borderLeft: `3px solid ${COLORS.accent3}`,
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
              Tana del bianconiglio — Come funzionano gli agenti
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
          <div style={{ padding: "0 24px 24px", borderLeft: `3px solid ${COLORS.accent3}` }}>

            {/* Tool Use / Function Calling */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.accent}`,
            }}>
              <h4 style={{ color: COLORS.accent, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🔧 Tool Use / Function Calling
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                Gli agenti possono <strong style={{ color: COLORS.text }}>chiamare funzioni esterne</strong>:
                cercare nel web, leggere file, eseguire codice, interrogare database.
                Il modello non "fa" queste cose direttamente — genera una richiesta strutturata
                che il sistema esegue, poi riceve il risultato.
              </p>
              <div style={{
                background: "#000",
                borderRadius: 6,
                padding: "10px 14px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: COLORS.accent,
                lineHeight: 1.6,
              }}>
                LLM: "Ho bisogno di cercare 'meteo Milano'"<br />
                → Sistema esegue: search("meteo Milano")<br />
                → Risultato: "Milano: 18°C, soleggiato"<br />
                → LLM: "A Milano ci sono 18 gradi e c'e il sole."
              </div>
            </div>

            {/* ReAct Pattern */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.accent2}`,
            }}>
              <h4 style={{ color: COLORS.accent2, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🧠 ReAct — Reasoning + Acting
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                Il pattern piu usato per costruire agenti. L'LLM alterna fasi di{" "}
                <strong style={{ color: COLORS.accent2 }}>ragionamento</strong> (pensare cosa fare) e{" "}
                <strong style={{ color: COLORS.accent4 }}>azione</strong> (fare qualcosa), poi{" "}
                <strong style={{ color: COLORS.accent }}>osserva</strong> il risultato.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  { step: "Pensa", icon: "💭", color: COLORS.accent2, desc: "\"Devo trovare i dati di vendita\"" },
                  { step: "Agisci", icon: "⚡", color: COLORS.accent4, desc: "Esegue query al database" },
                  { step: "Osserva", icon: "👁️", color: COLORS.accent, desc: "Legge i risultati" },
                  { step: "Rifletti", icon: "🤔", color: COLORS.accent3, desc: "\"I dati sono incompleti...\"" },
                ].map((s, idx) => (
                  <div key={s.step} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}44`,
                      borderRadius: 8,
                      padding: "10px 14px",
                      textAlign: "center",
                      minWidth: 100,
                    }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                      <div style={{ color: s.color, fontSize: 12, fontWeight: 700 }}>{s.step}</div>
                      <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 4 }}>{s.desc}</div>
                    </div>
                    {idx < 3 && <span style={{ color: COLORS.muted, fontSize: 16 }}>→</span>}
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.muted, fontSize: 12, textAlign: "center", marginTop: 10, marginBottom: 0, fontStyle: "italic" }}>
                Il ciclo si ripete finche l'agente non raggiunge l'obiettivo (o decide che non puo).
              </p>
            </div>

            {/* MCP */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.accent3}`,
            }}>
              <h4 style={{ color: COLORS.accent3, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🔌 MCP — Model Context Protocol
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                Standard aperto (creato da Anthropic) per connettere agenti a strumenti esterni.
                Pensatelo come l'<strong style={{ color: COLORS.text }}>USB-C dell'intelligenza artificiale</strong>:
                un connettore universale per qualsiasi tool.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { tool: "File system", icon: "📁", desc: "Leggere e scrivere file" },
                  { tool: "Database", icon: "🗄️", desc: "Query SQL e NoSQL" },
                  { tool: "Web browser", icon: "🌐", desc: "Navigare il web" },
                  { tool: "GitHub", icon: "🐙", desc: "Gestire codice e PR" },
                  { tool: "Slack", icon: "💬", desc: "Inviare messaggi" },
                  { tool: "E molti altri...", icon: "♾️", desc: "Ecosistema in crescita" },
                ].map(t => (
                  <div key={t.tool} style={{
                    background: `${COLORS.accent3}08`,
                    border: `1px solid ${COLORS.accent3}22`,
                    borderRadius: 6,
                    padding: "8px 10px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 20 }}>{t.icon}</div>
                    <div style={{ color: COLORS.accent3, fontSize: 11, fontWeight: 600, marginTop: 4 }}>{t.tool}</div>
                    <div style={{ color: COLORS.muted, fontSize: 10 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agentic Loops */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              borderTop: `2px solid ${COLORS.accent4}`,
            }}>
              <h4 style={{ color: COLORS.accent4, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🔄 Agentic Loops — Il ciclo completo
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                Un agente completo combina tutto in un ciclo continuo. Ogni iterazione lo avvicina all'obiettivo:
              </p>
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: 0,
                flexWrap: "wrap",
              }}>
                {[
                  { step: "Plan", icon: "📋", color: COLORS.accent, desc: "Definisci i passi" },
                  { step: "Act", icon: "⚡", color: COLORS.accent2, desc: "Esegui un'azione" },
                  { step: "Observe", icon: "👁️", color: COLORS.accent3, desc: "Guarda il risultato" },
                  { step: "Reflect", icon: "🪞", color: COLORS.accent4, desc: "Valuta e adatta" },
                ].map((s, idx) => (
                  <div key={s.step} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                      background: `${s.color}12`,
                      border: `2px solid ${s.color}55`,
                      borderRadius: 12,
                      padding: "14px 18px",
                      textAlign: "center",
                      minWidth: 100,
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                      <div style={{ color: s.color, fontSize: 13, fontWeight: 700 }}>{s.step}</div>
                      <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 4 }}>{s.desc}</div>
                    </div>
                    <span style={{
                      color: COLORS.muted,
                      fontSize: 18,
                      margin: "0 6px",
                    }}>
                      {idx < 3 ? "→" : "↩"}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ color: COLORS.accent4, fontSize: 12, textAlign: "center", marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>
                Plan → Act → Observe → Reflect → Plan → ... fino al completamento.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8, paddingBottom: 32 }}>
        IIS AI — Introduzione all'Intelligenza Artificiale per le scuole superiori
      </div>
    </div>
  );
}
