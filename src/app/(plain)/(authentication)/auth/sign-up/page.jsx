import { Card } from 'react-bootstrap';
import SignUpForm from './components/SignUpForm';
import Link from 'next/link';
export const metadata = {
  title: 'Sign Up'
};
const SignUp = () => {
  return <Card className="card-body rounded-3 p-4 p-sm-5">
      <div className="text-center">
        <h1 className="mb-2">Sign up</h1>
        <span className="d-block">
          Already have an account? <Link href="/auth/sign-in">Sign in here</Link>
        </span>
      </div>
      <SignUpForm />
    </Card>;
};
export default SignUp;