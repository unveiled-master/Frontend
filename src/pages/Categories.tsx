import { createColumnHelper } from "@tanstack/react-table";
import styles from "./styles/categories.module.css";
// import dashboard from "./styles/dashboard.module.css";
import DataTable from "../components/datatables/dataTable";
import type { features } from "../components/features";
import { useModal } from "../components/contexts/useModal";
import AddCategory from "../components/modals/addCategory";
import { useEffect, useState } from "react";
import DataTableHeader from "../components/datatables/dataTableHeader";
import type { Category } from "../data/data";
// import { Categories as c } from "../data/data";
import { ApiService } from "../services/api.service";
import axios from "axios";
import Alert from "../components/alert";



const columnHelper = createColumnHelper<typeof features, Category>();

const columns = columnHelper.columns([
  // columnHelper.accessor("id", {
  //   header: "Category ID",
  // }),
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
        ACTIVE: styles.active,
        INACTIVE: styles.inactive,
      }[status]
      return <span className={`${styles.status} ${statusClass}`}>{status}</span>
    }
  }),
]);

const api = new ApiService();

export default function Categories () {

  const {openModal, closeModal} = useModal();
  const [searchValue, setSearchValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const openAddCategoryModal = () => {
    openModal(<AddCategory closeModal={closeModal} setSuccess={setSuccess} setMessage={setMessage} setCategory={setCategories}/>);
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("category");

      // Adjust this according to the structure returned by your API.
      console.log(response);
      setCategories(response.categories);
    } catch (error) {
      if(axios.isAxiosError(error)) {
        console.log(error.response)
      }
      console.error("Failed to fetch categories:", error);
      setMessage("Failed to load categories");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await getCategories();
    }

    fetchCategories();
  }, []);

  if(loading){
    return <h1>Loading Categories..</h1>
  }
  
  return <>
    <h1>Categories</h1>
    <Alert success={success} message={message} setSuccess={setSuccess} setSuccessMessage={setMessage}/>
    <DataTableHeader buttonClick={openAddCategoryModal} onChange={setSearchValue} value={searchValue} addItem="Add Category"/>
    <section>
      <DataTable data={categories} columns={columns}/>
    </section>

    {/* <Alert success={success} message={message}/> */}
  </>
}