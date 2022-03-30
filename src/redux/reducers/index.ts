import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import blogReducer from './blogReducer'

export default combineReducers({
    authReducer,
    alertReducer,
    blogReducer
})

