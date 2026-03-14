import { useState, useMemo, useCallback, useRef } from "react";
import {
  ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Legend,
} from "recharts";

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

// Seeded pseudo-random number generator for reproducible data
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// Generate fixed data points: y = 1.5x + 2 + noise
function generateData() {
  const rng = seededRandom(42);
  const points = [];
  for (let i = 0; i < 30; i++) {
    const x = 0.5 + rng() * 9.5; // range ~0.5 to 10
    const noise = (rng() - 0.5) * 3.0;
    const y = 1.5 * x + 2 + noise;
    points.push({ x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 });
  }
  return points;
}

const DATA_POINTS = generateData();

// Compute optimal slope and intercept via least squares
function computeOptimal(points) {
  const n = points.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumXX += p.x * p.x;
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

const OPTIMAL = computeOptimal(DATA_POINTS);

function computeMSE(points, slope, intercept) {
  let sum = 0;
  for (const p of points) {
    const err = p.y - (slope * p.x + intercept);
    sum += err * err;
  }
  return sum / points.length;
}

function computeR2(points, slope, intercept) {
  let meanY = 0;
  for (const p of points) meanY += p.y;
  meanY /= points.length;
  let ssRes = 0, ssTot = 0;
  for (const p of points) {
    const pred = slope * p.x + intercept;
    ssRes += (p.y - pred) * (p.y - pred);
    ssTot += (p.y - meanY) * (p.y - meanY);
  }
  return 1 - ssRes / ssTot;
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 12,
        fontFamily: "monospace",
      }}>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || COLORS.text }}>
            {p.name}: {typeof p.value === "number" ? p.value.toFixed(2) : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function App() {
  const [slope, setSlope] = useState(0.5);
  const [intercept, setIntercept] = useState(0.0);
  const [isTraining, setIsTraining] = useState(false);
  const [trainStep, setTrainStep] = useState(0);
  const [lossHistory, setLossHistory] = useState([]);
  const [trainingDone, setTrainingDone] = useState(false);
  const [rabbitHoleOpen, setRabbitHoleOpen] = useState(false);
  const intervalRef = useRef(null);
  const paramsRef = useRef({ slope: 0.5, intercept: 0.0, step: 0 });

  const mse = useMemo(() => computeMSE(DATA_POINTS, slope, intercept), [slope, intercept]);
  const r2 = useMemo(() => computeR2(DATA_POINTS, slope, intercept), [slope, intercept]);

  // Build line data for the chart
  const lineData = useMemo(() => {
    const xs = [0, 2, 4, 6, 8, 10, 12];
    return xs.map(x => ({ x, lineY: slope * x + intercept }));
  }, [slope, intercept]);

  // Merge scatter + line into one dataset for ComposedChart
  const chartData = useMemo(() => {
    const merged = [];
    // Add data points
    for (const p of DATA_POINTS) {
      merged.push({ x: p.x, punti: p.y });
    }
    // Add line points
    for (const l of lineData) {
      merged.push({ x: l.x, linea: l.lineY });
    }
    // Sort by x so line renders properly
    merged.sort((a, b) => a.x - b.x);
    return merged;
  }, [lineData]);

  const handleTrain = useCallback(() => {
    if (isTraining) return;

    setIsTraining(true);
    setTrainingDone(false);
    setLossHistory([]);
    setTrainStep(0);

    const lr = 0.01;
    const totalSteps = 15;
    let currentSlope = slope;
    let currentIntercept = intercept;
    let step = 0;
    const history = [];

    paramsRef.current = { slope: currentSlope, intercept: currentIntercept, step: 0 };

    // Record initial loss
    const initialMSE = computeMSE(DATA_POINTS, currentSlope, currentIntercept);
    history.push({ step: 0, MSE: Math.round(initialMSE * 1000) / 1000 });
    setLossHistory([...history]);

    intervalRef.current = setInterval(() => {
      step += 1;

      // Compute gradients of MSE w.r.t. slope and intercept
      let gradSlope = 0;
      let gradIntercept = 0;
      const n = DATA_POINTS.length;
      for (const p of DATA_POINTS) {
        const pred = currentSlope * p.x + currentIntercept;
        const err = pred - p.y;
        gradSlope += (2 / n) * err * p.x;
        gradIntercept += (2 / n) * err;
      }

      currentSlope -= lr * gradSlope;
      currentIntercept -= lr * gradIntercept;

      const stepMSE = computeMSE(DATA_POINTS, currentSlope, currentIntercept);
      history.push({ step, MSE: Math.round(stepMSE * 1000) / 1000 });

      setSlope(Math.round(currentSlope * 1000) / 1000);
      setIntercept(Math.round(currentIntercept * 1000) / 1000);
      setTrainStep(step);
      setLossHistory([...history]);

      paramsRef.current = { slope: currentSlope, intercept: currentIntercept, step };

      if (step >= totalSteps) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsTraining(false);
        setTrainingDone(true);
      }
    }, 400);
  }, [isTraining, slope, intercept]);

  const handleReset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSlope(0.5);
    setIntercept(0.0);
    setIsTraining(false);
    setTrainStep(0);
    setLossHistory([]);
    setTrainingDone(false);
  }, []);

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
          Deep Dive - Come impara una macchina
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.2 }}>
          Regressione Lineare & Gradient Descent
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 16, maxWidth: 600, margin: "0 auto" }}>
          L'essenza del machine learning in un grafico interattivo
        </p>
      </div>

      {/* Analogia iniziale */}
      <Section title="L'idea" accent={COLORS.highlight}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16 }}>
            <div style={{ color: COLORS.highlight, fontWeight: 600, marginBottom: 8 }}>
              Cosa fa un modello?
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              Immagina di avere dei punti su un grafico. Il modello cerca la <strong style={{ color: COLORS.text }}>linea che li descrive meglio</strong>.
              Prova, misura quanto sbaglia, corregge. Ripete.
            </p>
          </div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 16 }}>
            <div style={{ color: COLORS.accent2, fontWeight: 600, marginBottom: 8 }}>
              Perche ci interessa?
            </div>
            <p style={{ color: COLORS.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.text }}>Ogni rete neurale</strong>, inclusi GPT e Claude, impara esattamente cosi: provare, misurare l'errore, correggere.
              Solo con <em>molti piu</em> parametri.
            </p>
          </div>
        </div>
      </Section>

      {/* Scatter + Line Chart */}
      <Section title="Prova tu! Muovi gli slider" accent={COLORS.accent}>
        <div style={{ marginBottom: 16 }}>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis
                dataKey="x"
                type="number"
                domain={[0, 12]}
                stroke={COLORS.muted}
                tick={{ fontSize: 11, fill: COLORS.muted }}
                label={{ value: "x", position: "insideBottom", offset: -10, fill: COLORS.muted, fontSize: 12 }}
              />
              <YAxis
                type="number"
                domain={[-2, 22]}
                stroke={COLORS.muted}
                tick={{ fontSize: 11, fill: COLORS.muted }}
                label={{ value: "y", angle: -90, position: "insideLeft", fill: COLORS.muted, fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Scatter
                name="Dati"
                data={DATA_POINTS.map(p => ({ x: p.x, punti: p.y }))}
                dataKey="punti"
                fill="#FFD700"
                r={5}
                fillOpacity={0.9}
              />
              <Line
                name="Retta"
                data={lineData.map(l => ({ x: l.x, linea: l.lineY }))}
                dataKey="linea"
                stroke={COLORS.accent4}
                strokeWidth={2.5}
                dot={false}
                type="linear"
                connectNulls
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Slider controls */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ color: COLORS.muted, fontSize: 13, fontFamily: "monospace", display: "block", marginBottom: 4 }}>
              Pendenza (slope): <strong style={{ color: COLORS.accent }}>{slope.toFixed(2)}</strong>
            </label>
            <input
              type="range"
              min={0.1}
              max={3.0}
              step={0.05}
              value={slope}
              onChange={e => { if (!isTraining) setSlope(Number(e.target.value)); }}
              disabled={isTraining}
              style={{ width: "100%", accentColor: COLORS.accent }}
            />
          </div>
          <div>
            <label style={{ color: COLORS.muted, fontSize: 13, fontFamily: "monospace", display: "block", marginBottom: 4 }}>
              Intercetta (intercept): <strong style={{ color: COLORS.accent2 }}>{intercept.toFixed(2)}</strong>
            </label>
            <input
              type="range"
              min={-2.0}
              max={5.0}
              step={0.1}
              value={intercept}
              onChange={e => { if (!isTraining) setIntercept(Number(e.target.value)); }}
              disabled={isTraining}
              style={{ width: "100%", accentColor: COLORS.accent2 }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>
              MSE (errore)
            </div>
            <div style={{ color: mse < 3 ? COLORS.accent4 : mse < 10 ? COLORS.highlight : COLORS.accent2, fontWeight: 700, fontSize: 20, fontFamily: "monospace" }}>
              {mse.toFixed(3)}
            </div>
          </div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>
              R-squared
            </div>
            <div style={{ color: r2 > 0.8 ? COLORS.accent4 : r2 > 0.5 ? COLORS.highlight : COLORS.accent2, fontWeight: 700, fontSize: 20, fontFamily: "monospace" }}>
              {r2.toFixed(4)}
            </div>
          </div>
          <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>
              Equazione
            </div>
            <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 14, fontFamily: "monospace" }}>
              y = {slope.toFixed(2)}x + {intercept.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Train + Reset Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handleTrain}
            disabled={isTraining}
            style={{
              background: isTraining ? COLORS.border : COLORS.accent4,
              color: isTraining ? COLORS.muted : "#000",
              border: "none",
              borderRadius: 8,
              padding: "12px 28px",
              fontSize: 16,
              fontWeight: 700,
              cursor: isTraining ? "not-allowed" : "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: 1,
              transition: "all 0.2s",
            }}
          >
            {isTraining ? `Addestramento... step ${trainStep}/15` : "Addestra!"}
          </button>
          <button
            onClick={handleReset}
            style={{
              background: "transparent",
              color: COLORS.muted,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 8,
              padding: "12px 20px",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              transition: "all 0.2s",
            }}
          >
            Reset
          </button>
        </div>
        {isTraining && (
          <div style={{ marginTop: 8, color: COLORS.accent, fontSize: 13, fontFamily: "monospace" }}>
            Step {trainStep}/15 - La macchina sta imparando...
          </div>
        )}
      </Section>

      {/* Loss History Chart */}
      {lossHistory.length > 0 && (
        <Section title="Storico dell'errore (MSE) durante il training" accent="#FF6347">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={lossHistory} margin={{ top: 5, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis
                dataKey="step"
                stroke={COLORS.muted}
                tick={{ fontSize: 11, fill: COLORS.muted }}
                label={{ value: "Step", position: "insideBottom", offset: -10, fill: COLORS.muted, fontSize: 12 }}
              />
              <YAxis
                stroke={COLORS.muted}
                tick={{ fontSize: 11, fill: COLORS.muted }}
                label={{ value: "MSE", angle: -90, position: "insideLeft", fill: COLORS.muted, fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="MSE"
                stroke="#FF6347"
                strokeWidth={2.5}
                dot={{ fill: "#FF6347", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ color: COLORS.muted, fontSize: 13, margin: "8px 0 0", lineHeight: 1.5 }}>
            L'errore scende a ogni step. Quando si appiattisce, il modello ha <strong style={{ color: COLORS.text }}>converguto</strong>:
            ha trovato la migliore linea possibile.
          </p>
        </Section>
      )}

      {/* Key message after training */}
      {trainingDone && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.accent4}15, ${COLORS.accent}15)`,
          border: `2px solid ${COLORS.accent4}`,
          borderRadius: 12,
          padding: 24,
          marginBottom: 24,
          textAlign: "center",
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, marginBottom: 12, lineHeight: 1.4 }}>
            Tutto il machine learning e questo:
            <br />
            <span style={{ color: COLORS.accent4 }}>provare, misurare l'errore, correggere.</span>
            <br />
            Miliardi di volte.
          </div>
          <div style={{ color: COLORS.muted, fontSize: 14, lineHeight: 1.6 }}>
            La nostra retta aveva <Tag color={COLORS.accent}>2 parametri</Tag> (pendenza e intercetta).
            <br />
            <strong style={{ color: COLORS.highlight }}>GPT-4</strong> ne ha <Tag color={COLORS.accent2}>~1.8 trilioni</Tag>.
            Training costato <Tag color={COLORS.accent3}>~$100M</Tag>.
            <br />
            Ha fatto questo stesso ciclo con <strong style={{ color: COLORS.text }}>13 trilioni di token</strong>.
          </div>
          <div style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
          }}>
            <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 10 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>Noi oggi</div>
              <div style={{ color: COLORS.accent4, fontWeight: 700 }}>2 parametri</div>
              <div style={{ color: COLORS.muted, fontSize: 11 }}>15 step</div>
            </div>
            <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 10 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>GPT-4</div>
              <div style={{ color: COLORS.accent2, fontWeight: 700 }}>1.8T parametri</div>
              <div style={{ color: COLORS.muted, fontSize: 11 }}>~$100M di training</div>
            </div>
            <div style={{ background: "#0a0e1a", borderRadius: 8, padding: 10 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: COLORS.muted }}>Llama-3 405B</div>
              <div style={{ color: COLORS.accent3, fontWeight: 700 }}>405B parametri</div>
              <div style={{ color: COLORS.muted, fontSize: 11 }}>15T token</div>
            </div>
          </div>
        </div>
      )}

      {/* Rabbit Hole */}
      <Section title="Tana del bianconiglio" accent={COLORS.accent3}>
        <button
          onClick={() => setRabbitHoleOpen(!rabbitHoleOpen)}
          style={{
            background: "transparent",
            color: COLORS.accent3,
            border: `1px solid ${COLORS.accent3}44`,
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            width: "100%",
            textAlign: "left",
            transition: "all 0.2s",
          }}
        >
          {rabbitHoleOpen ? "Chiudi" : "Apri"} - Formule e dettagli tecnici {rabbitHoleOpen ? "^" : "v"}
        </button>

        {rabbitHoleOpen && (
          <div style={{ marginTop: 16 }}>
            {/* MSE Formula */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ color: COLORS.accent, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
                Mean Squared Error (MSE)
              </h3>
              <Formula>MSE = (1/n) * SUM( (y_i - (mx_i + b))^2 )</Formula>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6 }}>
                Per ogni punto, calcoliamo la differenza tra il valore reale <Tag color={COLORS.highlight}>y_i</Tag> e
                quello predetto <Tag color={COLORS.accent4}>mx_i + b</Tag>. Eleviamo al quadrato (cosi gli errori negativi contano)
                e facciamo la media. Piu e basso, meglio e.
              </p>
            </div>

            {/* Gradient Descent Formula */}
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ color: COLORS.accent2, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
                Gradient Descent
              </h3>
              <Formula>m_new = m_old - lr * dMSE/dm</Formula>
              <Formula>b_new = b_old - lr * dMSE/db</Formula>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.6 }}>
                Il <Tag color={COLORS.accent2}>gradiente</Tag> ci dice in che direzione l'errore cresce.
                Noi andiamo nella direzione opposta, moltiplicando per un <Tag color={COLORS.accent}>learning rate</Tag> (lr)
                che controlla quanto grande e il passo.
                <br /><br />
                Se il learning rate e troppo alto, il modello "salta" avanti e indietro senza convergere.
                Se e troppo basso, ci mette una vita a imparare.
                Noi abbiamo usato <strong style={{ color: COLORS.text }}>lr = 0.01</strong>.
              </p>
            </div>

            {/* Training costs comparison */}
            <div>
              <h3 style={{ color: COLORS.accent3, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
                Costi di training a confronto
              </h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "monospace" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Modello", "Parametri", "Token", "Costo stimato"].map(h => (
                      <th key={h} style={{ color: COLORS.muted, padding: "8px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Llama-3 8B", "8B", "15T", "~$2M"],
                    ["Llama-3 70B", "70B", "15T", "~$20M"],
                    ["Llama-3 405B", "405B", "15T", "~$80M"],
                    ["GPT-4", "~1.8T (stima)", "13T", "~$100M"],
                    ["Claude 3.5 Sonnet", "non divulgato", "non divulgato", "non divulgato"],
                    ["Gemini Ultra", "~1.5T (stima)", "non divulgato", "~$190M (stima)"],
                  ].map(([model, params, tokens, cost], i) => (
                    <tr key={i} style={{
                      borderBottom: `1px solid ${COLORS.border}22`,
                      background: i % 2 === 0 ? "transparent" : "#00000022",
                    }}>
                      <td style={{ padding: "8px 12px", color: COLORS.text }}>{model}</td>
                      <td style={{ padding: "8px 12px", color: COLORS.accent }}>{params}</td>
                      <td style={{ padding: "8px 12px", color: COLORS.highlight }}>{tokens}</td>
                      <td style={{ padding: "8px 12px", color: COLORS.accent2 }}>{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 8, lineHeight: 1.5 }}>
                Nota: i costi sono stime basate su informazioni pubbliche e leak. I valori reali per modelli
                proprietari non sono confermati. I parametri di GPT-4 derivano da leak non ufficiali.
              </p>
            </div>
          </div>
        )}
      </Section>

      <div style={{ textAlign: "center", color: COLORS.muted, fontSize: 12, fontFamily: "monospace", marginTop: 8 }}>
        Contenuto derivato da how_llms_work.ipynb - Regressione lineare e gradient descent per le scuole superiori italiane
      </div>
    </div>
  );
}
