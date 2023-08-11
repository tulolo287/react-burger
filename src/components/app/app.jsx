import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { URL, item } from '../../utils/consts';
import Modal from '../modal/modal';
import useModal from '../../hooks/useModal';

export const actions = {
  CALCULATE_TOTAL_CART: 'CALCULATE_TOTAL_CART',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  ADD_ITEMS_TO_CART: 'ADD_ITEMS_TO_CART',
  SET_DATA_FROM_SERVER: 'SET_DATA_FROM_SERVER',
  SET_BUNS: 'SET_BUNS',
  SET_BUN: 'SET_BUN',
  SET_INGREDIENTS: 'SET_INGREDIENTS',
  POST_ORDER: 'POST_ORDER',
};

const initialState = {
  data: [],
  cart: [],
  buns: [],
  bun: {},
  ingredients: [],
  order: [],
  totalCartPrice: 0,
  loading: false,
};

export const DataContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'load':
      state.loading = true;
      return state;
    case 'loaded':
      state.loading = false;
      return state;
    case actions.SET_DATA_FROM_SERVER:
      return { ...state, data: action.payload };
    case actions.SET_BUNS:
      const buns = state.data.filter((item) => item.type === 'bun');
      return { ...state, buns };
    case actions.SET_BUN:
      const bun = action.payload.find((item) => item.type === 'bun');
      if (bun) {
        return { ...state, bun };
      } else return state;
    case actions.SET_INGREDIENTS:
      const ingredients = state.data.filter((item) => item.type !== 'bun');
      return { ...state, ingredients };
    case actions.CALCULATE_TOTAL_CART:
      const newTotalPrice = state.cart
        .map((item) => item.price)
        .reduce((val, acc) => val + acc * item.qty ? item.qty : 1);
      return { ...state, totalCartPrice: newTotalPrice + state.bun.price * 2 };
    case actions.ADD_ITEM_TO_CART:
      if (state.cart.find((item) => item._id === action.payload._id) == null) {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      } else
        const newCart = state.cart.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, qty: ++item.qty };
          } else return item;
        });
        return {...state, cart: newCart}
    case actions.ADD_ITEMS_TO_CART:
      return { ...state, cart: action.payload };
    case actions.POST_ORDER:
      return { ...state, order: [...state.order, action.payload] };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState(false);
  const [details, setDetails] = useState();
  const { isModal, openModal, closeModal, modalHeader, setModalHeader } =
    useModal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataFetch = async () => {
      setLoading(true);
      dispatch({ type: 'load' });
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const { data } = await response.json();
          dispatch({ type: actions.SET_DATA_FROM_SERVER, payload: data });
          dispatch({ type: actions.SET_BUNS });
          dispatch({ type: actions.SET_INGREDIENTS });
          setLoading(false);
          dispatch({ type: 'loaded' });
        } else {
          setError(true);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    dataFetch();
  }, []);

  const onItemClick = (detail) => {
    openModal();
    setDetails(detail);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        {loading && 'Loading...'}
        {error && 'Sorry server error'}
        {state.data && !loading && !error && (
          <DataContext.Provider value={[state, dispatch]}>
            <BurgerIngredients
              onItemClick={onItemClick}
              setModalHeader={setModalHeader}
            />
            <BurgerConstructor
              onItemClick={onItemClick}
              setModalHeader={setModalHeader}
            />
          </DataContext.Provider>
        )}
      </main>

      {isModal && (
        <Modal
          closeModal={closeModal}
          modalHeader={modalHeader}
          setModalHeader={setModalHeader}
        >
          {details}
        </Modal>
      )}
    </div>
  );
}

export default App;
