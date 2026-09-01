import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Harry Bui',
  description:
    'Personal engineering portfolio of Harry Bui — digital design and verification engineer working with Verilog RTL, SystemVerilog verification, FPGA systems, and ASIC flows.',
  openGraph: {
    title: 'Harry Bui',
    description: 'Digital design, RTL, and SystemVerilog verification portfolio of Harry Bui',
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
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        {/* Main content grows to fill available vertical space */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
