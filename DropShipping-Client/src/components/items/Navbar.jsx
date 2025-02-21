import React from "react";
// We need to import the NavLink component from the router
import { NavLink, useNavigate } from "react-router";
import wideLogo from '../../assets/MShakeTurnAround.png'; // with import
import iconLogo from '../../assets/iconTab2.png'; // with import


const Navbar = () => {

    let navigate = useNavigate()

    return (
    <header className="header">
        <div id="logo-div">
            <img src={wideLogo} id="logo" onClick={() => navigate(`/`)} alt="M Shake" /> 
        </div>
        <div id="div-main" onClick={() => navigate(`/`)}>
            <img id="main-logo" src={iconLogo} alt="" style={{width: "50px", display: "inline"}}/>
            <h1 id="page-name"  >Mr Shake's SHOP</h1>
        </div>
        <div>
            <nav className="navbar">
                        <NavLink
                            to={"/cart"} id="nav-cart">
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