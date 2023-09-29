import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { AppDispatch, State } from "../..";

const ProtectedRouteElement = ({ element }: { element: React.ReactElement }) => {
  const user = useSelector((state: State) => state.authReducer.user);
  const isLoading = useSelector((state: State) => state.authReducer.isLoading);
  const dispatch: AppDispatch = useDispatch();

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

export default ProtectedRouteElement;
