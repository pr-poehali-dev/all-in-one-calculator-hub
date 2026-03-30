import Icon from "@/components/ui/icon";

const cards = [
  {
    id: "geometry",
    title: "Обычный калькулятор",
    desc: "Площади фигур + теорема Пифагора с живыми SVG",
    icon: "Triangle",
    color: "#00f5ff",
    tag: "ВИЗУАЛЬНО",
    url: "https://simple-calculator--voevodavlad88.replit.app/",
  },
  {
    id: "algebra",
    title: "Дроби",
    desc: "Линейные и квадратные уравнения пошагово",
    icon: "Sigma",
    color: "#bf00ff",
    tag: "ШАГ ЗА ШАГОМ",
    url: "https://simple-calculator--voevodavlad88.replit.app/fraction-pro/",
  },
  {
    id: "crypto",
    title: "Уравнения",
    desc: "BTC / ETH / TON → USD / RUB в реальном времени",
    icon: "Bitcoin",
    color: "#facc15",
    tag: "LIVE API",
    url: "https://equation-master--voevodavladik.replit.app/",
  },
  {
    id: "currency",
    title: "Глобальная биржа",
    desc: "Конвертер 20+ валют с таблицей курсов",
    icon: "DollarSign",
    color: "#39ff14",
    tag: "20+ СТРАН",
    url: "https://equation-master--voevodavladik.replit.app/exchange/",
  },
  {
    id: "budget",
    title: ">BASE_CALCULATOR_",
    desc: "Считает лимит трат на день по доходу",
    icon: "Wallet",
    color: "#ff006e",
    tag: "ФИНАНСЫ",
    url: "https://equation-master--voevodavladik.replit.app/number-base-calc/",
  },
  {
    id: "lifeprice",
    title: "УНИВЕРСАЛЬНЫЙ КОНВЕРТЕР",
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
    title: "Конвертер криптовалют",
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

      {/* Promo block */}
      <div className="cyber-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 pointer-events-none" />
        <div className="relative space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Zap" size={14} className="text-neon-cyan" />
            <span className="text-xs font-mono text-neon-cyan tracking-widest uppercase">Почему CalcHub?</span>
          </div>
          <p className="font-rajdhani text-xl md:text-2xl font-semibold text-foreground leading-snug max-w-3xl">
            Забудь про разрозненные сайты и неудобные приложения —
            здесь собраны <span className="neon-text-cyan">8 профессиональных инструментов</span>, которые
            закрывают 99% повседневных математических задач.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: "Rocket", color: "#00f5ff", title: "Мгновенный результат", desc: "Никаких кнопок «Посчитать» — ответ появляется сразу при вводе" },
              { icon: "Shield", color: "#bf00ff", title: "Работает без интернета", desc: "Все расчёты выполняются прямо в браузере, данные никуда не уходят" },
              { icon: "Star", color: "#ff006e", title: "Продуманный интерфейс", desc: "Каждый калькулятор заточен под конкретную задачу — ничего лишнего" },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                  <Icon name={item.icon} size={14} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="font-rajdhani font-bold text-sm text-foreground mb-0.5">{item.title}</p>
                  <p className="text-xs font-rajdhani text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
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

      {/* Users badge */}
      <div className="flex justify-center pb-4">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-sm">
          <div className="flex -space-x-2">
            {["#00f5ff", "#bf00ff", "#ff006e", "#39ff14"].map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-cyber-900 flex items-center justify-center text-[10px]"
                style={{ background: `${c}25`, borderColor: c, boxShadow: `0 0 6px ${c}60` }}>
                <Icon name="User" size={12} style={{ color: c }} />
              </div>
            ))}
          </div>
          <div>
            <p className="font-orbitron text-sm font-bold neon-text-cyan">18 743</p>
            <p className="text-[10px] font-mono text-muted-foreground">человека уже используют</p>
          </div>
        </div>
      </div>
    </div>
  );
}