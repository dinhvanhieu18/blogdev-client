import React from 'react'
import { IBlog, IParams, RootStore } from '../../utils/TypeScript'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from '../../redux/actions/blogAction'

interface IProps {
    blog: IBlog
}

const CardHoriz: React.FC<IProps> = ({blog}) => {
    const {slug} = useParams<IParams>()
    const { authReducer } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const handleDelete = () => {
        if (!authReducer.user || !authReducer.accessToken) return;

        if (slug !== authReducer.user._id) {
            return dispatch({
                type: 'ALERT',
                payload: {errors: 'Invalid Authentication.'}
            })
        }

        if (window.confirm("Do you want to delete this post")) {
            if (!blog._id) {
                return
            }
            dispatch(deleteBlog(blog?._id, authReducer.accessToken))
        }
    }
    return (
        <div className="card mb-3" style={{minWidth: "260px"}}>
            <div className="row g-0 p-2">
                <div className="col-md-4"
                     style={{minHeight: '254px', maxHeight: '300px', overflow: 'hidden'}}
                >
                    {
                        blog.thumbnail &&
                        <>
                            {
                                typeof (blog.thumbnail) === 'string'
                                    ? <Link to={`/blog/${blog._id}`}>
                                        <img src={blog.thumbnail}
                                             className="w-100 h-100"
                                             alt="thumbnail" style={{objectFit: 'cover'}}/>
                                    </Link>
                                    : <img src={URL.createObjectURL(blog.thumbnail)}
                                           className="w-100 h-100"
                                           alt="thumbnail" style={{objectFit: 'cover'}}
                                    />
                            }
                        </>
                    }
                 </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/blog/${blog._id}`} className="text-capitalize text-decoration-none">
                                {blog.title}
                            </Link>
                        </h5>
                        <p className="card-text">
                            {blog.description}
                        </p>

                        {
                            blog.title &&
                            <div className="card-text d-flex justify-content-between align-items-center">
                                {
                                    (authReducer.user && slug === authReducer.user._id) &&
                                    <div style={{cursor: 'pointer'}}>
                                        <Link to={`/update_blog/${blog._id}`}>
                                            <i className="fas fa-edit" title="edit" />
                                        </Link>

                                        <i className="fas fa-trash text-danger mx-3" title="delete" onClick={handleDelete} />
                                    </div>
                                }
                                <small className="text-muted">
                                    {new Date(blog.createdAt).toLocaleString()}
                                </small>
                            </div>
                        }
                    </div>
                </div>
             </div>
        </div>
    );
};

export default CardHoriz;