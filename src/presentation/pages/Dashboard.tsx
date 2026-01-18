import { useState } from 'react';
import type { Game, Tab } from '../../domain/entities/types';
import Sidebar from '../components/layout/Sidebar';
import SourceBrowser from '../components/layout/SourceBrowser';
import StagingArea from '../components/layout/StagingArea';

export default function Dashboard({
  handleScan,
  browserGameList,
  queueGameList,
  addGameToQueue,
  addAllGamesToQueue,
  removeGameFromQueue,
  removeAllGamesFromQueue,
}: {
  handleScan: (discPattern: string) => void;
  browserGameList: Game[];
  queueGameList: Game[];
  addGameToQueue: (...props: any) => void;
  addAllGamesToQueue: (...props: any) => void;
  removeGameFromQueue: (...props: any) => void;
  removeAllGamesFromQueue: (...props: any) => void;
}) {
  const [currentTab, setCurrentTab] = useState<Tab>('convert');

  return (
    <div
      className="
        h-screen w-full overflow-hidden
        flex 
      bg-stone-900 text-white"
    >
      <Sidebar handleScan={handleScan} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="flex flex-1 overflow-hidden">
        <SourceBrowser
          gameList={browserGameList}
          addGameToQueue={addGameToQueue}
          addAllGamesToQueue={addAllGamesToQueue}
        />
        <StagingArea
          gameList={queueGameList}
          removeGameFromQueue={removeGameFromQueue}
          removeAllGamesFromQueue={removeAllGamesFromQueue}
        />
      </main>
    </div>
  );
}
