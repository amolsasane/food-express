import { useDispatch, useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { clearCart, setHasPlacedOrder } from "../utils/cartSlice";
import Login from "./Login.js";
import { hideLogin, showLogin, turnToLogin } from "../utils/loginSlice.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChevronLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../utils/UserContext.js";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);

  const itemTotal = cartItems
    .map((item) => {
      const price = item.card.info.price || item.card.info.defaultPrice;
      return (price / 100) * item.quantity;
    })
    .reduce((acc, curr) => acc + curr, 0);

  const deliveryFee = itemTotal > 250 ? 0 : 49;

  const discount = itemTotal * 0.1;

  const toPay = itemTotal - discount + deliveryFee;

  const showLoginPage = useSelector((store) => store.login.login);
  const { loggedInUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    address3: "",
    paymentDetails: "",
    amount: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggedInUser === "Guest") {
      setError("You must be logged in to place an order");
      return;
    }
    if (!formData.address1) {
      setError("Please fill your address details");
    } else if (!formData.address2) {
      setError("Please provide a landmark");
    } else if (!formData.address3) {
      setError("Please provide Street/ Area");
    } else if (!formData.paymentDetails) {
      setError("Please enter card number");
    } else {
      setError("");
      dispatch(setHasPlacedOrder());
      navigate("/orderplaced");
      dispatch(clearCart());
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const closeLoginPage = () => {
    dispatch(hideLogin());
  };

  const [isVisible, setIsVisible] = useState(showLoginPage);

  useEffect(() => {
    if (showLoginPage) {
      setIsVisible(true);
      document.body.classList.add("no-scroll");
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      document.body.classList.remove("no-scroll");
      return () => clearTimeout(timer);
    }
  }, [showLoginPage]);

  const handleLogin = () => {
    dispatch(showLogin("Login"));
    dispatch(turnToLogin());
  };

  if (!cartItems || cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center p-4 pt-[12rem] md:pt-[7rem]">
        <img
          alt="empty-cart"
          src="https://zoe.menu/assets/images/empty_cart.gif"
          className="w-[20rem] md:w-[27rem] bounce-down"
        />
        <div className="flex -mt-6">
          <Link to="/">
            <button className="btn-bounce delay-1 bg-black text-white font-bold py-2 px-3 rounded-lg shadow-md shadow-gray-500 text-sm md:text-lg mr-6">
              Add items to cart
            </button>
          </Link>
          <Link to="/">
            <button className="btn-bounce delay-2 bg-orange-600 text-white font-bold py-2 px-3 rounded-lg shadow-md shadow-gray-400 text-sm md:text-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="pt-[5rem]">
      <div className="flex lg:mx-20 m-auto flex-col-reverse lg:flex-row lg:justify-around justify-center p-4 slide-right">
        <div className="lg:w-[60%] lg:mt-4 mt-16 lg:mb-0 mb-10 slide-left">
          {/* Account Information */}
          <div className="flex items-center">
            <img
              alt="user"
              src="https://cdn-icons-png.flaticon.com/512/8792/8792047.png"
              className="lg:w-20 w-16 pl-2 lg:pl-0 lg:left-[5.5rem] absolute z-10"
            />
            <div className="border-t border-gray-300 shadow-xl shadow-gray-300 px-4 py-4 rounded-lg h-[10rem] w-full">
              <div className="ml-16 mt-2 mr-4">
                <h1 className="font-bold mb-2">ACCOUNT INFORMATION</h1>
                <div className="bg-gray-400 h-[1px] mb-2"></div>
                {loggedInUser === "Guest" ? (
                  <div className="mt-2">
                    <p className="text-sm text-red-500 font-bold">
                      Please login now, to place your order!
                    </p>
                    <button
                      className="login-button px-6 pb-2 pt-1 mt-2 mr-4 shadow-md shadow-gray-600"
                      onClick={handleLogin}
                    >
                      <span className="button-content font-bold">
                        Login{" "}
                        <span className="pl-1">
                          Now{" "}
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            className="pl-2"
                          />{" "}
                        </span>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-3">
                    <h1 className="text-gray-500 font-bold">
                      <span className="font-bold text-orange-600">Name : </span>
                      {loggedInUser}
                    </h1>
                    <h1 className="text-gray-500 font-bold">
                      <span className="font-bold text-orange-600">
                        E-mail :{" "}
                      </span>
                      xxxxxxx@gmail.com
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Address Form */}
          <div className="flex items-center fade-in-second">
            <img
              alt="address"
              src="https://cdn-icons-png.flaticon.com/512/8568/8568340.png"
              className="lg:w-20 w-16 pl-2 lg:pl-0 lg:left-[5.5rem] absolute z-10 bg-white"
            />
            <div className="border-t border-gray-300 shadow-xl shadow-gray-300 p-4 rounded-lg h-[11rem] w-full mt-6">
              <div className="ml-16 mr-4">
                <h1 className="font-bold mb-2">ADD YOUR DELIVERY ADDRESS</h1>
                <form>
                  <div className="flex">
                    <input
                      className="bg-zinc-200 w-full p-2 border rounded-md shadow-inner shadow-gray-400 mr-4"
                      type="text"
                      name="address1"
                      placeholder="Flat/ Building/ Society"
                      value={formData.address1}
                      onChange={handleInputChange}
                    />
                    <input
                      className="bg-zinc-200 w-full p-2 border rounded-md shadow-inner shadow-gray-400"
                      type="text"
                      name="address2"
                      placeholder="Landmark"
                      value={formData.address2}
                      onChange={handleInputChange}
                    />
                  </div>
                  <input
                    className="w-full bg-zinc-200 p-2 border rounded-md shadow-inner shadow-gray-400 mt-4"
                    type="text"
                    name="address3"
                    placeholder="Street/ Area"
                    value={formData.address3}
                    onChange={handleInputChange}
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="flex items-center fade-in-third">
            <img
              alt="payment"
              src="https://cdn-icons-png.flaticon.com/512/10308/10308445.png"
              className="lg:w-20 w-16 pl-2 lg:pl-0 lg:left-[5.5rem] absolute z-10 bg-white"
            />
            <div className="border-t border-gray-300 shadow-xl shadow-gray-300 p-6 rounded-lg h-[11rem] w-full mt-6">
              <div className="ml-16 mr-4">
                <h1 className="font-bold mb-2">ADD PAYMENT DETAILS</h1>
                <form onSubmit={handleSubmit}>
                  <div className="flex">
                    <select className="border border-gray-400 rounded-md mr-4 font-bold text-gray-600 p-1 bg-zinc-100">
                      <option>UPI Payment</option>
                      <option>Card Payment</option>
                      <option>COD Payment</option>
                    </select>
                    <input
                      className="bg-zinc-200 w-full p-2 border rounded-md shadow-inner shadow-gray-400"
                      type="number"
                      name="paymentDetails"
                      placeholder="Card Number"
                      value={formData.paymentDetails}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center mt-4">
                      <input
                        className="bg-zinc-200 p-2 border rounded-md shadow-inner shadow-gray-400 w-[8.5rem] mr-4"
                        type="number"
                        name="amount"
                        value={Number(toPay).toFixed(2)}
                        onChange={handleInputChange}
                        disabled
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 mr-4 shadow-md shadow-gray-400 border border-gray-400 hover:shadow-gray-600 rounded-md hover:bg-black text-gray-600 hover:text-white font-bold"
                      >
                        <span className="block lg:hidden">Pay</span>
                        <span className="hidden lg:block">Pay Now</span>
                      </button>
                      <button
                        className="px-4 py-2 shadow-md shadow-gray-400 hover:shadow-gray-600 border border-gray-400 font-bold text-gray-600 rounded-md"
                        type="button"
                        onClick={clearCartHandler}
                      >
                        <span className="block lg:hidden">Clear</span>
                        <span className="hidden lg:block">Clear Cart</span>
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm font-bold ml-4 mt-8 hidden lg:block">
                        {error}
                      </p>
                    )}
                  </div>
                </form>
                {error && (
                  <p className="text-red-500 text-sm font-bold ml-4 mt-10 lg:hidden">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="lg:w-[30%] rounded-md shadow-xl shadow-gray-300 mt-4 h-fit slide-down">
          <div className="max-h-[300px] overflow-y-auto">
            <MenuItemList items={cartItems} />
          </div>
          <div className="h-1 bg-gray-300"></div>
          <div className="pl-2 flex justify-between font-bold text-sm text-gray-500 bg-gray-100 py-2 m-2 border-[3px] border-dashed border-gray-500">
            <div>
              <p className="mb-1">Free delivery on orders above 250/-</p>
              <p>10% discount added</p>
            </div>
            <img
              className="w-[5rem]"
              alt="discount"
              src="https://w7.pngwing.com/pngs/1007/745/png-transparent-ticket-logo-discounts-and-allowances-computer-icons-coupon-promotion-promo-icon-miscellaneous-text-rectangle.png"
            />
          </div>
          <div className="h-1 bg-gray-300"></div>
          <div>
            <h1 className="font-bold text-gray-600 m-2">Billing Summary</h1>
            <div className="h-[1px] bg-gray-500 mx-2 mb-4"></div>
            <div className="flex justify-between">
              <p className=" text-gray-600 mx-2">Item Total</p>
              <p className="text-gray-600 mx-2">₹ {itemTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-gray-600 mx-2">Delivery Fee</p>
              <p className="text-gray-600 mx-2">₹ {deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className=" text-gray-600 mx-2">Discount</p>
              <p className="text-gray-600 mx-2">₹ {discount.toFixed(2)}</p>
            </div>

            <div className="h-[1px] bg-gray-500 m-2"></div>
            <div className="flex justify-between m-2">
              <p className="font-bold text-gray-600 x-2">TO PAY</p>
              <p className="text-green-700 mx-2 font-bold pulse">
                ₹ {toPay.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div
            className={`mt-[10vh] login-page fixed z-10 border border-gray-500 shadow-2xl bg-white lg:w-[40vw] w-[100vw] right-0 top-0 h-[90vh] rounded-l-xl transition-transform ${
              showLoginPage ? "animate-slideInRight" : "animate-slideOutRight"
            }`}
          >
            <div className="my-[5rem] mx-[5rem]">
              <button
                className="text-3xl text-gray-300 hover:text-orange-600"
                onClick={closeLoginPage}
              >
                <span className="hidden lg:block">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </span>
                <span className="lg:hidden">
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </button>
              <Login />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
