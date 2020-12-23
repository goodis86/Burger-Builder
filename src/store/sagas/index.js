import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import { fetchOrdersSaga, purchaseBurgerSaga } from "./order";

export function* watchAuth() {
  yield all([       // lets us run multiple tasks simultaniously!!
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga); // will execute only the latest saga
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}


//SAGAS HANDLE ALL SIDE EFFECTS AND ASYNC CODE AND LETS US HAVE LEAN ACTION CREATORS!!!