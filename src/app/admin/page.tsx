'use client';

import React, { useState } from 'react';
import { MetricsDashboard } from '@/components/admin/MetricsDashboard';
import { RbacUserTable } from '@/components/admin/RbacUserTable';
import { RulePolicyManager } from '@/components/admin/RulePolicyManager';
import { HealthAndFlags } from '@/components/admin/HealthAndFlags';
import {
  ShieldAlert,
  BarChart3,
  Users,
  FileCheck2,
  Sliders,
  Sparkles,
  Lock,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'metrics' | 'rbac' | 'policies' | 'flags'>('metrics');

  return (
    <div className="flex flex-col h-full bg-[#090d16] overflow-y-auto select-none">
      {/* Header Banner */}
      <div className="border-b border-[#1a1a1a] bg-[#050505] px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-600/15 text-cyan-400 border border-cyan-500/20">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900">
                System Administration
              </h1>
              <p className="text-xs text-[#666666]">
                Manage access roles, compliance policies, and system configuration.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/vdr"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-xs font-semibold text-[#d1d1d1] hover:text-white hover:bg-[#141414] transition-colors"
            >
              <Lock className="h-3.5 w-3.5 text-[#ffffff]" />
              <span>Data Room</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ffffff] !text-black border border-[#333333] text-[#ededed] hover:bg-[#ffffff] !text-black text-xs font-semibold transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Assistant</span>
            </Link>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 mt-4 pt-2 border-t border-[#1a1a1a] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeTab === 'metrics'
                ? 'bg-[#ffffff] !text-black text-[#ffffff] border border-[#333333]'
                : 'text-[#888888] hover:text-[#ededed] hover:bg-[#0a0a0a]'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Executive Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('rbac')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeTab === 'rbac'
                ? 'bg-[#ffffff] !text-black text-[#ffffff] border border-[#333333]'
                : 'text-[#888888] hover:text-[#ededed] hover:bg-[#0a0a0a]'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Personnel & RBAC</span>
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeTab === 'policies'
                ? 'bg-[#ffffff] !text-black text-[#ffffff] border border-[#333333]'
                : 'text-[#888888] hover:text-[#ededed] hover:bg-[#0a0a0a]'
            }`}
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            <span>Compliance Rule Policies</span>
          </button>

          <button
            onClick={() => setActiveTab('flags')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold transition-all ${
              activeTab === 'flags'
                ? 'bg-[#ffffff] !text-black text-[#ffffff] border border-[#333333]'
                : 'text-[#888888] hover:text-[#ededed] hover:bg-[#0a0a0a]'
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Feature Flags & Health</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <div className="flex-1 p-4 sm:p-6 space-y-6">
        {activeTab === 'metrics' && <MetricsDashboard />}
        {activeTab === 'rbac' && <RbacUserTable />}
        {activeTab === 'policies' && <RulePolicyManager />}
        {activeTab === 'flags' && <HealthAndFlags />}
      </div>
    </div>
  );
}
