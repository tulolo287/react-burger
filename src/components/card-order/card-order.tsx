import { FC, Fragment, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { SORT_ORDER } from "../../utils/consts";
import { TIngredient, TMessage } from "../../utils/types";
import CardOrderItem from "../card-order-item/card-order-item";
import Loader from "../ui/loader/loader";
import styles from "./card-order.module.css";

type TCardOrder = {
  fetchMessages: boolean;
  wsConnected: boolean;
  messages: TMessage | null;
};

const CardOrder: FC<TCardOrder> = ({ fetchMessages, wsConnected, messages }) => {
  const ingredients = useAppSelector(getIngredientsSelector);
  const dispatch = useAppDispatch();

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
    const sortedData = ingredients?.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
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
}

export default CardOrder;
