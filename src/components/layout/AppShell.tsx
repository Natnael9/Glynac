'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderLock,
  MessageSquareCode,
  Network,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Database,
  Terminal,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Professional enterprise navigation — unified single product architecture
  const navigation = [
    {
      name: 'Data Room',
      href: '/vdr',
      icon: FolderLock,
      badge: '4 Docs',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance Chat',
      href: '/chat',
      icon: MessageSquareCode,
      badge: 'Online',
      current: pathname === '/chat',
    },
    {
      name: 'Policy DAG Editor',
      href: '/tree',
      icon: Network,
      badge: '7 Rules',
      current: pathname === '/tree',
    },
    {
      name: 'Administration',
      href: '/admin',
      icon: ShieldCheck,
      badge: 'RBAC',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0c0d0e] text-[#f0f1f3] overflow-hidden select-none font-mono text-[11px]">
      {/* Production Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-[#1f2126] bg-[#08090a] shrink-0">
        {/* Brand System Header */}
        <div className="h-12 px-3.5 flex items-center justify-between border-b border-[#1f2126]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider text-xs">GLYNAC</span>
            <span className="text-[#f59e0b] font-bold">/</span>
            <span className="text-[#737887] text-[10px]">ENTERPRISE</span>
          </div>
          <span className="text-[9px] px-1.5 py-0.2 bg-[#17181c] border border-[#272a33] text-[#10b981] font-semibold">
            LIVE
          </span>
        </div>

        {/* Navigation Sidebar */}
        <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          <div className="px-2 pb-1.5 text-[9px] uppercase tracking-wider text-[#525766]">
            Workspace
          </div>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-2.5 py-2 transition-colors ${
                  item.current
                    ? 'bg-[#17181c] text-[#f59e0b] font-bold border-l-2 border-[#f59e0b]'
                    : 'text-[#737887] hover:text-[#f0f1f3] hover:bg-[#111214] border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="tracking-tight">{item.name}</span>
                </div>
                <span className="text-[9px] text-[#525766]">{item.badge}</span>
              </Link>
            );
          })}
        </div>

        {/* Authenticated User Profile */}
        <div className="p-3 border-t border-[#1f2126] bg-[#08090a]">
          <div className="text-[9px] text-[#525766] uppercase mb-0.5">Signed In As</div>
          <div className="font-semibold text-white truncate text-[11px]">Natnael Ashenafi</div>
          <div className="text-[#f59e0b] text-[10px] mt-0.5">Compliance Director</div>
        </div>
      </aside>

      {/* Main Production Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Header Bar */}
        <header className="h-12 border-b border-[#1f2126] bg-[#08090a] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-[11px]">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#737887] hover:text-white mr-1"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="text-[#525766]">WORKSPACE</span>
            <ChevronRight className="h-3 w-3 text-[#333742]" />
            <span className="text-white font-medium">
              {pathname === '/vdr' || pathname === '/'
                ? 'Virtual Data Room'
                : pathname === '/chat'
                ? 'Compliance AI Chat'
                : pathname === '/tree'
                ? 'Policy DAG Editor'
                : 'Enterprise Admin'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-[#737887] hidden sm:inline">
              LEDGER: <span className="text-[#10b981] font-bold">WORM_IMMUTABLE</span>
            </span>
            <span className="text-[#737887]">
              GOVERNANCE: <span className="text-white">FINRA / SEC</span>
            </span>
          </div>
        </header>

        {/* Mobile Navigation */}
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
                <span>{item.badge}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Active Page View */}
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
