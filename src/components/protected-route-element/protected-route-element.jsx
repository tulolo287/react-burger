import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/actions/auth";

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
