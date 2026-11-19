import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Shreejan AI Admin — Founders & Leadership Portal',
  description: 'Manage executive roster, transparent portraits, and signature assets.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body className="bg-[#07090F] text-white min-h-screen antialiased selection:bg-[#7C5CFC]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
