import { ChatThread, Citation } from '../types';

export const regulatoryCitations: Record<string, Citation> = {
  'FINRA-2210': {
    id: 'cite-1',
    ruleCode: 'FINRA Rule 2210 § 4',
    title: 'Communications with the Public — Prohibited Promissory Statements',
    excerpt:
      'All member communications must be fair and balanced, and must provide a sound basis for evaluating the facts. No member may make any false, exaggerated, unwarranted, promissory or misleading statement or claim in any communication with the public, nor predict or guarantee the success of any investment.',
    documentId: 'doc-1',
    url: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210',
  },
  'DISC-09': {
    id: 'cite-2',
    ruleCode: 'SEC Rule 206(4)-1 (DISC-09)',
    title: 'Investment Adviser Marketing Rule — Gross vs Net Fee Disclosures',
    excerpt:
      'The Marketing Rule requires that presentations of gross performance must be accompanied by net performance displayed with at least equal prominence and calculated over the same time periods, including an explicit itemization of management and performance fees.',
    documentId: 'doc-1',
    url: 'https://www.sec.gov/investment/marketing-faq',
  },
  'SEC-17a-4': {
    id: 'cite-3',
    ruleCode: 'SEA Rule 17a-4(f)',
    title: 'Electronic Recordkeeping & Immutable WORM Media',
    excerpt:
      'Requires broker-dealers to preserve electronic records exclusively in a non-rewriteable, non-erasable format (WORM) or verify through audit trails with an independent third party access agreement on file.',
    documentId: 'doc-3',
    url: 'https://www.sec.gov/rules/final/34-44992.htm',
  },
};

export const sampleQuickPrompts = [
  'Check Investment_Agreement_2026.pdf for promissory guaranteed return clauses under FINRA-2210.',
  'Does our fee schedule disclosure comply with SEC Marketing Rule (DISC-09)?',
  'What are the mandatory electronic storage retention periods under SEA Rule 17a-4?',
  'Draft a remediation amendment for Section 4 of the private placement memorandum.',
];

export const initialChatThreads: ChatThread[] = [
  {
    id: 'thread-1',
    title: 'Investment Agreement FINRA-2210 Audit',
    createdAt: '2026-02-24T14:30:00Z',
    updatedAt: '2026-02-24T16:10:00Z',
    pinned: true,
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Does Section 4 of `Investment_Agreement_2026.pdf` violate FINRA Rule 2210 regarding promotional representations?',
        timestamp: '2026-02-24T14:30:00Z',
        attachments: [
          {
            id: 'att-1',
            name: 'Investment_Agreement_2026.pdf',
            size: 2458000,
            extension: 'pdf',
            sourceDocId: 'doc-1',
          },
        ],
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `### 🚨 Compliance Violation Analysis: Section 4

Yes, Section 4 contains a **Critical regulatory violation** under [FINRA-2210] and [DISC-09].

#### Identified Non-Compliant Language:
> *"The Fund guarantees a minimum baseline net yield of 12.5% annualized return regardless of underlying equity market fluctuations. Downside risk mitigation contracts ensure that capital preservation remains absolute under standard macroeconomic stress testing."*

#### Regulatory Findings:
1. **Promissory Yield Guarantee ([FINRA-2210]):**
   FINRA Rule 2210(d)(1)(D) explicitly prohibits promises of specific performance or guarantees of success in customer-facing and LP documentation. No contractual derivative can guarantee absolute capital preservation in private mezzanine credit.

2. **Omission of Risk & Net Fee Reconciliation ([DISC-09]):**
   Section 5 calculates fees without separate gross-to-net reconciliation, directly infringing SEC Marketing Rule disclosures.

#### Recommended Remediation:
\`\`\`diff
- The Fund guarantees a minimum baseline net yield of 12.5% annualized return regardless of underlying equity market fluctuations.
+ The Fund targets an annualized net yield of 12.5%. Target returns are hypothetical, not guaranteed, and past performance is no guarantee of future results. Capital is subject to substantial risk of loss.
\`\`\`

You can inspect the full rule policy node in the **Visual Tree Editor** under node \`FINRA-2210 § 4\`.`,
        timestamp: '2026-02-24T14:30:04Z',
        citations: [regulatoryCitations['FINRA-2210'], regulatoryCitations['DISC-09']],
        feedback: 'like',
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'SEC 17a-4 Storage Media Inquiries',
    createdAt: '2026-02-20T10:00:00Z',
    updatedAt: '2026-02-20T10:15:00Z',
    pinned: false,
    messages: [
      {
        id: 'msg-3',
        role: 'user',
        content: 'How long must electronic records and client chat logs be retained according to SEC 17a-4?',
        timestamp: '2026-02-20T10:00:00Z',
      },
      {
        id: 'msg-4',
        role: 'assistant',
        content: `Under [SEC-17a-4], all member firms and registered investment advisers must abide by a two-tiered retention requirement:

1. **Immediate Accessibility:** Records must be maintained in an easily accessible place for the first **two (2) years**.
2. **Total Preservation:** Mandatory retention continues for at least **six (6) years** total.
3. **Immutable Formatting:** All communications must be mirrored to write-once-read-many (WORM) storage with cryptographic integrity seals.`,
        timestamp: '2026-02-20T10:00:03Z',
        citations: [regulatoryCitations['SEC-17a-4']],
        feedback: null,
      },
    ],
  },
];

