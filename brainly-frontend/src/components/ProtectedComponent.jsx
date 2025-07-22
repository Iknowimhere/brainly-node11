import { Navigate } from "react-router-dom";
import useAuth from "../context/UserContext";
const ProtectedComponent = ({ children }) => {
  let { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to={"/"} replace />;
};
export default ProtectedComponent;
