import { Card } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import Link from 'next/link';
export const metadata = {
  title: 'Sign In'
};
const SignIn = () => {
  return <Card className="card-body text-center p-4 p-sm-5">
      <h1 className="mb-2">Sign in</h1>
      <p className="mb-0">
        Don&apos;t have an account?<Link href="/auth/sign-up"> Click here to sign up</Link>
      </p>
      <LoginForm />
    </Card>;
};
export default SignIn;