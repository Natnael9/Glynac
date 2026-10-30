'use client';

import React from 'react';
import { Node } from '@xyflow/react';
import { RuleNodeData } from '@/lib/types';
import {
  SlidersHorizontal,
  X,
  Trash2,
  Copy,
  AlertTriangle,
  Code,
  Tag,
  Shield,
  CheckCircle,
} from 'lucide-react';

interface PropertiesPanelProps {
  selectedNode: Node<RuleNodeData> | null;
  onUpdateNode: (id: string, updatedData: Partial<RuleNodeData>) => void;
  onDeleteNode: (id: string) => void;
  onClose: () => void;
}

export function PropertiesPanel({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onClose,
}: PropertiesPanelProps) {
  if (!selectedNode) return null;

  const data = selectedNode.data;

  return (
    <div className="w-80 bg-slate-950/90 border-l border-slate-800/80 flex flex-col h-full shadow-2xl select-none z-10 shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Node Properties
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">Node ID: {selectedNode.id}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Node Label */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Node Title</label>
          <input
            type="text"
            value={data.label}
            onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Rule Code */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Rule Identifier</label>
          <input
            type="text"
            value={data.ruleId}
            onChange={(e) => onUpdateNode(selectedNode.id, { ruleId: e.target.value })}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-blue-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Severity */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Severity Rating</label>
          <select
            value={data.severity}
            onChange={(e) =>
              onUpdateNode(selectedNode.id, {
                severity: e.target.value as 'Low' | 'Medium' | 'High' | 'Critical',
              })
            }
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="Low">Low Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="High">High Severity</option>
            <option value="Critical">Critical Violation</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Policy Description</label>
          <textarea
            value={data.description}
            onChange={(e) => onUpdateNode(selectedNode.id, { description: e.target.value })}
            rows={3}
            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
          />
        </div>

        {/* Condition / Action Specific Expression */}
        {data.nodeType === 'condition' && (
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Code className="h-3.5 w-3.5 text-amber-400" />
              AST Matching Formula
            </label>
            <textarea
              value={data.conditionFormula || ''}
              onChange={(e) => onUpdateNode(selectedNode.id, { conditionFormula: e.target.value })}
              rows={2}
              placeholder="e.g. contains(doc.text, 'guarantee') == true"
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>
        )}

        {data.nodeType === 'action' && (
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Code className="h-3.5 w-3.5 text-emerald-400" />
              Action Execution Handler
            </label>
            <textarea
              value={data.actionHandler || ''}
              onChange={(e) => onUpdateNode(selectedNode.id, { actionHandler: e.target.value })}
              rows={2}
              placeholder="e.g. applyTag('Restricted')"
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>
        )}

        {/* Ingestion Status Toggle */}
        <div className="pt-2 border-t border-slate-800">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
              Mark as Violated
            </span>
            <input
              type="checkbox"
              checked={!!data.isViolated}
              onChange={(e) => onUpdateNode(selectedNode.id, { isViolated: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-0 h-4 w-4"
            />
          </label>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
        <button
          onClick={() => onDeleteNode(selectedNode.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 text-xs font-medium transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Delete Node</span>
        </button>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20"
        >
          Done
        </button>
      </div>
    </div>
  );
}

