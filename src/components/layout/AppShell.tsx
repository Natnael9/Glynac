'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      code: '01',
      name: 'VDR_REPO',
      href: '/vdr',
      meta: 'DOCS:4',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      code: '02',
      name: 'AI_CHAT',
      href: '/chat',
      meta: 'FINRA',
      current: pathname === '/chat',
    },
    {
      code: '03',
      name: 'TREE_DAG',
      href: '/tree',
      meta: 'RULES:7',
      current: pathname === '/tree',
    },
    {
      code: '04',
      name: 'ADMIN_RBAC',
      href: '/admin',
      meta: 'LVL:4',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0c0d0e] text-[#f0f1f3] overflow-hidden select-none font-mono text-[11px]">
      {/* Sidebar - Sharp, dense, utilitarian */}
      <aside className="hidden md:flex flex-col w-52 border-r border-[#1f2126] bg-[#08090a] shrink-0">
        {/* Terminal Header */}
        <div className="h-12 px-3 flex items-center justify-between border-b border-[#1f2126]">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white">GLYNAC</span>
            <span className="text-[#f59e0b] font-bold">/</span>
            <span className="text-[#737887]">SYS</span>
          </div>
          <span className="text-[10px] text-[#737887]">REV.26</span>
        </div>

        {/* Navigation - Raw, no bubbles */}
        <div className="flex-1 py-2 divide-y divide-[#1f2126]/40">
          <div className="px-3 py-1.5 text-[9px] uppercase tracking-wider text-[#737887]">
            [ MODULE_ROUTER ]
          </div>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 transition-colors ${
                item.current
                  ? 'bg-[#17181c] text-[#f59e0b] font-bold border-l-2 border-[#f59e0b]'
                  : 'text-[#737887] hover:text-[#f0f1f3] hover:bg-[#111214] border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#525766]">{item.code}</span>
                <span>{item.name}</span>
              </div>
              <span className="text-[9px] text-[#525766]">{item.meta}</span>
            </Link>
          ))}
        </div>

        {/* Operator Info - High density */}
        <div className="p-3 border-t border-[#1f2126] bg-[#08090a]">
          <div className="text-[9px] text-[#737887] mb-1">OPERATOR_ID</div>
          <div className="font-semibold text-white truncate">NATNAEL_ASHENAFI</div>
          <div className="text-[#f59e0b] text-[10px] mt-0.5">ROLE: COMPLIANCE_DIR</div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-12 border-b border-[#1f2126] bg-[#08090a] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#737887] hover:text-white"
            >
              [MENU]
            </button>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#737887]">PATH:</span>
              <span className="text-white">
                {pathname === '/vdr' || pathname === '/'
                  ? '/VDR/CONFIDENTIAL_ROOT'
                  : pathname === '/chat'
                  ? '/AI/FINRA_ANALYZER'
                  : pathname === '/tree'
                  ? '/POLICY/DAG_BUILDER'
                  : '/ADMIN/RBAC_MATRIX'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-[#737887]">
              WORM_STATUS: <span className="text-[#10b981] font-bold">LOCKED</span>
            </span>
            <span className="text-[#737887]">
              AUDIT: <span className="text-white">SEA_17A4</span>
            </span>
          </div>
        </header>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#1f2126] bg-[#08090a] p-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2 text-[11px] ${
                  item.current ? 'bg-[#17181c] text-[#f59e0b]' : 'text-[#737887]'
                }`}
              >
                <span>{item.name}</span>
                <span>{item.meta}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Main Work Area */}
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
