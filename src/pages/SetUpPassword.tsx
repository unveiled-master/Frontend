import { LockKeyhole, Archive, Factory } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';

import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../data/data';


function SetUpPassword() {
  const [confirmPassword, setConfirmPassword] = useState<string>("password");
  const [password, setPassword] = useState<string>("password");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");

  const {token} = useParams();
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get('companyName');
  const userName = searchParams.get('userName');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try{
      setSubmitted(true);
      const response = await api.post("auth/set-password/"+token, {password:password, confirmPassword:password});
      setSubmittedMessage(response.data.message);
      if(response.data.success){
        return;
      }

      alert(submittedMessage)
      setSubmitted(false);


    } catch(error){
      console.log(error);
      setSubmitted(false);
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
          <div className={styles.iconBg}>
            <div className={styles.icon}>
              <div className={styles.iconContainer}>
                <Archive/>
              </div>
            </div>
          </div>

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

            {passwordValid ? "" : <p>Password should be more than or equal to 8 characters</p>}
            

            <SubmitButton name="Set Password" loading={submitted? submitted : !passwordsMatch} alert={submitted? "Setting Up..." : !passwordsMatch? 'Passwords Do not match' : 'Passwords Match'} />
          </div>

        </form>
      </div>
    </main>
    
    </>
  )
}

export default SetUpPassword