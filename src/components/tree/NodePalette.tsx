'use client';

import React from 'react';
import { RuleNodeType } from '@/lib/types';
import {
  ShieldCheck,
  AlertOctagon,
  FileSpreadsheet,
  Zap,
  Plus,
  HelpCircle,
  Move,
} from 'lucide-react';

export function NodePalette({ onAddNode }: { onAddNode: (type: RuleNodeType) => void }) {
  const nodeTypes: {
    type: RuleNodeType;
    label: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      type: 'rule',
      label: 'Regulatory Rule',
      desc: 'Top-level regulatory rule specification (e.g. FINRA-2210)',
      icon: <AlertOctagon className="h-4 w-4 text-rose-400" />,
      color: 'hover:border-rose-500/50 bg-rose-500/5',
    },
    {
      type: 'condition',
      label: 'Evaluation Condition',
      desc: 'AST text matching or numeric formula constraint',
      icon: <FileSpreadsheet className="h-4 w-4 text-amber-400" />,
      color: 'hover:border-amber-500/50 bg-amber-500/5',
    },
    {
      type: 'action',
      label: 'Policy Action',
      desc: 'Automated remediation, tagging, or alert dispatch',
      icon: <Zap className="h-4 w-4 text-emerald-400" />,
      color: 'hover:border-emerald-500/50 bg-emerald-500/5',
    },
  ];

  return (
    <div className="w-64 bg-slate-950/80 border-r border-slate-800/80 p-3.5 flex flex-col h-full select-none shrink-0">
      <div className="pb-3 border-b border-slate-800/80 mb-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Move className="h-3.5 w-3.5 text-blue-400" />
          Node Palette
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Click or drag onto canvas to insert into DAG
        </p>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {nodeTypes.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => onAddNode(item.type)}
            className={`w-full p-2.5 rounded-xl border border-slate-800/80 text-left transition-all ${item.color} group hover:scale-[1.02] shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                  {item.icon}
                </div>
                <span className="font-bold text-xs text-slate-200 group-hover:text-white">
                  {item.label}
                </span>
              </div>
              <Plus className="h-3.5 w-3.5 text-slate-500 group-hover:text-white" />
            </div>
            <p className="text-[10px] text-slate-400 leading-snug pl-8">{item.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 mt-auto">
        <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
          <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
          Workflow Guide
        </div>
        <p className="text-[10px] leading-relaxed">
          Drag handles between nodes to create parent-child evaluation chains. Click any node to open the live inspector.
        </p>
      </div>
    </div>
  );
}

