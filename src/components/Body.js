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
  faXmark,
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
  BURGER_LINK,
  ICECREAM_LINK,
} from "../utils/constants";
import Footer from "./Footer.js";

function Body() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchedRestaurents, setSearchedRestaurents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [heading, setHeading] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [isTopRatedActive, setIsTopRatedActive] = useState(false);
  const [isFastDeliveryActive, setIsFastDeliveryActive] = useState(false);
  const [isLessCostActive, setIsLessCostActive] = useState(false);

  const showLoginPage = useSelector((store) => store.login.login);

  const dispatch = useDispatch();

  const FreeDelivery = WithLabel(ResCard);

  const errorRef = useRef(null);

  useEffect(() => {
    if (errorMessage) {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errorMessage]);

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
        setServerError("Oops! We Hit a Snag! 🚧");
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
    setShowNonVeg(false);
    setIsTopRatedActive(false);
    setIsFastDeliveryActive(false);
    setIsLessCostActive(false);
    setSearchInput("");

    if (vegRestaurants.length === 0) {
      setErrorMessage("No vegetarian restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const toggleNonVeg = () => {
    const nonVegRestaurants = showNonVeg
      ? restaurantsList
      : restaurantsList.filter((res) => !res.info?.hasOwnProperty("veg"));

    setSearchedRestaurents(nonVegRestaurants);
    setShowNonVeg(!showNonVeg);
    setShowVeg(false);
    setIsTopRatedActive(false);
    setIsFastDeliveryActive(false);
    setIsLessCostActive(false);
    setSearchInput("");

    if (nonVegRestaurants.length === 0) {
      setErrorMessage("No non-veg restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterTopRated = () => {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.2
    );

    setIsTopRatedActive(!isTopRatedActive);
    setIsFastDeliveryActive(false);
    setIsLessCostActive(false);
    setSearchInput("");
    isTopRatedActive
      ? setSearchedRestaurents(restaurantsList)
      : setSearchedRestaurents(topRatedRes);

    if (topRatedRes.length === 0) {
      setErrorMessage("No restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterFastDelivery = () => {
    const fastDelRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.5
    );

    setIsTopRatedActive(false);
    setIsFastDeliveryActive(!isFastDeliveryActive);
    setIsLessCostActive(false);
    setSearchInput("");

    isFastDeliveryActive
      ? setSearchedRestaurents(restaurantsList)
      : setSearchedRestaurents(fastDelRes);

    if (fastDelRes.length === 0) {
      setErrorMessage("No restaurants found!");
    } else {
      setErrorMessage("");
    }
  };

  const filterLessCost = () => {
    const lesscostRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.6
    );
    setIsTopRatedActive(false);
    setIsFastDeliveryActive(false);
    setIsLessCostActive(!isLessCostActive);
    setSearchInput("");

    isLessCostActive
      ? setSearchedRestaurents(restaurantsList)
      : setSearchedRestaurents(lesscostRes);

    if (lesscostRes.length === 0) {
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
    setIsTopRatedActive(false);
    setIsFastDeliveryActive(false);
    setIsLessCostActive(false);
    setShowNonVeg(false);
    setShowVeg(false);
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

  return serverError ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="error-container p-6 bg-white rounded-lg shadow-xl shadow-gray-400 text-center bounce-down">
        <h1 className="font-bold text-red-600 text-2xl mb-4">{serverError}</h1>
        <h2 className=" text-gray-800 mb-2">
          It looks like we encountered a{" "}
          <span className="font-bold text-red-500">CORS error</span>, which is
          blocking our access to certain resources. But don't worry; we can fix
          this together!
        </h2>
        <h2 className="font-bold mb-4">Let’s get you back on track :</h2>
        <h3 className="mb-2 font-semibold">
          1. 🌐 Click the magic link below to add a helpful extension that will
          wave goodbye to those pesky CORS errors!
        </h3>
        <a
          href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 w-fit font-semibold text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200 block my-6 mx-auto"
        >
          Add CORS Extension
        </a>
        <h3 className="mb-2 font-semibold">
          2. 🔄 Refresh the page once you’ve got and enabled the extension.
        </h3>
        <p className="text-gray-600 my-4">
          Your adventure shouldn’t be interrupted by technical hiccups! Thank
          you for your understanding. Please refer to this{" "}
          <a
            className="text-blue-600 font-bold underline hover:underline-offset-2"
            href="https://www.youtube.com/watch?v=KruSUqLdxQA&t=44s"
            target="_blank"
            rel="noopener noreferrer"
          >
            video guide
          </a>{" "}
          for instructions on how to enable the CORS Extension.
        </p>
      </div>
    </div>
  ) : restaurantsList.length === 0 ? (
    <div className="shimmer-container pt-[4rem] md:pt-[6rem]">
      <Shimmer />
    </div>
  ) : (
    <div className="fade-in">
      <div className="main max-w-[70rem] m-auto flex pb-10 pt-[6rem]">
        <div>
          <div className="carousel">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl md:text-2xl mt-4 ml-4 lg:ml-0 text-gray-400 bounce-down">
                What's on your mind ?
              </h1>
              <div className="mt-4 md:mt-6 text-2xl">
                <button
                  className="px-3 bg-gray-200 rounded-full mx-2 hover:bg-orange-200 text-gray-600 hover:text-orange-600 text-[1rem] md:text-2xl"
                  onClick={handleScrollLeft}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  className="px-3 bg-gray-200 rounded-full mx-2 hover:bg-orange-200 text-gray-600 hover:text-orange-600 text-[1rem] md:text-2xl"
                  onClick={handleScrollRight}
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
            <div
              className="flex overflow-x-scroll scrollbar-hide slide-right w-full"
              ref={carouselRef}
            >
              <div className="flex min-w-[150%]">
                <img
                  className="w-[10rem] h-[10rem] md:h-auto mx-1 md:mx-4 cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={BURGER_LINK}
                  alt="Burger"
                  onClick={() => handleImageClick("Burger")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={ICECREAM_LINK}
                  alt="Ice Cream"
                  onClick={() => handleImageClick("Ice Cream")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={CAKE_LINK}
                  alt="Cake"
                  onClick={() => handleImageClick("Cake")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={ROLLS_LINK}
                  alt="Rolls"
                  onClick={() => handleImageClick("Rolls")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={PIZZA_LINK}
                  alt="Pizza"
                  onClick={() => handleImageClick("Pizza")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={NOODLES_LINK}
                  alt="Chinese"
                  onClick={() => handleImageClick("Chinese")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={BIRYANI_LINK}
                  alt="Biryani"
                  onClick={() => handleImageClick("Biryani")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={TEA_LINK}
                  alt="Tea"
                  onClick={() => handleImageClick("Tea")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={COFFEE_LINK}
                  alt="Coffee"
                  onClick={() => handleImageClick("Coffee")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={KHICHDI_LINK}
                  alt="Khichdi"
                  onClick={() => handleImageClick("Khichdi")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={DESSERTS_LINK}
                  alt="Desserts"
                  onClick={() => handleImageClick("Desserts")}
                />
                <img
                  className="w-[10rem] mx-4 h-[10rem] md:h-auto cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-90"
                  src={RASGULLA_LINK}
                  alt="Rasgulla"
                  onClick={() => handleImageClick("Rasgulla")}
                />
              </div>
            </div>
          </div>

          <div className="h-[2px] md:mt-8 mt-4 bg-gray-200"></div>

          <div className="flex max-w-full mt-6 mb-10 mx-6 justify-between items-center">
            <div className="btn-container">
              <button className="ml-4 mr-6 rounded-full my-2">
                <div className="toggle-border-main-veg">
                  <input
                    id="one"
                    type="checkbox"
                    checked={showVeg}
                    onClick={toggleVeg}
                  />
                  <label for="one">
                    <div className="handle-main-veg flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="text-green-700"
                      />
                    </div>
                  </label>
                </div>
              </button>

              <button className="mx-4 rounded-full my-2">
                <div className="toggle-border-main-nonveg">
                  <input
                    id="two"
                    type="checkbox"
                    checked={showNonVeg}
                    onClick={toggleNonVeg}
                  />
                  <label for="two">
                    <div className="handle-main-nonveg flex justify-center place-items-center">
                      <span className=" text-red-600 text-2xl -mt-1">▲</span>
                    </div>
                  </label>
                </div>
              </button>

              <button
                className={`hidden lg:inline py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500 ${
                  isTopRatedActive ? "bg-gray-200" : "bg-white"
                } `}
                onClick={filterTopRated}
              >
                Top Rated
              </button>

              <button
                className={`hidden lg:inline py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500  ${
                  isFastDeliveryActive ? "bg-gray-200" : "bg-white"
                }`}
                onClick={filterFastDelivery}
              >
                Fast Delivery
              </button>
              <button
                className={`hidden lg:inline py-2 px-4 mx-4 rounded-full font-bold m-2 border-gray-400 border text-gray-500 hover:shadow-md hover:shadow-gray-500  ${
                  isLessCostActive ? "bg-gray-200" : "bg-white"
                }`}
                onClick={filterLessCost}
              >
                Less than 200/-
              </button>
            </div>

            <form onSubmit={searchedRestaurentBtn}>
              <input
                data-testId="searchInput"
                placeholder="Search for restaurants and food"
                className="bg-gray-100 border-gray-300 py-[6px] px-[1rem] border-2 rounded-tl-full rounded-bl-full w-[10rem] md:w-[17rem]"
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
            <div className="flex flex-col justify-center" ref={errorRef}>
              <img
                alt="err"
                src="https://cdn.dribbble.com/userupload/10454226/file/original-cfde1277cf7a96bc6ec7c72efa0b1b49.png?resize=400x300&vertical=center"
                className="mx-auto"
              />
              <h1 className="error-message text-red-500 text-center mb-10 md:text-3xl text-xl font-bold">
                {errorMessage}
              </h1>
            </div>
          )}

          {heading && (
            <h2 className="text-2xl font-bold mb-6 ml-6">
              Restaurants for {heading}
            </h2>
          )}

          <div className="flex flex-wrap justify-center slide-up">
            {searchedRestaurents.map((restaurant) => (
              <Link
                to={`/restaurant/${restaurant.info.id}`}
                key={restaurant.info.id}
                className="transform transition-transform duration-500 ease-in-out hover:scale-90"
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
              className={`mt-[10vh] login-page fixed z-10 border border-gray-500 shadow-2xl bg-white w-[100vw] lg:w-[40vw] right-0 top-0 h-[90vh] rounded-l-xl transition-transform ${
                showLoginPage ? "animate-slideInRight" : "animate-slideOutRight"
              }`}
            >
              <div className="my-[5rem] mx-[5rem]">
                <button
                  className="text-3xl text-gray-300 hover:text-orange-600"
                  onClick={closeLoginPage}
                >
                  <span className="hidden lg:block">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </span>
                  <span className="lg:hidden">
                    <FontAwesomeIcon icon={faXmark} />
                  </span>
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
