export function FeatureItem({
  Icon,
  title,
  desc,
  isDimmed = false,
}: {
  Icon: any;
  title: string;
  desc: string;
  isDimmed?: boolean;
}) {
  return (
    <li className={`flex gap-4 items-start ${isDimmed ? 'opacity-60' : ''}`}>
      <div
        className={`
        p-2 rounded-lg mt-1
        ${isDimmed ? 'bg-stone-800 text-stone-600' : 'bg-emerald-500/10 text-emerald-400'}
      `}
      >
        <Icon size={20} />
      </div>
      <div>
        <h4 className={`font-semibold ${isDimmed ? 'text-stone-400' : 'text-stone-200'}`}>
          {title}
        </h4>
        <p className="text-sm text-stone-500 leading-tight">{desc}</p>
      </div>
    </li>
  );
}
