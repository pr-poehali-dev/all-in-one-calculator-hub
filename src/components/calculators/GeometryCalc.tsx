import { useState } from "react";
import Icon from "@/components/ui/icon";

type Shape = "trapezoid" | "rhombus" | "parallelogram" | "pythagoras";

const shapes: { id: Shape; label: string; emoji: string }[] = [
  { id: "trapezoid", label: "Трапеция", emoji: "⏢" },
  { id: "rhombus", label: "Ромб", emoji: "◇" },
  { id: "parallelogram", label: "Параллелограмм", emoji: "▱" },
  { id: "pythagoras", label: "Теорема Пифагора", emoji: "📐" },
];

function TrapezoidSVG({ a, b, h }: { a: number; b: number; h: number }) {
  const W = 200, H = 100;
  const scale = W / Math.max(a, b, 1);
  const aw = a * scale, bw = b * scale, hh = Math.min(h * scale * 0.5, H - 10);
  const ox = (W - aw) / 2, offset = (aw - bw) / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[200px]" style={{ height: 80 }}>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#bf00ff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <polygon
        points={`${ox},${H - 5} ${ox + aw},${H - 5} ${ox + offset + bw},${H - 5 - hh} ${ox + offset},${H - 5 - hh}`}
        fill="url(#g1)" stroke="#00f5ff" strokeWidth="1.5"
      />
      <line x1={ox + aw / 2} y1={H - 5} x2={ox + aw / 2} y2={H - 5 - hh} stroke="#ff006e" strokeWidth="1" strokeDasharray="3,2" />
      <text x={ox} y={H - 8} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">a={a}</text>
      <text x={ox + offset + 2} y={H - 5 - hh - 3} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">b={b}</text>
      <text x={ox + aw / 2 + 4} y={H - 5 - hh / 2} fill="#ff006e" fontSize="9" fontFamily="IBM Plex Mono">h={h}</text>
    </svg>
  );
}

function RhombusSVG({ d1, d2 }: { d1: number; d2: number }) {
  const W = 180, H = 120;
  const hw = Math.min(d1 * 1.5, W - 20) / 2, hh = Math.min(d2 * 1.5, H - 20) / 2;
  const cx = W / 2, cy = H / 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[180px]" style={{ height: 90 }}>
      <defs><linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#bf00ff" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#ff006e" stopOpacity="0.3" />
      </linearGradient></defs>
      <polygon points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
        fill="url(#g2)" stroke="#bf00ff" strokeWidth="1.5" />
      <line x1={cx - hw} y1={cy} x2={cx + hw} y2={cy} stroke="#00f5ff" strokeWidth="1" strokeDasharray="3,2" />
      <line x1={cx} y1={cy - hh} x2={cx} y2={cy + hh} stroke="#00f5ff" strokeWidth="1" strokeDasharray="3,2" />
      <text x={cx + 4} y={cy - 4} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">d1={d1}</text>
      <text x={cx + hw / 2} y={cy + 12} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">d2={d2}</text>
    </svg>
  );
}

function PythagorasSVG({ a, b }: { a: number; b: number }) {
  const c = Math.sqrt(a * a + b * b);
  const scale = 80 / Math.max(a, b, 1);
  const W = 180, H = 120;
  const ax = 20, ay = H - 20;
  const bx = ax + a * scale, by = ay;
  const cx2 = ax, cy2 = ay - b * scale;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[180px]" style={{ height: 90 }}>
      <polygon points={`${ax},${ay} ${bx},${by} ${cx2},${cy2}`}
        fill="rgba(0,245,255,0.08)" stroke="#00f5ff" strokeWidth="1.5" />
      <rect x={ax} y={ay - 8} width={8} height={8} fill="none" stroke="#ff006e" strokeWidth="1" />
      <text x={(ax + bx) / 2 - 8} y={ay + 12} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">a={a}</text>
      <text x={ax - 22} y={(ay + cy2) / 2} fill="#00f5ff" fontSize="9" fontFamily="IBM Plex Mono">b={b}</text>
      <text x={(bx + cx2) / 2 + 4} y={(by + cy2) / 2 - 4} fill="#ff006e" fontSize="9" fontFamily="IBM Plex Mono">c={c.toFixed(2)}</text>
    </svg>
  );
}

export default function GeometryCalc() {
  const [shape, setShape] = useState<Shape>("trapezoid");
  const [vals, setVals] = useState({ a: 10, b: 6, h: 5, d1: 8, d2: 6, side: 7, base: 10, pyA: 3, pyB: 4 });

  const set = (k: string, v: number) => setVals(prev => ({ ...prev, [k]: v }));

  const results: Record<Shape, { label: string; value: string; formula: string }> = {
    trapezoid: { label: "Площадь", value: (((vals.a + vals.b) * vals.h) / 2).toFixed(4), formula: "S = (a + b) × h / 2" },
    rhombus: { label: "Площадь", value: ((vals.d1 * vals.d2) / 2).toFixed(4), formula: "S = d₁ × d₂ / 2" },
    parallelogram: { label: "Площадь", value: (vals.base * vals.h).toFixed(4), formula: "S = a × h" },
    pythagoras: { label: "Гипотенуза c", value: Math.sqrt(vals.pyA ** 2 + vals.pyB ** 2).toFixed(6), formula: "c² = a² + b²" },
  };

  const res = results[shape];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center shadow-neon-cyan">
          <Icon name="Triangle" size={16} className="text-neon-cyan" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold neon-text-cyan tracking-wide">Геометрия 8.0</h2>
          <p className="text-xs text-muted-foreground font-mono">Площади фигур + теорема Пифагора</p>
        </div>
      </div>

      {/* Shape Tabs */}
      <div className="flex flex-wrap gap-2">
        {shapes.map(s => (
          <button key={s.id} onClick={() => setShape(s.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-rajdhani font-semibold transition-all duration-200 border
              ${shape === s.id
                ? "bg-neon-cyan/10 border-neon-cyan/50 neon-text-cyan shadow-neon-cyan"
                : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"}`}>
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Inputs */}
        <div className="cyber-card rounded-xl p-5 space-y-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// параметры</p>

          {shape === "trapezoid" && <>
            {[["Основание a", "a", vals.a], ["Основание b", "b", vals.b], ["Высота h", "h", vals.h]].map(([label, key, value]) => (
              <div key={key as string}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                <input type="number" value={value as number} onChange={e => set(key as string, +e.target.value)}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}
          </>}

          {shape === "rhombus" && <>
            {[["Диагональ d₁", "d1", vals.d1], ["Диагональ d₂", "d2", vals.d2]].map(([label, key, value]) => (
              <div key={key as string}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                <input type="number" value={value as number} onChange={e => set(key as string, +e.target.value)}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}
          </>}

          {shape === "parallelogram" && <>
            {[["Основание a", "base", vals.base], ["Высота h", "h", vals.h]].map(([label, key, value]) => (
              <div key={key as string}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                <input type="number" value={value as number} onChange={e => set(key as string, +e.target.value)}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}
          </>}

          {shape === "pythagoras" && <>
            {[["Катет a", "pyA", vals.pyA], ["Катет b", "pyB", vals.pyB]].map(([label, key, value]) => (
              <div key={key as string}>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">{label as string}</label>
                <input type="number" value={value as number} onChange={e => set(key as string, +e.target.value)}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
            ))}
          </>}
        </div>

        {/* Result + SVG */}
        <div className="space-y-4">
          <div className="cyber-card rounded-xl p-5 text-center">
            <p className="text-xs font-mono text-muted-foreground mb-2">{res.formula}</p>
            <div className="flex justify-center mb-3">
              {shape === "trapezoid" && <TrapezoidSVG a={vals.a} b={vals.b} h={vals.h} />}
              {shape === "rhombus" && <RhombusSVG d1={vals.d1} d2={vals.d2} />}
              {shape === "parallelogram" && <TrapezoidSVG a={vals.base} b={vals.base} h={vals.h} />}
              {shape === "pythagoras" && <PythagorasSVG a={vals.pyA} b={vals.pyB} />}
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-1">{res.label}</p>
            <p className="font-orbitron text-3xl font-bold neon-text-cyan">{res.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
