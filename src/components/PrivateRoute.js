import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const hasPlacedOrder = useSelector((state) => state.cart.hasPlacedOrder); // Assume cart state stores order status

  return hasPlacedOrder ? children : <Navigate to="/cart" />;
};

export default PrivateRoute;
