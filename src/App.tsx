import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppHeader from "./components/app-header/AppHeader";
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import data from "./utils/data.js";

function App() {
  return (
    <div className="App"> 
      <AppHeader />
      <div className="container">
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data} />
      </div>
    </div>
  );
}

export default App;
