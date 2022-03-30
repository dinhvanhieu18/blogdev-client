import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import LoginForm from '../components/auth/LoginForm'
import SocialLogin from '../components/auth/SocialLogin'

const Login = () => {
    const history = useHistory()

    const { authReducer } = useSelector((state: RootStore) => state)

    useEffect(() => {
        if (authReducer.accessToken) {
            let url = history.location.search.replace('?', '/')
            return history.push(url)
        }
    }, [authReducer.accessToken, history])

    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Login</h3>

                <LoginForm />

                <small className="row my-2 text-primary text-center" style={{cursor: 'pointer'}}>
                    <Link to='/forgot_password'>
                        Forgot password?
                    </Link>
                </small>
                <p className="text-center">
                    {`You don't have an account? `}
                    <Link to={`/register${history.location.search}`} style={{color: 'crimson'}}>
                        Register Now
                    </Link>
                </p>
                <p className="text-center">
                    Or
                    <SocialLogin />
                </p>
            </div>

        </div>
    );
};

export default Login;