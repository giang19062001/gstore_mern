import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cart.reducer";
import orderReducer from "./order/order.reducer";
import userReducer from "./user/user.reducer";
import notifyReducer from "./notify/notify.reducer";
const persistConfig = {
  key: "root", 
  storage,
  whitelist: ["cart","user","order"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  order:orderReducer,
 notify: notifyReducer
  
});
export default persistReducer(persistConfig, rootReducer);
