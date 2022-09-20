import { Link, useNavigate } from "react-router-dom"
import React from 'react';


export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar has-shadow is-primary">
            <div className="navbar-brand">
                <div className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/wines">Wines</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/recipes">Recipes</Link>
                    </li>
                    <li className="navbar-item">
                        Navigation link
                    </li>
                </div>
            </div>
            {
                (localStorage.getItem("wine_token") !== null) ?
                    <div className="navbar-end">
                        <li className="navbar-item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    localStorage.removeItem("wine_token")
                                    navigate('/login')
                                }}
                            >Logout</button>
                        </li></div> :
                    <>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }       </ul>
    )
}