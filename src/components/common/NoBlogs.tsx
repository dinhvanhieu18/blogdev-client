import React from 'react';

const NoBlogs = () => {
    return (
        <div
            className="position-relative"
            style={{ minHeight: "calc(100vh - 70px)" }}
        >
            <h2
                className="position-absolute text-secondary"
                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            >
                No Blog
            </h2>
        </div>
    );
};

export default NoBlogs;