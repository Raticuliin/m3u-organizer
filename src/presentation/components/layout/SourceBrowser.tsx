import DashboardTitle from '../shared/DashboardTitle';
import FilterGroup from '../browser/FilterGroup';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';
import type { Filter, Game } from '../../../domain/entities/types';

interface Props {
  gameList: Game[];
  addGameToQueue: (...props: any) => void;
  addAllGamesToQueue: (...props: any) => void;
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
    <section
      className="
        bg-emerald-500/3
        flex-1 flex flex-col
        border-r border-emerald-500/10"
    >
      {/** Seccion de arriba */}
      <section
        className="
          h-1/6
          p-5 
          flex flex-col justify-between
          border-b border-emerald-500/10"
      >
        <DashboardTitle text="Browser" />
        <FilterGroup currentFilter={filter} onUpdateFilter={updateFilter} />
      </section>
      <MainSection section={section} gameList={gameList} moveGame={addGameToQueue} />
      <FooterSection section={section} gameList={gameList} moveAllGames={addAllGamesToQueue} />
    </section>
  );
}
