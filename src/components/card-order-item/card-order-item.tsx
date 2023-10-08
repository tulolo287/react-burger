import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getIngredientsSelector } from "../../services/actions/ingredients";
import { useSelector } from "../../services/hooks";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./card-order-item.module.css";

type CardOrderItemProps = {
  order: TOrder | null;
};

const CardOrderItem: FC<CardOrderItemProps> = ({ order }) => {
  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const lastIngredientCount: number = 5;
  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const color = order?.status === "done" ? "#0CC" : "white";

  useEffect(() => {
    getInfo();
  }, [order]);

  const getInfo = () => {
    const orderIngredients = order?.ingredients.map(
      (id) => ingredients?.find((item) => item._id === id)
    );
    setOrderIngredients(orderIngredients as TIngredient[]);
    // @ts-ignore
    setOrderInfo(order);
    const total = orderIngredients
      ?.map((item) => item?.price!)
      .reduce((x, y) => (x += y), 0);
    // @ts-ignore
    setTotalPrice(total);
  };

  return (
    <li className={styles.card_order_item}>
      <div className={`${styles.title} mt-6`}>
        <span className={styles.order_number}>#{order?.number}</span>
        <p className={styles.date}>
          <FormattedDate
            date={new Date(order?.createdAt!)}
            className="text text_type_main-default text_color_inactive"
          />
        </p>
      </div>
      <h3 className={`${styles.name} mt-6`}>{order?.name}</h3>
      <p className={styles.status} style={{ color }}>
        {order?.status === "done"
          ? "Выполнен"
          : order?.status === "pending"
          ? "Готовится"
          : "Создан"}
      </p>
      <div className={`${styles.info} mt-6`}>
        <div className={styles.ingredients}>
          {order?.ingredients.map((id, idx) => (
            <Fragment key={uuidv4()}>
              {idx < lastIngredientCount ? (
                <div
                  style={{ zIndex: lastIngredientCount - idx }}
                  className={styles.ingredient_preview}
                >
                  <img
                    src={ingredients?.find((item) => item._id === id)?.image}
                  />
                  {idx === lastIngredientCount - 1 &&
                  order.ingredients.length > lastIngredientCount ? (
                    <span className={styles.moreIngredients}>
                      +{order?.ingredients.length - idx - 1}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export default CardOrderItem;
