// src/components/home/RoadmapFeatures.tsx
import { Disc2, FolderTree, MonitorDown } from 'lucide-react';
import { FeatureItem } from './FeatureItem';

export default function RoadmapFeatures() {
  return (
    <article
      className="
        flex-1
        border-2 rounded-3xl
        p-8
        bg-stone-950/40 border-stone-800
        flex flex-col gap-6
      "
    >
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
        <span className="bg-stone-700 text-stone-300 text-xs font-bold px-2 py-1 rounded-full uppercase">
          Roadmap
        </span>
        <h3 className="text-xl font-bold text-stone-300">Future Updates</h3>
      </div>

      <ul className="flex flex-col gap-5 text-stone-500">
        <FeatureItem
          Icon={Disc2}
          title="More Formats (.bin/.cue)"
          desc="Support for converting other common formats like .bin/.cue and .iso to .m3u."
          isDimmed
        />
        <FeatureItem
          Icon={FolderTree}
          title="Custom File Structure"
          desc="Detect games inside subfolders instead of just root, and define custom output structures."
          isDimmed
        />
        <FeatureItem
          Icon={MonitorDown}
          title="Desktop Application"
          desc="A standalone native application for Windows/Mac/Linux with better performance."
          isDimmed
        />
      </ul>
    </article>
  );
}
