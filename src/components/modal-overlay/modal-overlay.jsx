import styles from './modal-overlay.module.css'

const ModalOverlay = ({ modalHandler }) => {
  return (
    <div onClick={modalHandler} className={styles.modalOverlay}>
      
    </div>
  );
};
export default ModalOverlay;
