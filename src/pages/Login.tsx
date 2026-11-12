import { Mail, LockKeyhole, Archive } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';

import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { Link, Navigate } from 'react-router-dom';
import { ApiService } from '../services/api.service';
import Icon from '../components/icon';
import Alert from '../components/alert';
import { getAuthErrorMessage } from './authError';

const auth = new ApiService();

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccess(null);
    setLoading(true);
    try{
      const response = await auth.login('auth/login', {email, password});
      if (response.success) {
        setSubmitted(true);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        setErrorMessage(response.message || "We couldn't sign you in. Check your details and try again.");
        setSuccess(false);
      }
    } catch(error: unknown){
      setErrorMessage(getAuthErrorMessage(error, "We couldn't sign you in. Check your details and try again."));
      setSuccess(false);
    } finally {
      setLoading(false);
    }
    
  }

  if(submitted) {
    return <Navigate to="/dashboard"/>
  }

  return (
    <>
    <main className={styles.main}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <Icon icon={Archive}/>
          <h4>ProdUp Inventory and Sales</h4>
          <p className={styles.small}>Enter your enterprise credentials to access your sales and inventory dashboard</p>
          <Alert message={errorMessage} success={success} setSuccess={setSuccess} setSuccessMessage={setErrorMessage}/>

          <div className={styles.divider}>
            
            <InputField
            label="Email"
            icon={Mail}
            type="text"
            placeholder="name@company.com"
            onFieldChanged={setEmail}
            required
            />

            <InputField
            label="Password"
            onFieldChanged={setPassword}
            icon={LockKeyhole}
            required
            type='password'
            placeholder='••••••••'
            />
            
            <p className={styles.medium} id={styles.forgotPassword}>forgot password?</p>

            <div className={styles.rememberDevice}>
              <input type="checkbox" name="remeber-device"/>
              <p className={styles.medium}>Remeber this device for 30 days</p>
            </div>

            <SubmitButton name="Sign In to your Workspace" loading={loading} />

            <p className={styles.medium}>
              New Organization?  <Link to="/register" className={styles.register}>Register your company</Link>.
            </p>
          </div>

        </form>
      </div>
    </main>
    
    </>
  )
}

export default Login
