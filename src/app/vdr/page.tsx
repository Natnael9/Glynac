'use client';

import React from 'react';
import { useVDR } from '@/lib/vdrContext';
import { FileExplorer } from '@/components/vdr/FileExplorer';
import { DocumentPreviewer } from '@/components/vdr/DocumentPreviewer';
import { PermissionModal } from '@/components/vdr/PermissionModal';
import { AuditLogDrawer } from '@/components/vdr/AuditLogDrawer';
import { UploadModal } from '@/components/vdr/UploadModal';
import Link from 'next/link';

export default function VDRPage() {
  const { documents, activeDoc } = useVDR();

  const totalDocs = documents.length;
  const flaggedCount = documents.reduce((sum, d) => sum + d.flaggedClauses.length, 0);
  const restrictedCount = documents.filter((d) => d.sensitivity === 'Restricted').length;

  return (
    <div className="flex flex-col h-full bg-[#000000] overflow-hidden select-none text-xs">
      {/* Top Simple Sub-header — Pure Stark Monochrome */}
      <div className="border-b border-[#1a1a1a] bg-[#050505] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Virtual Data Room
            </h1>
            <p className="text-xs text-[#888888]">
              Secure document repository, permissions, and audit logs
            </p>
          </div>

          {/* Simple Clean Monochrome Metrics */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#0a0a0a] border border-[#222222]">
              <span className="text-[#666666] text-[10px] sm:text-[11px]">Files:</span>
              <span className="font-semibold text-white text-[10px] sm:text-[11px] font-mono">{totalDocs}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#0a0a0a] border border-[#222222]">
              <span className="text-[#666666] text-[10px] sm:text-[11px]">Flagged:</span>
              <span className="font-semibold text-white text-[10px] sm:text-[11px] font-mono">{flaggedCount}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#0a0a0a] border border-[#222222]">
              <span className="text-[#666666] text-[10px] sm:text-[11px]">Restricted:</span>
              <span className="font-semibold text-white text-[10px] sm:text-[11px] font-mono">{restrictedCount}</span>
            </div>

            <Link
              href="/chat"
              className="px-2.5 py-1 rounded bg-[#ffffff] text-[#000000] hover:bg-[#eaeaea] text-[10px] sm:text-[11px] font-medium transition-colors"
            >
              Ask AI
            </Link>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Dynamic File Explorer */}
        <div className={`h-full transition-all duration-150 ${activeDoc ? 'w-full lg:w-3/5 xl:w-7/12' : 'w-full'}`}>
          <FileExplorer />
        </div>

        {/* Right: In-App Document Previewer */}
        {activeDoc && (
          <>
            {/* Desktop split view */}
            <div className="hidden lg:block lg:w-2/5 xl:w-5/12 h-full border-l border-[#1a1a1a] bg-[#050505]">
              <DocumentPreviewer />
            </div>

            {/* Mobile / Tablet Full-Screen Sheet */}
            <div className="lg:hidden fixed inset-0 z-40 bg-[#050505] flex flex-col animate-in slide-in-from-right duration-200">
              <DocumentPreviewer />
            </div>
          </>
        )}
      </div>

      {/* Modals & Drawers */}
      <PermissionModal />
      <AuditLogDrawer />
      <UploadModal />
    </div>
  );
}
