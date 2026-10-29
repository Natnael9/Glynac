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
  tags: string[];
}

export interface VDRFolder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  description?: string;
}

