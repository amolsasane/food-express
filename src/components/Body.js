import React, { useState, useEffect } from "react";
import ResCard, { WithLabel } from "./ResCard.js";
import Shimmer from "./Shimmer.js";
import { SWIGGY_API } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import Login from "./Login.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { hideLogin } from "../utils/loginSlice.js";

function Body() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchedRestaurents, setSearchedRestaurents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showLoginPage = useSelector((store) => store.login.login);
  const dispatch = useDispatch();

  const FreeDelivery = WithLabel(ResCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(SWIGGY_API);
    const result = await data.json();
    setRestaurantsList(
      result.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );

    setSearchedRestaurents(
      result.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h1>Oh.. You are offline!</h1>;

  function topRatedRestaurantBtn() {
    const topRatedRes = restaurantsList.filter(
      (res) => res.info.avgRating > 4.2
    );
    setRestaurantsList(topRatedRes);
  }

  function searchedRestaurentBtn() {
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
  }

  const closeLoginPage = () => {
    dispatch(hideLogin());
  };

  const [isVisible, setIsVisible] = useState(showLoginPage);

  useEffect(() => {
    if (showLoginPage) {
      setIsVisible(true);
    } else {
      // Trigger slide-out animation
      const timer = setTimeout(() => setIsVisible(false), 1000); // Match duration of slide-out animation
      return () => clearTimeout(timer);
    }
  }, [showLoginPage]);

  return restaurantsList.length === 0 ? (
    <div className="shimmer-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  ) : (
    <div className="main max-w-[70rem] m-auto flex">
      <div>
        <div className="flex max-w-[60rem] mt-6 mb-10 mx-auto justify-between items-center">
          <div className="btn-container m-4">
            <button
              className="bg-green-100 p-2 rounded-lg font-bold"
              onClick={topRatedRestaurantBtn}
            >
              Top Rated Restaurents
            </button>
          </div>

          <div className="m-4">
            <input
              data-testId="searchInput"
              className="bg-gray-100 border-gray-300 p-[4px] border-2 rounded-tl-full rounded-bl-full"
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              className="bg-blue-100 p-[5px] pr-[1rem] pl-[1rem] rounded-tr-full rounded-br-full ml-2"
              onClick={searchedRestaurentBtn}
            >
              Search
            </button>
          </div>
        </div>
        <div className="error-msg-container">
          <h1 className="text-[2rem] font-bold text-red-500 text-center">
            {errorMessage}
          </h1>
        </div>

        <div className="flex flex-wrap justify-center">
          {searchedRestaurents.map((restaurant) => (
            <Link
              className="res-card-link"
              to={"/restaurant/" + restaurant.info.id}
              key={restaurant.info.id}
            >
              {restaurant?.info?.avgRating > 4.2 ? (
                <FreeDelivery resData={restaurant} />
              ) : (
                <ResCard resData={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
      {isVisible && (
        <div
          className={`login-page absolute z-10 border border-gray-500 shadow-2xl bg-white w-[40vw] right-0 top-0 h-[100vh] rounded-l-xl transition-transform ${
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
      )}
    </div>
  );
}

export default Body;
