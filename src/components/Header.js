import myImage from "../utils/images/food-logo.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

function Header() {
  const { loggedInUser } = useContext(UserContext);

  const cartItem = useSelector((store) => store.cart.items);

  return (
    <div className="shadow-lg">
      <div className="flex justify-between items-center max-w-[80rem] pl-4 m-auto">
        <div className="img-container">
          <img className="w-[6rem] my-[0.5]" src={myImage} alt="logo" />
        </div>

        <nav className="">
          <ul className="flex p-4">
            <li className="p-2 font-bold text-lg ">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="p-2 font-bold text-lg ">
              <Link to="/about">About</Link>
            </li>
            <li className="p-2 font-bold text-lg ">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="p-2 font-bold text-lg text-green-600 ">
              <Link to="/grocery">Grocery</Link>
            </li> */}
            <li className="p-2 font-bold text-lg ">
              <Link to="/cart">Cart {cartItem.length}</Link>
            </li>
            <button className={`font-bold ml-2 text-lg`}>{loggedInUser}</button>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
