import { Truck, User2 } from "lucide-react";
import InputField, { type Option } from "../components/forms/input-field";
import { api, type Supplier } from "../data/data"
import { useState } from "react";
import SubmitButton from "../components/forms/submit-button";
import styles from "./styles/createSupplier.module.css";
import Icon from "../components/icon";
import Alert from "../components/alert";
import { getRequestErrorMessage } from "./authError";

type SupplierForm = Omit<Supplier, "id" | "createdAt">
const statusOptions: Option[] = [
  {id: "ACTIVE", name: "ACTIVE"},
  {id: "INACTIVE", name: "INACTIVE"}
]
const initialForm: SupplierForm = {
  name: "New Time Products",
  phone: "+233 240 000 000",
  email: "newtime-123@newtime.com",
  contactPerson: "Kwadwo Intwum",
  address: "Jatabu Road",
  status: "ACTIVE"
} 

export default function CreateSupplier () {
  const [form, setForm] = useState<SupplierForm>(initialForm);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const update = (field: keyof SupplierForm) => (value: string) => {
    setForm((current) => (
      {
        ...current,[field]: value
      }
    ))
    console.log(form);
  }

  const handleSubmit = async () => {
    const data = {...form};
    try{
      console.log(data);
      const response = await api.post('supplier', data);
      setSuccess(true);
      setSuccessMessage(`Supplier added`);
      console.log(response);
    } catch (error) {
      setSuccess(false);
      setSuccessMessage(getRequestErrorMessage(error, "Supplier could not be added. Please try again."));
    }
  }

  return <>
      <div className={styles.formContent}>
        <div className={styles.content}>
          <Icon icon={Truck}/>
          <Alert success={success} message={successMessage} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage}/> 
          <form action="" onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
            <InputField
              icon={User2}
              label="Name"
              onFieldChanged={update("name")}
              value={form.name}
              placeholder="New Time Products"
            />
            <InputField
              icon={User2}
              label="Phone"
              onFieldChanged={update("phone")}
              value={form.phone}
              type="phone"
              placeholder="+233 240 000 000"
            />
            <InputField
              icon={User2}
              label="Email"
              onFieldChanged={update("email")}
              value={form.email}
              type="email"
              placeholder="newtime-123@newtime.com"
            />
            <InputField
              icon={User2}
              label="Contact Person"
              onFieldChanged={update("contactPerson")}
              value={form.contactPerson}
              placeholder="Kwadwo Intwum"
            />
            <InputField
              icon={User2}
              label="Address"
              onFieldChanged={update("address")}
              value={form.address}
              placeholder="Jatabu Road"
            />
            <InputField
              icon={User2}
              label="Status"
              onFieldChanged={() => {}}
              onSelectChanged={update("status")}
              value={form.status}
              type="select"
              name="status"
              options={statusOptions}
            />


            <SubmitButton name="Create Supplier"/>
          </form>
        </div>
      </div>
  </>
}
