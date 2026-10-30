'use client';

import React, { useState } from 'react';
import { useChat } from '@/lib/chatContext';
import { ChatMessage, Citation } from '@/lib/types';
import {
  Sparkles,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Paperclip,
  ExternalLink,
  ShieldAlert,
  FileText,
  BookmarkCheck,
} from 'lucide-react';
import Link from 'next/link';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const { setActiveCitation, setMessageFeedback, sendMessage } = useChat();
  const [copied, setCopied] = useState(false);

  const isAssistant = message.role === 'assistant';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render markdown with citations and code blocks
  const renderMessageContent = (text: string) => {
    // Process citation pills [FINRA-2210], [DISC-09], [SEC-17a-4]
    const parts = text.split(/(\[FINRA-2210\]|\[DISC-09\]|\[SEC-17a-4\])/g);

    return parts.map((part, index) => {
      if (part === '[FINRA-2210]' || part === '[DISC-09]' || part === '[SEC-17a-4]') {
        const codeKey = part.replace(/[\[\]]/g, '');
        const citation = message.citations?.find((c) => c.ruleCode.includes(codeKey));

        return (
          <button
            key={index}
            onClick={() => {
              if (citation) setActiveCitation(citation);
            }}
            className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 rounded-md text-[11px] font-bold bg-[#141414] text-[#ededed] border border-[#333333] hover:bg-[#e5e5e5] transition-colors cursor-pointer align-baseline"
          >
            <BookmarkCheck className="h-3 w-3 text-[#ffffff]" />
            <span>{codeKey}</span>
          </button>
        );
      }

      // Format headers, bold text, code blocks simply
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div
      className={`flex gap-3 py-3 px-4 ${
        isAssistant ? 'bg-[#0a0a0a]' : 'bg-transparent'
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0 pt-0.5">
        {isAssistant ? (
          <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
        ) : (
          <div className="h-7 w-7 rounded-xl bg-[#141414] border border-[#262626] flex items-center justify-center text-[#d1d1d1] font-bold text-xs">
            NA
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0 space-y-2 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#ededed]">
              {isAssistant ? 'Compliance AI Assistant' : 'Natnael Ashenafi'}
            </span>
            <span className="text-[10px] text-[#888888]">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            {message.isStreaming && (
              <span className="inline-flex items-center gap-1 text-[10px] text-[#ffffff] animate-pulse font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                Thinking & Streaming...
              </span>
            )}
          </div>
        </div>

        {/* Attachment chips in user messages */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.attachments.map((att) => (
              <div
                key={att.id}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181818] border border-[#2b2b2b] border border-[#333333] text-[#ededed] text-[11px] font-medium"
              >
                <FileText className="h-3.5 w-3.5 text-[#ffffff]" />
                <span>{att.name}</span>
                <span className="text-[9px] text-[#888888]">
                  ({(att.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Main Body */}
        <div className="text-[#ededed] leading-relaxed space-y-2 break-words">
          {renderMessageContent(message.content)}
        </div>

        {/* Citations Preview Footer */}
        {isAssistant && message.citations && message.citations.length > 0 && (
          <div className="pt-2 border-t border-[#1a1a1a] mt-3">
            <div className="text-[10px] uppercase font-bold text-[#888888] mb-1.5 flex items-center gap-1.5">
              <BookmarkCheck className="h-3 w-3 text-[#ffffff]" />
              Verified Citations & Regulatory References
            </div>
            <div className="flex flex-wrap gap-2">
              {message.citations.map((cite) => (
                <button
                  key={cite.id}
                  onClick={() => setActiveCitation(cite)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#333333] text-[11px] text-[#d1d1d1] hover:text-white transition-colors"
                >
                  <span className="font-semibold text-[#ffffff]">{cite.ruleCode}:</span>
                  <span className="truncate max-w-[200px]">{cite.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Bar */}
        {isAssistant && !message.isStreaming && (
          <div className="flex items-center justify-between pt-1 text-[#888888]">
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                title="Copy Response"
                className="p-1 rounded-md hover:text-white hover:bg-[#141414] transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => sendMessage('Can you rephrase and provide more regulatory precedents?')}
                title="Regenerate / Follow-up"
                className="p-1 rounded-md hover:text-[#ffffff] hover:bg-[#141414] transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <div className="h-3 w-[1px] bg-[#141414] mx-1" />
              <button
                onClick={() => setMessageFeedback(message.id, message.feedback === 'like' ? null : 'like')}
                title="Helpful"
                className={`p-1 rounded-md transition-colors ${
                  message.feedback === 'like' ? 'text-emerald-400 bg-emerald-500/10' : 'hover:text-white hover:bg-[#141414]'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setMessageFeedback(message.id, message.feedback === 'dislike' ? null : 'dislike')}
                title="Report issue"
                className={`p-1 rounded-md transition-colors ${
                  message.feedback === 'dislike' ? 'text-red-400 bg-red-500/10' : 'hover:text-white hover:bg-[#141414]'
                }`}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <Link
              href="/tree"
              className="text-[10px] text-[#ffffff] hover:underline flex items-center gap-1"
            >
              <span>Inspect in Rule Tree Editor</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

