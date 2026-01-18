import { Ghost, Inbox } from 'lucide-react';
import type { Game, Section } from '../../../../domain/entities/types';
import GameItem from '../../shared/GameItem';

interface Props {
  section: Section;
  gameList?: Game[];
  moveGame: (game: Game) => void;
}

export default function MainSection({ section, gameList, moveGame }: Props) {
  if (!gameList || gameList.length === 0) {
    return (
      <section className="flex-1 flex flex-col items-center justify-center text-stone-600 gap-4 p-8 select-none">
        <div className="p-4 rounded-full bg-stone-800/50">
          {section === 'browser' ? (
            <Ghost size={48} strokeWidth={1.5} />
          ) : (
            <Inbox size={48} strokeWidth={1.5} />
          )}
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-stone-400">
            {section === 'browser' ? 'No games found' : 'Queue is empty'}
          </p>
          <p className="text-sm">
            {section === 'browser'
              ? 'Try changing filters or scanning again.'
              : 'Add games from the browser to convert them.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent">
      {gameList.map((game) => (
        <GameItem key={game.name} game={game} variant={section} moveGame={moveGame} />
      ))}
    </section>
  );
}
