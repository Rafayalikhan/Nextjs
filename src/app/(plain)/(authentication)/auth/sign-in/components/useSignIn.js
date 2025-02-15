'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import useQueryParams from '@/hooks/useQueryParams';
import Cookies from 'js-cookie';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { showNotification } = useNotificationContext();
  const queryParams = useQueryParams();

  const loginFormSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // useEffect(() => {
  //   // ✅ Check if user is already logged in
  //   const token = Cookies.get('token');
  //   if (token) {
  //     push('/feed/home'); // Redirect if already logged in
  //   }
  // }, [push]);

  // ✅ Normal Email/Password Login
  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://br-backend-server.vercel.app/api/user/login-user', {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      // ✅ Store token securely
      Cookies.set('token', token, { expires: 7, secure: true });

      push('/feed/home');



      showNotification({
        message: 'Successfully logged in. Redirecting....',
        variant: 'success',
      });
    } catch (err) {
      showNotification({
        message: err.response?.data?.message || 'Login failed. Please try again.',
        variant: 'danger',
      });
    } finally {
      setLoading(false);
    }
  });

  // ✅ LinkedIn Login Handler
  const loginWithLinkedIn = () => {
    window.location.href = 'https://br-backend-server.vercel.app/auth/linkedin';
  };



   // ✅ LinkedIn Login Handler
   const loginWithGoogle = () => {
    window.location.href = 'https://br-backend-server.vercel.app/api/login';
  };


  return {
    loading,
    login,
    loginWithLinkedIn,
    loginWithGoogle,
    control,
  };
};

export default useSignIn;
