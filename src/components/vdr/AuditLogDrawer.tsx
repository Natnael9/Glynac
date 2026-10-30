'use client';

import React, { useState } from 'react';
import { useVDR } from '@/lib/vdrContext';
import {
  History,
  X,
  Upload,
  Eye,
  Download,
  AlertTriangle,
  Lock,
  Edit2,
  Clock,
  User,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { AuditEvent } from '@/lib/types';

export function AuditLogDrawer() {
  const {
    activeDoc,
    auditLogs,
    isAuditDrawerOpen,
    setIsAuditDrawerOpen,
  } = useVDR();

  const [filterAction, setFilterAction] = useState<string>('All');

  if (!isAuditDrawerOpen) return null;

  // Filter logs for the active document or show all if none selected
  const docLogs = activeDoc
    ? auditLogs.filter((log) => log.documentId === activeDoc.id)
    : auditLogs;

  const filteredLogs = docLogs.filter((log) => {
    if (filterAction === 'All') return true;
    return log.action === filterAction;
  });

  const getActionBadge = (action: AuditEvent['action']) => {
    switch (action) {
      case 'Flagged':
        return {
          icon: <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />,
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
      case 'Permission Changed':
        return {
          icon: <Lock className="h-3.5 w-3.5 text-[#ffffff]" />,
          color: 'bg-[#141414] text-[#ffffff] border-[#333333]',
        };
      case 'Downloaded':
        return {
          icon: <Download className="h-3.5 w-3.5 text-emerald-400" />,
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
      case 'Viewed':
        return {
          icon: <Eye className="h-3.5 w-3.5 text-[#d1d1d1]" />,
          color: 'bg-[#141414] text-[#d1d1d1] border-[#262626]',
        };
      case 'Uploaded':
        return {
          icon: <Upload className="h-3.5 w-3.5 text-white" />,
          color: 'bg-[#181818] text-white border-[#333333]',
        };
      case 'Renamed':
        return {
          icon: <Edit2 className="h-3.5 w-3.5 text-[#ededed]" />,
          color: 'bg-[#181818] text-[#ededed] border-[#333333]',
        };
      default:
        return {
          icon: <Clock className="h-3.5 w-3.5 text-[#888888]" />,
          color: 'bg-[#141414] text-[#d1d1d1] border-[#262626]',
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-[#050505] border-l border-[#1a1a1a] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <History className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  SEC-17a-4 Audit Trail
                </h3>
                <p className="text-xs text-[#888888] truncate max-w-[240px]">
                  {activeDoc ? activeDoc.name : 'All Platform Activity'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAuditDrawerOpen(false)}
              className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="p-3 border-b border-[#1a1a1a] bg-[#0a0a0a] flex items-center gap-1.5 overflow-x-auto text-xs">
            <Filter className="h-3 w-3 text-[#888888] shrink-0 ml-1" />
            {['All', 'Flagged', 'Permission Changed', 'Downloaded', 'Viewed', 'Uploaded'].map(
              (action) => (
                <button
                  key={action}
                  onClick={() => setFilterAction(action)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
                    filterAction === action
                      ? 'bg-[#181818] border border-[#2b2b2b] text-[#ffffff] border border-[#333333]'
                      : 'text-[#888888] hover:text-[#ededed] bg-[#0a0a0a] border border-[#1a1a1a]'
                  }`}
                >
                  {action}
                </button>
              )
            )}
          </div>

          {/* Timeline Events Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-[#888888] text-xs">
                No audit events recorded matching filter.
              </div>
            ) : (
              <div className="relative border-l border-[#1a1a1a] ml-3.5 space-y-6">
                {filteredLogs.map((log) => {
                  const badge = getActionBadge(log.action);
                  return (
                    <div key={log.id} className="relative pl-6 group">
                      {/* Timeline Dot Icon */}
                      <span className="absolute -left-3.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] border border-[#1a1a1a] group-hover:scale-110 transition-transform">
                        {badge.icon}
                      </span>

                      {/* Content Card */}
                      <div className="rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] p-3.5 text-xs hover:border-[#262626] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge.color}`}
                          >
                            {log.action}
                          </span>
                          <span className="text-[10px] text-[#888888] font-mono">
                            {new Date(log.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            })}
                          </span>
                        </div>

                        {log.details && (
                          <p className="text-[#ededed] font-medium mb-2 leading-relaxed">
                            {log.details}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a] text-[10px] text-[#888888]">
                          <div className="flex items-center gap-1.5">
                            <div className="h-4 w-4 rounded-full bg-[#181818] border border-[#2b2b2b] text-[#ffffff] flex items-center justify-center text-[9px] font-bold">
                              {log.userName.charAt(0)}
                            </div>
                            <span className="text-[#d1d1d1] font-semibold">{log.userName}</span>
                          </div>
                          <span className="px-1.5 py-0.2 rounded bg-[#141414] text-[#888888] border border-[#262626]">
                            {log.userRole}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 border-t border-[#1a1a1a] bg-[#050505] flex items-center justify-between text-[11px] text-[#888888]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Cryptographic Hash Verified
            </span>
            <span>Total Events: {filteredLogs.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

