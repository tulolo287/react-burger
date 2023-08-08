import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div
      onClick={() => closeModal()}
      className={styles.modalOverlay}
    ></div>
  );
};
export default ModalOverlay;
