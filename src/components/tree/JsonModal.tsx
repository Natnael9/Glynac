'use client';

import React, { useState } from 'react';
import { Node, Edge } from '@xyflow/react';
import { RuleNodeData, RuleGraphJSON } from '@/lib/types';
import {
  FileCode,
  Copy,
  Check,
  Download,
  Upload,
  X,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface JsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: Node<RuleNodeData>[];
  edges: Edge[];
  onImport: (newNodes: Node<RuleNodeData>[], newEdges: Edge[]) => void;
}

export function JsonModal({
  isOpen,
  onClose,
  nodes,
  edges,
  onImport,
}: JsonModalProps) {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'export' | 'import'>('export');

  if (!isOpen) return null;

  const currentGraphJSON: RuleGraphJSON = {
    version: '1.0.0',
    metadata: {
      title: 'SEC & FINRA Regulatory Hierarchy DAG',
      description: 'Exported from Glynac Compliance Visual Tree Editor',
      lastExported: new Date().toISOString(),
      totalNodes: nodes.length,
    },
    nodes: nodes.map((n) => ({
      id: n.id,
      type: n.type || 'customRuleNode',
      position: n.position,
      data: n.data,
    })),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      label: e.label as string,
    })),
  };

  const jsonString = JSON.stringify(currentGraphJSON, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compliance_rule_dag_${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExecuteImport = () => {
    setError(null);
    try {
      const parsed = JSON.parse(importText);
      if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
        throw new Error('Invalid JSON format: missing "nodes" array.');
      }
      onImport(parsed.nodes, parsed.edges || []);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to parse JSON.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 select-none">
      <div className="w-full max-w-2xl rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1a] bg-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#ffffff] !text-black text-[#ffffff]">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Rule DAG JSON Engine</h3>
              <p className="text-xs text-[#888888]">Import or export hierarchical workflow schemas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#1a1a1a] bg-[#050505] px-4 text-xs font-semibold">
          <button
            onClick={() => setTab('export')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              tab === 'export' ? 'border-[#333333] text-[#ffffff]' : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            Export Graph Schema
          </button>
          <button
            onClick={() => setTab('import')}
            className={`py-2 px-3 border-b-2 transition-colors ${
              tab === 'import' ? 'border-[#333333] text-[#ffffff]' : 'border-transparent text-[#888888] hover:text-white'
            }`}
          >
            Import JSON Workflow
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {tab === 'export' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#888888]">
                <span>Total Nodes: {nodes.length} | Edges: {edges.length}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#1a1a1a] text-[#ededed] text-xs"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffffff] !text-black hover:bg-[#e5e5e5] text-white text-xs font-semibold"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] overflow-x-auto max-h-[350px]">
                <pre className="text-[11px] font-mono text-cyan-300 leading-relaxed select-text">
                  {jsonString}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <p className="text-[#d1d1d1]">
                Paste a valid Rule Graph JSON definition to replace or hydrate the canvas structure:
              </p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste valid JSON array with nodes and edges..."
                rows={12}
                className="w-full p-3 rounded-xl bg-[#050505] border border-[#1a1a1a] font-mono text-xs text-white focus:outline-none focus:border-[#333333] resize-none select-text"
              />
              {error && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2 text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1a1a1a] bg-[#050505] flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs text-[#888888] hover:text-white hover:bg-[#141414]"
          >
            Close
          </button>
          {tab === 'import' && (
            <button
              onClick={handleExecuteImport}
              disabled={!importText.trim()}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#ffffff] !text-black hover:bg-[#e5e5e5] text-white disabled:opacity-50"
            >
              Confirm Import
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

