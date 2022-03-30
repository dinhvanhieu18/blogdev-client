import React, { useEffect, useState } from 'react'
import { IParams  } from '../../utils/TypeScript'
import { useParams } from 'react-router-dom'
import { postAPI } from '../../utils/FetchData'
import { showErrMsg, showSuccessMsg } from '../../components/common/Toast'

const Active = () => {
    const { slug }: IParams = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (slug) {
            postAPI('auth/active', { activeToken: slug })
                .then(res => setSuccess(res.data.msg))
                .catch(err => setErr(err.response.data.msg))
        }
    }, [slug])
    return (
        <div>
            { err && showErrMsg(err)}
            { success && showSuccessMsg(success)}
        </div>
    );
};

export default Active;
