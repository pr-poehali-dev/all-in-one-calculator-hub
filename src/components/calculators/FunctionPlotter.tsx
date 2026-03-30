import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PRESETS = [
  { label: "Парабола", expr: "x*x" },
  { label: "Синус", expr: "Math.sin(x)" },
  { label: "Косинус", expr: "Math.cos(x)" },
  { label: "Линейная", expr: "2*x+1" },
  { label: "Кубическая", expr: "x*x*x" },
  { label: "Экспонента", expr: "Math.exp(x/3)" },
  { label: "Логарифм", expr: "Math.log(Math.abs(x)+0.1)" },
  { label: "Тангенс", expr: "Math.tan(x)" },
];

export default function FunctionPlotter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expr, setExpr] = useState("x*x");
  const [error, setError] = useState("");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [xRange, setXRange] = useState(10);

  const evalFn = (x: number): number => {
    try {
      const fn = new Function("x", "a", "b", `return ${expr};`);
      const val = fn(x, a, b);
      return isFinite(val) ? val : NaN;
    } catch {
      return NaN;
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#050510";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(0,245,255,0.06)";
    ctx.lineWidth = 1;
    const step = W / (xRange * 2);
    for (let i = -xRange; i <= xRange; i++) {
      const x = cx + i * step;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let j = -10; j <= 10; j++) {
      const y = cy + j * step;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(0,245,255,0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

    // Axis labels
    ctx.fillStyle = "rgba(0,245,255,0.4)";
    ctx.font = "10px IBM Plex Mono";
    ctx.fillText("x", W - 12, cy - 6);
    ctx.fillText("y", cx + 6, 12);

    // Tick labels
    ctx.fillStyle = "rgba(0,245,255,0.25)";
    ctx.font = "9px IBM Plex Mono";
    for (let i = -xRange; i <= xRange; i += 2) {
      if (i === 0) continue;
      const x = cx + i * step;
      ctx.fillText(String(i), x - 6, cy + 14);
    }

    // Plot
    const gradient = ctx.createLinearGradient(0, 0, W, 0);
    gradient.addColorStop(0, "#00f5ff");
    gradient.addColorStop(0.5, "#bf00ff");
    gradient.addColorStop(1, "#ff006e");
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = "#00f5ff";
    ctx.shadowBlur = 8;

    ctx.beginPath();
    let first = true;
    const pts = 400;
    for (let i = 0; i <= pts; i++) {
      const xVal = -xRange + (2 * xRange * i) / pts;
      const yVal = evalFn(xVal);
      if (isNaN(yVal)) { first = true; continue; }
      const px = cx + xVal * step;
      const py = cy - yVal * step;
      if (first) { ctx.moveTo(px, py); first = false; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    setError(hasError ? "Некоторые значения не определены" : "");
  };

  useEffect(() => {
    try {
      const fn = new Function("x", "a", "b", `return ${expr};`);
      fn(0, a, b);
      setError("");
    } catch {
      setError("Синтаксическая ошибка");
    }
    draw();
  }, [expr, a, b, xRange]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shadow-neon-cyan">
          <Icon name="TrendingUp" size={16} className="text-neon-cyan" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold neon-text-cyan tracking-wide">Плоттер функций</h2>
          <p className="text-xs text-muted-foreground font-mono">Графики y = f(x) в реальном времени</p>
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => setExpr(p.expr)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all
              ${expr === p.expr
                ? "bg-neon-cyan/10 border-neon-cyan/40 neon-text-cyan"
                : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="cyber-card rounded-xl p-5 space-y-3">
        <div>
          <label className="text-xs text-muted-foreground font-mono mb-1 block">y = f(x) — используй JS: Math.sin(x), x*x, a*x+b</label>
          <input type="text" value={expr} onChange={e => setExpr(e.target.value)}
            className={`cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none ${error ? "border-neon-pink/60" : ""}`} />
          {error && <p className="text-neon-pink text-xs font-mono mt-1">{error}</p>}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">Параметр a: <span className="text-neon-cyan">{a}</span></label>
            <input type="range" min={-10} max={10} step={0.5} value={a} onChange={e => setA(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">Параметр b: <span className="text-neon-cyan">{b}</span></label>
            <input type="range" min={-10} max={10} step={0.5} value={b} onChange={e => setB(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">Диапазон X: <span className="text-neon-cyan">±{xRange}</span></label>
            <input type="range" min={2} max={20} value={xRange} onChange={e => setXRange(+e.target.value)} className="w-full accent-cyan-400" />
          </div>
        </div>
      </div>

      <div className="cyber-card rounded-xl overflow-hidden">
        <canvas ref={canvasRef} width={800} height={400} className="w-full h-auto" style={{ imageRendering: "crisp-edges" }} />
      </div>
    </div>
  );
}