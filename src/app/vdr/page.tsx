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
    <div className="flex flex-col h-full bg-[#090a0f] overflow-hidden select-none">
      {/* Top Simple Sub-header — Clean border, no glow, no dots */}
      <div className="border-b border-[#1e222d] bg-[#0c0e14] px-4 sm:px-6 py-2.5 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xs font-semibold text-white">
              Virtual Data Room
            </h1>
            <p className="text-[11px] text-[#8b92a0]">
              Secure document repository, permissions, and audit trails
            </p>
          </div>

          {/* Simple Clean Metrics */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10121a] border border-[#1e222d]">
              <span className="text-[#8b92a0] text-[11px]">Documents:</span>
              <span className="font-semibold text-white text-[11px] font-mono">{totalDocs}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10121a] border border-[#1e222d]">
              <span className="text-[#8b92a0] text-[11px]">Flagged:</span>
              <span className="font-semibold text-amber-400 text-[11px] font-mono">{flaggedCount}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#10121a] border border-[#1e222d]">
              <span className="text-[#8b92a0] text-[11px]">Restricted:</span>
              <span className="font-semibold text-rose-400 text-[11px] font-mono">{restrictedCount}</span>
            </div>

            <Link
              href="/chat"
              className="px-2.5 py-1 rounded bg-[#1e222d] hover:bg-[#282d3c] text-white text-[11px] font-medium transition-colors"
            >
              Ask AI
            </Link>
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace — Clean solid surfaces */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Dynamic File Explorer */}
        <div className={`h-full transition-all duration-200 ${activeDoc ? 'w-full lg:w-3/5 xl:w-7/12' : 'w-full'}`}>
          <FileExplorer />
        </div>

        {/* Right: In-App Document Previewer */}
        {activeDoc && (
          <div className="hidden lg:block lg:w-2/5 xl:w-5/12 h-full border-l border-[#1e222d] bg-[#0c0e14]">
            <DocumentPreviewer />
          </div>
        )}
      </div>

      {/* Modals & Drawers */}
      <PermissionModal />
      <AuditLogDrawer />
      <UploadModal />
    </div>
  );
}
