import React from "react";
import loader from "../utils/images/loader.gif";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center fixed inset-0 w-[80%] m-auto">
      <img
        alt="loader"
        src={loader}
        className="md:w-[20%] w-[30%] mt-[10rem]"
      />
      <div className="w-full h-1 bg-gray-900 bg-gradient-to-r from-white via-gray-400 to-white"></div>
    </div>
  );
};

export default Loader;
