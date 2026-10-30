'use client';

import React, { useState } from 'react';
import { useVDR } from '@/lib/vdrContext';
import {
  FileText,
  AlertTriangle,
  Download,
  Lock,
  History,
  X,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Eye,
  FileCode,
  Tag,
  Info,
} from 'lucide-react';

export function DocumentPreviewer() {
  const {
    activeDoc,
    setSelectedDocId,
    setIsPermissionModalOpen,
    setIsAuditDrawerOpen,
    addAuditLog,
  } = useVDR();

  const [activeTab, setActiveTab] = useState<'preview' | 'flags' | 'json' | 'metadata'>('preview');
  const [copied, setCopied] = useState(false);
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);

  if (!activeDoc) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#050505] border-l border-[#1a1a1a]">
        <div className="h-14 w-14 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center mb-3 text-[#444444]">
          <Eye className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-[#d1d1d1]">No Document Selected</h4>
        <p className="text-xs text-[#888888] max-w-xs mt-1">
          Select any document from the file explorer to preview its contents, compliance flags, and audit records.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(activeDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeDoc.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeDoc.name;
    link.click();
    URL.revokeObjectURL(url);
    addAuditLog('Downloaded', activeDoc.id, `Downloaded watermarked copy (${activeDoc.name})`);
  };

  // Render text content with highlighted flagged sections
  const renderHighlightedContent = () => {
    const lines = activeDoc.content.split('\n');

    return (
      <div className="font-mono text-xs leading-relaxed space-y-1 text-[#d1d1d1]">
        {lines.map((line, index) => {
          const isFlagged =
            line.includes('[FLAGGED SECTION') ||
            line.includes('guarantees a minimum baseline') ||
            line.includes('without requirement for separate gross-of-fees');

          const isHeader = line.startsWith('#') || line.startsWith('SECTION');

          if (isFlagged) {
            return (
              <div
                key={index}
                className="p-2 my-1.5 rounded-lg bg-amber-500/10 border-l-4 border-amber-500 text-amber-200 font-medium relative group"
              >
                <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">
                  <AlertTriangle className="h-3 w-3" />
                  Compliance Flag Detected
                </div>
                <div>{line}</div>
              </div>
            );
          }

          if (isHeader) {
            return (
              <div key={index} className="text-white font-bold text-xs pt-2 pb-0.5 border-b border-[#1a1a1a]">
                {line}
              </div>
            );
          }

          return <div key={index}>{line || <br />}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#050505] border-l border-[#1a1a1a] overflow-hidden select-text">
      {/* Top Header */}
      <div className="p-4 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] shrink-0">
            <FileText className="h-4 w-4 text-[#ffffff]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{activeDoc.name}</h4>
            <div className="flex items-center gap-2 text-[10px] text-[#888888] mt-0.5">
              <span>{(activeDoc.sizeBytes / 1024).toFixed(1)} KB</span>
              <span>•</span>
              <span className="text-[#ffffff] font-medium">{activeDoc.sensitivity}</span>
              {activeDoc.flaggedClauses.length > 0 && (
                <>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="h-2.5 w-2.5" />
                    {activeDoc.flaggedClauses.length} Violations
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy Content"
            className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
          <button
            onClick={handleDownload}
            title="Download Document"
            className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPermissionModalOpen(true)}
            title="Edit Permissions"
            className="p-1.5 rounded-lg text-[#888888] hover:text-[#ffffff] hover:bg-[#141414] transition-colors"
          >
            <Lock className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            title="Audit Trail"
            className="p-1.5 rounded-lg text-[#888888] hover:text-amber-400 hover:bg-[#141414] transition-colors"
          >
            <History className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSelectedDocId(null)}
            title="Close Preview"
            className="p-1.5 rounded-lg text-[#888888] hover:text-red-400 hover:bg-[#141414] transition-colors ml-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-[#1a1a1a] bg-[#050505] px-3 text-xs">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === 'preview'
              ? 'border-[#333333] text-[#ffffff]'
              : 'border-transparent text-[#888888] hover:text-[#ededed]'
          }`}
        >
          Document Preview
        </button>
        <button
          onClick={() => setActiveTab('flags')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'flags'
              ? 'border-amber-500 text-amber-400'
              : 'border-transparent text-[#888888] hover:text-[#ededed]'
          }`}
        >
          <span>Flagged Clauses</span>
          {activeDoc.flaggedClauses.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/20 text-amber-300 font-bold">
              {activeDoc.flaggedClauses.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === 'json'
              ? 'border-[#333333] text-[#ffffff]'
              : 'border-transparent text-[#888888] hover:text-[#ededed]'
          }`}
        >
          Raw JSON
        </button>
        <button
          onClick={() => setActiveTab('metadata')}
          className={`px-3 py-2 border-b-2 font-medium transition-colors ${
            activeTab === 'metadata'
              ? 'border-[#333333] text-[#ffffff]'
              : 'border-transparent text-[#888888] hover:text-[#ededed]'
          }`}
        >
          Metadata
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'preview' && (
          <div className="p-4 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-inner">
            {renderHighlightedContent()}
          </div>
        )}

        {activeTab === 'flags' && (
          <div className="space-y-3">
            {activeDoc.flaggedClauses.length === 0 ? (
              <div className="p-6 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                <Check className="h-6 w-6 mx-auto mb-2 text-emerald-400" />
                <p className="font-semibold">All Compliance Checks Passed</p>
                <p className="text-[11px] text-emerald-400/80 mt-1">
                  No FINRA, SEC, or internal policy violations flagged in this document.
                </p>
              </div>
            ) : (
              activeDoc.flaggedClauses.map((flag) => (
                <div
                  key={flag.id}
                  className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {flag.ruleCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        flag.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {flag.severity} Severity
                    </span>
                  </div>

                  <div className="p-2 rounded bg-[#050505] border border-[#1a1a1a] text-[11px] text-[#d1d1d1] font-mono mb-2 italic">
                    "{flag.textSnippet}"
                  </div>

                  <div className="text-xs text-[#d1d1d1] space-y-1">
                    <p>
                      <strong className="text-amber-400">Violation Reason:</strong> {flag.reason}
                    </p>
                    <p>
                      <strong className="text-emerald-400">Suggested Remedy:</strong> {flag.suggestedRemedy}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'json' && (
          <div className="p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] overflow-x-auto">
            <pre className="text-[11px] font-mono text-cyan-300 leading-tight">
              {JSON.stringify(activeDoc, null, 2)}
            </pre>
          </div>
        )}

        {activeTab === 'metadata' && (
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] space-y-2">
              <div className="flex justify-between py-1 border-b border-[#1a1a1a]">
                <span className="text-[#888888]">Document ID</span>
                <span className="font-mono text-[#ededed]">{activeDoc.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a1a1a]">
                <span className="text-[#888888]">Uploaded By</span>
                <span className="text-[#ededed]">{activeDoc.uploadedBy}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a1a1a]">
                <span className="text-[#888888]">Created At</span>
                <span className="text-[#ededed]">{new Date(activeDoc.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a1a1a]">
                <span className="text-[#888888]">Last Updated</span>
                <span className="text-[#ededed]">{new Date(activeDoc.updatedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#888888]">Security Sensitivity</span>
                <span className="font-bold text-[#ffffff]">{activeDoc.sensitivity}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a]">
              <h5 className="font-semibold text-[#d1d1d1] mb-2 flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-[#ffffff]" />
                Assigned Compliance Tags
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {activeDoc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-[#141414] text-[#ededed] border border-[#333333] text-[11px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

