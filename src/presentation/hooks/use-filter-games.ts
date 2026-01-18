import { useMemo, useState } from 'react';
import type { Filter, Game } from '../../domain/entities/types';
import { filterGames } from '../../domain/logic/game-filter';

export function useFilterGames(games: Game[]) {
  const [filter, setFilters] = useState<Filter>({
    search: '',
    onlyMultiDisc: false,
  });

  const filteredGames = useMemo(() => filterGames(games, filter), [games, filter]);

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const resetFilters = () =>
    setFilters({
      search: '',
      onlyMultiDisc: false,
    });

  return {
    filter,
    filteredGames,
    updateFilter,
    resetFilters,
  };
}
