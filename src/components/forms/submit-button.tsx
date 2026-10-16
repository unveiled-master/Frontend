import { ArrowRight } from "lucide-react";
import styles from "./submit-button.module.css";
import Loading from "./loading";
type props = {
  name: string,
  onClick?: () => void,
  loading?: boolean,
  alert?: string,
}


export default function SubmitButton({name, loading, onClick, alert}: props){
  return (
  <button className={loading ? styles.disabled : ""} onClick={onClick}  id={styles.submitButton} >
    {loading ? <Loading alert={alert}/> : <>{name} <ArrowRight/></>}
  </button>)
}