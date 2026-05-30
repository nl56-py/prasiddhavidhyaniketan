import './globals.css';
import { LanguageProvider } from '@/lib/language-context';
import { AuthProvider } from '@/lib/auth-context';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Prasiddha Vidhya Niketan | Value-Based School in Joshipur',
  description: 'Prasiddha Vidhya Niketan is a trusted school in Joshipur offering quality, practical, Montessori-based, and value-based education from Nursery to Grade 8.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <ClientLayout>{children}</ClientLayout>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
