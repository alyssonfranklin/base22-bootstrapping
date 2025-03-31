import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import MainNavigation from '@/components/layout/MainNavigation';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Organization Portal',
  description: 'Horizontal portal intranet for our organization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container">
          <Header />
          <div className="main-content-wrapper">
            <MainNavigation />
            <main className="content-area">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
