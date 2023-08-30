import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import PropTypes from "prop-types";

const ProtectedRouteElement = ({ element }) => {
  const user = useSelector((state) => state.authReducer.user);
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, []);

  if (user) {
    return element;
  }

  return (
    <>
      {isLoading && "Loading..."}
      <Navigate to={"/login"} replace />
    </>
  );
};

ProtectedRouteElement.propTypes = {
  element: PropTypes.object,
};

export default ProtectedRouteElement;
