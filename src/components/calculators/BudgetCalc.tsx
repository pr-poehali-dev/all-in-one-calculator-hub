import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function BudgetCalc() {
  const [income, setIncome] = useState(80000);
  const [fixed, setFixed] = useState(25000);
  const [savings, setSavings] = useState(15);
  const [daysInMonth, setDaysInMonth] = useState(30);

  const savingsAmount = (income * savings) / 100;
  const available = income - fixed - savingsAmount;
  const dailyBudget = available > 0 ? available / daysInMonth : 0;
  const weeklyBudget = dailyBudget * 7;

  const segments = [
    { label: "Фиксированные расходы", value: fixed, color: "#bf00ff", pct: (fixed / income) * 100 },
    { label: "Накопления", value: savingsAmount, color: "#00f5ff", pct: (savingsAmount / income) * 100 },
    { label: "Свободные средства", value: available, color: "#39ff14", pct: (available / income) * 100 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-pink/10 border border-neon-pink/30 flex items-center justify-center shadow-neon-pink">
          <Icon name="Wallet" size={16} className="text-neon-pink" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold neon-text-pink tracking-wide">Дневной Бюджет</h2>
          <p className="text-xs text-muted-foreground font-mono">Лимит трат на день / неделю</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="cyber-card rounded-xl p-5 space-y-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// параметры</p>

          {[
            { label: "Доход в месяц (₽)", value: income, setter: setIncome },
            { label: "Обязательные платежи (₽)", value: fixed, setter: setFixed },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground font-mono mb-1 block">{label}</label>
              <input type="number" value={value} onChange={e => setter(+e.target.value)} min={0}
                className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
            </div>
          ))}

          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">
              Откладывать на сбережения: <span className="text-neon-pink">{savings}%</span>
            </label>
            <input type="range" min={0} max={50} value={savings} onChange={e => setSavings(+e.target.value)}
              className="w-full accent-pink-500" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">Дней в месяце: <span className="text-neon-pink">{daysInMonth}</span></label>
            <input type="range" min={28} max={31} value={daysInMonth} onChange={e => setDaysInMonth(+e.target.value)}
              className="w-full accent-pink-500" />
          </div>
        </div>

        <div className="space-y-3">
          {/* Daily + Weekly */}
          <div className="grid grid-cols-2 gap-3">
            <div className="cyber-card rounded-xl p-4 text-center border-neon-pink/20">
              <p className="text-xs font-mono text-muted-foreground mb-1">В день</p>
              <p className="font-orbitron text-2xl font-bold neon-text-pink">
                {dailyBudget.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs font-mono text-muted-foreground">₽</p>
            </div>
            <div className="cyber-card rounded-xl p-4 text-center border-neon-purple/20">
              <p className="text-xs font-mono text-muted-foreground mb-1">В неделю</p>
              <p className="font-orbitron text-2xl font-bold neon-text-purple">
                {weeklyBudget.toLocaleString("ru-RU", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs font-mono text-muted-foreground">₽</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="cyber-card rounded-xl p-4 space-y-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// распределение</p>
            {/* Bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex">
              {segments.map(s => (
                <div key={s.label} style={{ width: `${Math.max(0, s.pct)}%`, background: s.color }} className="transition-all duration-500" />
              ))}
            </div>
            {segments.map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                  <span className="text-xs font-rajdhani text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono" style={{ color: s.color }}>
                    {s.value.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground/50 ml-1">({s.pct.toFixed(0)}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
