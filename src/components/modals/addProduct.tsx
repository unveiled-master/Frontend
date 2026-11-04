import { X, ListSortAscending, Pill, Container, ListOrdered } from "lucide-react";
import styles from "./styles/addCategory.module.css";
import InputField from "../forms/input-field";
import { useState, type SubmitEventHandler } from "react";
import Loading from "../forms/loading";
import { type Category } from "../../data/data";

type props = {
  closeModal: () => void,
  handleSubmit: SubmitEventHandler<HTMLFormElement>,
  loading: boolean,
}

export default function AddProduct ({closeModal, handleSubmit, loading}: props) {

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const categories: Category[] = [];

  return (
    <>
      <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
        <div className={styles.header}>
          <h3>Product Info</h3>
          <button type="button" onClick={closeModal}><X/></button>
        </div>

        <form className={styles.modalContent} onSubmit={handleSubmit}>
          <input name="image" type="file" onChange={(e) => {setImage(e.target.files?.[0] ?? null)}} accept="image/*"/>

          {image && (
            <>
              <p>{image.name}</p>
              <img src={URL.createObjectURL(image)} width="60px" alt="" />
            </>
          )}

          <InputField
            label="Name"
            icon={ListSortAscending}
            onFieldChanged={setName}
            value={name}
            required
            name="name"
          />

          <InputField
            icon={ListOrdered}
            onFieldChanged={() => {}}
            label="SKU"
            placeholder="Name-Sku-1923"
          />
          
          <InputField
            icon={ListSortAscending}
            onFieldChanged={() => {}}
            label="Category"
            options={[...categories]}
            type="select"
          />

          <InputField
            icon={Container}
            onFieldChanged={() => {}}
            label="Supplier"
            type="select"
            placeholder="John Doe"
          />

          <div className={styles.prices}>
            <InputField 
              icon={Container}
              onFieldChanged={() => {}}
              label="Supplier"
              type="select"
              placeholder="John Doe"
            />
          </div>

          
          <InputField
            label="Description"
            icon={Pill}
            onFieldChanged={setDescription}
            value={description}
            required
            name="description"
            type="textarea"
          />


          {/* <SubmitButton name="Add Category"/> */}
          <button type="submit" className={`${loading ? styles.disabled : ""}  ${styles.submitButton}`}>
            {loading ? <Loading/> : "Add Product"}
          </button>
        </form>
      </div>
    </>
  )
}