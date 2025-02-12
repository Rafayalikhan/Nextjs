'use client';

import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import NextTopLoader from 'nextjs-toploader';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { DEFAULT_PAGE_TITLE } from '@/context/constants';
import logo from '@/assets/images/logo.8a0c9e8f.png';
import '@/assets/scss/style.scss';

const AppProvidersWrapper = dynamic(() => import('@/components/wrappers/AppProvidersWrapper'));
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap'
});



const RootLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && window.location.pathname === '/auth/login') {
      router.push('/feed/home'); // Redirect if already logged in
    }
  }, [router]);

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <NextTopLoader color="#1c84ee" showSpinner={false} />
        <div id="__next_splash">
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
