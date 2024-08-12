import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    login: false,
    logInBtn: "Login",
  },
  reducers: {
    showLogin: (state) => {
      if (state.logInBtn === "Login") {
        state.login = true;
      }
    },
    hideLogin: (state) => {
      state.login = false;
    },
    toggleLoginBtn: (state) => {
      state.logInBtn = "Logout";
    },
    turnToLogin: (state) => {
      state.logInBtn = "Login";
    },
  },
});

export default loginSlice.reducer;
export const { showLogin, hideLogin, toggleLoginBtn, turnToLogin } =
  loginSlice.actions;
