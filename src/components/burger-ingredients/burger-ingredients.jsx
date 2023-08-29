import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState, Fragment, useMemo } from "react";
import BurgerItem from "../burger-item/burger-item";
import styles from "./burger-ingredients.module.css";
import { SORT_ORDER, TYPES, ingredients } from "../../utils/consts";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../../services/actions";
import {
  getIngredients,
  getIngredientsSelector,
  getSortedIngredientsSelector,
} from "../../services/actions/ingredients";

let currentType = "";
let categoryRefs = [];

const BurgerIngredients = () => {
  const ingredients = useSelector(getIngredientsSelector);
  const sortedIngredients = useSelector(getSortedIngredientsSelector);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("bun");
  const fetchError = useSelector(
    (state) => state.ingredientsReducer.fetchError,
  );
  const isLoading = useSelector((state) => state.ingredientsReducer.isLoading);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getIngredients()).then((ingredients) => {
        if (ingredients) {
          sortData(ingredients);
        }
      });
    };
    if (!ingredients) {
      fetchData();
    }
  }, []);

  const sortData = (ingredients) => {
    const sortedData = ingredients.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    dispatch({ type: actions.SET_SORTED_INGREDIENTS, payload: sortedData });
  };

  useEffect(() => {
    if (categoryRefs[current]) {
      categoryRefs[current].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [current]);

  const getTypes = useMemo(() => {
    let types = [];
    ingredients &&
      ingredients
        .map((item) => item.type)
        .filter((val, idx, arr) => {
          if (arr.indexOf(val) === idx) {
            types.push({ type: val, name: TYPES[val].name });
          }
        });
    return types;
  }, [ingredients]);

  const setCurrentType = (type) => {
    currentType = type;
  };

  return (
    <>
      {ingredients && (
        <section className={styles.constructorIngredients}>
          <p
            className={
              styles.burgerIngredients_header +
              " text text_type_main-large mt-10 mb-5"
            }
          >
            Соберите бургер
          </p>
          <div className={styles.burgerIngredients_tab}>
            {getTypes.map((item, idx) => (
              <Tab
                key={idx}
                value="bun"
                active={current === item.type}
                onClick={() => setCurrent(item.type)}
              >
                {item.name}
              </Tab>
            ))}
          </div>
          <ul className={styles.burgerItems + " mt-10 pr-5"}>
            {sortedIngredients?.map((item) => {
              let showTitle = false;
              if (currentType !== item.type) {
                showTitle = true;
                setCurrentType(item.type);
              } else {
                showTitle = false;
              }
              return (
                <Fragment key={item._id}>
                  {showTitle && (
                    <li className={styles.burgerItems_category + " mb-6 mt-10"}>
                      <h3
                        className="text text_type_main-medium"
                        ref={(ref) => (categoryRefs[item.type] = ref)}
                      >
                        {TYPES[item.type].name}
                      </h3>
                    </li>
                  )}
                  <BurgerItem item={item} />
                </Fragment>
              );
            })}
          </ul>
        </section>
      )}
      {fetchError && "Sorry server error"}
      {isLoading && "Loading..."}
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients,
};

export default BurgerIngredients;
