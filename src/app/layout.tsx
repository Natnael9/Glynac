import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { VDRProvider } from '@/lib/vdrContext';
import { ChatProvider } from '@/lib/chatContext';
import { AdminProvider } from '@/lib/adminContext';

export const metadata: Metadata = {
  title: 'GLYNAC / COMPLIANCE SYSTEM',
  description: 'Enterprise compliance audit terminal and policy editor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0c0d0e] text-[#f0f1f3] selection:bg-[#f59e0b] selection:text-black">
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
