import type { Game } from '../../domain/entities/types';
import { parseGames } from '../../domain/logic/game-parser';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export type ScanFolderUseCase = (discPattern: string) => Promise<Game[]>;

export const createScanFolder = (fileSystem: IFileSystem): ScanFolderUseCase => {
  return async (discPattern: string) => {
    const entries = await fileSystem.scanDirectory();

    if (entries.length === 0) return [];

    // Busco los juegos organizados
    const organizedNames = entries
      .filter((name) => name.toLowerCase().endsWith('.m3u'))
      .map((name) => name.replace(/\.m3u$/i, ''));

    // Busco los archivos sueltos
    const chdFiles = entries.filter((name) => name.toLowerCase().endsWith('.chd'));

    const detectedGames = parseGames(discPattern, chdFiles);

    const finalGames: Game[] = detectedGames.map((game) => {
      const isAlreadyOrganized = organizedNames.includes(game.name);
      return {
        ...game,
        status: isAlreadyOrganized ? 'organized' : 'pending',
      };
    });

    for (const orgName of organizedNames) {
      const alreadyInList = finalGames.some((g) => g.name === orgName);

      if (!alreadyInList) {
        const folderName = `${orgName}.m3u`;
        const discsInside = await fileSystem.getFilesInFolder(folderName);

        finalGames.push({
          name: orgName,
          discs: discsInside,
          isMultiDisc: discsInside.length > 1,
          status: 'organized',
        });
      }
    }

    return finalGames;
  };
};
