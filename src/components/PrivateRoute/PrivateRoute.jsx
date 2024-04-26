import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetProfileUser } from "../../react-query";
import { toast } from "react-toastify";

export default function PrivateRoute({ children }) {
  // const { userInfo } = useSelector((state) => state.auth);
  const { expires } = useGetProfileUser([]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const token = userInfo?.token;

  if (!(token && expires && new Date(expires) > new Date())) {
    // Token is expired or invalid
    toast.error("You are not authenticated. Please log in.");
    return <Navigate to="/" />;
  }

  return children;
}
