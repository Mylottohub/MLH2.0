// import { useSelector } from "react-redux"
// import { Navigate, Outlet } from "react-router-dom"

// const PrivateRoute = () => {
//     const  {userInfo} = useSelector((state) => state.auth)
//   return userInfo ? <Outlet /> : <Navigate to="/login" replace />
// }

// export default PrivateRoute
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export default function   PrivateRoute({ children }) {
const  {userInfo} = useSelector((state) => state.auth)
  if (!userInfo) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
}