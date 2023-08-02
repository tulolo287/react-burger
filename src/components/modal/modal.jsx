import { createPortal } from 'react-dom';
import OrderDetails from '../order-details/order-details.jsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';

const Modal = ({ modalHandler }) => {
  return (
    <>
      {createPortal(
        <div className={styles.modal}>
          <CloseIcon onClick={modalHandler} type="primary" />
          <OrderDetails />
        </div>,
        document.body
      )}
    </>
  );
};
export default Modal;
