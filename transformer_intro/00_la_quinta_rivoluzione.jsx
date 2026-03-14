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

const REVOLUTIONS = [
  {
    id: 0,
    year: "~1760",
    name: "Vapore",
    emoji: "🏭",
    color: COLORS.accent2,
    shortDesc: "Macchina a vapore",
    whatChanged: "Il lavoro fisico ripetitivo viene automatizzato. Le fabbriche sostituiscono le botteghe artigiane. Chi prima filava a mano ora gestisce telai meccanici.",
    whoWon: "Chi ha abbracciato le macchine: i primi industriali, le città che hanno costruito ferrovie. Chi ha resistito è rimasto indietro di generazioni.",
    analogy: "Come passare dal camminare al prendere il treno.",
    keyNumber: "Un telaio meccanico produceva quanto 40 tessitori a mano.",
  },
  {
    id: 1,
    year: "~1870",
    name: "Elettricita",
    emoji: "⚡",
    color: COLORS.highlight,
    shortDesc: "Elettricita e produzione di massa",
    whatChanged: "La catena di montaggio. L'illuminazione elettrica allunga la giornata lavorativa. La comunicazione diventa istantanea (telegrafo, telefono).",
    whoWon: "Ford, Edison, Siemens: chi ha standardizzato e scalato. I piccoli artigiani che hanno adottato l'elettricita sono sopravvissuti; chi non l'ha fatto, no.",
    analogy: "Come avere un assistente instancabile che lavora anche di notte.",
    keyNumber: "La Ford Model T: da 12 ore a 93 minuti per assemblare un'auto.",
  },
  {
    id: 2,
    year: "~1950",
    name: "Computer",
    emoji: "🖥️",
    color: COLORS.accent,
    shortDesc: "Calcolo automatico e informatica",
    whatChanged: "Calcoli che richiedevano settimane ora richiedono secondi. Nasce il software. L'automazione si sposta dal fisico al cognitivo-ripetitivo.",
    whoWon: "IBM, poi Microsoft e Apple. Le aziende che hanno informatizzato i processi hanno dominato i mercati. I contabili con il foglio elettronico hanno sostituito intere stanze di calcolatori umani.",
    analogy: "Come avere una calcolatrice che non si stanca mai e non sbaglia mai le operazioni.",
    keyNumber: "ENIAC (1945): 5.000 addizioni/secondo. Il vostro telefono: ~15 miliardi di operazioni/secondo.",
  },
  {
    id: 3,
    year: "~1990",
    name: "Internet",
    emoji: "🌐",
    color: COLORS.accent4,
    shortDesc: "Rete globale e informazione",
    whatChanged: "L'informazione diventa istantanea e globale. Chiunque puo pubblicare, vendere, comunicare con il mondo. Nascono nuovi lavori che prima non esistevano.",
    whoWon: "Google, Amazon, i creator, le startup. Chi ha capito la rete prima degli altri. Oggi siete nel 1995 di internet: tutto sta per cambiare, ma pochi lo vedono.",
    analogy: "Come avere la biblioteca di Alessandria in tasca, con un postino istantaneo.",
    keyNumber: "Nel 1995: 16 milioni di utenti. Oggi: 5.5 miliardi. Crescita 344x in 30 anni.",
  },
  {
    id: 4,
    year: "~2020",
    name: "Intelligenza Artificiale",
    emoji: "🤖",
    color: COLORS.accent3,
    shortDesc: "Macchine che imparano e ragionano",
    whatChanged: "Per la prima volta, le macchine gestiscono compiti cognitivi complessi: scrivere, tradurre, programmare, ragionare, creare immagini. Non sostituiscono il pensiero, ma lo amplificano.",
    whoWon: "E ancora presto per dirlo. Ma il pattern e lo stesso: chi impara a usare lo strumento prospera. Voi siete nella posizione migliore: state imparando ORA.",
    analogy: "Come avere un collega instancabile che ha letto tutta internet e puo aiutarvi in qualsiasi compito.",
    keyNumber: "GPT-3 (2020): 175 miliardi di parametri. Claude/GPT-4 (2024): probabilmente > 1 trilione. Il cervello di un topo: ~70 milioni di neuroni.",
  },
];

function TimelineNode({ rev, isSelected, onClick, isLast }) {
  const [hovered, setHovered] = useState(false);
  const active = isSelected || hovered;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
      {/* Connector line */}
      {!isLast && (
        <div style={{
          position: "absolute",
          top: 28,
          left: "calc(50% + 24px)",
          width: "calc(100% - 48px)",
          height: 2,
          background: `linear-gradient(to right, ${rev.color}88, ${REVOLUTIONS[rev.id + 1].color}88)`,
          zIndex: 0,
        }} />
      )}

      {/* Node circle */}
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: active ? 56 : 48,
          height: active ? 56 : 48,
          borderRadius: "50%",
          background: active ? `${rev.color}33` : COLORS.card,
          border: `3px solid ${active ? rev.color : COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: active ? 28 : 24,
          cursor: "pointer",
          transition: "all 0.3s ease",
          zIndex: 1,
          boxShadow: active ? `0 0 20px ${rev.color}44` : "none",
        }}
      >
        {rev.emoji}
      </div>

      {/* Year */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: active ? rev.color : COLORS.muted,
        marginTop: 8,
        transition: "color 0.3s",
        fontWeight: active ? 700 : 400,
      }}>
        {rev.year}
      </div>

      {/* Name */}
      <div style={{
        fontSize: 13,
        color: active ? COLORS.text : COLORS.muted,
        marginTop: 4,
        textAlign: "center",
        fontWeight: active ? 600 : 400,
        transition: "all 0.3s",
      }}>
        {rev.name}
      </div>
    </div>
  );
}

function RevolutionDetail({ rev }) {
  return (
    <div style={{
      background: "#0a0e1a",
      borderRadius: 12,
      padding: 24,
      border: `1px solid ${rev.color}44`,
      borderTop: `3px solid ${rev.color}`,
      animation: "fadeIn 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 36 }}>{rev.emoji}</span>
        <div>
          <h3 style={{ margin: 0, color: rev.color, fontSize: 22 }}>
            {rev.year} — {rev.name}
          </h3>
          <div style={{ color: COLORS.muted, fontSize: 14, marginTop: 2 }}>{rev.shortDesc}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 16 }}>
          <div style={{ color: COLORS.accent, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            COSA E CAMBIATO
          </div>
          <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            {rev.whatChanged}
          </p>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 16 }}>
          <div style={{ color: COLORS.accent2, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
            CHI HA VINTO
          </div>
          <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
            {rev.whoWon}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 14, borderLeft: `3px solid ${COLORS.accent3}` }}>
          <div style={{ color: COLORS.accent3, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>ANALOGIA</div>
          <div style={{ color: COLORS.text, fontSize: 14, fontStyle: "italic" }}>"{rev.analogy}"</div>
        </div>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 14, borderLeft: `3px solid ${COLORS.highlight}` }}>
          <div style={{ color: COLORS.highlight, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>NUMERO CHIAVE</div>
          <div style={{ color: COLORS.text, fontSize: 14 }}>{rev.keyNumber}</div>
        </div>
      </div>
    </div>
  );
}

function PatternCard() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${COLORS.accent}11, ${COLORS.accent3}11)`,
      border: `1px solid ${COLORS.accent}33`,
      borderRadius: 12,
      padding: 24,
      textAlign: "center",
    }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>🔄</div>
      <h3 style={{ color: COLORS.accent, fontSize: 18, margin: "0 0 12px" }}>
        Il pattern e sempre lo stesso
      </h3>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        {["Nuovo strumento", "Paura e resistenza", "Chi lo adotta prospera", "Diventa indispensabile"].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              color: COLORS.text,
            }}>
              {step}
            </div>
            {i < 3 && <span style={{ color: COLORS.accent, fontSize: 18 }}>→</span>}
          </div>
        ))}
      </div>
      <p style={{ color: COLORS.highlight, fontSize: 16, fontWeight: 600, margin: 0 }}>
        Oggi siete nel 1995 di internet. Tutto sta per cambiare.
      </p>
    </div>
  );
}

function RabbitHole() {
  const [open, setOpen] = useState(false);

  const comparisons = [
    { name: "Cervello topo", params: "~70M neuroni", color: COLORS.muted },
    { name: "GPT-2 (2019)", params: "1.5B parametri", color: COLORS.accent },
    { name: "GPT-3 (2020)", params: "175B parametri", color: COLORS.accent2 },
    { name: "Llama-3 (2024)", params: "405B parametri", color: COLORS.accent3 },
    { name: "GPT-4 (2023)", params: "~1.8T parametri*", color: COLORS.highlight },
    { name: "Cervello umano", params: "~86B neuroni, ~100T sinapsi", color: COLORS.accent4 },
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
        {open ? "Nascondi dettagli tecnici" : "Mostra dettagli tecnici (20% hardcore)"}
      </div>

      {open && (
        <div>
          {/* Scale comparison */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>
              Parametri dei modelli vs neuroni biologici:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {comparisons.map((item, i) => {
                const maxLog = Math.log10(100e12); // 100T
                const value = parseFloat(item.params.replace(/[~*]/g, "").replace("B", "e9").replace("M", "e6").replace("T", "e12").split(" ")[0]);
                const width = Math.max(5, (Math.log10(value) / maxLog) * 100);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 160, fontSize: 13, color: item.color, textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}>
                      {item.name}
                    </div>
                    <div style={{ flex: 1, position: "relative", height: 24 }}>
                      <div style={{
                        width: `${width}%`,
                        height: "100%",
                        background: `${item.color}33`,
                        border: `1px solid ${item.color}66`,
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: 8,
                        transition: "width 0.5s ease",
                      }}>
                        <span style={{ fontSize: 11, color: item.color, fontFamily: "monospace", whiteSpace: "nowrap" }}>
                          {item.params}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 8, fontStyle: "italic" }}>
              * Stima non confermata. Scala logaritmica. Attenzione: parametri ≠ neuroni, il confronto e solo indicativo.
            </div>
          </div>

          {/* Open research */}
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16, borderLeft: `3px solid ${COLORS.highlight}` }}>
            <div style={{ color: COLORS.highlight, fontWeight: 600, fontSize: 13, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              DOMANDA APERTA DELLA RICERCA
            </div>
            <p style={{ color: COLORS.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
              <strong>Perche funzionano cosi bene?</strong> Nessuno lo sa davvero. I modelli hanno meno parametri
              delle sinapsi di un cervello umano, ma mostrano capacita emergenti non previste. Le "scaling laws"
              (Kaplan et al., 2020) mostrano che le prestazioni migliorano in modo prevedibile con piu dati e
              parametri, ma <em>perche</em> certe capacita emergano solo a certe scale resta un mistero attivo.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              <Tag color={COLORS.accent}>scaling laws</Tag>
              <Tag color={COLORS.accent2}>emergent abilities</Tag>
              <Tag color={COLORS.accent3}>interpretability</Tag>
              <Tag color={COLORS.highlight}>alignment</Tag>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

export default function App() {
  const [selectedRev, setSelectedRev] = useState(4);

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
          Sessione 1 · Atto 1
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          La Quinta Rivoluzione
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Cinque volte l'umanita ha cambiato il modo di lavorare. Ogni volta, chi ha abbracciato lo strumento ha vinto.
        </p>
      </div>

      {/* Interactive Timeline */}
      <Section title="📅 Timeline delle rivoluzioni" accent={COLORS.accent}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "16px 0 24px", position: "relative" }}>
          {REVOLUTIONS.map((rev, i) => (
            <TimelineNode
              key={rev.id}
              rev={rev}
              isSelected={selectedRev === rev.id}
              onClick={() => setSelectedRev(rev.id)}
              isLast={i === REVOLUTIONS.length - 1}
            />
          ))}
        </div>

        {/* Selected revolution detail */}
        <RevolutionDetail rev={REVOLUTIONS[selectedRev]} />
      </Section>

      {/* Pattern */}
      <Section title="🔄 Il pattern ricorrente" accent={COLORS.highlight}>
        <PatternCard />
      </Section>

      {/* Rabbit hole */}
      <RabbitHole />

      {/* Footer */}
      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Clicca su ogni rivoluzione per esplorare i dettagli · Sessione 1, Atto 1 (10 min)
      </div>
    </div>
  );
}
