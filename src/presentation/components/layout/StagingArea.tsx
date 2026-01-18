import { CircleArrowRight, RotateCcw } from 'lucide-react';
import Button from '../shared/Button';
import DashboardTitle from '../shared/DashboardTitle';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';
import type { Game, Tab } from '../../../domain/entities/types';

interface Props {
  isLoading: boolean;
  currentTab: Tab;
  gameList: Game[];
  removeGameFromQueue: (...args: any) => void;
  removeAllGamesFromQueue: (...args: any) => void;
  convertGames: () => void;
}

export default function StagingArea({
  isLoading,
  currentTab,
  gameList,
  removeGameFromQueue,
  removeAllGamesFromQueue,
  convertGames,
}: Props) {
  const section = 'queue';
  const isConvert = currentTab === 'convert';
  return (
    <section className="flex-1 flex flex-col bg-stone-900/50 min-w-0">
      {/* Header Fijo */}
      <div className="h-42 p-6 border-b border-white/5 flex flex-col justify-between bg-stone-900 z-10">
        <div className="flex items-center justify-between">
          <DashboardTitle text="Staging Queue" />
          <span className="text-xs font-mono text-stone-500 bg-stone-800 px-2 py-1 rounded-md">
            {gameList.length} Items
          </span>
        </div>

        <Button
          onClick={convertGames}
          isLoading={isLoading}
          disabled={gameList.length === 0}
          Icon={isConvert ? CircleArrowRight : RotateCcw}
          text={isConvert ? 'Start Conversion' : 'Revert Selected'}
          color={isConvert ? 'emerald' : 'amber'}
        />
      </div>

      {/* Lista con Scroll */}
      <MainSection section={section} gameList={gameList} moveGame={removeGameFromQueue} />

      {/* Footer Fijo */}
      <FooterSection section={section} gameList={gameList} moveAllGames={removeAllGamesFromQueue} />
    </section>
  );
}
