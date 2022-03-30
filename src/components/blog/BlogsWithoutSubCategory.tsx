import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {IBlog, RootStore} from "../../utils/TypeScript";
import CardVert from "./CardVert";
import NoBlogs from "../common/NoBlogs";

interface IProps {
    blogs: IBlog[]
}

const BlogsWithoutSubCategory: React.FC<IProps> = ({blogs}) => {
    return (
        <>
            {
                blogs.length > 0
                ?
                    <div className="blogs_page">
                        <div className="show_blogs">
                            {
                                blogs.map(blog => (
                                    <CardVert key={blog._id} blog={blog} />
                                ))
                            }
                        </div>
                    </div>
                :
                    <NoBlogs />
            }
        </>
    );
};

export default BlogsWithoutSubCategory;