import React from 'react';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'

const Login = () => {
    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Reset Password</h3>

                <ResetPasswordForm />

            </div>

        </div>
    );
};

export default Login;