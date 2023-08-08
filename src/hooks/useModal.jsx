import { useCallback, useState } from 'react';

const useModal = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(false);

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
    modalHeader,
    setModalHeader,
  };
};

export default useModal;
