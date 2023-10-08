import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import { v4 } from "uuid";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { actions } from "../../services/constants";
import { useDispatch, useSelector } from "../../services/hooks";
import { startWS } from "../../utils";
import { SORT_ORDER, wsAllUrl, wsAuthUrl } from "../../utils/consts";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./feed-details.module.css";

type TOrderInfo = {
  _id: string;
  ingredients: Array<TIngredient>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TOrderIngredient = {
  img: string;

  qty: number;
  price: number;
};

const FeedDetails = memo(() => {
  const dispatch = useDispatch();
  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const messages = useSelector((state) => state.wsReducer.messages);

  const params = useParams();
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);
  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);
  const { pathname } = useLocation();
  const url = pathname.includes("/profile") ? wsAuthUrl : wsAllUrl;
  const color = orderInfo?.status === "done" ? "#0CC" : "white";

  useEffect(() => {
    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients()).then((ingredients) => {
          if (ingredients) {
            sortData(ingredients);
          }
        });
      };
      fetchData();
    }
    !wsConnected && dispatch(startWS(url));
    return function () {
      dispatch({ type: actions.WS_CONNECTION_CLOSED });
    };
  }, []);
  const sortData = (ingredients: TIngredient[]) => {
    const sortedData = ingredients?.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    dispatch(setSortedIngredients(sortedData));
  };

  useEffect(() => {
    getOrder();
  }, [messages]);

  const getOrder = () => {
    const order = messages?.orders?.find((item) => item?._id === params.id);
    const orderIngredients = order?.ingredients
      .filter((item, index) => order?.ingredients.indexOf(item) === index)
      .map((id) => ingredients?.find((item) => item._id === id));
    setOrderIngredients(orderIngredients as TIngredient[]);
    // @ts-ignore
    setOrderInfo(order);
    const total = orderIngredients
      ?.map((item) => item?.price!)
      .reduce((x, y) => x + y, 0);
    // @ts-ignore
    setTotalPrice(total);
  };

  return (
    <>
      {orderIngredients && (
        <div className={styles.container}>
          <h3 className={styles.title}>{orderInfo?.name}</h3>
          <p style={{ color }} className={styles.status + " mt-4"}>
            {orderInfo?.status === "done"
              ? "Выполнен"
              : orderInfo?.status === "pending"
              ? "Готовится"
              : "Создан"}
          </p>
          <div className={styles.info}></div>

          <div>
            <h2>Состав:</h2>

            <div className={styles.ingredients}>
              <ul>
                {orderIngredients?.map((item) => (
                  <li key={v4()}>
                    <div className={styles.ingredientsInfo}>
                      <div className={styles.ingredient_preview}>
                        <img src={item.image} />
                      </div>
                      <span className={styles.name}>{item.name}</span>
                      <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">
                          {item?.type === "bun" ? 2 : 1}
                        </p>
                        <span className="text text_type_digits-default mr-2">
                          x
                        </span>
                        <p className="text text_type_digits-default mr-2">
                          {item.price}
                        </p>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.time_price}>
            <div>
              <p className={styles.date}>
                {new Date(orderInfo?.createdAt!).toLocaleString("ru", {
                  day: "numeric",
                  month: "long",
                })}{" "}
                {new Date(orderInfo?.createdAt!).toLocaleString("ru", {
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className={styles.totalPrice}>
              <p className="text text_type_digits-default mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
      {isLoading && "Loading..."}
    </>
  );
});

export default FeedDetails;
