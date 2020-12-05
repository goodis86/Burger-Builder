import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
            setTimeout(() => {
                dispatch(logout());
            }, expirationTime*1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH13qdiLzBAIsMxMHWLcrzeT01l19tpLE';
        
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH13qdiLzBAIsMxMHWLcrzeT01l19tpLE';
        }


        axios.post(url, authData)
        .then(response => {
            console.log(response);
           // response.data.expiresIn = 7500;   this works just fine, we can alter our client auth status with ease!!!
            //console.log(response, '[altered expiresIn ]');
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch( err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    };
};

