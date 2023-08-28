import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Constructor from "../../pages/constructor/constructor";
import Login from "../../pages/login/login";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password /reset-password ";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import NotFound from "../../pages/not-found/not-found";
import IngredientDetailPage from "../../pages/ingredient-detail-page/ingredient-detail-page";
import Orders from "../../pages/orders/orders";
import { path } from "../../utils/consts";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path={path.HOME} element={<Constructor />}></Route>
          <Route path={path.INGREDIENT} element={<IngredientDetailPage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={path.PROFILE} state={{from: '/profile'}}
            element={<ProtectedRouteElement element={<Profile />} />}
          >
            <Route path={path.ORDERS} element={<Orders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
