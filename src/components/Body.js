import React, { useState, useEffect, useRef } from "react";
import ResCard, { WithLabel } from "./ResCard.js";
import Shimmer from "./Shimmer.js";
import { SWIGGY_API } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import Login from "./Login.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { hideLogin } from "../utils/loginSlice.js";
import {
  COFFEE_LINK,
  DESSERTS_LINK,
  NOODLES_LINK,
  KHICHDI_LINK,
  ROLLS_LINK,
  PIZZA_LINK,
  CAKE_LINK,
  RASGULLA_LINK,
  TEA_LINK,
  BIRYANI_LINK,
  ICECREAM_LINK,
} from "../utils/constants";

function Body() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchedRestaurents, setSearchedRestaurents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [heading, setHeading] = useState(""); // State to store the heading text

  const showLoginPage = useSelector((store) => store.login.login);
  const dispatch = useDispatch();

  const FreeDelivery = WithLabel(ResCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const result = await data.json();
    const restaurants =
      result.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
    setRestaurantsList(restaurants);
    setSearchedRestaurents(restaurants);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>Oh.. You are offline!</h1>;

  const topRatedRestaurantBtn = () => {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.2
    );
    setRestaurantsList(topRatedRes);
  };

  const searchedRestaurentBtn = (event) => {
    event.preventDefault();

    const filteredRestaurent = restaurantsList.filter(
      (res) =>
        res.info.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        res.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(searchInput.toLowerCase())
        )
    );

    filteredRestaurent.length === 0
      ? setErrorMessage("No matching restaurants found!")
      : setErrorMessage("");

    setSearchedRestaurents(filteredRestaurent);
    setHeading("");
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

  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      const newScrollPosition = Math.max(scrollPosition - 300, 0);
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      const maxScrollLeft =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const newScrollPosition = Math.min(scrollPosition + 300, maxScrollLeft);
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
      setScrollPosition(newScrollPosition);
    }
  };

  // Handler to filter restaurants based on carousel image click
  const handleImageClick = (altText) => {
    const filteredRestaurent = restaurantsList.filter(
      (res) =>
        res.info.name.toLowerCase().includes(altText.toLowerCase()) ||
        res.info.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(altText.toLowerCase())
        )
    );

    if (filteredRestaurent.length === 0) {
      setErrorMessage(`No matching restaurants found for ${altText}!`);
      setHeading(""); // Clear heading if no results found
    } else {
      setErrorMessage("");
      setHeading(altText); // Set heading to altText when results are found
    }

    setSearchedRestaurents(filteredRestaurent);
  };

  return restaurantsList.length === 0 ? (
    <div className="shimmer-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  ) : (
    <div className="main max-w-[70rem] m-auto flex">
      <div>
        <div className="carousel">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl mt-4">What's on your mind?</h1>
            <div className="mt-6 text-2xl">
              <button
                className="px-3 bg-gray-200 rounded-full mx-2 hover:bg-orange-200 text-gray-600 hover:text-orange-600"
                onClick={handleScrollLeft}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                className="px-3 bg-gray-200 rounded-full mx-2 hover:bg-orange-200 text-gray-600 hover:text-orange-600"
                onClick={handleScrollRight}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
          <div
            className="flex overflow-x-scroll scrollbar-hide"
            style={{ width: "100%" }}
            ref={carouselRef}
          >
            <div className="flex" style={{ minWidth: "150%" }}>
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={ICECREAM_LINK}
                alt="Ice Cream"
                onClick={() => handleImageClick("Ice Cream")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={CAKE_LINK}
                alt="Cake"
                onClick={() => handleImageClick("Cake")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={ROLLS_LINK}
                alt="Rolls"
                onClick={() => handleImageClick("Rolls")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={PIZZA_LINK}
                alt="Pizza"
                onClick={() => handleImageClick("Pizza")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={NOODLES_LINK}
                alt="Chinese"
                onClick={() => handleImageClick("Chinese")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={BIRYANI_LINK}
                alt="Biryani"
                onClick={() => handleImageClick("Biryani")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={TEA_LINK}
                alt="Tea"
                onClick={() => handleImageClick("Tea")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={COFFEE_LINK}
                alt="Coffee"
                onClick={() => handleImageClick("Coffee")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={KHICHDI_LINK}
                alt="Khichdi"
                onClick={() => handleImageClick("Khichdi")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={DESSERTS_LINK}
                alt="Desserts"
                onClick={() => handleImageClick("Desserts")}
              />
              <img
                className="w-[10rem] mx-4 cursor-pointer"
                src={RASGULLA_LINK}
                alt="Rasgulla"
                onClick={() => handleImageClick("Rasgulla")}
              />
            </div>
          </div>
        </div>

        <div className="h-[2px] mt-8 bg-gray-200"></div>

        <div className="flex max-w-[60rem] mt-6 mb-10 mx-auto justify-between items-center">
          <div className="btn-container m-4">
            <button
              className="bg-green-100 p-2 rounded-lg font-bold"
              onClick={topRatedRestaurantBtn}
            >
              Top Rated Restaurents
            </button>
          </div>

          <form className="m-4" onSubmit={searchedRestaurentBtn}>
            <input
              data-testId="searchInput"
              className="bg-gray-100 border-gray-300 p-[4px] border-2 rounded-tl-full rounded-bl-full"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="bg-blue-100 p-[5px] pr-[1rem] pl-[1rem] rounded-tr-full rounded-br-full ml-2"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {errorMessage && (
          <div className="error-message text-red-500 text-center mb-4 text-3xl font-bold">
            {errorMessage}
          </div>
        )}

        {heading && <h2 className="text-3xl font-bold mb-4 ml-6">{heading}</h2>}

        <div className="flex flex-wrap">
          {searchedRestaurents.map((restaurant) => (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
            >
              {restaurant.info.avgRating > 4.2 ? (
                <FreeDelivery resData={restaurant} label={"Free Delivery"} />
              ) : (
                <ResCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>

      {isVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
            showLoginPage ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative">
            <Login close={closeLoginPage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
