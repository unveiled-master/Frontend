import { createColumnHelper } from "@tanstack/react-table"
import  {type Supplier, Suppliers as suppliers} from "../data/data";
import { features } from "../components/features";
import DataTable from "../components/datatables/dataTable";
import DataTableHeader from "../components/datatables/dataTableHeader";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
  const navigate = useNavigate();

  const columnHelper = createColumnHelper<typeof features, Supplier>()
  const columns = columnHelper.columns([
    columnHelper.accessor(
      "name",{
        header: "Name"
      }
    ),
    columnHelper.accessor(
      "email",{
        header: "Email"
      }
    ),
    columnHelper.accessor(
      "phone",{
        header: "Phone"
      }
    ),
    columnHelper.accessor(
      "address",{
        header: "Address"
      }
    ),
    columnHelper.accessor(
      "contactPerson",{
        header: "Contact Person"
      }
    ),
    columnHelper.accessor(
      "status",{
        header: "Status"
      }
    ),
    columnHelper.accessor(
      "createdAt",{
        header: "name"
      }
    ),
  ])
  return <>
    <DataTableHeader buttonClick={() => {navigate("/create-supplier")}} onChange={() => {}} value="" addItem="Add Supplier"/>
    <section>
      <DataTable data={suppliers} columns={columns}/>
    </section>
  </>
}