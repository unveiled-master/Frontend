import { CircleDashedCheck, CircleX } from 'lucide-react';
import styles from './alert.module.css';
import { useEffect } from 'react';

type props = {
  message: string,
  success: boolean | null,
  setSuccess: (value: boolean | null) => void,
  setSuccessMessage: (value: string) => void,
}
export default function Alert ({success, message, setSuccess, setSuccessMessage}: props) {

  useEffect(() => {
    if (success === null || !message) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
      setSuccess(null);
    }, 10000);

    return () => clearTimeout(timer);
  }, [success, message, setSuccess, setSuccessMessage]);

  return (
    <> 
    {success !== null && (
      <p className={`${styles.successSection} ${success? styles.success : styles.failed}`}> 
        {success ? <><CircleDashedCheck/> {message}</> : <> <CircleX/> {message} </>}
      </p>
    )}
    </>
  )
}