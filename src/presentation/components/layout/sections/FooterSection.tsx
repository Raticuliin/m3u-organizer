import type { Game, Section } from '../../../../domain/entities/types';
import Button from '../../shared/Button';
import { MinusSquare, PlusSquare } from 'lucide-react';

export default function FooterSection({
  section,
  gameList,
  moveAllGames,
}: {
  section: Section;
  gameList: Game[];
  moveAllGames: (...props: any) => void;
}) {
  return (
    <section className="p-4 border-t border-white/5 bg-stone-900 z-10">
      {section === 'browser' ? (
        <Button
          Icon={PlusSquare}
          text="Add All to Queue"
          variant="secondary"
          disabled={gameList.length === 0}
          onClick={() => moveAllGames(gameList)}
        />
      ) : (
        <Button
          Icon={MinusSquare}
          text="Clear Queue"
          variant="secondary"
          color="rose"
          disabled={gameList.length === 0}
          onClick={() => moveAllGames(gameList)}
        />
      )}
    </section>
  );
}
