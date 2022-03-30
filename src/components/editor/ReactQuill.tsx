import React, {useCallback, useEffect, useRef} from 'react'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch } from 'react-redux'
import {ALERT} from "../../redux/types/alertType";
import {checkImage, imageUpload} from "../../utils/ImageUpload";
//@ts-ignore
import ImageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', ImageResize)

interface IProps {
    body: string
    setBody: (value: string) => void
}

let container = [
    [{ 'font': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'align': [] }],

    ['clean', 'link', 'image','video']
]

let imageCustom = {
    parchment: Quill.import('parchment'),
    modules: [ 'Resize', 'DisplaySize' ]
}

const QuillCustom: React.FC<IProps> = ({body, setBody}) => {
    const dispatch = useDispatch()
    const quillRef = useRef<ReactQuill>(null)

    const modules = {
        toolbar: { container },
        imageResize: imageCustom
    }

    const handleChangeImage = useCallback(() => {
        const input = document.createElement('input')
        input.type = "file"
        input.accept = "image/*"
        input.click()

        input.onchange = async () => {
            const files = input.files
            if (!files) return dispatch({
                type: ALERT, payload: {errors: "File does not exist."}
            })

            const file = files[0]
            const check = checkImage(file)
            if (check) return ({type: ALERT, payload: {errors: check}})

            dispatch({type: ALERT, payload: {loading: true}})
            const photo = await imageUpload(file)

            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index
            if (range !== undefined) {
                quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`)
            }
            dispatch({type: ALERT, payload: {loading: false}})
        }
    }, [dispatch])

    useEffect(() => {
        const quill = quillRef.current;
        if (!quill) return;

        let toolbar = quill.getEditor().getModule('toolbar')
        toolbar.addHandler('image', handleChangeImage)
    }, [handleChangeImage])
    return (
        <div>
            <ReactQuill
                theme="snow"
                modules={modules}
                placeholder="Write something..."
                onChange={e => setBody(e)}
                value={body}
                ref={quillRef}
            />
        </div>
    );
};

export default QuillCustom;