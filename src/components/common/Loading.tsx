import React from 'react'

const Loading = () => {
    return (
        <div
            className="position-fixed w-100 h-100 text-center loading"
            style={{background: '#0007', color: "white", top: 0, left: 0, zIndex: 99}}
        >
            <div className="spinner-border" style={{marginTop: 100, position: "absolute"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};

export default Loading;