'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderLock,
  MessageSquareCode,
  Network,
  ShieldAlert,
  Search,
  Bell,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  Crown,
  Lock,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'Virtual Data Room',
      href: '/vdr',
      icon: FolderLock,
      task: 'FE-1',
      badge: 'Tier-1 WORM',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance AI Chat',
      href: '/chat',
      icon: MessageSquareCode,
      task: 'FE-2',
      badge: 'FINRA 2210',
      current: pathname === '/chat',
    },
    {
      name: 'Visual Tree Editor',
      href: '/tree',
      icon: Network,
      task: 'FE-4',
      badge: 'DAG Canvas',
      current: pathname === '/tree',
    },
    {
      name: 'Enterprise Admin',
      href: '/admin',
      icon: ShieldAlert,
      task: 'FE-3',
      badge: 'Governance',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#07090e] text-[#f4f4f7] overflow-hidden select-none font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[#d4af37]/15 bg-[#0b0e14]/90 backdrop-blur-2xl select-none relative z-20">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-[#d4af37]/15 bg-gradient-to-r from-[#0d111a] via-[#111722] to-[#0d111a]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#d4af37] via-[#f5deb3] to-[#997722] p-[1.5px] shadow-lg shadow-[#d4af37]/15">
              <div className="h-full w-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                <Crown className="h-4 w-4 text-[#d4af37]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-widest text-[#f5deb3]">
                  GLYNAC
                </span>
                <span className="text-[8px] px-1.5 py-0.2 rounded-md bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 font-bold uppercase tracking-widest">
                  PRIME
                </span>
              </div>
              <p className="text-[10px] text-[#8c909a] font-medium tracking-wide">Private Wealth & Compliance</p>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[9px] font-bold tracking-widest uppercase text-[#8c909a] flex items-center justify-between">
            <span>Terminal Modules</span>
            <span className="text-[9px] text-[#d4af37] font-mono">2026 Edition</span>
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 relative ${
                  item.current
                    ? 'bg-gradient-to-r from-[#d4af37]/15 via-[#d4af37]/5 to-transparent text-[#fae596] border-l-2 border-[#d4af37] shadow-sm'
                    : 'text-[#8c909a] hover:text-[#f4f4f7] hover:bg-[#121722]/50 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-[#d4af37]/20 text-[#f5deb3] shadow-sm shadow-[#d4af37]/20'
                        : 'bg-[#121722] text-[#8c909a] group-hover:text-[#f4f4f7] group-hover:bg-[#19202f]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold tracking-tight">{item.name}</div>
                    <div className="text-[10px] text-[#8c909a] font-mono">{item.task}</div>
                  </div>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                    item.current
                      ? 'bg-[#d4af37]/20 text-[#fae596] border border-[#d4af37]/40 font-semibold'
                      : 'bg-[#121722] text-[#8c909a] border border-white/5'
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Current Active User Info */}
        <div className="p-3 border-t border-[#d4af37]/15 bg-[#0b0e14]/60">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#121722]/60 border border-white/5">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#aa820a] flex items-center justify-center font-bold text-[#07090e] text-xs shadow-md">
                NA
              </div>
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#07090e]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#f4f4f7] truncate">Natnael Ashenafi</p>
              <p className="text-[10px] text-[#d4af37] flex items-center gap-1 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] inline-block animate-pulse"></span>
                Chief Compliance Officer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-[#d4af37]/15 bg-[#0b0e14]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#121722] text-[#8c909a] hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2 text-xs text-[#8c909a]">
              <span className="font-display font-semibold tracking-wider text-[#d4af37]">GLYNAC PRIVATE TERMINAL</span>
              <ChevronRight className="h-3.5 w-3.5 text-white/20" />
              <span className="text-[#f4f4f7] font-medium">
                {pathname === '/vdr' || pathname === '/'
                  ? 'Virtual Data Room (FE-1)'
                  : pathname === '/chat'
                  ? 'Compliance AI Chat (FE-2)'
                  : pathname === '/tree'
                  ? 'Visual Tree DAG Editor (FE-4)'
                  : 'Enterprise Admin (FE-3)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[11px] text-[#fae596] font-semibold shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              SEC & SEA Rule 17a-4 Certified WORM
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
            <button
              title="Notifications"
              className="relative p-2 rounded-xl text-[#8c909a] hover:text-white hover:bg-[#121722] transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#d4af37]" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#d4af37]/20 bg-[#07090e] p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm ${
                  item.current ? 'bg-[#d4af37]/20 text-[#f5deb3]' : 'text-[#8c909a]'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-xs bg-[#121722] px-2 py-0.5 rounded text-[#8c909a]">{item.task}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
