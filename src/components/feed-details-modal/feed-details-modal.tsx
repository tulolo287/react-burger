import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useModal from "../../hooks/useModal";
import {
  getIngredients,
  getIngredientsSelector,
} from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "../../services/hooks";
import Modal from "../modal/modal";
import styles from "./feed-details-modal.module.css";

import { useLocation } from "react-router-dom";
import { v4 } from "uuid";
import { getUser } from "../../services/actions/auth";
import { actions } from "../../services/constants";
import { getYesterday } from "../../utils";
import { TIngredient, TOrder } from "../../utils/types";
import { getMessages } from "../../services/selectors/wsSelectors";
import { getIngredientsLoading } from "../../services/selectors/ingredients";

const FeedDetailsModal = () => {
  const { title, setTitle, navBack } = useModal();

  const dispatch = useDispatch();
  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const messages = useSelector(getMessages);

  const user = useSelector(getUser);
  const params = useParams();
  const location = useLocation();

  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const color = orderInfo?.status === "done" ? "#0CC" : "white";

  const isLoading = useSelector(getIngredientsLoading);

  useEffect(() => {
    startWS(location.state.wsUrl);

    if (!ingredients) {
      const fetchData = async () => {
        dispatch(getIngredients()).then((ingredients) => {
          if (ingredients) {
            getOrder();
          }
        });
      };
      fetchData();
    }
    getOrder();
    return function () {
      dispatch({ type: actions.WS_CONNECTION_CLOSE });
    };
  }, []);

  useEffect(() => {
    const setUser = async () => {
      if (!user) {
        dispatch(getUser()).then((user) => getOrder());
      }
    };
    setUser();
  }, []);

  useEffect(() => {
    getOrder();
  }, [messages]);

  const startWS = async (url: string) => {
    dispatch({ type: actions.WS_CONNECTION_START, url });
  };
  const getOrder = () => {
    const order = messages?.orders?.find((item) => item?._id === params.id);
    const orderIngredients = order?.ingredients.map(
      (id) => ingredients?.find((item) => item._id === id)
    );

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
      <Modal closeModal={navBack} title={title}>
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
                          <img src={item?.image} />
                        </div>
                        <span className={styles.name}>{item?.name}</span>
                        <div className={styles.price}>
                          <p className="text text_type_digits-default mr-2">
                            {item?.type === "bun" ? 2 : 1}
                          </p>
                          <span className="text text_type_digits-default mr-2">
                            x
                          </span>
                          <p className="text text_type_digits-default mr-2">
                            {item?.price}
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
                  {getYesterday(orderInfo?.createdAt!)
                    ? "Вчера,"
                    : new Date(orderInfo?.createdAt!).toLocaleString("ru", {
                        day: "numeric",
                        month: "long",
                      })}{" "}
                  {new Date(orderInfo?.createdAt!).toLocaleString("ru", {
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className={styles.totalPrice}>
                <p className="text text_type_digits-default mr-2">
                  {totalPrice}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        )}
        {isLoading && "Loading..."}
      </Modal>
    </>
  );
};

export default FeedDetailsModal;
