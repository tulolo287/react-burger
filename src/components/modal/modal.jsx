import { createPortal } from 'react-dom';
import OrderDetails from '../order-details/order-details.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({modalHandler, children} ) => {
  return (
        <section className={styles.modal}>
          <div className={styles.modal_close}>
          <CloseIcon onClick={modalHandler} type="primary" /></div>
          {children}
        </section>
  );
};
export default Modal;
