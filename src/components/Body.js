import ResCard, { WithLabel } from "./ResCard.js";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer.js";
import { SWIGGY_API } from "../utils/constants.js";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/UserContext.js";

function Body() {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [searchedRestaurents, setSearchedRestaurents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginBtn, setLoginBtn] = useState("Login");
  const [loginInput, setLoginInput] = useState();

  const { setUserName } = useContext(UserContext);

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
    {
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
  }
  function loginBtnCall() {
    if (loginBtn === "Login") {
      setLoginBtn("Logout");
      setUserName(loginInput);
    } else {
      setLoginBtn("Login");
      setUserName("Guest User");
      // Clear the input box value
      setLoginInput("");
    }
  }

  return restaurantsList.length === 0 ? (
    <div className="shimmer-container">
      {Array.from({ length: 10 }).map((_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  ) : (
    <div className="main max-w-[70rem] m-auto">
      <div className="flex max-w-[60rem] mt-6 mb-10 mx-auto justify-between items-center">
        <div className="btn-container m-4">
          <button
            className="bg-green-100 p-2 rounded-lg font-bold"
            onClick={() => {
              topRatedRestaurantBtn();
            }}
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
            onClick={() => {
              searchedRestaurentBtn();
            }}
          >
            Search
          </button>
        </div>

        <div className="m-4">
          <input
            className="bg-gray-100 border-gray-300 py-[4px] px-[6px] border-2 rounded-tl-lg rounded-bl-lg"
            placeholder="Enter User Name"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
          />

          <button
            className={`font-bold ${
              loginBtn === "Logout" ? "bg-red-100" : "bg-green-100"
            } ml-2 text-black-200 p-[5px] pr-[1rem] pl-[1rem] rounded-tr-lg rounded-br-lg`}
            onClick={loginBtnCall}
          >
            {loginBtn}
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
  );
}

export default Body;
