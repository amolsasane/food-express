import myImage from "../utils/images/food-logo.png";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faHeadphones,
  faHouse,
  faGift,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { showLogin, turnToLogin } from "../utils/loginSlice";

function Header() {
  const dispatch = useDispatch();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const turnLoginBtn = useSelector((store) => store.login.logInBtn);

  const loginBtnAction = () => {
    setLoggedInUser("Guest");
    dispatch(showLogin("Login"));
    dispatch(turnToLogin());
  };

  return (
    <div className="shadow-lg">
      <div className="flex justify-between items-center max-w-[80rem] pl-4 m-auto">
        <div className="img-container flex items-center">
          <img className="w-[6rem] my-[1rem]" src={myImage} alt="logo" />
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
                <FontAwesomeIcon icon={faHouse} className="text-orange-600" />
                <span className="pl-2">Home</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/offers"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon icon={faGift} className="text-orange-600" />
                <span className="pl-2">Offers</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon
                  icon={faHeadphones}
                  className="text-orange-600"
                />
                <span className="pl-2 hover:text-orange-600">Contact</span>
              </NavLink>
            </li>
            <li className="p-2 mx-6 font-bold text-md text-orange-600">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "text-gray-600"
                }
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-orange-600"
                />
                <span className="pl-2 hover:text-orange-600">Cart</span>
              </NavLink>
            </li>
            <div className="relative group flex flex-col mt-2">
              <button className="mx-6 font-bold text-md text-orange-600">
                <FontAwesomeIcon icon={faUser} />
                <span className="pl-2 text-gray-600 hover:text-orange-600">
                  {loggedInUser}
                </span>
              </button>
              <div className="login-btn text-center font-bold text-md text-white bg-orange-600 rounded-b-lg py-2 px-6 absolute mt-7 mx-3 shadow-lg opacity-0 transform translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out bg-gradient-to-b from-white via-orange-600/50 to-orange-600">
                <button onClick={loginBtnAction} className="text-white">
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
