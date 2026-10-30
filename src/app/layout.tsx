import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { VDRProvider } from '@/lib/vdrContext';
import { ChatProvider } from '@/lib/chatContext';
import { AdminProvider } from '@/lib/adminContext';

export const metadata: Metadata = {
  title: 'Glynac — Financial Compliance Platform',
  description: 'Enterprise Virtual Data Room and Regulatory Compliance Suite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] font-sans">
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
