import React from 'react';
import {useParams} from "react-router-dom";
import {IParams, RootStore} from "../../utils/TypeScript";
import BlogsWithoutSubCategory from "../../components/blog/BlogsWithoutSubCategory";
import {useSelector} from "react-redux";
import {BlogType} from "../../utils/const";

const Others = () => {
    const categoryId = useParams<IParams>().slug

    const { blogReducer } = useSelector((state: RootStore) => state)

    const blogs = blogReducer.filter(item => item.type === BlogType && item.category === categoryId)

    return (
        <BlogsWithoutSubCategory blogs={blogs} />
    );

};

export default Others;