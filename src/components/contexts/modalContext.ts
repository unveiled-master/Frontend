import { createContext, type ReactNode } from "react";

export type ModalContextType = {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
};

const ModalContext = createContext<ModalContextType | null>(null);
export default ModalContext;
