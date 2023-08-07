import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import { forwardRef, useEffect } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

const Modal = ({ modalHandler, children, modalHeader, isModal }) => {
  useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.keyCode === 27) {
        modalHandler(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <>
      {isModal
        ? createPortal(
            <>
              <ModalOverlay modalHandler={modalHandler} />
              <section className={styles.modal}>
                <div className={styles.modal_close}>
                  {modalHeader && <span>{modalHeader}</span>}
                  <i>
                    <CloseIcon
                      onClick={() => modalHandler(false)}
                      type="primary"
                    />
                  </i>
                </div>
                {children}
              </section>
            </>,
            document.getElementById("modals")
          )
        : null}
    </>
  );
};
export default Modal;
