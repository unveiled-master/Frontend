import { X, ListSortAscending, Pill, ChartNoAxesColumn } from "lucide-react";
import styles from "./styles/addCategory.module.css";
import InputField from "../forms/input-field";
import { useState } from "react";
import Loading from "../forms/loading";
import { ApiService } from "../../services/api.service";
import axios from "axios";
import { statusOptions, type Category } from "../../data/data";

type props = {
  closeModal: () => void,
  setSuccess: (value: boolean | null) => void,
  setMessage: (value: string) => void,
  setCategory: (categories: Category[]) => void,
  // handleSubmit?: SubmitEventHandler<HTMLFormElement>,
  // loading: boolean,
}

const api = new ApiService();

export default function AddCategory ({closeModal, setSuccess, setMessage, setCategory}: props) {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("Electronics");
  const [description, setDescription] = useState<string>("A description");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(formData.entries()),
    }
    try{
      const response = await api.post("category", data);
      console.log(response);

      if(response.success === false) {
        console.log("Response: ", response);
        setMessage( response.error.response.data.message || response.data.message || "Request failed");
        setLoading(false);
        setSuccess(false);
        closeModal();
        return;
      }
      const category: Category = response.data.category;
      setMessage(`${category.name} Category Added`)
      setLoading(false);
      setSuccess(true);
      setCategory((current) => [...current, category]);
      closeModal();
    } catch (error) {
      if(axios.isAxiosError(error)) {
        setMessage( error.response?.data.message ?? error.message ?? "Request failed");
        setLoading(false);
        setSuccess(false);
        closeModal();
      }
    }
  }

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
            type="textarea"
            name="description"
          />

          <InputField 
            label="Status"
            name="status"
            icon={ChartNoAxesColumn}
            onFieldChanged={() => {}}
            type="select"
            options={statusOptions}
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