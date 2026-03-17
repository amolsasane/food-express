/*
===============================================================
Redux Slice: cartSlice
 Purpose: Manage cart items and order state.

 Implementation:
  1. Adds items to the cart and updates quantity.
  2. Removes items or decreases quantity.
  3. Clears the cart when needed.
  4. Tracks order placement and toaster visibility.

 Returns:
  - reducer → exported for Redux store configuration
  - actions → exported for dispatching cart updates
=================================================================
*/

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",

  // Initial Redux state
  initialState: {
    items: [],
    ShowToaster: false,
    hasPlacedOrder: false,
  },

  reducers: {
    // Add item to cart or increase quantity if already present
    addItem: (state, action) => {
      const itemId = action.payload.card.info.id;

      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          id: itemId,
          quantity: 1,
        });
      }

      // Show toaster notification when item is added
      state.ShowToaster = true;
    },

    // Decrease item quantity or remove item if quantity reaches zero
    removeItem: (state, action) => {
      const itemId = action.payload.card.info.id;

      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }

      // Show toaster only if cart still contains items
      state.ShowToaster = state.items.length > 0;
    },

    // Remove all items from the cart
    clearCart: (state) => {
      state.items = [];
      state.ShowToaster = false;
    },

    // Mark that the user has placed an order
    setHasPlacedOrder: (state) => {
      state.hasPlacedOrder = true;
    },
  },
});

// Export reducer for Redux store configuration
export default cartSlice.reducer;

// Export actions for components to dispatch
export const { addItem, removeItem, clearCart, setHasPlacedOrder } =
  cartSlice.actions;
