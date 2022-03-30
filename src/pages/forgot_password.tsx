import React from 'react';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'

const ForgotPassword = () => {
    return (
        <div className="auth_page">
            <div className="auth_box">
                <h3 className="text-uppercase text-center mb-4">Forgot password</h3>

                <ForgotPasswordForm />

            </div>

        </div>
    );
};

export default ForgotPassword