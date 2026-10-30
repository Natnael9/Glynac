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
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  User,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Command,
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
      badge: 'Active WORM',
      accent: 'from-blue-500 to-indigo-500',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance AI Chat',
      href: '/chat',
      icon: MessageSquareCode,
      task: 'FE-2',
      badge: 'Streaming',
      accent: 'from-indigo-500 to-violet-500',
      current: pathname === '/chat',
    },
    {
      name: 'Visual Tree Editor',
      href: '/tree',
      icon: Network,
      task: 'FE-4',
      badge: 'DAG Canvas',
      accent: 'from-violet-500 to-purple-500',
      current: pathname === '/tree',
    },
    {
      name: 'Enterprise Admin',
      href: '/admin',
      icon: ShieldAlert,
      task: 'FE-3',
      badge: 'RBAC L4',
      accent: 'from-cyan-500 to-blue-500',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#060911] text-slate-100 overflow-hidden font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/60 bg-[#090d16]/90 backdrop-blur-2xl select-none relative z-20">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/60 bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-blue-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-[#060911] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-white">GLYNAC</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-bold uppercase tracking-wider">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">SEC • FINRA Compliance</p>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 flex items-center justify-between">
            <span>Modules</span>
            <span className="text-[9px] text-indigo-400 font-mono">4 Unified</span>
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative ${
                  item.current
                    ? 'bg-gradient-to-r from-indigo-600/15 via-blue-600/10 to-transparent text-white border-l-2 border-indigo-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-indigo-500/20 text-indigo-300 shadow-sm shadow-indigo-500/20'
                        : 'bg-slate-900/70 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold tracking-tight">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.task}</div>
                  </div>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-md font-mono transition-colors ${
                    item.current
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800/60'
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Current Active User Info */}
        <div className="p-3 border-t border-slate-800/60 bg-slate-950/40">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/50 border border-slate-800/60">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                NA
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Natnael Ashenafi</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Compliance Officer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/60 bg-[#090d16]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-bold text-slate-300">Glynac Terminal</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-indigo-400 font-semibold">
                {pathname === '/vdr' || pathname === '/'
                  ? 'Virtual Data Room (FE-1)'
                  : pathname === '/chat'
                  ? 'Compliance AI Chat (FE-2)'
                  : pathname === '/tree'
                  ? 'Visual Tree Editor (FE-4)'
                  : 'Enterprise Admin Panel (FE-3)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-semibold shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SEA Rule 17a-4 Optical WORM
            </div>
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <button
              title="System Alerts"
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/80 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-slate-950" />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm ${
                  item.current ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-xs bg-slate-900 px-2 py-0.5 rounded text-slate-400">{item.task}</span>
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
