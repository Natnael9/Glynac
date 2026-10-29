import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glynac Wealth Management & Compliance Platform",
  description: "Enterprise Frontend Platform for Virtual Data Rooms, Compliance Chat, System Administration, and Rule Trees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
