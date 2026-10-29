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
      task: 'Task 1',
      badge: '4 Docs',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance AI Chat',
      href: '/chat',
      icon: MessageSquareCode,
      task: 'Task 2',
      badge: 'Streaming',
      current: pathname === '/chat',
    },
    {
      name: 'Visual Tree Editor',
      href: '/tree',
      icon: Network,
      task: 'Task 4',
      badge: 'DAG Canvas',
      current: pathname === '/tree',
    },
    {
      name: 'Enterprise Admin',
      href: '/admin',
      icon: ShieldAlert,
      task: 'Task 3',
      badge: 'RBAC',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-xl select-none">
        {/* Brand Header */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
              <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                GLYNAC
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                  SEC-FINRA
                </span>
              </span>
              <p className="text-[11px] text-slate-400 leading-none">Wealth & Compliance</p>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            Core Platform Modules
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.current
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-900 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[13px]">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.task}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                    item.current
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {item.badge}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Current Active User Info */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/30">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md">
                NA
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Natnael Ashenafi</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block"></span>
                Compliance Officer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Glynac OS</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-blue-400 font-medium">
                {pathname === '/vdr' || pathname === '/'
                  ? 'Virtual Data Room (Task 1)'
                  : pathname === '/chat'
                  ? 'Compliance AI Chat (Task 2)'
                  : pathname === '/tree'
                  ? 'Visual Tree Editor (Task 4)'
                  : 'Enterprise Admin (Task 3)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SEC Rule 17a-4 Compliant WORM
            </div>
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <button
              title="System Alerts"
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500" />
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
                  item.current ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400'
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

