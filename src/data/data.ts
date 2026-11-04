import type { Option } from "../components/forms/input-field";
import { ApiService } from "../services/api.service";

export const user = JSON.parse(localStorage.getItem("user")!)

export const statusOptions: Option[] = [
  {id: "ACTIVE", name: "ACTIVE"},
  {id: "INACTIVE", name: "Inctive"},
]

export const api = new ApiService();

export type Sale = {
  id: string;
  product: string;
  customer: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Cancelled";
};

export type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
};

export type Product = {
  // id?: string
  image: string
  supplierId: string
  categoryId: string
  supplier?: string
  category?: string
  name: string
  sku: string
  barcode: string
  description: string
  costPrice: number
  sellingPrice: number
  currentStock: number
  reservedStock: number
  minimumStock: number
  status: "ACTIVE" | "ACTIVE"
  createdAt?: string
}


export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
};

export const Suppliers: Supplier[] = [
  { id: "SUP-1", name: "TechSource Ghana", contactPerson: "Kwame Mensah", email: "kwame@techsource.example", phone: "+233 20 555 0101", address: "Accra, Ghana", status: "ACTIVE", createdAt: "2026-01-15" },
  { id: "SUP-2", name: "Digital Supplies Ltd", contactPerson: "Ama Boateng", email: "ama@digitalsupplies.example", phone: "+233 24 555 0102", address: "Tema, Ghana", status: "ACTIVE", createdAt: "2026-02-04" },
  { id: "SUP-3", name: "ConnectPro Ltd", contactPerson: "Kojo Asante", email: "kojo@connectpro.example", phone: "+233 50 555 0103", address: "Kumasi, Ghana", status: "ACTIVE", createdAt: "2026-02-20" },
  { id: "SUP-4", name: "Storage World", contactPerson: "Abena Owusu", email: "abena@storageworld.example", phone: "+233 27 555 0104", address: "Accra, Ghana", status: "ACTIVE", createdAt: "2026-03-11" },
  { id: "SUP-5", name: "Network Solutions", contactPerson: "Yaw Osei", email: "yaw@networksolutions.example", phone: "+233 55 555 0105", address: "Takoradi, Ghana", status: "ACTIVE", createdAt: "2026-04-02" },
  { id: "SUP-6", name: "AudioTech Ghana", contactPerson: "Efua Agyeman", email: "efua@audiotech.example", phone: "+233 26 555 0106", address: "Accra, Ghana", status: "ACTIVE", createdAt: "2026-04-18" },
  { id: "SUP-7", name: "Office Essentials GH", contactPerson: "Nana Addo", email: "nana@officeessentials.example", phone: "+233 23 555 0107", address: "Cape Coast, Ghana", status: "ACTIVE", createdAt: "2026-05-06" },
  { id: "SUP-8", name: "HomeTech Distributors", contactPerson: "Akosua Frimpong", email: "akosua@hometech.example", phone: "+233 54 555 0108", address: "Koforidua, Ghana", status: "INACTIVE", createdAt: "2026-06-13" },
  { id: "SUP-9", name: "Mobile Hub Ghana", contactPerson: "Kofi Darko", email: "kofi@mobilehub.example", phone: "+233 59 555 0109", address: "Accra, Ghana", status: "ACTIVE", createdAt: "2026-07-09" },
  { id: "SUP-10", name: "Brightline Electronics", contactPerson: "Esi Quartey", email: "esi@brightline.example", phone: "+233 28 555 0110", address: "Tamale, Ghana", status: "INACTIVE", createdAt: "2026-08-22" },
];


export const sales: Sale[] = [
  {
    id: "SAL-00124",
    product: "Wireless Mouse",
    customer: "John Mensah",
    date: "2026-10-12",
    amount: 250,
    status: "Completed",
  },
  {
    id: "SAL-00123",
    product: "USB-C Hub",
    customer: "Ama Owusu",
    date: "2026-10-12",
    amount: 420,
    status: "Pending",
  },
  {
    id: "SAL-00122",
    product: "Laptop Stand",
    customer: "Kwame Asare",
    date: "2026-10-11",
    amount: 180,
    status: "Completed",
  },
  {
    id: "SAL-00121",
    product: "Mechanical Keyboard",
    customer: "Akosua Boateng",
    date: "2026-10-11",
    amount: 650,
    status: "Cancelled",
  },
  {
    id: "SAL-00120",
    product: "USB Flash Drive",
    customer: "Kofi Addo",
    date: "2026-10-10",
    amount: 95,
    status: "Completed",
  },
];