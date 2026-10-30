import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { VDRProvider } from '@/lib/vdrContext';
import { ChatProvider } from '@/lib/chatContext';
import { AdminProvider } from '@/lib/adminContext';

export const metadata: Metadata = {
  title: 'GLYNAC | Wealth Management & Institutional Compliance OS',
  description:
    'Tier-1 Private Wealth Management & Regulatory Compliance Terminal. SEC, FINRA, SEA Rule 17a-4 WORM storage.',
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07090e] text-[#f4f4f7] selection:bg-[#d4af37]/30 selection:text-[#fae596]">
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
