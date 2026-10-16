import { createColumnHelper } from "@tanstack/react-table";
import type { features } from "../components/features";
import DataTable from "../components/datatables/dataTable";
import DataTableHeader from "../components/datatables/dataTableHeader";
import { useState } from "react";
import { useModal } from "../components/contexts/useModal";
import AddProduct from "../components/modals/addProduct";
import type { Product } from "../data/data";
import { Products as products } from "../data/data";



export default function Products () {

  const {openModal, closeModal} = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
  }

  const openAddProductModal = () => {
    openModal(<AddProduct closeModal={closeModal} handleSubmit={(e) => {handleSubmit(e)}} loading={loading} />);
  }

  const [searchValue, setSearchValue] = useState<string>("");

  const columnHelper = createColumnHelper<typeof features, Product>();
  const columns = columnHelper.columns([
    columnHelper.accessor(
      "id", {
        header: "Id"
    }),
    columnHelper.accessor(
      "sku", {
        header: "sku"
    }),
    columnHelper.accessor(
      "img", {
        header: "img",
        cell: (info) => {
          return <img src={info.getValue()} alt="Product Image" height='40px' width='50px'/>
        }
    }),
    columnHelper.accessor(
      "name", {
        header: "name"
    }),
    columnHelper.accessor(
      "category", {
        header: "category"
    }),
    columnHelper.accessor(
      "supplier", {
        header: "supplier"
    }),
    columnHelper.accessor(
      "barcode", {
        header: "barcode"
    }),
    columnHelper.accessor(
      "description", {
        header: "description"
    }),
    columnHelper.accessor(
      "costPrice", {
        header: "costPrice"
    }),
    columnHelper.accessor(
      "sellingPrice", {
        header: "sellingPrice"
    }),
    columnHelper.accessor(
      "currentStock", {
        header: "currentStock"
    }),
    columnHelper.accessor(
      "reservedStock", {
        header: "reservedStock"
    }),
    columnHelper.accessor(
      "minimumStock", {
        header: "minimumStock"
    }),
    columnHelper.accessor(
      "status", {
        header: "status"
    }),
    columnHelper.accessor(
      "createdAt", {
        header: "createdAt"
    })
  ])

  return <>
    <DataTableHeader buttonClick={openAddProductModal} onChange={setSearchValue} value={searchValue} addItem="Add Product" />
    <section>
      <DataTable data={products} columns={columns}/>
    </section>
  </>
}