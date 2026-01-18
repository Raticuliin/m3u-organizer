import type { Filter, Game } from '../entities/types';

export function filterGames(gameList: Game[], filter: Filter): Game[] {
  return gameList.filter((game) => {
    const matchesName = game.name.toLocaleLowerCase().includes(filter.search.toLowerCase());

    const matchesOnlyMultiDisc = filter.onlyMultiDisc ? game.isMultiDisc : true;

    return matchesName && matchesOnlyMultiDisc;
  });
}
