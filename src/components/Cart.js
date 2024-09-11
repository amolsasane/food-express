import { useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  if (!cartItems || cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-4 mt-6">
        <img
          alt="empty-cart"
          src="https://zoe.menu/assets/images/empty_cart.gif"
          className="w-[27rem]"
        />
        <div className="flex -mt-6">
          <Link to="/">
            <button className="btn-bounce delay-1 bg-black text-white font-bold py-2 px-3 rounded-lg shadow-md shadow-gray-500 mr-6">
              Add items to cart
            </button>
          </Link>
          <Link to="/">
            <button className="btn-bounce delay-2 bg-orange-600 text-white font-bold py-2 px-3 rounded-lg shadow-md shadow-gray-400">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="w-[50%] m-auto p-4">
      <div>
        <MenuItemList items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
