import styles from "./ingredient-details.module.css";
import { item } from "../../utils/consts";

const IngredientDetails = ({ item }) => {
  return (
    <section className={styles.ingredientDetails}>
      <img src={item.image_large} alt={item.name} />
      <p className="text text_type_main-large">{item.name} </p>
      <span className="text text_type_main-medium">{item.text}</span>
      <ul className={styles.ingredientDetails_nutr}>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.carbohydrates}
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
