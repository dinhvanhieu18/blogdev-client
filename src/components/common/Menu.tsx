import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../../utils/TypeScript'
import { logout } from '../../redux/actions/authAction'

const Menu = () => {
    const { authReducer } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const { pathname } = useLocation()

    const isActive = (pn: string) => {
        if (pn === pathname) return 'active'
    }

    const handleLogout = () => {
        if (!authReducer.accessToken) return;
        dispatch(logout(authReducer.accessToken))
    }
    return (
        <div>
            <ul className="navbar-nav ms-auto">
                {
                    !authReducer.user &&
                    <li className={`nav-item ${isActive("/login")}`}>
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                }

                {
                    authReducer.user?.role === 'admin' &&
                    <li className={`nav-item ${isActive("/login")}`}>
                        <Link className="nav-link" to="/create_blog">Create</Link>
                    </li>
                }
                {
                    authReducer.user &&
                    <li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={authReducer.user.avatar} alt="avatar" className="avatar" />
                                    </span>

                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li>
                                <Link className="dropdown-item"
                                      to={`/profile/${authReducer.user._id}`}
                                >
                                    Profile
                                </Link>
                            </li>

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <Link className="dropdown-item" to="/"
                                      onClick={handleLogout}>
                                    Logout
                                </Link>
                            </li>

                        </ul>
                    </li>
                }
            </ul>
        </div>
    );
};

export default Menu;