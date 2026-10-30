'use client';

import React, { useState } from 'react';
import { useChat } from '@/lib/chatContext';
import {
  MessageSquare,
  Plus,
  Pin,
  Trash2,
  Edit2,
  Check,
  Search,
  Sparkles,
  Calendar,
  MessageCircle,
  X,
} from 'lucide-react';

interface ChatSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const {
    threads,
    activeThreadId,
    setActiveThreadId,
    createNewThread,
    pinThread,
    renameThread,
    deleteThread,
    searchFilter,
    setSearchFilter,
  } = useChat();

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const filteredThreads = threads.filter((t) =>
    t.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const pinnedThreads = filteredThreads.filter((t) => t.pinned);
  const regularThreads = filteredThreads.filter((t) => !t.pinned);

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(id);
    setRenameValue(currentTitle);
  };

  const handleSaveRename = (id: string) => {
    if (renameValue.trim()) {
      renameThread(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleSelectThread = (id: string) => {
    setActiveThreadId(id);
    if (onClose) onClose();
  };

  const handleNewChat = () => {
    createNewThread();
    if (onClose) onClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#050505] w-full select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-[#1a1a1a] bg-[#0a0a0a]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#181818] border border-[#2b2b2b] text-[#ffffff]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-xs font-bold text-white tracking-wide uppercase">
              Compliance Threads
            </h3>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleNewChat}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white text-black hover:bg-[#e0e0e0] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Chat</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#141414] transition-colors cursor-pointer"
                title="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666666]" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search chat conversations..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-xs text-[#ededed] placeholder-slate-500 focus:outline-none focus:border-[#333333] transition-colors"
          />
        </div>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
        {/* Pinned Threads */}
        {pinnedThreads.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#888888] uppercase tracking-wider px-2 mb-1.5">
              <Pin className="h-3 w-3 text-amber-400" />
              Pinned Inquiries
            </div>
            <div className="space-y-1">
              {pinnedThreads.map((thread) => (
                <ThreadItem
                  key={thread.id}
                  thread={thread}
                  isActive={thread.id === activeThreadId}
                  renamingId={renamingId}
                  renameValue={renameValue}
                  setRenameValue={setRenameValue}
                  onSelect={() => handleSelectThread(thread.id)}
                  onPin={(e) => {
                    e.stopPropagation();
                    pinThread(thread.id);
                  }}
                  onRenameStart={(e) => handleStartRename(thread.id, thread.title, e)}
                  onRenameSave={() => handleSaveRename(thread.id)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Threads */}
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#888888] uppercase tracking-wider px-2 mb-1.5">
            <Calendar className="h-3 w-3 text-[#ffffff]" />
            Recent Conversations
          </div>
          {regularThreads.length === 0 ? (
            <div className="text-center py-6 text-[11px] text-[#888888]">
              No threads found matching filter.
            </div>
          ) : (
            <div className="space-y-1">
              {regularThreads.map((thread) => (
                <ThreadItem
                  key={thread.id}
                  thread={thread}
                  isActive={thread.id === activeThreadId}
                  renamingId={renamingId}
                  renameValue={renameValue}
                  setRenameValue={setRenameValue}
                  onSelect={() => handleSelectThread(thread.id)}
                  onPin={(e) => {
                    e.stopPropagation();
                    pinThread(thread.id);
                  }}
                  onRenameStart={(e) => handleStartRename(thread.id, thread.title, e)}
                  onRenameSave={() => handleSaveRename(thread.id)}
                  onDelete={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.id);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex flex-col h-full bg-[#050505] border-r border-[#1a1a1a] w-80 shrink-0 select-none">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />
          <div className="relative w-80 max-w-[85vw] bg-[#050505] border-r border-[#1a1a1a] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

function ThreadItem({
  thread,
  isActive,
  renamingId,
  renameValue,
  setRenameValue,
  onSelect,
  onPin,
  onRenameStart,
  onRenameSave,
  onDelete,
}: {
  thread: any;
  isActive: boolean;
  renamingId: string | null;
  renameValue: string;
  setRenameValue: (s: string) => void;
  onSelect: () => void;
  onPin: (e: React.MouseEvent) => void;
  onRenameStart: (e: React.MouseEvent) => void;
  onRenameSave: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) {
  const isRenaming = renamingId === thread.id;

  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
        isActive
          ? 'bg-[#181818] border border-[#2b2b2b] border border-[#333333] text-white shadow-sm'
          : 'border border-transparent text-[#888888] hover:text-[#ededed] hover:bg-[#0a0a0a]'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <MessageCircle
          className={`h-4 w-4 shrink-0 ${isActive ? 'text-[#ffffff]' : 'text-[#666666]'}`}
        />
        {isRenaming ? (
          <div className="flex items-center gap-1 flex-1" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onRenameSave();
              }}
              className="w-full px-2 py-0.5 bg-[#050505] border border-[#333333] rounded text-xs text-white focus:outline-none"
              autoFocus
            />
            <button
              onClick={onRenameSave}
              className="p-1 rounded bg-[#181818] border border-[#2b2b2b] text-white hover:bg-[#e5e5e5]"
            >
              <Check className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="min-w-0 flex-1">
            <span className="block truncate font-medium text-xs leading-snug">{thread.title}</span>
            <span className="text-[10px] text-[#888888]">
              {thread.messages.length} messages
            </span>
          </div>
        )}
      </div>

      {/* Action Hover Buttons */}
      {!isRenaming && (
        <div className="hidden group-hover:flex items-center gap-0.5 pl-1">
          <button
            onClick={onPin}
            title={thread.pinned ? 'Unpin Thread' : 'Pin Thread'}
            className="p-1 rounded hover:text-amber-400 hover:bg-[#141414] transition-colors"
          >
            <Pin className={`h-3 w-3 ${thread.pinned ? 'text-amber-400 fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={onRenameStart}
            title="Rename"
            className="p-1 rounded hover:text-white hover:bg-[#141414] transition-colors"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="p-1 rounded hover:text-red-400 hover:bg-[#141414] transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

