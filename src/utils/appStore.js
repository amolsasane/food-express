/*
===============================================================
Redux Store: appStore
 Purpose: Configure and create the global Redux store.

 Implementation:
  1. Imports reducers from feature slices.
  2. Combines them into a single root reducer.
  3. Creates the Redux store using Redux Toolkit.

 Returns:
  - appStore → Centralized state management for the application
=================================================================
*/

import { configureStore } from "@reduxjs/toolkit";

// Import feature reducers
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";

// Configure Redux store
const appStore = configureStore({
  reducer: {
    cart: cartReducer, // Manages cart state
    login: loginReducer, // Manages login modal and login button state
  },
});

// Export store for use in <Provider>
export default appStore;
