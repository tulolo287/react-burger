import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { actions } from "../../services/actions";
import { TConstructorIngredient } from "../../utils/types";
import styles from "./burger-constructor-item.module.css";

type IConstructorIngredientProps = {
  item: TConstructorIngredient;
  idx: number;
};

const BurgerConstructorItem: FC<IConstructorIngredientProps> = (props) => {
  const { item, idx } = props;
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isHover }, drop] = useDrop({
    accept: "ingredient2",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: any) {
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

  const removeBurgerIngredient = (item: TConstructorIngredient): void => {
    dispatch({
      type: actions.REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: item,
    });
    dispatch({
      type: actions.DECREASE_INGREDIENT_QTY,
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
        handleClose={() => removeBurgerIngredient(item)}
        type="top"
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

export default BurgerConstructorItem;
