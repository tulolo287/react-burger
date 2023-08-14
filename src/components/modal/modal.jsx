import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { forwardRef, useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

const Modal = ({ closeModal, children, title }) => {
  useEffect(() => {
    const handleEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <section className={styles.modal}>
        <div className={styles.modal_close}>
          {title && <h2>{title}</h2>}
          <i>
            <CloseIcon onClick={() => closeModal()} type="primary" />
          </i>
        </div>
        {children}
      </section>
    </>,
    document.getElementById('modals')
  );
};
export default Modal;
