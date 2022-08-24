import orderActionType from "./order.type";

export const createOrder = (orderInfo) => ({
  type: orderActionType.CREATE_ORDER,
  payload: orderInfo,
});


export const createOrderProcessing = () => ({
  type: orderActionType.CREATE_ORDER_PROCESSING,
  payload: "",
});

export const createOrderSuccess = (orderInfo) => ({
  type: orderActionType.CREATE_ORDER_SUCCESS,
  payload: orderInfo,
});
export const createOrderFail = (error) => ({
  type: orderActionType.CREATE_ORDER_FAIL,
  payload: error,
});
//order detail
export const createOrderDetail = (orderInfo) => ({
  type: orderActionType.CREATE_ORDER_DETAIL,
  payload: orderInfo,
});

export const createOrderDetailSuccess = (orderInfo) => ({
  type: orderActionType.CREATE_ORDER_DETAIL_SUCCESS,
  payload: orderInfo,
});

export const createOrderDetailFail = (error) => ({
  type: orderActionType.CREATE_ORDER_FAIL,
  payload: error,
});
//get order

export const getOrderByUser = (orderUser) => ({
  type: orderActionType.GET_ORDER_BY_USER,
  payload: orderUser,
});
export const getOrderByUserSuccess = (orderUser) => ({
  type: orderActionType.GET_ORDER_BY_USER_SUCCESS,
  payload: orderUser,
});

//stop
export const StopAllAction = () => ({
  type: orderActionType.STOP_ALL_ACTION,
});
