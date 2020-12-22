import { takeEvery} from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga } from './auth';
import * as actionTypes from '../actions/actionTypes';
//import { checkAuthTimeout } from '../actions/auth';

export function* watchAuth () {
    yield takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}

