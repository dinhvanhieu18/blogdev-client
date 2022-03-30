import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FormSubmit, RootStore } from '../../utils/TypeScript'
import { forgotPassword } from '../../redux/actions/authAction'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const { alertReducer } = useSelector((state: RootStore ) => state)

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <input type="email" className="form-control" id="email"
                       name="email" value={email} onChange={e => setEmail(e.target.value)}
                       required placeholder="Enter email"
                />
            </div>

            <button type="submit" className="btn btn-dark w-100 my-1" disabled={alertReducer.loading}>
                Send Email
            </button>
        </form>
    );
};

export default ForgotPasswordForm