import { useMemo, useState, useEffect } from 'react';
// Hooks y Arquitectura
import { useOrganizer } from './presentation/hooks/use-organizer';
import { useFilterGames } from './presentation/hooks/use-filter-games';
import { createBrowserFileSystem } from './infrastructure/file-system/browser-file-system';
import type { Game } from './domain/entities/types';

// --- ICONOS SVG ---
const IconGamepad = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
    />
  </svg>
);
const IconFolder = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);
const IconSearch = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const IconChevronRight = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);
const IconChevronLeft = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);
const IconPlusSquare = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const IconTrash = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

export default function App() {
  const fileSystem = useMemo(() => createBrowserFileSystem(), []);

  const { scan, organize, revert, status, games, setGames } = useOrganizer(fileSystem);
  const { filterGameList: filteredGames, filter, updateFilter } = useFilterGames(games);

  const [activeTab, setActiveTab] = useState<'pending' | 'organized'>('pending');
  const [queue, setQueue] = useState<Game[]>([]);

  const DISC_PATTERN = 'Disc';

  // Sincronización automática de filtros
  useEffect(() => {
    updateFilter({ status: activeTab });
    setQueue([]);
  }, [activeTab]);

  // --- LOGICA DE COLA ---
  const addToQueue = (game: Game) => {
    if (!queue.find((g) => g.name === game.name)) setQueue([...queue, game]);
  };

  const removeFromQueue = (name: string) => {
    setQueue((prev) => prev.filter((g) => g.name !== name));
  };

  const addAllToQueue = () => {
    // Filtramos los que ya están en la cola para no duplicar
    const gamesToAdd = filteredGames.filter((g) => !queue.find((q) => q.name === g.name));
    setQueue([...queue, ...gamesToAdd]);
  };

  const handleProcessQueue = async () => {
    for (const game of queue) {
      if (activeTab === 'pending') {
        await organize(game);
        setGames((prev) =>
          prev.map((g) => (g.name === game.name ? { ...g, status: 'organized' } : g)),
        );
      } else {
        await revert(game);
        setGames((prev) =>
          prev.map((g) => (g.name === game.name ? { ...g, status: 'pending' } : g)),
        );
      }
    }
    setQueue([]);
  };

  return (
    <div className="flex h-screen bg-[#0a0f12] text-slate-400 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d1317] border-r border-slate-800 flex flex-col p-6 flex-shrink-0 shadow-2xl">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <IconGamepad />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EmuStack</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'pending' ? 'bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'hover:bg-slate-800/50'}`}
          >
            Games to Convert
          </button>
          <button
            onClick={() => setActiveTab('organized')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'organized' ? 'bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.05)]' : 'hover:bg-slate-800/50'}`}
          >
            Converted Games
          </button>
        </nav>

        <button
          onClick={() => scan(DISC_PATTERN)}
          className="mt-auto flex items-center justify-center gap-3 w-full py-3 border border-emerald-500/30 text-emerald-500 rounded-xl hover:bg-emerald-500/10 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <IconFolder /> Select Folder
        </button>
      </aside>

      <main className="flex-1 flex overflow-hidden">
        {/* COLUMNA: LIBRARY */}
        <section className="flex-1 flex flex-col border-r border-slate-800/50 overflow-hidden">
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Library</h2>
                <span className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase">
                  {filteredGames.length} Available
                </span>
              </div>
            </div>

            <div className="relative mb-8">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Search unselected games..."
                className="w-full bg-[#121a1f] border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-emerald-500/50 text-white placeholder:text-slate-600 transition-all"
                value={filter.search}
                onChange={(e) => updateFilter({ search: e.target.value })}
              />
            </div>

            <div className="space-y-3 pb-4">
              {filteredGames
                .filter((g) => !queue.find((q) => q.name === g.name))
                .map((game) => (
                  <div
                    key={game.name}
                    className="flex items-center justify-between p-4 bg-[#0d1317] border border-slate-800/50 rounded-2xl group hover:border-emerald-500/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-[#121a1f] rounded-xl text-emerald-500 shadow-inner">
                        <IconGamepad />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{game.name}</h3>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-0.5">
                          {game.discs.length} Discs (.chd)
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => addToQueue(game)}
                      className="p-2.5 bg-[#121a1f] border border-slate-800 rounded-xl hover:bg-emerald-500 hover:text-[#0a0f12] transition-all transform active:scale-90 shadow-lg"
                    >
                      <IconChevronRight />
                    </button>
                  </div>
                ))}
            </div>
          </div>

          {/* BOTÓN: ADD ALL FILTERED */}
          <div className="p-6 bg-[#0d1317]/50 border-t border-slate-800/50">
            <button
              onClick={addAllToQueue}
              disabled={filteredGames.length === 0}
              className="w-full py-4 bg-[#121a1f] border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <IconPlusSquare /> Add all filtered games
            </button>
          </div>
        </section>

        {/* COLUMNA: SELECTION QUEUE */}
        <section className="w-[480px] bg-[#0a0f12] flex flex-col overflow-hidden">
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white tracking-tight">Selection Queue</h2>
              <span
                className={`text-[9px] px-2 py-0.5 rounded font-black tracking-widest uppercase ${activeTab === 'pending' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}
              >
                {queue.length} Selected
              </span>
            </div>

            <button
              disabled={queue.length === 0 || status.isBusy}
              onClick={handleProcessQueue}
              className={`w-full py-4 font-black rounded-xl mb-12 transition-all shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] ${activeTab === 'pending' ? 'bg-emerald-500 hover:bg-emerald-400 text-[#0a0f12] shadow-emerald-500/10' : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/10'} disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none`}
            >
              {status.isBusy
                ? 'PROCESSING...'
                : activeTab === 'pending'
                  ? 'CONVERT'
                  : 'DESCONVERTIR'}{' '}
              ({queue.length} GAMES)
            </button>

            <div className="space-y-4">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-6">
                Queue Process
              </p>
              {queue.map((game) => (
                <div
                  key={game.name}
                  className={`flex items-center justify-between p-4 bg-[#0d1317] border rounded-2xl transition-all animate-in slide-in-from-right-4 duration-300 ${activeTab === 'pending' ? 'border-emerald-500/10' : 'border-rose-500/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl ${activeTab === 'pending' ? 'bg-emerald-500/5 text-emerald-500' : 'bg-rose-500/5 text-rose-500'}`}
                    >
                      <IconGamepad />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs">{game.name}</h3>
                      <p
                        className={`text-[9px] font-mono mt-0.5 ${activeTab === 'pending' ? 'text-emerald-500/60' : 'text-rose-500/60'}`}
                      >
                        {activeTab === 'pending'
                          ? `OUTPUT: ${game.name}.m3u`
                          : 'STATUS: REVERTING TO ROOT'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromQueue(game.name)}
                    className="p-2 text-slate-700 hover:text-rose-500 transition-colors"
                  >
                    <IconChevronLeft />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOTÓN: CLEAR ALL */}
          <div className="p-6 bg-[#0a0f12] border-t border-slate-800/50">
            <button
              onClick={() => setQueue([])}
              disabled={queue.length === 0}
              className="w-full py-4 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-0"
            >
              <IconTrash /> Clear all selected
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
