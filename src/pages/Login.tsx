import { Mail, LockKeyhole, Archive } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';
import Footer from '../components/footer';
import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const auth = new AuthService();

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try{
      const response = await auth.register('login', {email, password});
      setSubmittedMessage(response.message)
      if (response.success) {
        setSubmitted(true)
      }
    } catch (error) {
      setLoading(false);
      alert(`${submittedMessage}: ` + error)
    }
  }

  if(submitted) return <h1>{submittedMessage}</h1>

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
          <p className={styles.small}>Enter your enterprise credentials to access your sales and inventory dashboard</p>

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
    <Footer />
    </>
  )
}

export default Login