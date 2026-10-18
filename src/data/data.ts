export type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

export type Product = {
  id: string
  img: string
  supplier: string
  category: string
  name: string
  sku: string
  barcode: string
  description: string
  costPrice: number
  sellingPrice: number
  currentStock: number
  reservedStock: number
  minimumStock: number
  status: "Active" | "Inactive"
  createdAt: string
}


export type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: "Active" | "Inactive";
  createdAt: string;
};

export const Categories: Category[] = [
  {
    id: "CAT-1",
    name: "Electronics",
    description: "Electronic devices and accessories",
    productCount: 145,
    status: "Active",
    createdAt: "2026-01-12",
  },
  {
    id: "CAT-2",
    name: "Computer Accessories",
    description: "Keyboards, mice, cables, and adapters",
    productCount: 86,
    status: "Active",
    createdAt: "2026-02-03",
  },
  {
    id: "CAT-3",
    name: "Mobile Phones",
    description: "Smartphones and mobile devices",
    productCount: 52,
    status: "Active",
    createdAt: "2026-02-15",
  },
  {
    id: "CAT-4",
    name: "Office Supplies",
    description: "Stationery and everyday office essentials",
    productCount: 73,
    status: "Active",
    createdAt: "2026-03-08",
  },
  {
    id: "CAT-5",
    name: "Home Appliances",
    description: "Small household electrical appliances",
    productCount: 41,
    status: "Active",
    createdAt: "2026-04-21",
  },
  {
    id: "CAT-6",
    name: "Cables & Connectors",
    description: "USB cables, HDMI cables, and connectors",
    productCount: 0,
    status: "Inactive",
    createdAt: "2026-05-10",
  },
  {
    id: "CAT-7",
    name: "Storage Devices",
    description: "Flash drives, memory cards, and external drives",
    productCount: 34,
    status: "Active",
    createdAt: "2026-06-02",
  },
  {
    id: "CAT-8",
    name: "Audio Equipment",
    description: "Headphones, speakers, and microphones",
    productCount: 29,
    status: "Active",
    createdAt: "2026-07-17",
  },
];

export const Products: Product[] = [
  {
    id: "prod-001",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80",
    supplier: "TechSource Ghana",
    category: "Laptops",
    name: "HP EliteBook 840 G8",
    sku: "LAP-HP-001",
    barcode: "6001234567890",
    description: "14-inch business laptop with Intel Core i5 processor",
    costPrice: 4200,
    sellingPrice: 4800,
    currentStock: 15,
    reservedStock: 2,
    minimumStock: 5,
    status: "Active",
    createdAt: "2026-09-10T09:30:00.000Z",
  },
  {
    id: "prod-002",
    img: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=400&q=80",
    supplier: "Digital Supplies Ltd",
    category: "Accessories",
    name: "Logitech Wireless Mouse",
    sku: "MOU-LOG-002",
    barcode: "6001234567891",
    description: "Compact wireless optical mouse",
    costPrice: 85,
    sellingPrice: 120,
    currentStock: 40,
    reservedStock: 5,
    minimumStock: 10,
    status: "Active",
    createdAt: "2026-09-12T11:00:00.000Z",
  },
  {
    id: "prod-003",
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
    supplier: "TechSource Ghana",
    category: "Monitors",
    name: "Dell Full HD Monitor",
    sku: "MON-DEL-003",
    barcode: "6001234567892",
    description: "24-inch Full HD monitor for office use",
    costPrice: 1350,
    sellingPrice: 1550,
    currentStock: 8,
    reservedStock: 1,
    minimumStock: 4,
    status: "Active",
    createdAt: "2026-09-15T10:00:00.000Z",
  },
  {
    id: "prod-004",
    img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=400&q=80",
    supplier: "ConnectPro Ltd",
    category: "Accessories",
    name: "USB-C Multiport Hub",
    sku: "HUB-USC-004",
    barcode: "6001234567893",
    description: "USB-C hub for connecting multiple devices",
    costPrice: 180,
    sellingPrice: 250,
    currentStock: 3,
    reservedStock: 1,
    minimumStock: 8,
    status: "Active",
    createdAt: "2026-09-20T13:20:00.000Z",
  },
  {
    id: "prod-005",
    img: "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?auto=format&fit=crop&w=400&q=80",
    supplier: "Storage World",
    category: "Storage",
    name: "USB Flash Drive 128GB",
    sku: "USB-128-005",
    barcode: "6001234567894",
    description: "Portable USB flash drive for file storage",
    costPrice: 90,
    sellingPrice: 130,
    currentStock: 0,
    reservedStock: 0,
    minimumStock: 10,
    status: "Inactive",
    createdAt: "2026-09-22T08:45:00.000Z",
  },
  {
    id: "prod-006",
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80",
    supplier: "Digital Supplies Ltd",
    category: "Keyboards",
    name: "Mechanical Keyboard",
    sku: "KEY-MEC-006",
    barcode: "6001234567895",
    description: "Wired mechanical keyboard for office and gaming",
    costPrice: 350,
    sellingPrice: 450,
    currentStock: 12,
    reservedStock: 3,
    minimumStock: 5,
    status: "Active",
    createdAt: "2026-09-25T15:10:00.000Z",
  },
  {
    id: "prod-007",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80",
    supplier: "Network Solutions",
    category: "Networking",
    name: "TP-Link Wi-Fi Router",
    sku: "RTR-TPL-007",
    barcode: "6001234567896",
    description: "Dual-band wireless router for home and office",
    costPrice: 500,
    sellingPrice: 650,
    currentStock: 6,
    reservedStock: 0,
    minimumStock: 3,
    status: "Active",
    createdAt: "2026-09-28T09:00:00.000Z",
  },
  {
    id: "prod-008",
    img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80",
    supplier: "Storage World",
    category: "Storage",
    name: "Portable External SSD",
    sku: "SSD-EXT-008",
    barcode: "6001234567897",
    description: "Portable solid-state drive for fast file transfers",
    costPrice: 950,
    sellingPrice: 1150,
    currentStock: 4,
    reservedStock: 1,
    minimumStock: 5,
    status: "Active",
    createdAt: "2026-10-01T11:30:00.000Z",
  },
  {
    id: "prod-009",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=400&q=80",
    supplier: "AudioTech Ghana",
    category: "Audio",
    name: "Portable Bluetooth Speaker",
    sku: "SPK-BT-009",
    barcode: "6001234567898",
    description: "Compact Bluetooth speaker for portable audio",
    costPrice: 220,
    sellingPrice: 300,
    currentStock: 22,
    reservedStock: 4,
    minimumStock: 6,
    status: "Active",
    createdAt: "2026-10-04T14:00:00.000Z",
  },
  {
    id: "prod-010",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
    supplier: "AudioTech Ghana",
    category: "Headphones",
    name: "Wireless Headphones",
    sku: "AUD-WRL-010",
    barcode: "6001234567899",
    description: "Over-ear wireless headphones for music and calls",
    costPrice: 280,
    sellingPrice: 380,
    currentStock: 9,
    reservedStock: 2,
    minimumStock: 4,
    status: "Active",
    createdAt: "2026-10-06T16:20:00.000Z",
  },
];

export const Suppliers: Supplier[] = [
  { id: "SUP-1", name: "TechSource Ghana", contactPerson: "Kwame Mensah", email: "kwame@techsource.example", phone: "+233 20 555 0101", address: "Accra, Ghana", status: "Active", createdAt: "2026-01-15" },
  { id: "SUP-2", name: "Digital Supplies Ltd", contactPerson: "Ama Boateng", email: "ama@digitalsupplies.example", phone: "+233 24 555 0102", address: "Tema, Ghana", status: "Active", createdAt: "2026-02-04" },
  { id: "SUP-3", name: "ConnectPro Ltd", contactPerson: "Kojo Asante", email: "kojo@connectpro.example", phone: "+233 50 555 0103", address: "Kumasi, Ghana", status: "Active", createdAt: "2026-02-20" },
  { id: "SUP-4", name: "Storage World", contactPerson: "Abena Owusu", email: "abena@storageworld.example", phone: "+233 27 555 0104", address: "Accra, Ghana", status: "Active", createdAt: "2026-03-11" },
  { id: "SUP-5", name: "Network Solutions", contactPerson: "Yaw Osei", email: "yaw@networksolutions.example", phone: "+233 55 555 0105", address: "Takoradi, Ghana", status: "Active", createdAt: "2026-04-02" },
  { id: "SUP-6", name: "AudioTech Ghana", contactPerson: "Efua Agyeman", email: "efua@audiotech.example", phone: "+233 26 555 0106", address: "Accra, Ghana", status: "Active", createdAt: "2026-04-18" },
  { id: "SUP-7", name: "Office Essentials GH", contactPerson: "Nana Addo", email: "nana@officeessentials.example", phone: "+233 23 555 0107", address: "Cape Coast, Ghana", status: "Active", createdAt: "2026-05-06" },
  { id: "SUP-8", name: "HomeTech Distributors", contactPerson: "Akosua Frimpong", email: "akosua@hometech.example", phone: "+233 54 555 0108", address: "Koforidua, Ghana", status: "Inactive", createdAt: "2026-06-13" },
  { id: "SUP-9", name: "Mobile Hub Ghana", contactPerson: "Kofi Darko", email: "kofi@mobilehub.example", phone: "+233 59 555 0109", address: "Accra, Ghana", status: "Active", createdAt: "2026-07-09" },
  { id: "SUP-10", name: "Brightline Electronics", contactPerson: "Esi Quartey", email: "esi@brightline.example", phone: "+233 28 555 0110", address: "Tamale, Ghana", status: "Inactive", createdAt: "2026-08-22" },
];
