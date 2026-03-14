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

/* ── Tool Card Component ── */
const ToolCard = ({ tool, isActive, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: isActive ? `${tool.color}12` : hover ? `${tool.color}08` : "#0a0e1a",
        border: `1px solid ${isActive ? tool.color : hover ? `${tool.color}55` : COLORS.border}`,
        borderRadius: 14,
        padding: isActive ? "20px" : "16px",
        cursor: "pointer",
        transition: "all 0.35s ease",
        boxShadow: isActive ? `0 4px 24px ${tool.color}20` : hover ? `0 2px 12px ${tool.color}10` : "none",
        transform: hover && !isActive ? "translateY(-2px)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: isActive ? 12 : 0 }}>
        <div style={{ fontSize: 28, filter: isActive ? "none" : "grayscale(0.3)" }}>{tool.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? tool.color : COLORS.text }}>{tool.name}</div>
          <div style={{ fontSize: 12, color: COLORS.muted }}>{tool.maker}</div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Tag color={tool.statusColor}>{tool.status}</Tag>
          <span style={{ fontSize: 11, color: tool.color, fontFamily: "'JetBrains Mono', monospace", opacity: isActive ? 1 : 0.5 }}>
            {isActive ? "▼" : "▶"}
          </span>
        </div>
      </div>
      {isActive && (
        <div style={{ marginTop: 8, paddingTop: 12, borderTop: `1px solid ${COLORS.border}` }}>
          <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.7, margin: "0 0 10px" }}>{tool.description}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {tool.features.map((f, i) => <Tag key={i} color={tool.color}>{f}</Tag>)}
          </div>
          {tool.pricing && (
            <div style={{ fontSize: 12, color: COLORS.muted, fontStyle: "italic" }}>
              {tool.pricing}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ── Application Area Card ── */
const AreaCard = ({ area, isActive, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: isActive ? `${area.color}15` : hover ? `${area.color}0a` : "#0a0e1a",
        border: `1px solid ${isActive ? area.color : hover ? `${area.color}44` : COLORS.border}`,
        borderRadius: 12,
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textAlign: "center",
        boxShadow: isActive ? `0 0 16px ${area.color}18` : "none",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{area.icon}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: isActive ? area.color : COLORS.text, marginBottom: 4 }}>{area.label}</div>
      {isActive && (
        <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6, marginTop: 8 }}>{area.description}</div>
      )}
    </div>
  );
};

/* ── Artifact Item ── */
const ArtifactItem = ({ artifact, isRevealed, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: isRevealed ? `${COLORS.highlight}12` : hover ? `${COLORS.accent}08` : "#0a0e1a",
        border: `1px solid ${isRevealed ? COLORS.highlight : hover ? `${COLORS.accent}44` : COLORS.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 22 }}>{isRevealed ? artifact.icon : "🔍"}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isRevealed ? COLORS.highlight : COLORS.text }}>
            {isRevealed ? artifact.title : "Clicca per scoprire..."}
          </div>
          {isRevealed && (
            <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6, marginTop: 4 }}>{artifact.description}</div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Data ── */
const TOOLS = [
  {
    name: "Sora", maker: "OpenAI", icon: "🌀",
    color: COLORS.accent, status: "Chiuso", statusColor: COLORS.accent2,
    description: "Il modello di punta di OpenAI per la generazione video. Capace di creare video fino a 1 minuto con qualita fotorealistica e comprensione avanzata della fisica.",
    features: ["Fino a 1 min", "Fotorealistico", "Comprensione fisica", "Text-to-video"],
    pricing: "Accesso limitato, incluso in ChatGPT Plus/Pro (con limiti)",
  },
  {
    name: "Runway Gen-3 Alpha", maker: "Runway", icon: "🎬",
    color: COLORS.accent3, status: "Aperto", statusColor: COLORS.accent4,
    description: "Lo standard dell'industria per la generazione video AI. Usato in produzioni cinematografiche reali e vincitore di premi per effetti visivi.",
    features: ["Standard industriale", "Usato nel cinema", "Image-to-video", "Motion brush"],
    pricing: "Da $12/mese, piani professionali disponibili",
  },
  {
    name: "Kling", maker: "Kuaishou", icon: "🐉",
    color: COLORS.accent2, status: "Aperto", statusColor: COLORS.accent4,
    description: "Competitor cinese di altissima qualita. Eccelle nella generazione di movimenti realistici e nella coerenza temporale dei video lunghi.",
    features: ["Alta qualita", "Video lunghi", "Movimenti realistici", "Lip-sync"],
    pricing: "Gratuito con limiti, piani premium disponibili",
  },
  {
    name: "Veo 2", maker: "Google DeepMind", icon: "🧠",
    color: COLORS.accent4, status: "Limitato", statusColor: COLORS.highlight,
    description: "Il modello di Google con comprensione eccezionale della fisica del mondo reale. Genera video con illuminazione, riflessi e movimenti fisicamente coerenti.",
    features: ["Fisica realistica", "Illuminazione naturale", "4K", "Fino a 2 min"],
    pricing: "Disponibile tramite Google AI Studio e Vertex AI",
  },
  {
    name: "Pika", maker: "Pika Labs", icon: "⚡",
    color: COLORS.highlight, status: "Aperto", statusColor: COLORS.accent4,
    description: "Piattaforma accessibile e intuitiva, perfetta per chi inizia. Ottima per clip brevi, effetti creativi e trasformazioni stilistiche.",
    features: ["Facile da usare", "Clip brevi", "Effetti creativi", "Stile artistico"],
    pricing: "Gratuito con limiti, da $8/mese per uso esteso",
  },
];

const AREAS = [
  { icon: "🎥", label: "Cortometraggi e film", color: COLORS.accent, description: "Registi indipendenti possono creare scene impossibili da girare. Cortometraggi interamente generati da IA stanno emergendo ai festival." },
  { icon: "📢", label: "Pubblicita e marketing", color: COLORS.accent2, description: "Spot pubblicitari personalizzati per ogni mercato. Un brand puo generare centinaia di varianti video in poche ore." },
  { icon: "📚", label: "Educazione e formazione", color: COLORS.accent4, description: "Video didattici su misura: visualizzare la storia, la scienza, simulare esperimenti pericolosi in sicurezza." },
  { icon: "📋", label: "Storyboarding e pre-produzione", color: COLORS.accent3, description: "Prima di girare un film, il regista puo 'vedere' le scene in anteprima. Risparmio enorme di tempo e budget." },
  { icon: "📱", label: "Social media e contenuti", color: COLORS.highlight, description: "Creare contenuti video per TikTok, Instagram, YouTube senza telecamera. Chiunque diventa un creator." },
  { icon: "🎮", label: "Videogiochi e animazione", color: COLORS.accent, description: "Cutscene generate dinamicamente, ambienti che cambiano in tempo reale, personaggi animati automaticamente." },
];

const RISKS = [
  { icon: "👤", title: "Deepfake video", color: COLORS.accent2, description: "Persone che dicono cose mai dette. Politici, celebrità, persino i vostri compagni di classe. Un video falso è molto più convincente di un'immagine falsa." },
  { icon: "📰", title: "Fake news in video", color: COLORS.accent2, description: "Video di eventi mai accaduti: disastri naturali, proteste, incidenti. Il video è tradizionalmente considerato 'prova' — l'IA rompe questa fiducia." },
  { icon: "⚖️", title: "Prove false", color: COLORS.accent2, description: "Video manipolati presentati come prove in tribunale, nelle scuole, sui social. La manipolazione video e molto più difficile da smascherare di quella fotografica." },
  { icon: "🏭", title: "Impatto sull'industria", color: COLORS.highlight, description: "Hollywood preoccupata. Creator di TikTok in competizione con l'IA. Animatori, videomaker, attori: molti lavori creativi vengono ridefiniti." },
];

const ARTIFACTS = [
  { icon: "🖐️", title: "Mani e dita", description: "Le mani nei video generati spesso hanno dita che appaiono e scompaiono, si fondono tra loro, o cambiano numero tra un frame e l'altro." },
  { icon: "📝", title: "Testo illeggibile", description: "Scritte, cartelli, titoli nel video sono spesso confusi, con lettere che cambiano o non hanno senso. L'IA fatica a mantenere il testo coerente nel tempo." },
  { icon: "🌊", title: "Fisica innaturale", description: "Liquidi che si muovono in modo strano, oggetti che galleggiano, gravita che non funziona. I modelli non capiscono ancora perfettamente le leggi fisiche." },
  { icon: "👁️", title: "Sfarfallio temporale", description: "Dettagli che cambiano tra un frame e l'altro: un orecchino che appare e scompare, un bottone che cambia colore, uno sfondo che 'respira'." },
  { icon: "🦷", title: "Volti e denti", description: "I denti cambiano numero, il volto si deforma leggermente durante il movimento. I riflessi negli occhi non corrispondono all'ambiente." },
  { icon: "🔄", title: "Loop innaturali", description: "Movimenti che si ripetono in modo identico, come un robot. Le persone reali non si muovono mai due volte nello stesso modo esatto." },
];

const DEEP_DIVE = [
  {
    title: "Diffusion Transformer (DiT)",
    icon: "🔬",
    content: "I modelli video piu avanzati combinano due architetture: la diffusion (che parte dal rumore per creare immagini) e il transformer (che gestisce le relazioni tra i frame). Sora, ad esempio, tratta i video come sequenze di 'patch spazio-temporali' — pezzi di video nello spazio e nel tempo — proprio come un LLM tratta le parole in una frase.",
  },
  {
    title: "Coerenza temporale",
    icon: "🔗",
    content: "La sfida principale: ogni frame deve essere coerente con il precedente e il successivo. I modelli usano 'temporal attention' — ogni frame 'guarda' i frame vicini per capire come deve apparire. E come scrivere un romanzo dove ogni frase deve avere senso con tutte le altre.",
  },
  {
    title: "World Models",
    icon: "🌍",
    content: "I modelli video piu avanzati non generano solo pixel: costruiscono un modello interno del mondo fisico. Capiscono (in parte) la gravita, le ombre, i riflessi, la prospettiva. Veo 2 di Google eccelle in questo. E il primo passo verso un'IA che 'capisce' il mondo, non solo lo imita.",
  },
  {
    title: "Watermarking e C2PA",
    icon: "🏷️",
    content: "Per combattere i deepfake, si stanno sviluppando standard come C2PA (Coalition for Content Provenance and Authenticity). Ogni video generato da IA viene 'firmato' digitalmente con metadati che ne certificano l'origine. Google, Adobe, Microsoft e altri lo supportano. Pensatelo come un certificato di nascita digitale per ogni contenuto.",
  },
];

export default function App() {
  const [activeTool, setActiveTool] = useState(null);
  const [activeArea, setActiveArea] = useState(null);
  const [activeRisk, setActiveRisk] = useState(null);
  const [revealedArtifacts, setRevealedArtifacts] = useState([]);
  const [frameStep, setFrameStep] = useState(0);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [activeDeepDive, setActiveDeepDive] = useState(null);

  const toggleArtifact = (idx) => {
    setRevealedArtifacts((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  /* Frame colors simulate slight variations across a sequence */
  const frameColors = [
    ["#00d4ff", "#0099cc", "#006688", "#004466", "#002233"],
    ["#00d8ff", "#009dd0", "#006a8c", "#00486a", "#002637"],
    ["#00dcff", "#00a1d4", "#006e90", "#004c6e", "#002a3b"],
    ["#00e0ff", "#00a5d8", "#007294", "#005072", "#002e3f"],
    ["#00e4ff", "#00a9dc", "#007698", "#005476", "#003243"],
  ];

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      maxWidth: 900, margin: "0 auto", padding: "32px 24px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
          Sessione 2 · Atto 2
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 12px", background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent3})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Creare con l'IA: I Video
        </h1>
        <p style={{ fontSize: 16, color: COLORS.muted, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          Dall'immagine statica al movimento: l'IA che da vita alle immagini, frame dopo frame.
          Un salto tecnologico che cambia cinema, comunicazione e realta.
        </p>
      </div>

      {/* Section 1: Da Immagine a Video */}
      <Section title="Da Immagine a Video" accent={COLORS.accent}>
        <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8, margin: "0 0 16px" }}>
          Un video non e altro che una <Tag color={COLORS.accent}>sequenza di immagini</Tag> mostrate rapidamente — tipicamente <Tag color={COLORS.highlight}>24-30 frame al secondo</Tag>.
          Se l'IA sa generare un'immagine, il passo successivo e generarne tante, una dopo l'altra, in modo <strong style={{ color: COLORS.accent }}>coerente</strong>.
        </p>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.8, margin: "0 0 20px" }}>
          La sfida principale: ogni frame deve essere coerente con il precedente. Se una persona alza la mano nel frame 1, nel frame 2 la mano deve continuare il movimento, non teletrasportarsi. Questa si chiama <Tag color={COLORS.accent3}>coerenza temporale</Tag>.
        </p>

        {/* Interactive frame sequence */}
        <div style={{ background: "#0a0e1a", borderRadius: 12, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            Simulazione: sequenza di frame (clicca per avanzare)
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {frameColors[frameStep].map((color, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{
                  width: 80, height: 60, borderRadius: 8,
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                  border: `2px solid ${i === frameStep ? COLORS.highlight : COLORS.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.4s ease",
                  boxShadow: i === frameStep ? `0 0 16px ${COLORS.highlight}44` : "none",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}>F{i + 1}</span>
                </div>
                {i < 4 && <span style={{ position: "absolute", right: -11, top: "50%", transform: "translateY(-50%)", color: COLORS.muted, fontSize: 14 }}>→</span>}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              onClick={() => setFrameStep((prev) => (prev + 1) % 5)}
              style={{
                background: `${COLORS.accent}22`, color: COLORS.accent,
                border: `1px solid ${COLORS.accent}44`, borderRadius: 8,
                padding: "8px 24px", cursor: "pointer", fontSize: 13,
                fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                transition: "all 0.2s ease",
              }}
            >
              Prossimo Step ({frameStep + 1}/5)
            </button>
          </div>
          <p style={{ fontSize: 11, color: COLORS.muted, textAlign: "center", marginTop: 8, margin: "8px 0 0" }}>
            Nota come i colori cambiano gradualmente tra uno step e l'altro — questa e la coerenza temporale.
          </p>
        </div>
      </Section>

      {/* Section 2: Gli Strumenti */}
      <Section title="Gli Strumenti" accent={COLORS.accent3}>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 16px" }}>
          Il panorama dei generatori video AI e in rapida evoluzione. Clicca su ogni strumento per scoprirne i dettagli.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {TOOLS.map((tool, i) => (
            <ToolCard
              key={i}
              tool={tool}
              isActive={activeTool === i}
              onClick={() => setActiveTool(activeTool === i ? null : i)}
            />
          ))}
        </div>
      </Section>

      {/* Section 3: Le Potenzialita */}
      <Section title="Le Potenzialita" accent={COLORS.accent4}>
        <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 16px" }}>
          Le applicazioni della generazione video toccano ogni settore. Esplora le aree cliccando su ciascuna.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {AREAS.map((area, i) => (
            <AreaCard
              key={i}
              area={area}
              isActive={activeArea === i}
              onClick={() => setActiveArea(activeArea === i ? null : i)}
            />
          ))}
        </div>
      </Section>

      {/* Section 4: I Rischi Amplificati */}
      <Section title="I Rischi Amplificati" accent={COLORS.accent2}>
        <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8, margin: "0 0 6px" }}>
          Tutto cio che abbiamo visto per le immagini vale anche per i video, ma <Tag color={COLORS.accent2}>amplificato</Tag>.
          Un video falso e molto piu convincente di un'immagine falsa.
        </p>
        <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.7, margin: "0 0 16px" }}>
          Il nostro cervello si fida dei video molto piu delle foto — e i malintenzionati lo sanno.
        </p>

        {/* Risk cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 24 }}>
          {RISKS.map((risk, i) => {
            const isActive = activeRisk === i;
            return (
              <div
                key={i}
                onClick={() => setActiveRisk(isActive ? null : i)}
                style={{
                  background: isActive ? `${risk.color}12` : "#0a0e1a",
                  border: `1px solid ${isActive ? risk.color : COLORS.border}`,
                  borderRadius: 12, padding: "14px 16px", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{risk.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? risk.color : COLORS.text }}>{risk.title}</span>
                </div>
                {isActive && (
                  <p style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.7, marginTop: 10, margin: "10px 0 0" }}>{risk.description}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Spot the artifact */}
        <div style={{ background: "#0a0e1a", borderRadius: 12, padding: "20px", border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.highlight, marginBottom: 4 }}>
            🔍 Diventa un detective: riconosci i video generati dall'IA
          </div>
          <p style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.6, margin: "0 0 14px" }}>
            I video generati dall'IA hanno ancora artefatti riconoscibili. Clicca su ogni elemento per scoprire cosa cercare.
            Hai trovato {revealedArtifacts.length}/{ARTIFACTS.length} artefatti.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ARTIFACTS.map((artifact, i) => (
              <ArtifactItem
                key={i}
                artifact={artifact}
                isRevealed={revealedArtifacts.includes(i)}
                onClick={() => toggleArtifact(i)}
              />
            ))}
          </div>
          {revealedArtifacts.length === ARTIFACTS.length && (
            <div style={{
              marginTop: 14, padding: "12px 16px", background: `${COLORS.accent4}15`,
              border: `1px solid ${COLORS.accent4}44`, borderRadius: 10, textAlign: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent4 }}>
                Complimenti! Ora sai riconoscere i principali artefatti dei video AI.
              </span>
            </div>
          )}
        </div>
      </Section>

      {/* Deep Dive - Rabbit Hole */}
      <div style={{ marginBottom: 32 }}>
        <div
          onClick={() => setShowDeepDive(!showDeepDive)}
          style={{
            padding: "18px 28px", background: COLORS.card, borderRadius: 16,
            border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${COLORS.accent3}`,
            cursor: "pointer", transition: "all 0.3s ease",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 22 }}>🐇</span>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent3, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                Rabbit Hole
              </span>
              <span style={{ fontSize: 12, color: COLORS.muted, marginLeft: 12 }}>
                Per i curiosi: come funziona davvero la generazione video
              </span>
            </div>
          </div>
          <span style={{ fontSize: 14, color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace" }}>
            {showDeepDive ? "▲ Chiudi" : "▼ Esplora"}
          </span>
        </div>

        {showDeepDive && (
          <div style={{
            marginTop: -8, padding: "24px 28px", paddingTop: 32,
            background: `${COLORS.card}cc`, borderRadius: "0 0 16px 16px",
            border: `1px solid ${COLORS.border}`, borderTop: "none",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DEEP_DIVE.map((item, i) => {
                const isActive = activeDeepDive === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveDeepDive(isActive ? null : i)}
                    style={{
                      background: isActive ? `${COLORS.accent3}10` : "#0a0e1a",
                      border: `1px solid ${isActive ? COLORS.accent3 : COLORS.border}`,
                      borderRadius: 12, padding: "16px", cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? COLORS.accent3 : COLORS.text }}>{item.title}</span>
                      <span style={{ marginLeft: "auto", fontSize: 11, color: COLORS.accent3, fontFamily: "'JetBrains Mono', monospace" }}>
                        {isActive ? "▼" : "▶"}
                      </span>
                    </div>
                    {isActive && (
                      <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.8, marginTop: 12, margin: "12px 0 0", paddingLeft: 32 }}>
                        {item.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 0", borderTop: `1px solid ${COLORS.border}` }}>
        <p style={{ fontSize: 12, color: COLORS.muted, margin: 0, lineHeight: 1.6 }}>
          Ricordate: il miglior strumento contro la disinformazione e il <Tag color={COLORS.accent}>pensiero critico</Tag>.
          Se un video sembra troppo perfetto o troppo scioccante, verificatelo sempre.
        </p>
      </div>
    </div>
  );
}