import React from "react";
import {
  getIngredients,
  getIngredientsSelector,
} from "../../services/actions/ingredients";
import styles from "./ingredient-detail-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const IngredientDetailPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredientsSelector);
  const fetchError = useSelector(
    (state) => state.ingredientsReducer.fetchError
  );
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);

  let ingredientDetails;
  const { id } = useParams();

  const location = useLocation();

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
      {ingredientDetails && (
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
      )}

      {fetchError && "Sorry server error"}
      {isLoading && "Loading..."}
    </>
  );
};

export default IngredientDetailPage;
