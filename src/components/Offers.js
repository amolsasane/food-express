import foodplate from "../utils/images/foodplate.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div className="pt-[5rem] flex items-center overflow-hidden md:flex-row flex-col lg:justify-around md:justify-between">
      <div className="mt-4 md:ml-8 lg:ml-[5rem] px-8 slide-left">
        <h1 className="md:text-[3rem] text-[2rem] font-semibold text-orange-500 saturate-200 bounce-down text-center md:text-left">
          Hungry for Deals?
        </h1>
        <h1 className="md:text-[2rem] text-[1rem] mb-4 font-semibold text-center md:text-left">
          Don't Miss Out on These Tasty Deals.
        </h1>
        <div className="flex mb-[1rem] md:mb-[2rem] justify-center md:justify-start">
          <div className=" mr-[2rem] zoom-in">
            <img
              className="w-[10rem] md:w-[15rem] h-[10rem] md:h-[13rem] lg:h-[17rem] rounded-2xl"
              alt="discount"
              src="https://www.shutterstock.com/image-vector/10-off-flat-sales-vector-600nw-1140284351.jpg"
            />
          </div>
          <div>
            <img
              className="w-[10rem] md:w-[15rem] h-[10rem] md:h-[13rem] lg:h-[17rem] rounded-2xl zoom-in"
              alt="discount"
              src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-free-delivery-food-and-drink-template-png-image_5819977.jpg"
            />
          </div>
        </div>
        <p className="text-gray-500 font-bold text-sm mb-4 max-w-[35rem] text-center md:text-left">
          !0% off on your first order and free delivery on orders above 250/-,
          so unlock your tastebuds now!
        </p>
        <div className="flex justify-center md:justify-start">
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
      </div>
      <div className="flex items-center md:mb-[1rem] mt-[2rem] lg:-mr-[15rem] md:-mr-[25rem] -mr-0 -mb-[10rem] md:relative  slide-right">
        <img
          alt="foodplate"
          src={foodplate}
          className="w-[25rem] md:w-[30rem] rotate md:absolute z-10 mx-auto"
        />
        <div className="hidden md:flex overflow-hidden ml-[10rem] w-[37rem] h-[37rem] bg-orange-500 rounded-full  justify-center items-center relative">
          <div className="w-[30rem] h-[30rem] bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
