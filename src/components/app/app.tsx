import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import Constructor from "../../pages/constructor/constructor";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import IngredientDetailPage from "../../pages/ingredient-detail-page/ingredient-detail-page";
import Login from "../../pages/login/login";
import NotFound from "../../pages/not-found/not-found";
import Orders from "../../pages/orders/orders";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password /reset-password ";
import { getUser, refreshToken } from "../../services/actions/auth";
import { path } from "../../utils/consts";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import styles from "./app.module.css";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const date = Date.now();
    if (localStorage.getItem("accessTokenExp")) {
      const accessTokenExp = localStorage.getItem("accessTokenExp") * 1000;
      if (date >= accessTokenExp) {
        dispatch(refreshToken());
        dispatch(getUser());
      }
    } else {
      dispatch(getUser());
    }
  }, []);

  let state = location.state;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.modal || location}>
        <Route path={path.HOME} element={<Constructor />}></Route>
        <Route path={path.INGREDIENT} element={<IngredientDetailPage />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route
          path={path.PROFILE}
          state={{ from: "/profile" }}
          element={<ProtectedRouteElement element={<Profile />} />}
        >
          <Route path={path.ORDERS} element={<Orders />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {state?.modal && (
        <Routes>
          <Route path={path.INGREDIENT} element={<IngredientDetails />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
