import { Route, Routes, useLocation } from "react-router-dom";
import Constructor from "../../pages/constructor/constructor";
import FeedDetails from "../../pages/feed-details/feed-deails";
import Feed from "../../pages/feed/feed";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import IngredientDetailPage from "../../pages/ingredient-detail-page/ingredient-detail-page";
import Login from "../../pages/login/login";
import Orders from "../../pages/orders/orders";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";
import ResetPassword from "../../pages/reset-password/reset-password";
import { path } from "../../utils/consts";
import AppHeader from "../app-header/app-header";
import BurgerConstructorMobile from "../burger-constructor-mobile/burger-constructor-mobile";
import FeedDetailsModal from "../feed-details-modal/feed-details-modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import styles from "./app.module.css";

const App = () => {
  let location = useLocation();
  let background = location.state && location.state.background;

  let state = location.state;
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <Routes location={background || location}>
          <Route path={path.HOME} element={<Constructor />}></Route>
          <Route path={path.INGREDIENT} element={<IngredientDetailPage />} />
          <Route
            path={path.MOBILE_CONSTRUCTOR}
            element={<BurgerConstructorMobile />}
          />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={path.FEED} element={<Feed />} />
          <Route path={path.FEED_DETAILS} element={<FeedDetails />} />
          <Route
            path={path.PROFILE}
            element={<ProtectedRouteElement element={<Profile />} />}
          ></Route>
          <Route
            path={path.PROFILE_ORDERS}
            element={<ProtectedRouteElement element={<Orders />} />}
          ></Route>
          <Route
            path={path.PROFILE_ORDERS_ID}
            element={<ProtectedRouteElement element={<FeedDetails />} />}
          ></Route>
        </Routes>
      </main>
      {background && (
        <main className={styles.container}>
          <Routes>
            <Route path={path.INGREDIENT} element={<IngredientDetails />} />
            <Route path={path.FEED_DETAILS} element={<FeedDetailsModal />} />
            <Route
              path={path.PROFILE_ORDERS_ID}
              element={<ProtectedRouteElement element={<FeedDetailsModal />} />}
            />
          </Routes>
        </main>
      )}
    </div>
  );
};

export default App;
