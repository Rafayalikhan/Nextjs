// pages/auth/linkedin/callback.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LinkedInCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('user');

    if (token && userId) {
      // ✅ Store token securely
      Cookies.set('token', token, { expires: 7, secure: true });

      // ✅ Redirect to home/feed
      router.push('/feed/home');
    } else {
      // Handle error
      router.push('/auth/sign-in');
    }
  }, [router]);

  return <p>Redirecting...</p>;
};

export default LinkedInCallback;