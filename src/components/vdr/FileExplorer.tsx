'use client';

import React, { useState } from 'react';
import { useVDR } from '@/lib/vdrContext';
import { VDRDocument, SensitivityLevel } from '@/lib/types';
import {
  Folder,
  FileText,
  FileCode,
  FileSpreadsheet,
  ChevronRight,
  Search,
  Upload,
  FolderPlus,
  Trash2,
  Lock,
  History,
  Shield,
  Eye,
  MoreVertical,
  LayoutGrid,
  List,
  ArrowUpDown,
  CheckSquare,
  Square,
  AlertTriangle,
  Download,
  Edit2,
  FileCheck,
} from 'lucide-react';

export function FileExplorer() {
  const {
    folders,
    documents,
    selectedFolderId,
    selectedDocId,
    setSelectedFolderId,
    setSelectedDocId,
    setIsAuditDrawerOpen,
    setIsPermissionModalOpen,
    setIsUploadModalOpen,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    viewMode,
    setViewMode,
    selectedDocIds,
    toggleDocSelection,
    selectAllDocs,
    clearDocSelection,
    createFolder,
    renameDocument,
    deleteDocuments,
    addAuditLog,
  } = useVDR();

  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [renamingDocId, setRenamingDocId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');

  // Active folder
  const currentFolder = folders.find((f) => f.id === selectedFolderId);

  // Filter documents by folder and search query
  const filteredDocs = documents
    .filter((doc) => {
      const matchesFolder = selectedFolderId ? doc.folderId === selectedFolderId : true;
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.sensitivity.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'date') {
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      } else if (sortBy === 'size') {
        comparison = a.sizeBytes - b.sizeBytes;
      } else if (sortBy === 'sensitivity') {
        comparison = a.sensitivity.localeCompare(b.sensitivity);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const getSensitivityBadge = (level: SensitivityLevel) => {
    switch (level) {
      case 'Restricted':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'Confidential':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Internal Only':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Public':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
  };

  const getFileIcon = (ext: string) => {
    switch (ext) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-rose-400" />;
      case 'json':
        return <FileCode className="h-4 w-4 text-amber-400" />;
      case 'md':
        return <FileSpreadsheet className="h-4 w-4 text-cyan-400" />;
      default:
        return <FileText className="h-4 w-4 text-blue-400" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleStartRename = (e: React.MouseEvent, doc: VDRDocument) => {
    e.stopPropagation();
    setRenamingDocId(doc.id);
    setRenameInput(doc.name);
  };

  const handleSaveRename = (id: string) => {
    if (renameInput.trim()) {
      renameDocument(id, renameInput.trim());
    }
    setRenamingDocId(null);
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
      setIsNewFolderModalOpen(false);
    }
  };

  const allFilteredSelected =
    filteredDocs.length > 0 && filteredDocs.every((d) => selectedDocIds.includes(d.id));

  return (
    <div className="flex flex-col h-full bg-slate-950/40 select-none">
      {/* Explorer Top Toolbar */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/30 flex flex-wrap items-center justify-between gap-3">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setSelectedFolderId(null)}
            className={`font-semibold hover:text-white transition-colors flex items-center gap-1.5 ${
              selectedFolderId === null ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Folder className="h-3.5 w-3.5" />
            All Folders
          </button>
          {currentFolder && (
            <>
              <ChevronRight className="h-3 w-3 text-slate-600" />
              <span className="text-white font-medium flex items-center gap-1">
                <Folder className="h-3.5 w-3.5 text-blue-400" />
                {currentFolder.name}
              </span>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Multi-selection bar */}
          {selectedDocIds.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-xs text-blue-300">
              <span className="font-semibold">{selectedDocIds.length} selected</span>
              <button
                onClick={() => deleteDocuments(selectedDocIds)}
                title="Delete Selected"
                className="p-1 hover:text-red-400 transition-colors ml-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={clearDocSelection}
                className="text-[10px] text-slate-400 hover:text-slate-200 ml-1 underline"
              >
                Clear
              </button>
            </div>
          )}

          <button
            onClick={() => setIsNewFolderModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <FolderPlus className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden sm:inline">New Folder</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-semibold text-white transition-all shadow-md shadow-blue-600/20"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents by name, tag, or sensitivity..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Folder Chips */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setSelectedFolderId(null)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
              selectedFolderId === null
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/50 border border-slate-800'
            }`}
          >
            All Files ({documents.length})
          </button>
          {folders.map((f) => {
            const count = documents.filter((d) => d.folderId === f.id).length;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFolderId(f.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                  selectedFolderId === f.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/50 border border-slate-800'
                }`}
              >
                <Folder className="h-3 w-3" />
                <span>{f.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Sort & View Options */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => {
                if (sortBy === 'date') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else setSortBy('date');
              }}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                sortBy === 'date' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Date
              {sortBy === 'date' && <ArrowUpDown className="h-2.5 w-2.5 text-blue-400" />}
            </button>
            <button
              onClick={() => {
                if (sortBy === 'name') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else setSortBy('name');
              }}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                sortBy === 'name' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Name
              {sortBy === 'name' && <ArrowUpDown className="h-2.5 w-2.5 text-blue-400" />}
            </button>
            <button
              onClick={() => {
                if (sortBy === 'sensitivity') setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                else setSortBy('sensitivity');
              }}
              className={`px-2 py-1 rounded text-[11px] flex items-center gap-1 ${
                sortBy === 'sensitivity' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Security
              {sortBy === 'sensitivity' && <ArrowUpDown className="h-2.5 w-2.5 text-blue-400" />}
            </button>
          </div>

          <div className="flex items-center gap-0.5 bg-slate-900/80 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
              title="Table View"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-blue-400' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Explorer Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredDocs.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800/80 rounded-2xl bg-slate-950/20">
            <FileCheck className="h-10 w-10 text-slate-600 mb-2" />
            <h4 className="text-sm font-semibold text-slate-300">No documents found</h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              {searchQuery
                ? `No documents match "${searchQuery}". Try clearing your search.`
                : 'This folder is currently empty. Upload files or create a new document.'}
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
            >
              Upload Document
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* Table View */
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/60 text-slate-400 font-semibold border-b border-slate-800/80">
                <tr>
                  <th className="py-2.5 px-3 w-8">
                    <button
                      onClick={() =>
                        allFilteredSelected
                          ? clearDocSelection()
                          : selectAllDocs(filteredDocs.map((d) => d.id))
                      }
                      className="text-slate-400 hover:text-white"
                    >
                      {allFilteredSelected ? (
                        <CheckSquare className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-2.5 px-3">Document Name</th>
                  <th className="py-2.5 px-3">Sensitivity</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">Compliance Flags</th>
                  <th className="py-2.5 px-3 hidden lg:table-cell">Size</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Updated</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredDocs.map((doc) => {
                  const isSelected = selectedDocId === doc.id;
                  const isChecked = selectedDocIds.includes(doc.id);
                  const hasFlags = doc.flaggedClauses.length > 0;

                  return (
                    <tr
                      key={doc.id}
                      onClick={() => {
                        setSelectedDocId(doc.id);
                        addAuditLog('Viewed', doc.id, `Selected document in explorer`);
                      }}
                      className={`group cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-blue-600/10 hover:bg-blue-600/15'
                          : 'hover:bg-slate-900/50'
                      }`}
                    >
                      <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleDocSelection(doc.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                            {getFileIcon(doc.extension)}
                          </div>
                          <div className="min-w-0">
                            {renamingDocId === doc.id ? (
                              <div
                                className="flex items-center gap-1.5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <input
                                  type="text"
                                  value={renameInput}
                                  onChange={(e) => setRenameInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveRename(doc.id);
                                    if (e.key === 'Escape') setRenamingDocId(null);
                                  }}
                                  className="px-2 py-0.5 bg-slate-950 border border-blue-500 rounded text-xs text-white focus:outline-none"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveRename(doc.id)}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-semibold"
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <div className="font-medium text-slate-200 group-hover:text-blue-300 truncate">
                                {doc.name}
                              </div>
                            )}
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {doc.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9px] px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getSensitivityBadge(
                            doc.sensitivity
                          )}`}
                        >
                          {doc.sensitivity}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 hidden md:table-cell">
                        {hasFlags ? (
                          <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                            <span>{doc.flaggedClauses.length} Flagged</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-400/80">Clean</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 hidden lg:table-cell font-mono text-[11px]">
                        {formatFileSize(doc.sizeBytes)}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 hidden sm:table-cell text-[11px]">
                        {new Date(doc.updatedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setSelectedDocId(doc.id);
                              setIsPermissionModalOpen(true);
                            }}
                            title="Manage Permissions & Sensitivity"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDocId(doc.id);
                              setIsAuditDrawerOpen(true);
                            }}
                            title="View Audit Trail"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                          >
                            <History className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => handleStartRename(e, doc)}
                            title="Rename"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDocId === doc.id;
              const isChecked = selectedDocIds.includes(doc.id);
              const hasFlags = doc.flaggedClauses.length > 0;

              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    addAuditLog('Viewed', doc.id, `Selected document in explorer grid`);
                  }}
                  className={`group relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600/10 border-blue-500/40 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                      : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                        {getFileIcon(doc.extension)}
                      </div>
                      <div
                        className="flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => toggleDocSelection(doc.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isChecked ? (
                            <CheckSquare className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Square className="h-4 w-4 opacity-40 hover:opacity-100" />
                          )}
                        </button>
                      </div>
                    </div>

                    <h5 className="font-semibold text-xs text-slate-200 group-hover:text-blue-300 line-clamp-2 mb-1.5">
                      {doc.name}
                    </h5>

                    <div className="flex flex-wrap items-center gap-1 mb-2">
                      <span
                        className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${getSensitivityBadge(
                          doc.sensitivity
                        )}`}
                      >
                        {doc.sensitivity}
                      </span>
                      {hasFlags && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <AlertTriangle className="h-2.5 w-2.5" />
                          {doc.flaggedClauses.length} Flagged
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{formatFileSize(doc.sizeBytes)}</span>
                    <div
                      className="flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setSelectedDocId(doc.id);
                          setIsPermissionModalOpen(true);
                        }}
                        title="Permissions"
                        className="p-1 hover:text-blue-400 transition-colors"
                      >
                        <Lock className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDocId(doc.id);
                          setIsAuditDrawerOpen(true);
                        }}
                        title="Audit Logs"
                        className="p-1 hover:text-amber-400 transition-colors"
                      >
                        <History className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Folder Modal */}
      {isNewFolderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <FolderPlus className="h-4 w-4 text-blue-400" />
              Create Compliance Folder
            </h3>
            <form onSubmit={handleCreateFolder}>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. 2026 FINRA Exam Filings"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 mb-4"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewFolderModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newFolderName.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

