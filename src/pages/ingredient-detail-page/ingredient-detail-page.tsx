import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { useSelector } from "../../services/hooks";
import { AppDispatch, State } from "../../services/types";
import { SORT_ORDER } from "../../utils/consts";
import { TIngredient } from "../../utils/types";
import styles from "./ingredient-detail-page.module.css";

const IngredientDetailPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const ingredients = useSelector(getIngredientsSelector);
  const fetchError = useSelector(
    (state: State) => state.ingredientsReducer.fetchError
  );
  const isLoading = useSelector(
    (state: State) => state.ingredientsReducer.isLoading
  );

  let ingredientDetails;
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients()).then((ingredients) => {
          ingredients && sortData(ingredients);
        });
      };
      fetchData();
    }
  }, []);

  const sortData = (ingredients: TIngredient[]) => {
    const sortedData = ingredients.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    dispatch(setSortedIngredients(sortedData));
  };

  if (ingredients) {
    ingredientDetails = ingredients.find(
      (item: TIngredient) => item._id === id
    );
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
