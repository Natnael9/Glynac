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
  X,
} from 'lucide-react';

interface NodePaletteProps {
  onAddNode: (type: RuleNodeType) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function NodePalette({ onAddNode, isOpen, onClose }: NodePaletteProps) {
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

  const handleSelect = (type: RuleNodeType) => {
    onAddNode(type);
    if (onClose) onClose();
  };

  const paletteContent = (
    <div className="w-full h-full bg-[#050505] p-3.5 flex flex-col select-none">
      <div className="pb-3 border-b border-[#1a1a1a] mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Move className="h-3.5 w-3.5 text-[#ffffff]" />
            Node Palette
          </h4>
          <p className="text-[10px] text-[#888888] mt-0.5">
            Click or drag onto canvas to insert into DAG
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
            title="Close Palette"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {nodeTypes.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => handleSelect(item.type)}
            className={`w-full p-2.5 rounded-xl border border-[#1a1a1a] text-left transition-all ${item.color} group hover:scale-[1.02] shadow-sm cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a]">
                  {item.icon}
                </div>
                <span className="font-bold text-xs text-[#ededed] group-hover:text-white">
                  {item.label}
                </span>
              </div>
              <Plus className="h-3.5 w-3.5 text-[#666666] group-hover:text-white" />
            </div>
            <p className="text-[10px] text-[#888888] leading-snug pl-8">{item.desc}</p>
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] text-[11px] text-[#888888] mt-auto">
        <div className="font-semibold text-[#d1d1d1] mb-1 flex items-center gap-1">
          <HelpCircle className="h-3.5 w-3.5 text-[#ffffff]" />
          Workflow Guide
        </div>
        <p className="text-[10px] leading-relaxed">
          Drag handles between nodes to create parent-child evaluation chains. Click any node to open the live inspector.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Palette */}
      <aside className="hidden md:flex flex-col h-full bg-[#050505] border-r border-[#1a1a1a] w-64 shrink-0 select-none">
        {paletteContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-72 max-w-[85vw] bg-[#050505] border-r border-[#1a1a1a] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {paletteContent}
          </div>
        </div>
      )}
    </>
  );
}

