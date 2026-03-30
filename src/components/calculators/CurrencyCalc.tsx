import { useState } from "react";
import Icon from "@/components/ui/icon";

const CURRENCIES = [
  { code: "USD", name: "Доллар США", flag: "🇺🇸", rate: 1 },
  { code: "RUB", name: "Рубль", flag: "🇷🇺", rate: 92.5 },
  { code: "EUR", name: "Евро", flag: "🇪🇺", rate: 0.92 },
  { code: "GBP", name: "Фунт стерлингов", flag: "🇬🇧", rate: 0.79 },
  { code: "CNY", name: "Юань", flag: "🇨🇳", rate: 7.24 },
  { code: "JPY", name: "Иена", flag: "🇯🇵", rate: 149.5 },
  { code: "KZT", name: "Тенге", flag: "🇰🇿", rate: 458.2 },
  { code: "UAH", name: "Гривна", flag: "🇺🇦", rate: 37.2 },
  { code: "BYN", name: "Белорусский рубль", flag: "🇧🇾", rate: 3.26 },
  { code: "TRY", name: "Турецкая лира", flag: "🇹🇷", rate: 32.8 },
  { code: "AED", name: "Дирхам ОАЭ", flag: "🇦🇪", rate: 3.67 },
  { code: "INR", name: "Индийская рупия", flag: "🇮🇳", rate: 83.1 },
  { code: "BRL", name: "Бразильский реал", flag: "🇧🇷", rate: 4.97 },
  { code: "MXN", name: "Мексиканское песо", flag: "🇲🇽", rate: 17.1 },
  { code: "CHF", name: "Швейцарский франк", flag: "🇨🇭", rate: 0.88 },
  { code: "CAD", name: "Канадский доллар", flag: "🇨🇦", rate: 1.36 },
  { code: "AUD", name: "Австралийский доллар", flag: "🇦🇺", rate: 1.53 },
  { code: "PLN", name: "Польский злотый", flag: "🇵🇱", rate: 4.02 },
  { code: "SEK", name: "Шведская крона", flag: "🇸🇪", rate: 10.42 },
  { code: "NOK", name: "Норвежская крона", flag: "🇳🇴", rate: 10.58 },
];

export default function CurrencyCalc() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("RUB");

  const fromCur = CURRENCIES.find(c => c.code === from)!;
  const toCur = CURRENCIES.find(c => c.code === to)!;

  const amountInUSD = amount / fromCur.rate;
  const result = amountInUSD * toCur.rate;

  const swap = () => { setFrom(to); setTo(from); };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center shadow-neon-green">
          <Icon name="DollarSign" size={16} className="text-neon-green" />
        </div>
        <div>
          <h2 className="font-orbitron text-lg font-bold tracking-wide" style={{color:"#39ff14", textShadow:"0 0 8px #39ff14"}}>Глобальные Валюты</h2>
          <p className="text-xs text-muted-foreground font-mono">20+ стран · офлайн курсы</p>
        </div>
      </div>

      <div className="cyber-card rounded-xl p-5 space-y-4">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">// конвертер</p>
        <div>
          <label className="text-xs text-muted-foreground font-mono mb-1 block">Сумма</label>
          <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} min={0}
            className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground font-mono mb-1 block">Из</label>
            <select value={from} onChange={e => setFrom(e.target.value)}
              className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none">
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>

          <button onClick={swap} className="mt-5 w-9 h-9 rounded-lg border border-neon-green/30 bg-neon-green/10 flex items-center justify-center hover:bg-neon-green/20 transition-all">
            <Icon name="ArrowLeftRight" size={14} className="text-neon-green" />
          </button>

          <div className="flex-1">
            <label className="text-xs text-muted-foreground font-mono mb-1 block">В</label>
            <select value={to} onChange={e => setTo(e.target.value)}
              className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none">
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-neon-green/10 text-center">
          <p className="text-xs font-mono text-muted-foreground mb-1">
            {amount} {from} {fromCur.flag} =
          </p>
          <p className="font-orbitron text-3xl font-bold" style={{color:"#39ff14", textShadow:"0 0 12px #39ff14"}}>
            {result.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {to}
          </p>
          <p className="text-xs font-mono text-muted-foreground/50 mt-2">
            1 {from} = {(toCur.rate / fromCur.rate).toFixed(4)} {to}
          </p>
        </div>
      </div>

      {/* Mini table */}
      <div className="cyber-card rounded-xl p-5">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">// быстрая таблица курсов к USD</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CURRENCIES.filter(c => c.code !== "USD").slice(0, 12).map(c => (
            <div key={c.code} className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-xs font-rajdhani text-muted-foreground">{c.flag} {c.code}</span>
              <span className="text-xs font-mono text-neon-green">{c.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
