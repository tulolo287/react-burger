import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-item.module.css";
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { actions } from "../../services/actions";
import Modal from "../modal/modal";
import useModal from "../../hooks/useModal";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

const BurgerItem = ({ item }) => {
  const dispatch = useDispatch();
  const { isModal, openModal, closeModal, title, setTitle } = useModal();

  const [ , dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  const onItemHandler = () => {
    dispatch({ type: actions.SET_INGREDIENT_DETAILS, payload: item });
    setTitle("Детали ингредиента");
    openModal();
  };
  return (
    <>
      <li ref={dragRef} onClick={onItemHandler} className={styles.burgerItem}>
        {item.qty && (
          <Counter count={item.qty} size="default" extraClass="m-1" />
        )}
        <img src={item.image_large} alt={item.name} />
        <div className={styles.burgerItem_price}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2 mb-6">{item.name}</p>
      </li>

      {isModal && (
        <Modal closeModal={closeModal} title={title}>
          <IngredientDetails />
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
