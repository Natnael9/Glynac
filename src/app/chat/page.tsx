'use client';

import React, { useRef, useEffect } from 'react';
import { useChat } from '@/lib/chatContext';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { CitationPopover } from '@/components/chat/CitationPopover';
import {
  MessageSquareCode,
  Sparkles,
  ShieldCheck,
  Pin,
  Lock,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { activeThread, isStreaming } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages, isStreaming]);

  return (
    <div className="flex h-full w-full bg-[#090d16] overflow-hidden select-none">
      {/* Left Conversation Threads Sidebar */}
      <ChatSidebar />

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-[#050505]">
        {/* Chat Thread Header */}
        <div className="p-4 border-b border-[#1a1a1a] bg-[#050505] flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight truncate">
                {activeThread ? activeThread.title : 'Compliance AI Assistant'}
              </h2>
              {activeThread?.pinned && (
                <span className="p-0.5 rounded bg-amber-500/10 text-amber-400">
                  <Pin className="h-3.5 w-3.5 fill-amber-400" />
                </span>
              )}
            </div>
            <p className="text-xs text-[#888888]">
              Automated regulatory compliance analysis & citation lookup
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/vdr"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-xs font-medium text-[#d1d1d1] hover:text-white hover:bg-[#141414] transition-colors"
            >
              <Lock className="h-3.5 w-3.5 text-[#ffffff]" />
              <span className="hidden sm:inline">Open Data Room</span>
            </Link>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#1a1a1a] select-text">
          {activeThread && activeThread.messages.length > 0 ? (
            activeThread.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="h-14 w-14 rounded-2xl bg-[#181818] border border-[#2b2b2b] border border-[#333333] flex items-center justify-center text-[#ffffff] mb-3 shadow-lg shadow-blue-500/10">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                How can I assist your compliance audit today?
              </h3>
              <p className="text-xs text-[#888888] max-w-sm mb-4 leading-relaxed">
                Ask questions about FINRA Rule 2210 promotional restrictions, SEA Rule 17a-4 recordkeeping, or attach a document from the VDR to scan for violations.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Input Box */}
        <ChatInput />
      </div>

      {/* Citation Popover Modal */}
      <CitationPopover />
    </div>
  );
}
