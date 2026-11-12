import { LockKeyhole, Archive, Factory } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';

import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../data/data';
import Icon from '../components/icon';
import Alert from '../components/alert';
import { getAuthErrorMessage } from './authError';


function SetUpPassword() {
  const [confirmPassword, setConfirmPassword] = useState<string>("password");
  const [password, setPassword] = useState<string>("password");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {token} = useParams();
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get('companyName');
  const userName = searchParams.get('userName');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!passwordsMatch) {
      setErrorMessage(password !== confirmPassword ? "Your passwords don't match." : "Your password must be at least 8 characters.");
      setSuccess(false);
      return;
    }
    setErrorMessage("");
    setSuccess(null);
    setLoading(true);
    try{
      const response = await api.post("auth/set-password/"+token, {password:password, confirmPassword:password});
      if(response.success){
        setSubmittedMessage(response.message || "Password set successfully. Redirecting to sign in…");
        setSubmitted(true);
        location.href = '/login';
        return;
      }
      setErrorMessage(response.message || "We couldn't set your password. Please try again.");
      setSuccess(false);
    } catch(error: unknown){
      setErrorMessage(getAuthErrorMessage(error, "We couldn't set your password. Check the invitation link and try again."));
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  const passwordValid = confirmPassword.length >= 8 && password.length >= 8;
  const passwordsMatch = password === confirmPassword && passwordValid;

  if (submitted) return <h1>{submittedMessage}</h1>
  return (
    <>
    <main className={styles.main}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <Icon icon={Archive}/>
          <Alert message={errorMessage} success={success} setSuccess={setSuccess} setSuccessMessage={setErrorMessage}/>

          <div className={styles.divider}>
            
            <InputField
            label="Company Name"
            icon={Factory}
            type="text"
            placeholder="Company Name"
            value={companyName!}
            onFieldChanged={()=> {}}
            required
            readonly//={true}
            />

            <InputField
            label="Admin Name"
            icon={Factory}
            type="text"
            placeholder="Admin Name"
            value={userName!}
            onFieldChanged={()=> {}}
            required
            readonly//={true}
            />
            
            <InputField
            label="Password"
            icon={LockKeyhole}
            type="password"
            placeholder="••••••••"
            onFieldChanged={setPassword}
            required
            value={password}
            />

            <InputField
            label="Password"
            onFieldChanged={setConfirmPassword}
            icon={LockKeyhole}
            required
            type='password'
            placeholder='••••••••'
            value={confirmPassword}
            />

            {!passwordValid && <p>Password should be at least 8 characters.</p>}
            

            <SubmitButton name="Set Password" loading={loading} alert="Setting up your password…" />
          </div>

        </form>
      </div>
    </main>
    
    </>
  )
}

export default SetUpPassword
