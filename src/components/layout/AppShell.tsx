'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Folder,
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
      icon: Folder,
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
    <div className="flex h-screen w-full bg-[#000000] text-[#ededed] overflow-hidden select-none font-sans text-xs">
      {/* Retractable Desktop Sidebar - Pure Neutral Monochrome */}
      <aside
        className={`hidden md:flex flex-col bg-[#050505] text-[#a1a1a1] border-r border-[#1c1c1c] transition-all duration-150 shrink-0 select-none ${
          isCollapsed ? 'w-14' : 'w-56'
        }`}
      >
        {/* Brand & Toggle Bar */}
        <div className="h-12 px-3.5 flex items-center justify-between border-b border-[#1c1c1c]">
          {!isCollapsed && (
            <span className="font-semibold text-white tracking-tight text-xs">
              Glynac
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-[#737373] hover:text-white hover:bg-[#171717] transition-colors ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-3.5 w-3.5" />
            ) : (
              <PanelLeftClose className="h-3.5 w-3.5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-colors ${
                  item.current
                    ? 'bg-[#1c1c1c] text-white font-medium'
                    : 'text-[#8a8a8a] hover:text-[#ededed] hover:bg-[#121212]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-3 border-t border-[#1c1c1c]">
          {!isCollapsed ? (
            <div className="px-1 text-xs">
              <p className="font-medium text-[#ededed] truncate">Natnael Ashenafi</p>
              <p className="text-[#666666] text-[11px] truncate">Compliance Officer</p>
            </div>
          ) : (
            <div className="h-7 w-7 mx-auto rounded bg-[#171717] border border-[#262626] text-[#ededed] flex items-center justify-center font-semibold text-[10px]">
              NA
            </div>
          )}
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#000000]">
        {/* Top Header */}
        <header className="h-12 border-b border-[#1c1c1c] bg-[#050505] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-1 rounded text-[#737373] hover:text-white hover:bg-[#171717]"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="font-medium text-[#ededed] text-xs">
              {pathname === '/vdr' || pathname === '/'
                ? 'Virtual Data Room'
                : pathname === '/chat'
                ? 'Compliance Chat'
                : pathname === '/tree'
                ? 'Policy Graph'
                : 'Administration'}
            </span>
          </div>

          <div className="text-[11px] text-[#525252] font-mono">
            SEC 17a-4
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileOpen && (
          <div className="md:hidden border-b border-[#1c1c1c] bg-[#050505] text-[#ededed] p-2 space-y-0.5">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-xs ${
                  item.current ? 'bg-[#1c1c1c] text-white' : 'text-[#8a8a8a]'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Content View */}
        <main className="flex-1 overflow-hidden relative bg-[#000000]">{children}</main>
      </div>
    </div>
  );
}
