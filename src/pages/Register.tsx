import { Mail, Archive, Factory, LocationEdit } from 'lucide-react';
import styles from './styles/login.module.css';
import { useState } from 'react';

import InputField from '../components/forms/input-field';
import SubmitButton from '../components/forms/submit-button';
import { Link } from 'react-router-dom';
import { ApiService } from '../services/api.service';
import axios from 'axios';
import Icon from '../components/icon';

const api = new ApiService();

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
      name,
      email,
      address: location,
    }

    try {
      const response = await api.post("auth/register", formData);
      console.log(response);
      setLoading(false);
      setSubmitted(true);
      setSubmittedMessage(response.data.message + `Check ${email} for the email verification.`);
      return response;
    } catch (error) {
      if(axios.isAxiosError(error)) {
        setLoading(false);
        setSubmitted(false);
        alert("Registeration failed");
      }
    }
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
          
          <Icon icon={Archive}/>
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
    
    </>
  )
}

export default Register;