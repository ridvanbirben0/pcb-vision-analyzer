import React from 'react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  const { message, type } = toast;

  const bgColors = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-500 text-rose-100',
    info: 'bg-cyan-900/90 border-cyan-500 text-cyan-100'
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl backdrop-blur-md transition-all ${bgColors[type] || bgColors.info}`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white font-bold ml-2">✕</button>
    </div>
  );
}
