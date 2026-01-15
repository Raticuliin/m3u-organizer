import type { IFileSystem } from '../../domain/repositories/file-system.interface';
import type { Game } from '../../domain/entities/types';
import { useState } from 'react';

import { useScanFolder } from './use-scan-folder';
import { useOrganizeGame } from './use-organize-game';
import { useRevertGame } from './use-revert-game';

export function useOrganizer(fileSystem: IFileSystem) {
  const { games, isScanning, scan, setGames } = useScanFolder(fileSystem);

  const { isOrganizing, organize } = useOrganizeGame(fileSystem);
  const [isOrganizingList, setIsOrganizingList] = useState(false);

  const { isReverting, revert } = useRevertGame(fileSystem);
  const [isRevertingList, setIsRevertingList] = useState(false);

  const organizeList = async (gameList: Game[]) => {
    setIsOrganizingList(true);

    try {
      for (const game of gameList) {
        await organize(game);
      }
    } catch (error) {
      console.error(`Error organizing the list `, error);
    } finally {
      setIsOrganizingList(false);
    }
  };

  const revertList = async (gameList: Game[]) => {
    setIsRevertingList(true);

    try {
      for (const game of gameList) {
        await revert(game);
      }
    } catch (error) {
      console.error(`Error reverting the list `, error);
    } finally {
      setIsRevertingList(false);
    }
  };

  return {
    scan,
    organize,
    revert,
    organizeList,
    revertList,
    status: {
      isScanning,
      isOrganizing,
      isReverting,
      isOrganizingList,
      isRevertingList,
      isBusy: isScanning || isOrganizing || isReverting || isOrganizingList || isRevertingList,
    },
    games,
    setGames,
  };
}
