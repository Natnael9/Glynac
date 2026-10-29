'use client';

import React, { useState, useEffect } from 'react';
import { useVDR } from '@/lib/vdrContext';
import { SensitivityLevel, DocumentPermission, UserRole } from '@/lib/types';
import {
  Lock,
  Shield,
  X,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit,
  Share2,
  Download,
} from 'lucide-react';

export function PermissionModal() {
  const {
    activeDoc,
    isPermissionModalOpen,
    setIsPermissionModalOpen,
    updateDocumentPermissions,
  } = useVDR();

  const [sensitivity, setSensitivity] = useState<SensitivityLevel>('Confidential');
  const [permissions, setPermissions] = useState<DocumentPermission[]>([]);

  useEffect(() => {
    if (activeDoc) {
      setSensitivity(activeDoc.sensitivity);
      setPermissions(activeDoc.permissions || []);
    }
  }, [activeDoc]);

  if (!isPermissionModalOpen || !activeDoc) return null;

  const handleTogglePermission = (
    role: UserRole,
    field: 'canView' | 'canEdit' | 'canShare' | 'canDownload'
  ) => {
    setPermissions((prev) =>
      prev.map((perm) => (perm.role === role ? { ...perm, [field]: !perm[field] } : perm))
    );
  };

  const handleSave = () => {
    updateDocumentPermissions(activeDoc.id, sensitivity, permissions);
    setIsPermissionModalOpen(false);
  };

  const sensitivityOptions: { level: SensitivityLevel; desc: string; color: string }[] = [
    {
      level: 'Public',
      desc: 'Accessible to all internal personnel and authorized external partners.',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    },
    {
      level: 'Internal Only',
      desc: 'Restricted to authenticated firm employees. External links blocked.',
      color: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    },
    {
      level: 'Confidential',
      desc: 'Sensitive client data, investment memos, and private placements.',
      color: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    },
    {
      level: 'Restricted',
      desc: 'Highest secrecy tier: SEC exam filings, executive compensation, M&A.',
      color: 'border-red-500/40 text-red-400 bg-red-500/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Document Access Control & RBAC
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-md">{activeDoc.name}</p>
            </div>
          </div>
          <button
            onClick={() => setIsPermissionModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          {/* Sensitivity Tier Selection */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2 flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-blue-400" />
              Security Sensitivity Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sensitivityOptions.map((opt) => {
                const isSelected = sensitivity === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setSensitivity(opt.level)}
                    className={`p-3 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? `${opt.color} ring-1 ring-blue-500/50 shadow-md`
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{opt.level}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <p className="text-[11px] opacity-80 leading-snug">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Granular Role Permissions Matrix */}
          <div>
            <label className="block text-slate-300 font-semibold mb-2">
              Role-Based Access Rights (RBAC)
            </label>
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-2 text-center">
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" /> View
                      </span>
                    </th>
                    <th className="py-2.5 px-2 text-center">
                      <span className="inline-flex items-center gap-1">
                        <Edit className="h-3 w-3" /> Edit
                      </span>
                    </th>
                    <th className="py-2.5 px-2 text-center">
                      <span className="inline-flex items-center gap-1">
                        <Share2 className="h-3 w-3" /> Share
                      </span>
                    </th>
                    <th className="py-2.5 px-2 text-center">
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-3 w-3" /> Download
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {permissions.map((perm) => (
                    <tr key={perm.role} className="hover:bg-slate-900/30">
                      <td className="py-2.5 px-3 font-medium text-slate-200">
                        {perm.role}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canView}
                          onChange={() => handleTogglePermission(perm.role, 'canView')}
                          className="rounded border-slate-700 text-blue-600 focus:ring-0 bg-slate-900 cursor-pointer h-4 w-4"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canEdit}
                          onChange={() => handleTogglePermission(perm.role, 'canEdit')}
                          className="rounded border-slate-700 text-blue-600 focus:ring-0 bg-slate-900 cursor-pointer h-4 w-4"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canShare}
                          onChange={() => handleTogglePermission(perm.role, 'canShare')}
                          className="rounded border-slate-700 text-blue-600 focus:ring-0 bg-slate-900 cursor-pointer h-4 w-4"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canDownload}
                          onChange={() => handleTogglePermission(perm.role, 'canDownload')}
                          className="rounded border-slate-700 text-blue-600 focus:ring-0 bg-slate-900 cursor-pointer h-4 w-4"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <AlertCircle className="h-3.5 w-3.5 text-blue-400" />
            Changes are logged to the immutable WORM audit trail.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPermissionModalOpen(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20"
            >
              Apply Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

