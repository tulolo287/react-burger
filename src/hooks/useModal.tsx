import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const navBack = useCallback(() => {
    navigate(-1);
  }, []);

  return {
    isModal,
    openModal,
    closeModal,
    title,
    setTitle,
    navBack
  };
};

export default useModal;
