import React, { useState } from "react";
import { Sparkles, BarChart2, Calculator, Play, AlertCircle, RefreshCw } from "lucide-react";

// ==================== FINANCIAL RATIO SIMULATOR ====================
export function FinancialRatioSimulator() {
  const [selectedRatio, setSelectedRatio] = useState<"current" | "solvency" | "gp" | "debt">("current");

  const ratioData = {
    current: {
      title: "Current Ratio (Liquidity Measure)",
      formula: "Current Assets / Current Liabilities",
      explanation: "Measures a company's ability to cover its short-term obligations. A ratio above 1.0 indicates good liquidity posture.",
      safeMix: [
        { year: "2023", value: 1.15 },
        { year: "2024", value: 1.34 },
        { year: "2025", value: 1.48 }
      ],
      thatta: [
        { year: "2023", value: 1.28 },
        { year: "2024", value: 1.62 },
        { year: "2025", value: 1.85 }
      ],
      insight: "Thatta Cement demonstrates stronger liquidity year-over-year. Safe Mix maintains a tight posture but successfully manages working capital loops."
    },
    solvency: {
      title: "Solvency Ratio (Asset to Debt)",
      formula: "Total Assets / Total Liabilities",
      explanation: "Evaluates long-term stability. Higher ratios represent lower leverage risk.",
      safeMix: [
        { year: "2023", value: 1.87 },
        { year: "2024", value: 1.95 },
        { year: "2025", value: 2.10 }
      ],
      thatta: [
        { year: "2023", value: 2.45 },
        { year: "2024", value: 2.78 },
        { year: "2025", value: 3.12 }
      ],
      insight: "Thatta has significant asset-backed security with ultra-low liability exposure, making it highly secure for debt investors."
    },
    gp: {
      title: "Gross Profit Margin (%)",
      formula: "(Gross Profit / Sales) * 100",
      explanation: "Represents manufacturing markup efficiency before operational overhead.",
      safeMix: [
        { year: "2023", value: 14.2 },
        { year: "2024", value: 16.5 },
        { year: "2025", value: 15.8 }
      ],
      thatta: [
        { year: "2023", value: 19.8 },
        { year: "2024", value: 22.4 },
        { year: "2025", value: 21.2 }
      ],
      insight: "Thatta benefits from scale economics in fuel procurement, retaining gross margins on average 5% higher than Safe Mix."
    },
    debt: {
      title: "Debt-to-Equity Ratio",
      formula: "Total Debt / Shareholders' Equity",
      explanation: "Measures capital structure leverage. Lower counts indicate finance backed primarily by equity.",
      safeMix: [
        { year: "2023", value: 0.52 },
        { year: "2024", value: 0.44 },
        { year: "2025", value: 0.38 }
      ],
      thatta: [
        { year: "2023", value: 0.31 },
        { year: "2024", value: 0.22 },
        { year: "2025", value: 0.18 }
      ],
      insight: "Both cement entities successfully deleveraged, lowering risk exposure in the current high-rate environment of 2024–2025."
    }
  };

  const currentInfo = ratioData[selectedRatio];

  return (
    <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm mt-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-5 h-5 text-teal-700" />
        <h4 className="text-sm font-data-label font-semibold uppercase tracking-wider text-ink-800">
          Interactive Ratio Explorer
        </h4>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(ratioData).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedRatio(key as any)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
              selectedRatio === key
                ? "bg-teal-700 text-white shadow-sm font-medium"
                : "bg-white/60 text-ink-800 hover:bg-white"
            }`}
          >
            {key === "current" && "Current Ratio"}
            {key === "solvency" && "Solvency Position"}
            {key === "gp" && "Gross Profit Margin"}
            {key === "debt" && "Debt to Equity"}
          </button>
        ))}
      </div>

      <div className="bg-white/80 rounded-xl p-4 border border-white mb-4">
        <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
          <h5 className="text-base font-semibold text-ink-950">{currentInfo.title}</h5>
          <code className="text-[11px] bg-sky-300/30 text-ink-950 px-2.5 py-0.5 rounded-full font-mono">
            {currentInfo.formula}
          </code>
        </div>
        <p className="text-xs text-ink-600 mb-4">{currentInfo.explanation}</p>

        {/* Graphical Representation */}
        <div className="grid grid-cols-2 gap-4">
          {/* Safe Mix Column */}
          <div className="bg-mist-200/40 p-3 rounded-lg border border-white flex flex-col justify-between">
            <span className="text-[11px] text-ink-600 font-data-label uppercase tracking-widest block mb-2">
              🟢 Safe Mix Concrete
            </span>
            <div className="flex items-end justify-between h-20 gap-2 px-2 border-b border-ink-950/20 pb-1">
              {currentInfo.safeMix.map((d) => {
                // Determine height relative to max range (3.5 max value)
                const heightPercent = Math.min((d.value / 3.5) * 100, 100);
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center">
                    <span className="text-[10px] text-slate-700 font-mono mb-1">{d.value}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-teal-700/60 rounded-t-sm transition-all duration-500"
                    />
                    <span className="text-[9px] text-slate-500 mt-1">{d.year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thatta Cement Column */}
          <div className="bg-mist-200/40 p-3 rounded-lg border border-white flex flex-col justify-between">
            <span className="text-[11px] text-ink-600 font-data-label uppercase tracking-widest block mb-2">
              🔵 Thatta Cement
            </span>
            <div className="flex items-end justify-between h-20 gap-2 px-2 border-b border-ink-950/20 pb-1">
              {currentInfo.thatta.map((d) => {
                const heightPercent = Math.min((d.value / 3.5) * 100, 100);
                return (
                  <div key={d.year} className="flex-1 flex flex-col items-center">
                    <span className="text-[10px] text-slate-700 font-mono mb-1">{d.value}</span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-blue-700/60 rounded-t-sm transition-all duration-500"
                    />
                    <span className="text-[9px] text-slate-500 mt-1">{d.year}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-teal-700/5 rounded-xl border border-teal-700/10 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
        <p className="text-xs text-teal-700 leading-normal font-sans">
          <strong>Key Insight:</strong> {currentInfo.insight}
        </p>
      </div>
    </div>
  );
}

// ==================== IMDB SUCCESS PREDICTOR WIDGET ====================
export function IMDBCalculatorSimulator() {
  const [budget, setBudget] = useState<number>(45); // Millions USD
  const [runtime, setRuntime] = useState<number>(118); // Minutes
  const [genre, setGenre] = useState<string>("Drama");
  const [hasFamousDirector, setHasFamousDirector] = useState<boolean>(true);
  const [hasFamousStar, setHasFamousStar] = useState<boolean>(false);
  
  const [calculating, setCalculating] = useState(false);
  const [predictionResult, setPredictionResult] = useState<{
    score: number;
    probability: number;
    status: "HIT" | "STABLE" | "FLOP";
    insights: string;
  } | null>(null);

  const handlePredict = () => {
    setCalculating(true);
    setTimeout(() => {
      // Numerical logistic estimation logic based on real model features
      // Base score 6.2
      let baseScore = 6.2;
      
      // Feature modifiers
      if (genre === "Drama") baseScore += 0.5;
      else if (genre === "Sci-Fi" || genre === "Action") baseScore += 0.2;
      else if (genre === "Comedy") baseScore -= 0.3;
      else if (genre === "Horror") baseScore -= 0.6; // Horror has high variance but lower average rating

      // Runtime sweetest spot (100 - 130 mins)
      if (runtime >= 105 && runtime <= 130) baseScore += 0.4;
      else if (runtime > 150) baseScore -= 0.3; // Excessive length penalty on IMDb
      else if (runtime < 90) baseScore -= 0.2;

      // Budget effects (extreme budgets cause harder success rating constraints)
      if (budget > 120) {
        baseScore -= 0.1; // Blockbuster fatigue
      } else if (budget >= 15 && budget <= 60) {
        baseScore += 0.3; // High return ratio sweet spot
      }

      if (hasFamousDirector) baseScore += 0.6;
      if (hasFamousStar) baseScore += 0.3;

      baseScore = parseFloat(Math.min(9.2, Math.max(3.1, baseScore)).toFixed(1));

      // Probability mapping via simulated sigmoid equation
      const linearCombo = (baseScore - 7.0) * 1.5;
      const prob = parseFloat((1 / (1 + Math.exp(-linearCombo)) * 100).toFixed(1));

      let testStatus: "HIT" | "STABLE" | "FLOP" = "STABLE";
      if (baseScore >= 7.0 && prob >= 65) {
        testStatus = "HIT";
      } else if (baseScore < 6.0) {
        testStatus = "FLOP";
      }

      let movieInsight = "";
      if (testStatus === "HIT") {
        movieInsight = `Strong prospective value! ${genre} combined with efficient runtime and star-power maximizes IMDb reviews. Likely to achieve peak return on investment.`;
      } else if (testStatus === "STABLE") {
        movieInsight = "Solid operational threshold. Fits base performance indicators but requires highly focused marketing campaigns to offset low margin risks.";
      } else {
        movieInsight = "Model signals elevated risk factors. Typical audience demographics react poorly to high expenses paired with suboptimal duration constraints.";
      }

      setPredictionResult({
        score: baseScore,
        probability: prob,
        status: testStatus,
        insights: movieInsight
      });
      setCalculating(false);
    }, 850);
  };

  return (
    <div className="bg-white/40 p-5 rounded-2xl border border-white/60 shadow-sm mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-blue-700" />
        <h4 className="text-sm font-data-label font-semibold uppercase tracking-wider text-ink-800">
          Live Model Simulator
        </h4>
      </div>

      <div className="space-y-3 mb-5">
        {/* Input 1 */}
        <div>
          <label className="block text-xs font-data-label text-slate-600 mb-1">
            ESTIMATED BUDGET: ${budget}M USD
          </label>
          <input
            type="range"
            min="1"
            max="250"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        {/* Input 2 */}
        <div>
          <label className="block text-xs font-data-label text-slate-600 mb-1">
            RUNTIME DURATION: {runtime} MINS
          </label>
          <input
            type="range"
            min="70"
            max="180"
            value={runtime}
            onChange={(e) => setRuntime(Number(e.target.value))}
            className="w-full accent-blue-700"
          />
        </div>

        {/* Grid Selectors */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-data-label text-slate-600 mb-1 font-semibold">GENRE</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full text-xs p-2 rounded-lg bg-white border border-slate-200 outline-none focus:border-blue-700 text-ink-950 font-sans"
            >
              <option value="Drama">Drama</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
            </select>
          </div>

          <div className="flex flex-col justify-center">
            <span className="block text-xs font-data-label text-slate-600 mb-1.5 font-semibold">ATTRIBUTES</span>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs text-ink-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFamousDirector}
                  onChange={(e) => setHasFamousDirector(e.target.checked)}
                  className="rounded text-blue-700 border-slate-300 pointer-events-auto"
                />
                Acclaimed Director
              </label>
              <label className="flex items-center gap-2 text-xs text-ink-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFamousStar}
                  onChange={(e) => setHasFamousStar(e.target.checked)}
                  className="rounded text-blue-700 border-slate-300 pointer-events-auto"
                />
                Lead Superstar
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handlePredict}
        disabled={calculating}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2 px-4 text-xs font-medium font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        {calculating ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            Recalculating logistic equations...
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-current" />
            Execute Model Query
          </>
        )}
      </button>

      {predictionResult && !calculating && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-white/80 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase font-data-label tracking-wide text-slate-500 block">
                Estimated rating
              </span>
              <span className="text-2xl font-bold text-ink-950">{predictionResult.score} <span className="text-xs text-slate-500">/ 10</span></span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-data-label tracking-wide text-slate-500 block">
                Success probability
              </span>
              <span className="text-2xl font-bold text-blue-700">{predictionResult.probability}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 pt-2 mt-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              predictionResult.status === "HIT"
                ? "bg-green-100 text-green-700 border border-green-200"
                : predictionResult.status === "STABLE"
                ? "bg-amber-100 text-amber-700 border border-amber-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}>
              {predictionResult.status === "HIT" && "Will be a HIT (>= 7.0)"}
              {predictionResult.status === "STABLE" && "STABLE PERFORMER"}
              {predictionResult.status === "FLOP" && "ELEVATED FLOP RISK"}
            </span>
          </div>
          <p className="text-[11px] text-ink-600 leading-relaxed mt-2 italic font-sans">
            {predictionResult.insights}
          </p>
        </div>
      )}
    </div>
  );
}

// ==================== SPACE SYSTEM MINI EXPLORER ====================
export function CosmosExplorerWidget() {
  const [activePlanet, setActivePlanet] = useState<string>("earth");

  const planetData = {
    earth: {
      name: "Earth",
      temp: "15°C Mean",
      distance: "1.0 AU",
      fact: "The orbital dynamic forms Dawood's web-scaling coordinate master baseline.",
      color: "bg-blue-500"
    },
    mars: {
      name: "Mars",
      temp: "-62°C Mean",
      distance: "1.52 AU",
      fact: "Contains Olympus Mons, the tallest planetary mountain in our mapped star coordinates.",
      color: "bg-orange-500"
    },
    saturn: {
      name: "Saturn",
      temp: "-140°C",
      distance: "9.58 AU",
      fact: "Boasts a highly complex ice ring structure rotating at high centripetal rates.",
      color: "bg-amber-400"
    }
  };

  const currentPlanet = planetData[activePlanet as keyof typeof planetData];

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-data-label text-slate-400 tracking-wider font-semibold uppercase">
          Orbit Sandbox Module
        </h4>
        <div className="flex gap-1.5">
          {Object.keys(planetData).map((p) => (
            <button
              key={p}
              onClick={() => setActivePlanet(p)}
              className={`px-2 py-0.5 rounded text-[10px] capitalize font-mono ${
                activePlanet === p ? "bg-white text-slate-950 font-bold" : "bg-slate-800 text-slate-400 hover:bg-slate-750"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-28 bg-black/60 rounded-xl border border-slate-800/80 p-3 flex items-center justify-center relative overflow-hidden mb-3">
        {/* Orbit loop line overlay */}
        <div className="absolute w-24 h-24 rounded-full border border-dashed border-slate-800 animate-spin" style={{ animationDuration: "14s" }} />
        <div className="absolute w-40 h-40 rounded-full border border-dashed border-slate-800/40 animate-spin" style={{ animationDuration: "25s" }} />

        {/* Central Sun */}
        <div className="w-5 h-5 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10" />

        {/* Planet body floating */}
        <div className="absolute flex items-center justify-center">
          <div className={`w-3.5 h-3.5 rounded-full ${currentPlanet.color} animate-bounce`} />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-mono">Planet Name:</span>
          <span className="font-bold text-white font-mono">{currentPlanet.name}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-mono">Solar Distance:</span>
          <span className="text-sky-300 font-mono">{currentPlanet.distance}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 font-sans italic leading-tight">
          Fact: {currentPlanet.fact}
        </p>
      </div>
    </div>
  );
}
