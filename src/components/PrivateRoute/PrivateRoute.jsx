import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // const { userInfo } = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = userInfo?.token;

  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}
