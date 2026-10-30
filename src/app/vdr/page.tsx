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
      {/* Top Simple Sub-header - Linear Monochrome */}
      <div className="border-b border-[#1c1c1c] bg-[#050505] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">
            Repository
          </span>
          <span className="text-[#333333]">/</span>
          <div className="flex items-center gap-3 text-[11px] text-[#8a8a8a]">
            <span>{totalDocs} files</span>
            <span>•</span>
            <span className={flaggedCount > 0 ? 'text-[#e5e5e5]' : ''}>{flaggedCount} flagged</span>
            <span>•</span>
            <span>{restrictedCount} restricted</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="px-2.5 py-1 rounded border border-[#262626] bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#ededed] text-xs transition-colors"
          >
            Audit with AI
          </Link>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Dynamic File Explorer */}
        <div className={`h-full ${activeDoc ? 'w-full lg:w-3/5 xl:w-7/12' : 'w-full'}`}>
          <FileExplorer />
        </div>

        {/* Right: In-App Document Previewer */}
        {activeDoc && (
          <div className="hidden lg:block lg:w-2/5 xl:w-5/12 h-full border-l border-[#1c1c1c] bg-[#050505]">
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
