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
import { wsAuthStart, wsStart } from "../../services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getIngredientsLoading } from "../../services/selectors/ingredients";
import { getOrderStatus } from "../../utils";
import { wsAllUrl, wsAuthUrl } from "../../utils/consts";
import { TIngredient, TOrder } from "../../utils/types";
import Modal from "../modal/modal";
import styles from "./feed-details-modal.module.css";

const FeedDetailsModal = memo(() => {
  const { pathname } = useLocation();
  const profile = pathname.includes("/profile") ? true : false;
  const { title, setTitle, navBack } = useModal();
  const dispatch = useAppDispatch();
  const ingredients: Array<TIngredient> | null = useAppSelector(
    getIngredientsSelector
  );
  const params = useParams();
  const [orderInfo, setOrderInfo] = useState<TOrder>();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>();
  const color = orderInfo?.status === "done" ? "#0CC" : "white";
  const isLoading = useAppSelector(getIngredientsLoading);
  const wsConnected = useAppSelector((state) =>
    profile ? state.wsReducer.wsConnectedAuth : state.wsReducer.wsConnected
  );
  const messages = useAppSelector((state) =>
    profile ? state.wsReducer.messagesAuth : state.wsReducer.messages
  );

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
    if (!wsConnected) {
      profile ? dispatch(wsAuthStart(wsAuthUrl)) : dispatch(wsStart(wsAllUrl));
    }
  }, []);

  useEffect(() => {
    getOrder();
  }, [messages]);

  const getOrder = () => {
    const order = messages?.orders?.find((item) => item?._id === params.id);
    const orderIngredients = JSON.parse(JSON.stringify(ingredients))?.filter(
      (item: TIngredient) => order?.ingredients?.some((id) => item._id === id)
    );
    orderIngredients?.forEach((item: TIngredient) => (item.qty = 0));
    order?.ingredients.forEach((id) => {
      const current = orderIngredients?.find(
        (item: TIngredient) => item._id === id
      );
      if (current?.qty !== undefined && typeof current?.qty != null) {
        current.qty += 1;
      }
    });
    setOrderIngredients(orderIngredients as TIngredient[]);
    // @ts-ignore
    setOrderInfo(order);
    let total: number = 0;
    orderIngredients?.forEach(function (item: TIngredient, index: number) {
      total += item.price * item?.qty!;
    });
    // @ts-ignore
    setTotalPrice(total);
  };

  return (
    <>
      <Modal closeModal={navBack} title={title}>
        {!isLoading && orderIngredients && (
          <div className={styles.container}>
            <h3 className={styles.title}>{orderInfo?.name}</h3>
            <p style={{ color }} className={styles.status + " mt-4"}>
              {getOrderStatus(orderInfo?.status)}
            </p>
            <div className={styles.info}></div>
            <div>
              <h2>Состав:</h2>
              <div className={styles.ingredients}>
                <ul>
                  {orderIngredients.map((item, idx) => (
                    <li key={`${item._id}_${idx}`}>
                      <div className={styles.ingredientsInfo}>
                        <div className={styles.ingredient_preview}>
                          <img src={item?.image} alt={item.name} />
                        </div>
                        <span className={styles.name}>{item?.name}</span>
                        <div className={styles.price}>
                          <p className="text text_type_digits-default mr-2">
                            {item.qty}
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
