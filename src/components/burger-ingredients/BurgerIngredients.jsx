import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import BurgerItem from "../burger-item/burger-item";

const Types = {
  bun: { name: "Bulka" },
  sauce: { name: "Sauce" },
  main: { name: "Main" },
};

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState("bun");
  const [types, setTypes] = React.useState([]);

  React.useEffect(() => {
    getTypes();
  }, []);

  const getTypes = () => {
    let types = [];
    data
      .map((item) => item.type)
      .filter((val, idx, arr) => {
        if (arr.indexOf(val) === idx) {
          types.push({ type: val, name: Types[val].name });
        }
      });

    console.log(types);
    setTypes(types);
  };

  const getCurrentTabItems = () => {
    return data.filter((item) => item.type === current);
  };
  return (
    <section className="burgerIngredients">
      <h1>Get your burger</h1>
      <div className="burgerIngredients_tab">
        {types.map((item) => (
          <Tab
            value="bun"
            active={current === item.type}
            onClick={() => setCurrent(item.type)}
          >
            {item.name}
          </Tab>
        ))}
      </div>
      <div className="burgerItems mt-10 pr-5">
        {getCurrentTabItems().map((item) => (
          <BurgerItem item={item} />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
