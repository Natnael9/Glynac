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
      <div className="w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl p-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#ffffff] !text-black text-[#ffffff]">
              <BookmarkCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#ffffff] tracking-wider">
                Regulatory Reference
              </span>
              <h4 className="text-xs font-bold text-white">{activeCitation.ruleCode}</h4>
            </div>
          </div>
          <button
            onClick={() => setActiveCitation(null)}
            className="p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-3 text-xs">
          <div>
            <h5 className="font-semibold text-[#ededed] mb-1">{activeCitation.title}</h5>
            <div className="p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] text-[#d1d1d1] font-mono text-[11px] leading-relaxed italic">
              "{activeCitation.excerpt}"
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Cross-referenced against SEC EDGAR and FINRA Regulatory Rulebook.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-between text-xs">
          {activeCitation.documentId && (
            <Link
              href="/vdr"
              onClick={() => setActiveCitation(null)}
              className="flex items-center gap-1.5 text-[#ffffff] hover:text-[#ededed] font-medium"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Source Document in VDR</span>
            </Link>
          )}

          <a
            href={activeCitation.url || 'https://www.finra.org/rules-guidance'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#888888] hover:text-white ml-auto"
          >
            <span>Official Rulebook</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

