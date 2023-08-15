import { useCallback, useState } from "react";

const useModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [title, setTitle] = useState("");

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  return {
    isModal,
    openModal,
    closeModal,
    title,
    setTitle,
  };
};

export default useModal;
