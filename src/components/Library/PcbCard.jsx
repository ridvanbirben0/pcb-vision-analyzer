import React from 'react';

export default function PcbCard({ item, onSelect, onEdit, onDelete }) {
  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-lg shadow-black/40">
      <div>
        <div className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelect(item)}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/75 text-emerald-400 backdrop-blur-md border border-emerald-500/30">
              {item.category}
            </span>
          </div>
          <div className="absolute bottom-3 right-3 text-[11px] font-mono px-2 py-0.5 rounded bg-black/80 text-slate-300 border border-slate-700">
            {item.components?.length || 0} Bileşen
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 onClick={() => onSelect(item)} className="font-bold text-white text-base hover:text-emerald-400 cursor-pointer transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {item.purpose}
          </p>

          {item.userNotes && (
            <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-lg text-[11px] text-cyan-200/90 font-mono">
              📝 <span className="font-semibold text-slate-300">Not:</span> {item.userNotes}
            </div>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-3 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between">
        <button onClick={() => onSelect(item)} className="text-xs text-slate-300 hover:text-white font-medium">
          Detayları Gör
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(item)}
            title="Kartı Düzenle (Update)"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 transition-all text-xs"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(item)}
            title="Kartı Sil (Delete)"
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/80 text-slate-300 hover:text-rose-400 transition-all text-xs"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
