'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/themeContext';
import {
  FolderLock,
  MessageSquare,
  Network,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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
    <div className="flex h-screen w-full bg-[#000000] text-[#ededed] overflow-hidden select-none font-sans text-xs">
      {/* Retractable Sidebar - Pure Stark Monochrome Dark */}
      <aside
        className={`hidden md:flex flex-col bg-[#050505] text-[#a1a1a1] border-r border-[#1a1a1a] transition-all duration-150 shrink-0 select-none ${
          isCollapsed ? 'w-14' : 'w-56'
        }`}
      >
        {/* Brand & Toggle Bar */}
        <div className="h-12 px-3 flex items-center justify-between border-b border-[#1a1a1a]">
          {!isCollapsed && (
            <span className="font-semibold text-white tracking-tight text-xs">
              Glynac
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-[#777777] hover:text-white hover:bg-[#141414] transition-colors ml-auto cursor-pointer"
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
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded transition-colors ${
                  item.current
                    ? 'bg-[#141414] text-white font-medium border border-[#262626]'
                    : 'text-[#888888] hover:text-[#ededed] hover:bg-[#0d0d0d]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer: Theme Switcher & User Card */}
        <div className="p-2.5 border-t border-[#1a1a1a] bg-[#050505] space-y-2">
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-full flex items-center gap-2 p-1.5 rounded text-[11px] font-medium text-[#888888] hover:text-white hover:bg-[#141414] transition-colors cursor-pointer border border-[#1a1a1a] ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-[#888888]" />
              )}
              {!isCollapsed && <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>}
            </div>
            {!isCollapsed && (
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#0a0a0a] border border-[#1a1a1a] text-[#888888] font-mono">
                {theme}
              </span>
            )}
          </button>

          {/* User profile */}
          {!isCollapsed ? (
            <div className="px-1 text-[11px]">
              <p className="font-medium text-white truncate">Natnael Ashenafi</p>
              <p className="text-[#666666] text-[10px] truncate">Compliance Officer</p>
            </div>
          ) : (
            <div className="h-7 w-7 mx-auto rounded bg-[#141414] text-white border border-[#262626] flex items-center justify-center font-bold text-[10px]">
              NA
            </div>
          )}
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#000000]">
        {/* Top Header */}
        <header className="h-12 border-b border-[#1a1a1a] bg-[#050505] px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-1 rounded text-[#888888] hover:text-white cursor-pointer"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="text-[#666666]">Platform</span>
            <span className="text-[#333333]">/</span>
            <span className="text-white font-medium">
              {pathname === '/vdr' || pathname === '/'
                ? 'Virtual Data Room'
                : pathname === '/chat'
                ? 'Compliance Chat'
                : pathname === '/tree'
                ? 'Policy Graph'
                : 'Administration'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="md:hidden p-1 rounded text-[#888888] hover:text-white cursor-pointer"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <span className="text-[11px] text-[#666666] font-mono">
              SEC 17a-4
            </span>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileOpen && (
          <div className="md:hidden border-b border-[#1a1a1a] bg-[#050505] text-white p-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded text-xs ${
                  item.current ? 'bg-[#141414] text-white' : 'text-[#888888]'
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
