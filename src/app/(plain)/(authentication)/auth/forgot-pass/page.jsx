import { Card } from 'react-bootstrap';
import ForgotPassForm from './components/ForgotPassForm';
export const metadata = {
  title: 'Forgot Password'
};
const ForgotPassword = () => {
  return <Card className="card-body rounded-3 text-center p-4 p-sm-5">
      <h1 className="mb-2">Forgot password?</h1>
      <p>Enter the email address associated with account.</p>
      <ForgotPassForm />
    </Card>;
};
export default ForgotPassword;