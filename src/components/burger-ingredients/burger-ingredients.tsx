import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../services/hooks";

import {
  getIngredients,
  getIngredientsSelector,
  getSortedIngredientsSelector,
  setSortedIngredients,
} from "../../services/actions/ingredients";
import { AppDispatch, State } from "../../services/types";
import { SORT_ORDER, TYPES } from "../../utils/consts";
import { AssociativeArray, TIngredient } from "../../utils/types";
import BurgerItem from "../burger-item/burger-item";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients = memo(() => {
  const ingredients = useSelector(getIngredientsSelector);
  const sortedIngredients = useSelector(getSortedIngredientsSelector);
  const dispatch: AppDispatch = useDispatch();
  const [current, setCurrent] = useState<string>("bun");
  const fetchError = useSelector(
    (state: State) => state.ingredientsReducer.fetchError,
  );
  const isLoading = useSelector(
    (state: State) => state.ingredientsReducer.isLoading,
  );

  let currentType: string = "";
  let categoryRefs: AssociativeArray<HTMLHeadingElement | null> = { bun: null };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getIngredients()).then(
        (ingredients) => ingredients && sortData(ingredients),
      );
    };
    if (!ingredients) {
      fetchData();
    }
  }, []);

  const sortData = (ingredients: TIngredient[]) => {
    const sortedData = ingredients?.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    dispatch(setSortedIngredients(sortedData));
  };

  useEffect(() => {
    if (categoryRefs) {
      categoryRefs[current]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [current]);

  const getTypes = useMemo(() => {
    let types: Array<{ type: string; name: string }> = [];
    ingredients
      ?.map((item: TIngredient) => item.type)
      .filter((val: string, idx: number, arr: string[]) => {
        if (arr.indexOf(val) === idx) {
          types.push({ type: val, name: TYPES[val].name });
        }
      });
    return types;
  }, [ingredients]);

  const setCurrentType = (type: string) => {
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
            {sortedIngredients?.map((item: TIngredient) => {
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
                        ref={(ref) => {
                          categoryRefs[item.type] = ref;
                        }}
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
});

export default BurgerIngredients;
