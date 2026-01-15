import type { Game } from '../../domain/entities/types';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export function createRevertGame(fileSystem: IFileSystem) {
  return async (game: Game) => {
    await fileSystem.revertGame(game);
  };
}
