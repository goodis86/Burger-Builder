import { delay } from 'redux-saga/effects';
import { put } from "redux-saga/effects";

import * as actions from '../actions/index';

// this is not a function - it's a generator - it's main feature is ability to pause during it's code
// execution (great for async actions)
//it's defined as 'function*'
export function* logoutSaga (action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga (action) {
    yield delay(action.expirationTime*1000);
    yield put(actions.logout());
  
}