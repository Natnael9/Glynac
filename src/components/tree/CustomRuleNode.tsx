'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { RuleNodeData } from '@/lib/types';
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

  const getTypeStyle = () => {
    switch (nodeData.nodeType) {
      case 'root':
        return {
          icon: <ShieldCheck className="h-4 w-4 text-purple-400" />,
          badge: 'Root Policy',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          borderColor: 'border-purple-500/50',
          bgColor: 'bg-slate-950/90',
        };
      case 'rule':
        return {
          icon: <AlertOctagon className="h-4 w-4 text-rose-400" />,
          badge: 'Regulatory Rule',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          borderColor: nodeData.isViolated ? 'border-rose-500' : 'border-slate-800',
          bgColor: 'bg-slate-950/90',
        };
      case 'condition':
        return {
          icon: <FileSpreadsheet className="h-4 w-4 text-amber-400" />,
          badge: 'Evaluation Condition',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          borderColor: nodeData.isViolated ? 'border-amber-500' : 'border-slate-800',
          bgColor: 'bg-slate-950/90',
        };
      case 'action':
        return {
          icon: <Zap className="h-4 w-4 text-emerald-400" />,
          badge: 'Automated Action',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          borderColor: 'border-emerald-500/40',
          bgColor: 'bg-slate-950/90',
        };
      default:
        return {
          icon: <ShieldCheck className="h-4 w-4 text-blue-400" />,
          badge: 'Node',
          badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          borderColor: 'border-slate-800',
          bgColor: 'bg-slate-950/90',
        };
    }
  };

  const style = getTypeStyle();

  return (
    <div
      className={`min-w-[240px] max-w-[280px] rounded-2xl border-2 p-3.5 shadow-2xl transition-all select-none ${
        style.bgColor
      } ${style.borderColor} ${
        selected ? 'ring-2 ring-blue-500 shadow-blue-500/30 scale-105' : 'hover:border-slate-600'
      }`}
    >
      {/* Input Handle */}
      {nodeData.nodeType !== 'root' && (
        <Handle
          type="target"
          position={Position.Top}
          className="!h-3 !w-3 !bg-blue-500 !border-2 !border-slate-950"
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
              ? 'bg-rose-500/20 text-rose-400'
              : nodeData.severity === 'High'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-blue-500/20 text-blue-400'
          }`}
        >
          {nodeData.severity}
        </span>
      </div>

      {/* Title & Code */}
      <div className="space-y-1">
        <div className="text-xs font-bold text-white line-clamp-1">{nodeData.label}</div>
        <div className="text-[10px] text-blue-400 font-mono font-semibold">
          ID: {nodeData.ruleId}
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
        {nodeData.description}
      </p>

      {/* Violation Alert Badge */}
      {nodeData.isViolated && (
        <div className="mt-2.5 pt-2 border-t border-rose-500/20 flex items-center gap-1.5 text-[10px] font-bold text-rose-400">
          <AlertTriangle className="h-3 w-3 shrink-0 animate-pulse" />
          <span>Active Ingestion Violation Flagged</span>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !bg-blue-500 !border-2 !border-slate-950"
      />
    </div>
  );
});

CustomRuleNode.displayName = 'CustomRuleNode';

