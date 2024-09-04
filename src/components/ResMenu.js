import Loader from "./Loader";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import MenuCatagory from "../components/MenuCatagory";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMotorcycle } from "@fortawesome/free-solid-svg-icons";

const ResMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const [errorMessage] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);

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
  };

  // Toggle non-veg items
  const toggleNonVeg = () => {
    setShowNonVeg(!showNonVeg);
    setShowVeg(false);
  };

  return (
    <div className="res-menu max-w-[50rem] m-auto">
      <h1 className="font-bold text-3xl pt-4 ml-4 text-start mt-[2rem]">
        {name}
      </h1>
      <div className="bg-gray-200 w-full h-[14rem] my-2 rounded-b-[2rem] bg-gradient-to-b from-white p-4">
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

      <div className="flex max-w-full mt-6 mb-10 mx-6 justify-between items-center">
        <div className="btn-container">
          <button className="mx-4 rounded-full my-2">
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

          <button className="mx-4 rounded-full my-2">
            <div className="toggle-border">
              <input
                id="nonVeg"
                type="checkbox"
                checked={showNonVeg}
                onChange={toggleNonVeg}
              />
              <label htmlFor="nonVeg" className="non-veg-label">
                <div className="handle-nonVeg flex justify-center items-center">
                  <span className="text-red-600">▲</span>
                </div>
              </label>
            </div>
          </button>
        </div>
      </div>

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
        />
      ))}
    </div>
  );
};

export default ResMenu;
