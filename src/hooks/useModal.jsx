import { useState } from "react";

const useModal = (Wrapper) => {
  const [isModal, setIsModal] = useState(false);
  const [modalHeader, setModalHeader] = useState(false);


  function modalHandler(modal) {
    setIsModal(modal);
  }

  return {
    isModal,
    modalHandler,
    modalHeader,
    setModalHeader
  };
};



export default useModal;
