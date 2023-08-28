import React from "react";
import { getIngredients } from "../../services/actions/ingredients";
import styles from "./ingredient-detail-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Modal from "../../components/modal/modal";
import useModal from "../../hooks/useModal";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const IngredientDetailPage = () => {
  const dispatch = useDispatch();
  const { isModal, openModal, closeModal, title, setTitle, navBack } =
    useModal();
  const ingredients = useSelector(
    (state) => state.ingredientsReducer.ingredients,
  );
  const fetchError = useSelector(
    (state) => state.ingredientsReducer.fetchError,
  );
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);

  let ingredientDetails;
  const { id } = useParams();

  const location = useLocation();
  const modal = location.state?.modal;

  useEffect(() => {
    setTitle("Детали ингредиента");
  }, []);

  useEffect(() => {
    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients());
      };
      fetchData();
    }
  }, []);

  if (ingredients) {
    ingredientDetails = ingredients.find((item) => item._id === id);
  }

  return (
    <>
      {ingredientDetails &&
        (modal ? (
          <Modal closeModal={navBack} title={title}>
            <IngredientDetails ingredientDetails={ingredientDetails} />
          </Modal>
        ) : (
          <IngredientDetails ingredientDetails={ingredientDetails} />
        ))}

      {fetchError && "Sorry server error"}
      {isLoading && "Loading..."}
    </>
  );
};

export default IngredientDetailPage;
