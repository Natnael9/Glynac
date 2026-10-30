import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { ThemeProvider } from '@/lib/themeContext';
import { VDRProvider } from '@/lib/vdrContext';
import { ChatProvider } from '@/lib/chatContext';
import { AdminProvider } from '@/lib/adminContext';

export const metadata: Metadata = {
  title: 'Glynac — Compliance Platform',
  description: 'Enterprise Virtual Data Room and Regulatory Compliance Suite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#000000] text-[#ededed] font-sans selection:bg-white selection:text-black">
        <ThemeProvider>
          <VDRProvider>
            <ChatProvider>
              <AdminProvider>
                <AppShell>{children}</AppShell>
              </AdminProvider>
            </ChatProvider>
          </VDRProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
