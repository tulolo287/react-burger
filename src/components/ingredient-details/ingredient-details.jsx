import styles from "./ingredient-details.module.css";
import { item } from "../../utils/consts";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const ingredientDetails = useSelector(
    (state) => state.ingredientsReducer.ingredientDetails
  );

  return (
    <section className={styles.ingredientDetails}>
      <img src={ingredientDetails.image_large} alt={ingredientDetails.name} />
      <p className="text text_type_main-large">{ingredientDetails.name} </p>
      <span className="text text_type_main-medium">
        {ingredientDetails.text}
      </span>
      <ul className={styles.ingredientDetails_nutr}>
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
  );
};

IngredientDetails.propTypes = {
  item,
};
export default IngredientDetails;
