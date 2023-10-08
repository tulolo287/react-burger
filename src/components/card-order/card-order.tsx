import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { actions } from "../../services/constants";
import { useSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";
import { SORT_ORDER } from "../../utils/consts";
import { TIngredient } from "../../utils/types";
import CardOrderItem from "../card-order-item/card-order-item";
import styles from "./card-order.module.css";

const CardOrder = ({ wsUrl }: { wsUrl: string }) => {
  const messages = useSelector((state) => state.wsReducer.messages);
  const ingredients = useSelector(getIngredientsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const fetchMessages = useSelector((state) => state.wsReducer.fetchMessages);
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);

  useEffect(() => {
    startWS(wsUrl);

    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients()).then((ingredients) => {
          ingredients && sortData(ingredients);
        });
      };
      fetchData();
    }
    return function () {
      dispatch({ type: actions.WS_CONNECTION_CLOSE });
    };
  }, []);
  const sortData = (ingredients: TIngredient[]) => {
    const sortedData = ingredients?.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    dispatch(setSortedIngredients(sortedData));
  };

  const startWS = async (url: string) => {
    dispatch({ type: actions.WS_CONNECTION_START, url });
  };

  return (
    <>
      {wsConnected && !fetchMessages && (
        <ul className={styles.card_orders}>
          {messages?.orders?.map((order, idx) => (
            <Fragment key={uuidv4()}>
              <CardOrderItem order={order} wsUrl={wsUrl} />
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
};

export default CardOrder;
