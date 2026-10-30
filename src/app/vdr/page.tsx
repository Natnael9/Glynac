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
    <div className="flex flex-col h-full bg-[#0c0d0e] overflow-hidden select-none font-mono text-[11px]">
      {/* Dense Utilitarian Stats Header */}
      <div className="border-b border-[#1f2126] bg-[#0c0d0e] px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white uppercase tracking-wider">
            DATA_ROOM // ARCHIVE
          </span>
          <span className="text-[#525766]">|</span>
          <div className="flex items-center gap-3 text-[10px]">
            <span>
              TOTAL: <span className="text-white font-bold">{totalDocs}</span>
            </span>
            <span>
              FLAGGED: <span className="text-[#f59e0b] font-bold">{flaggedCount}</span>
            </span>
            <span>
              RESTRICTED: <span className="text-[#f43f5e] font-bold">{restrictedCount}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="terminal-btn bg-[#17181c] hover:bg-[#f59e0b] hover:text-black hover:border-[#f59e0b] font-semibold text-[10px] px-2.5 py-1 uppercase"
          >
            [ DISPATCH_AI_AUDIT ]
          </Link>
        </div>
      </div>

      {/* Split Workstation View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Explorer */}
        <div className={`h-full ${activeDoc ? 'w-full lg:w-3/5 xl:w-7/12' : 'w-full'}`}>
          <FileExplorer />
        </div>

        {/* Right Preview */}
        {activeDoc && (
          <div className="hidden lg:block lg:w-2/5 xl:w-5/12 h-full border-l border-[#1f2126] bg-[#0c0d0e]">
            <DocumentPreviewer />
          </div>
        )}
      </div>

      <PermissionModal />
      <AuditLogDrawer />
      <UploadModal />
    </div>
  );
}
