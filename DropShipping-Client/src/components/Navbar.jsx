import React from "react";
// We need to import the NavLink component from the router
import { NavLink } from "react-router";

const Navbar = () => 
    <header className="header">
        <div>
            {/* ../assets/MShakeTurnAround.png */}
            <img src="../assets/iconTab.png" alt="" /> 
        </div>
        <div>
            <h1>Mr M Shake's shop</h1>
        </div>
        <div>
            <nav className="navbar">
                        <NavLink
                            to={"/"}>
                            Home
                        </NavLink>
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
export default Navbar;