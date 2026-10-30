import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { VDRProvider } from '@/lib/vdrContext';
import { ChatProvider } from '@/lib/chatContext';
import { AdminProvider } from '@/lib/adminContext';

export const metadata: Metadata = {
  title: 'Glynac — Compliance Platform',
  description: 'Virtual Data Room, Compliance AI, Policy Graphs, and Enterprise RBAC.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#090a0f] text-[#ededed] font-sans selection:bg-blue-600/30 selection:text-white">
        <VDRProvider>
          <ChatProvider>
            <AdminProvider>
              <AppShell>{children}</AppShell>
            </AdminProvider>
          </ChatProvider>
        </VDRProvider>
      </body>
    </html>
  );
}
