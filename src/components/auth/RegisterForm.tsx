import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {InputChange, FormSubmit, RootStore} from '../../utils/TypeScript'
import { register } from '../../redux/actions/authAction'

const RegisterForm = () => {
    const initialState = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [userRegister, setUserRegister] = useState(initialState)
    const { name, email, password, confirmPassword } = userRegister

    const [typePass, setTypePass] = useState(false)

    const dispatch = useDispatch()

    const { alertReducer } = useSelector((state: RootStore ) => state)

    const handleChangeInput = (e: InputChange) => {
        const { value, name } = e.target
        setUserRegister({...userRegister, [name]: value})
    }

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        console.log(userRegister)
        dispatch(register(userRegister))
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"
                       name="name" value={name} onChange={handleChangeInput}
                       required maxLength={30}
                       placeholder={"Enter name"}
                />
            </div>

            <div className="form-group mb-3">
                <label htmlFor="account" className="form-label">
                    Email
                </label>

                <input type="email" className="form-control" id="email"
                       name="email" value={email} onChange={handleChangeInput}
                       placeholder="Enter email" />
            </div>

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
                Register
            </button>
        </form>
    );
};

export default RegisterForm;