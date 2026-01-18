import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <div className="relative group">
      <div
        className="
          absolute left-3 top-1/2 -translate-y-1/2 
          text-stone-500 
          group-focus-within:text-emerald-400 
          transition-colors duration-200
          pointer-events-none"
      >
        {/* Ajustamos el tamaño y grosor para que se vea nítido */}
        <Search className="w-4 h-4" strokeWidth={2.5} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full 
          py-2.5 pl-10 pr-4 
          text-sm font-medium text-stone-200
          bg-stone-950/50 
          border border-stone-700 
          rounded-xl
          placeholder:text-stone-600
          
          focus:outline-none 
          focus:border-emerald-500/50 
          focus:bg-stone-900
          focus:ring-1 focus:ring-emerald-500/20
          
          transition-all duration-200 ease-out
        "
      />
    </div>
  );
}
