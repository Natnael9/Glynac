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
} from 'lucide-react';
import Link from 'next/link';

export default function VDRPage() {
  const { documents, activeDoc } = useVDR();

  // Metrics
  const totalDocs = documents.length;
  const flaggedCount = documents.reduce((sum, d) => sum + d.flaggedClauses.length, 0);
  const restrictedCount = documents.filter((d) => d.sensitivity === 'Restricted').length;

  return (
    <div className="flex flex-col h-full bg-[#090d16] overflow-hidden">
      {/* Top VDR Metrics Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 px-4 sm:px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
              <FolderLock className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                Virtual Data Room (VDR)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  Active WORM Ledger
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Secure document hierarchy, instant previewer, granular RBAC, and audit trails.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <FileText className="h-4 w-4 text-blue-400" />
              <div>
                <span className="text-slate-400 text-[10px] block leading-none">Total Docs</span>
                <span className="font-bold text-white text-xs">{totalDocs} files</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <div>
                <span className="text-amber-400/80 text-[10px] block leading-none">Rule Violations</span>
                <span className="font-bold text-amber-300 text-xs">{flaggedCount} Flagged</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20">
              <Lock className="h-4 w-4 text-red-400" />
              <div>
                <span className="text-red-400/80 text-[10px] block leading-none">Restricted</span>
                <span className="font-bold text-red-300 text-xs">{restrictedCount} Files</span>
              </div>
            </div>

            <Link
              href="/chat"
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 font-medium transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>Ask AI About Docs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
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

