import {IBlog} from '../../utils/TypeScript'
import {CREATE_BLOG, DELETE_BLOG, GET_BLOG, GET_BLOGS, IBlogType, UPDATE_BLOG} from '../types/blogType'

const BlogReducer = (state: IBlog[] = [], action: IBlogType): IBlog[] => {
    switch (action.type) {
        case CREATE_BLOG:
            return [action.payload, ...state]
        case UPDATE_BLOG:
        case GET_BLOG:
            return state.map(item => (
                item._id === action.payload._id
                    ? action.payload
                    : item
            ))
        case DELETE_BLOG:
            return state.filter(item => item._id !== action.payload)
        case GET_BLOGS:
            return action.payload
        default:
            return state
    }
}

export default BlogReducer
