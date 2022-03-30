import {IAuth} from "../redux/types/authType";
import {Admin} from "./const";

export const checkAuth = (authReducer: IAuth) => {
    if (authReducer.user && authReducer.user.role === Admin && authReducer.accessToken) {
        return true
    }
    return false
}