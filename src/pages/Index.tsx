import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import GeometryCalc from "@/components/calculators/GeometryCalc";
import AlgebraCalc from "@/components/calculators/AlgebraCalc";
import CryptoCalc from "@/components/calculators/CryptoCalc";
import CurrencyCalc from "@/components/calculators/CurrencyCalc";
import BudgetCalc from "@/components/calculators/BudgetCalc";
import LifePriceCalc from "@/components/calculators/LifePriceCalc";
import FunctionPlotter from "@/components/calculators/FunctionPlotter";
import ProbabilityCalc from "@/components/calculators/ProbabilityCalc";

const STORAGE_KEY = "calchub_active_tool";

const toolMap: Record<string, React.ReactNode> = {
  geometry: <GeometryCalc />,
  algebra: <AlgebraCalc />,
  crypto: <CryptoCalc />,
  currency: <CurrencyCalc />,
  budget: <BudgetCalc />,
  lifeprice: <LifePriceCalc />,
  plotter: <FunctionPlotter />,
  probability: <ProbabilityCalc />,
};

export default function Index() {
  const [activeId, setActiveId] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || "dashboard"
  );

  const handleSelect = (id: string) => {
    setActiveId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return (
    <Layout activeId={activeId} onSelect={handleSelect}>
      <div key={activeId} className="animate-fade-in">
        {activeId === "dashboard"
          ? <Dashboard onSelect={handleSelect} />
          : toolMap[activeId] ?? <Dashboard onSelect={handleSelect} />
        }
      </div>
    </Layout>
  );
}
