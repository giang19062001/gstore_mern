import { all, call, put, takeLatest,delay } from "redux-saga/effects";
import api from '../../api/url'
import {createOrderDetailSuccess,createOrderDetailFail,createOrderSuccess,createOrderFail,createOrderProcessing,getOrderByUser,getOrderByUserSuccess } 
from "./order.action";
import orderActionType from "./order.type";
import { selectShopCart } from "../cart/cart.selector";
import {select} from 'redux-saga/effects';

const callAPIOrder= async (orderInfo) => {
    try {
      const res = await api.post("/v1/order", orderInfo, {headers: {
        "Content-Type": "application/json"}
    });
      return res;
  
    } catch (error) {
        throw new Error(error.message);
    }
  }
  const callAPIOrderDetail= async (orderdetailInfo) => {
    try {

      const res = api.post("/v1/orderDetail", orderdetailInfo, {headers: {
        "Content-Type": "application/json"}
    });
      return res;
    
    } catch (error) {
        throw new Error(error.message);
    }
  }
  const callAPIGetOrderByUser = async (userInfo) => {
    try {
  
      const res = await api.get(`/v1/order/user/${userInfo}`);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  export function* createOrderSaga (orderInfo) {

    const cartList = yield select(selectShopCart);
  try {  
    yield put(createOrderProcessing());

      const res = yield call(callAPIOrder, orderInfo.payload);
      let arrDetail = [];
      let orderDetail = [] ;
      for(let i = 0 ;i<cartList.length ; i++){
        const objDetail = {
            order:res.data._id,
            quantity: cartList[i].quantity,
            iphone: cartList[i]._id,
        }
        arrDetail.push(objDetail);
      }
      for(let i = 0 ;i<cartList.length ; i++){
        const  resDetail = yield call(callAPIOrderDetail, arrDetail[i]);
        orderDetail.push(resDetail.data)
      }

      yield put(createOrderSuccess(res.data));
      yield put(createOrderDetailSuccess(orderDetail))


    } catch (error) {
        yield put(createOrderFail(error));
        yield put(createOrderDetailFail(error));
      }

  }
  export function* onAddOrderInfo() {
    yield takeLatest(orderActionType.CREATE_ORDER, createOrderSaga);
  }
//get order by user
  export function* getOrderByUserSaga (orderInfo) {

  try {  

      const res = yield call(callAPIGetOrderByUser, orderInfo.payload);
    console.log(res.data)
      yield put(getOrderByUserSuccess(res.data))


    } catch (error) {
        throw new error
      }

  }
  export function* onGetOrderByUser() {
    yield takeLatest(orderActionType.GET_ORDER_BY_USER, getOrderByUserSaga);
  }
export function* orderSaga() {
  yield all([call(onAddOrderInfo),call(onGetOrderByUser)]);
}
