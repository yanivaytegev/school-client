import {
    USER_LOADED, USER_LOADING,
    AUTH_ERROR, LOGIN_SUCCESS,
    LOGIN_FAIL, LOGOUT_SUCCESS,
    LOAD_STATE, STATE_LOADED
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name'),
    user: null,
    isAuthenticated: false,
    isLoading: false
}

export default function (state = initialState, action) {

    if (state.token) {
        state.isAuthenticated = true
    }

    switch (action.type) {

        case USER_LOADING:
        case LOAD_STATE:
            return {
                ...state,
                isLoading: true
            };
        case STATE_LOADED:
            return {
                ...state,
                isLoading: false
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('name', action.payload.name);
            window.location.reload(false);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
            if (action.type === 'LOGOUT_SUCCESS') window.location.href = '/';
            return {
                ...state,
                token: null,
                user: null,
                role: null,
                name: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state
    }
}