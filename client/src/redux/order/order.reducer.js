import orderActionType from "./order.type";
const INITIAL_STATE = {
  order: [],
  status:""
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionType.GET_ORDER_BY_USER_SUCCESS:
      return {
            ...state,
            order: action.payload,
          }   
   case orderActionType.CREATE_ORDER_PROCESSING:
       return {
                 ...state,
                  status: orderActionType.CREATE_ORDER_PROCESSING,
              } 
    case orderActionType.CREATE_ORDER_SUCCESS:
        return {
              ...state,
              order: [...state.order,action.payload],
            }            
    case orderActionType.CREATE_ORDER_DETAIL_SUCCESS:
      const orders = state.order.map(orderList =>
            orderList._id === action.payload[0].order
              ? {...orderList, orderDetail:action.payload}
              : {...orderList}
      );
      return {
        ...state,
        order: orders,
        status: orderActionType.CREATE_ORDER_DETAIL_SUCCESS,

      }
      case orderActionType.STOP_ALL_ACTION:
      return {
        ...state,
        status:orderActionType.STOP_ALL_ACTION
      };
    default:
      return state;
  }
};

export default orderReducer;
