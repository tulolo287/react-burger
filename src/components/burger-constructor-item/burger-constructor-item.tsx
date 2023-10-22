import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  changeConstructorIngredient,
  removeIngredientConstructor,
} from "../../services/actions/constructor";
import { decreaseIngredientQty } from "../../services/actions/ingredients";
import { useAppDispatch } from "../../services/hooks";
import { TIngredient } from "../../utils/types";
import styles from "./burger-constructor-item.module.css";

type IConstructorIngredientProps = {
  item: TIngredient;
  idx: number;
};

const BurgerConstructorItem: FC<IConstructorIngredientProps> = (props) => {
  const { item, idx } = props;
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ isOver }, drop] = useDrop<
    IConstructorIngredientProps,
    unknown,
    { isOver: boolean }
  >({
    accept: "ingredient2",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop(item) {
      const dragIndex = item.idx;
      const hoverIndex = idx;
      dispatch(changeConstructorIngredient({ dragIndex, hoverIndex }));
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
  let borderColor = isOver ? "lightgrey" : "transparent";

  drag(drop(ref));

  const removeBurgerIngredient = (item: TIngredient): void => {
    dispatch(removeIngredientConstructor(item));
    dispatch(decreaseIngredientQty(item));
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
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};

export default BurgerConstructorItem;
