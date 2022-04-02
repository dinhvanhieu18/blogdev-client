import React from 'react'
import { IBlog } from '../../utils/TypeScript'
import { Link } from 'react-router-dom'
import { BlogType } from '../../utils/const'

interface IProps {
    blog: IBlog
}

const CardVert: React.FC<IProps> = ({blog}) => {
    return (
        <Link
            to={blog.type === BlogType ? `/blog/${blog._id}` : `/blogs/${blog._id}`}
            style={{textDecoration: 'none', textTransform: 'capitalize'}}
        >
            <div className="card" style={{height: 350}}>
                {
                    typeof(blog.thumbnail) === 'string' &&
                    <img src={blog.thumbnail} className="card-img-top" alt="..."
                         style={{height: '180px', objectFit: 'cover'}} />
                }

                <div className="card-body">
                    <h5 className="card-title">
                        {blog.title.length > 30 ? blog.title.slice(0, 30) + '...' : blog.title}
                    </h5>
                    <p className="card-text">
                        {blog.description.length > 50 ? blog.description.slice(0, 50) + '...' : blog.description}
                    </p>
                    <p className="card-text d-flex justify-content-between">
                        <small className="text-muted">
                            { new Date(blog.createdAt).toLocaleString() }
                        </small>
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CardVert