import axios from 'axios';
import { returnErrors } from './errorAction';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOAD_STATE,
    STATE_LOADED
} from './types'


//load state 
export const loadState = () => (dispatch) => {

    dispatch({ type: LOAD_STATE });
}

//state loaded
export const stateLoaded = () => (dispatch) => {

    dispatch({ type: STATE_LOADED });
}

//check token and load teacher
export const loadUser = () => (dispatch, getState) => {

    const role = getState().authReducer.role;
    //teacher loading 
    dispatch({ type: USER_LOADING });

    axios.get(`/${role}/profile`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
};

//login USER 
export const login = ({ id, password, role }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //request body
    const body = JSON.stringify({ id, password });

    axios.post(`/auth/${role}`, body, config)
        .then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })

}

//logout USER
export const logout = () => {

    return {
        type: LOGOUT_SUCCESS
    }
}

//setup config
export const tokenConfig = getState => {

    //get token from localstorage
    const token = getState().authReducer.token;

    //headers
    const config = {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }

    //if token add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }
    return config
}