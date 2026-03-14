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

const FIELDS = [
  {
    id: "medicina",
    emoji: "\ud83c\udfe5",
    name: "Medicina",
    color: COLORS.accent2,
    description: "L'IA puo' assistere nell'analisi dei sintomi, nella diagnosi differenziale e nella revisione della letteratura medica. Aiuta a correlare sintomi rari con condizioni poco comuni, accelerando il processo diagnostico.",
    prompt: "Un paziente di 45 anni presenta affaticamento cronico, dolori articolari e macchie cutanee. Elenca le 5 diagnosi differenziali piu' probabili, ordinate per frequenza, con i test diagnostici consigliati per ciascuna.",
    output: "Una lista strutturata di diagnosi (es. lupus, artrite reumatoide, fibromialgia...) con per ciascuna i test specifici da prescrivere e i criteri diagnostici.",
    ethical: "L'IA non sostituisce il medico. Ogni diagnosi deve essere confermata da un professionista. L'IA e' uno strumento di supporto, non di decisione clinica.",
  },
  {
    id: "giurisprudenza",
    emoji: "\u2696\ufe0f",
    name: "Giurisprudenza",
    color: COLORS.accent,
    description: "L'IA eccelle nell'analisi di contratti, nell'identificazione di clausole critiche e nel confronto tra normative. Puo' riassumere documenti legali complessi e segnalare potenziali rischi.",
    prompt: "Analizza questa clausola contrattuale: 'Il fornitore si riserva il diritto di modificare unilateralmente i termini del servizio con preavviso di 7 giorni.' Identifica i rischi per il cliente e suggerisci una riformulazione piu' equilibrata.",
    output: "Un'analisi che evidenzia lo squilibrio contrattuale, i rischi di modifiche sfavorevoli, e una proposta di clausola riformulata con tutele per entrambe le parti.",
    ethical: "L'IA non sostituisce il parere legale. Le analisi devono essere validate da un avvocato qualificato, soprattutto per decisioni con impatto economico o giuridico.",
  },
  {
    id: "lettere",
    emoji: "\ud83d\udcda",
    name: "Lettere/Filosofia",
    color: COLORS.accent3,
    description: "L'IA puo' confrontare correnti filosofiche, analizzare strutture narrative e assistere nella critica letteraria. E' particolarmente utile per trovare connessioni intertestuali e contestualizzare opere nel loro periodo storico.",
    prompt: "Confronta il concetto di 'liberta'' in Kant (autonomia morale) e Sartre (esistenzialismo). Usa esempi concreti e spiega come queste due visioni influenzano la nostra idea di responsabilita' personale oggi.",
    output: "Un saggio strutturato che contrappone l'imperativo categorico kantiano alla liberta' radicale sartriana, con esempi pratici (es. scelte etiche nel lavoro, social media) e una riflessione sulla rilevanza contemporanea.",
    ethical: "L'IA puo' sintetizzare e confrontare idee, ma il pensiero critico originale resta una competenza umana. Usatela come punto di partenza per la riflessione, non come sostituto.",
  },
  {
    id: "economia",
    emoji: "\ud83d\udcca",
    name: "Economia",
    color: COLORS.accent4,
    description: "L'IA trasforma l'analisi dei dati: puo' identificare trend, creare previsioni e analizzare scenari economici. Rende accessibile l'analisi quantitativa anche a chi non e' un data scientist.",
    prompt: "Ho i dati di vendita mensili di un negozio per gli ultimi 2 anni. Le vendite calano del 15% ogni gennaio e crescono del 30% a dicembre. Analizza la stagionalita', identifica il trend sottostante e suggerisci 3 strategie per ridurre il calo invernale.",
    output: "Un'analisi con decomposizione stagionale, identificazione del trend (crescita/stagnazione), e strategie concrete (es. promozioni invernali, diversificazione prodotti, programmi fedelta').",
    ethical: "I modelli predittivi dell'IA si basano su dati storici e non possono prevedere eventi imprevisti (pandemie, crisi). Ogni decisione economica richiede giudizio umano.",
  },
  {
    id: "arte",
    emoji: "\ud83c\udfa8",
    name: "Arte/Design",
    color: COLORS.highlight,
    description: "L'IA e' un potente strumento di brainstorming creativo: puo' generare concept, esplorare variazioni stilistiche e assistere nel processo ideativo. Non sostituisce la visione artistica, ma la amplifica.",
    prompt: "Devo creare un poster per un festival di musica jazz estivo. Il tema e' 'Jazz sotto le stelle'. Proponi 5 concept visivi diversi, specificando per ciascuno: palette colori, stile grafico, elemento centrale e mood evocato.",
    output: "Cinque proposte creative dettagliate, dalla fotografia notturna stilizzata all'illustrazione art-deco, ciascuna con palette specifica e rationale per il mood.",
    ethical: "L'IA generativa solleva questioni sul copyright e l'originalita'. Usatela per l'ideazione, ma il tocco finale e la visione artistica devono essere vostri.",
  },
  {
    id: "scienze",
    emoji: "\ud83d\udd2c",
    name: "Scienze",
    color: COLORS.accent,
    description: "L'IA assiste nella progettazione di esperimenti, nella verifica di ipotesi e nella revisione della letteratura scientifica. Puo' suggerire controlli, identificare variabili confondenti e proporre metodologie.",
    prompt: "Voglio testare se la musica classica migliora la concentrazione durante lo studio. Progetta un esperimento controllato: definisci ipotesi, variabili (indipendente, dipendente, controllate), campione, procedura e analisi statistica appropriata.",
    output: "Un protocollo sperimentale completo con gruppo di controllo, randomizzazione, misure della concentrazione (es. test cognitivi pre/post), dimensione del campione e test statistico suggerito (es. t-test).",
    ethical: "L'IA puo' suggerire protocolli, ma la validazione scientifica richiede peer review. I risultati devono sempre essere replicabili e verificabili.",
  },
  {
    id: "musica",
    emoji: "\ud83c\udfb5",
    name: "Musica",
    color: COLORS.accent2,
    description: "L'IA puo' analizzare strutture armoniche, suggerire progressioni di accordi e assistere nella composizione. E' utile per esplorare stili diversi e comprendere le regole della teoria musicale applicata.",
    prompt: "Analizza la progressione armonica I-vi-IV-V in Do maggiore. Spiega perche' funziona emotivamente, proponi 3 variazioni piu' sofisticate (con accordi di settima o sostituzioni) e per ciascuna descrivi l'effetto emotivo che produce.",
    output: "Un'analisi della funzione tonale di ogni accordo, seguita da variazioni come I-vi7-IVmaj7-V7, con spiegazione di come le tensioni armoniche aggiuntive creano colore e movimento.",
    ethical: "L'IA puo' insegnare teoria e suggerire idee, ma l'espressione musicale e' profondamente umana. L'originalita' nasce dalla vostra sensibilita', non da un algoritmo.",
  },
];

const COMPARISONS = [
  {
    task: "Ricerca bibliografica",
    before: "Ore in biblioteca",
    after: "Minuti con l'IA",
    icon: "\ud83d\udcda",
    factor: "20x",
  },
  {
    task: "Traduzione documento tecnico",
    before: "Giorni di lavoro",
    after: "Secondi",
    icon: "\ud83c\udf10",
    factor: "1000x",
  },
  {
    task: "Analisi dati di vendita",
    before: "Competenze Excel avanzate",
    after: "Una domanda in italiano",
    icon: "\ud83d\udcca",
    factor: "Accessibilita'",
  },
  {
    task: "Prima bozza di un testo",
    before: "Pagina bianca, ore",
    after: "Bozza in 30 secondi",
    icon: "\u270d\ufe0f",
    factor: "Iterazione rapida",
  },
];

export default function App() {
  const [selectedField, setSelectedField] = useState(0);

  const field = FIELDS[selectedField];

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
          Sessione 2 · Atto 3
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          L'IA per ogni futuro
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Scenari concreti per ogni campo professionale
        </p>
      </div>

      {/* Key Message Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.accent3}15)`,
        border: `1px solid ${COLORS.accent}44`,
        borderRadius: 16,
        padding: "28px 32px",
        marginBottom: 32,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent3}, ${COLORS.accent2})`,
        }} />
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.4,
          color: COLORS.text,
          marginBottom: 8,
        }}>
          Non e' uno strumento da informatici.
        </div>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.4,
          color: COLORS.accent,
        }}>
          E' il nuovo foglio di calcolo.
        </div>
        <p style={{
          color: COLORS.muted,
          fontSize: 14,
          marginTop: 12,
          marginBottom: 0,
          maxWidth: 500,
          margin: "12px auto 0",
        }}>
          Ogni professione puo' usarlo. Vediamo come.
        </p>
      </div>

      {/* Career Field Selector */}
      <Section title="Scegli il tuo futuro" accent={COLORS.accent3}>
        <div style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 20,
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {FIELDS.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setSelectedField(i)}
              style={{
                background: selectedField === i
                  ? `${f.color}22`
                  : COLORS.bg,
                border: `1px solid ${selectedField === i ? f.color : COLORS.border}`,
                borderRadius: 10,
                padding: "12px 16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 90,
                transition: "all 0.2s ease",
                transform: selectedField === i ? "scale(1.05)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 28 }}>{f.emoji}</span>
              <span style={{
                fontSize: 11,
                fontFamily: "'JetBrains Mono', monospace",
                color: selectedField === i ? f.color : COLORS.muted,
                fontWeight: selectedField === i ? 700 : 400,
              }}>
                {f.name}
              </span>
            </button>
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <div style={{
          background: COLORS.bg,
          borderRadius: 12,
          padding: 24,
          border: `1px solid ${field.color}33`,
          transition: "all 0.3s ease",
        }}>
          {/* Field Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ fontSize: 48 }}>{field.emoji}</span>
            <div>
              <h3 style={{ margin: 0, fontSize: 22, color: field.color, fontWeight: 700 }}>
                {field.name}
              </h3>
              <Tag color={field.color}>campo professionale</Tag>
            </div>
          </div>

          {/* How AI Can Help */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              color: COLORS.accent,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Come l'IA puo' aiutare
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
              {field.description}
            </p>
          </div>

          {/* Example Prompt */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              color: COLORS.highlight,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Esempio di prompt
            </div>
            <Formula>{field.prompt}</Formula>
          </div>

          {/* Expected Output */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              color: COLORS.accent4,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 8,
            }}>
              Cosa otterresti
            </div>
            <p style={{
              color: COLORS.text,
              fontSize: 14,
              lineHeight: 1.7,
              margin: 0,
              background: `${COLORS.accent4}11`,
              borderRadius: 8,
              padding: "12px 16px",
              borderLeft: `3px solid ${COLORS.accent4}44`,
            }}>
              {field.output}
            </p>
          </div>

          {/* Ethical Note */}
          <div style={{
            background: `${COLORS.accent2}11`,
            border: `1px solid ${COLORS.accent2}33`,
            borderRadius: 8,
            padding: "12px 16px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{"\u26a0\ufe0f"}</span>
            <div>
              <div style={{
                color: COLORS.accent2,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}>
                Nota etica
              </div>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                {field.ethical}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Before/After Comparison */}
      <Section title="Prima vs Dopo: cosa cambia con l'IA" accent={COLORS.highlight}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {COMPARISONS.map((comp) => (
            <div key={comp.task} style={{
              background: COLORS.bg,
              borderRadius: 10,
              padding: 16,
              border: `1px solid ${COLORS.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 20 }}>{comp.icon}</span>
                <span style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.text,
                }}>
                  {comp.task}
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
                <div style={{
                  flex: 1,
                  background: `${COLORS.accent2}11`,
                  borderRadius: 6,
                  padding: "8px 10px",
                  borderTop: `2px solid ${COLORS.accent2}`,
                }}>
                  <div style={{
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.accent2,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}>
                    Prima
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.muted }}>
                    {comp.before}
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  color: COLORS.accent4,
                  fontSize: 18,
                  fontWeight: 700,
                }}>
                  {"\u2192"}
                </div>
                <div style={{
                  flex: 1,
                  background: `${COLORS.accent4}11`,
                  borderRadius: 6,
                  padding: "8px 10px",
                  borderTop: `2px solid ${COLORS.accent4}`,
                }}>
                  <div style={{
                    fontSize: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: COLORS.accent4,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    marginBottom: 4,
                  }}>
                    Con l'IA
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.text }}>
                    {comp.after}
                  </div>
                </div>
              </div>
              <div style={{
                textAlign: "center",
                marginTop: 8,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                color: COLORS.highlight,
              }}>
                {comp.factor}
              </div>
            </div>
          ))}
        </div>
        <p style={{
          color: COLORS.muted,
          fontSize: 12,
          textAlign: "center",
          marginTop: 16,
          marginBottom: 0,
          fontStyle: "italic",
        }}>
          L'IA non elimina il lavoro — elimina la parte ripetitiva, lasciandovi la parte creativa.
        </p>
      </Section>

      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Sessione 2 · Atto 3 · L'IA per ogni futuro — scenari per campo
      </div>
    </div>
  );
}
