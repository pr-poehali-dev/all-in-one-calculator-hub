import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COINS = [
  { id: "bitcoin", symbol: "BTC", color: "text-yellow-400", border: "border-yellow-400/30", bg: "bg-yellow-400/10" },
  { id: "ethereum", symbol: "ETH", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/10" },
  { id: "the-open-network", symbol: "TON", color: "text-sky-400", border: "border-sky-400/30", bg: "bg-sky-400/10" },
];

interface Prices {
  [key: string]: { usd: number; rub: number; usd_24h_change?: number };
}

export default function CryptoCalc() {
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(1);
  const [selected, setSelected] = useState("bitcoin");
  const [currency, setCurrency] = useState<"usd" | "rub">("usd");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchPrices = async () => {
    try {
      const ids = COINS.map(c => c.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd,rub&include_24hr_change=true`
      );
      const data = await res.json();
      setPrices(data);
      setLastUpdated(new Date().toLocaleTimeString("ru-RU"));
      setError("");
    } catch {
      setError("Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const coin = COINS.find(c => c.id === selected)!;
  const price = prices[selected];
  const converted = price ? amount * price[currency] : null;
  const change = price?.usd_24h_change ?? 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
            <Icon name="Bitcoin" size={16} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="font-orbitron text-lg font-bold text-yellow-400 tracking-wide" style={{textShadow: "0 0 8px #facc15"}}>Крипто Live</h2>
            <p className="text-xs text-muted-foreground font-mono">BTC · ETH · TON → USD / RUB</p>
          </div>
        </div>
        <button onClick={fetchPrices} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yellow-400/20 text-yellow-400 text-xs font-mono hover:bg-yellow-400/10 transition-all">
          <Icon name="RefreshCw" size={12} />
          Обновить
        </button>
      </div>

      {loading ? (
        <div className="cyber-card rounded-xl p-8 text-center">
          <p className="font-mono text-muted-foreground animate-pulse">// загружаю данные...</p>
        </div>
      ) : error ? (
        <div className="cyber-card rounded-xl p-6 text-center border-neon-pink/30">
          <p className="text-neon-pink font-mono text-sm">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">CoinGecko API может быть недоступен</p>
        </div>
      ) : (
        <>
          {/* Coin Cards */}
          <div className="grid grid-cols-3 gap-3">
            {COINS.map(c => {
              const p = prices[c.id];
              const ch = p?.usd_24h_change ?? 0;
              return (
                <button key={c.id} onClick={() => setSelected(c.id)}
                  className={`cyber-card rounded-xl p-4 text-center transition-all duration-200 border hover-scale
                    ${selected === c.id ? `${c.border} ${c.bg}` : "border-white/5 hover:border-white/10"}`}>
                  <p className={`font-orbitron text-sm font-bold ${c.color}`}>{c.symbol}</p>
                  <p className={`font-mono text-xs mt-1 ${c.color}`}>
                    ${p ? p.usd.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—"}
                  </p>
                  <p className={`text-[10px] font-mono mt-1 ${ch >= 0 ? "text-neon-green" : "text-neon-pink"}`}>
                    {ch >= 0 ? "▲" : "▼"} {Math.abs(ch).toFixed(2)}%
                  </p>
                </button>
              );
            })}
          </div>

          {/* Converter */}
          <div className="cyber-card rounded-xl p-5">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">// конвертер</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">Количество {coin.symbol}</label>
                <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} min={0}
                  className="cyber-input w-full px-3 py-2 rounded-lg text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-mono mb-1 block">Валюта</label>
                <div className="flex gap-2">
                  {(["usd", "rub"] as const).map(cur => (
                    <button key={cur} onClick={() => setCurrency(cur)}
                      className={`flex-1 py-2 rounded-lg text-sm font-rajdhani font-semibold border transition-all
                        ${currency === cur ? "bg-yellow-400/10 border-yellow-400/40 text-yellow-400" : "border-white/10 text-muted-foreground"}`}>
                      {cur.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-center py-4 border-t border-white/5">
              <p className="text-xs font-mono text-muted-foreground mb-1">{amount} {coin.symbol} =</p>
              <p className="font-orbitron text-3xl font-bold text-yellow-400" style={{textShadow: "0 0 12px #facc15"}}>
                {converted !== null
                  ? currency === "rub"
                    ? `${converted.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽`
                    : `$${converted.toLocaleString("en-US", { maximumFractionDigits: 2 })}`
                  : "—"}
              </p>
              {lastUpdated && <p className="text-[10px] font-mono text-muted-foreground/40 mt-2">обновлено: {lastUpdated}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
