import React, { useState, useEffect, useRef } from "react";
import ResCard, { WithLabel } from "./ResCard.js";
import Shimmer from "./Shimmer.js";
import { SWIGGY_API } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import Login from "./Login.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faMagnifyingGlass,
  faChevronLeft,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
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
import Footer from "./Footer.js";

function Body() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchedRestaurents, setSearchedRestaurents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [heading, setHeading] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const showLoginPage = useSelector((store) => store.login.login);
  const dispatch = useDispatch();

  const FreeDelivery = WithLabel(ResCard);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(SWIGGY_API);
        const result = await data.json();
        const restaurants =
          result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;
        if (restaurants) {
          setRestaurantsList(restaurants);
          setSearchedRestaurents(restaurants);
          setDataFetched(true);
        }
      } catch (error) {
        setErrorMessage("Error fetching data!");
      }
    };

    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched]);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>Oh.. You are offline!</h1>;

  const toggleVeg = () => {
    const vegRestaurants = showVeg
      ? restaurantsList
      : restaurantsList.filter((res) => res.info.veg === true);

    setSearchedRestaurents(vegRestaurants);
    setShowVeg(!showVeg);

    if (vegRestaurants.length === 0) {
      setErrorMessage("No vegetarian restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterTopRated = () => {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.2
    );
    setSearchedRestaurents(topRatedRes);

    if (topRatedRes.length === 0) {
      setErrorMessage("No restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterFastDelivery = () => {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.5
    );
    setSearchedRestaurents(topRatedRes);

    if (topRatedRes.length === 0) {
      setErrorMessage("No restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterLessCost = () => {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.6
    );
    setSearchedRestaurents(topRatedRes);

    if (topRatedRes.length === 0) {
      setErrorMessage("No restaurants found!");
    } else {
      setErrorMessage("");
    }
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
      setHeading("");
    } else {
      setErrorMessage("");
      setHeading(altText);
    }

    setSearchedRestaurents(filteredRestaurent);
  };

  return restaurantsList.length === 0 ? (
    <div className="shimmer-container">
      <Shimmer />
    </div>
  ) : (
    <div>
      <div className="main max-w-[70rem] m-auto flex pb-10">
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

          <div className="flex max-w-full mt-6 mb-10 mx-6 justify-between items-center">
            <div className="btn-container">
              <button className="mx-4 rounded-full my-2">
                <div class="toggle-border">
                  <input id="one" type="checkbox" onClick={toggleVeg} />
                  <label for="one">
                    <div class="handle">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="mt-[7px] text-green-700"
                      />
                    </div>
                  </label>
                </div>
              </button>

              <button
                className="py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500"
                onClick={filterTopRated}
              >
                Top Rated
              </button>

              <button
                className="py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500"
                onClick={filterFastDelivery}
              >
                Fast Delivery
              </button>
              <button
                className="py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500"
                onClick={filterLessCost}
              >
                Less than 200/-
              </button>
            </div>

            <form className="" onSubmit={searchedRestaurentBtn}>
              <input
                data-testId="searchInput"
                placeholder="Search for restaurants and food"
                className="bg-gray-100 border-gray-300 py-[6px] px-[1rem] border-2 rounded-tl-full rounded-bl-full w-[17rem]"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                className="bg-zinc-500 hover:bg-orange-500 text-md p-[6px] pr-[1rem] pl-[1rem] rounded-tr-full rounded-br-full ml-2 text-white border-2 border-zinc-500 hover:border-orange-500"
                type="submit"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
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

          {heading && (
            <h2 className="text-2xl font-bold mb-6 ml-6">
              Restaurants for {heading}
            </h2>
          )}

          <div className="flex flex-wrap justify-center">
            {searchedRestaurents.map((restaurant) => (
              <Link
                to={`/restaurant/${restaurant.info.id}`}
                key={restaurant.info.id}
                className="transition-transform duration-300 ease-in-out hover:transform hover:scale-90"
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
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            <div
              className={`login-page fixed z-10 border border-gray-500 shadow-2xl bg-white w-[40vw] right-0 top-0 h-[100vh] rounded-l-xl transition-transform ${
                showLoginPage ? "animate-slideInRight" : "animate-slideOutRight"
              }`}
            >
              <div className="my-[5rem] mx-[5rem]">
                <button
                  className="text-3xl text-gray-300 hover:text-orange-600"
                  onClick={closeLoginPage}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <Login />
              </div>
            </div>
          </>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Body;
