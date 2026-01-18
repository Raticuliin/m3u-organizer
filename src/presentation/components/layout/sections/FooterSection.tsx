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
    <section className="p-5">
      {section === 'browser' ? (
        <Button
          Icon={PlusSquare}
          text="Add all games"
          variant="secondary"
          onClick={() => moveAllGames(gameList)}
        />
      ) : (
        <Button
          Icon={MinusSquare}
          text="Remove all games"
          variant="secondary"
          color="rose"
          onClick={() => moveAllGames(gameList)}
        />
      )}
    </section>
  );
}
