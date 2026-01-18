import { Gamepad2, Minus, Plus } from 'lucide-react';
import type { Game, Section } from '../../../domain/entities/types';

interface GameItemProps {
  game: Game;
  variant: Section;
  moveGame: (game: Game) => void;
}

export default function GameItem({ game, variant = 'browser', moveGame }: GameItemProps) {
  const isBrowser = variant === 'browser';

  return (
    <div
      className={`
        group flex items-center justify-between
        p-3 rounded-xl
        border transition-all duration-200
        
        ${
          isBrowser
            ? 'bg-stone-800/40 border-stone-700 hover:border-emerald-500/30 hover:bg-stone-800'
            : 'bg-stone-800/20 border-stone-800 hover:border-rose-500/30 hover:bg-stone-800/60'
        }
      `}
    >
      {/* Información del Juego */}
      <div className="flex gap-4 items-center overflow-hidden">
        <div
          className={`
            p-2.5 rounded-lg shrink-0
            ${isBrowser ? 'bg-stone-900 text-emerald-500' : 'bg-stone-900 text-stone-500'}
          `}
        >
          <Gamepad2 strokeWidth={1.5} className="w-6 h-6" />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-stone-200 truncate pr-4 text-sm leading-tight">
            {game.name}
          </p>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            {game.discs.length} {game.discs.length === 1 ? 'disc' : 'discs'}
          </p>
        </div>
      </div>

      {/* Botón de Acción */}
      <button
        onClick={() => moveGame(game)}
        title={isBrowser ? 'Add to queue' : 'Remove from queue'}
        className={`
          p-2 rounded-lg shrink-0
          transition-all duration-200
          active:scale-95
          
          ${
            isBrowser
              ? 'text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
              : 'text-stone-500 hover:bg-rose-500/10 hover:text-rose-400'
          }
        `}
      >
        {isBrowser ? (
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        ) : (
          <Minus className="w-5 h-5" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
}
