import styles from "./loading.module.css";

type props = {
  alert?: string
}

export default function Loading({alert}: props) {
  return <>
  <div>{alert}</div> <div className={styles.loading}></div> 
  </>
}