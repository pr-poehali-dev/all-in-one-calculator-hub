import Icon from "@/components/ui/icon";

const tools = [
  { id: "dashboard", label: "Главная", icon: "LayoutGrid", color: "cyan" },
  { id: "geometry", label: "Геометрия", icon: "Triangle", color: "cyan" },
  { id: "algebra", label: "Алгебра", icon: "Sigma", color: "purple" },
  { id: "crypto", label: "Крипто", icon: "Bitcoin", color: "yellow" },
  { id: "currency", label: "Валюты", icon: "DollarSign", color: "green" },
  { id: "budget", label: "Бюджет", icon: "Wallet", color: "pink" },
  { id: "lifeprice", label: "Цена жизни", icon: "Clock", color: "orange" },
  { id: "plotter", label: "График", icon: "TrendingUp", color: "cyan" },
  { id: "probability", label: "Вероятность", icon: "Dice5", color: "purple" },
];

const colorMap: Record<string, { text: string; border: string; bg: string; shadow: string }> = {
  cyan:   { text: "text-neon-cyan",   border: "border-neon-cyan",   bg: "bg-neon-cyan/10",   shadow: "shadow-neon-cyan" },
  purple: { text: "text-neon-purple", border: "border-neon-purple", bg: "bg-neon-purple/10", shadow: "shadow-neon-purple" },
  pink:   { text: "text-neon-pink",   border: "border-neon-pink",   bg: "bg-neon-pink/10",   shadow: "shadow-neon-pink" },
  yellow: { text: "text-yellow-400",  border: "border-yellow-400",  bg: "bg-yellow-400/10",  shadow: "shadow-[0_0_10px_#facc15]" },
  green:  { text: "text-neon-green",  border: "border-neon-green",  bg: "bg-neon-green/10",  shadow: "shadow-neon-green" },
  orange: { text: "text-orange-400",  border: "border-orange-400",  bg: "bg-orange-400/10",  shadow: "shadow-[0_0_10px_#fb923c]" },
};

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 h-screen flex flex-col border-r border-neon-cyan/10 bg-cyber-900/90 backdrop-blur-xl overflow-hidden">
      {/* Logo */}
      <div className="p-6 border-b border-neon-cyan/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/40 flex items-center justify-center shadow-neon-cyan">
            <span className="text-sm font-orbitron font-bold neon-text-cyan">∑</span>
          </div>
          <div>
            <h1 className="font-orbitron text-sm font-bold neon-text-cyan tracking-widest">CALCHUB</h1>
            <p className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">v1.0 · 8 tools</p>
          </div>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent animate-glow-pulse" />

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tools.map((tool, i) => {
          const isActive = activeId === tool.id;
          const colors = colorMap[tool.color] || colorMap.cyan;

          return (
            <button
              key={tool.id}
              onClick={() => onSelect(tool.id)}
              style={{ animationDelay: `${i * 50}ms` }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 animate-slide-in-right group
                ${isActive
                  ? `${colors.bg} ${colors.border} border ${colors.shadow}`
                  : "border border-transparent hover:border-white/5 hover:bg-white/[0.03]"
                }
              `}
            >
              <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200
                ${isActive ? colors.bg : "bg-white/[0.04] group-hover:bg-white/[0.07]"}`}>
                <Icon
                  name={tool.icon}
                  size={14}
                  className={isActive ? colors.text : "text-muted-foreground group-hover:text-foreground"}
                />
              </div>
              <span className={`font-rajdhani font-semibold text-sm tracking-wide transition-colors duration-200
                ${isActive ? colors.text : "text-muted-foreground group-hover:text-foreground"}`}>
                {tool.label}
              </span>
              {isActive && (
                <div className={`ml-auto w-1 h-4 rounded-full ${colors.bg} ${colors.shadow}`}
                  style={{ background: tool.color === 'cyan' ? 'var(--neon-cyan)' : tool.color === 'purple' ? 'var(--neon-purple)' : tool.color === 'pink' ? 'var(--neon-pink)' : undefined }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neon-cyan/10">
        <p className="text-[10px] text-muted-foreground/40 font-mono text-center tracking-wider">
          ALL SYSTEMS ONLINE ◉
        </p>
      </div>
    </aside>
  );
}
