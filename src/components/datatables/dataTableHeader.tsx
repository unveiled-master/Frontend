import { Download, Plus, Search } from "lucide-react";
import styles from "./dataTableHeader.module.css";
import InputField from "../forms/input-field";

type props = {
  buttonClick: () => void
  onChange: (value: string) => void
  value: string
  addItem: string
}
export default function DataTableHeader ({buttonClick, onChange, value, addItem}: props) {
  return (
    
    <div className={styles.header}>
      

      <div className={styles.actionButtons}>
        <InputField name="search" icon={Search} onFieldChanged={onChange} value={value} required={false} />
        <button><Download/> Export</button>
        <button onClick={buttonClick}><Plus/> {addItem}</button>
      </div>
    </div>
  )
}