import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
