'use client';

import { useState } from 'react';

interface TooltipProps {
  label: string;   // es. "Polymath"
  content: string; // testo del tooltip
}

export function Tooltip({ label, content }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* parola evidenziata */}
      <span className="underline decoration-dotted underline-offset-4">
        {label}
      </span>

      {/* pallino info */}
      <span className="w-4 h-4 rounded-full bg-purple-500 text-[10px] flex items-center justify-center text-white">
        i
      </span>

      {/* box tooltip */}
      {open && (
  <span className="absolute left-0 top-full mt-4 w-80 rounded-xl bg-slate-900 text-slate-100 text-base px-6 py-4 shadow-2xl z-50 leading-relaxed shadow-xl">
    {content}
  </span>
)}
    </span>
  );
}
