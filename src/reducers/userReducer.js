import { GET_USERS, GET_ACTIVITIES, GET_TEACHERS, MY_CLASS, REGISTER_SUCCESS, DELETE_USER, LOADING_USERS, UPDATE_USER } from '../actions/types'

const initialState = {
    users: [],
    loading: false,
    teachers: [],
    activities: [],
    msg: null
}


export default function (state = initialState, action) {


    switch (action.type) {

        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case MY_CLASS:
        case GET_USERS:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case REGISTER_SUCCESS:
            alert('REGISTER SUCCESSFULLY')
            return {
                ...state,
                msg: action.payload.msg
            }
        case GET_TEACHERS:
            return {
                ...state,
                teachers: action.payload
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload)
            }
        case LOADING_USERS:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER:
            alert('UPDATE SUCCESSFULLY')
            return {
                ...state,
                msg: action.payload
            }
        default:
            return state
    }
}