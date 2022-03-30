import React, {useEffect, useRef, useState} from 'react'
import {IBlog, RootStore} from '../utils/TypeScript'
import {useDispatch, useSelector} from 'react-redux'
import { getAPI } from '../utils/FetchData'
import NotFound from '../components/common/NotFound'
import CreateForm from '../components/blog/CreateForm'
import CardHoriz from '../components/blog/CardHoriz'
import ReactQuill from '../components/editor/ReactQuill'
import {shallowEqual, validateCreateBlog} from "../utils/Validate";
import {ALERT} from "../redux/types/alertType";
import {createBlog, updateBlog} from "../redux/actions/blogAction";
import {BlogType, Admin} from "../utils/const";
import {checkAuth} from "../utils/checkAuth";

interface IProps {
    id?: string
}

const CreateBlog: React.FC<IProps> = ({id}) => {
    const initState = {
        user: '',
        title: '',
        content: '',
        description: '',
        thumbnail: '',
        category: '',
        type: BlogType,
        createdAt: new Date().toISOString()
    }

    const [blog, setBlog] = useState<IBlog>(initState)
    const [body, setBody] = useState('')

    const divRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState('')

    const { authReducer } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const [oldData, setOldData] = useState<IBlog>(initState)

    const [preview, setPreview] = useState<boolean>(false)

    useEffect(() => {
        if (!id) return;

        getAPI(`blog/${id}`)
            .then(res => {
                console.log('blog', res.data)
                setBlog(res.data)
                setBody(res.data.content)
                setOldData(res.data)
            })
            .catch(err => console.log(err))

        const initData = {
            user: '',
            title: '',
            content: '',
            description: '',
            thumbnail: '',
            category: '',
            type: BlogType,
            createdAt: new Date().toISOString()
        }

        return () => {
            setBlog(initData)
            setBody('')
            setOldData(initData)
        }
    }, [id])

    useEffect(() => {
        const div = divRef.current
        if (!div) return

        const text = div?.innerText as string
        setText(text)
    }, [body])

    const handleSubmit = async () => {
        if (!checkAuth(authReducer) || !authReducer.accessToken) return;

        const check = validateCreateBlog({...blog, content: text})
        if (check.errLength > 0) {
            return dispatch({type: ALERT, payload: {errors: check.errMsg}})
        }

        let newData = {...blog, content: body}

        if (id) {
            const result = shallowEqual(oldData, newData)
            if (result) {
                return dispatch({
                    type: ALERT,
                    payload: {success: "Update Success!"}
                })
            }
            dispatch(updateBlog(newData, authReducer.accessToken))
        } else {
            dispatch(createBlog(newData, authReducer.accessToken))
        }
    }

    if (authReducer.user?.role !== Admin) return <NotFound />;
    return (
        <div className="my-4">
            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Create</h5>
                    <CreateForm blog={blog} setBlog={setBlog} />
                </div>

                <div className="col-md-6">
                    <h5>Preview</h5>
                    <CardHoriz blog={blog} />
                </div>
            </div>

            <div style={{display: blog.type === BlogType ? '' : 'none'}}>
                <div>
                    <ReactQuill body={body} setBody={setBody} />
                </div>

                <small>{text.length}</small>
                <button className="btn btn-dark mt-3 d-block mx-auto" onClick={() => setPreview(!preview)}>
                    {preview ? 'Hidden' : 'Preview'}
                </button>

                <div ref={divRef} dangerouslySetInnerHTML={{
                    __html: body
                }} style={{display: preview ? '' : 'none'}} />
            </div>

            <button className="btn btn-dark mt-3 d-block mx-auto" onClick={handleSubmit}>
                {id ? 'Update' : 'Create'}
            </button>
        </div>
    );
};

export default CreateBlog