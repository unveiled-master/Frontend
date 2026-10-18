import { Truck, User2 } from "lucide-react";
import InputField, { type Option } from "../components/forms/input-field";
import type { Supplier } from "../data/data"
import { useState } from "react";
import SubmitButton from "../components/forms/submit-button";
import styles from "./styles/createSupplier.module.css";
import Icon from "../components/icon";

type SupplierForm = Omit<Supplier, "id" | "createdAt">
const statusOptions: Option[] = [
  {id: "active", name: "Active"},
  {id: "inactive", name: "InActive"}
]
const initialForm: SupplierForm = {
  name: "",
  phone: "",
  email: "",
  contactPerson: "",
  address: "",
  status: "Active"
} 

export default function CreateSupplier () {
  const [form, setForm] = useState<SupplierForm>(initialForm);

  const update = (field: keyof SupplierForm) => (value: string) => {
    setForm((current) => ({
      ...current,[field]: value
    }))
  }

  return <>
      <div className={styles.formContent}>
        <div className={styles.content}>
          <Icon icon={Truck}/>
          <form action="" onSubmit={(e) => {e.preventDefault()}} >
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
              onFieldChanged={update("status")}
              value={form.status}
              type="select"
              options={statusOptions}
            />


            <SubmitButton name="Create Supplier"/>
          </form>
        </div>
      </div>
  </>
}