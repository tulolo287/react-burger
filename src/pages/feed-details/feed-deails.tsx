import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useEffect, useState } from "react";

import { useLocation, useParams } from "react-router-dom";
import {
  getIngredients,
  getIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { wsAuthStart, wsStart } from "../../services/actions/wsActions";
import { wsActions } from "../../services/constants/wsConsts";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { SORT_ORDER, wsAllUrl, wsAuthUrl } from "../../utils/consts";
import { TIngredient, TOrder } from "../../utils/types";
import styles from "./feed-details.module.css";

const FeedDetails = memo(() => {
  const { pathname } = useLocation();
  const profile = pathname.includes("/profile") ? true : false;
  const params = useParams();
  const dispatch = useAppDispatch();
  const ingredients: Array<TIngredient> | null = useAppSelector(
    getIngredientsSelector
  );
  const wsConnected = useAppSelector((state) =>
    profile ? state.wsReducer.wsConnectedAuth : state.wsReducer.wsConnected
  );
  const messages = useAppSelector((state) =>
    profile ? state.wsReducer.messagesAuth : state.wsReducer.messages
  );
  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const isLoading = useAppSelector(
    (state) => state.ingredientsReducer.isLoading
  );

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
    if (!wsConnected) {
      profile ? dispatch(wsAuthStart(wsAuthUrl)) : dispatch(wsStart(wsAllUrl));
    }
    return function () {
      if (wsConnected) {
        profile
          ? dispatch({ type: wsActions.WS_AUTH_CONNECTION_CLOSE })
          : dispatch({ type: wsActions.WS_CONNECTION_CLOSE });
      }
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
                {orderIngredients?.map((item, idx) => (
                  <li key={`${item._id}_${idx}`}>
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
