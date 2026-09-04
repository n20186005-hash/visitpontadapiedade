import './globals.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// A root layout is required to import the global stylesheet and to
// host the localized not-found boundary in src/app/[locale]/not-found.tsx.
export default function RootLayout({ children }: Props) {
  return children;
}
