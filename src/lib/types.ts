export type SensitivityLevel = 'Public' | 'Internal Only' | 'Confidential' | 'Restricted';

export type UserRole = 'Admin' | 'Compliance Officer' | 'Advisor' | 'Auditor';

export interface DocumentPermission {
  role: UserRole;
  canView: boolean;
  canEdit: boolean;
  canShare: boolean;
  canDownload: boolean;
}

export interface AuditEvent {
  id: string;
  documentId: string;
  action: 'Uploaded' | 'Viewed' | 'Downloaded' | 'Flagged' | 'Permission Changed' | 'Renamed';
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  details?: string;
}

export interface FlaggedClause {
  id: string;
  ruleCode: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  textSnippet: string;
  reason: string;
  suggestedRemedy: string;
}

export interface VDRDocument {
  id: string;
  name: string;
  folderId: string;
  extension: 'pdf' | 'md' | 'txt' | 'json';
  sizeBytes: number;
  createdAt: string;
  updatedAt: string;
  uploadedBy: string;
  sensitivity: SensitivityLevel;
  permissions: DocumentPermission[];
  flaggedClauses: FlaggedClause[];
  content: string;
  fileUrl?: string;
  tags: string[];
}

export interface VDRFolder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  description?: string;
}

// ----------------------------------------------------
// Task 2: Chat & AI Assistant Types
// ----------------------------------------------------

export interface Citation {
  id: string;
  ruleCode: string;
  title: string;
  excerpt: string;
  documentId?: string;
  url?: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  size: number;
  extension: string;
  sourceDocId?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  citations?: Citation[];
  attachments?: ChatAttachment[];
  feedback?: 'like' | 'dislike' | null;
}

export interface ChatThread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  messages: ChatMessage[];
}

// ----------------------------------------------------
// Task 4: Visual Tree & DAG Editor Types
// ----------------------------------------------------

export type RuleNodeType = 'root' | 'rule' | 'condition' | 'action';

export interface RuleNodeData extends Record<string, unknown> {
  label: string;
  ruleId: string;
  nodeType: RuleNodeType;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  conditionFormula?: string;
  actionHandler?: string;
  tags?: string[];
  isViolated?: boolean;
}

export interface RuleGraphJSON {
  version: string;
  metadata: {
    title: string;
    description: string;
    lastExported: string;
    totalNodes: number;
  };
  nodes: {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: RuleNodeData;
  }[];
  edges: {
    id: string;
    source: string;
    target: string;
    label?: string;
  }[];
}

// ----------------------------------------------------
// Task 3: Enterprise Admin Panel Types
// ----------------------------------------------------

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Pending' | 'Suspended';
  department: string;
  lastActive: string;
  permissions: {
    vdr: 'Read' | 'Write' | 'Admin';
    chat: 'Read' | 'Write' | 'Admin';
    tree: 'Read' | 'Write' | 'Admin';
    admin: 'None' | 'Read' | 'Full';
  };
}

export interface ComplianceRulePolicy {
  id: string;
  ruleCode: string;
  title: string;
  jurisdiction: 'SEC' | 'FINRA' | 'State' | 'Internal';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  isActive: boolean;
  violationCount: number;
  lastUpdated: string;
  description: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  category: 'Security' | 'AI Model' | 'Audit' | 'Performance';
  enabled: boolean;
  requiresRestart?: boolean;
}

export interface SystemHealthMetric {
  service: string;
  status: 'Operational' | 'Degraded' | 'Down';
  latencyMs: number;
  uptimePercent: number;
  lastChecked: string;
}
