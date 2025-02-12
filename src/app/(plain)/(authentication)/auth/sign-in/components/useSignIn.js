'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNotificationContext } from '@/context/useNotificationContext';
import useQueryParams from '@/hooks/useQueryParams';
import Cookies from 'js-cookie';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    // Check if user is already logged in
    const token = Cookies.get('token'); // Read token from cookies
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = handleSubmit(async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://br-backend-server.vercel.app/api/user/login-user', {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      // ✅ Securely store the token in cookies
      Cookies.set('token', token, { expires: 7, secure: true });

      // ✅ Store user data in session storage
      sessionStorage.setItem('user', JSON.stringify(user));

      // ✅ Set authentication state
      setIsAuthenticated(true);

      // ✅ Redirect user
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
    isAuthenticated, // ✅ New state to check if user is logged in
  };
};

export default useSignIn;
