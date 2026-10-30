# Glynac Wealth Management & Compliance Platform

An enterprise-grade frontend system for financial compliance, document governance, and policy graph modeling built with **Next.js (App Router)**, **TypeScript**, and **TailwindCSS**.

Developed by **Natnael Ashenafi** (`ashenafinatnael9@gmail.com`).

---

## 🌟 Executive System Overview

The platform addresses regulatory compliance workflows under SEC & FINRA rules (including **FINRA Rule 2210**, **SEC Marketing Rule DISC-09**, and **SEA Rule 17a-4 WORM storage**) across four deeply integrated modules:

1. **Virtual Data Room (VDR) (`/vdr`)** — Hierarchical document explorer, split-screen previewer with highlighted compliance violations, granular RBAC sensitivity tagging, and a sliding WORM activity audit log drawer.
2. **Real-Time Compliance Chat & AI Assistant (`/chat`)** — Conversational compliance reasoning engine with typewriter-style streaming responses, markdown and diff blocks, clickable regulatory citation popovers, and direct file attachment from the VDR.
3. **Interactive Visual Tree & DAG Editor (`/tree`)** — Canvas-based rule policy hierarchy editor with pan, zoom, draggable node palette, real-time properties inspector, automatic hierarchical layout, graph cycle validation, and schema JSON import/export.
4. **Enterprise Admin Panel (`/admin`)** — Central governance suite featuring Recharts analytics dashboards, searchable RBAC user management with granular module permissions, active compliance rule policy manager, and real-time feature flag toggles.

---

## 🔄 End-to-End User Story Walkthrough

The platform demonstrates the complete cross-module compliance lifecycle:

```
[ Virtual Data Room (/vdr) ]
  └── Compliance Officer opens `Investment_Agreement_2026.pdf`
  └── Observes highlighted violation: FINRA-2210 § 4 (Guaranteed yield clause)
  └── Inspects immutable WORM audit logs and elevates sensitivity to Restricted
       │
       ▼
[ AI Compliance Chat (/chat) ]
  └── Attaches `Investment_Agreement_2026.pdf` directly into the chat prompt
  └── Asks: "Does Section 4 violate FINRA Rule 2210 promissory restrictions?"
  └── Assistant streams analysis with clickable [FINRA-2210] & [DISC-09] citation popovers
  └── Generates remediation diff proposal to replace guarantee with target yield disclaimer
       │
       ▼
[ Visual Tree Editor (/tree) ]
  └── Navigates to `/tree` to inspect rule node `FINRA-2210`
  └── Connects a new evaluation Condition node `DISC-09` using directional handles
  └── Edits severity to "Critical" in the properties inspector panel
  └── Validates DAG for cycles/orphans and exports structured workflow JSON
       │
       ▼
[ Enterprise Admin Panel (/admin) ]
  └── Reviews executive review throughput and violation severity charts
  └── Updates Officer and Auditor permissions in the RBAC personnel table
  └── Enforces or disables compliance rule policies
  └── Toggles `ENABLE_AI_SUBSTRING_VALIDATION` and inspects real-time latency
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd SpringerCpital

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🏗️ Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** TailwindCSS v4
- **Interactive Graph Canvas:** `@xyflow/react`
- **Analytics & Charts:** `recharts`
- **Iconography:** `lucide-react`
- **Architecture:** Context Providers (`VDRProvider`, `ChatProvider`, `AdminProvider`) with shared mock fixtures.

---

## 👨‍💻 Author

**Natnael Ashenafi**  
Email: [ashenafinatnael9@gmail.com](mailto:ashenafinatnael9@gmail.com)  
Role: Compliance Officer / Frontend Systems Architect
