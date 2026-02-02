# CLAUDE.md - AI Assistant Guide for M3U Organizer

## Project Overview

**M3U Organizer** is a free, browser-based web application for converting multi-disc `.CHD` game files into organized `.M3U` playlists for emulators (RetroArch, EmuDeck, Batocera). The app runs entirely in the browser using the File System Access API—no backend required.

**Website:** https://m3uorganizer.com/
**Version:** 0.1.0

## Quick Commands

```bash
npm run dev      # Start development server (Vite with HMR)
npm run build    # Type-check and build for production
npm run lint     # Run ESLint on all files
npm run preview  # Preview production build locally
```

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19.2 |
| Language | TypeScript 5.9 (strict mode) |
| Build Tool | Vite 7.2 with SWC |
| Styling | Tailwind CSS 4.1 |
| Icons | Lucide React |
| File Operations | File System Access API |
| Analytics | Vercel Analytics + Speed Insights |
| Deployment | Vercel |

## Architecture

The project follows **Clean Architecture** (Ports & Adapters pattern) with clear separation of concerns:

```
src/
├── domain/                  # Business logic (no framework dependencies)
│   ├── entities/
│   │   └── types.ts         # Core types: Game, Filter, Tab, Format, Section
│   ├── logic/
│   │   ├── game-parser.ts   # Parse CHD files, detect multi-disc games
│   │   ├── game-filter.ts   # Filter games by search/multi-disc status
│   │   └── m3u-generator.ts # Generate M3U playlist content
│   └── repositories/
│       └── file-system.interface.ts  # IFileSystem contract (dependency inversion)
│
├── app/                     # Application layer (use cases)
│   └── use-cases/
│       ├── scan-folder.use-case.ts   # Scan directory for CHD files
│       ├── organize-game.use-case.ts # Create folder + M3U + move discs
│       └── revert-game.use-case.ts   # Undo organization
│
├── infrastructure/          # External adapters
│   └── file-system/
│       └── browser-file-system.ts    # File System Access API implementation
│
├── presentation/            # UI layer (React)
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   └── Dashboard.tsx    # Main application interface
│   ├── components/
│   │   ├── layout/          # Sidebar, SourceBrowser, StagingArea
│   │   ├── shared/          # Button, GameItem, Header, NavItem
│   │   ├── home/            # Hero, FeaturesSection, etc.
│   │   └── browser/         # FilterGroup, FilterPill, SearchBar
│   └── hooks/
│       ├── use-organizer.ts      # Main orchestration hook
│       ├── use-scan-folder.ts    # Directory scanning
│       ├── use-organize-game.ts  # Single game conversion
│       ├── use-revert-game.ts    # Single game reversion
│       └── use-filter-games.ts   # Game filtering logic
│
├── App.tsx                  # Root component with state management
├── main.tsx                 # React DOM entry point
└── index.css                # Tailwind CSS imports
```

### Key Architectural Principles

1. **Domain layer is pure** - No React, no browser APIs, just TypeScript functions
2. **Dependency inversion** - Infrastructure implements domain interfaces (`IFileSystem`)
3. **Factory pattern** - Use cases are created via factory functions (`createScanFolder`, etc.)
4. **Unidirectional data flow** - State flows down via props, events bubble up via callbacks

## Core Domain Concepts

### Types (`src/domain/entities/types.ts`)

```typescript
type GroupingStrategy = 'safe' | 'aggressive';  // Disc matching strategy
type Section = 'browser' | 'queue';
type Tab = 'convert' | 'revert';
type Format = '.chd';

interface Game {
  name: string;
  isMultiDisc: boolean;
  discs: string[];
  format: '.chd' | '.m3u';
  isConverted: boolean;
}

interface Filter {
  search: string;
  onlyMultiDisc: boolean;
}
```

### Game Processing Workflow

1. **Scan** - User selects folder, app finds `.chd` files and existing `.m3u` directories
2. **Parse** - Group discs by game name using regex (`game-parser.ts`)
3. **Filter** - User can search by name or filter multi-disc only
4. **Queue** - Add games to staging area for batch processing
5. **Organize** - Create `{GameName}.m3u/` folder with M3U file and move disc files
6. **Revert** - Move discs back to root and delete the `.m3u` folder

## Code Conventions

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Domain/Logic | `kebab-case.ts` | `game-parser.ts` |
| Use Cases | `kebab-case.use-case.ts` | `scan-folder.use-case.ts` |
| React Components | `PascalCase.tsx` | `Dashboard.tsx` |
| Hooks | `use-kebab-case.ts` | `use-organizer.ts` |
| Interfaces | Prefix with `I` | `IFileSystem` |

### TypeScript

- **Strict mode enabled** - All strict checks active
- **No unused variables/parameters** - Enforced by `tsconfig.app.json`
- **Prefer type inference** - Only add explicit types when necessary
- **Use `type` for aliases, `interface` for contracts**
- **Export types explicitly** - `export type { Game }` or `export interface IFileSystem`

### React Patterns

- **Functional components only** - No class components
- **Destructure props in function signature** - `function Button({ label, onClick }: Props)`
- **Custom hooks for logic extraction** - Keep components focused on rendering
- **Composition over prop drilling** - Use slot pattern (see `browserSlot`, `queueSlot` in App.tsx)
- **Memoize expensive computations** - Use `useMemo` for parsing/filtering

### Tailwind CSS

- **Utility-first approach** - Compose classes directly in JSX
- **Dark theme** - Stone (grays), Emerald (success), Rose (danger) color palette
- **Conditional classes** - Use template literals or ternaries
- **Consistent spacing** - Follow Tailwind's spacing scale

Example:
```tsx
<button className={`px-4 py-2 rounded ${isActive ? 'bg-emerald-600' : 'bg-stone-700'}`}>
```

### Prettier Configuration

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}
```

## Important Implementation Details

### File System Access API (`browser-file-system.ts`)

- Uses `FileSystemDirectoryHandle` and `FileSystemFileHandle` from the Web API
- Caches handles in `Map` for O(1) lookups
- **Known limitation**: Uses `as any` casting for the experimental `.move()` method
- Permissions are lost on page reload (no persistence implemented yet)

### Game Parser (`game-parser.ts`)

- Uses regex to detect disc tags: `(Disc N)` pattern
- Two strategies:
  - `safe` (default): Removes only the disc tag portion
  - `aggressive`: Truncates at first disc tag position
- Natural sorting for disc ordering using `localeCompare({ numeric: true })`

### M3U Generation (`m3u-generator.ts`)

- Simple text format: one filename per line
- Files sorted naturally by disc number
- Output stored in `{GameName}.m3u/` folder

## Key Files Reference

| Purpose | File |
|---------|------|
| Main entry point | `src/main.tsx` |
| Root component | `src/App.tsx` |
| State orchestration | `src/presentation/hooks/use-organizer.ts` |
| File system adapter | `src/infrastructure/file-system/browser-file-system.ts` |
| Game parsing logic | `src/domain/logic/game-parser.ts` |
| Core types | `src/domain/entities/types.ts` |
| Vite config | `vite.config.ts` |
| TypeScript config | `tsconfig.app.json` |
| ESLint config | `eslint.config.js` |

## Known Limitations / TODO

- **No tests** - Unit tests needed, especially for `game-parser.ts`
- **`any` casting** - Required for experimental File System Access API methods
- **Limited error handling** - Errors mostly go to console, not UI
- **No permission persistence** - Could use IndexedDB to store file handles
- **No progress indicators** - Large libraries may feel unresponsive
- **Hardcoded disc pattern** - Currently only matches `(Disc N)` format
- **CHD only** - Only `.chd` format supported currently

## Development Tips

### Adding a New Feature

1. Start in `domain/` - Define types and pure logic first
2. Create use case in `app/use-cases/` - Wire domain logic with interfaces
3. Implement adapter in `infrastructure/` if needed
4. Add hook in `presentation/hooks/` - Bridge to React state
5. Build UI in `presentation/components/`

### Debugging

- Check browser console for file system errors
- Use React DevTools to inspect component state
- The `useOrganizer` hook's `status` object tracks busy state

### Version Injection

The app version from `package.json` is available via:
```typescript
import.meta.env.PACKAGE_VERSION
```

## Deployment

- **Platform**: Vercel
- **Configuration**: `vercel.json` handles SPA routing (all routes → `index.html`)
- **Analytics**: Integrated via `@vercel/analytics` and `@vercel/speed-insights`

## Git Workflow

- Main development happens on feature branches
- Keep commits focused and descriptive
- Run `npm run lint` before committing
- Run `npm run build` to verify type-checking passes
