import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({ element }) => {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isAuth) {
    return element;
  }

  return (
    <>
      {isLoading && "Loading..."}
      {isAuth ? element : <Navigate to={"/login"} state={"/profile"} replace />}
    </>
  );
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object,
};

export default ProtectedRouteElement;
