'use client';

import axios from 'axios';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, FormCheck, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const SignUpForm = () => {
  const [firstPassword, setFirstPassword] = useState('');
  const [loading, setLoading] = useState(false); // For button loading state
  const [error, setError] = useState(''); // To display errors
  const [success, setSuccess] = useState(''); // To display success messages

  // Validation schema
  const signUpSchema = yup.object({
    email: yup.string().email('Please enter a valid email').required('Please enter your email'),
    password: yup.string().required('Please enter your password'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
  });

  const { control, handleSubmit, watch, getValues } = useForm({
    resolver: yupResolver(signUpSchema)
  });

  useEffect(() => {
    setFirstPassword(getValues().password);
  }, [watch('password')]);

  // Form submission handler
  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('https://br-backend-server.vercel.app/api/user/register-user', {
        email: data.email,
        password: data.password
      });

      // Handle successful signup
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        window.location.href = '/auth/sign-in'; // Redirect to sign-in page
      }, 2000);
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <TextFormInput
          name="email"
          control={control}
          containerClassName="input-group-lg"
          placeholder="Enter your email"
        />
        <small>We&apos;ll never share your email with anyone else.</small>
      </div>
      <div className="mb-3 position-relative">
        <PasswordFormInput
          name="password"
          control={control}
          size="lg"
          placeholder="Enter new password"
        />
        <div className="mt-2">
          <PasswordStrengthMeter password={firstPassword} />
        </div>
      </div>
      <PasswordFormInput
        name="confirmPassword"
        control={control}
        size="lg"
        containerClassName="mb-3"
        placeholder="Confirm password"
      />
      <div className="mb-3 text-start">
        <FormCheck label="Keep me signed in" id="termAndCondition" />
      </div>
      {error && <div className="text-danger mb-3">{error}</div>}
      {success && <div className="text-success mb-3">{success}</div>}
      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Sign me up'}
        </Button>
      </div>
      <p className="mb-0 mt-3 text-center">
        ©{currentYear}{' '}
        <Link target="_blank" href={developedByLink}>
          {developedBy}.
        </Link>{' '}
        All rights reserved
      </p>
    </form>
  );
};

export default SignUpForm;
