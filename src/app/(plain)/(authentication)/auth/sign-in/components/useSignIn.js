'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import useQueryParams from '@/hooks/useQueryParams';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { showNotification } = useNotificationContext();
  const queryParams = useQueryParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      push('/feed/home'); // Already logged in, redirect to dashboard
    }
  }, [push]);

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

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://br-backend-server.vercel.app/api/user/login-user', {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');

      push(queryParams['redirectTo'] ?? '/feed/home');

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

  return {
    loading,
    login,
    control,
  };
};

export default useSignIn;
