import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Harry Bui',
  description:
    'Personal engineering portfolio of Harry Bui — digital design and RTL engineer specializing in Verilog/VHDL, FPGA, and ASIC verification.',
  openGraph: {
    title: 'Harry Bui',
    description: 'Digital design & RTL engineering portfolio of Harry Bui',
    url: 'https://hieuhust123.github.io',
    siteName: 'Harry Bui',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Force dark mode globally by adding the 'dark' class on <html>
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {/* Main content grows to fill available vertical space */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
