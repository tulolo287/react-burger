import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import useModal from "../../hooks/useModal";
import {
  getIngredients,
  getIngredientsSelector,
} from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { TIngredient } from "../../utils/types";
import Modal from "../modal/modal";
import styles from "./ingredient-details.module.css";

const IngredientDetails = memo(() => {
  const ingredients = useAppSelector(getIngredientsSelector);
  const dispatch: AppDispatch = useAppDispatch();
  const { id } = useParams();
  const { title, setTitle, navBack } = useModal();
  let ingredientDetails;

  useEffect(() => {
    setTitle("Детали ингредиента");
    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients());
      };
      fetchData();
    }
  }, []);

  if (ingredients) {
    ingredientDetails = ingredients.find(
      (item: TIngredient) => item._id === id
    );
  }

  return (
    <>
      {ingredientDetails && (
        <Modal closeModal={navBack} title={title}>
          <section className={styles.ingredientDetails}>
            <div className={styles.imgContainer}>
              <img
                src={ingredientDetails.image_large}
                alt={ingredientDetails.name}
              />
            </div>
            <p className={styles.name + " text text_type_main-large mt-4"}>
              {ingredientDetails.name}
            </p>
            <ul className={styles.ingredientDetails_nutr + " mt-8 mb-15"}>
              <li>
                <p className="text text_type_main-default text_color_inactive">
                  Калории, ккал
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {ingredientDetails.calories}
                </p>
              </li>
              <li>
                <p className="text text_type_main-default text_color_inactive">
                  Белки, г
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {ingredientDetails.proteins}
                </p>
              </li>
              <li>
                <p className="text text_type_main-default text_color_inactive">
                  Жиры, г
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {ingredientDetails.fat}
                </p>
              </li>
              <li>
                <p className="text text_type_main-default text_color_inactive">
                  Углеводы, г
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {ingredientDetails.carbohydrates}
                </p>
              </li>
            </ul>
          </section>
        </Modal>
      )}
    </>
  );
});

export default IngredientDetails;
