import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLoginResponse, GoogleLogin } from 'react-google-login-lite'
import { googleLogin } from '../../redux/actions/authAction'

const SocialLogin = () => {
    const dispatch = useDispatch()
    const onSuccess = (googleUser: GoogleLoginResponse) => {
        const idToken = googleUser.getAuthResponse().id_token
        dispatch(googleLogin(idToken))
    }

    return (
        <div className="mt-2 my-2">
            <GoogleLogin
                client_id={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                cookiepolicy="single_host_origin"
                onSuccess={onSuccess}
            />
        </div>
    );
};

export default SocialLogin