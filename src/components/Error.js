import { useRouteError } from "react-router-dom";
import errorImg from "../utils/images/err.svg";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="flex justify-center items-center flex-col pt-[8rem]">
      <img alt="error" src={errorImg} className="w-[20rem] md:w-[30rem]" />
      <h1 className="text-red-500 font-bold text-center">Oops..</h1>
      <h2 className="text-gray-500 font-semibold text-center">
        Something went wrong, please refresh the page!
      </h2>
      <h3 className="text-sm text-gray-500 text-center">
        {err.status}: {err.statusText}
      </h3>
    </div>
  );
};

export default Error;
