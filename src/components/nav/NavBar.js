import { Link, useNavigate } from "react-router-dom"
import React from 'react';
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <div className="menu">
                    <li className="nav_wines">
                        <a href="/wines">Wines</a>
                        <ul className="dropdown">
                            <li><a href="/wines">Wine List</a></li>
                            <li><a href="/wines">Favorites</a></li>
                        </ul>
                    </li>
                    <li >
                        <a href="/recipes">Recipes</a>
                    </li>
                    <li className="nav_wines">
                        <a href="/">Admin</a>
                        <ul className="dropdown">
                            <li><a href="/admin">Users</a></li>
                        </ul>
                    </li>
                    {
                        (localStorage.getItem("wine_token") !== null) ?
                            <li className="nav-item">
                                <button className="nav-link fakeLink"
                                    onClick={() => {
                                        localStorage.removeItem("wine_token")
                                        navigate('/login')
                                    }}
                                >Logout</button>
                            </li> :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                    }
                </div>
            </ul>
        </nav>
    )
}