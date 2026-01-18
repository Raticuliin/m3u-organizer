interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterPill({ label, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
          px-3 py-1.5
          rounded-full
          text-xs font-medium tracking-wide
          border
          transition-all duration-200 ease-out
          active:scale-95
          select-none
          
          ${
            isActive
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.1)]'
              : 'bg-transparent border-stone-700 text-stone-500 hover:border-stone-500 hover:text-stone-300 hover:bg-stone-800'
          }
      `}
    >
      {label}
    </button>
  );
}
