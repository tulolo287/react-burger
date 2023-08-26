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

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Constructor />}></Route>
          <Route path="/ingredient/:id" element={<IngredientDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile />} />}
          >
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
