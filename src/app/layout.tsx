import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/layout/AppShell';
import { VDRProvider } from '@/lib/vdrContext';

export const metadata: Metadata = {
  title: 'Glynac Wealth Management & Compliance Platform',
  description:
    'Enterprise Frontend System: Virtual Data Room, Real-Time Compliance AI Chat, Visual Tree DAG Editor, and Admin RBAC Dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        <VDRProvider>
          <AppShell>{children}</AppShell>
        </VDRProvider>
      </body>
    </html>
  );
}

