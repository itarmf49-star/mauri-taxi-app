import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './providers/LanguageProvider';

export const metadata: Metadata = {
  title: 'رحلتك معنا - لوحة التحكم',
  description: 'Mauritanian Taxi Admin Panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
