import { useRef } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop, useDrag } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { actions } from "../../services/actions";

const BurgerConstructorItem = ({ item, idx }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient2",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      const dragIndex = item.idx;
      const hoverIndex = idx;
      dispatch({
        type: actions.CHANGE_CONSTRUCTOR_INGREDIENT,
        payload: { dragIndex, hoverIndex },
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient2",
    item: () => ({ item, idx }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  let opacity = isDragging ? 0 : 1;
  let borderColor = isHover ? "lightgrey" : "transparent";

  drag(drop(ref));

  const removeBurgerIngredient = (e, item) => {
    dispatch({
      type: actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: item,
    });
    dispatch({
      type: actions.DECREASE_INGREDIET_QTY,
      payload: item,
    });
  };

  return (
    <li
      style={{ opacity, borderColor }}
      ref={ref}
      className={styles.burgerConstructor_item_move}
    >
      <i>
        <DragIcon type="primary" />
      </i>
      <ConstructorElement
        handleClose={(e) => removeBurgerIngredient(e, item)}
        type="center"
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  item: PropTypes.object.isRequired,
  idx: PropTypes.number,
};

export default BurgerConstructorItem;
