import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    items: [],
    ShowToaster: false,
    hasPlacedOrder: false,
  },
  reducers: {
    addItem: (state, action) => {
      const itemId = action.payload.card.info.id;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, id: itemId, quantity: 1 });
      }
      state.ShowToaster = true;
    },
    removeItem: (state, action) => {
      const itemId = action.payload.card.info.id;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity -= 1;
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
      state.ShowToaster = state.items.length > 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.ShowToaster = false;
    },
    setHasPlacedOrder: (state) => {
      state.hasPlacedOrder = true;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart, setHasPlacedOrder } =
  cartSlice.actions;
