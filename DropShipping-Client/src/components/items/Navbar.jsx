import React from "react";
import { useState, useEffect } from "react";
// We need to import the NavLink component from the router
import { NavLink, useNavigate } from "react-router";
import wideLogo from '../../assets/MShakeTurnAround.png'; // with import
import iconLogo from '../../assets/iconTab2.png'; // with import
import cartIcon from '../../assets/carritoicono.png'; // with import


const Navbar = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
          setIsWideScreen(window.innerWidth > 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);


    let navigate = useNavigate()

    return (
    <header className="header">
        {isWideScreen && <div id="logo-div">
            <img src={wideLogo} id="logo" onClick={() => navigate(`/`)} alt="M Shake" />
        </div>}
        <div id="div-main" onClick={() => navigate(`/`)}>
            <img id="main-logo" src={iconLogo} alt="" style={{width: "50px", display: "inline"}}/>
            <h1 id="page-name"  >Mr Shake's SHOP</h1>
        </div>
        <div>
            <nav className="navbar">
                        <NavLink
                            to={"/dashboard"}>
                            Dashboard
                        </NavLink>
                        <NavLink
                            to={"/cart"} id="nav-cart">
                        <img src={cartIcon} alt="cart" id="cart-icon"/>
                            
                        </NavLink>
            </nav>
        </div>
    </header>
    )
}
export default Navbar;