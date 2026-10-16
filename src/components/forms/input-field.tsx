import { Eye, EyeClosed, type LucideIcon } from "lucide-react";
import { useState, } from "react"
import styles from './input-field.module.css';

type Option = {
  id:string
  name: string
}

type props = {
  label?: string,
  icon: LucideIcon,
  type?: string,
  placeholder?: string,
  onFieldChanged: (value: string)=> void,
  required?: boolean,
  accept?: string,
  value?: string,
  readonly?: boolean,
  name?: string,
  options?: Option[],
  onSelectChanged?: (value: string) => void,
}

export default function InputField({
  label,
  icon: Icon,
  type,
  placeholder,
  onFieldChanged,
  required,
  accept,
  value,
  readonly,
  name,
  options,
  onSelectChanged,
  }: props){

  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordIsVisible(!passwordIsVisible);
  }

  return  <div className={styles.inputField}>
      {
        label ? (<div className={styles.labels}>
            <label>{label}</label>

            {type === "email" && (
              <span>Your special identity</span>
            )}
          </div>)
          : 
          ""
      }
      

      <div className={styles.input}>
        <Icon />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
          >
            {passwordIsVisible ? <Eye/> : <EyeClosed/>}
          </button>
        )}

        {
          type === "textarea" 
            ? 
          
          
          <textarea
            name={name}
            id={name}
            onChange={(e) => onFieldChanged(e.target.value)}
            placeholder={placeholder}
            required={required}
            readOnly={readonly}
          >
              {value}
          </textarea>
          
            :
          type === "select"
            ?
          <select name={name} id={name} value={value} required={required} onChange={(e) => onSelectChanged?.(e.target.value)}>
            <option value="">Select {label?.toLowerCase() ?? "an option"}</option>
            {options?.map(choice => {
              return <option value={choice.name} id={choice.id} key={choice.id}>{choice.name}</option>
            })}
          </select>
            :
          <input
          value={value}
          readOnly={readonly}
          required={required}
          placeholder={
            type === "password" && passwordIsVisible
              ? "ABCDEFGH"
              : placeholder
          }
          type={
            type === "password" && passwordIsVisible
              ? "text"
              : type
          }

          accept={type === "file"? accept : ""}
          onChange={(e) => onFieldChanged(e.target.value)}
          name={name}
        />
        }

        
      </div>
    </div>
  
}
