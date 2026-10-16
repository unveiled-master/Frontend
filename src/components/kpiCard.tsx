import type { LucideIcon } from "lucide-react";
import styles from "./kpiCard.module.css";
import Sparkline from "./sparkleLine";

type props = {
  title: string,
  icon: LucideIcon,
  value: string,
  change: string,
  trend: Array<number>,
  theme: string,
}

export default function KPICard ( {title, icon: Icon, value, change, trend, theme}: props) {
  return <>
    <div className={`${styles.kpiContainer} ${styles[theme]}`}>
      <div className={styles.kpiInfo}>
        <div className={styles.hero}>
          <div className={styles.iconContainer}>
            <Icon/>
          </div>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.info}>
          <div className={styles.value}>{value}</div>
          <span>{change}</span>
        </div>
      </div>
      <Sparkline data={trend}/>
    </div>
  </>
}