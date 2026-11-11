import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Mail, Phone, UserRound, UsersRound } from "lucide-react";
import axios from "axios";
import { api } from "../data/data";
import styles from "./styles/createCustomer.module.css";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await api.post("customer", values);
      navigate("/customers");
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) setError(requestError.response?.data?.message || "Customer could not be added. Please try again.");
      else setError("Customer could not be added. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return <main className={styles.page}>
    <Link className={styles.backLink} to="/customers"><ArrowLeft size={16} /> Back to customers</Link>
    <header className={styles.heading}><span className={styles.headingIcon}><UsersRound size={22} /></span><div><p className={styles.eyebrow}>CUSTOMER DIRECTORY</p><h1>Add customer</h1><p className={styles.subtitle}>Add contact information to your customer directory.</p></div></header>
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.card}>
        <div className={styles.cardHeading}><span><UserRound size={17} /></span><div><h2>Customer details</h2><p>Enter the customer's name and contact information.</p></div></div>
        <div className={styles.fields}>
          <label className={styles.field}><span>Customer name <i>*</i></span><div><UserRound size={16} /><input name="name" placeholder="e.g. Ama Mensah" required /></div></label>
          <label className={styles.field}><span>Email address</span><div><Mail size={16} /><input name="email" type="email" placeholder="name@example.com" /></div></label>
          <label className={styles.field}><span>Phone number</span><div><Phone size={16} /><input name="phone" type="tel" placeholder="e.g. +233 24 000 0000" /></div></label>
          <label className={`${styles.field} ${styles.fullWidth}`}><span>Address</span><div><MapPin size={16} /><input name="address" placeholder="City, region or delivery address" /></div></label>
          <input type="hidden" name="status" value="ACTIVE" />
        </div>
      </section>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <div className={styles.formActions}><button className={styles.cancel} type="button" onClick={() => navigate("/customers")}>Cancel</button><button className={styles.submit} type="submit" disabled={saving}>{saving ? "Saving customer…" : "Add customer"}</button></div>
    </form>
  </main>;
}
