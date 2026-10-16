import { createColumnHelper } from "@tanstack/react-table";
import styles from "./styles/categories.module.css";
// import dashboard from "./styles/dashboard.module.css";
import DataTable from "../components/datatables/dataTable";
import type { features } from "../components/features";
import { useModal } from "../components/contexts/useModal";
import AddCategory from "../components/modals/addCategory";
import { useState } from "react";
import DataTableHeader from "../components/datatables/dataTableHeader";
import type { Category } from "../data/data";
import { Categories as c } from "../data/data";

let categories: Category[] = [...c];

let lcn = 8;

const columnHelper = createColumnHelper<typeof features, Category>();

const columns = columnHelper.columns([
  columnHelper.accessor("id", {
    header: "Category ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("productCount", {
    header: "Number Of Products",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue();
      const statusClass = {
        Active: styles.active,
        Inactive: styles.inactive,
      }[status]
      return <span className={`${styles.status} ${statusClass}`}>{status}</span>
    }
  }),
]);

export default function Categories () {

  const {openModal, closeModal} = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    const name = String(formData.get('name'));
    const description = String(formData.get('description'));
    

    if(name === null || description === null) return;

    const id = "CAT-" + String(lcn+=1);
    const productCount = Math.ceil(Math.random()*1000);
    const status = Math.random() > 0.5 ? "Active" : "Inactive";
    const createdAt = new Date(Date.now()).toDateString();

    const c: Category[] = [...categories, {
      name,
      description,
      id,
      productCount,
      status,
      createdAt
    }]

    categories = c;

    closeModal()
    // setLoading(false)
  }

  const openAddCategoryModal = () => {
    openModal(<AddCategory closeModal={closeModal} handleSubmit={handleSubmit} loading={loading}/>);
  }

  return <>
    <h1>Categories</h1>
    <DataTableHeader buttonClick={openAddCategoryModal} onChange={setSearchValue} value={searchValue} addItem="Add Category"/>
    <section>
      <DataTable data={categories} columns={columns}/>
    </section>
  </>
}