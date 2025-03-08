import type { Metadata } from 'next';
import './globals.css';
import CosmicCursor from './components/CosmicCursor';

export const metadata: Metadata = {
  title: 'AK\'s Galaxy',
  description: 'A cosmic journey through my skills and projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CosmicCursor />
        {children}
      </body>
    </html>
  );
}
