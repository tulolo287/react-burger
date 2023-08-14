import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useContext, useReducer, useState } from "react";
import { DataContext } from "../app/app";
import { actions } from "../../services/reducer";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { v4 as uuidv4 } from "uuid";

const BurgerItem = ({ item }) => {
  const [qty, setQty] = useState(null);
  const [state, dispatch] = useContext(DataContext);
  const { isModal, openModal, closeModal, title, setTitle } = useModal();

  const onItemHandler = () => {
    setTitle("Детали ингредиента");
    openModal();

    if (item.type === "bun") {
      dispatch({ type: actions.SET_BUN, payload: item });
      dispatch({ type: actions.ADD_BUN_TO_ORDER, payload: item });
    } else {
      dispatch({ type: actions.ADD_ITEM_TO_ORDER, payload: item });
      dispatch({
        type: actions.ADD_INGREDIENT_TO_BURGER,
        payload: { ...item, key: uuidv4() },
      });
      setQty((prevQty) => (prevQty ? ++prevQty : 1));
    }
    dispatch({ type: actions.CALCULATE_TOTAL_ORDER });
  };
  return (
    <>
      <li onClick={onItemHandler} className={styles.burgerItem}>
        {qty && <Counter count={qty} size="default" extraClass="m-1" />}
        <img src={item.image_large} alt={item.name} />
        <div className={styles.burgerItem_price}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </li>

      {isModal && (
        <Modal closeModal={closeModal} title={title}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </>
  );
};

BurgerItem.propTypes = {
  item: PropTypes.object.isRequired,
  qty: PropTypes.number,
};

export default BurgerItem;
