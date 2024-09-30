import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faHouse,
  faGift,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { showLogin, turnToLogin } from "../utils/loginSlice";

function Header() {
  const dispatch = useDispatch();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const turnLoginBtn = useSelector((store) => store.login.logInBtn);
  const cartItems = useSelector((store) => store.cart.items);

  const [bounce, setBounce] = useState(false);

  const loginBtnAction = () => {
    setLoggedInUser("Guest");
    dispatch(showLogin("Login"));
    dispatch(turnToLogin());
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  return (
    <div className="h-[10vh] fixed bg-white shadow-lg z-30 w-full slide-down">
      <div className="flex justify-between items-center max-w-[80rem] pl-4 m-auto">
        <div className="img-container flex items-center">
          <Link to="/">
            <h1 className="logo font-bold text-2xl md:text-3xl text-orange-600 mb-2 md: md:mb-0">
              food<span className="text-black">express</span>
            </h1>
          </Link>
        </div>

        <nav>
          <ul className="flex p-4 space-x-4 sm:space-x-8 md:space-x-12 text-sm md:text-[1rem]">
            <li className="p-2 font-bold text-orange-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <div className="flex flex-col items-center md:flex-row">
                  <FontAwesomeIcon icon={faHouse} />
                  <span className="pl-2 hover:text-orange-600">Home</span>
                </div>
              </NavLink>
            </li>
            <li className="p-2 font-bold text-orange-600">
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <div className="flex flex-col items-center md:flex-row">
                  <FontAwesomeIcon icon={faGift} />
                  <span className="pl-2 hover:text-orange-600">Offers</span>
                </div>
              </NavLink>
            </li>
            {/* Removed About Us for small devices */}
            <li className="p-2 font-bold text-orange-600 hidden md:block">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <div className="flex flex-col items-center md:flex-row">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="pl-2 hover:text-orange-600">About Us</span>
                </div>
              </NavLink>
            </li>
            <li className="p-1 md:p-2 font-bold text-orange-600">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <div className="flex flex-col items-center md:flex-row">
                  <div className={`relative ${bounce ? "bounce-down" : ""}`}>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {cartItems.length > 0 && (
                      <p className="px-1 rounded-full absolute -top-2 -right-2 bg-orange-600 text-xs text-white">
                        {cartItems.length}
                      </p>
                    )}
                  </div>
                  {cartItems.length < 1 && (
                    <span className="pl-2 hover:text-orange-600">Cart</span>
                  )}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="relative group">
          <button className="mx-6 font-bold text-sm md:text-[1rem] flex flex-col items-center md:flex-row text-orange-600">
            {loggedInUser === "Guest" ? (
              <FontAwesomeIcon icon={faUser} />
            ) : (
              "Hello,"
            )}
            <span className="md:pl-2 pl-0 text-gray-600 hover:text-orange-600">
              {loggedInUser}
            </span>
          </button>
          <div className="login-btn text-center text-sm md:text-[1rem] bg-gray-200 rounded-md py-2 px-6 absolute mt-1 md:mt-2 mx-0 md:mx-3 shadow-lg shadow-gray-400 opacity-0 transform translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            <button
              onClick={loginBtnAction}
              className="text-gray-600 font-semibold"
            >
              {turnLoginBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
