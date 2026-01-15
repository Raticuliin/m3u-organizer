import { useMemo, useState } from 'react';
import type { Filter, Game } from '../../domain/entities/types';
import { filterGames } from '../../domain/logic/game-filter';

export function useFilterGames(games: Game[]) {
  const [filter, setFilters] = useState<Filter>({
    search: '',
    status: 'all',
    onlyMultiDisc: false,
  });

  const filterGameList = useMemo(() => filterGames(games, filter), [games, filter]);

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const resetFilters = () =>
    setFilters({
      search: '',
      status: 'all',
      onlyMultiDisc: false,
    });

  return {
    filter,
    filterGameList,
    updateFilter,
    resetFilters,
  };
}
