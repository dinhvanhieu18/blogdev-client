import {IBlog, IUserRegister} from './TypeScript'
import jwt_decode from 'jwt-decode'
import { getAPI } from './FetchData'
import { AUTH } from '../redux/types/authType'
import {BlogType, MinContentLen} from "./const";

export const validateRegister = (userRegister: IUserRegister) => {
    const { password, confirmPassword } = userRegister
    const errors: string[] = [];
    if (password !== confirmPassword ) {
        errors.push("Confirm password is not match")
    }
    return {
        errMsg: errors,
        errLength: errors.length
    }
}

interface IToken {
    exp: number
    iat: number
    id: string
}

export const checkTokenExp = async (token: string, dispatch: any) => {
    const decoded: IToken = jwt_decode(token)

    if (decoded.exp >= Date.now() / 1000) return

    const res = await getAPI('auth/refresh_token')
    dispatch({ type: AUTH, payload: res.data })
    return res.data.accessToken
}

export const validateCreateBlog = ({
    title, content, description, thumbnail, category, type
}: IBlog) => {
    const errs : string[] = []

    title = title.trim()
    if (!title) {
        errs.push("Title is required.")
    }
    if (title.length > 50) {
        errs.push("Title is up to 50 characters.")
    }

    if (type === BlogType) {
        content = content.trim()
        if (content.length < MinContentLen) {
            errs.push(`Content must has length is at least ${MinContentLen}.`)
        }

        if (!category) {
            errs.push("Category is required.")
        }
    }

    description = description.trim()
    if (!description) {
        errs.push("Description is required.")
    }
    if (description.length > 200) {
        errs.push("Description is uo to 200 characters.")
    }

    if (!thumbnail) {
        errs.push("Thumbnail is required.")
    }

    return {
        errMsg: errs,
        errLength: errs.length
    }
}

export const shallowEqual = (object1: any, object2: any) => {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false
        }
    }

    return true
}


