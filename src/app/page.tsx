import { redirect } from 'next/navigation';

// Middleware normally intercepts `/` and redirects to the default locale (`/pt`).
// This page acts as a fallback so the root never shows a blank 404.
export default function RootPage() {
  redirect('/pt');
}