import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IBlog, RootStore} from "../../utils/TypeScript";
import {checkAuth} from "../../utils/checkAuth";
import {deleteBlog} from "../../redux/actions/blogAction";
import {Admin} from "../../utils/const";
import {Link} from "react-router-dom";

interface IProps {
    blog: IBlog
}

const EditDelete: React.FC<IProps> = ({blog}) => {
    const {authReducer} = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const handleDelete = () => {
        if (!checkAuth(authReducer)) return dispatch({
            type: 'ALERT',
            payload: {errors: 'Invalid Authentication.'}
        })

        if (window.confirm("Do you want to delete this post")) {
            if (!blog._id || !authReducer.accessToken) {
                return
            }
            dispatch(deleteBlog(blog?._id, authReducer.accessToken))
        }
    }

    return (
        <div>
            {
                (authReducer.user?.role === Admin) &&
                <div style={{cursor: 'pointer'}}>
                    <Link to={`/update_blog/${blog._id}`}>
                        <i className="fas fa-edit" title="edit" />
                    </Link>

                    <i className="fas fa-trash text-danger mx-3" title="delete" onClick={handleDelete} />
                </div>
            }
        </div>
    );
};

export default EditDelete;