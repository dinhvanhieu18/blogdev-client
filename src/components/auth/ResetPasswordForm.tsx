import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore, IParams } from '../../utils/TypeScript'
import { resetPassword } from '../../redux/actions/userAction'
import { useParams } from 'react-router-dom'

const ResetPasswordForm = () => {
    const token = useParams<IParams>().slug
    const initialState = { password: '', confirmPassword: '' }
    const [resetPass, setResetPass] = useState(initialState)
    const { password, confirmPassword } = resetPass

    const [typePass, setTypePass] = useState(false)

    const dispatch = useDispatch()
    const { alertReducer } = useSelector((state: RootStore ) => state)

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target
        setResetPass({...resetPass, [name]:value})
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(resetPassword({ ...resetPass, token }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>

                <div className="pass">
                    <input type={typePass ? "text" : "password"}
                           className="form-control"
                           id="password"
                           required minLength={6}
                           name="password" value={password}
                           onChange={handleChangeInput}
                           placeholder="Enter password"
                    />

                    <small onClick={() => setTypePass(!typePass)}>
                        {typePass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">
                    Confirm Password
                </label>

                <div className="pass">
                    <input type={"password"}
                           className="form-control"
                           id="confirmPassword" required
                           name="confirmPassword" value={confirmPassword}
                           onChange={handleChangeInput}
                           placeholder="Your confirm password."
                    />
                </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 my-1" disabled={alertReducer.loading}>
                Reset
            </button>
        </form>
    )
};

export default ResetPasswordForm