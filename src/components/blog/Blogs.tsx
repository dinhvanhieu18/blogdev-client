import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IBlog, RootStore } from '../../utils/TypeScript'
import { BlogType, CategoryType } from '../../utils/const'
import BlogsWithSubCategory from './BlogsWithSubCategory'
import BlogsWithoutSubCategory from './BlogsWithoutSubCategory'

interface IProps {
    category?: string
}

const Blogs: React.FC<IProps> = ({category}) => {
    const { blogReducer } = useSelector((state: RootStore) => state)

    const [category2Blogs, setCategory2Blogs] = useState<{[category: string]: IBlog[]}>({}) // mapping
    const [blogs, setBlogs] = useState<IBlog[]>([]) // all blog of a categories without sub
    const [categories, setCategories] = useState<IBlog[]>([]) // sub categories
    const [others, setOthers] = useState<IBlog[]>([]) // other of a categories

    useEffect(() => {
        if (blogReducer.length === 0) {
            return
        }

        const categories = category
            ? blogReducer.filter(item => item.type === CategoryType && item.category === category)
            : blogReducer.filter(item => item.type === CategoryType && !item.category)

        setCategories(categories)

        if (categories.length === 0) {
            // case blog without sub
            const blogs = blogReducer.filter(item => item.type === BlogType && item.category === category)
            setBlogs(blogs)
            return;
        }

        // case with sub
        let category2Blogs: {[category: string]: IBlog[]} = {}

        for (let i = 0; i < categories.length; i ++) {
            const cat = categories[i]._id
            if (!cat) {
                continue
            }
            category2Blogs[cat] = blogReducer.filter(item => item.category === cat)
        }

        setCategory2Blogs(category2Blogs)

        const others = blogReducer.filter(item => item.type === BlogType && item.category === category)
        setOthers(others)

    }, [blogReducer, category])
    return (
        <>
            {
                categories.length > 0
                ? <BlogsWithSubCategory categories={categories} category2Blogs={category2Blogs} others={others} />
                : <BlogsWithoutSubCategory blogs={blogs} />
            }
        </>
    );
};

export default Blogs;