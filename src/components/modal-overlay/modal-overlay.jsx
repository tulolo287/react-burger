import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => {
  return (
    <div onClick={() => closeModal()} className={styles.modalOverlay}></div>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
