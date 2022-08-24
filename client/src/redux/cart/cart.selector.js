import { createSelector } from "reselect";


const selectCart = (state) => state.cart;


export const selectShopCart = createSelector(
  [selectCart],
  (cart) => cart.cart
);

