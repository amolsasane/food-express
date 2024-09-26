import fastfood from "../utils/images/fastfood.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="pt-[5rem] flex justify-around mx-[5rem]">
      <div className="mt-[6rem] ml-[4rem] w-[40%] slide-left">
        <h3 className="text-xs font-bold text-orange-600 w-fit bg-orange-200 px-3 py-1 rounded-full">
          Bike Delivery
          <span className="ml-1 text-orange-800">
            <FontAwesomeIcon icon={faMotorcycle} />
          </span>
        </h3>
        <h1 className="text-[3rem] my-4 font-semibold">
          We offer the{" "}
          <span className="text-orange-500 saturate-200">
            Fastest Food Delivery
          </span>{" "}
          within Every City.
        </h1>
        <p className="pb-6 font-semibold text-sm text-gray-500">
          <span>FoodExpress</span> is your go-to food delivery platform! We
          connect you with the best local restaurants, delivering your favorite
          dishes and meals right to your door. Whether it’s a quick bite or a
          special meal, we’re here to make every order fast, easy, and delicious
          😋
        </p>
        <Link to="/">
          <button className="shadow-md shadow-gray-500 px-4 py-2 font-bold text-white bg-orange-500 rounded-full text-sm mr-4 transform transition-transform duration-500 ease-in-out hover:scale-90">
            Order Now
          </button>
        </Link>
        <Link to="/">
          <button className="shadow-md shadow-gray-400 px-4 py-2 font-bold text-orange-600 border border-orange-700 rounded-full text-sm transform transition-transform duration-500 ease-in-out hover:scale-90">
            All foods <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </Link>
      </div>
      <div className="mx-[5rem] content-center">
        <img
          alt="fastfood"
          src={fastfood}
          className="w-[40rem] mt-8 slide-right"
        />
      </div>
    </div>
  );
};

export default Contact;
