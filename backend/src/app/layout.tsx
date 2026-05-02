import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Payvora API',
  description: 'Invoice Management System Backend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
