import { Fragment, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { addBuntToConstructor } from "../../services/actions/constructor";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { SORT_ORDER } from "../../utils/consts";
import { TIngredient } from "../../utils/types";
import CardOrderItem from "../card-order-item/card-order-item";
import Loader from "../ui/loader/loader";
import styles from "./card-order.module.css";

const CardOrder = memo(() => {
  const messages = useAppSelector((state) => state.wsReducer.messages);
  const ingredients = useAppSelector(getIngredientsSelector);
  const dispatch = useAppDispatch();
  const fetchMessages = useAppSelector(
    (state) => state.wsReducer.fetchMessages
  );
  const wsConnected = useAppSelector((state) => state.wsReducer.wsConnected);
  const location = useLocation();

  useEffect(() => {
    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients()).then((ingredients) => {
          ingredients && sortData(ingredients);
        });
      };
      fetchData();
    }
  }, []);

  const sortData = (ingredients: TIngredient[]) => {
    const bun = ingredients.find((item) => item.type === "bun");
    dispatch(addBuntToConstructor(bun!));
    const sortedData = ingredients
      ?.sort((a, b) => {
        return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
      })
      .map((item) => (item._id === bun?._id ? { ...item, qty: 2 } : item));
    dispatch(setSortedIngredients(sortedData));
  };

  return (
    <>
      <ul className={styles.card_orders}>
        {fetchMessages && <Loader />}
        {wsConnected &&
          !fetchMessages &&
          messages?.orders?.map((order, idx) => (
            <Fragment key={order._id}>
              <Link to={`${order?._id}`} state={{ background: location }}>
                <CardOrderItem order={order} />
              </Link>
            </Fragment>
          ))}
      </ul>
    </>
  );
});

export default CardOrder;
