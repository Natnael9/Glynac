'use client';

import React from 'react';
import { RuleNodeType } from '@/lib/types';
import { useTheme } from '@/lib/themeContext';
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
  const { theme } = useTheme();
  const isLight = theme === 'light';

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
      icon: <AlertOctagon className={`h-4 w-4 ${isLight ? 'text-[#dc2626]' : 'text-rose-400'}`} />,
      color: isLight
        ? 'bg-white hover:border-[#fca5a5] border-[#e5e7eb]'
        : 'hover:border-rose-500/50 bg-rose-500/5',
    },
    {
      type: 'condition',
      label: 'Evaluation Condition',
      desc: 'AST text matching or numeric formula constraint',
      icon: <FileSpreadsheet className={`h-4 w-4 ${isLight ? 'text-[#d97706]' : 'text-amber-400'}`} />,
      color: isLight
        ? 'bg-white hover:border-[#fcd34d] border-[#e5e7eb]'
        : 'hover:border-amber-500/50 bg-amber-500/5',
    },
    {
      type: 'action',
      label: 'Policy Action',
      desc: 'Automated remediation, tagging, or alert dispatch',
      icon: <Zap className={`h-4 w-4 ${isLight ? 'text-[#059669]' : 'text-emerald-400'}`} />,
      color: isLight
        ? 'bg-white hover:border-[#86efac] border-[#e5e7eb]'
        : 'hover:border-emerald-500/50 bg-emerald-500/5',
    },
  ];

  const handleSelect = (type: RuleNodeType) => {
    onAddNode(type);
    if (onClose) onClose();
  };

  const paletteContent = (
    <div className={`w-full h-full p-3.5 flex flex-col select-none ${isLight ? 'bg-[#f3f4f6]' : 'bg-[#050505]'}`}>
      <div className={`pb-3 border-b mb-3 flex items-center justify-between ${isLight ? 'border-[#e5e7eb]' : 'border-[#1a1a1a]'}`}>
        <div>
          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-[#111827]' : 'text-white'}`}>
            <Move className="h-3.5 w-3.5" />
            Node Palette
          </h4>
          <p className={`text-[10px] mt-0.5 ${isLight ? 'text-[#6b7280]' : 'text-[#888888]'}`}>
            Click or drag onto canvas to insert into DAG
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`md:hidden p-1 rounded-lg transition-colors cursor-pointer ${
              isLight ? 'text-[#6b7280] hover:text-[#111827] hover:bg-[#e5e7eb]' : 'text-[#888888] hover:text-white hover:bg-[#141414]'
            }`}
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
            className={`w-full p-2.5 rounded-xl border text-left transition-all ${item.color} group hover:scale-[1.01] shadow-sm cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg border ${isLight ? 'bg-[#f9fafb] border-[#e5e7eb]' : 'bg-[#0a0a0a] border-[#1a1a1a]'}`}>
                  {item.icon}
                </div>
                <span className={`font-bold text-xs ${isLight ? 'text-[#111827]' : 'text-[#ededed] group-hover:text-white'}`}>
                  {item.label}
                </span>
              </div>
              <Plus className={`h-3.5 w-3.5 ${isLight ? 'text-[#9ca3af]' : 'text-[#666666] group-hover:text-white'}`} />
            </div>
            <p className={`text-[10px] leading-snug pl-8 ${isLight ? 'text-[#4b5563]' : 'text-[#888888]'}`}>{item.desc}</p>
          </button>
        ))}
      </div>

      <div className={`p-3 rounded-xl border text-[11px] mt-auto ${isLight ? 'bg-white border-[#e5e7eb] text-[#4b5563]' : 'bg-[#0a0a0a] border-[#1a1a1a] text-[#888888]'}`}>
        <div className={`font-semibold mb-1 flex items-center gap-1 ${isLight ? 'text-[#111827]' : 'text-[#d1d1d1]'}`}>
          <HelpCircle className="h-3.5 w-3.5" />
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
      <aside className={`hidden md:flex flex-col h-full border-r w-64 shrink-0 select-none ${isLight ? 'bg-[#f3f4f6] border-[#e5e7eb]' : 'bg-[#050505] border-[#1a1a1a]'}`}>
        {paletteContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className={`relative w-72 max-w-[85vw] border-r h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200 ${
            isLight ? 'bg-[#f3f4f6] border-[#e5e7eb]' : 'bg-[#050505] border-[#1a1a1a]'
          }`}>
            {paletteContent}
          </div>
        </div>
      )}
    </>
  );
}

