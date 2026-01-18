import type { Game, Section } from '../../../../domain/entities/types';
import GameItem from '../../shared/GameItem';

interface Props {
  section: Section;
  gameList?: Game[];
  moveGame: (...args: any) => void;
}

export default function MainSection({ section, gameList, moveGame }: Props) {
  if (!gameList || gameList.length === 0) {
    return (
      <section
        className="
          p-5
          overflow-y-auto
          flex-1 flex flex-col gap-2
          border-b border-emerald-500/10"
      >
        No games found
      </section>
    );
  }

  return (
    <section
      className="
          p-5
          overflow-y-auto
          flex-1 flex flex-col gap-2
          border-b border-emerald-500/10"
    >
      {gameList.map((game) => (
        <GameItem key={game.name} game={game} variant={section} moveGame={moveGame} />
      ))}
    </section>
  );
}
