import cartActionType from "./cart.type";

export const addItemCart = (cartInfo) => ({
  type: cartActionType.ADD_ITEM_CART,
  payload: cartInfo,
});
export const addItemCartSuccess = (cartInfo) => ({
  type: cartActionType.ADD_ITEM_CART_SUCCESS,
  payload: cartInfo,
});
export const deleteItemCart = (idItem) => ({
  type: cartActionType.DELETE_ITEM_CART,
  payload: idItem,
});
export const deleteItemCartSuccess = (idItem) => ({
  type: cartActionType.DELETE_ITEM_CART_SUCCESS,
  payload: idItem,
});
export const deleteAllCart = () => ({
  type: cartActionType.DELETE_ALL_CART,
  payload: "",
});
