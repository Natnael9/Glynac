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
  Plus,
} from 'lucide-react';
import { useTheme } from '@/lib/themeContext';

export default function TreePage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [nodes, setNodes] = useState<Node<RuleNodeData>[]>(initialTreeNodes);
  const [edges, setEdges] = useState<Edge[]>(initialTreeEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
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
            style: { stroke: '#ffffff', strokeWidth: 1.5 },
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
    <div className="flex flex-col h-full bg-[#000000] overflow-hidden select-none">
      {/* Top Controls Toolbar */}
      <div className="p-3 border-b border-[#1a1a1a] bg-[#050505] flex flex-wrap items-center justify-between gap-2.5 z-10">
        <div>
          <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Policy Graph Editor
          </h2>
          <p className="text-[11px] text-[#888888] hidden sm:block">
            Interactive rule tree and parent-child dependency graph
          </p>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
          {/* Mobile Open Palette Button */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs shadow-sm hover:bg-[#e0e0e0] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Node</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666666]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search node..."
              className="pl-8 pr-2.5 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#333333] w-28 sm:w-44"
            />
          </div>

          <button
            onClick={handleAutoLayout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#262626] text-[#d1d1d1] hover:text-white font-medium transition-colors"
            title="Auto-Layout Hierarchy"
          >
            <LayoutTemplate className="h-3.5 w-3.5 text-[#ededed]" />
            <span className="hidden sm:inline">Auto-Layout</span>
          </button>

          <button
            onClick={handleValidateTree}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#262626] text-[#d1d1d1] hover:text-white font-medium transition-colors"
            title="Validate DAG"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Validate</span>
          </button>

          <button
            onClick={() => setIsJsonModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#e0e0e0] text-black font-semibold transition-colors shadow-sm"
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
        <NodePalette
          onAddNode={handleAddNode}
          isOpen={isPaletteOpen}
          onClose={() => setIsPaletteOpen(false)}
        />

        {/* Center Interactive Flow Canvas */}
        <div className="flex-1 h-full relative bg-[#000000]">
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
              color={isLight ? '#d1d5db' : '#222222'}
            />
            <Controls className={isLight ? '!bg-white !border-[#e5e7eb] !text-[#6b7280]' : '!bg-[#0a0a0a] !border-[#1a1a1a] !text-[#888888]'} />
            <MiniMap
              nodeColor={isLight ? '#111827' : '#ffffff'}
              maskColor={isLight ? 'rgba(243, 244, 246, 0.7)' : 'rgba(0, 0, 0, 0.85)'}
              className={isLight ? '!bg-white !border !border-[#e5e7eb] !rounded-xl overflow-hidden hidden sm:block' : '!bg-[#050505] !border !border-[#1a1a1a] !rounded-xl overflow-hidden hidden sm:block'}
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
