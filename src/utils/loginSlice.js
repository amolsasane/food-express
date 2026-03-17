/*
===============================================================
Redux Slice: loginSlice
 Purpose: Manage login modal visibility and login button state.

 Implementation:
  1. Controls whether the login modal is visible.
  2. Updates the login/logout button label.
  3. Provides actions to show/hide login and toggle button state.

 Returns:
  - reducer → exported for Redux store configuration
  - actions → exported for dispatching login state updates
=================================================================
*/

import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",

  // Initial Redux state
  initialState: {
    login: false,
    logInBtn: "Login",
  },

  reducers: {
    // Show login modal if user clicks "Login"
    showLogin: (state) => {
      if (state.logInBtn === "Login") {
        state.login = true;
      }
    },

    // Hide login modal
    hideLogin: (state) => {
      state.login = false;
    },

    // Change button text to "Logout" after successful login
    toggleLoginBtn: (state) => {
      state.logInBtn = "Logout";
    },

    // Reset button text back to "Login"
    turnToLogin: (state) => {
      state.logInBtn = "Login";
    },
  },
});

// Export reducer for store configuration
export default loginSlice.reducer;

// Export actions for components to dispatch
export const { showLogin, hideLogin, toggleLoginBtn, turnToLogin } =
  loginSlice.actions;
