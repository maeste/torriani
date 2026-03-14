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

const TAKEAWAY_PROMPT = `Sei il mio tutor personale per [MATERIA]. Ho un esame tra 2 settimane. Crea un piano di studio personalizzato partendo dagli argomenti che trovo piu difficili: [LISTA ARGOMENTI]. Per ogni argomento, suggerisci: 1) un'analogia per capirlo meglio, 2) una domanda che potrebbe uscire all'esame, 3) un trucco per ricordarlo.`;

export default function App() {
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [glowPulse, setGlowPulse] = useState(true);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(TAKEAWAY_PROMPT).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

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
        @keyframes glowPulse {
          0%, 100% { text-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(168,85,247,0.2); }
          50% { text-shadow: 0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(168,85,247,0.4), 0 0 120px rgba(255,107,53,0.2); }
        }
        @keyframes subtleGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: ${COLORS.accent}44; }
          50% { border-color: ${COLORS.accent}aa; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>
          Sessione 2 · Atto 5 · Chiusura
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Il Vostro Ruolo nella Quinta Rivoluzione
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          Cosa portate a casa oggi — e cosa fate domani
        </p>
      </div>

      {/* Hero Message */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.card} 0%, #0d1530 50%, ${COLORS.card} 100%)`,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: "48px 32px",
        marginBottom: 32,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(ellipse at center, ${COLORS.accent}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <h2 style={{
          fontSize: 36,
          fontWeight: 800,
          lineHeight: 1.2,
          margin: "0 0 20px",
          background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent3} 50%, ${COLORS.accent2} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: glowPulse ? "glowPulse 3s ease-in-out infinite" : "none",
          cursor: "pointer",
        }}
          onClick={() => setGlowPulse(!glowPulse)}
        >
          Chi usa l'IA sostituira chi non la usa.
        </h2>
        <p style={{
          color: COLORS.muted,
          fontSize: 17,
          maxWidth: 600,
          margin: "0 auto",
          lineHeight: 1.7,
          fontStyle: "italic",
        }}>
          Non e l'IA che sostituisce le persone.
          <br />
          Sono le persone che usano l'IA a sostituire quelle che non lo fanno.
        </p>
      </div>

      {/* Three Pillars */}
      <Section title="I tre pilastri" accent={COLORS.accent}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {/* Privacy */}
          <div style={{
            background: "#0a0e1a",
            borderRadius: 10,
            padding: 20,
            borderTop: `3px solid ${COLORS.accent2}`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🛡️</div>
            <h3 style={{ color: COLORS.accent2, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              Privacy e dati
            </h3>
            <p style={{ color: COLORS.highlight, fontSize: 13, fontStyle: "italic", marginBottom: 12 }}>
              "Cosa succede ai vostri prompt?"
            </p>
            <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li><strong style={{ color: COLORS.text }}>Mai dati personali</strong> nei prompt — nome, indirizzo, documenti</li>
              <li>Scegliete strumenti con <Tag color={COLORS.accent2}>policy chiare</Tag></li>
              <li><strong style={{ color: COLORS.text }}>Cloud vs locale</strong>: i modelli locali (Llama, Mistral) non inviano nulla a nessuno</li>
              <li>Quello che scrivete puo essere usato per <em>addestrare</em> il modello (opt-out!)</li>
            </ul>
          </div>

          {/* Pensiero critico */}
          <div style={{
            background: "#0a0e1a",
            borderRadius: 10,
            padding: 20,
            borderTop: `3px solid ${COLORS.accent}`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🧠</div>
            <h3 style={{ color: COLORS.accent, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              Pensiero critico
            </h3>
            <p style={{ color: COLORS.highlight, fontSize: 13, fontStyle: "italic", marginBottom: 12 }}>
              "L'IA amplifica, non sostituisce"
            </p>
            <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li>Amplifica sia il <strong style={{ color: COLORS.accent4 }}>buono</strong> che il <strong style={{ color: COLORS.accent2 }}>cattivo</strong></li>
              <li><strong style={{ color: COLORS.text }}>Verificate sempre</strong> — le allucinazioni sono convincenti</li>
              <li>Non smettete di pensare: l'IA e un <Tag color={COLORS.accent}>co-pilota</Tag>, non un pilota automatico</li>
              <li>Se non capite la risposta, non potete valutarla</li>
            </ul>
          </div>

          {/* Il vostro vantaggio */}
          <div style={{
            background: "#0a0e1a",
            borderRadius: 10,
            padding: 20,
            borderTop: `3px solid ${COLORS.accent4}`,
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
            <h3 style={{ color: COLORS.accent4, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
              Il vostro vantaggio
            </h3>
            <p style={{ color: COLORS.highlight, fontSize: 13, fontStyle: "italic", marginBottom: 12 }}>
              "La prima generazione"
            </p>
            <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.8, paddingLeft: 16, margin: 0 }}>
              <li>Siete la <strong style={{ color: COLORS.accent4 }}>prima generazione</strong> che ha questo strumento dal primo giorno di lavoro</li>
              <li>Chi inizia a usarlo <em>adesso</em> avra un vantaggio enorme</li>
              <li>Non serve essere programmatori — serve <Tag color={COLORS.accent4}>curiosita</Tag></li>
              <li><strong style={{ color: COLORS.text }}>Usatelo.</strong> Ogni giorno. Per tutto.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Take-Home Challenge */}
      <div style={{
        background: `linear-gradient(135deg, #0f1729 0%, #1a0f29 100%)`,
        border: `2px solid ${COLORS.accent3}`,
        borderRadius: 14,
        padding: "28px",
        marginBottom: 24,
        animation: "borderGlow 3s ease-in-out infinite",
        position: "relative",
      }}>
        <div style={{
          position: "absolute",
          top: -12,
          left: 24,
          background: COLORS.accent3,
          color: "#fff",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          padding: "4px 14px",
          borderRadius: 6,
        }}>
          Missione per stasera
        </div>
        <h3 style={{ color: COLORS.accent3, fontSize: 18, fontWeight: 700, marginTop: 8, marginBottom: 16 }}>
          🎯 Take-Home Challenge
        </h3>
        <p style={{ color: COLORS.text, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          Copiate questo prompt, aprite ChatGPT o Claude, sostituite <Tag color={COLORS.highlight}>[MATERIA]</Tag> e <Tag color={COLORS.highlight}>[LISTA ARGOMENTI]</Tag> con i vostri, e premete invio:
        </p>
        <div style={{
          background: "#000",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 8,
          padding: "16px 20px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: COLORS.accent,
          lineHeight: 1.7,
          marginBottom: 16,
          position: "relative",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          {TAKEAWAY_PROMPT}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? COLORS.accent4 : COLORS.accent3,
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'IBM Plex Sans', sans-serif",
              transition: "all 0.2s",
            }}
          >
            {copied ? "Copiato!" : "Copia prompt"}
          </button>
          <span style={{ color: COLORS.highlight, fontSize: 15, fontWeight: 600 }}>
            Provatelo stasera. Cambiera il modo in cui studiate.
          </span>
        </div>
      </div>

      {/* Materials Distribution */}
      <Section title="📦 Cosa portate a casa" accent={COLORS.accent4}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            {
              icon: "📄",
              title: "Materiale della lezione",
              desc: "Markdown + slides — tutto quello che abbiamo visto oggi, consultabile offline",
              color: COLORS.accent,
            },
            {
              icon: "📝",
              title: "Cheat sheet prompt engineering",
              desc: "Le tecniche chiave: ruolo, contesto, struttura, formato, catena di pensiero",
              color: COLORS.accent2,
            },
            {
              icon: "🔧",
              title: "Strumenti consigliati",
              desc: "ChatGPT (gratuito), Claude (gratuito), Llama via Ollama (locale, gratuito), Mistral Le Chat",
              color: COLORS.accent3,
            },
            {
              icon: "🔗",
              title: "Link e risorse",
              desc: "Repository GitHub con tutto il codice, link ai modelli, risorse per approfondire",
              color: COLORS.accent4,
            },
          ].map(item => (
            <div key={item.title} style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
              borderLeft: `3px solid ${item.color}`,
            }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div>
                <div style={{ color: item.color, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
                  {item.title}
                </div>
                <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Rabbit Hole - Collapsible */}
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
              Rabbit Hole — Per chi vuole andare oltre
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
            {/* AGI */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.highlight}`,
            }}>
              <h4 style={{ color: COLORS.highlight, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🌟 AGI — Artificial General Intelligence
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: COLORS.text }}>Cos'e</strong>: un'IA che puo fare <em>qualsiasi</em> compito
                intellettuale umano, non solo quelli per cui e stata addestrata.
                <br /><br />
                <strong style={{ color: COLORS.text }}>Quanto manca?</strong> Nessuno lo sa. Le stime vanno da 5 a 50 anni.
                Alcuni ricercatori pensano che ci siamo quasi, altri che mancano scoperte fondamentali.
                E il tema piu discusso nella tech mondiale in questo momento.
                <br /><br />
                <strong style={{ color: COLORS.text }}>Perche conta</strong>: se e quando arrivera, cambiera <em>tutto</em> —
                lavoro, economia, societa. Per questo servono persone che capiscano come funziona.
              </p>
            </div>

            {/* Open vs Closed */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.accent}`,
            }}>
              <h4 style={{ color: COLORS.accent, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                ⚔️ Open Source vs Closed Source
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <Tag color={COLORS.accent4}>Open Source</Tag>
                  </div>
                  <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                    <li><strong style={{ color: COLORS.text }}>Llama</strong> (Meta) — potentissimo, gratuito</li>
                    <li><strong style={{ color: COLORS.text }}>Mistral</strong> (Francia) — efficiente, europeo</li>
                    <li><strong style={{ color: COLORS.text }}>Qwen</strong> (Alibaba) — competitivo</li>
                    <li>Potete scaricarli e farli girare sul vostro PC</li>
                  </ul>
                </div>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <Tag color={COLORS.accent2}>Closed Source</Tag>
                  </div>
                  <ul style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                    <li><strong style={{ color: COLORS.text }}>GPT</strong> (OpenAI) — il piu noto</li>
                    <li><strong style={{ color: COLORS.text }}>Claude</strong> (Anthropic) — focus su sicurezza</li>
                    <li><strong style={{ color: COLORS.text }}>Gemini</strong> (Google) — integrato nell'ecosistema</li>
                    <li>Accessibili solo via API o interfaccia web</li>
                  </ul>
                </div>
              </div>
              <p style={{ color: COLORS.highlight, fontSize: 13, marginTop: 12, marginBottom: 0, fontStyle: "italic" }}>
                La battaglia e in corso. Il risultato determinera chi controlla l'IA del futuro.
              </p>
            </div>

            {/* Disciplines */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              marginBottom: 14,
              borderTop: `2px solid ${COLORS.accent3}`,
            }}>
              <h4 style={{ color: COLORS.accent3, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                🎓 Se questo vi ha incuriosito...
              </h4>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
                Per costruire il futuro dell'IA servono <em>tutte</em> queste discipline:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { name: "Informatica", sub: "gli algoritmi", color: COLORS.accent },
                  { name: "Matematica", sub: "l'algebra lineare e la statistica", color: COLORS.accent2 },
                  { name: "Fisica", sub: "l'hardware e l'ottimizzazione", color: COLORS.accent4 },
                  { name: "Filosofia", sub: "l'etica e la coscienza", color: COLORS.accent3 },
                  { name: "Linguistica", sub: "come funziona il linguaggio", color: COLORS.highlight },
                  { name: "Neuroscienze", sub: "come funziona il cervello", color: COLORS.accent },
                ].map(d => (
                  <div key={d.name} style={{
                    background: `${d.color}11`,
                    border: `1px solid ${d.color}33`,
                    borderRadius: 8,
                    padding: "8px 14px",
                    flex: "1 1 calc(33% - 8px)",
                    minWidth: 140,
                  }}>
                    <div style={{ color: d.color, fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11 }}>{d.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career paths */}
            <div style={{
              background: "#0a0e1a",
              borderRadius: 8,
              padding: 16,
              borderTop: `2px solid ${COLORS.accent4}`,
            }}>
              <h4 style={{ color: COLORS.accent4, fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                💼 Career Paths nell'IA
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { role: "ML Engineer", desc: "Costruisce e addestra i modelli", color: COLORS.accent },
                  { role: "Prompt Engineer", desc: "Ottimizza l'interazione uomo-IA", color: COLORS.accent2 },
                  { role: "AI Ethics Researcher", desc: "Studia impatto sociale e bias", color: COLORS.accent3 },
                  { role: "Data Scientist", desc: "Analizza dati e costruisce pipeline", color: COLORS.accent4 },
                  { role: "AI Product Manager", desc: "Progetta prodotti basati su IA", color: COLORS.highlight },
                  { role: "AI Safety Researcher", desc: "Lavora per rendere l'IA sicura", color: COLORS.accent },
                ].map(c => (
                  <div key={c.role} style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 6,
                    background: `${c.color}08`,
                    border: `1px solid ${c.color}22`,
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: c.color, flexShrink: 0,
                    }} />
                    <div>
                      <div style={{ color: c.color, fontWeight: 700, fontSize: 13 }}>{c.role}</div>
                      <div style={{ color: COLORS.muted, fontSize: 11 }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Final Closing */}
      <div style={{
        textAlign: "center",
        padding: "48px 24px",
        marginTop: 16,
      }}>
        <p style={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.5,
          color: COLORS.text,
          margin: "0 0 8px",
          animation: "subtleGlow 4s ease-in-out infinite",
        }}>
          La quinta rivoluzione e iniziata.
        </p>
        <p style={{
          fontSize: 20,
          fontWeight: 400,
          color: COLORS.accent,
          margin: 0,
          animation: "subtleGlow 4s ease-in-out infinite",
          animationDelay: "1s",
        }}>
          Voi decidete come usarla.
        </p>
        <div style={{
          marginTop: 24,
          width: 60,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`,
          margin: "24px auto 0",
        }} />
      </div>

      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8, paddingBottom: 32 }}>
        IIS AI — Introduzione all'Intelligenza Artificiale per le scuole superiori
      </div>
    </div>
  );
}
