import { Mail, Archive, User2, Factory } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';

import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { useParams, useSearchParams } from 'react-router-dom';
import { api } from '../data/data';
import Alert from '../components/alert';
import { getAuthErrorMessage } from './authError';


function AdminSignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setemail] = useState<string>("");

  
  const [error, setError] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);

  const [searchParams] = useSearchParams();

  const {token} = useParams();
  const companyName = String(searchParams.get('companyName'));
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(null);
    setLoading(true);
    
    const formData = {
      firstName,
      lastName,
      email,
    }
    try{
      const response = await api.post('auth/create-admin/'+token, formData);
      console.log(response);
      if (response.data.success) {
        setSubmitted(true);
        setSubmittedMessage(response.data.message || "Check your email to set up your password.");
      } else {
        setError(response.data.message || "We couldn't create your admin account. Please try again.");
        setSuccess(false);
      }
    } catch (error: unknown) {
      setError(getAuthErrorMessage(error, "We couldn't create your admin account. Please try again."));
      setSuccess(false);
    } finally {
      setLoading(false);
    }

    if (!token) return <h1>Token invalid</h1>
  

    
    const validateToken = async () => {
      try {
        const response = await api.validateEmail(token);
        
        if (response.valid === false) {
          setError(response.message);
          return;
        }

        // Token is valid
        setError("");
      } catch (error) {
        setError(getAuthErrorMessage(error, "We couldn't verify this invitation. Check your connection and try again."));
      } finally {
        setEmailValidation(false);
      }
    };

    validateToken();
  };

  if (emailValidation) {
    return <p>Checking invitation link...</p>;
  }

  if (error) {
    console.log()
    return <main className={styles.main}><div className={styles.content}><Alert message={error} success={false} setSuccess={() => {}} setSuccessMessage={setError}/></div></main>;
  }

  if (submitted) {
    return <>
      <div>{submittedMessage}</div>
    </>
  }

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
          <h4>ProdUp Inventory and Sales</h4>
          <p className={styles.medium}>Register Admin</p>
          <Alert message={error} success={success} setSuccess={setSuccess} setSuccessMessage={setError}/>

          <div className={styles.divider}>
            <InputField
            label="Company"
            icon={Factory}
            required
            type='text'
            placeholder='Company Name'
            value={companyName}
            readonly={true}
            onFieldChanged={()=> {}}
            />

            <InputField
            label="First Name"
            onFieldChanged={setFirstName}
            icon={User2}
            required
            type='text'
            placeholder='John'
            />

            <InputField
            label="Last Name"
            icon={User2}
            type="text"
            placeholder="Doe"
            onFieldChanged={setLastName}
            required
            />
            
            <InputField
            label="Company Mail"
            icon={Mail}
            type="email"
            placeholder="name@companyName.com"
            onFieldChanged={setemail}
            required
            />

            <SubmitButton name="Sign Up as Admin" loading={loading} alert='Creating your company...' />

          </div>

        </form>
      </div>
    </main>
    
    </>
  )
}

export default AdminSignUp
