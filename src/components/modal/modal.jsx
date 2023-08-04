import { createPortal } from "react-dom";
import OrderDetails from "../order-details/order-details.jsx";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import { useEffect } from "react";

const Modal = ({ modalHandler, children }) => {
  useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === "Escape") {
        modalHandler(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <section className={styles.modal}>
      <div className={styles.modal_close}>
        <i>
          <CloseIcon onClick={modalHandler} type="primary" />
        </i>
      </div>
      {children}
    </section>
  );
};
export default Modal;
