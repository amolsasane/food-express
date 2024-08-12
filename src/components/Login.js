import React, { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import { useDispatch } from "react-redux";
import { toggleLoginBtn, hideLogin } from "../utils/loginSlice";

function Login() {
  const [loginInput, setLoginInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoggedInUser } = useContext(UserContext);
  const dispatch = useDispatch();

  function loginBtnCall(e) {
    e.preventDefault();

    if (!loginInput) {
      setErrorMessage("Please enter your name❗");
      return;
    }

    dispatch(toggleLoginBtn());
    setLoggedInUser(loginInput);
    dispatch(hideLogin());
  }

  return (
    <div>
      <h1 className="font-bold text-4xl my-6">Login</h1>
      <form className="flex flex-col" onSubmit={loginBtnCall}>
        <input
          className="bg-gray-200 shadow-2xl rounded-xl text-xl p-6"
          type="text"
          value={loginInput}
          onChange={(e) => {
            setLoginInput(e.target.value);
            if (e.target.value) {
              setErrorMessage("");
            }
          }}
          placeholder="Enter Your Name"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm p-2">{errorMessage}</p>
        )}
        <button
          className="font-bold bg-black text-white mt-6 mb-2 p-3 text-xl rounded-xl text-black-200 shadow-2xl hover:bg-orange-600"
          type="submit"
        >
          Login
        </button>
        <p className="text-xs p-2">
          By clicking on Login, I accept the Terms & Conditions & Privacy Policy
          ✅
        </p>
      </form>
    </div>
  );
}

export default Login;
