import { useMemo, useState, useEffect } from 'react';
// Hooks y Arquitectura
import { useOrganizer } from './presentation/hooks/use-organizer';
import { useFilterGames } from './presentation/hooks/use-filter-games';
import { createBrowserFileSystem } from './infrastructure/file-system/browser-file-system';
import type { Game, Tab } from './domain/entities/types';

import Home from './presentation/pages/Home';
import Dashboard from './presentation/pages/Dashboard';
import StagingArea from './presentation/components/layout/StagingArea';
import SourceBrowser from './presentation/components/layout/SourceBrowser';

// --- ICONOS SVG ---
export default function App() {
  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  const { scan, hasDirectory, organizeList, revertList, status, games, setGames } =
    useOrganizer(fileSystem);

  const { filteredGames, filter, updateFilter } = useFilterGames(games);

  const [currentTab, setCurrentTab] = useState<Tab>('convert');
  const [queueGameList, setQueueGameList] = useState<Game[]>([]);

  const DISC_PATTERN = 'Disc';

  const handleScan = () => {
    scan(DISC_PATTERN);
  };

  const browserGameList = filteredGames.filter(
    (game) => !queueGameList.some((queueGame) => queueGame.name === game.name),
  );

  const addGameToQueue = (game: Game) => {
    setQueueGameList((prev) => {
      if (prev.some((g) => g.name === game.name)) return prev;
      return [...prev, game];
    });
  };

  const addAllGamesToQueue = (browserGames: Game[]) => {
    browserGames.forEach((game) => {
      addGameToQueue(game);
    });
  };

  const removeGameFromQueue = (game: Game) => {
    setQueueGameList((prev) => {
      return prev.filter((g) => g.name !== game.name);
    });
  };

  const removeAllGamesFromQueue = (queueGames: Game[]) => {
    queueGames.forEach((game) => {
      removeGameFromQueue(game);
    });
  };

  if (!hasDirectory) {
    return <Home handleScan={handleScan} />;
  } else {
    return (
      <Dashboard
        handleScan={handleScan}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        browserSlot={
          <SourceBrowser
            gameList={browserGameList}
            addGameToQueue={addGameToQueue}
            addAllGamesToQueue={addAllGamesToQueue}
            filter={filter}
            updateFilter={updateFilter}
          />
        }
        queueSlot={
          <StagingArea
            gameList={queueGameList}
            removeGameFromQueue={removeGameFromQueue}
            removeAllGamesFromQueue={removeAllGamesFromQueue}
          />
        }
      />
    );
  }
}
