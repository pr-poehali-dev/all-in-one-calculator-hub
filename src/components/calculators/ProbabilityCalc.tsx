import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function ProbabilityCalc() {
  const [wins, setWins] = useState(42);
  const [total, setTotal] = useState(100);
  const [trials, setTrials] = useState(10);
  const [targetWins, setTargetWins] = useState(5);
  const [simCount, setSimCount] = useState(1000);
  const [simResult, setSimResult] = useState<number | null>(null);
  const [simRunning, setSimRunning] = useState(false);

  const winRate = total > 0 ? wins / total : 0;
  const winPct = (winRate * 100).toFixed(2);

  function factorial(n: number): number {
    if (n <= 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  }

  function comb(n: number, k: number): number {
    if (k > n) return 0;
    return factorial(n) / (factorial(k) * factorial(n - k));
  }

  function binomialProbability(n: number, k: number, p: number): number {
    return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  }

  const exactProb = binomialProbability(trials, targetWins, winRate);
  const atLeastProb = Array.from({ length: trials - targetWins + 1 }, (_, i) =>
    binomialProbability(trials, targetWins + i, winRate)
  ).reduce((a, b) => a + b, 0);

  const runSimulation = () => {
    setSimRunning(true);
    setTimeout(() => {
      let successes = 0;
      for (let i = 0; i < simCount; i++) {
        let winsInTrial = 0;
        for (let j = 0; j < trials; j++) {
          if (Math.random() < winRate) winsInTrial++;
        }
        if (winsInTrial >= targetWins) successes++;
      }
      setSimResult((successes / simCount) * 100);
      setSimRunning(false);
    }, 100);
  };

  const luckLevel = winRate > 0.7 ? "LEGENDARY" : winRate > 0.5 ? "LUCKY" : winRate > 0.35 ? "AVERAGE" : winRate > 0.2 ? "UNLUCKY" : "CURSED";
  const luckColor = winRate > 0.7 ? "#39ff14" : winRate > 0.5 ? "#00f5ff" : winRate > 0.35 ? "#facc15" : winRate > 0.2 ? "#ff006e" : "#bf00ff";

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center shadow-neon-purple">
          <Icon name="Dice5" size={16} className="text-neon-purple" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold neon-text-purple tracking-wide">Вероятность</h2>
          <p className="text-xs text-muted-foreground font-mono">Винрейт · биномиальные расчёты · симулятор</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-4">
          <div className="cyber-card rounded-xl p-5 space-y-4">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// исходные данные</p>
            {[
              { label: "Побед", value: wins, setter: setWins },
              { label: "Всего игр", value: total, setter: setTotal },
            ].map(({ label, value, setter }) => (
              <div key={label}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label}</label>
                <input type="number" value={value} onChange={e => setter(Math.max(0, +e.target.value))} min={0}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}

            {/* Win rate bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-mono text-muted-foreground">Винрейт</span>
                <span className="text-xs font-mono" style={{ color: luckColor }}>{winPct}%</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${winPct}%`, background: luckColor, boxShadow: `0 0 8px ${luckColor}` }} />
              </div>
              <p className="text-center font-orbitron text-sm mt-2" style={{ color: luckColor, textShadow: `0 0 8px ${luckColor}` }}>
                {luckLevel}
              </p>
            </div>
          </div>

          <div className="cyber-card rounded-xl p-5 space-y-4">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// биномиальный расчёт</p>
            {[
              { label: "Попыток (n)", value: trials, setter: setTrials, max: 50 },
              { label: "Нужно побед (k)", value: targetWins, setter: setTargetWins, max: trials },
            ].map(({ label, value, setter, max }) => (
              <div key={label}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label}</label>
                <input type="number" value={value} onChange={e => setter(Math.min(max, Math.max(0, +e.target.value)))} min={0} max={max}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {/* Probability results */}
          {[
            { label: `Ровно ${targetWins} побед из ${trials}`, value: (exactProb * 100).toFixed(4), color: "#00f5ff" },
            { label: `Минимум ${targetWins} побед из ${trials}`, value: (atLeastProb * 100).toFixed(4), color: "#bf00ff" },
          ].map(item => (
            <div key={item.label} className="cyber-card rounded-xl p-4" style={{ borderColor: `${item.color}25` }}>
              <p className="text-xs font-mono text-muted-foreground mb-1">{item.label}</p>
              <p className="font-orbitron text-2xl font-bold" style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}>
                {item.value}%
              </p>
            </div>
          ))}

          {/* Simulator */}
          <div className="cyber-card rounded-xl p-4 space-y-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// монте-карло симулятор</p>
            <div>
              <label className="text-xs text-muted-foreground font-mono mb-1 block">Итераций: <span className="text-neon-purple">{simCount.toLocaleString()}</span></label>
              <input type="range" min={100} max={10000} step={100} value={simCount} onChange={e => setSimCount(+e.target.value)}
                className="w-full accent-purple-500" />
            </div>
            <button onClick={runSimulation} disabled={simRunning}
              className="w-full py-2.5 rounded-lg font-rajdhani font-bold text-sm border border-neon-purple/50 bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-all disabled:opacity-50 shadow-neon-purple">
              {simRunning ? "Симуляция..." : "▶ Запустить симуляцию"}
            </button>
            {simResult !== null && (
              <div className="text-center pt-2 border-t border-neon-purple/20">
                <p className="text-xs font-mono text-muted-foreground mb-1">Результат симуляции</p>
                <p className="font-orbitron text-2xl font-bold neon-text-pink">{simResult.toFixed(2)}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
