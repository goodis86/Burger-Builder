import { put } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

// this is not a function - it's a generator - it's main feature is ability to pause during it's code
// execution (great for async actions)
//it's defined as 'function*'
function* logout(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put({
    type: actionTypes.AUTH_LOGOUT,
  });
}
