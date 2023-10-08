import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { memo, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useModal from "../../hooks/useModal";
import {
  getIngredients,
  getIngredientsSelector,
} from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "../../services/hooks";
import Modal from "../modal/modal";
import styles from "./feed-details-modal.module.css";

import { v4 } from "uuid";
import { getUser } from "../../services/selectors/auth";
import { getIngredientsLoading } from "../../services/selectors/ingredients";
import { getMessages } from "../../services/selectors/wsSelectors";
import { startWS } from "../../utils";
import { wsAllUrl, wsAuthUrl } from "../../utils/consts";
import { TIngredient, TOrder } from "../../utils/types";

const FeedDetailsModal = memo(() => {
  const { title, setTitle, navBack } = useModal();
  const dispatch = useDispatch();
  const ingredients: Array<TIngredient> | null = useSelector(
    getIngredientsSelector
  );
  const messages = useSelector(getMessages);
  const user = useSelector(getUser);
  const params = useParams();
  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<
    TIngredient[] | null
  >(null);
  const color = orderInfo?.status === "done" ? "#0CC" : "white";
  const isLoading = useSelector(getIngredientsLoading);
  const wsConnected = useSelector((state) => state.wsReducer.wsConnected);
  const { pathname } = useLocation();
  const url = pathname.includes("/profile") ? wsAuthUrl : wsAllUrl;

  useEffect(() => {
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
    !wsConnected && dispatch(startWS(url));
  }, []);

  useEffect(() => {
    const setUser = async () => {
      if (!user) {
        //dispatch(getUser(store.getState())).then((user: any) => getOrder());
      }
    };
    setUser();
  }, []);

  useEffect(() => {
    getOrder();
  }, [messages]);

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
                  <FormattedDate
                    date={new Date(orderInfo?.createdAt!)}
                    className="text text_type_main-default text_color_inactive"
                  />
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
});

export default FeedDetailsModal;
