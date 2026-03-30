import { useState } from "react";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

interface LayoutProps {
  activeId: string;
  onSelect: (id: string) => void;
  children: React.ReactNode;
}

export default function Layout({ activeId, onSelect, children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background grid-bg">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar activeId={activeId} onSelect={onSelect} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="min-h-full p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNav activeId={activeId} onSelect={onSelect} />
      </div>
    </div>
  );
}
