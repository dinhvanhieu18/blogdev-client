import {IUserLogin, IUserRegister} from '../../utils/TypeScript'
import {Dispatch} from 'redux'
import {AUTH, IAuthType} from '../types/authType'
import {ALERT, IAlertType} from '../types/alertType'
import {checkTokenExp, validateRegister} from '../../utils/Validate'
import {getAPI, postAPI} from '../../utils/FetchData'

export const register = (userRegister: IUserRegister) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validateRegister(userRegister)
    if (check.errLength > 0) {
        return dispatch({ type: ALERT, payload: { errors: check.errMsg }})
    }

    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('auth/register', userRegister)

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
    } catch (err: any) {
        dispatch( { type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const login = (userLogin: IUserLogin) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('auth/login', userLogin)

        dispatch({ type: AUTH, payload: res.data })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})

        localStorage.setItem("logged", "BlogDev")
    } catch (err: any) {
        dispatch( { type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const forgotPassword = (email: string) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('auth/forgot_password', { email })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
    } catch (err: any) {
        dispatch( { type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const googleLogin = (idToken: string) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await postAPI('auth/google_login', {idToken})

        dispatch({type: AUTH, payload: res.data})

        dispatch({type: ALERT, payload: {success: res.data.msg}})
        localStorage.setItem("logged", "BlogDev")
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const logout = (token: string) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await checkTokenExp(token, dispatch)
    const accessToken = result ? result : token

    try {
        await getAPI('auth/logout', accessToken)
        dispatch({type: AUTH, payload: {}})
        localStorage.removeItem("logged")
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const refreshToken = () =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if (logged !== "BlogDev") return;

    try {
        dispatch({type: ALERT, payload: {loading: true}})

        const res = await getAPI('auth/refresh_token')

        dispatch({type: AUTH, payload: res.data})

        dispatch({type: ALERT, payload: {}})
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        localStorage.removeItem('logged')
    }
}


