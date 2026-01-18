import type { LucideIcon } from 'lucide-react';

interface NavItemProps {
  Icon: LucideIcon;
  text: string;
  isActive: boolean;
  setIsActive: () => void;
}

export default function NavItem({ Icon, text, isActive, setIsActive }: NavItemProps) {
  return (
    <button
      className={`
        group flex items-center gap-3 w-full px-4 py-3 rounded-xl
        text-sm font-medium transition-all duration-200 ease-out
        border
        ${
          isActive
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-lg shadow-emerald-900/20'
            : 'bg-transparent text-stone-400 border-transparent hover:bg-stone-900 hover:text-stone-200'
        }
      `}
      onClick={setIsActive}
    >
      <div>
        <Icon
          size={20}
          strokeWidth={2}
          className={`transition-colors duration-200 ${isActive ? 'text-emerald-400' : 'text-stone-500 group-hover:text-stone-300'}`}
        ></Icon>
      </div>
      <p>{text}</p>
    </button>
  );
}
