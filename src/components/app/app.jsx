import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Constructor from "../../pages/constructor/constructor";
import Login from "../../pages/login/login";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import Profile from "../../pages/profile/profile";
import Register from "../../pages/register/register";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Constructor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Constructor />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={<Profile/>} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
