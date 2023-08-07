import { useState } from "react";

const useModal = (Wrapper) => {
  const [isModal, setIsModal] = useState(false);

  function modalHandler(modal) {
    setIsModal(modal);
  }

  return {
    isModal,
    modalHandler,
  };
};

export default useModal;
