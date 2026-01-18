import type { Filter } from '../../../domain/entities/types';
import { FilterPill } from './FilterPill';
import { SearchBar } from './SearchBar';

const BOOLEAN_FILTERS: { key: keyof Filter; label: string }[] = [
  { key: 'onlyMultiDisc', label: 'Only multidisc' },
];

interface Props {
  currentFilter: Filter;
  onUpdateFilter: (newFilter: Partial<Filter>) => void;
}

export default function FilterGroup({ currentFilter, onUpdateFilter }: Props) {
  if (!currentFilter) return null;

  const handleSearchChange = (value: string) => {
    onUpdateFilter({ search: value });
  };

  const toggleFilter = (key: keyof Filter) => {
    onUpdateFilter({ [key]: !currentFilter[key] });
  };

  return (
    <section className="flex flex-col gap-3">
      <SearchBar
        value={currentFilter.search}
        onChange={handleSearchChange}
        placeholder="Search games..."
      />
      <ul className="flex flex-wrap gap-2">
        {BOOLEAN_FILTERS.map((filterConfig) => (
          <FilterPill
            key={filterConfig.key}
            label={filterConfig.label}
            isActive={currentFilter[filterConfig.key] as boolean}
            onClick={() => toggleFilter(filterConfig.key)}
          />
        ))}
      </ul>
    </section>
  );
}
