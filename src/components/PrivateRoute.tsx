import React, { useEffect } from "react";

import { useLocalState } from "hooks/useLocalState";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactElement;
};

const PrivateRoute = ({ children }: Props) => {
  const [jwt, setJwt] = useLocalState(null, "jwt");
  useEffect(() => {
    setJwt("1");
  }, []);
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
