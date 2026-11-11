import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./dashboardLayout.module.css";
import avatar from "../assets/avatar.jpg";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Tags,
  Users,
  Truck,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
  ChevronLeft,
  ChevronRightIcon,
  Bell,
  LineDotRightHorizontal,
  Menu,
} from "lucide-react";
import { useState } from "react";
import ModalProvider from "../components/contexts/ModalProvider";
import GlobalModal from "../components/globalModal";
import { ApiService } from "../services/api.service";

const navigation = [
  {
    name: "Work Space",
    links: [
      { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
      { name: "Sales",
        link: "/sales",
        icon: ShoppingCart,
        options: [
          {
            title: "Make Sale",
            link: "/make-sale"
          },
          {
            title: "Sales Record",
            link: "/sales"
          },
        ]
      },
      {
        name: "Products",
        link: "/products",
        icon: Package,
        options: [
          {
            title: "Create Product",
            link: "/create-product"
          },
          {
            title: "List Products",
            link: "/products"
          },
        ]
      },
      { name: "Inventory", link: "/inventory", icon: Warehouse },
      { name: "Categories", link: "/categories", icon: Tags },
    ],
  },
  {
    name: "Management",
    links: [
      {
        name: "Customers",
        link: "/customers",
        icon: Users,
        options: [
          { title: "Add Customer", link: "/create-customer" },
          { title: "Manage Customers", link: "/customers" },
        ],
      },
      {
        name: "Suppliers",
        link: "/suppliers",
        icon: Truck,
        options: [
          { title: "Add Supplier", link: "/create-supplier" },
          { title: "Manage Suppliers", link: "/suppliers" },
        ],
      },
      { name: "Reports", link: "/reports", icon: ChartNoAxesCombined },
    ],
  },
  {
    name: "General",
    links: [
      { name: "Settings", link: "/settings", icon: Settings },
      { name: "Help & Support", link: "/help", icon: CircleHelp },
    ],
  },
];

const service = new ApiService();
const user = JSON.parse(localStorage.getItem("user")!);
console.log(user)

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [profileMenuIsOpen, setOpen] = useState<boolean>(false);

  const openProfileMenu = () => {
    setOpen(!profileMenuIsOpen);
  }
  

  const toggleOpenMenu = (value: string) => {
    if(value === openMenu) return setOpenMenu(null);
    setOpenMenu(value);
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  const user = JSON.parse(localStorage.getItem("user")!);

  return (
    <>
      <aside className={`${styles.aside} ${collapsed? styles.collapsed : styles.expand}`}>
        <div className={styles.header}>
          <ChartNoAxesCombined/> <p className={styles.companyName}>ProdUp I & S</p>
        </div>
        <nav className={styles.uls}>
          {navigation.map(item => {
            return (
              <ul className={styles.asideNavigation} key={item.name}>
                <p className={styles.ulName}>{item.name}</p>
                {item.links.map(link => {
                  return (
                  <li key={link.name}>
            
                    <div>
                      <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to={link.options? "sadscsa": link.link} onClick={link.options? (e) => {e.preventDefault(); toggleOpenMenu(link.name); } : () => {setCollapsed(true)}}>
                        <link.icon/> <p>{link.name}</p> {link.options?<ChevronRightIcon  
                        className={`${styles.dropDownIcon} ${openMenu === link.name ? styles.isOpen : ""}`}/> : ""}
                      </NavLink>
                      {link.options? 
                        <ul className={`${styles.subMenu} ${openMenu === link.name ? styles.isOpen : styles.isClosed}`}>
                        {
                          link.options.map(option => {
                            return (
                              <NavLink key={option.title} className={({ isActive }) => (isActive ? styles.active : "")} to={option.link} onClick={() => {setCollapsed(true)}}>
                                <LineDotRightHorizontal/> <p>{option.title}</p>
                              </NavLink>
                            )
                          })
                        }
                      </ul>
                      :
                      ""
                      }
                    </div>
                  </li>
                  )
                })}
              </ul>
            )
          })}
        </nav>
        <ul className={styles.asideFooter}>
          <div className={styles.avatar}>
            {user.name.split(" ")[0][0]}{user.name.split(" ")[1][0]}
          </div>
          <div className={styles.profile}>
            <p>{user.name}</p>
            <p>General Management</p>
          </div>
        </ul>
        <button className={styles.collapseToggle} onClick={toggleCollapse}>
          {collapsed?<ChevronRightIcon/>:<ChevronLeft/>}
        </button>
      </aside>

      
      <ModalProvider>
        <main className={styles.main}>
        
          <div className={styles.mainContent}>
            <header className={styles.mainContentNav}>
              <span className={styles.hamIcon} onClick={() => {setCollapsed(!collapsed)}}>
                <Menu/>
              </span>
              <div className={styles.greeting}>
                <h1><div>Hello </div> {user.name.split(" ")[0]}</h1>
                <span>General Manager</span>
              </div>

              <div className={styles.icon}><Bell/></div>
              <div className={styles.icon}><Settings/></div>
              <div className={`${styles.icon} ${styles.profileImg}`}>
                <img src={avatar} alt="" onClick={openProfileMenu}/>
                {profileMenuIsOpen && (
                  <div className={styles.profileDropDown}>
                    <button className={styles.signOut} onClick={service.logout}>Sign Out</button>
                  </div>
                )}
              </div>
            </header>

            <Outlet/>
          </div>
        </main>
        <GlobalModal/>
      </ModalProvider>
    </>
  );
}

export default DashboardLayout;
