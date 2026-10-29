import { VDRDocument, VDRFolder, AuditEvent, UserRole } from '../types';

export const initialFolders: VDRFolder[] = [
  {
    id: 'folder-root',
    name: 'Compliance Data Room',
    parentId: null,
    createdAt: '2026-01-15T08:00:00Z',
    description: 'Root confidential repository for SEC/FINRA compliance materials',
  },
  {
    id: 'folder-agreements',
    name: 'Client Agreements & NDAs',
    parentId: 'folder-root',
    createdAt: '2026-01-18T10:30:00Z',
    description: 'Bilateral LP agreements, subscription docs, and mutual NDAs',
  },
  {
    id: 'folder-regulatory',
    name: 'Regulatory Disclosures',
    parentId: 'folder-root',
    createdAt: '2026-02-01T09:15:00Z',
    description: 'Form ADV, Form CRS, and FINRA communication reviews',
  },
  {
    id: 'folder-audits',
    name: '2026 Audit Working Papers',
    parentId: 'folder-root',
    createdAt: '2026-02-20T14:45:00Z',
    description: 'PwC / internal quarterly compliance testing workpapers',
  },
];

export const defaultPermissions = (sensitivity: string) => {
  const isRestricted = sensitivity === 'Restricted';
  const isConfidential = sensitivity === 'Confidential';

  return [
    { role: 'Admin' as UserRole, canView: true, canEdit: true, canShare: true, canDownload: true },
    { role: 'Compliance Officer' as UserRole, canView: true, canEdit: true, canShare: true, canDownload: true },
    { role: 'Auditor' as UserRole, canView: true, canEdit: false, canShare: false, canDownload: !isRestricted },
    { role: 'Advisor' as UserRole, canView: !isRestricted, canEdit: false, canShare: !isRestricted && !isConfidential, canDownload: false },
  ];
};

export const initialDocuments: VDRDocument[] = [
  {
    id: 'doc-1',
    name: 'Investment_Agreement_2026.pdf',
    folderId: 'folder-agreements',
    extension: 'pdf',
    sizeBytes: 2458000,
    createdAt: '2026-02-10T11:20:00Z',
    updatedAt: '2026-02-24T16:05:00Z',
    uploadedBy: 'Marcus Vance (Compliance Director)',
    sensitivity: 'Restricted',
    permissions: defaultPermissions('Restricted'),
    tags: ['FINRA-2210', 'High Yield', 'Q1-Review'],
    flaggedClauses: [
      {
        id: 'flag-1',
        ruleCode: 'FINRA-2210 § 4',
        severity: 'Critical',
        textSnippet: 'The Fund guarantees a minimum baseline net yield of 12.5% annualized return regardless of underlying equity market fluctuations.',
        reason: 'Promissory or exaggerated statements of guaranteed returns are strictly prohibited under FINRA Rule 2210 communications with the public.',
        suggestedRemedy: 'Replace with historical target yield disclaimer emphasizing that returns are not guaranteed and capital is subject to risk of loss.',
      },
      {
        id: 'flag-2',
        ruleCode: 'DISC-09 § 2',
        severity: 'High',
        textSnippet: 'Performance fee allocations shall be debited semi-annually without requirement for separate gross-of-fees audit reconciliation.',
        reason: 'SEC Marketing Rule IA-512 requires clear fee schedule itemization and net-of-fee comparative calculations.',
        suggestedRemedy: 'Include explicit breakdown of hurdle rate, high-water mark provisions, and net returns table.',
      },
    ],
    content: `# CONFIDENTIAL PRIVATE PLACEMENT MEMORANDUM & INVESTMENT AGREEMENT
Document Reference: GLY-2026-IPA-009
Effective Date: March 1, 2026
Jurisdiction: State of Delaware / SEC Reg D 506(c)

SECTION 1: RECITALS & FUND PURPOSE
This Master Investment Agreement ("Agreement") is entered into by and between Glynac Capital Management LP ("General Partner") and the qualifying institutional subscriber ("Limited Partner").

SECTION 2: CAPITAL CONTRIBUTION & ALLOCATION
The Limited Partner commits to an initial capital contribution of $5,000,000 USD payable upon drawdown notification. Capital calls will be structured across a 36-month investment horizon.

SECTION 3: PORTFOLIO TARGET ASSETS & RISK PROFILE
The Fund invests primarily in private mezzanine credit, structured real asset equity, and secondary venture debt. All positions are subject to strict liquidity covenants.

SECTION 4: RETURN TARGETS & PROMOTIONAL REPRESENTATIONS
[FLAGGED SECTION - FINRA-2210 § 4]
The Fund guarantees a minimum baseline net yield of 12.5% annualized return regardless of underlying equity market fluctuations. Downside risk mitigation contracts ensure that capital preservation remains absolute under standard macroeconomic stress testing.

SECTION 5: MANAGEMENT FEES & EXPENSES
[FLAGGED SECTION - DISC-09 § 2]
Management fee of 1.75% per annum shall be calculated on aggregate assets under management. Performance fee allocations shall be debited semi-annually without requirement for separate gross-of-fees audit reconciliation.

SECTION 6: REGULATORY COMPLIANCE & GOVERNING LAW
This agreement is subject to inspection by the Securities and Exchange Commission (SEC) and the Financial Industry Regulatory Authority (FINRA). All parties submit to confidential arbitration in New York, NY.`,
  },
  {
    id: 'doc-2',
    name: 'Form_ADV_Part2A_Firm_Brochure.md',
    folderId: 'folder-regulatory',
    extension: 'md',
    sizeBytes: 842000,
    createdAt: '2026-01-22T09:40:00Z',
    updatedAt: '2026-02-15T14:10:00Z',
    uploadedBy: 'Sarah Lin (Chief Compliance Officer)',
    sensitivity: 'Public',
    permissions: defaultPermissions('Public'),
    tags: ['SEC-17a-4', 'Annual Filing', 'ADV'],
    flaggedClauses: [],
    content: `# FORM ADV PART 2A - GLYNAC WEALTH ADVISORY
Item 1: Cover Page
Glynac Wealth Management LLC (CRD # 312984 / SEC # 801-99821)
500 Park Avenue, 18th Floor, New York, NY 10022

Item 4: Advisory Business
We provide discretionary investment supervisory services to high-net-worth individuals, pooled investment vehicles, and charitable institutions. As of December 31, 2025, our regulatory assets under management stood at $1,420,000,000.

Item 5: Fees and Compensation
Advisory fees range from 0.40% to 1.25% depending upon cumulative family assets under supervision. We do not participate in commission-sharing arrangements with broker-dealers.

Item 8: Methods of Analysis, Investment Strategies and Risk of Loss
Investing in securities involves risk of loss that clients should be prepared to bear. Diversification strategies cannot assure a profit or protect against loss in declining markets.`,
  },
  {
    id: 'doc-3',
    name: 'SEC_Rule_17a4_Retention_Policy.txt',
    folderId: 'folder-regulatory',
    extension: 'txt',
    sizeBytes: 312000,
    createdAt: '2026-02-05T13:15:00Z',
    updatedAt: '2026-02-18T10:00:00Z',
    uploadedBy: 'Sarah Lin (Chief Compliance Officer)',
    sensitivity: 'Internal Only',
    permissions: defaultPermissions('Internal Only'),
    tags: ['SEC-17a-4', 'Recordkeeping', 'WORM'],
    flaggedClauses: [],
    content: `POLICY MEMORANDUM: SEC RULE 17a-4 COMPLIANCE & ELECTRONIC STORAGE MEDIA (WORM)
Issued by: Office of the Chief Compliance Officer
Scope: All electronic communications, trade tickets, customer ledgers, and audit trails.

1. MANDATORY STORAGE DURATION
- Immediate accessibility for two (2) years.
- Easily accessible place for six (6) years total.

2. WRITE ONCE, READ MANY (WORM) STANDARDS
All communication archives (Slack, Teams, Email, Client Portals) must be replicated to immutable optical or cloud-based WORM media with write verification and cryptographic hash integrity locks.

3. INDEPENDENT THIRD-PARTY ACCESS ATTESTATION
Pursuant to SEA Rule 17a-4(f)(3)(vii), Glynac has executed an agreement with an independent 3rd-party vendor guaranteeing prompt access to regulatory examiners upon request.`,
  },
  {
    id: 'doc-4',
    name: 'Q4_2025_PwC_Audit_Exceptions.json',
    folderId: 'folder-audits',
    extension: 'json',
    sizeBytes: 154000,
    createdAt: '2026-02-12T17:30:00Z',
    updatedAt: '2026-02-20T11:45:00Z',
    uploadedBy: 'David Miller (Senior Auditor)',
    sensitivity: 'Confidential',
    permissions: defaultPermissions('Confidential'),
    tags: ['Audits', 'Exceptions', 'PwC'],
    flaggedClauses: [
      {
        id: 'flag-3',
        ruleCode: 'SEC-Rule-206(4)-2',
        severity: 'Medium',
        textSnippet: '"exception_type": "Surprise Exam Account Statement Reconciliation Delay"',
        reason: 'Three custodian statements were delivered with a 4-day lag exceeding the 30-day requirement.',
        suggestedRemedy: 'Automate custodian API ingestion with automated SLA breach notifications.',
      },
    ],
    content: `{
  "audit_period": "Q4-2025",
  "audit_firm": "PricewaterhouseCoopers LLP",
  "lead_partner": "Evelyn Reed, CPA",
  "engagement_scope": "Rule 206(4)-2 Custody Rule Compliance Review",
  "sampled_accounts": 142,
  "findings_summary": {
    "total_exceptions": 1,
    "severity_distribution": {
      "critical": 0,
      "high": 0,
      "medium": 1,
      "low": 0
    }
  },
  "exceptions": [
    {
      "exception_id": "EXC-2025-04",
      "exception_type": "Surprise Exam Account Statement Reconciliation Delay",
      "impacted_custodian": "BNY Mellon Pershing",
      "impacted_accounts": 3,
      "management_response": "Custodian transmission protocol updated to real-time webhook.",
      "remediation_status": "Remediated",
      "target_close_date": "2026-03-15"
    }
  ]
}`,
  },
];

export const initialAuditLogs: AuditEvent[] = [
  {
    id: 'audit-1',
    documentId: 'doc-1',
    action: 'Flagged',
    timestamp: '2026-02-24T16:05:00Z',
    userId: 'user-2',
    userName: 'Sarah Lin',
    userRole: 'Compliance Officer',
    details: 'Flagged 2 potential violations: FINRA-2210 § 4 (Guaranteed Yield) & DISC-09 § 2 (Fee Disclosure)',
  },
  {
    id: 'audit-2',
    documentId: 'doc-1',
    action: 'Permission Changed',
    timestamp: '2026-02-24T15:30:00Z',
    userId: 'user-1',
    userName: 'Marcus Vance',
    userRole: 'Admin',
    details: 'Elevated sensitivity level from Confidential to Restricted',
  },
  {
    id: 'audit-3',
    documentId: 'doc-1',
    action: 'Viewed',
    timestamp: '2026-02-24T14:12:00Z',
    userId: 'user-3',
    userName: 'David Miller',
    userRole: 'Auditor',
    details: 'Opened document in split previewer (Pages 1-6)',
  },
  {
    id: 'audit-4',
    documentId: 'doc-1',
    action: 'Downloaded',
    timestamp: '2026-02-20T10:18:00Z',
    userId: 'user-2',
    userName: 'Sarah Lin',
    userRole: 'Compliance Officer',
    details: 'Downloaded encrypted watermarked PDF copy',
  },
  {
    id: 'audit-5',
    documentId: 'doc-1',
    action: 'Uploaded',
    timestamp: '2026-02-10T11:20:00Z',
    userId: 'user-1',
    userName: 'Marcus Vance',
    userRole: 'Admin',
    details: 'Initial draft uploaded to Client Agreements & NDAs folder',
  },
  {
    id: 'audit-6',
    documentId: 'doc-4',
    action: 'Uploaded',
    timestamp: '2026-02-12T17:30:00Z',
    userId: 'user-3',
    userName: 'David Miller',
    userRole: 'Auditor',
    details: 'Uploaded PwC surprise examination findings JSON dataset',
  },
];

