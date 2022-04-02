import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IBlog, IParams } from "../../utils/TypeScript";
import { useDispatch } from "react-redux";
import {ALERT} from "../../redux/types/alertType";
import {getAPI} from "../../utils/FetchData";
import {DELETE_BLOG, UPDATE_BLOG} from "../../redux/types/blogType";
import DisplayBlog from "../../components/blog/DisplayBlog";
import {NotFoundMessage} from "../../utils/const";
import NotFound from "../../components/common/NotFound";

const DetailBlog = () => {
    const id = useParams<IParams>().slug

    const [blog, setBlog] = useState<IBlog>()

    const dispatch = useDispatch()

    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!id) return;

        dispatch({type: ALERT, payload: {loading: true}})

        getAPI(`blog/${id}`)
            .then(res => {
                setBlog(res.data)
                dispatch({type: ALERT, payload: {loading: false}})
                dispatch({type: UPDATE_BLOG, payload: res.data})
            })
            .catch(err => {
                const errMsg =  err.response.data.msg
                if (errMsg !== NotFoundMessage) {
                    dispatch({type: ALERT, payload: {errors: errMsg}})
                } else {
                    dispatch({
                        type: DELETE_BLOG,
                        payload: id
                    })
                    setNotFound(true)
                }
            })

        return () => setBlog(undefined)
    }, [id, dispatch])

    return (
        <div className="my-4">
            {notFound && <NotFound />}
            {blog && <DisplayBlog blog={blog} />}
        </div>
    );
};

export default DetailBlog;