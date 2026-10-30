'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatThread, ChatMessage, ChatAttachment, Citation } from './types';
import { initialChatThreads, regulatoryCitations } from './mockData/chats';

interface ChatContextType {
  threads: ChatThread[];
  activeThreadId: string | null;
  activeThread: ChatThread | null;
  searchFilter: string;
  isStreaming: boolean;
  selectedAttachments: ChatAttachment[];
  activeCitation: Citation | null;
  setActiveCitation: (c: Citation | null) => void;
  setSearchFilter: (s: string) => void;
  setActiveThreadId: (id: string | null) => void;
  createNewThread: (title?: string) => string;
  pinThread: (id: string) => void;
  renameThread: (id: string, newTitle: string) => void;
  deleteThread: (id: string) => void;
  addAttachment: (att: ChatAttachment) => void;
  removeAttachment: (id: string) => void;
  clearAttachments: () => void;
  sendMessage: (content: string) => Promise<void>;
  setMessageFeedback: (messageId: string, feedback: 'like' | 'dislike' | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>('thread-1');
  const [searchFilter, setSearchFilter] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<ChatAttachment[]>([]);
  const [activeCitation, setActiveCitation] = useState<Citation | null>(null);

  // Active thread
  const activeThread = threads.find((t) => t.id === activeThreadId) || null;

  const createNewThread = (title = 'New Compliance Audit Chat') => {
    const newId = `thread-${Date.now()}`;
    const newThread: ChatThread = {
      id: newId,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
      messages: [],
    };
    setThreads((prev) => [newThread, ...prev]);
    setActiveThreadId(newId);
    return newId;
  };

  const pinThread = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, pinned: !t.pinned } : t))
    );
  };

  const renameThread = (id: string, newTitle: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const deleteThread = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    if (activeThreadId === id) {
      const remaining = threads.filter((t) => t.id !== id);
      setActiveThreadId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const addAttachment = (att: ChatAttachment) => {
    if (!selectedAttachments.some((a) => a.id === att.id)) {
      setSelectedAttachments((prev) => [...prev, att]);
    }
  };

  const removeAttachment = (id: string) => {
    setSelectedAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAttachments = () => {
    setSelectedAttachments([]);
  };

  const setMessageFeedback = (messageId: string, feedback: 'like' | 'dislike' | null) => {
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== activeThreadId) return t;
        return {
          ...t,
          messages: t.messages.map((m) => (m.id === messageId ? { ...m, feedback } : m)),
        };
      })
    );
  };

  const sendMessage = async (content: string) => {
    if (!content.trim() && selectedAttachments.length === 0) return;

    let targetThreadId = activeThreadId;
    if (!targetThreadId) {
      targetThreadId = createNewThread(content.slice(0, 32) || 'New Conversation');
    }

    const userMsgId = `msg-user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      attachments: [...selectedAttachments],
    };

    const currentAttachments = [...selectedAttachments];
    clearAttachments();

    // Prepare simulated assistant response
    const assistantMsgId = `msg-ast-${Date.now()}`;

    // Determine relevant citations and response based on user prompt
    let responseText = '';
    const relevantCitations: Citation[] = [];

    const lower = content.toLowerCase();
    if (lower.includes('finra') || lower.includes('guarantee') || lower.includes('yield') || lower.includes('return')) {
      relevantCitations.push(regulatoryCitations['FINRA-2210']);
    }
    if (lower.includes('fee') || lower.includes('gross') || lower.includes('net') || lower.includes('disc-09')) {
      relevantCitations.push(regulatoryCitations['DISC-09']);
    }
    if (lower.includes('storage') || lower.includes('retention') || lower.includes('worm') || lower.includes('17a-4')) {
      relevantCitations.push(regulatoryCitations['SEC-17a-4']);
    }

    if (relevantCitations.length === 0) {
      relevantCitations.push(regulatoryCitations['FINRA-2210']);
    }

    if (lower.includes('remediation') || lower.includes('amendment') || lower.includes('draft')) {
      responseText = `### ✍️ Proposed Compliance Remediation Clause

Based on SEC and FINRA requirements for promotional communications:

\`\`\`diff
- Section 4: The Fund guarantees a minimum baseline net yield of 12.5% annualized return.
+ Section 4: Target Return Disclaimer. The Fund seeks to achieve a target net yield of 12.5% per annum. Target returns are hypothetical, reflect subjective assumptions, and do not represent a guarantee of actual future earnings or downside protection.
\`\`\`

**Regulatory Note:** This revised language complies with [FINRA-2210] requirements for balanced risk disclosure.`;
    } else {
      responseText = `### 🛡️ Compliance Assessment & Policy Audit

I evaluated your inquiry against active firm policies and regulatory standards:

- **Attachment Scope:** ${currentAttachments.length > 0 ? currentAttachments.map((a) => a.name).join(', ') : 'Direct prompt context'}
- **Rule Verification:** Evaluated against [FINRA-2210] and [DISC-09].

#### Key Findings:
1. **Promissory Statements Prohibited:** Promotional representations promising guaranteed returns or capital preservation are strictly forbidden under regulatory rules.
2. **Required Disclosures:** Any target yields must be paired with equal prominence of risk factors, investment strategy volatility, and fee breakdowns.

You can inspect the linked policy node inside the **Visual Tree Editor** at rule node \`FINRA-2210 § 4\`.`;
    }

    // Append user message immediately, and empty streaming assistant message
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== targetThreadId) return t;
        return {
          ...t,
          updatedAt: new Date().toISOString(),
          messages: [
            ...t.messages,
            userMessage,
            {
              id: assistantMsgId,
              role: 'assistant',
              content: '',
              timestamp: new Date().toISOString(),
              isStreaming: true,
              citations: relevantCitations,
            },
          ],
        };
      })
    );

    setIsStreaming(true);

    // Stream typewriter effect
    const chunks = responseText.split(' ');
    let currentText = '';

    for (let i = 0; i < chunks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 35));
      currentText += (i === 0 ? '' : ' ') + chunks[i];

      setThreads((prev) =>
        prev.map((t) => {
          if (t.id !== targetThreadId) return t;
          return {
            ...t,
            messages: t.messages.map((m) =>
              m.id === assistantMsgId ? { ...m, content: currentText } : m
            ),
          };
        })
      );
    }

    // Finalize message streaming status
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== targetThreadId) return t;
        return {
          ...t,
          messages: t.messages.map((m) =>
            m.id === assistantMsgId ? { ...m, isStreaming: false } : m
          ),
        };
      })
    );
    setIsStreaming(false);
  };

  return (
    <ChatContext.Provider
      value={{
        threads,
        activeThreadId,
        activeThread,
        searchFilter,
        isStreaming,
        selectedAttachments,
        activeCitation,
        setActiveCitation,
        setSearchFilter,
        setActiveThreadId,
        createNewThread,
        pinThread,
        renameThread,
        deleteThread,
        addAttachment,
        removeAttachment,
        clearAttachments,
        sendMessage,
        setMessageFeedback,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

