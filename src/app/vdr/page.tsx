'use client';

import React from 'react';
import { useVDR } from '@/lib/vdrContext';
import { FileExplorer } from '@/components/vdr/FileExplorer';
import { DocumentPreviewer } from '@/components/vdr/DocumentPreviewer';
import { PermissionModal } from '@/components/vdr/PermissionModal';
import { AuditLogDrawer } from '@/components/vdr/AuditLogDrawer';
import { UploadModal } from '@/components/vdr/UploadModal';
import {
  FolderLock,
  AlertTriangle,
  FileText,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function VDRPage() {
  const { documents, activeDoc } = useVDR();

  // Metrics
  const totalDocs = documents.length;
  const flaggedCount = documents.reduce((sum, d) => sum + d.flaggedClauses.length, 0);
  const restrictedCount = documents.filter((d) => d.sensitivity === 'Restricted').length;

  return (
    <div className="flex flex-col h-full bg-[#07090e] overflow-hidden select-none">
      {/* Top VDR Metrics Banner with Obsidian & Gold Trim */}
      <div className="border-b border-[#d4af37]/15 bg-gradient-to-r from-[#0b0e14]/95 via-[#10141d]/90 to-[#0b0e14]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#d4af37]/5">
              <FolderLock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-display font-bold text-[#f5deb3] tracking-wider uppercase">
                  Virtual Data Room
                </h1>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/25 font-mono font-semibold tracking-wider uppercase">
                  SEA 17a-4 WORM LEDGER
                </span>
              </div>
              <p className="text-[11px] text-[#8c909a] font-medium">
                Cryptographically audited LP document repository with real-time compliance parser & RBAC.
              </p>
            </div>
          </div>

          {/* KPI Capsule Cards */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#121722]/80 border border-white/5 shadow-sm">
              <div className="p-1 rounded-lg bg-[#d4af37]/10 text-[#d4af37]">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-[#8c909a] text-[9px] uppercase tracking-wider font-semibold block leading-none">
                  Repository Files
                </span>
                <span className="font-bold text-[#f4f4f7] text-xs font-mono">{totalDocs} Documents</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#121722]/80 border border-amber-500/20 shadow-sm">
              <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-amber-400/80 text-[9px] uppercase tracking-wider font-semibold block leading-none">
                  Flagged Clauses
                </span>
                <span className="font-bold text-amber-300 text-xs font-mono">{flaggedCount} Active</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#121722]/80 border border-rose-500/20 shadow-sm">
              <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-rose-400/80 text-[9px] uppercase tracking-wider font-semibold block leading-none">
                  Restricted Tier
                </span>
                <span className="font-bold text-rose-300 text-xs font-mono">{restrictedCount} Files</span>
              </div>
            </div>

            <Link
              href="/chat"
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:from-[#e5c158] hover:to-[#be9312] text-[#07090e] font-bold text-xs shadow-md shadow-[#d4af37]/15 transition-all hover:scale-102"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#07090e]" />
              <span>Ask AI About Docs</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#07090e]" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace with Subtle Gold Dot Matrix */}
      <div className="flex-1 flex overflow-hidden regulatory-watermark">
        {/* Left: Dynamic File Explorer */}
        <div className={`h-full transition-all duration-300 ${activeDoc ? 'w-full lg:w-3/5 xl:w-7/12' : 'w-full'}`}>
          <FileExplorer />
        </div>

        {/* Right: In-App Document Previewer (Split-Screen) */}
        {activeDoc && (
          <div className="hidden lg:block lg:w-2/5 xl:w-5/12 h-full shadow-2xl transition-all duration-300">
            <DocumentPreviewer />
          </div>
        )}
      </div>

      {/* Slide-out Drawers & Modals */}
      <PermissionModal />
      <AuditLogDrawer />
      <UploadModal />
    </div>
  );
}
