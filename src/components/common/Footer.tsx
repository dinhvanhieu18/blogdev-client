import React from 'react'

const Footer = () => {
    return (
        <div style={{position: 'sticky', bottom: 0, left: 0, zIndex: 9}} className="bg-light p-3">
                <h6 className="text-center mt-1">Contact me</h6>
                <div className="d-flex justify-content-center">
                    <span>{`${process.env.REACT_APP_MAIL}`}</span>
                    <a
                        href={`${process.env.REACT_APP_FACEBOOK}`}
                        className="text-decoration-none mx-2">
                        FaceBook
                    </a>
                </div>
        </div>
    );
};

export default Footer