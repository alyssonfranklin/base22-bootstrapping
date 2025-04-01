import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import MainNavigation from '@/components/layout/MainNavigation';
import MobileNavigation from '@/components/layout/MobileNavigation';
import Footer from '@/components/layout/Footer';
import { NavigationProvider } from '@/lib/context/NavigationContext';
import { DataProvider, DataErrorBoundary } from '@/lib/context/DataContext';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HRX Portal | North America',
  description: 'Horizontal intranet portal for HRX North America',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationProvider>
          <DataProvider>
            <DataErrorBoundary>
              <div className="app-container">
                <Header />
                <div className="main-content-wrapper">
                  <MainNavigation />
                  <main className="content-area">{children}</main>
                </div>
                <Footer />
                <MobileNavigation />
              </div>
            </DataErrorBoundary>
          </DataProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}