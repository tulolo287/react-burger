import { FC } from "react";
import {useSelector} from "../../services/hooks"
import { Link } from "react-router-dom";
import { getIngredientsSelector } from "../../services/actions/ingredients";
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

type TResponseOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
} & TResponse;

const CardOrder: FC<TCardOrderProps> = ({ orders }) => {
  const ingredients: Array<TIngredient> = useSelector(getIngredientsSelector);
  const lastIngredientCount: number = 5;

  return (
    <>
      {orders?.map((order, idx) => (
        <Link to={`/feed/${order?._id}`}>
          <div className={styles.card_order}>
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
                            ingredients.find((item) => item._id === id)?.image
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
          </div>
        </Link>
      ))}
    </>
  );
};

export default CardOrder;
