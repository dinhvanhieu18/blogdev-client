import React from 'react';
import {IBlog, RootStore} from "../../utils/TypeScript";
import {Link} from 'react-router-dom'
import CardVert from "./CardVert";
import {useSelector} from "react-redux";
import {checkAuth} from "../../utils/checkAuth";
import EditDelete from "../editor/EditDelete";

interface IProps {
    categories: IBlog[],
    category2Blogs: {[category: string]: IBlog[]}
    others: IBlog[],
}

const BlogsWithSubCategory: React.FC<IProps> = ({categories, category2Blogs, others}) => {
    const { authReducer } = useSelector((state: RootStore) => state)
    return (
        <div className="sub_page">
            {
                categories.map(category => (
                    <div key={category._id}>
                        {
                            category._id &&
                            <>
                                <div className="d-flex align-items-center">
                                    <h3>
                                        <Link to={`/blogs/${category._id}`}>
                                            {category.title}
                                        </Link>
                                    </h3>
                                    {
                                        checkAuth(authReducer) &&
                                        <div className="mx-3">
                                            <EditDelete blog={category}/>
                                        </div>
                                    }
                                </div>
                                <hr className="mt-0" />

                                <div className="sub_blogs">
                                    {
                                        category2Blogs[category._id].slice(0, 4).map(blog => (
                                            <CardVert key={blog._id} blog={blog} />
                                        ))
                                    }
                                </div>
                            </>
                        }
                        {
                            category._id && category2Blogs[category._id].length > 4 &&
                            <Link className="text-end d-block mt-2 mb-3 text-decoration-none" to={`/blogs/${category._id}`}>
                                Read more &gt;&gt;
                            </Link>
                        }
                    </div>
                ))
            }
            {
                others.length > 0 &&
                <div>
                    <h3>
                        <Link to={`/others/${others[0].category}`}>
                            Others
                        </Link>
                    </h3>
                    <hr className="mt-1" />

                    <div className="sub_blogs">
                        {
                            others.slice(0, 4).map(blog => (
                                <CardVert blog={blog} key={blog._id} />
                            ))
                        }
                    </div>
                    {
                        others.length > 4 &&
                        <Link className="text-end d-block mt-2 mb-3 text-decoration-none" to={`/others/${others[0].category}`}>
                            Read more &gt;&gt;
                        </Link>
                    }
                </div>
            }
        </div>
    );
};

export default BlogsWithSubCategory;