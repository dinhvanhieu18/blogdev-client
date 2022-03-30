import { IBlog } from '../../utils/TypeScript'

export const DELETE_BLOG = "DELETE_BLOG"
export const CREATE_BLOG = "CREATE_BLOG"
export const UPDATE_BLOG = "UPDATE_BLOG"
export const GET_BLOG = "GET_BLOG"
export const GET_BLOGS = "GET_BLOGS"

export interface IDeleteBlogType {
    type: typeof DELETE_BLOG,
    payload: string
}

export interface ICreateBlogType {
    type: typeof CREATE_BLOG,
    payload: IBlog
}

export interface IUpdateBlogType {
    type: typeof UPDATE_BLOG,
    payload: IBlog
}

export interface IGetBlogType {
    type: typeof GET_BLOG,
    payload: IBlog
}

export interface IGetBlogsType {
    type: typeof GET_BLOGS,
    payload: IBlog[]
}

export type IBlogType =
| IGetBlogType
| IGetBlogsType
| ICreateBlogType
| IUpdateBlogType
| IDeleteBlogType

