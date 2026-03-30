import { useState } from "react";
import Icon from "@/components/ui/icon";

type Mode = "linear" | "quadratic";

function solveLinear(a: number, b: number) {
  if (a === 0) return b === 0 ? { x: null, inf: true, steps: [] } : { x: null, inf: false, steps: [] };
  const x = -b / a;
  return {
    x,
    steps: [
      `${a}x + ${b} = 0`,
      `${a}x = ${-b}`,
      `x = ${-b} / ${a}`,
      `x = ${x.toFixed(6)}`,
    ]
  };
}

function solveQuadratic(a: number, b: number, c: number) {
  if (a === 0) return { x1: null, x2: null, D: null, steps: ["a ≠ 0 для квадратного уравнения"] };
  const D = b * b - 4 * a * c;
  const steps = [
    `${a}x² + ${b}x + ${c} = 0`,
    `D = b² - 4ac = ${b}² - 4·${a}·${c} = ${D}`,
  ];
  if (D < 0) {
    steps.push("D < 0 → нет действительных корней");
    return { x1: null, x2: null, D, steps };
  }
  if (D === 0) {
    const x = -b / (2 * a);
    steps.push(`D = 0 → x = -b / 2a = ${x.toFixed(6)}`);
    return { x1: x, x2: x, D, steps };
  }
  const x1 = (-b + Math.sqrt(D)) / (2 * a);
  const x2 = (-b - Math.sqrt(D)) / (2 * a);
  steps.push(`√D = ${Math.sqrt(D).toFixed(4)}`);
  steps.push(`x₁ = (-b + √D) / 2a = ${x1.toFixed(6)}`);
  steps.push(`x₂ = (-b - √D) / 2a = ${x2.toFixed(6)}`);
  return { x1, x2, D, steps };
}

export default function AlgebraCalc() {
  const [mode, setMode] = useState<Mode>("linear");
  const [la, setLa] = useState(2);
  const [lb, setLb] = useState(-6);
  const [qa, setQa] = useState(1);
  const [qb, setQb] = useState(-5);
  const [qc, setQc] = useState(6);

  const linear = solveLinear(la, lb);
  const quad = solveQuadratic(qa, qb, qc);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center shadow-neon-purple">
          <Icon name="Sigma" size={16} className="text-neon-purple" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold neon-text-purple tracking-wide">Алгебра</h2>
          <p className="text-xs text-muted-foreground font-mono">Линейные и квадратные уравнения</p>
        </div>
      </div>

      <div className="flex gap-2">
        {(["linear", "quadratic"] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-1.5 rounded-lg text-sm font-rajdhani font-semibold border transition-all duration-200
              ${mode === m
                ? "bg-neon-purple/10 border-neon-purple/50 neon-text-purple shadow-neon-purple"
                : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
            {m === "linear" ? "Линейное" : "Квадратное"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="cyber-card rounded-xl p-5 space-y-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// коэффициенты</p>

          {mode === "linear" ? (
            <>
              <div className="text-center font-mono text-neon-purple text-lg mb-3">{la}x + ({lb}) = 0</div>
              {[["Коэффициент a", la, setLa], ["Коэффициент b", lb, setLb]].map(([label, val, setter]) => (
                <div key={label as string}>
                  <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                  <input type="number" value={val as number} onChange={e => (setter as (v: number) => void)(+e.target.value)}
                    className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="text-center font-mono text-neon-purple text-base mb-3">{qa}x² + ({qb})x + ({qc}) = 0</div>
              {[["Коэффициент a (≠ 0)", qa, setQa], ["Коэффициент b", qb, setQb], ["Коэффициент c", qc, setQc]].map(([label, val, setter]) => (
                <div key={label as string}>
                  <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                  <input type="number" value={val as number} onChange={e => (setter as (v: number) => void)(+e.target.value)}
                    className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
                </div>
              ))}
            </>
          )}
        </div>

        <div className="cyber-card rounded-xl p-5 space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// решение по шагам</p>
          {(mode === "linear" ? linear.steps : quad.steps).map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-neon-purple/40 font-mono text-xs mt-0.5 w-4 shrink-0">{i + 1}.</span>
              <code className="text-sm font-mono text-foreground/90 break-all">{step}</code>
            </div>
          ))}
          <div className="pt-3 border-t border-neon-purple/20">
            {mode === "linear" ? (
              <div className="text-center">
                {"inf" in linear && linear.inf
                  ? <p className="neon-text-purple font-orbitron">∞ решений</p>
                  : "x" in linear && linear.x !== null
                    ? <><p className="text-xs text-muted-foreground font-mono mb-1">Ответ</p>
                       <p className="font-orbitron text-2xl font-bold neon-text-purple">x = {("x" in linear ? linear.x : null)?.toFixed(4)}</p></>
                    : <p className="text-neon-pink font-orbitron">Нет решений</p>
                }
              </div>
            ) : (
              <div className="text-center space-y-2">
                {quad.D !== null && quad.D >= 0 ? <>
                  <p className="text-xs text-muted-foreground font-mono">Ответ</p>
                  <p className="font-orbitron text-xl font-bold neon-text-purple">x₁ = {quad.x1?.toFixed(4)}</p>
                  {quad.x1 !== quad.x2 && <p className="font-orbitron text-xl font-bold neon-text-pink">x₂ = {quad.x2?.toFixed(4)}</p>}
                </> : <p className="text-neon-pink font-orbitron text-sm">Нет действительных корней</p>}
                {quad.D !== null && <p className="text-xs font-mono text-muted-foreground">D = {quad.D.toFixed(2)}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}