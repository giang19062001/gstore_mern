import UserActionTypes from "./user.type";
const INITIAL_STATE = {
  currentUser: null,
  err: null,
  status: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
//login
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,  
        status: UserActionTypes.SIGN_IN_SUCCESS,
      };
    case UserActionTypes.SIGN_IN_PROCESSING:
      return {
        ...state,
        status: UserActionTypes.SIGN_IN_PROCESSING,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        err: action.payload,
        status: UserActionTypes.SIGN_IN_FAILURE,
      };
//logout
      case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
          status:UserActionTypes.SIGN_OUT_SUCCESS,
        };
        case UserActionTypes.SIGN_OUT_FAIL:
          return {
            ...state,
            status:UserActionTypes.SIGN_OUT_FAIL,
          };


//register
      case UserActionTypes.SIGN_UP_SUCCESS:
        return {
          ...state,
          status: UserActionTypes.SIGN_UP_SUCCESS
        };
      case UserActionTypes.SIGN_UP_PROCESSING:
        return {
          ...state,
          status: UserActionTypes.SIGN_UP_PROCESSING,
        };
      case UserActionTypes.SIGN_UP_FAILURE:
        return {
          ...state,
          err: action.payload
        };
 //save 
case UserActionTypes.SAVE_USER_SUCCESS:
  return {
    ...state,
    currentUser:action.payload,
    status: UserActionTypes.SAVE_USER_SUCCESS,
  };
case UserActionTypes.SAVE_USER_PROCCESING:
  return {
    ...state,
    status: UserActionTypes.SAVE_USER_PROCCESING,
  };
case UserActionTypes.SAVE_USER__FAIL:
  return {
    ...state,
    status: UserActionTypes.SAVE_USER__FAIL,
    errors: action.payload
  };
//refresh
    case UserActionTypes.REFRESH_USER:
          console.log(action.payload)
      return {
        ...state,
        currentUser: action.payload,
        status:UserActionTypes.REFRESH_USER
      };

//stop

    case UserActionTypes.STOP_ALL_ACTION:
      return {
        ...state,
        status:UserActionTypes.STOP_ALL_ACTION
      };
    default:
      return state ;
     }
};
export default userReducer;
