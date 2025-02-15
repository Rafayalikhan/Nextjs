'use client';

import { currentYear, developedBy, developedByLink } from '@/context/constants';
import Link from 'next/link';
import useSignIn from './useSignIn';
import TextFormInput from '@/components/form/TextFormInput';
import PasswordFormInput from '@/components/form/PasswordFormInput';
import { Button, FormCheck, Spinner } from 'react-bootstrap';

const LoginForm = () => {
  const { loading, login, loginWithLinkedIn, control ,loginWithGoogle} = useSignIn();

  return (
    <form className="mt-sm-4" onSubmit={login}>
      <TextFormInput
        name="email"
        type="email"
        placeholder="Enter email"
        control={control}
        containerClassName="mb-3 input-group-lg"
      />
      <div className="mb-3 position-relative">
        {/* @ts-ignore */}
        <PasswordFormInput
          name="password"
          placeholder="Enter password"
          control={control}
          size="lg"
          containerClassName="w-100"
        />
      </div>
      <div className="mb-3 d-sm-flex justify-content-between">
        <FormCheck type="checkbox" label="Remember me?" id="rememberCheck" />
        <Link href="/auth/forgot-pass">Forgot password?</Link>
      </div>
      <div className="d-grid gap-2">
        {/* ✅ Normal Email Login Button */}
        <Button variant="primary" size="lg" type="submit" disabled={loading}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Login'}
        </Button>

        {/* ✅ LinkedIn Login Button */}
        <Button
          variant="outline-primary"
          size="lg"
          onClick={loginWithLinkedIn}
          disabled={loading}
        >
          <i className="bi bi-linkedin"></i> Login with LinkedIn
        </Button>



 {/* ✅ Google Login Button */}
 <Button
          variant="outline-primary"
          size="lg"
          onClick={loginWithGoogle}
          disabled={loading}
        >
          <i className="bi bi-linkedin"></i> Login with Google
        </Button>



      </div>
      <p className="mb-0 mt-3">
        ©{currentYear}{' '}
        <Link target="_blank" href={developedByLink}>
          {developedBy}.
        </Link>{' '}
        All rights reserved
      </p>
    </form>
  );
};

export default LoginForm;
