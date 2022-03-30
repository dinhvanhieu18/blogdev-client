import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { InputChange, FormSubmit, RootStore } from '../../utils/TypeScript'
import { login } from '../../redux/actions/authAction'

const LoginForm = () => {
    const initialState = { email: '', password: '' }
    const [userLogin, setUserLogin] = useState(initialState)
    const { email, password } = userLogin

    const [typePass, setTypePass] = useState(false)

    const dispatch = useDispatch()
    const { alertReducer } = useSelector((state: RootStore ) => state)

    const handleChangeInput = (e: InputChange) => {
        const {value, name} = e.target
        setUserLogin({...userLogin, [name]:value})
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(login(userLogin))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="account" className="form-label">
                    Email
                </label>

                <input type="email" className="form-control" id="email"
                       name="email" value={email} onChange={handleChangeInput}
                       required placeholder="Enter email"
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password</label>

                <div className="pass">
                    <input type={typePass ? "text" : "password"}
                           className="form-control"
                           id="password"
                           name="password" value={password}
                           required placeholder="Enter password"
                           onChange={handleChangeInput}
                    />

                    <small onClick={() => setTypePass(!typePass)}>
                        {typePass ? 'Hide' : 'Show'}
                    </small>
                </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 my-1" disabled={alertReducer.loading}>
                Login
            </button>
        </form>
    )
};

export default LoginForm;