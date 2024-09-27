import foodplate from "../utils/images/foodplate.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div className="pt-[5rem] flex justify-left overflow-hidden">
      <div className="mt-[2rem] ml-[10rem] w-[60%] slide-left">
        <h1 className="text-[3rem] mt-4 font-semibold text-orange-500 saturate-200 bounce-down">
          Hungry for Deals?
        </h1>
        <h1 className="text-[2rem] mb-4 font-semibold">
          Don't Miss Out on These Tasty Deals.
        </h1>
        <div className="flex">
          <div className="mb-[2rem] mr-[2rem] zoom-in">
            <img
              className="w-[15rem] h-[17rem] rounded-2xl"
              alt="discount"
              src="https://www.shutterstock.com/image-vector/10-off-flat-sales-vector-600nw-1140284351.jpg"
            />
          </div>
          <div className="mb-[2rem]">
            <img
              className="w-[15rem] h-[17rem] rounded-2xl zoom-in"
              alt="discount"
              src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-free-delivery-food-and-drink-template-png-image_5819977.jpg"
            />
          </div>
        </div>
        <p className="text-gray-500 font-bold text-sm mb-4 max-w-[35rem]">
          !0% off on your first order and free delivery on orders above 250/-,
          so unlock your tastebuds now!
        </p>
        <Link to="/">
          <button className="shadow-md shadow-gray-500 px-4 py-2 font-bold text-white bg-black rounded-full text-sm mr-4 transform transition-transform duration-500 ease-in-out hover:scale-90">
            Order Now
          </button>
        </Link>
        <Link to="/">
          <button className="shadow-md shadow-gray-400 px-4 py-2 font-bold text-white bg-orange-500 saturate-200 rounded-full text-sm transform transition-transform duration-500 ease-in-out hover:scale-90">
            All foods <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
          </button>
        </Link>
      </div>
      <div className="flex items-center mb-[2rem] my-[1rem] -mr-[10rem] relative slide-right">
        <img
          alt="foodplate"
          src={foodplate}
          className="w-[30rem] rotate absolute z-10"
        />
        <div className="overflow-hidden ml-[10rem] w-[37rem] h-[37rem] bg-orange-500 rounded-full flex justify-center items-center relative">
          <div className="w-[30rem] h-[30rem] bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
