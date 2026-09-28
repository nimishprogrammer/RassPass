import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <aside 
      aria-label="Notifications"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 pointer-events-none"
    >
      <div 
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#1b1c24] border border-[#ffa000]/40 text-stone-100 shadow-2xl shadow-black/80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <div className="w-5 h-5 rounded-full bg-[#ffa000]/20 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#ffa000]" aria-hidden="true" />
        </div>
        <span className="text-xs font-medium text-stone-200">{toastMessage}</span>
        <Sparkles className="w-3.5 h-3.5 text-[#ffa000]/60 ml-1" aria-hidden="true" />
      </div>
    </aside>
  );
};
