import styles from "./ingredient-details.module.css";
import { item } from "../../utils/consts";

const IngredientDetails = ({ ingredientDetails }) => {

  return (
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
  );
};

IngredientDetails.propTypes = {
  item,
};
export default IngredientDetails;
