'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FolderLock,
  MessageSquare,
  Network,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    {
      name: 'Data Room',
      href: '/vdr',
      icon: FolderLock,
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance Chat',
      href: '/chat',
      icon: MessageSquare,
      current: pathname === '/chat',
    },
    {
      name: 'Policy Graph',
      href: '/tree',
      icon: Network,
      current: pathname === '/tree',
    },
    {
      name: 'Administration',
      href: '/admin',
      icon: Shield,
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] text-[#0f172a] overflow-hidden select-none font-sans text-sm">
      {/* Retractable Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#0f172a] text-slate-300 border-r border-slate-800 transition-all duration-200 shrink-0 select-none ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {/* Brand & Toggle Bar */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-800">
          {!isCollapsed && (
            <span className="font-semibold text-white tracking-tight text-base">
              Glynac
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2.5 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  item.current
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-3 border-t border-slate-800">
          {!isCollapsed ? (
            <div className="px-1 text-xs">
              <p className="font-semibold text-white truncate">Natnael Ashenafi</p>
              <p className="text-slate-400 text-[11px] truncate">Compliance Officer</p>
            </div>
          ) : (
            <div className="h-8 w-8 mx-auto rounded-full bg-slate-800 text-slate-200 flex items-center justify-center font-bold text-xs">
              NA
            </div>
          )}
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Top Header */}
        <header className="h-14 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="font-semibold text-slate-900 text-sm">
              {pathname === '/vdr' || pathname === '/'
                ? 'Virtual Data Room'
                : pathname === '/chat'
                ? 'Compliance Chat'
                : pathname === '/tree'
                ? 'Policy Graph Editor'
                : 'System Administration'}
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            SEC & FINRA Audited
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileOpen && (
          <div className="md:hidden border-b border-slate-200 bg-[#0f172a] text-white p-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs ${
                  item.current ? 'bg-sky-600 text-white' : 'text-slate-400'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Content View */}
        <main className="flex-1 overflow-hidden relative bg-[#f8fafc]">{children}</main>
      </div>
    </div>
  );
}
