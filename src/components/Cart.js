import { useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="w-[50%] m-auto p-4">
      <h1 className="text-center font-bold p-4 text-lg">Cart</h1>
      <div>
        <MenuItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
