import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Chatbot from '@/components/ui/chatbot';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: 'Nodux',
  description: 'Nodux combina consultoría de operaciones, ingeniería de datos y automatización para transformar la gestión de inventarios y procesos en pequeñas y medianas empresas.',
  icons: {
    icon: '/images/all_in_dev_sol.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
