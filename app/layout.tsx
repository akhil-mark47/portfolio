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

// import './globals.css';
// import type { Metadata } from 'next';
// import { Space_Grotesk } from 'next/font/google';

// const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Portfolio | Akhilvarsh Pettem',
//   description: 'A creative developer portfolio showcasing innovative digital experiences',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={spaceGrotesk.className}>
//         <div id="custom-cursor" className="custom-cursor fixed pointer-events-none" />
//         {children}
//       </body>
//     </html>
//   );
// }