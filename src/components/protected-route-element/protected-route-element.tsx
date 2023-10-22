import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { AppDispatch } from "../../services/types";

const ProtectedRouteElement = ({
  element,
}: {
  element: React.ReactElement;
}) => {
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch: AppDispatch = useAppDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const checkUser = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    if (!user) {
      checkUser();
    } else {
      setUserLoaded(true);
    }
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;
