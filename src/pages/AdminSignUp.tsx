import { Mail, Archive, User2, Factory } from 'lucide-react';
import styles from './styles/login.module.css';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';
import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { useParams, useSearchParams } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const auth = new AuthService();

function AdminSignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setemail] = useState<string>("");

  
  const [error, setError] = useState<string>("");
  const [emailValidation, setEmailValidation] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");

  const [searchParams] = useSearchParams();

  const {token} = useParams();
  const companyName = String(searchParams.get('companyName'));
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const formData = {
      firstName,
      lastName,
      email,
    }
    try{
      const response = await auth.register('create-admin/'+token, formData);
      console.log(response);
      setLoading(false);

      if (response.success) {
        setSubmitted(true);
        setSubmittedMessage("Check your email to set up your password");
      } else {
        alert("Not able to submit at this time. Please try again later");
      }
    } catch (error) {
      alert("There was an error: " + error)
    }
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    
    const validateToken = async () => {
      try {
        const response = await auth.validateEmail(token);
        
        if (response.valid === false) {
          setError(response.message);
          return;
        }

        // Token is valid
        setError("");
      } catch (error) {
        setError(`${error}`);
      } finally {
        setEmailValidation(false);
      }
    };

    validateToken();
  }, [token]);

  if (emailValidation) {
    return <p>Checking invitation link...</p>;
  }

  if (error) {
    console.log()
    return <p>{error}</p>;
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
    <Footer />
    </>
  )
}

export default AdminSignUp