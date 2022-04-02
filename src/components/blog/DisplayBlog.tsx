import React from 'react'
import { IBlog, RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import EditDelete from '../editor/EditDelete'

interface IProps {
    blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({blog}) => {
    const {authReducer} = useSelector((state: RootStore) => state)

    return (
        <div>
            <h2 className="text-center my-3 text-capitalize fs-1"
                style={{color: '#ff7a00'}}
            >
                {blog.title}
            </h2>

            <div className="card-text d-flex justify-content-center align-items-center my-3">
                <EditDelete blog={blog} />
                <small className="fst-italic" style={{color: 'teal'}}>
                    {new Date(blog.createdAt).toLocaleString()}
                </small>
            </div>

            <div dangerouslySetInnerHTML={{
                __html: blog.content
            }} />

            <hr className="my-3" />
            <h3 style={{color: '#ff7a00'}}>Comments</h3>

            {
                authReducer.user
                ? <h5>TODO</h5>
                : <h5>Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.</h5>
            }
        </div>
    );
};

export default DisplayBlog;