import {
  Button,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { motion } from "framer-motion";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addBuntToConstructor,
  addIngredientToConstructor,
} from "../../services/actions/constructor";
import {
  increaseBunQty,
  increaseIngredientQty,
} from "../../services/actions/ingredients";
import { useAppDispatch } from "../../services/hooks";
import { TIngredient } from "../../utils/types";
import styles from "./burger-item-mobile.module.css";

type TBurgerItemProps = {
  item: TIngredient;
};

const BurgerItemMobile: FC<TBurgerItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleIngredientToConstructor = (): void => {
    if (item.type === "bun") {
      dispatch(addBuntToConstructor({ ...item, key: uuidv4() }));
      dispatch(increaseBunQty(item));
    } else {
      dispatch(addIngredientToConstructor({ ...item, key: uuidv4() }));
      dispatch(increaseIngredientQty(item));
    }
  };

  const onItemHandler = () => {
    navigate("/ingredient/" + item._id, { state: { background: location } });
  };
  return (
    <section className={styles.burger_mobile}>
      <motion.li
        whileHover={{ scale: 1.05, y: -10 }}
        whileTap={{
          scale: 1.2,
          y: -10,
          backgroundColor: "#392c93",

          borderRadius: "22px",
        }}
        data-cy="burger_item"
        onClick={onItemHandler}
        className={styles.burgerItem}
      >
        {item.qty && (
          <Counter count={item.qty} size="default" extraClass="m-1" />
        )}
        <img src={item.image_large} alt={item.name} />
        <div className={styles.burgerItem_price}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default mt-2 mb-6">{item.name}</p>
      </motion.li>
      <div className={styles.addToOrderBtn}>
        <Button
          htmlType="button"
          type="primary"
          size="small"
          data-cy="make_order"
          onClick={handleIngredientToConstructor}
        >
          Add
        </Button>
      </div>
    </section>
  );
};

export default BurgerItemMobile;
