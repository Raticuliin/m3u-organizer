import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  onClick: () => void;
  Icon: LucideIcon;
  text: string;
}

export default function Button({ onClick, Icon, text }: ButtonProps) {
  return (
    <button
      className="
            flex gap-3 items-center justify-center
            text-bold
            w-full py-4
            rounded-xl 
            shadow-xl shadow-emerald-500/10
            active:scale-98
            hover:cursor-pointer hover:bg-emerald-400
            transition-all duration-100 ease-in
          text-stone-950 bg-emerald-500"
      onClick={onClick}
    >
      <div>
        <Icon strokeWidth={2} />
      </div>
      <p>{text}</p>
    </button>
  );
}
