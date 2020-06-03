import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    authReducer,
    errorReducer,
    userReducer
})