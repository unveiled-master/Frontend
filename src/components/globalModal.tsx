import { useModal } from "./contexts/useModal";
import styles from "./GlobalModal.module.css";

export default function GlobalModal() {
  const { isOpen, closeModal, modalContent } = useModal();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={closeModal}>
      {modalContent}
    </div>
  );
}