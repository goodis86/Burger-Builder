import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';



//testing our reducer now!!
//checking if we pass undefined state, we should get back our initial State which is defined before!!

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

// checking if we update our state when we log in and store our token and user id !!!

    it('should store the token upon log in', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, { 
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'something here as well'
        })).toEqual({
            token: 'some-token',
            userId: 'something here as well',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

});

//REDUCERS ARE PRACTICALLY PURE FUNCTIONS AND ARE VERY SIMPLE TO TEST!!!!!!!!!!!

// TESTING SHOULD BE AIMING AT LOGICAL FUNCTIONS AND CORRECT APP WORKFLOW, SO TEST WISELY!!