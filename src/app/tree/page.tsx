'use client';

import React from 'react';
import Link from 'next/link';
import { Network, Sparkles, ArrowLeft } from 'lucide-react';

export default function TreePlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#090d16]">
      <div className="h-16 w-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-lg shadow-indigo-500/10">
        <Network className="h-8 w-8" />
      </div>
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
        Task 4 • Day 2 Roadmap
      </span>
      <h2 className="text-xl font-bold text-white mb-2">Interactive Visual Tree & DAG Editor</h2>
      <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
        Visual canvas workspace with zoom, pan, draggable rule node palette, slide-over properties inspector, auto-layout, and JSON import/export.
      </p>
      <Link
        href="/vdr"
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Virtual Data Room (Task 1)
      </Link>
    </div>
  );
}

