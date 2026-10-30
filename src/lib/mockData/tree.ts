import { Node, Edge } from '@xyflow/react';
import { RuleNodeData, RuleGraphJSON } from '../types';

export const initialTreeNodes: Node<RuleNodeData>[] = [
  {
    id: 'root-1',
    type: 'customRuleNode',
    position: { x: 450, y: 50 },
    data: {
      label: 'SEC & FINRA Regulatory Framework',
      ruleId: 'GOV-ROOT',
      nodeType: 'root',
      severity: 'Low',
      description: 'Root compliance governance container governing promotional communications, disclosures, and books/records.',
      tags: ['Master Policy', '2026 Mandate'],
    },
  },
  {
    id: 'rule-2210',
    type: 'customRuleNode',
    position: { x: 200, y: 220 },
    data: {
      label: 'FINRA Rule 2210 Communications',
      ruleId: 'FINRA-2210',
      nodeType: 'rule',
      severity: 'Critical',
      description: 'Prohibits false, exaggerated, unwarranted, promissory or misleading statements in client materials.',
      tags: ['Marketing', 'High Risk'],
      isViolated: true,
    },
  },
  {
    id: 'rule-17a4',
    type: 'customRuleNode',
    position: { x: 700, y: 220 },
    data: {
      label: 'SEA Rule 17a-4 Electronic Books',
      ruleId: 'SEC-17a-4',
      nodeType: 'rule',
      severity: 'High',
      description: 'Mandatory 6-year retention on write-once-read-many (WORM) storage with independent 3rd-party escrow.',
      tags: ['WORM', 'Storage'],
    },
  },
  {
    id: 'cond-guarantee',
    type: 'customRuleNode',
    position: { x: 100, y: 400 },
    data: {
      label: 'Condition: Guaranteed Yield Check',
      ruleId: 'COND-YIELD-01',
      nodeType: 'condition',
      severity: 'Critical',
      description: 'Scans document AST for substring: "guarantees", "minimum baseline net yield", or "absolute capital preservation".',
      conditionFormula: 'contains(doc.text, ["guarantee", "minimum yield"]) == true',
      isViolated: true,
    },
  },
  {
    id: 'cond-disc09',
    type: 'customRuleNode',
    position: { x: 380, y: 400 },
    data: {
      label: 'Condition: Gross-to-Net Fee Disclosure',
      ruleId: 'DISC-09',
      nodeType: 'condition',
      severity: 'High',
      description: 'Ensures net-of-fee returns are displayed alongside gross performance with equal prominence.',
      conditionFormula: 'hasField(doc.schedule, "gross_to_net_reconciliation") == false',
      isViolated: true,
    },
  },
  {
    id: 'act-flag-audit',
    type: 'customRuleNode',
    position: { x: 100, y: 580 },
    data: {
      label: 'Action: Flag & Lock Document',
      ruleId: 'ACT-FLAG-01',
      nodeType: 'action',
      severity: 'Critical',
      description: 'Applies Restricted security tag and halts public distribution workflow.',
      actionHandler: 'vdr.applyTag("Restricted") && alertComplianceDirector()',
      isViolated: true,
    },
  },
  {
    id: 'act-worm-lock',
    type: 'customRuleNode',
    position: { x: 700, y: 400 },
    data: {
      label: 'Action: Optical WORM Ingestion',
      ruleId: 'ACT-WORM-01',
      nodeType: 'action',
      severity: 'Low',
      description: 'Streams document hash to immutable ledger with SHA-256 integrity signature.',
      actionHandler: 'wormStorage.archive(doc.id, doc.hash)',
    },
  },
];

export const initialTreeEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'root-1',
    target: 'rule-2210',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
  },
  {
    id: 'e1-3',
    source: 'root-1',
    target: 'rule-17a4',
    animated: false,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
  {
    id: 'e2-4',
    source: 'rule-2210',
    target: 'cond-guarantee',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
  },
  {
    id: 'e2-5',
    source: 'rule-2210',
    target: 'cond-disc09',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
  },
  {
    id: 'e4-6',
    source: 'cond-guarantee',
    target: 'act-flag-audit',
    animated: true,
    style: { stroke: '#ef4444', strokeWidth: 2 },
  },
  {
    id: 'e3-7',
    source: 'rule-17a4',
    target: 'act-worm-lock',
    animated: false,
    style: { stroke: '#10b981', strokeWidth: 2 },
  },
];

