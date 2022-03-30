import React from 'react';
import {useParams} from "react-router-dom";
import {IParams} from "../../utils/TypeScript";
import Blogs from "../../components/blog/Blogs";

const BlogsOfCategory = () => {
    const categoryId = useParams<IParams>().slug

    return (
        <Blogs category={categoryId} />
    );
};

export default BlogsOfCategory