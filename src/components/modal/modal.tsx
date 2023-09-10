import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

interface IModalProps {
  closeModal: () => void;
  children: React.ReactNode;
  title?: string | null;
  height?: number;
}

const Modal: FC<IModalProps> = ({ closeModal, children, title, height }) => {
  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <section style={{ height }} className={styles.modal}>
        <div className={styles.title_button}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <i>
            <CloseIcon onClick={() => closeModal()} type="primary" />
          </i>
        </div>
        {children}
      </section>
    </>,
    document.getElementById("modals") as HTMLDivElement
  );
};
export default Modal;
