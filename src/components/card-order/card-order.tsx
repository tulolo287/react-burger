import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getIngredientsSelector } from "../../services/actions/ingredients";
import { useSelector } from "../../services/hooks";
import { TIngredient } from "../../utils/types";
import styles from "./card-order.module.css";

type TResponse = {
  success: boolean;
};

type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
} | null;

type TCardOrderProps = {
  orders: TOrder[] | null;
};

const CardOrder = () => {
  const navigate = useNavigate();
  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const lastIngredientCount: number = 5;
  const messages = useSelector((state) => state.wsReducer.messages);



  const navigateHandler = (order: TOrder) => {
    navigate(`${order?._id}`, { state: { from: "/", order } });
  };

  return (
    <ul className={styles.card_orders}>
      {messages?.orders?.map((order, idx) => (
        <li
          onClick={() => navigateHandler(order)}
          className={styles.card_order_item}
        >
          <div className={`${styles.title} mt-6`}>
            <span>#{order?.number}</span>
            <span>{order?.createdAt}</span>
          </div>
          <h3 className={`${styles.name} mt-6`}>{order?.name}</h3>
          <div className={`${styles.info} mt-6`}>
            <div className={styles.ingredients}>
              {order?.ingredients.map((id, idx) => (
                <>
                  {idx < lastIngredientCount ? (
                    <div
                      style={{ zIndex: lastIngredientCount - idx }}
                      className={styles.ingredient_preview}
                    >
                      <img
                        src={
                          ingredients?.find((item) => item._id === id)?.image
                        }
                      />
                      {idx === lastIngredientCount - 1 &&
                      order.ingredients.length > lastIngredientCount ? (
                        <span className={styles.moreIngredients}>
                          +{order?.ingredients.length - idx - 1}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </>
              ))}
            </div>
            <div>price:</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CardOrder;
