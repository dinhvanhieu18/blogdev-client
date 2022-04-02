import React from 'react'

const Footer = () => {
    return (
        <div style={{position: 'sticky', bottom: 0, left: 0, zIndex: 9}} className="bg-light p-3">
                <h6 className="text-center mt-1">Contact me</h6>
                <div className="d-flex justify-content-center">
                    <span>kelvinhieu18@gmail.com </span>
                    <a
                        href="https://www.facebook.com/profile.php?id=100007583494874"
                        className="text-decoration-none mx-2">
                        HieuDinh
                    </a>
                </div>
        </div>
    );
};

export default Footer