import {Dispatch} from 'redux'
import {IAuthType} from '../types/authType'
import {ALERT, IAlertType} from '../types/alertType'
import {postAPI} from '../../utils/FetchData'
import { IResetPassword } from '../../utils/TypeScript'
import {checkTokenExp} from '../../utils/Validate'


export const resetPassword = (resetPass: IResetPassword) =>
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const tokenExp = await checkTokenExp(resetPass.token, dispatch)

    const accessToken = tokenExp ? tokenExp : resetPass.token

    if (resetPass.password !== resetPass.confirmPassword) {
        return dispatch({ type: ALERT, payload: {errors: "Confirm password is not match"}})
    }

    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('user/reset_password', { password: resetPass.password }, accessToken)

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
    } catch (err: any) {
        dispatch( { type: ALERT, payload: { errors: err.response.data.msg }})
    }
}
