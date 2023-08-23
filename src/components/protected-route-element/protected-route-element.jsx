import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRouteElement = ({ element }) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const getUser = async () => {
    await fetch("https://norma.nomoreparties.space/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: "blas", package: "blas" }),
    })
      .then((response) =>
        response.success ? setIsAuth(true) : setIsAuth(false),
      )
      .catch((err) => {
        console.log(err);
      });
  };
  return element;
};

export default ProtectedRouteElement;
