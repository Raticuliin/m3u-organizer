import { Coffee, Folder, RotateCcw, SquareLibrary } from 'lucide-react';
import Header from '../shared/Header';
import NavItem from '../shared/NavItem';
import Button from '../shared/Button';
import type { Tab } from '../../../domain/entities/types';

interface Props {
  handleScan: (discPattern: string) => void;
  currentTab: Tab;
  setCurrentTab: (value: Tab) => void;
}

export default function Sidebar({ handleScan, currentTab, setCurrentTab }: Props) {
  const handleBuyMeACoffee = () => {
    const username = 'raticuliin';

    window.open(`https://www.buymeacoffee.com/${username}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <aside className="w-72 shrink-0 flex flex-col justify-between p-6 bg-stone-950 text-stone-300">
      <div className="flex flex-col gap-8">
        <Header />

        <nav className="flex flex-col gap-2">
          <p className="px-4 text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            Menu
          </p>
          <NavItem
            Icon={SquareLibrary}
            text="Convert games"
            isActive={currentTab === 'convert'}
            setIsActive={() => setCurrentTab('convert')}
          />
          <NavItem
            Icon={RotateCcw}
            text="Revert games"
            isActive={currentTab === 'revert'}
            setIsActive={() => setCurrentTab('revert')}
          />
        </nav>
      </div>
      <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
        <Button
          Icon={Coffee}
          text="Buy me a coffee"
          variant="secondary"
          color="amber"
          onClick={handleBuyMeACoffee}
        />
        <Button
          Icon={Folder}
          text="Select folder"
          variant="secondary"
          color="blue"
          onClick={handleScan}
        />
      </div>
    </aside>
  );
}
