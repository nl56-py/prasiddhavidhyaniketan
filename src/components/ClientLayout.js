'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NoticeBanner from '@/components/NoticeBanner';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <NoticeBanner />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
