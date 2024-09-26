import { useContext } from "react";
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

  const loginBtnAction = () => {
    setLoggedInUser("Guest");
    dispatch(showLogin("Login"));
    dispatch(turnToLogin());
  };

  return (
    <div className="h-[10vh] fixed bg-white shadow-lg block z-30 w-full slide-down">
      <div className="flex justify-between items-center max-w-[80rem] pl-4 m-auto">
        <div className="img-container flex items-center">
          <Link to="/">
            <h1 className="font-bold text-3xl text-orange-600">FoodExpress</h1>
          </Link>
        </div>

        <nav className="">
          <ul className="flex p-4">
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon icon={faHouse} />
                <span className="pl-2 hover:text-orange-600">Home</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon icon={faGift} />
                <span className="pl-2 hover:text-orange-600">Offers</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="pl-2 hover:text-orange-600">About Us</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <div className="flex items-center">
                  <div className="relative">
                    <FontAwesomeIcon icon={faCartShopping} />
                    {cartItems.length > 0 && (
                      <p className="px-1 rounded-full absolute -top-2 -right-2 bg-black text-xs text-white">
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

            <div className="relative group flex flex-col mt-2">
              <button className="mx-6 font-bold text-md">
                <FontAwesomeIcon icon={faUser} />
                <span className="pl-2 text-gray-600 hover:text-orange-600">
                  {loggedInUser}
                </span>
              </button>
              <div className="login-btn text-center text-md bg-gray-200 rounded-md py-2 px-6 absolute mt-7 mx-3 shadow-lg shadow-gray-400 opacity-0 transform translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <button
                  onClick={loginBtnAction}
                  className="text-gray-600 font-semibold"
                >
                  {turnLoginBtn}
                </button>
              </div>
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
