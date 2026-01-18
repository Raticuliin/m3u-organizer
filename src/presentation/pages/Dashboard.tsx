import { type ReactNode } from 'react';
import type { Tab } from '../../domain/entities/types';
import Sidebar from '../components/layout/Sidebar';

interface Props {
  handleScan: (discPattern: string) => void;
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
  browserSlot: ReactNode;
  queueSlot: ReactNode;
}

export default function Dashboard({
  handleScan,
  currentTab,
  setCurrentTab,
  browserSlot,
  queueSlot,
}: Props) {
  return (
    <div
      className="
        flex h-screen w-screen overflow-hidden bg-stone-950 text-emerald-50 font-sans selection:bg-emerald-500/30"
    >
      <Sidebar handleScan={handleScan} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex flex-1 overflow-hidden bg-stone-900 shadow-2xl rounded-l-3xl my-2 mr-2 border border-white/5 relative z-10">
        {browserSlot}
        {queueSlot}
      </main>
    </div>
  );
}
