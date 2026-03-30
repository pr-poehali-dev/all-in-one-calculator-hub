import Icon from "@/components/ui/icon";

const cards = [
  {
    id: "geometry",
    title: "Геометрия 8.0",
    desc: "Площади фигур + теорема Пифагора с живыми SVG",
    icon: "Triangle",
    color: "#00f5ff",
    tag: "ВИЗУАЛЬНО",
    url: "https://simple-calculator--voevodavlad88.replit.app/",
  },
  {
    id: "algebra",
    title: "Алгебра",
    desc: "Линейные и квадратные уравнения пошагово",
    icon: "Sigma",
    color: "#bf00ff",
    tag: "ШАГ ЗА ШАГОМ",
    url: "https://simple-calculator--voevodavlad88.replit.app/fraction-pro/",
  },
  {
    id: "crypto",
    title: "Крипто Live",
    desc: "BTC / ETH / TON → USD / RUB в реальном времени",
    icon: "Bitcoin",
    color: "#facc15",
    tag: "LIVE API",
    url: "https://equation-master--voevodavladik.replit.app/",
  },
  {
    id: "currency",
    title: "Валюты Мира",
    desc: "Конвертер 20+ валют с таблицей курсов",
    icon: "DollarSign",
    color: "#39ff14",
    tag: "20+ СТРАН",
    url: "https://equation-master--voevodavladik.replit.app/exchange/",
  },
  {
    id: "budget",
    title: "Дневной Бюджет",
    desc: "Считает лимит трат на день по доходу",
    icon: "Wallet",
    color: "#ff006e",
    tag: "ФИНАНСЫ",
    url: "https://equation-master--voevodavladik.replit.app/number-base-calc/",
  },
  {
    id: "lifeprice",
    title: "Цена Жизни",
    desc: "Любая покупка в часах и днях твоей жизни",
    icon: "Clock",
    color: "#fb923c",
    tag: "ОСОЗНАННОСТЬ",
    url: "https://interactive-length-c-o2kd.bolt.host/",
  },
  {
    id: "plotter",
    title: "Плоттер Функций",
    desc: "Рисует графики y = f(x) с ползунками",
    icon: "TrendingUp",
    color: "#00f5ff",
    tag: "ИНТЕРАКТИВНО",
    url: "https://graph-master-scienti-2kf0.bolt.host/",
  },
  {
    id: "probability",
    title: "Вероятность",
    desc: "Винрейт, биномиальный расчёт, Монте-Карло",
    icon: "Dice5",
    color: "#bf00ff",
    tag: "СИМУЛЯТОР",
    url: "https://modern-crypto-conver-3y8t.bolt.host/",
  },
];

interface DashboardProps {
  onSelect?: (id: string) => void;
}

export default function Dashboard({ onSelect: _onSelect }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-glow-pulse" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest">ALL SYSTEMS ONLINE · 8 TOOLS LOADED</span>
        </div>
        <h1 className="font-orbitron text-4xl md:text-5xl font-black mb-3">
          <span className="neon-text-cyan">CALC</span>
          <span className="neon-text-purple">HUB</span>
        </h1>
        <p className="font-rajdhani text-lg text-muted-foreground max-w-xl mx-auto">
          Профессиональный набор из 8 калькуляторов в едином интерфейсе
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <a
            key={card.id}
            href={card.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${i * 60}ms` }}
            className="group cyber-card rounded-xl p-5 text-left transition-all duration-300 hover-scale animate-fade-in cursor-pointer block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30`, boxShadow: `0 0 12px ${card.color}20` }}>
                <Icon name={card.icon} size={18} style={{ color: card.color }} />
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full"
                style={{ color: card.color, background: `${card.color}15`, border: `1px solid ${card.color}20` }}>
                {card.tag}
              </span>
            </div>
            <h3 className="font-orbitron text-sm font-bold mb-1.5 transition-all duration-200"
              style={{ color: card.color, textShadow: `0 0 6px ${card.color}60` }}>
              {card.title}
            </h3>
            <p className="text-xs font-rajdhani text-muted-foreground leading-relaxed">
              {card.desc}
            </p>
            <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-[10px] font-mono" style={{ color: card.color }}>Открыть</span>
              <Icon name="ArrowRight" size={10} style={{ color: card.color }} />
            </div>
          </a>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Инструментов", value: "8", color: "#00f5ff" },
          { label: "Формул", value: "20+", color: "#bf00ff" },
          { label: "Офлайн режим", value: "100%", color: "#39ff14" },
        ].map(stat => (
          <div key={stat.label} className="cyber-card rounded-xl p-4 text-center">
            <p className="font-orbitron text-2xl font-bold" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}>
              {stat.value}
            </p>
            <p className="text-xs font-mono text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}