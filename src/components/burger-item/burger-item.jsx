import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useContext, useReducer } from "react";
import { DataContext, actions } from "../app/app";

const BurgerItem = ({ item, qty, onItemClick, setModalHeader }) => {
  const [state, diispatch] = useContext(DataContext)
  const onItemHandler = () => {
    setModalHeader("Детали ингредиента")
    onItemClick(<IngredientDetails item={item}/>)
    diispatch({type: actions.ADD_ITEM_TO_CART, payload: item})
    console.log(state.cart)
  }
  return (
    <li
      onClick={onItemHandler}
      className={styles.burgerItem}
    >
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
