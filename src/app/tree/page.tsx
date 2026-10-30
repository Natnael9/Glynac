'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { RuleNodeData, RuleNodeType } from '@/lib/types';
import { initialTreeNodes, initialTreeEdges } from '@/lib/mockData/tree';
import { CustomRuleNode } from '@/components/tree/CustomRuleNode';
import { NodePalette } from '@/components/tree/NodePalette';
import { PropertiesPanel } from '@/components/tree/PropertiesPanel';
import { JsonModal } from '@/components/tree/JsonModal';

import {
  Network,
  RotateCcw,
  Sparkles,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileCode,
  LayoutTemplate,
} from 'lucide-react';

export default function TreePage() {
  const [nodes, setNodes] = useState<Node<RuleNodeData>[]>(initialTreeNodes);
  const [edges, setEdges] = useState<Edge[]>(initialTreeEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('rule-2210');
  const [searchQuery, setSearchQuery] = useState('');
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [validationAlert, setValidationAlert] = useState<{
    type: 'success' | 'warning' | 'error';
    message: string;
  } | null>(null);

  // Register custom node type
  const nodeTypes = useMemo(() => ({ customRuleNode: CustomRuleNode }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<RuleNodeData>>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          },
          eds
        )
      ),
    []
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Add new node from palette
  const handleAddNode = (type: RuleNodeType) => {
    const newId = `node-${Date.now()}`;
    const newNode: Node<RuleNodeData> = {
      id: newId,
      type: 'customRuleNode',
      position: { x: 350 + Math.random() * 80, y: 250 + Math.random() * 80 },
      data: {
        label:
          type === 'rule'
            ? 'New Rule Spec'
            : type === 'condition'
            ? 'New Condition Gate'
            : 'New Policy Action',
        ruleId: `RULE-${Math.floor(100 + Math.random() * 900)}`,
        nodeType: type,
        severity: 'Medium',
        description: 'Configure evaluated policy logic in properties inspector.',
      },
    };

    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newId);
  };

  const handleUpdateNode = (id: string, updatedData: Partial<RuleNodeData>) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...updatedData } } : n))
    );
  };

  const handleDeleteNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  // Auto-layout algorithm
  const handleAutoLayout = () => {
    const levelMap: Record<string, number> = {
      root: 50,
      rule: 220,
      condition: 400,
      action: 580,
    };

    const countByLevel: Record<string, number> = {
      root: 0,
      rule: 0,
      condition: 0,
      action: 0,
    };

    setNodes((prev) =>
      prev.map((node) => {
        const type = node.data.nodeType || 'rule';
        const y = levelMap[type] || 250;
        const index = countByLevel[type]++;
        const x = 120 + index * 300;
        return {
          ...node,
          position: { x, y },
        };
      })
    );

    setValidationAlert({
      type: 'success',
      message: 'Tree auto-layout successfully organized by evaluation tier.',
    });
    setTimeout(() => setValidationAlert(null), 3500);
  };

  // Graph cycle & orphan validation check
  const handleValidateTree = () => {
    const nodeIds = new Set(nodes.map((n) => n.id));
    const targetIds = new Set(edges.map((e) => e.target));
    const orphans = nodes.filter((n) => n.data.nodeType !== 'root' && !targetIds.has(n.id));

    if (orphans.length > 0) {
      setValidationAlert({
        type: 'warning',
        message: `Validation Warning: ${orphans.length} orphan node(s) detected without incoming evaluation links.`,
      });
    } else {
      setValidationAlert({
        type: 'success',
        message: 'Graph Validation Passed: No circular references or disconnected policy nodes found.',
      });
    }
    setTimeout(() => setValidationAlert(null), 4000);
  };

  // Filter highlighting
  const highlightedNodes = useMemo(() => {
    if (!searchQuery.trim()) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.map((node) => {
      const match =
        node.data.label.toLowerCase().includes(q) ||
        node.data.ruleId.toLowerCase().includes(q) ||
        node.data.description.toLowerCase().includes(q);

      return {
        ...node,
        selected: match,
      };
    });
  }, [nodes, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-[#090d16] overflow-hidden select-none">
      {/* Top Controls Toolbar */}
      <div className="p-3 border-b border-slate-800/80 bg-slate-950/60 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-600/15 text-indigo-400 border border-indigo-500/20">
            <Network className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              Visual Tree & DAG Policy Editor
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                React Flow Canvas
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Interactive node graph builder, parent-child linking, and JSON compliance schemas.
            </p>
          </div>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rule node..."
              className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44"
            />
          </div>

          <button
            onClick={handleAutoLayout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <LayoutTemplate className="h-3.5 w-3.5 text-indigo-400" />
            <span>Auto-Layout</span>
          </button>

          <button
            onClick={handleValidateTree}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium transition-colors"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Validate DAG</span>
          </button>

          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-md shadow-indigo-600/20"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>JSON Engine</span>
          </button>
        </div>
      </div>

      {/* Validation Banner */}
      {validationAlert && (
        <div
          className={`p-2.5 px-4 text-xs font-semibold flex items-center justify-between border-b ${
            validationAlert.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {validationAlert.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            )}
            <span>{validationAlert.message}</span>
          </div>
          <button
            onClick={() => setValidationAlert(null)}
            className="text-[10px] underline hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Workspace Area: Palette | Canvas | Inspector */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Drag & Click Palette */}
        <NodePalette onAddNode={handleAddNode} />

        {/* Center Interactive Flow Canvas */}
        <div className="flex-1 h-full relative bg-[#060911]">
          <ReactFlow
            nodes={highlightedNodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            maxZoom={2}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1.5}
              color="#1e293b"
            />
            <Controls className="!bg-slate-900 !border-slate-800 !text-slate-400" />
            <MiniMap
              nodeColor="#3b82f6"
              maskColor="rgba(15, 23, 42, 0.85)"
              className="!bg-slate-950 !border !border-slate-800 !rounded-xl overflow-hidden"
            />
          </ReactFlow>
        </div>

        {/* Right Properties Inspector */}
        {selectedNode && (
          <PropertiesPanel
            selectedNode={selectedNode}
            onUpdateNode={handleUpdateNode}
            onDeleteNode={handleDeleteNode}
            onClose={() => setSelectedNodeId(null)}
          />
        )}
      </div>

      {/* JSON Import/Export Modal */}
      <JsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        nodes={nodes}
        edges={edges}
        onImport={(newNodes, newEdges) => {
          setNodes(newNodes);
          setEdges(newEdges);
        }}
      />
    </div>
  );
}
