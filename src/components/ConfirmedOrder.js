import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import successful from "../utils/images/successful.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../utils/UserContext";

const ConfirmedOrder = () => {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div>
      {showLoader ? (
        <div className="loader fade-in flex items-center justify-center mt-[15rem]">
          <div className="mx-auto text-center">
            <div className="payment-loader mx-auto mb-6"></div>
            <h1 className="font-semibold text-2xl text-gray-600">
              Processing your payment...
            </h1>
          </div>
        </div>
      ) : (
        <div className="paid zoom-in">
          <img
            alt="successful"
            src={successful}
            className="w-[40rem] mt-[3rem] m-auto pulse"
          />
          <h1 className="text-center font-semibold text-3xl text-gray-500">
            Order Placed!
          </h1>
          <p className="text-center mt-2 text-lg text-gray-700">
            Thank you for your order {loggedInUser}. Your food will arrive
            shortly.
          </p>
          <button
            className="btn-backhome px-4 py-2 mx-auto flex items-center justify-center mt-4 text-white bg-green-500 hover:bg-green-600"
            onClick={handleBackToHome}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} className="mr-2" />
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfirmedOrder;
