'use client';

import React, { useState } from 'react';
import { useChat } from '@/lib/chatContext';
import { useVDR } from '@/lib/vdrContext';
import {
  Send,
  Paperclip,
  X,
  Sparkles,
  FileText,
  Plus,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import { sampleQuickPrompts } from '@/lib/mockData/chats';

export function ChatInput() {
  const {
    sendMessage,
    isStreaming,
    selectedAttachments,
    addAttachment,
    removeAttachment,
  } = useChat();
  const { documents } = useVDR();

  const [input, setInput] = useState('');
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && selectedAttachments.length === 0) return;
    if (isStreaming) return;

    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-blue-400" />
          Suggested:
        </span>
        {sampleQuickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInput(prompt)}
            className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white text-[11px] whitespace-nowrap transition-colors shrink-0"
          >
            {prompt.length > 52 ? `${prompt.slice(0, 52)}...` : prompt}
          </button>
        ))}
      </div>

      {/* Attached Document Chips */}
      {selectedAttachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
            <Paperclip className="h-3 w-3 text-blue-400" /> Attached to context:
          </span>
          {selectedAttachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-300 text-xs font-medium"
            >
              <FileText className="h-3 w-3" />
              <span className="truncate max-w-[160px]">{att.name}</span>
              <button
                type="button"
                onClick={() => removeAttachment(att.id)}
                className="p-0.5 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
        <div className="relative flex-1 rounded-2xl bg-slate-900 border border-slate-800 focus-within:border-blue-500 transition-colors p-2 flex items-end gap-2">
          {/* Attach Button */}
          <button
            type="button"
            onClick={() => setIsAttachModalOpen(true)}
            title="Attach Document from VDR"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          {/* Text Area */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about compliance policies, SEC/FINRA violations, or attach a document..."
            rows={2}
            className="w-full bg-transparent text-xs text-white placeholder-slate-400 resize-none focus:outline-none py-1"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!input.trim() && selectedAttachments.length === 0) || isStreaming}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-600/20 shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Attach Document Picker Modal */}
      {isAttachModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
                  <FileCheck className="h-4 w-4" />
                </div>
                <h4 className="text-xs font-bold text-white">Attach Document from VDR</h4>
              </div>
              <button
                onClick={() => setIsAttachModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-3 space-y-2 max-h-60 overflow-y-auto">
              {documents.map((doc) => {
                const isAttached = selectedAttachments.some((a) => a.id === doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      if (!isAttached) {
                        addAttachment({
                          id: doc.id,
                          name: doc.name,
                          size: doc.sizeBytes,
                          extension: doc.extension,
                          sourceDocId: doc.id,
                        });
                      }
                      setIsAttachModalOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                      isAttached
                        ? 'bg-blue-600/10 border-blue-500/40 text-blue-300'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {(doc.sizeBytes / 1024).toFixed(1)} KB • {doc.sensitivity}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-blue-400 font-semibold border border-slate-800">
                      {isAttached ? 'Attached' : 'Select'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

