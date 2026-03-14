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

/* ── Section 1: RNN vs Transformer visualization ── */

const WORDS = ["Il", "gatto", "dorme", "sul", "divano"];

function RnnVsTransformer() {
  const [mode, setMode] = useState("rnn");
  const [rnnStep, setRnnStep] = useState(0);

  const isRnn = mode === "rnn";

  const handleToggle = (newMode) => {
    setMode(newMode);
    setRnnStep(0);
  };

  const advanceRnn = () => {
    setRnnStep((prev) => (prev + 1) % (WORDS.length + 1));
  };

  return (
    <div>
      {/* Toggle buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { key: "rnn", label: "🐌 RNN (Sequenziale)", color: COLORS.accent2 },
          { key: "transformer", label: "⚡ Transformer (Parallelo)", color: COLORS.accent },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => handleToggle(btn.key)}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: 8,
              border: `2px solid ${mode === btn.key ? btn.color : COLORS.border}`,
              background: mode === btn.key ? `${btn.color}22` : COLORS.bg,
              color: mode === btn.key ? btn.color : COLORS.muted,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Visualization area */}
      <div style={{
        background: COLORS.bg,
        borderRadius: 10,
        padding: 24,
        minHeight: 220,
        position: "relative",
      }}>
        {isRnn ? (
          /* RNN: sequential processing */
          <div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16, fontFamily: "monospace" }}>
              Elaborazione sequenziale — una parola alla volta (clicca per avanzare)
            </div>
            <div
              onClick={advanceRnn}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
            >
              {WORDS.map((word, i) => {
                const processed = i < rnnStep;
                const current = i === rnnStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      padding: "10px 18px",
                      borderRadius: 8,
                      border: `2px solid ${current ? COLORS.highlight : processed ? COLORS.accent2 : COLORS.border}`,
                      background: current ? `${COLORS.highlight}22` : processed ? `${COLORS.accent2}15` : "transparent",
                      color: current ? COLORS.highlight : processed ? COLORS.accent2 : COLORS.muted,
                      fontSize: 16,
                      fontWeight: 600,
                      transition: "all 0.3s",
                      opacity: processed || current ? 1 : 0.4,
                    }}>
                      {word}
                    </div>
                    {i < WORDS.length - 1 && (
                      <span style={{
                        color: processed ? COLORS.accent2 : COLORS.border,
                        fontSize: 20,
                        transition: "color 0.3s",
                      }}>→</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <div style={{
                display: "inline-block",
                background: `${COLORS.accent2}15`,
                border: `1px solid ${COLORS.accent2}44`,
                borderRadius: 6,
                padding: "8px 16px",
                color: COLORS.accent2,
                fontSize: 13,
              }}>
                {rnnStep === 0
                  ? "Clicca per iniziare l'elaborazione"
                  : rnnStep >= WORDS.length
                  ? `✅ Completato in ${WORDS.length} passi sequenziali`
                  : `Passo ${rnnStep}/${WORDS.length} — ogni parola aspetta la precedente`}
              </div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 12, textAlign: "center", marginTop: 12, fontStyle: "italic" }}>
              Problema: la parola 5 deve aspettare che le parole 1-4 siano elaborate. Lento e perde contesto lontano.
            </div>
          </div>
        ) : (
          /* Transformer: parallel processing */
          <div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16, fontFamily: "monospace" }}>
              Elaborazione parallela — tutte le parole contemporaneamente
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              {WORDS.map((word, i) => (
                <div key={i} style={{
                  padding: "10px 18px",
                  borderRadius: 8,
                  border: `2px solid ${COLORS.accent}`,
                  background: `${COLORS.accent}15`,
                  color: COLORS.accent,
                  fontSize: 16,
                  fontWeight: 600,
                  position: "relative",
                  animation: "none",
                }}>
                  {word}
                </div>
              ))}
            </div>
            {/* Attention connections */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}>
              {WORDS.map((w1, i) =>
                WORDS.filter((_, j) => j !== i).slice(0, 2).map((w2, j) => (
                  <span key={`${i}-${j}`} style={{
                    fontSize: 11,
                    color: COLORS.accent3,
                    background: `${COLORS.accent3}15`,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontFamily: "monospace",
                  }}>
                    {w1}⇄{w2}
                  </span>
                ))
              )}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                display: "inline-block",
                background: `${COLORS.accent}15`,
                border: `1px solid ${COLORS.accent}44`,
                borderRadius: 6,
                padding: "8px 16px",
                color: COLORS.accent,
                fontSize: 13,
              }}>
                ⚡ Tutte le parole elaborate in 1 passo — ogni parola "vede" tutte le altre
              </div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 12, textAlign: "center", marginTop: 12, fontStyle: "italic" }}>
              L'attenzione connette direttamente ogni parola con tutte le altre. Parallelizzabile sulle GPU.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Section 2: Scaling Laws bar chart ── */

const MODELS = [
  {
    name: "GPT-1",
    year: 2018,
    params: "117M",
    paramsNum: 117e6,
    color: COLORS.muted,
    detail: "Il primo esperimento. Pre-training non supervisionato + fine-tuning. Dimostra che il concetto funziona, ma le prestazioni sono modeste.",
  },
  {
    name: "GPT-2",
    year: 2019,
    params: "1.5B",
    paramsNum: 1.5e9,
    color: COLORS.accent,
    detail: "13× più grande di GPT-1. Genera testo sorprendentemente coerente. OpenAI lo definisce 'troppo pericoloso per essere rilasciato' — il primo allarme pubblico sull'AI.",
  },
  {
    name: "GPT-3",
    year: 2020,
    params: "175B",
    paramsNum: 175e9,
    color: COLORS.accent2,
    detail: "117× più grande di GPT-2. Capacità emergenti: few-shot learning, traduzione, codice. Il momento in cui il mondo ha iniziato a prestare attenzione.",
  },
  {
    name: "GPT-4",
    year: 2023,
    params: "~1.8T",
    paramsNum: 1.8e12,
    color: COLORS.highlight,
    detail: "Stimato ~10× più grande di GPT-3. Multimodale (testo + immagini). Supera esami di avvocatura e medicina. Mixture of Experts architecture.",
  },
];

function ScalingChart() {
  const [selectedModel, setSelectedModel] = useState(null);

  const maxLog = Math.log10(1.8e12);
  const minLog = Math.log10(117e6);

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>
        Scala logaritmica dei parametri — clicca su ogni barra per i dettagli
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 240, padding: "0 16px" }}>
        {MODELS.map((model, i) => {
          const logVal = Math.log10(model.paramsNum);
          const heightPct = ((logVal - minLog + 1) / (maxLog - minLog + 1)) * 100;
          const isSelected = selectedModel === i;

          return (
            <div
              key={i}
              onClick={() => setSelectedModel(isSelected ? null : i)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              {/* Params label */}
              <div style={{
                color: model.color,
                fontSize: 12,
                fontFamily: "monospace",
                fontWeight: 700,
                marginBottom: 6,
              }}>
                {model.params}
              </div>
              {/* Bar */}
              <div style={{
                width: "100%",
                maxWidth: 80,
                height: `${heightPct}%`,
                background: isSelected
                  ? `linear-gradient(to top, ${model.color}66, ${model.color}33)`
                  : `${model.color}33`,
                border: `2px solid ${isSelected ? model.color : `${model.color}66`}`,
                borderRadius: "8px 8px 0 0",
                transition: "all 0.3s",
                position: "relative",
              }}>
                {isSelected && (
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: model.color,
                    fontSize: 20,
                  }}>
                    📊
                  </div>
                )}
              </div>
              {/* Name + year */}
              <div style={{ marginTop: 8, textAlign: "center" }}>
                <div style={{ color: model.color, fontSize: 14, fontWeight: 700 }}>{model.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 11 }}>{model.year}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {selectedModel !== null && (
        <div style={{
          marginTop: 16,
          background: COLORS.bg,
          borderRadius: 8,
          padding: 16,
          borderLeft: `3px solid ${MODELS[selectedModel].color}`,
          transition: "all 0.3s",
        }}>
          <div style={{
            color: MODELS[selectedModel].color,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "monospace",
            marginBottom: 8,
          }}>
            {MODELS[selectedModel].name} ({MODELS[selectedModel].year}) — {MODELS[selectedModel].params} parametri
          </div>
          <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            {MODELS[selectedModel].detail}
          </p>
        </div>
      )}

      {/* Key insight */}
      <div style={{
        marginTop: 16,
        background: `${COLORS.accent4}11`,
        border: `1px solid ${COLORS.accent4}33`,
        borderRadius: 8,
        padding: 14,
        textAlign: "center",
      }}>
        <span style={{ color: COLORS.accent4, fontSize: 14, fontWeight: 600 }}>
          💡 Insight chiave: più parametri = migliori prestazioni, in modo prevedibile (legge di potenza)
        </span>
      </div>
    </div>
  );
}

/* ── Section 3: Interactive Timeline ── */

const TIMELINE_EVENTS = [
  {
    year: "2014",
    title: "Amodei a Baidu",
    desc: "Dario Amodei lavora nel team di ricerca di Andrew Ng a Baidu. Osserva che modelli più grandi producono risultati migliori in modo sorprendentemente prevedibile. Un'intuizione che cambierà tutto.",
    color: COLORS.muted,
    emoji: "🔬",
  },
  {
    year: "2015",
    title: "Nasce OpenAI",
    desc: "Ilya Sutskever co-fonda OpenAI, convinto che 'bigger is better'. La scommessa: se continuiamo a scalare i modelli, emergeranno capacità sempre più sofisticate. Molti colleghi sono scettici.",
    color: COLORS.accent3,
    emoji: "🚀",
  },
  {
    year: "2017",
    title: "Attention Is All You Need",
    desc: "Vaswani et al. pubblicano il paper che introduce il Transformer. 8 autori di Google Brain, che poi lasceranno tutti Google per fondare aziende AI. L'architettura che rende possibile la scala.",
    color: COLORS.accent,
    emoji: "📄",
  },
  {
    year: "2018",
    title: "GPT-1 — 117M parametri",
    desc: "OpenAI dimostra che il pre-training non supervisionato su grandi quantità di testo funziona. Il modello è piccolo ma il concetto è rivoluzionario: addestrare su tutto il testo disponibile.",
    color: COLORS.accent2,
    emoji: "🌱",
  },
  {
    year: "2019",
    title: "GPT-2 — 'Troppo pericoloso'",
    desc: "Con 1.5 miliardi di parametri, GPT-2 genera testo così convincente che OpenAI decide di non rilasciarlo subito per paura di disinformazione. È il primo grande dibattito etico sull'AI generativa.",
    color: COLORS.highlight,
    emoji: "⚠️",
  },
  {
    year: "2020 Gen",
    title: "Le Scaling Laws",
    desc: "Kaplan et al. (con Dario Amodei come senior co-autore) pubblicano 'Scaling Laws for Neural Language Models'. Dimostrano matematicamente: le prestazioni seguono leggi di potenza prevedibili rispetto a parametri, dati e compute.",
    color: COLORS.accent4,
    emoji: "📐",
  },
  {
    year: "2020 Mag",
    title: "GPT-3 — 175B parametri",
    desc: "175 miliardi di parametri. Per la prima volta, un modello mostra capacità emergenti: few-shot learning, ragionamento, traduzione. La scommessa sulla scala sembra funzionare davvero.",
    color: COLORS.accent2,
    emoji: "💥",
  },
  {
    year: "2022",
    title: "InstructGPT + RLHF",
    desc: "OpenAI combina la scala con l'allineamento umano (RLHF). Non basta essere grande: bisogna anche essere utile e sicuro. Amodei, preoccupato per la sicurezza, lascia OpenAI e fonda Anthropic.",
    color: COLORS.accent3,
    emoji: "🎯",
  },
  {
    year: "2022 Nov",
    title: "ChatGPT — Il mondo cambia",
    desc: "ChatGPT raggiunge 100 milioni di utenti in 2 mesi — il prodotto con la crescita più rapida della storia. L'AI esce dai laboratori e entra nella vita quotidiana di tutti.",
    color: COLORS.accent,
    emoji: "🌍",
  },
];

function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>
        Clicca su ogni evento per scoprire la storia
      </div>

      {/* Timeline track */}
      <div style={{ position: "relative", paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute",
          left: 11,
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(to bottom, ${COLORS.accent}44, ${COLORS.accent3}44, ${COLORS.highlight}44)`,
        }} />

        {TIMELINE_EVENTS.map((evt, i) => {
          const isSelected = selectedEvent === i;
          return (
            <div
              key={i}
              onClick={() => setSelectedEvent(isSelected ? null : i)}
              style={{
                position: "relative",
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              {/* Dot */}
              <div style={{
                position: "absolute",
                left: -28,
                top: 10,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: isSelected ? evt.color : COLORS.bg,
                border: `3px solid ${evt.color}`,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                zIndex: 2,
              }}>
                {isSelected && "●"}
              </div>

              {/* Event card */}
              <div style={{
                background: isSelected ? `${evt.color}11` : "transparent",
                border: `1px solid ${isSelected ? evt.color + "44" : "transparent"}`,
                borderRadius: 8,
                padding: "10px 16px",
                transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>{evt.emoji}</span>
                  <span style={{
                    color: evt.color,
                    fontFamily: "monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    minWidth: 70,
                  }}>
                    {evt.year}
                  </span>
                  <span style={{
                    color: isSelected ? COLORS.text : COLORS.muted,
                    fontSize: 14,
                    fontWeight: isSelected ? 600 : 400,
                    transition: "all 0.2s",
                  }}>
                    {evt.title}
                  </span>
                </div>

                {isSelected && (
                  <div style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: `1px solid ${evt.color}33`,
                  }}>
                    <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                      {evt.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Section 4: Three pillars ── */

function ThreePillars() {
  const [hoveredPillar, setHoveredPillar] = useState(null);

  const pillars = [
    {
      emoji: "🧠",
      name: "Parametri",
      desc: "La 'dimensione del cervello'. Più parametri = più pattern catturati. Ma da soli non bastano: un cervello grande senza esperienza è inutile.",
      color: COLORS.accent,
      example: "GPT-3: 175B, GPT-4: ~1.8T",
    },
    {
      emoji: "📚",
      name: "Dati",
      desc: "L''esperienza' del modello. Serve testo di qualità per imparare il linguaggio, il ragionamento, la conoscenza del mondo.",
      color: COLORS.accent2,
      example: "GPT-3: ~500B token di testo",
    },
    {
      emoji: "⚡",
      name: "Compute",
      desc: "La 'potenza di calcolo' per l'addestramento. Migliaia di GPU per settimane. Costi di milioni di dollari. Il fattore limitante oggi.",
      color: COLORS.accent3,
      example: "GPT-4: ~$100M di compute stimato",
    },
  ];

  return (
    <div>
      <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, marginTop: 0, marginBottom: 20 }}>
        Le scaling laws dicono che servono <strong>tutti e tre</strong> gli ingredienti in proporzione.
        Scalare solo uno non funziona — è come avere un motore potentissimo senza carburante.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {pillars.map((pillar, i) => {
          const isHovered = hoveredPillar === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredPillar(i)}
              onMouseLeave={() => setHoveredPillar(null)}
              onClick={() => setHoveredPillar(isHovered ? null : i)}
              style={{
                background: isHovered ? `${pillar.color}15` : COLORS.bg,
                border: `2px solid ${isHovered ? pillar.color : COLORS.border}`,
                borderRadius: 12,
                padding: 20,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{pillar.emoji}</div>
              <div style={{
                color: pillar.color,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
              }}>
                {pillar.name}
              </div>
              {isHovered && (
                <div>
                  <p style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.6, margin: "0 0 8px" }}>
                    {pillar.desc}
                  </p>
                  <div style={{
                    fontSize: 11,
                    color: COLORS.muted,
                    fontFamily: "monospace",
                    background: COLORS.card,
                    borderRadius: 4,
                    padding: "4px 8px",
                    display: "inline-block",
                  }}>
                    {pillar.example}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Formula visual */}
      <div style={{
        marginTop: 16,
        textAlign: "center",
        padding: 16,
        background: COLORS.bg,
        borderRadius: 8,
        border: `1px solid ${COLORS.border}`,
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: COLORS.accent, fontSize: 18, fontWeight: 700 }}>Parametri</span>
          <span style={{ color: COLORS.muted, fontSize: 22 }}>×</span>
          <span style={{ color: COLORS.accent2, fontSize: 18, fontWeight: 700 }}>Dati</span>
          <span style={{ color: COLORS.muted, fontSize: 22 }}>×</span>
          <span style={{ color: COLORS.accent3, fontSize: 18, fontWeight: 700 }}>Compute</span>
          <span style={{ color: COLORS.muted, fontSize: 22 }}>=</span>
          <span style={{ color: COLORS.accent4, fontSize: 18, fontWeight: 700 }}>🎯 Prestazioni</span>
        </div>
        <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 8, fontStyle: "italic" }}>
          L(N, D, C) — le scaling laws descrivono la relazione precisa tra queste variabili
        </div>
      </div>
    </div>
  );
}

/* ── Deep Dive: Rabbit Hole ── */

function RabbitHole() {
  const [open, setOpen] = useState(false);
  const [expandedTopic, setExpandedTopic] = useState(null);

  const topics = [
    {
      title: "🦫 Chinchilla — Il Controargomento",
      color: COLORS.accent2,
      content: "DeepMind (2022) dimostra che i modelli precedenti erano sotto-addestrati rispetto ai dati. La regola Chinchilla: per ogni raddoppio dei parametri, servono il doppio dei dati. GPT-3 aveva 175B parametri ma era addestrato su 'solo' 300B token — Chinchilla dice che ne servivano molti di più. Llama di Meta segue questa intuizione: modelli più piccoli ma addestrati su molti più dati.",
    },
    {
      title: "🔍 Neural Architecture Search",
      color: COLORS.accent,
      content: "Non basta scalare: l'architettura conta. Google ha usato AI per cercare architetture migliori (NAS). Mixture of Experts (MoE, usato in GPT-4) attiva solo una parte del modello per ogni input — come avere tanti specialisti invece di un unico generalista. Questo permette modelli enormi che costano meno in inferenza.",
    },
    {
      title: "🧭 La Fine dell'Era della Scala?",
      color: COLORS.highlight,
      content: "Ilya Sutskever (co-fondatore di OpenAI, ora a SSI) nel 2025: 'Stiamo passando dall'era della scala all'era della ricerca'. I dati di qualità su internet si stanno esaurendo. Le prossime frontiere: dati sintetici, ragionamento (chain-of-thought), modelli che 'pensano' più a lungo (test-time compute), e integrazione con strumenti esterni.",
    },
    {
      title: "💰 Il Costo della Scala",
      color: COLORS.accent4,
      content: "Addestrare GPT-4 è costato circa $100 milioni. I prossimi modelli potrebbero costare $1-10 miliardi. Questo crea una barriera economica enorme: solo poche aziende (OpenAI, Google, Anthropic, Meta) possono permettersi di competere alla frontiera. Ma i modelli open-source (Llama, Mistral) stanno democratizzando l'accesso.",
    },
  ];

  return (
    <Section title="🐇 Tana del bianconiglio" accent={COLORS.accent3}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: COLORS.accent3,
          fontSize: 14,
          marginBottom: open ? 16 : 0,
        }}
      >
        <span style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
        {open ? "Nascondi approfondimenti" : "Mostra approfondimenti (per i più curiosi)"}
      </div>

      {open && (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topics.map((topic, i) => {
              const isExpanded = expandedTopic === i;
              return (
                <div
                  key={i}
                  onClick={() => setExpandedTopic(isExpanded ? null : i)}
                  style={{
                    background: COLORS.bg,
                    borderRadius: 8,
                    padding: "12px 16px",
                    borderLeft: `3px solid ${topic.color}`,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ color: topic.color, fontSize: 14, fontWeight: 600 }}>
                      {topic.title}
                    </span>
                    <span style={{
                      color: COLORS.muted,
                      fontSize: 12,
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      display: "inline-block",
                    }}>▶</span>
                  </div>
                  {isExpanded && (
                    <p style={{
                      color: COLORS.text,
                      fontSize: 13,
                      lineHeight: 1.7,
                      margin: "12px 0 0",
                      borderTop: `1px solid ${topic.color}33`,
                      paddingTop: 12,
                    }}>
                      {topic.content}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <Tag color={COLORS.accent}>scaling laws</Tag>
            <Tag color={COLORS.accent2}>chinchilla</Tag>
            <Tag color={COLORS.accent3}>mixture of experts</Tag>
            <Tag color={COLORS.highlight}>test-time compute</Tag>
            <Tag color={COLORS.accent4}>open source</Tag>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ── Main App ── */

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
          Sessione 1 · Atto 5
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Il Paper che ha Cambiato Tutto
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 650, margin: "0 auto" }}>
          Da un paper di 8 ricercatori a una rivoluzione globale: come "Attention Is All You Need" e le leggi di scala hanno reso possibile l'AI che usate oggi.
        </p>
      </div>

      {/* Section 1: Attention Is All You Need */}
      <Section title="📄 Attention Is All You Need" accent={COLORS.accent}>
        <div style={{ marginBottom: 16 }}>
          <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 12px" }}>
            <strong>2017, Google Brain.</strong> Otto ricercatori pubblicano un paper di 15 pagine che cambierà il mondo.
            Propongono un'architettura radicalmente nuova: il <strong>Transformer</strong>. L'intuizione? Eliminare
            l'elaborazione sequenziale e lasciare che ogni parola "guardi" direttamente tutte le altre.
          </p>
          <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, margin: "0 0 12px" }}>
            Curiosità: tutti e 8 gli autori hanno poi lasciato Google. Hanno fondato o guidato alcune delle
            aziende AI più importanti al mondo (tra cui Cohere, Essential AI, Character.AI e altri).
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <Tag color={COLORS.accent}>transformer</Tag>
            <Tag color={COLORS.accent2}>self-attention</Tag>
            <Tag color={COLORS.accent3}>parallelizzazione</Tag>
            <Tag color={COLORS.highlight}>2017</Tag>
          </div>
        </div>

        <RnnVsTransformer />
      </Section>

      {/* Section 2: Scaling Laws */}
      <Section title="📐 Le Leggi di Scala (Scaling Laws)" accent={COLORS.accent2}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 6px" }}>
          <strong>Kaplan et al., gennaio 2020.</strong> Dario Amodei (poi fondatore di Anthropic) è il senior co-autore.
          Il paper dimostra qualcosa di straordinario: le prestazioni dei modelli linguistici seguono
          <strong> leggi di potenza prevedibili</strong>.
        </p>
        <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, margin: "0 0 16px" }}>
          Tradotto: se raddoppi i parametri, le prestazioni migliorano di una quantità precisa e prevedibile.
          Come una legge fisica, non una coincidenza.
        </p>
        <ScalingChart />
      </Section>

      {/* Section 3: Timeline */}
      <Section title="🕐 La Scommessa sulla Scala" accent={COLORS.accent3}>
        <p style={{ color: COLORS.text, fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>
          La storia dell'AI moderna è una scommessa audace: "se costruiamo modelli più grandi,
          emergeranno capacità che non possiamo prevedere". Ecco come si è svolta.
        </p>
        <Timeline />
      </Section>

      {/* Section 4: Why It Matters */}
      <Section title="🎯 Perché Conta" accent={COLORS.accent4}>
        <ThreePillars />
      </Section>

      {/* Rabbit Hole */}
      <RabbitHole />

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Esplora ogni sezione interattiva · Sessione 1, Atto 5 (15 min)
      </div>
    </div>
  );
}
