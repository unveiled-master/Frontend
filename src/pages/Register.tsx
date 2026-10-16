import { Mail, Archive, Factory, LocationEdit } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';
import Footer from '../components/footer';
import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string>("");

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    const formData = {
      name: name,
      email: email,
      address: location,
    }

    const response = await authService.register("register", formData);
    console.log(response);
    setLoading(false);
    setSubmitted(true);
    setSubmittedMessage(response.message)
    return response;
  }

  if(submitted) {
    return (
      <div>
        {submittedMessage}
      </div>
    )
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
          <p className={styles.medium}>Register your Company</p>

          <div className={styles.divider}>

            <InputField
            label="Company Name"
            value={name}
            onFieldChanged={setName}
            icon={Factory}
            required
            type='text'
            placeholder='RAn Inc Industries'
            readonly={false}
            />

            <InputField
            label="Company Email"
            icon={Mail}
            value={email}
            type="email"
            placeholder="company@mail.com"
            onFieldChanged={setEmail}
            required
            readonly={false}
            />
            
            <InputField
            label="Location/Address"
            icon={LocationEdit}
            value={location}
            type="text"
            placeholder="Tema-Freezones"
            onFieldChanged={setLocation}
            required
            readonly={false}
            />

            <SubmitButton loading={loading} name="Register Company"/>

            <p className={styles.medium}>
              Already have an account?  <Link to="/login" className={styles.register}>Login</Link>.
            </p>
          </div>

        </form>
      </div>
    </main>
    <Footer />
    </>
  )
}

export default Register