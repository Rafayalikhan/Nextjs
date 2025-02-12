'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LinkedInCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userId = searchParams.get('user');

    if (token) {
      // ✅ Store token securely
      Cookies.set('token', token, { expires: 7, secure: true });

      // ✅ Redirect to home
      router.push('/feed/home');
    } else {
      router.push('/auth/sign-in'); // Redirect to login if no token
    }
  }, [router, searchParams]);

  return <div>Authenticating...</div>;
}
