'use client';

import React from 'react';
import { useChat } from '@/lib/chatContext';
import { BookmarkCheck, X, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export function CitationPopover() {
  const { activeCitation, setActiveCitation } = useChat();

  if (!activeCitation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <BookmarkCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                Regulatory Reference
              </span>
              <h4 className="text-xs font-bold text-white">{activeCitation.ruleCode}</h4>
            </div>
          </div>
          <button
            onClick={() => setActiveCitation(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3 text-xs">
          <div>
            <h5 className="font-semibold text-slate-200 mb-1">{activeCitation.title}</h5>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 font-mono text-[11px] leading-relaxed italic">
              "{activeCitation.excerpt}"
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Cross-referenced against SEC EDGAR and FINRA Regulatory Rulebook.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          {activeCitation.documentId && (
            <Link
              href="/vdr"
              onClick={() => setActiveCitation(null)}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Source Document in VDR</span>
            </Link>
          )}

          <a
            href={activeCitation.url || 'https://www.finra.org/rules-guidance'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white ml-auto"
          >
            <span>Official Rulebook</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

