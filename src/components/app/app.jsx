import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Constructor from "../../pages/constructor/constructor";
import Login from "../../pages/login/login";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Constructor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Constructor />} />
          <Route path="/profile" element={<Pfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
