'use client';

import React, { useState, useRef } from 'react';
import { useVDR } from '@/lib/vdrContext';
import { SensitivityLevel } from '@/lib/types';
import {
  Upload,
  X,
  FileText,
  Shield,
  CheckCircle2,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export function UploadModal() {
  const {
    isUploadModalOpen,
    setIsUploadModalOpen,
    uploadDocument,
  } = useVDR();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    content: string;
    extension: 'pdf' | 'md' | 'txt' | 'json';
  } | null>(null);
  const [sensitivity, setSensitivity] = useState<SensitivityLevel>('Confidential');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUploadModalOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['pdf', 'md', 'txt', 'json'] as const;
    const extension = validExts.includes(ext as any) ? (ext as 'pdf' | 'md' | 'txt' | 'json') : 'txt';

    const reader = new FileReader();
    reader.onload = (event) => {
      const content =
        (event.target?.result as string) ||
        `# ${file.name}\n\nUploaded file content preview.\nVerified for compliance ingestion.`;

      setSelectedFile({
        name: file.name,
        size: file.size,
        content,
        extension,
      });
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSimulatedUpload = () => {
    if (!selectedFile) return;

    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            uploadDocument({
              name: selectedFile.name,
              size: selectedFile.size,
              content: selectedFile.content,
              extension: selectedFile.extension,
              sensitivity,
            });
            setIsUploadModalOpen(false);
            setSelectedFile(null);
            setUploadProgress(null);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-lg rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a] bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#181818] border border-[#2b2b2b] text-[#ffffff] border border-[#333333]">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Upload Compliance Document</h3>
              <p className="text-xs text-[#888888]">PDF, TXT, Markdown, or JSON data files</p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Dropzone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#333333] bg-[#141414] scale-[1.01]'
                : selectedFile
                ? 'border-emerald-500/50 bg-emerald-500/5'
                : 'border-[#1a1a1a] hover:border-[#262626] bg-[#050505]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.md,.txt,.json"
              onChange={handleChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-1.5">
                <div className="h-10 w-10 mx-auto rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <FileCheck className="h-5 w-5" />
                </div>
                <p className="font-bold text-[#ededed]">{selectedFile.name}</p>
                <p className="text-[11px] text-[#888888]">
                  {(selectedFile.size / 1024).toFixed(1)} KB • Ready for scanning
                </p>
                <p className="text-[10px] text-[#ffffff] underline">Click to choose a different file</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="h-10 w-10 mx-auto rounded-xl bg-[#181818] border border-[#2b2b2b] text-[#ffffff] flex items-center justify-center">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold text-[#ffffff]">Click to upload</span> or drag and drop
                </div>
                <p className="text-[11px] text-[#888888]">
                  SEC Form ADV, FINRA communications, bilateral NDAs (max 25MB)
                </p>
              </div>
            )}
          </div>

          {/* Quick Mock Template Selectors */}
          <div className="space-y-1.5">
            <label className="text-[#888888] text-[11px] font-semibold">Or use a sample financial document:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setSelectedFile({
                    name: 'FINRA_Rule_2210_Marketing_Review.pdf',
                    size: 1850000,
                    content: `# FINRA RULE 2210 COMPLIANCE REPORT\nReview of promotional materials and institutional client communications.\nDate: October 2026`,
                    extension: 'pdf',
                  })
                }
                className="p-2 rounded-lg bg-[#050505] border border-[#1a1a1a] hover:border-[#333333] text-left text-[#d1d1d1] hover:text-white transition-colors"
              >
                <div className="font-semibold text-[11px] truncate">FINRA_Rule_2210_Review.pdf</div>
                <div className="text-[10px] text-[#888888]">Marketing disclosure check</div>
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedFile({
                    name: 'LP_Subscription_Schedule_A.json',
                    size: 92000,
                    content: `{\n  "schedule": "Schedule A - Cap Table Allocations",\n  "fund": "Glynac Mezzanine Fund II",\n  "accredited_investors_count": 28\n}`,
                    extension: 'json',
                  })
                }
                className="p-2 rounded-lg bg-[#050505] border border-[#1a1a1a] hover:border-[#333333] text-left text-[#d1d1d1] hover:text-white transition-colors"
              >
                <div className="font-semibold text-[11px] truncate">LP_Subscription_A.json</div>
                <div className="text-[10px] text-[#888888]">Cap table allocation schema</div>
              </button>
            </div>
          </div>

          {/* Security Tag Selector */}
          <div>
            <label className="block text-[#d1d1d1] font-semibold mb-1.5 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-[#ffffff]" />
              Security Sensitivity Tier
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Public', 'Internal Only', 'Confidential', 'Restricted'] as SensitivityLevel[]).map(
                (lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSensitivity(lvl)}
                    className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition-all text-center ${
                      sensitivity === lvl
                        ? 'bg-[#181818] border border-[#2b2b2b] text-[#ededed] border-[#333333] shadow-sm'
                        : 'bg-[#050505] text-[#888888] border-[#1a1a1a] hover:text-[#d1d1d1]'
                    }`}
                  >
                    {lvl}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Upload Progress Bar */}
          {uploadProgress !== null && (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] text-[#d1d1d1] font-semibold">
                <span>Scanning & Ingesting Document...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#050505] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-150"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1a1a1a] bg-[#050505] flex items-center justify-end gap-2">
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="px-3 py-1.5 rounded-lg text-xs text-[#888888] hover:text-white hover:bg-[#141414]"
          >
            Cancel
          </button>
          <button
            onClick={handleSimulatedUpload}
            disabled={!selectedFile || uploadProgress !== null}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white disabled:opacity-50 shadow-md shadow-blue-600/20"
          >
            {uploadProgress !== null ? 'Uploading...' : 'Confirm Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

