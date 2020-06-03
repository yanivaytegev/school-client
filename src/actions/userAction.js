import axios from 'axios';
import { returnErrors } from './errorAction';
import { tokenConfig } from './authAction';
import {
    GET_USERS, GET_ACTIVITIES, ADD_ACTIVITY, ADD_ACTIVITY_FAIL, GET_TEACHERS, REGISTER_SUCCESS,
    LOADING_USERS, DELETE_USER, UPDATE_USER, UPDATE_FAIL, MY_CLASS
} from './types';


export const getUsers = (id) => (dispatch, getState) => {

    dispatch(loadingUsers());

    axios.get(`/${id}`, tokenConfig(getState))
        .then((users) =>
            dispatch({
                type: GET_USERS,
                payload: users.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const getActivities = () => (dispatch, getState) => {

    dispatch(loadingUsers());

    axios.get(`manager/activity`, tokenConfig(getState))
        .then((activities) =>
            dispatch({
                type: GET_ACTIVITIES,
                payload: activities.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const addActivity = (newActivity) => (dispatch, getState) => {

    axios.post(`manager/activity`, newActivity, tokenConfig(getState))
        .then((activity) =>
            dispatch({
                type: ADD_ACTIVITY,
                payload: activity.data
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_ACTIVITY_FAIL'))
            dispatch({
                type: ADD_ACTIVITY_FAIL
            })
        })
}

export const teachers = () => (dispatch, getState) => {

    dispatch(loadingUsers());

    axios.get(`/teacher`, tokenConfig(getState))
        .then((users) =>
            dispatch({
                type: GET_TEACHERS,
                payload: users.data.users.map(item => {
                    return {
                        name: `${item.firstName} ${item.lastName}`,
                        id: item._id,
                        class: item.class
                    }
                })
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const myClass = (role) => (dispatch, getState) => {

    dispatch(loadingUsers());


    axios.get(`/${role}/myClass`, tokenConfig(getState))
        .then((users) =>
            dispatch({
                type: MY_CLASS,
                payload: users.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )

}

export const loadingUsers = () => {

    return {
        type: LOADING_USERS,
    }
}

export const deleteUser = (id, role) => (dispatch, getState) => {

    axios.delete(`/${role}/${id}`, tokenConfig(getState))
        .then((user) =>
            dispatch({
                type: DELETE_USER,
                payload: user.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
}

export const addUser = (newUser, role) => (dispatch, getState) => {

    if (role === '') role = getState().authReducer.role;

    axios.post(`/${role}/register`, newUser, tokenConfig(getState))
        .then((user) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: user.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
        })
}

export const updateUser = (newUser, role) => (dispatch, getState) => {

    axios.post(`/${role}`, newUser, tokenConfig(getState))
        .then((user) =>
            dispatch({
                type: UPDATE_USER,
                payload: user.data.msg
            })
        )
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "UPDATE_FAIL"));
            dispatch({
                type: UPDATE_FAIL
            })
        }
        )
}






