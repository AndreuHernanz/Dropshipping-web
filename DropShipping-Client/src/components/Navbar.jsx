import React from "react";
// We need to import the NavLink component from the router
import { NavLink, useNavigate } from "react-router";
import logo from '../assets/MShakeTurnAround.png'; // with import

const Navbar = () => {

    let navigate = useNavigate()

    return (
    <header className="header">
        <div id="logo-div">
            <img src={logo} id="logo" onClick={() => navigate(`/`)} alt="M Shake" /> 
        </div>
        <div>
            <h1 id="page-name" onClick={() => navigate(`/`)}>Mr M Shake's shop</h1>
        </div>
        <div>
            <nav className="navbar">
                        <NavLink
                            to={"/cart"}>
                            Cart
                        </NavLink>
                        <NavLink
                            to={"/dashboard"}>
                            Dashboard
                        </NavLink>
            </nav>
        </div>
    </header>
    )
}
export default Navbar;