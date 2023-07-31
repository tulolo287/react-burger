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
  const [sortedData, setSortedData] = React.useState([]);

  let categoryRefs = [];

  React.useEffect(() => {
    getTypes();
    sortData();
    getTypesNames();
  }, []);

  React.useEffect(() => {
    if (categoryRefs) {
      let scrollable;
      switch (current) {
        case "bun":
          scrollable = categoryRefs[0];
          break;
        case "sauce":
          scrollable = categoryRefs[1];
          break;
        case "main":
          scrollable = categoryRefs[2];
          break;
      }
      scrollable.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [current]);

  const sortOrder = ["bun", "sauce", "main"];

  let typesData = [];

  const sortData = () => {
    const sortedData2 = data.sort((a, b) => {
      return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
    });
    setSortedData(sortedData2);
  };

  const getTypesNames = () => {
    let bunItems = [];

    bunItems = data.filter((item) => item.type === "bun");

    let sauceItems = [];

    sauceItems = data.filter((item) => item.type === "sauce");

    let mainItems = [];

    mainItems = data.filter((item) => item.type === "main");

    typesData = [
      { category: "Bulkas", items: [...bunItems] },
      { category: "Sauce", items: [...sauceItems] },
      { category: "Main", items: [...mainItems] },
    ];
    setSortedData(typesData);
    // console.log(typesData)
  };

  const getTypes = () => {
    let types = [];
    data
      .map((item) => item.type)
      .filter((val, idx, arr) => {
        if (arr.indexOf(val) === idx) {
          types.push({ type: val, name: Types[val].name });
        }
      });

    //console.log(types);
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
      <ul className="burgerItems mt-10 pr-5">
        {sortedData.map((types, idx) => {
          return (
            <>
              <li className="burgerItems_category">
                <h3
                  ref={(ref) => (categoryRefs[idx] = ref)}
                  id={types.category}
                >
                  {types.category}
                </h3>
              </li>

              {types.items.map((item) => {
                return <BurgerItem item={item} />;
              })}
            </>
          );
        })}
      </ul>
    </section>
  );
};

export default BurgerIngredients;
