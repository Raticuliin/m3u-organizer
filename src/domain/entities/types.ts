export interface Filter {
  search: string;
  onlyMultiDisc: boolean;
}

export interface Game {
  name: string;
  isMultiDisc: boolean;
  discs: string[];
  format: '.chd' | '.m3u';
  isConverted: boolean;
}

export type GroupingStrategy = 'safe' | 'aggressive';
export type Section = 'browser' | 'queue';
export type Tab = 'convert' | 'revert';
