import { Navigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
function LoginAuth({ children }) {
  let { user } = useAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default LoginAuth;
