import { Route, Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function PrivateRoute({ children }) {
  const isAuthenticated = useAuth();
  // console.log('❤️',isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />

}
