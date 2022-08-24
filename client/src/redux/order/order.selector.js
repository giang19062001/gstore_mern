import { createSelector } from "reselect";


const selectOrder = (state) => state.order;


export const selectOrderList = createSelector(
  [selectOrder],
  (order) => order.order
);


export const selectOrderStatus = createSelector(
  [selectOrder],
  (order) => order.status
);
