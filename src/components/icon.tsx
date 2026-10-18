import type { LucideIcon } from "lucide-react"
import styles from "./icon.module.css"

type props = {
  icon: LucideIcon
}
export default function Icon ({icon: Icon}: props) {
  return (
    <div className={styles.iconBg}>
      <div className={styles.icon}>
        <div className={styles.iconContainer}>
          <Icon/>
        </div>
      </div>
    </div>
  )
}