'use client';

import React from 'react';
import { useAdmin } from '@/lib/adminContext';
import {
  Sliders,
  CheckCircle2,
  Activity,
  ShieldAlert,
  Server,
  Zap,
  Lock,
  Search,
} from 'lucide-react';

export function HealthAndFlags() {
  const { featureFlags, healthMetrics, toggleFeatureFlag } = useAdmin();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Feature Flags Section */}
      <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg space-y-4">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#ffffff]" />
            Platform Feature Flags & Toggles
          </h3>
          <p className="text-[11px] text-[#888888] mt-0.5">
            Instant runtime switches enabling automated AST parsing, PII masking, and blockchain anchoring.
          </p>
        </div>

        <div className="space-y-2.5">
          {featureFlags.map((flag) => (
            <div
              key={flag.id}
              className="p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] flex items-center justify-between gap-3 hover:border-[#262626] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-white">{flag.name}</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#0a0a0a] border border-[#1a1a1a] text-[#888888]">
                    {flag.category}
                  </span>
                </div>
                <p className="text-[11px] text-[#888888] leading-snug mt-0.5">
                  {flag.description}
                </p>
                <span className="text-[9px] text-[#ffffff] font-mono mt-1 block">
                  {flag.key}
                </span>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => toggleFeatureFlag(flag.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  flag.enabled ? 'bg-[#181818] border border-[#2b2b2b]' : 'bg-[#141414]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    flag.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Health Section */}
      <div className="p-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              Live System Health & Infrastructure
            </h3>
            <span className="flex items-center gap-1.5 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
          </div>
          <p className="text-[11px] text-[#888888]">
            Real-time latency telemetry across SEC data ingestors, AI model nodes, and WORM storage.
          </p>
        </div>

        <div className="space-y-2.5 my-2">
          {healthMetrics.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="font-semibold text-xs text-[#ededed]">{item.service}</p>
                  <p className="text-[10px] text-[#666666]">Checked {item.lastChecked}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="text-right">
                  <span className="text-[10px] text-[#666666] block leading-none">Latency</span>
                  <span className="font-bold text-[#ffffff]">{item.latencyMs} ms</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#666666] block leading-none">Uptime</span>
                  <span className="font-bold text-emerald-400">{item.uptimePercent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#181818] border border-[#2b2b2b] border border-[#333333] text-[11px] text-[#d1d1d1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-[#ffffff]" />
            <span>SEC Rule 17a-4 Optical Storage Immutable Lock Active</span>
          </div>
          <span className="font-bold text-[#ffffff] font-mono">SHA-256</span>
        </div>
      </div>
    </div>
  );
}

