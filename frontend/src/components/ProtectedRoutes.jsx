import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  // If there's a user, render the component; otherwise, render null
  return localStorage.getItem("user") ? <Component {...rest} /> : null;
};

export default ProtectedRoute;
