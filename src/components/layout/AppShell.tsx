'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, X } from 'lucide-react';

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
      task: 'Task 1',
      current: pathname === '/vdr' || pathname === '/',
    },
    {
      name: 'Compliance Chat',
      href: '/chat',
      task: 'Task 2',
      current: pathname === '/chat',
    },
    {
      name: 'Tree Editor',
      href: '/tree',
      task: 'Task 4',
      current: pathname === '/tree',
    },
    {
      name: 'Admin Panel',
      href: '/admin',
      task: 'Task 3',
      current: pathname === '/admin',
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#090a0f] text-[#ededed] overflow-hidden select-none font-sans text-xs">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-56 border-r border-[#1e222d] bg-[#0c0e14] select-none shrink-0">
        {/* Brand Header — Simple clean typographic mark, no crown/logo/glow */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#1e222d]">
          <span className="font-semibold text-sm tracking-tight text-white">
            Glynac
          </span>
          <span className="text-[10px] text-[#555c6b] font-mono">v1.0</span>
        </div>

        {/* Navigation List — Clean text links */}
        <div className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                item.current
                  ? 'bg-[#181b24] text-white font-medium'
                  : 'text-[#8b92a0] hover:text-[#ededed] hover:bg-[#12151c]'
              }`}
            >
              <span>{item.name}</span>
              <span className="text-[10px] text-[#555c6b] font-mono">{item.task}</span>
            </Link>
          ))}
        </div>

        {/* User Info — Clean simple metadata */}
        <div className="p-3 border-t border-[#1e222d]">
          <div className="flex items-center justify-between text-[11px]">
            <div className="truncate">
              <p className="font-medium text-[#ededed] truncate">Natnael Ashenafi</p>
              <p className="text-[#8b92a0] text-[10px]">Compliance Officer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header — Minimalist clean path bar */}
        <header className="h-14 border-b border-[#1e222d] bg-[#0c0e14] px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded text-[#8b92a0] hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <span className="text-[#8b92a0]">Platform</span>
            <ChevronRight className="h-3 w-3 text-[#555c6b]" />
            <span className="text-white font-medium">
              {pathname === '/vdr' || pathname === '/'
                ? 'Virtual Data Room'
                : pathname === '/chat'
                ? 'Compliance Chat'
                : pathname === '/tree'
                ? 'Visual Tree Editor'
                : 'Admin Panel'}
            </span>
          </div>

          <div className="text-[11px] text-[#8b92a0] font-mono">
            SEC 17a-4 Active
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-[#1e222d] bg-[#0c0e14] p-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2 rounded text-xs ${
                  item.current ? 'bg-[#181b24] text-white' : 'text-[#8b92a0]'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[10px] text-[#555c6b]">{item.task}</span>
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
