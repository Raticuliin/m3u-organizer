import DashboardTitle from '../shared/DashboardTitle';
import FilterGroup from '../browser/FilterGroup';
import FooterSection from './sections/FooterSection';
import MainSection from './sections/MainSection';
import type { Game } from '../../../domain/entities/types';

export default function SourceBrowser({
  gameList,
  addGameToQueue,
  addAllGamesToQueue,
}: {
  gameList: Game[];
  addGameToQueue: (...props: any) => void;
  addAllGamesToQueue: (...props: any) => void;
}) {
  const section = 'browser';

  return (
    <section
      className="
        bg-emerald-500/3
        flex-1 flex flex-col
        border-r border-emerald-500/10"
    >
      {/** Seccion dearriba */}
      <section
        className="
          h-1/5
          p-5 
          flex flex-col justify-between
          border-b border-emerald-500/10"
      >
        <DashboardTitle text="Browser" />
        <FilterGroup />
      </section>
      <MainSection section={section} gameList={gameList} moveGame={addGameToQueue} />
      <FooterSection section={section} gameList={gameList} moveAllGames={addAllGamesToQueue} />
    </section>
  );
}
