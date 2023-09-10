import { FC } from "react";
import styles from "./modal-overlay.module.css";

interface ModalOverlayProps {
  closeModal: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ closeModal }) => {
  return (
    <div onClick={() => closeModal()} className={styles.modalOverlay}></div>
  );
};

export default ModalOverlay;
