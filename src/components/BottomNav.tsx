import Icon from "@/components/ui/icon";

const tools = [
  { id: "dashboard", label: "Главная", icon: "LayoutGrid" },
  { id: "geometry", label: "Геометрия", icon: "Triangle" },
  { id: "algebra", label: "Алгебра", icon: "Sigma" },
  { id: "crypto", label: "Крипто", icon: "Bitcoin" },
  { id: "currency", label: "Валюты", icon: "DollarSign" },
  { id: "budget", label: "Бюджет", icon: "Wallet" },
  { id: "lifeprice", label: "Цена", icon: "Clock" },
  { id: "plotter", label: "График", icon: "TrendingUp" },
  { id: "probability", label: "Вероятность", icon: "Dice5" },
];

interface BottomNavProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function BottomNav({ activeId, onSelect }: BottomNavProps) {
  return (
    <div className="flex items-center justify-around bg-cyber-900/95 backdrop-blur-xl border-t border-neon-cyan/10 px-1 py-2 overflow-x-auto gap-1">
      {tools.map((tool) => {
        const isActive = activeId === tool.id;
        return (
          <button
            key={tool.id}
            onClick={() => onSelect(tool.id)}
            className={`flex flex-col items-center gap-0.5 min-w-[48px] px-2 py-1.5 rounded-lg transition-all duration-200
              ${isActive ? "bg-neon-cyan/10 border border-neon-cyan/30 shadow-neon-cyan" : "border border-transparent"}`}
          >
            <Icon
              name={tool.icon}
              size={16}
              className={isActive ? "text-neon-cyan" : "text-muted-foreground"}
            />
            <span className={`text-[9px] font-rajdhani font-semibold tracking-wide whitespace-nowrap
              ${isActive ? "neon-text-cyan" : "text-muted-foreground"}`}>
              {tool.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
