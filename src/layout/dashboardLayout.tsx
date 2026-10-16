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
} from "lucide-react";
import { useState } from "react";
import ModalProvider from "../components/contexts/ModalProvider";
import GlobalModal from "../components/globalModal";

const navigation = [
  {
    name: "Work Space",
    links: [
      { name: "Dashboard", link: "/", icon: LayoutDashboard },
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
      { name: "Customers", link: "/customers", icon: Users },
      { name: "Suppliers", link: "/suppliers", icon: Truck },
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

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  

  const toggleOpenMenu = (value: string) => {
    if(value === openMenu) return setOpenMenu(null);
    setOpenMenu(value);
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  }

  return (
    <>
      <aside className={`${styles.aside} ${collapsed? styles.collapsed : styles.expand}`}>
        <div className={styles.header}>
          <ChartNoAxesCombined/> <p className={styles.companyName}>ProdUp I & S</p>
        </div>
        <nav className={styles.uls}>
          {navigation.map(item => {
            return (
              <ul className={styles.asideNavigation}>
                <p className={styles.ulName}>{item.name}</p>
                {item.links.map(link => {
                  return (
                  <li key={link.name}>
            
                    <div>
                      <NavLink className={({ isActive }) => (isActive ? styles.active : "")} to={link.options? "sadscsa": link.link} onClick={link.options? (e) => {e.preventDefault(); toggleOpenMenu(link.name)} : undefined}>
                        <link.icon/> <p>{link.name}</p> {link.options?<ChevronRightIcon  
                        className={`${styles.dropDownIcon} ${openMenu === link.name ? styles.isOpen : ""}`}/> : ""}
                      </NavLink>
                      {link.options? 
                        <ul className={`${styles.subMenu} ${openMenu === link.name ? styles.isOpen : styles.isClosed}`}>
                        {
                          link.options.map(option => {
                            return (
                              <NavLink key={option.title} className={({ isActive }) => (isActive ? styles.active : "")} to={option.link}>
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
            JK
          </div>
          <div className={styles.profile}>
            <p>Joshua Ken</p>
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
              <div className={styles.greeting}>
                <h1><div>Hello</div> JOSH</h1>
                <span>General Manager</span>
              </div>

              <div className={styles.icon}><Bell/></div>
              <div className={styles.icon}><Settings/></div>
              <div className={styles.icon}><img src={avatar} alt="" /></div>
            </header>

            <Outlet/>
          </div>
          <GlobalModal/>
        </main>
      </ModalProvider>
    </>
  );
}

export default DashboardLayout;