import { X, ListSortAscending, Pill } from "lucide-react";
import styles from "./styles/addCategory.module.css";
import InputField from "../forms/input-field";
import { useState, type SubmitEventHandler } from "react";
import Loading from "../forms/loading";

type props = {
  closeModal: () => void,
  handleSubmit: SubmitEventHandler<HTMLFormElement>,
  loading: boolean,
}

export default function AddCategory ({closeModal, handleSubmit, loading}: props) {

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <>
      <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
        <div className={styles.header}>
          <h3>Add Category</h3>
          <button type="button" onClick={closeModal}><X/></button>
        </div>

        <form className={styles.modalContent} onSubmit={handleSubmit}>
          <InputField
            label="Name"
            icon={ListSortAscending}
            onFieldChanged={setName}
            value={name}
            required
            name="name"
          />
          <InputField
            label="Description"
            icon={Pill}
            onFieldChanged={setDescription}
            value={description}
            required
            name="description"
          />

          {/* <SubmitButton name="Add Category"/> */}
          <button type="submit" className={`${loading ? styles.disabled : ""}  ${styles.submitButton}`}>
            {loading ? <Loading/> : "Add Category"}
          </button>
        </form>
      </div>
    </>
  )
}