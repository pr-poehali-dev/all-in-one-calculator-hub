import { useState } from "react";
import Icon from "@/components/ui/icon";

export default function LifePriceCalc() {
  const [salary, setSalary] = useState(80000);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [price, setPrice] = useState(5000);

  const workDaysPerMonth = (daysPerWeek / 7) * 30;
  const hoursPerMonth = workDaysPerMonth * hoursPerDay;
  const hourlyRate = salary / hoursPerMonth;
  const dailyRate = hourlyRate * hoursPerDay;

  const hoursNeeded = price / hourlyRate;
  const daysNeeded = price / dailyRate;
  const minutesNeeded = hoursNeeded * 60;

  const items = [
    { label: "Минут работы", value: minutesNeeded.toFixed(0), unit: "мин", color: "#00f5ff", icon: "Timer" },
    { label: "Часов работы", value: hoursNeeded.toFixed(2), unit: "ч", color: "#bf00ff", icon: "Clock" },
    { label: "Дней работы", value: daysNeeded.toFixed(2), unit: "дн", color: "#ff006e", icon: "Calendar" },
  ];

  const presets = [500, 2000, 5000, 15000, 50000, 100000, 200000, 1000000];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
          <Icon name="Clock" size={16} className="text-orange-400" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold text-orange-400 tracking-wide" style={{textShadow:"0 0 8px #fb923c"}}>Цена Жизни</h2>
          <p className="text-xs text-muted-foreground font-mono">Любая покупка в часах твоей жизни</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="cyber-card rounded-xl p-5 space-y-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// твои параметры</p>

          {[
            { label: "Зарплата в месяц (₽)", value: salary, setter: setSalary },
            { label: "Цена покупки (₽)", value: price, setter: setPrice },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label className="text-xs text-muted-foreground font-mono mb-1 block">{label}</label>
              <input type="number" value={value} onChange={e => setter(+e.target.value)} min={0}
                className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
            </div>
          ))}

          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">
              Часов в день: <span className="text-orange-400">{hoursPerDay}</span>
            </label>
            <input type="range" min={1} max={16} value={hoursPerDay} onChange={e => setHoursPerDay(+e.target.value)}
              className="w-full accent-orange-400" />
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-mono mb-1 block">
              Дней в неделю: <span className="text-orange-400">{daysPerWeek}</span>
            </label>
            <input type="range" min={1} max={7} value={daysPerWeek} onChange={e => setDaysPerWeek(+e.target.value)}
              className="w-full accent-orange-400" />
          </div>

          <div className="pt-2 border-t border-white/5">
            <p className="text-xs font-mono text-muted-foreground mb-1">Ставка в час</p>
            <p className="font-orbitron text-xl text-orange-400">{hourlyRate.toFixed(0)} ₽/ч</p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Results */}
          {items.map(item => (
            <div key={item.label} className="cyber-card rounded-xl p-4 flex items-center gap-4"
              style={{ borderColor: `${item.color}25` }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                <Icon name={item.icon} size={16} style={{ color: item.color }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-mono text-muted-foreground">{item.label}</p>
                <p className="font-orbitron text-2xl font-bold" style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}>
                  {Number(item.value).toLocaleString("ru-RU")} <span className="text-sm font-rajdhani opacity-60">{item.unit}</span>
                </p>
              </div>
            </div>
          ))}

          {/* Preset prices */}
          <div className="cyber-card rounded-xl p-4">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">// быстрый выбор суммы</p>
            <div className="flex flex-wrap gap-2">
              {presets.map(p => (
                <button key={p} onClick={() => setPrice(p)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all border
                    ${price === p ? "border-orange-400/50 bg-orange-400/10 text-orange-400" : "border-white/10 text-muted-foreground hover:border-white/20"}`}>
                  {p.toLocaleString("ru-RU")} ₽
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
