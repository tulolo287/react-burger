import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardOrder from "../../components/card-order/card-order";
import OrdersTotal from "../../components/orders-total/orders-total";
import { actions } from "../../services/constants";
import styles from "./feed.module.css";
import { useSelector } from "../../services/hooks";
import { getOrders } from "../../services/actions/wsActions";
import {
  getIngredients,
  getIngredientsSelector,
  getSortedIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { AssociativeArray, TIngredient } from "../../utils/types";
import { AppDispatch, State } from "../../services/types";
import { SORT_ORDER, TYPES } from "../../utils/consts";


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
};

type TResponseOrders = {
  orders: TOrder[];
  total: number;
  totalToday: number;
} & TResponse;

const Feed = () => {
 // const [orders, setOrders] = useState<Array<TOrder> | null>(null);
    const ingredients = useSelector(getIngredientsSelector);

  const [ordersDone, setOrdersDone] = useState<Array<TOrder> | null>(null);
  const [ordersInWork, setOrdersInWork] = useState<Array<TOrder> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(state => state.wsReducer.messages)
  
 const fetchError = useSelector(
    (state: State) => state.ingredientsReducer.fetchError
  );
  const isLoading = useSelector(
    (state: State) => state.ingredientsReducer.isLoading
  );

  useEffect(() => {
     getOrders("wss://norma.nomoreparties.space/orders/all")
    
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


const getOrders = async (url:string) => {
  dispatch({ type: actions.WS_CONNECTION_START, payload: url});
}
  

  return (
    <div>
      <h2 className={styles.header}>Лента заказов</h2>
      <section className={styles.content}>
        <article className={`${styles.orders} mr-15`}>
          <CardOrder  />
        </article>
        <article className={styles.orders_total}>
         <OrdersTotal/>
        </article>
      </section>
    </div>
  );
};

export default Feed;
