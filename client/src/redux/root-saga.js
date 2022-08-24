import { all, call } from "redux-saga/effects";
import { userSaga } from "./user/user.saga";
import { orderSaga } from "./order/order.saga";
export default function* rootSaga() {
  yield all([call(userSaga),call(orderSaga)]);
}
