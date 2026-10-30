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
  ShieldCheck,
  FileText,
  Lock,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export default function VDRPage() {
  const { documents, activeDoc } = useVDR();

  // Metrics
  const totalDocs = documents.length;
  const flaggedCount = documents.reduce((sum, d) => sum + d.flaggedClauses.length, 0);
  const restrictedCount = documents.filter((d) => d.sensitivity === 'Restricted').length;

  return (
    <div className="flex flex-col h-full bg-[#060911] overflow-hidden select-none">
      {/* Top VDR Metrics Banner with Glassmorphic Gradient */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-[#090d16]/95 via-[#0d1322]/90 to-[#090d16]/95 backdrop-blur-md px-4 sm:px-6 py-3.5 z-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-blue-600/10 to-transparent border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <FolderLock className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-white tracking-tight">
                  Virtual Data Room
                </h1>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold tracking-wider uppercase">
                  WORM Immutable Ledger
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Cryptographically audited document repository with real-time compliance parser & RBAC.
              </p>
            </div>
          </div>

          {/* KPI Capsule Cards */}
          <div className="flex items-center gap-2.5 text-xs">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-sm">
              <div className="p-1 rounded-lg bg-blue-500/10 text-blue-400">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold block leading-none">
                  Repository Files
                </span>
                <span className="font-bold text-white text-xs font-mono">{totalDocs} Documents</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-sm">
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

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 shadow-sm">
              <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                <Lock className="h-3.5 w-3.5" />
              </div>
              <div>
                <span className="text-rose-400/80 text-[9px] uppercase tracking-wider font-semibold block leading-none">
                  Restricted Tier
                </span>
                <span className="font-bold text-rose-300 text-xs font-mono">{restrictedCount} Locked</span>
              </div>
            </div>

            <Link
              href="/chat"
              className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all hover:scale-102"
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
              <span>Ask AI About Docs</span>
              <ArrowRight className="h-3.5 w-3.5 text-indigo-200" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace with Subtle Texture */}
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
