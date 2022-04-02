import React from 'react'
import { IBlog, InputChange, RootStore } from '../../utils/TypeScript'
import { useSelector } from 'react-redux'
import { BlogType, CategoryType } from '../../utils/const'

interface IProps {
    blog: IBlog
    setBlog: (blog: IBlog) => void
}

const CreateForm: React.FC<IProps> = ({blog, setBlog}) => {
    const { blogReducer } = useSelector((state: RootStore) => state)

    const categories = blogReducer.filter(item => item.type === CategoryType)

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target
        setBlog({...blog, [name]: value})
    }

    const handleChangeThumbnail = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if (files) {
            const file = files[0]
            setBlog({...blog, thumbnail: file})
        }
    }
    return (
        <form>
            <div className="form-group position-relative">
                <input
                    type="text" className="form-control"
                    value={blog.title} name="title"
                    onChange={handleChangeInput}
                    placeholder="Title"
                    required
                />
                <small className="text-muted position-absolute"
                    style={{bottom: 0, right: '3px', opacity: '0.3'}}
                >
                    {blog.title.length}/50
                </small>
            </div>

            <div className="form-group my-3">
                <input
                    type="file" className="form-control"
                    accept="image/*" onChange={handleChangeThumbnail}
                    required
                />
            </div>

            <div className="form-group position-relative">
                <textarea
                    className="form-control" rows={4}
                    value={blog.description} style={{resize: 'none'}}
                    name="description" onChange={handleChangeInput}
                    placeholder="Description"
                    required
                />
                <small className="text-muted position-absolute"
                    style={{bottom: 0, right: '3px', opacity: '0.3'}}
                >
                    {blog.description.length} / 200
                </small>
            </div>

            <div className="form-group my-3">
                <select
                    className="form-control text-capitalize"
                    value={blog.category} name="category"
                    onChange={handleChangeInput}
                    required
                >
                    <option value="">Choose a category</option>
                    {
                        categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group my-3 d-flex justify-content-around">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="type" id="blog" value="blog" checked={blog.type === BlogType} onChange={handleChangeInput}/>
                    <label className="form-check-label" htmlFor="blog">
                        Blog
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="type" id="category" value="category" checked={blog.type !== BlogType} onChange={handleChangeInput}/>
                    <label className="form-check-label" htmlFor="blog">
                        Category
                    </label>
                </div>
            </div>
        </form>
    );
};

export default CreateForm