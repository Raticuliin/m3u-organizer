import { useMemo, useState } from 'react';

import type { Game } from '../../domain/entities/types';
import { createScanFolder } from '../../app/use-cases/scan-folder.use-case';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export function useScanFolder(fileSystem: IFileSystem) {
  const [games, setGames] = useState<Game[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasDirectory, setHasDirectory] = useState(false);

  const scanFolder = useMemo(() => createScanFolder(fileSystem), [fileSystem]);

  const scan = async (discPattern: string) => {
    setIsScanning(true);

    try {
      const result = await scanFolder(discPattern);
      setGames(result);
      setHasDirectory(true);
    } catch (error) {
      console.error(`Error scanning folder: `, error);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    games,
    setGames,
    hasDirectory,
    isScanning,
    scan,
  };
}
