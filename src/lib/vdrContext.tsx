'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VDRDocument, VDRFolder, AuditEvent, SensitivityLevel, DocumentPermission } from './types';
import { initialDocuments, initialFolders, initialAuditLogs, defaultPermissions } from './mockData/documents';

interface VDRContextType {
  folders: VDRFolder[];
  documents: VDRDocument[];
  auditLogs: AuditEvent[];
  selectedFolderId: string | null;
  selectedDocId: string | null;
  activeDoc: VDRDocument | null;
  isAuditDrawerOpen: boolean;
  isPermissionModalOpen: boolean;
  isUploadModalOpen: boolean;
  searchQuery: string;
  sortBy: 'name' | 'date' | 'size' | 'sensitivity';
  sortOrder: 'asc' | 'desc';
  viewMode: 'table' | 'grid';
  selectedDocIds: string[];
  setSelectedFolderId: (id: string | null) => void;
  setSelectedDocId: (id: string | null) => void;
  setIsAuditDrawerOpen: (open: boolean) => void;
  setIsPermissionModalOpen: (open: boolean) => void;
  setIsUploadModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'name' | 'date' | 'size' | 'sensitivity') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  setViewMode: (mode: 'table' | 'grid') => void;
  toggleDocSelection: (id: string) => void;
  selectAllDocs: (ids: string[]) => void;
  clearDocSelection: () => void;
  createFolder: (name: string, parentId?: string | null) => void;
  renameDocument: (id: string, newName: string) => void;
  deleteDocuments: (ids: string[]) => void;
  uploadDocument: (file: { name: string; size: number; content: string; extension: 'pdf' | 'md' | 'txt' | 'json'; sensitivity: SensitivityLevel }) => void;
  updateDocumentPermissions: (docId: string, sensitivity: SensitivityLevel, permissions: DocumentPermission[]) => void;
  addAuditLog: (action: AuditEvent['action'], documentId: string, details?: string) => void;
}

const VDRContext = createContext<VDRContextType | undefined>(undefined);

export function VDRProvider({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState<VDRFolder[]>(initialFolders);
  const [documents, setDocuments] = useState<VDRDocument[]>(initialDocuments);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(initialAuditLogs);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>('folder-agreements');
  const [selectedDocId, setSelectedDocId] = useState<string | null>('doc-1');
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'sensitivity'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  // Find currently active document
  const activeDoc = documents.find((d) => d.id === selectedDocId) || null;

  const toggleDocSelection = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllDocs = (ids: string[]) => {
    setSelectedDocIds(ids);
  };

  const clearDocSelection = () => {
    setSelectedDocIds([]);
  };

  const addAuditLog = (action: AuditEvent['action'], documentId: string, details?: string) => {
    const newLog: AuditEvent = {
      id: `audit-${Date.now()}`,
      documentId,
      action,
      timestamp: new Date().toISOString(),
      userId: 'user-current',
      userName: 'Natnael Ashenafi',
      userRole: 'Compliance Officer',
      details: details || `Performed ${action} operation`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const createFolder = (name: string, parentId: string | null = selectedFolderId) => {
    const newFolder: VDRFolder = {
      id: `folder-${Date.now()}`,
      name,
      parentId: parentId || 'folder-root',
      createdAt: new Date().toISOString(),
      description: 'Custom compliance folder',
    };
    setFolders((prev) => [...prev, newFolder]);
  };

  const renameDocument = (id: string, newName: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, name: newName, updatedAt: new Date().toISOString() } : doc))
    );
    addAuditLog('Renamed', id, `Renamed document to ${newName}`);
  };

  const deleteDocuments = (ids: string[]) => {
    setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)));
    if (selectedDocId && ids.includes(selectedDocId)) {
      setSelectedDocId(null);
    }
    setSelectedDocIds([]);
  };

  const uploadDocument = ({
    name,
    size,
    content,
    extension,
    sensitivity,
  }: {
    name: string;
    size: number;
    content: string;
    extension: 'pdf' | 'md' | 'txt' | 'json';
    sensitivity: SensitivityLevel;
  }) => {
    const newId = `doc-${Date.now()}`;
    const newDoc: VDRDocument = {
      id: newId,
      name,
      folderId: selectedFolderId || 'folder-agreements',
      extension,
      sizeBytes: size,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedBy: 'Natnael Ashenafi (Compliance Officer)',
      sensitivity,
      permissions: defaultPermissions(sensitivity),
      tags: ['Uploaded', 'Pending Review'],
      flaggedClauses: [],
      content,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocId(newId);
    addAuditLog('Uploaded', newId, `Uploaded to current folder with ${sensitivity} security tag`);
  };

  const updateDocumentPermissions = (
    docId: string,
    sensitivity: SensitivityLevel,
    permissions: DocumentPermission[]
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, sensitivity, permissions, updatedAt: new Date().toISOString() } : doc
      )
    );
    addAuditLog('Permission Changed', docId, `Updated sensitivity to ${sensitivity} and modified role access rules`);
  };

  return (
    <VDRContext.Provider
      value={{
        folders,
        documents,
        auditLogs,
        selectedFolderId,
        selectedDocId,
        activeDoc,
        isAuditDrawerOpen,
        isPermissionModalOpen,
        isUploadModalOpen,
        searchQuery,
        sortBy,
        sortOrder,
        viewMode,
        selectedDocIds,
        setSelectedFolderId,
        setSelectedDocId,
        setIsAuditDrawerOpen,
        setIsPermissionModalOpen,
        setIsUploadModalOpen,
        setSearchQuery,
        setSortBy,
        setSortOrder,
        setViewMode,
        toggleDocSelection,
        selectAllDocs,
        clearDocSelection,
        createFolder,
        renameDocument,
        deleteDocuments,
        uploadDocument,
        updateDocumentPermissions,
        addAuditLog,
      }}
    >
      {children}
    </VDRContext.Provider>
  );
}

export function useVDR() {
  const context = useContext(VDRContext);
  if (!context) {
    throw new Error('useVDR must be used within a VDRProvider');
  }
  return context;
}

