import { Fragment, memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { useSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { SORT_ORDER } from "../../utils/consts";
import { TIngredient } from "../../utils/types";
import CardOrderItem from "../card-order-item/card-order-item";
import styles from "./card-order.module.css";
import Loader from "../ui/loader/loader";

const CardOrder = memo(() => {
  const messages = useSelector((state) => state.wsReducer.messages);
  const ingredients = useSelector(getIngredientsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const fetchMessages = useSelector((state) => state.wsReducer.fetchMessages);
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);
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
      {wsConnected && !fetchMessages && (
        messages?.orders?.map((order, idx) => (
          <Fragment key={order._id}>
            <Link to={`${order?._id}`} state={{ background: location }}>
              <CardOrderItem order={order} />
            </Link>
          </Fragment>
        ))
      )}
      </ul>
    </>
  );
});

export default CardOrder;
