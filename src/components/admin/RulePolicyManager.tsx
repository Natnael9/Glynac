'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/lib/adminContext';
import { ComplianceRulePolicy } from '@/lib/types';
import {
  FileCheck2,
  AlertTriangle,
  Plus,
  Edit2,
  Power,
  Shield,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export function RulePolicyManager() {
  const { policies, togglePolicyStatus, updatePolicySeverity, addPolicy } = useAdmin();

  const [isAddPolicyModalOpen, setIsAddPolicyModalOpen] = useState(false);
  const [newRuleCode, setNewRuleCode] = useState('');
  const [newRuleTitle, setNewRuleTitle] = useState('');
  const [newRuleJurisdiction, setNewRuleJurisdiction] = useState<'SEC' | 'FINRA' | 'State' | 'Internal'>('SEC');
  const [newRuleSeverity, setNewRuleSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [newRuleDesc, setNewRuleDesc] = useState('');

  const handleCreatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleCode.trim() || !newRuleTitle.trim()) return;

    addPolicy({
      ruleCode: newRuleCode.trim(),
      title: newRuleTitle.trim(),
      jurisdiction: newRuleJurisdiction,
      severity: newRuleSeverity,
      isActive: true,
      description: newRuleDesc.trim(),
    });

    setNewRuleCode('');
    setNewRuleTitle('');
    setNewRuleDesc('');
    setIsAddPolicyModalOpen(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-[#ffffff]" />
            Compliance Rule Policies
          </h3>
          <p className="text-[11px] text-[#888888]">
            Active SEC, FINRA, and firm regulatory rules evaluated against VDR files and AI prompts.
          </p>
        </div>

        <button
          onClick={() => setIsAddPolicyModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-[#e0e0e0] text-xs font-semibold shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Rule Policy</span>
        </button>
      </div>

      {/* Rules Table */}
      <div className="border border-[#1a1a1a] rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050505] text-[#888888] font-semibold border-b border-[#1a1a1a]">
            <tr>
              <th className="py-3 px-4">Rule Code & Title</th>
              <th className="py-3 px-4">Jurisdiction</th>
              <th className="py-3 px-4">Severity Tier</th>
              <th className="py-3 px-4">Enforcement Status</th>
              <th className="py-3 px-4 hidden md:table-cell">Violations Flagged</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]">
            {policies.map((p) => (
              <tr key={p.id} className="hover:bg-[#0a0a0a] transition-colors">
                <td className="py-3 px-4">
                  <div className="min-w-0">
                    <span className="font-bold text-[#ffffff] font-mono text-xs">{p.ruleCode}</span>
                    <p className="text-[#ededed] font-medium truncate max-w-sm mt-0.5">{p.title}</p>
                    <p className="text-[10px] text-[#666666] line-clamp-1">{p.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-[#050505] text-[#d1d1d1] border border-[#1a1a1a] font-mono text-[10px]">
                    {p.jurisdiction}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={p.severity}
                    onChange={(e) =>
                      updatePolicySeverity(p.id, e.target.value as ComplianceRulePolicy['severity'])
                    }
                    className="px-2 py-1 bg-[#050505] border border-[#1a1a1a] rounded-lg text-[11px] text-white focus:outline-none focus:border-[#333333]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => togglePolicyStatus(p.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                      p.isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-[#141414] text-[#888888] border-[#262626]'
                    }`}
                  >
                    <Power className="h-3 w-3" />
                    <span>{p.isActive ? 'Active Enforcement' : 'Disabled'}</span>
                  </button>
                </td>
                <td className="py-3 px-4 hidden md:table-cell">
                  {p.violationCount > 0 ? (
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {p.violationCount} Violations
                    </span>
                  ) : (
                    <span className="text-emerald-400">0 Flags</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href="/tree"
                    className="inline-flex items-center gap-1 text-[#888888] hover:text-[#ffffff] text-xs font-medium"
                  >
                    <span>Inspect DAG</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Policy Modal */}
      {isAddPolicyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] p-5 shadow-2xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#ffffff]" />
              Define Compliance Rule Policy
            </h4>
            <form onSubmit={handleCreatePolicy} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Rule Code Identifier</label>
                <input
                  type="text"
                  required
                  value={newRuleCode}
                  onChange={(e) => setNewRuleCode(e.target.value)}
                  placeholder="e.g. SEC-204-2"
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs font-mono text-white focus:outline-none focus:border-[#333333]"
                />
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Rule Title</label>
                <input
                  type="text"
                  required
                  value={newRuleTitle}
                  onChange={(e) => setNewRuleTitle(e.target.value)}
                  placeholder="e.g. Books and Records Maintenance"
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white focus:outline-none focus:border-[#333333]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#d1d1d1] font-semibold mb-1">Jurisdiction</label>
                  <select
                    value={newRuleJurisdiction}
                    onChange={(e) => setNewRuleJurisdiction(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                  >
                    <option value="SEC">SEC</option>
                    <option value="FINRA">FINRA</option>
                    <option value="State">State Regulation</option>
                    <option value="Internal">Firm Internal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#d1d1d1] font-semibold mb-1">Default Severity</label>
                  <select
                    value={newRuleSeverity}
                    onChange={(e) => setNewRuleSeverity(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#d1d1d1] font-semibold mb-1">Description</label>
                <textarea
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  rows={2}
                  className="w-full px-2.5 py-1.5 bg-[#050505] border border-[#1a1a1a] rounded-lg text-xs text-white focus:outline-none focus:border-[#333333] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddPolicyModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-[#e0e0e0] shadow-sm"
                >
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

