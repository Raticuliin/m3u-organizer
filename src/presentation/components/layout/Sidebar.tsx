import { Coffee, Folder, IterationCcw, SquareLibrary } from 'lucide-react';
import Header from '../shared/Header';
import NavItem from '../shared/NavItem';
import Button from '../shared/Button';
import type { Tab } from '../../../domain/entities/types';

export default function Sidebar({
  handleScan,
  currentTab,
  setCurrentTab,
}: {
  handleScan: (discPattern: string) => void;
  currentTab: Tab;
  setCurrentTab: (value: Tab) => void;
}) {
  return (
    <aside
      className="

        bg-emerald-950/3
        p-5
        relative
        flex flex-col justify-between
        border-r border-r-emerald-500/10 
      "
    >
      <div>
        <Header />

        <nav className="flex flex-col gap-2">
          <NavItem
            Icon={SquareLibrary}
            text="Convert games"
            isActive={currentTab === 'convert'}
            setIsActive={() => setCurrentTab('convert')}
          />
          <NavItem
            Icon={IterationCcw}
            text="Revert games"
            isActive={currentTab === 'revert'}
            setIsActive={() => setCurrentTab('revert')}
          />
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          Icon={Coffee}
          text="Buy me a coffee"
          variant="secondary"
          color="amber"
          onClick={() => {}}
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
