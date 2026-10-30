'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { RuleNodeData } from '@/lib/types';
import { useTheme } from '@/lib/themeContext';
import {
  ShieldCheck,
  FileSpreadsheet,
  AlertOctagon,
  Zap,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const CustomRuleNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as RuleNodeData;
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getTypeStyle = () => {
    switch (nodeData.nodeType) {
      case 'root':
        return {
          icon: <ShieldCheck className={`h-4 w-4 ${isLight ? 'text-[#111827]' : 'text-white'}`} />,
          badge: 'Root Policy',
          badgeColor: isLight
            ? 'bg-[#f3f4f6] text-[#111827] border-[#d1d5db]'
            : 'bg-[#181818] text-white border-[#333333]',
          borderColor: isLight ? 'border-[#111827]' : 'border-white/50',
          bgColor: isLight ? 'bg-white' : 'bg-[#050505]',
        };
      case 'rule':
        return {
          icon: <AlertOctagon className={`h-4 w-4 ${isLight ? 'text-[#dc2626]' : 'text-rose-400'}`} />,
          badge: 'Regulatory Rule',
          badgeColor: isLight
            ? 'bg-[#f3f4f6] text-[#991b1b] border-[#fca5a5]'
            : 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          borderColor: nodeData.isViolated
            ? (isLight ? 'border-[#dc2626]' : 'border-rose-500')
            : (isLight ? 'border-[#e5e7eb]' : 'border-[#1a1a1a]'),
          bgColor: isLight ? 'bg-white' : 'bg-[#050505]',
        };
      case 'condition':
        return {
          icon: <FileSpreadsheet className={`h-4 w-4 ${isLight ? 'text-[#d97706]' : 'text-amber-400'}`} />,
          badge: 'Evaluation Condition',
          badgeColor: isLight
            ? 'bg-[#f3f4f6] text-[#92400e] border-[#fcd34d]'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          borderColor: nodeData.isViolated
            ? (isLight ? 'border-[#d97706]' : 'border-amber-500')
            : (isLight ? 'border-[#e5e7eb]' : 'border-[#1a1a1a]'),
          bgColor: isLight ? 'bg-white' : 'bg-[#050505]',
        };
      case 'action':
        return {
          icon: <Zap className={`h-4 w-4 ${isLight ? 'text-[#059669]' : 'text-emerald-400'}`} />,
          badge: 'Automated Action',
          badgeColor: isLight
            ? 'bg-[#f3f4f6] text-[#047857] border-[#86efac]'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          borderColor: isLight ? 'border-[#059669]' : 'border-emerald-500/40',
          bgColor: isLight ? 'bg-white' : 'bg-[#050505]',
        };
      default:
        return {
          icon: <ShieldCheck className="h-4 w-4 text-[#ffffff]" />,
          badge: 'Node',
          badgeColor: isLight
            ? 'bg-[#f3f4f6] text-[#111827] border-[#e5e7eb]'
            : 'bg-[#141414] text-[#ededed] border-[#333333]',
          borderColor: isLight ? 'border-[#e5e7eb]' : 'border-[#1a1a1a]',
          bgColor: isLight ? 'bg-white' : 'bg-[#050505]',
        };
    }
  };

  const style = getTypeStyle();

  return (
    <div
      className={`min-w-[240px] max-w-[280px] rounded-2xl border-2 p-3.5 shadow-2xl transition-all select-none ${
        style.bgColor
      } ${style.borderColor} ${
        selected ? 'ring-2 ring-white shadow-2xl scale-105' : 'hover:border-[#333333]'
      }`}
    >
      {/* Input Handle */}
      {nodeData.nodeType !== 'root' && (
        <Handle
          type="target"
          position={Position.Top}
          className={`!h-3 !w-3 ${isLight ? '!bg-white !border-2 !border-[#111827]' : '!bg-[#141414] !border-2 !border-slate-950'}`}
        />
      )}

      {/* Node Top Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 ${style.badgeColor}`}
        >
          {style.icon}
          {style.badge}
        </span>
        <span
          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
            nodeData.severity === 'Critical'
              ? (isLight ? 'bg-[#f3f4f6] text-[#991b1b] border border-[#fca5a5]' : 'bg-rose-500/20 text-rose-400')
              : nodeData.severity === 'High'
              ? (isLight ? 'bg-[#f3f4f6] text-[#92400e] border border-[#fcd34d]' : 'bg-amber-500/20 text-amber-400')
              : (isLight ? 'bg-[#f3f4f6] text-[#111827] border border-[#e5e7eb]' : 'bg-[#141414] text-[#ffffff]')
          }`}
        >
          {nodeData.severity}
        </span>
      </div>

      {/* Title & Code */}
      <div className="space-y-1">
        <div className={`text-xs font-bold line-clamp-1 ${isLight ? 'text-[#111827]' : 'text-white'}`}>{nodeData.label}</div>
        <div className={`text-[10px] font-mono font-semibold ${isLight ? 'text-[#4b5563]' : 'text-[#ffffff]'}`}>
          ID: {nodeData.ruleId}
        </div>
      </div>

      {/* Description Snippet */}
      <p className={`text-[11px] mt-2 line-clamp-2 leading-relaxed ${isLight ? 'text-[#4b5563]' : 'text-[#888888]'}`}>
        {nodeData.description}
      </p>

      {/* Violation Alert Badge */}
      {nodeData.isViolated && (
        <div className={`mt-2.5 pt-2 border-t flex items-center gap-1.5 text-[10px] font-bold ${
          isLight
            ? 'border-[#e5e7eb] text-[#991b1b]'
            : 'border-rose-500/20 text-rose-400'
        }`}>
          <AlertTriangle className={`h-3 w-3 shrink-0 ${isLight ? 'text-[#dc2626]' : 'animate-pulse'}`} />
          <span>Active Ingestion Violation Flagged</span>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className={`!h-3 !w-3 ${isLight ? '!bg-white !border-2 !border-[#111827]' : '!bg-[#141414] !border-2 !border-slate-950'}`}
      />
    </div>
  );
});

CustomRuleNode.displayName = 'CustomRuleNode';

