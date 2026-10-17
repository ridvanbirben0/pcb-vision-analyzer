import React from 'react';

export default function Navbar({ activeTab, setActiveTab, libraryCount }) {
  const tabs = [
    { id: 'analyze', label: 'PCB Analiz', badge: null },
    { id: 'library', label: 'Kart Kütüphanesi', badge: libraryCount },
    { id: 'dashboard', label: 'İstatistikler', badge: null },
    { id: 'guide', label: 'Rehber & Rapor', badge: null }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('analyze')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 text-black font-extrabold text-xl">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              PCB Vision AI
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Akıllı Baskılı Devre Analiz & Bileşen Kütüphanesi</p>
          </div>
        </div>

        <nav className="flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== null && (
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-mono font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
