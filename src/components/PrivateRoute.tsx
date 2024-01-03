import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

type Props = {
  children: React.ReactElement;
};

const PrivateRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user?.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
