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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');


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
           // console.log(response);
           // response.data.expiresIn = 7500;   this works just fine, we can alter our client auth status with ease!!!
            //console.log(response, '[altered expiresIn ]');
            
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000);
            localStorage.setItem('token', response.data.idToken);  // saving our token in local storage that's embedded in our browser!!!
            localStorage.setItem('expirationDate', expirationDate); // saving our expiration date and time of our session!!
            // local storage info can be found in our application tab in dev tools!!!!
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch( err => {
            //console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    };
};


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    
    return dispatch => {
        
        const token = localStorage.getItem('token');
            if (!token) {
                dispatch(logout());
            } 
                else {
                    const expirationDate = new Date(localStorage.getItem('expirationDate'));
                    if( expirationDate > new Date()) {
                        const userId = localStorage.getItem('userId');
                        dispatch(authSuccess(token, userId));
                        dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime()) /1000 ));
            }           else {
                                dispatch(logout());                                
                                }
            
        }
    }
}