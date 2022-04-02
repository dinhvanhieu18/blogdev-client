import {IBlog} from '../../utils/TypeScript'
import {Dispatch} from 'redux'
import {ALERT, IAlertType} from '../types/alertType'
import {
    CREATE_BLOG,
    DELETE_BLOG,
    GET_BLOGS,
    ICreateBlogType,
    IDeleteBlogType, IGetBlogsType,
    IUpdateBlogType,
    UPDATE_BLOG
} from '../types/blogType'
import {checkTokenExp} from '../../utils/Validate'
import {deleteAPI, getAPI, postAPI, putAPI} from '../../utils/FetchData'
import {imageUpload} from "../../utils/ImageUpload";


export const deleteBlog = (id: string, token: string) =>
async (dispatch: Dispatch<IAlertType | IDeleteBlogType>) => {
    const result = await checkTokenExp(token, dispatch)
    const accessToken = result ? result : token
    try {
        await deleteAPI(`blog/${id}`, accessToken)
        dispatch({
            type: DELETE_BLOG,
            payload: id
        })
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const createBlog = (blog: IBlog, token: string) =>
async (dispatch: Dispatch<IAlertType | ICreateBlogType>) => {
    const result = await checkTokenExp(token, dispatch)
    const accessToken = result ? result : token

    let url;
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        if (typeof(blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail)
            url = photo.url
        } else {
            url = blog.thumbnail
        }

        const newBlog = {...blog, thumbnail: url}

        const res = await postAPI('blog', newBlog, accessToken)
        dispatch({
            type: CREATE_BLOG,
            payload: res.data
        })

        dispatch({type: ALERT, payload: {loading: false, success: res.data.msg}})
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const updateBlog = (blog: IBlog, token: string) =>
async (dispatch: Dispatch<IAlertType | IUpdateBlogType>) => {
    const result = await checkTokenExp(token, dispatch)
    const accessToken = result ? result : token

    let url;
    try {
        dispatch({type: ALERT, payload: {loading: true}})

        if (typeof(blog.thumbnail) !== 'string') {
            const photo = await imageUpload(blog.thumbnail)
            url = photo.url
        } else {
            url = blog.thumbnail
        }

        const newBlog = {...blog, thumbnail: url}

        const res = await putAPI(`blog/${newBlog._id}`, newBlog, accessToken)
        dispatch({
            type: UPDATE_BLOG,
            payload: res.data
        })

        dispatch({type: ALERT, payload: {loading: false, success: res.data.msg}})
    } catch (err: any) {
        dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
    }
}

export const getBlogs = () =>
    async (dispatch: Dispatch<IAlertType | IGetBlogsType>) => {
        try {
            dispatch({type: ALERT, payload: {loading: true}})
            const res = await getAPI('blogs')
            dispatch({
                type: GET_BLOGS,
                payload: res.data
            })

            dispatch({type: ALERT, payload: {loading: false}})
        } catch (err: any) {
            dispatch({type: ALERT, payload: {errors: err.response.data.msg}})
        }
    }



