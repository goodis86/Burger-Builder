import { delay } from "redux-saga/effects";
import { put, call } from "redux-saga/effects";

import * as actions from "../actions/index";
import axios from "axios";

// this is not a function - it's a generator - it's main feature is ability to pause during it's code
// execution (great for async actions)
//it's defined as 'function*'
export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token");  // this call function lets us make these generators testable!
  yield call([localStorage, "removeItem"], "expirationDate");
  yield call([localStorage, "removeItem"], "userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH13qdiLzBAIsMxMHWLcrzeT01l19tpLE";

  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH13qdiLzBAIsMxMHWLcrzeT01l19tpLE";
  }

  try {
    const response = yield axios.post(url, authData); // execution will paused on this line until this promise resolves or rejects!!

    // console.log(response);
    // response.data.expiresIn = 7500;   this works just fine, we can alter our client auth status with ease!!!
    //console.log(response, '[altered expiresIn ]');

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken); // saving our token in local storage that's embedded in our browser!!!
    yield localStorage.setItem("expirationDate", expirationDate); // saving our expiration date and time of our session!!
    // local storage info can be found in our application tab in dev tools!!!!
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem("userId");
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
