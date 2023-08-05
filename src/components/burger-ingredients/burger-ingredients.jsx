import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import BurgerItem from "../burger-item/burger-item";
import styles from "./burger-ingredients.module.css";
import { DATA_TYPES, SORT_ORDER, TYPES } from "../../utils/consts";
import withModal from "../hocs/with-modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

let currentType = "";
let categoryRefs = [];
const BurgerItemWithModal = withModal(IngredientDetails)(BurgerItem);

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("bun");
  const [types, setTypes] = React.useState([]);
  const [sortedData, setSortedData] = React.useState([]);

  React.useEffect(() => {
    getTypes();
    sortData();
  }, []);

  const sortData = () => {
    const sortedData = data.sort((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    });
    setSortedData(sortedData);
  };

  React.useEffect(() => {
    if (categoryRefs[current]) {
      categoryRefs[current].scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [current]);

  const getTypes = () => {
    let types = [];
    data
      .map((item) => item.type)
      .filter((val, idx, arr) => {
        if (arr.indexOf(val) === idx) {
          types.push({ type: val, name: TYPES[val].name });
        }
      });
    setTypes(types);
  };

  const setCurrentType = (type) => {
    currentType = type;
  };

  return (
    <section className={styles.burgerIngredients}>
      <p
        className={
          styles.burgerIngredients_header +
          " text text_type_main-large mt-10 mb-5"
        }
      >
        Соберите бургер
      </p>
      <div className={styles.burgerIngredients_tab}>
        {types.map((item, idx) => (
          <React.Fragment key={idx}>
            <Tab
              value="bun"
              active={current === item.type}
              onClick={() => setCurrent(item.type)}
            >
              {item.name}
            </Tab>
          </React.Fragment>
        ))}
      </div>
      <ul className={styles.burgerItems + " mt-10 pr-5"}>
        {sortedData.map((item, idx) => {
          let showTitle = false;
          if (currentType != item.type) {
            showTitle = true;
            setCurrentType(item.type);
          } else {
            showTitle = false;
          }
          return (
            <React.Fragment key={item._id}>
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
              <BurgerItemWithModal
                showTitle={showTitle}
                key={item._id}
                item={item}
                qty={1}
              />
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};

BurgerIngredients.defaultProps = DATA_TYPES;

export default BurgerIngredients;
