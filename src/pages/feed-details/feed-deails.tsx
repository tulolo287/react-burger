import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getIngredientsSelector } from "../../services/actions/ingredients";
import { TIngredient } from "../../utils/types";
import styles from "./feed-details.module.css";

const FeedDetails = () => {
  type TOrder = {
    _id: string;
    ingredients: Array<string>;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
  } | null;

  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const params = useParams();
  console.log("PPP", params);
  const { state } = useLocation();
  const order: TOrder = state.order;
  console.log("LLLL", state);

  const [price, setPrice] = useState<number>();

  useEffect(() => {
    let total = 0;
    order?.ingredients.map((id) => {
      ingredients?.find((item) => {
        if (item._id === id) {
          total += item.price * (item.qty || 1);
          setPrice(total);
        }
      });
    });
    //  const orderDetail = ingredients.find((item) => item._id === params.id);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>{state.order.number}</h3>
      </div>
      <div className={styles.info}>
        <h2>{state.order.name}</h2>
        <span>{state.order.status}</span>
      </div>
      <div className={styles.ingredients}>
        <h2>Состав:</h2>
        <ul>
          <div className={styles.ingredients}>
            {order?.ingredients.map((id) => (
              <div className={styles.ingredient_preview}>
                <img
                  src={ingredients?.find((item) => item._id === id)?.image}
                />
              </div>
            ))}
            <div className={styles.burgerItem_price}>
              <p className="text text_type_digits-default mr-2">{price}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </ul>
      </div>
      <div className={styles.time_price}></div>
    </div>
  );
};

export default FeedDetails;
