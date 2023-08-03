import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import BurgerItem from "../burger-item/burger-item";
import styles from "./burger-ingredients.module.css";
import { dataTypes } from "../../utils/consts";
import withModal from "../hocs/with-modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

const Types = {
  bun: { name: "Булки" },
  sauce: { name: "Соусы" },
  main: { name: "Начинки" },
};
//const category = { bun: "Булки", sauce: "Соусы", main: "Начинки" };
const sortOrder = ["bun", "sauce", "main"];

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
      return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    });
    setSortedData(sortedData);
  };

  React.useEffect(() => {
    console.log(categoryRefs);
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
          types.push({ type: val, name: Types[val].name });
        }
      });
    setTypes(types);
  };

  const setCurrentType = (type) => {
    currentType = type;
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1
        className={
          styles.burgerIngredients_header +
          " text text_type_main-large mt-10 mb-5"
        }
      >
        Соберите бургер
      </h1>
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
            <React.Fragment key={`${item.name}_${idx}}`}>
              {showTitle && (
                <li className={styles.burgerItems_category + " mb-6 mt-10"}>
                  <h3 ref={(ref) => (categoryRefs[item.type] = ref)}>
                    {Types[item.type].name}
                  </h3>
                </li>
              )}
              <BurgerItemWithModal
                showTitle={showTitle}
                key={item.id}
                item={item}
              />
            </React.Fragment>
          );
        })}
      </ul>
    </section>
  );
};

BurgerIngredients.defaultProps = dataTypes;

export default BurgerIngredients;
