import DashboardTitle from '../shared/DashboardTitle';
import FilterGroup from '../browser/FilterGroup';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';
import type { Filter, Game } from '../../../domain/entities/types';

interface Props {
  gameList: Game[];
  addGameToQueue: (game: Game) => void;
  addAllGamesToQueue: (games: Game[]) => void;
  filter: Filter;
  updateFilter: (newFilter: Partial<Filter>) => void;
}

export default function SourceBrowser({
  gameList,
  addGameToQueue,
  addAllGamesToQueue,
  filter,
  updateFilter,
}: Props) {
  const section = 'browser';

  return (
    <section className="flex-1 flex flex-col border-r border-white/5 bg-stone-900 min-w-0">
      {/* Header Fijo */}
      <div className="h-42 p-6 border-b border-white/5 flex flex-col gap-4 bg-stone-900 z-10">
        <DashboardTitle text="Library Browser" />
        <FilterGroup currentFilter={filter} onUpdateFilter={updateFilter} />
      </div>

      {/* Lista con Scroll */}
      <MainSection section={section} gameList={gameList} moveGame={addGameToQueue} />

      {/* Footer Fijo */}
      <FooterSection section={section} gameList={gameList} moveAllGames={addAllGamesToQueue} />
    </section>
  );
}
