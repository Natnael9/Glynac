'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';

export default function AdminPlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-[#090d16]">
      <div className="h-16 w-16 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
        <ShieldAlert className="h-8 w-8" />
      </div>
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
        Task 3 • Day 3 Roadmap
      </span>
      <h2 className="text-xl font-bold text-white mb-2">Enterprise Admin Panel & Governance</h2>
      <p className="text-xs text-slate-400 max-w-md mb-6 leading-relaxed">
        Executive analytics dashboard, user RBAC role management table, compliance rule policy editor, system health monitor, and feature flag toggles.
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

