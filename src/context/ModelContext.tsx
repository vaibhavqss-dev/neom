import { createContext, useContext, useState, ReactNode } from "react";

type ModalType = "confirm" | "vibometer" | "custom" | any;

interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType | null;
  data: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [data, setData] = useState<any>(null);

  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setData(null);
    setModalType(null);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, modalType, data, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};
