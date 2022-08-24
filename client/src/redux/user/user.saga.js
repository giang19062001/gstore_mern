import { all, call, put, takeLatest,delay} from "redux-saga/effects";
import { signInFailure, 
  signInProcessing, 
  signInSuccess,
  signUpProcessing, 
  signUpFailure, 
  signUpSuccess,
  StopAllAction,
  signOutSuccess,
  signOutFail,
  saveUserProccesing,
  saveUserSuccess,
  saveUserFail
 } from "./user.action";
import UserActionTypes from "./user.type";
import api from '../../api/url'
import {select} from 'redux-saga/effects';
import { selectCurrentUser } from "./user.selector";

const callAPILogin = async (loginInfo) => {
  try {
    const res = await api.post("/v1/auth/login", loginInfo.payload,);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export function* login(loginInfo) {
  try {
    yield put(signInProcessing());
console.log(loginInfo)
    const res = yield call(callAPILogin, loginInfo);
    if(res.data.admin === true ){
        loginInfo.navigate("/admin")
        yield put(StopAllAction());
    }else{
      yield put(signInSuccess(res.data));
      yield delay(2000);
      yield put(StopAllAction());
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, login);
}


//resgister

const callAPIRegister = async (registerInfo) => {
  try {
    const res = api.post("/v1/auth/register", registerInfo, {headers: {
      "Content-Type": "application/json"}
  });
    return res;

  } catch (error) {
      throw new Error(error.message);
  }
}
export function* register (registerInfo) {
  try {
    yield put(signUpProcessing());
    const res = yield call(callAPIRegister, registerInfo.payload);
    yield delay(4000);
    yield put(signUpSuccess());
    yield delay(4000);
    yield put(StopAllAction());

  }
  catch (error) {
    yield put(signUpFailure(error));
  }
}
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, register);
}
//save
const callAPISaveUser = async (userInfo,userStogare) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const res = await api.put(`/v1/auth/update/${userStogare._id}`, userInfo, config);
  return res;
};
export function* saveUser({ payload: userInfo }) {
  
  try {
    const userStogare = yield select(selectCurrentUser);

    yield put(saveUserProccesing());
    // Call API tao product:
    const res = yield call(callAPISaveUser, userInfo,userStogare);
    console.log("res.data",res.data)
    yield put(saveUserSuccess(res.data));
    yield delay(4000);
    yield put(StopAllAction());

  } catch (error) {
    yield put(saveUserFail(error));
  }
}
export function* onSaveUserStart() {
  yield takeLatest(UserActionTypes.SAVE_USER_START, saveUser);
}
//logout 


const callAPILogout = async (axiosJWT) => {
  try {

    const res =  await axiosJWT.post("/v1/auth/logout")
    return res;
  } catch (error) {
      throw new Error(error.message);
  }
}
export function* logout (logoutInfo) {
  try {
    console.log("logoutInfo",logoutInfo)
    const res = yield call(callAPILogout,logoutInfo.payload);

    yield put(signOutSuccess());
    logoutInfo.navigate('/')

  }
  catch (error) {
    yield put(signOutFail(error));
  }
}
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, logout);
}
// Call hàm bắt action
export function* userSaga() {
  yield all([call(onSignInStart),call(onSignUpStart),call(onSignOutStart),call(onSaveUserStart)]);
}
