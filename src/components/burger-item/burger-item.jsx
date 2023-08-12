import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useContext, useReducer, useState } from "react";
import { DataContext } from "../app/app";
import { actions } from "../../reducer";

const BurgerItem = ({ item, onItemClick, setModalHeader }) => {
  const [qty, setQty] = useState(null);
  const [state, dispatch] = useContext(DataContext);

  const onItemHandler = () => {
    setModalHeader("Детали ингредиента");
    onItemClick(<IngredientDetails item={item} />);
    if (item.type === "bun") {
      dispatch({ type: actions.SET_BUN, payload: item });
      dispatch({ type: actions.ADD_BUN_TO_CART, payload: item });
    } else {
      dispatch({ type: actions.ADD_ITEM_TO_CART, payload: item });
      dispatch({ type: actions.ADD_INGREDIENT, payload: item });
      setQty((prevQty) => (prevQty ? ++prevQty : 1));
    }
    dispatch({ type: actions.CALCULATE_TOTAL_CART });
  };
  return (
    <li onClick={onItemHandler} className={styles.burgerItem}>
      {qty && <Counter count={qty} size="default" extraClass="m-1" />}
      <img src={item.image_large} alt={item.name} />
      <div className={styles.burgerItem_price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </li>
  );
};

BurgerItem.propTypes = {
  item: PropTypes.object.isRequired,
  qty: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
};

export default BurgerItem;
