import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import MenuCatagory from "../components/MenuCatagory";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faCircle,
  faLocationDot,
  faMotorcycle,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import fssaiLogo from "../utils/images/fssai.png";
import { useSelector } from "react-redux";

const ResMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const [errorMessage] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);
  const [showBestseller, setShowBestseller] = useState(false);
  const isVisible = useSelector((store) => store.cart.ShowToaster);

  const { ResId } = useParams();
  const resInfo = useResMenu(ResId);

  if (resInfo === null) return <Loader />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    avgRating,
    totalRatingsString,
    areaName,
    sla,
    locality,
  } = resInfo?.cards[2]?.card?.card?.info;

  const catagories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // Toggle veg items
  const toggleVeg = () => {
    setShowVeg(!showVeg);
    setShowNonVeg(false);
    setShowBestseller(false);
  };

  // Toggle non-veg items
  const toggleNonVeg = () => {
    setShowNonVeg(!showNonVeg);
    setShowVeg(false);
    setShowBestseller(false);
  };

  //filter bestseller items
  const filterBestseller = () => {
    setShowBestseller(true);
    setShowVeg(false);
    setShowNonVeg(false);
  };

  return (
    <div className="res-menu max-w-[50rem] m-auto">
      <h1 className="font-bold text-3xl pt-4 ml-4 text-start mt-[2rem]">
        {name}
      </h1>
      <div className="bg-gray-300 w-full h-[14rem] my-2 rounded-b-[2rem] bg-gradient-to-b from-white p-4">
        <div className="w-full h-full rounded-[2rem] border border-t-gray-300 bg-white">
          <p className="ml-4 mt-4 font-bold">
            <span className="text-white rounded-full px-[4px] pb-[3px] mr-2 text-sm bg-green-600">
              ★
            </span>
            {avgRating}
            <span className="mx-1">({totalRatingsString})</span>{" "}
            <span className="text-gray-400 mr-2">•</span>
            <sapn>{costForTwoMessage}</sapn>
          </p>
          <p className="mx-4 mt-2 text-sm font-bold text-orange-500">
            {cuisines.join(", ")}
          </p>
          <div className="flex">
            <div className="flex flex-col text-gray-400 leading-none text-center ml-4 my-1">
              <p className="leading-none -mb-3 text-3xl">•</p>
              <p className="">|</p>
              <p className="">|</p>
              <p className="leading-none -mt-3 text-3xl">•</p>
            </div>
            <div className="flex flex-col mx-4 my-1 p-2 ml-0">
              <p className="font-bold text-sm">
                Outlet <span className="text-gray-500 mx-1">-</span>
                <span className="text-gray-500">
                  {locality},<span className="mx-1">{areaName}</span>
                </span>
              </p>
              <p className="font-bold text-sm mt-[14px]">
                Delivery Time <span className="text-gray-500 mx-1">-</span>
                <span className="text-gray-500">{sla.slaString}</span>
              </p>
            </div>
          </div>
          <div className="h-[1px] bg-gray-100 my-1 mx-4"></div>
          <div className="flex mx-4">
            <div className="text-gray-400 font-bold">
              <FontAwesomeIcon icon={faMotorcycle} />
            </div>
            <div className="text-sm text-gray-400 font-bold ml-2">
              Order above 200/- for discounted dilivery fee
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-center text-gray-500 font-bold mt-10">
        <span className="text-gray-400">--❖</span> M E N U{" "}
        <span className="text-gray-400">❖--</span>
      </h2>

      <div className="btn-container flex max-w-full mt-10 mb-6 justify-start">
        <button className="mr-4 rounded-full my-2 border-2 border-gray-300 py-3 pl-4 pr-3">
          <div className="toggle-border">
            <input
              id="veg"
              type="checkbox"
              checked={showVeg}
              onChange={toggleVeg}
            />
            <label htmlFor="veg" className="veg-label">
              <div className="handle-veg flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-sm text-green-700"
                />
              </div>
            </label>
          </div>
        </button>

        <button className="mx-4 rounded-full my-2 border-2 border-gray-300 py-3 pl-4 pr-3">
          <div className="toggle-border">
            <input
              id="nonVeg"
              type="checkbox"
              checked={showNonVeg}
              onChange={toggleNonVeg}
            />
            <label htmlFor="nonVeg" className="non-veg-label">
              <div className="handle-nonVeg flex justify-center items-center">
                <span className="text-red-600 -mt-[2px] text-lg">▲</span>
              </div>
            </label>
          </div>
        </button>

        <button
          className="ml-4 rounded-full my-2 border-2 border-gray-300 py-3 px-4 font-bold text-gray-500 hover:shadow-lg hover:shadow-gray-400"
          onClick={filterBestseller}
        >
          Bestseller
        </button>
      </div>

      <div className="h-[1px] bg-gray-300 w-full"></div>

      {errorMessage && (
        <div className="flex flex-col justify-center">
          <img
            alt="err"
            src="https://cdn.dribbble.com/userupload/10454226/file/original-cfde1277cf7a96bc6ec7c72efa0b1b49.png?resize=400x300&vertical=center"
            className="mx-auto"
          />
          <h1 className="error-message text-red-500 text-center mb-10 text-3xl font-bold">
            {errorMessage}
          </h1>
        </div>
      )}

      {catagories.map((catagory, index) => (
        <MenuCatagory
          key={catagory.card.card.title}
          data={catagory.card.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
          showVeg={showVeg}
          showNonVeg={showNonVeg}
          showBestseller={showBestseller}
        />
      ))}

      <div className="bg-gray-200 mt-6">
        <div className="flex items-center mx-4">
          <img
            className="w-16 bg-zinc-200 filter grayscale opacity-50"
            alt="fssai"
            src={fssaiLogo}
          />
          <h1 className="text-gray-500 pl-4 text-sm">
            Licence No. <span>XXXXXXXXXXX</span>
          </h1>
        </div>
        <div className="h-[1px] bg-gray-400 mx-4"></div>
        <div className="px-4 py-4 text-gray-400 text-sm">
          <h1 className="font-bold">{name}</h1>
          <h2>Outlet : {areaName}</h2>
          <p className="mt-2">
            {" "}
            <FontAwesomeIcon icon={faLocationDot} /> {locality}
          </p>
        </div>
        <div className="h-[1px] bg-gray-400 mx-4 opacity-50"></div>
        <div className="bg-gray-200 flex justify-center">
          <Link to="/">
            <h1 className="rounded-lg border border-gray-500 text-gray-500 py-2 px-4 mt-10 h-fit font-bold mr-6">
              FoodExpress
            </h1>
          </Link>
          <button
            className="rounded-lg bg-black text-white py-2 px-4 mt-10 h-fit font-bold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Go to top <FontAwesomeIcon icon={faArrowUp} className="ml-1" />
          </button>
        </div>
        <p className="text-sm text-gray-600 text-center pb-10 pt-4">
          All rights reserved | Amol Sasane
        </p>
      </div>

      {isVisible && (
        <div
          className={`toaster ${isVisible ? "toaster-enter" : "toaster-exit"}`}
        >
          <h1>Items added</h1>
          <Link to="/cart">
            <div>
              VIEW CART <FontAwesomeIcon icon={faShoppingBag} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResMenu;
