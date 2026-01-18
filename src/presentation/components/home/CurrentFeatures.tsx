// src/components/home/CurrentFeatures.tsx
import { FileStack, RotateCcw, Search } from 'lucide-react';
import { FeatureItem } from './FeatureItem';

export default function CurrentFeatures() {
  return (
    <article
      className="
        flex-1
        border-2 rounded-3xl
        p-8
        bg-emerald-950/20 border-emerald-500/10
        flex flex-col gap-6
      "
    >
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <span className="bg-emerald-500 text-stone-900 text-xs font-bold px-2 py-1 rounded-full uppercase">
          Available
        </span>
        <h3 className="text-xl font-bold text-white">Current Features</h3>
      </div>

      <ul className="flex flex-col gap-5">
        <FeatureItem
          Icon={FileStack}
          title="Transform .chd to .m3u"
          desc="Automatically organizes multi-disc .chd games into folders with a generated .m3u playlist."
        />
        <FeatureItem
          Icon={RotateCcw}
          title="Revert Changes"
          desc="Undo the process easily. Extracts .chd files back to the root and removes the folders."
        />
        <FeatureItem
          Icon={Search}
          title="Filter & Search"
          desc="Real-time searching and filtering to manage specific games in your library."
        />
      </ul>
    </article>
  );
}
