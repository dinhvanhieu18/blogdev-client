import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import Menu from './Menu'

const Header = () => {
    const [collapse, setCollapse] = useState(true); // do js no k work nen fix tam v
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light bg-light p-3"
            style={{position: 'sticky', top: 0, left: 0, zIndex: 9}}
        >
            <Link className="navbar-brand" to="/">{`${process.env.REACT_APP_NAME}`}</Link>

            <button className={collapse ? "navbar-toggler collapsed" : "navbar-toggler"} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={collapse ? "false": "true"} aria-label="Toggle navigation"
                onClick={e => setCollapse(!collapse)}
            >
                <span className="navbar-toggler-icon"/>
            </button>

            <div className={ collapse ? "collapse navbar-collapse" : "collapse navbar-collapse show p-2"} id="#navbarNav">
                <Search />
                <Menu />
            </div>
        </nav>
    )
}

export default Header
