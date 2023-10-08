import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { motion } from "framer-motion";
import { FC } from "react";
import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { TIngredient } from "../../utils/types";
import styles from "./burger-item.module.css";

type TBurgerItemProps = {
  item: TIngredient;
};

const BurgerItem: FC<TBurgerItemProps> = ({ item }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });
  const navigate = useNavigate();
  const location = useLocation();

  const onItemHandler = () => {
    navigate("/ingredient/" + item._id, { state: { background: location } });
  };
  return (
    <motion.li
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{
        scale: 1.2,
        y: -10,
        backgroundColor: "#392c93",

        borderRadius: "22px",
      }}
      ref={dragRef}
      onClick={onItemHandler}
      className={styles.burgerItem}
    >
      {item.qty && <Counter count={item.qty} size="default" extraClass="m-1" />}
      <img src={item.image_large} alt={item.name} />
      <div className={styles.burgerItem_price}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default mt-2 mb-6">{item.name}</p>
    </motion.li>
  );
};

export default BurgerItem;
