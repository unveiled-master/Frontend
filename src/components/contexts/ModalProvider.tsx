
import { useState, type ReactNode } from "react";
import ModalContext from "./modalContext";


export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };


  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };


  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalContent}}>
      {children}
    </ModalContext.Provider>
  );
}