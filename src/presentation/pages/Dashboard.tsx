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
        h-screen w-full overflow-hidden
        flex 
      bg-stone-900 text-white"
    >
      <Sidebar handleScan={handleScan} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex flex-1 overflow-hidden">
        {browserSlot}
        {queueSlot}
      </main>
    </div>
  );
}
