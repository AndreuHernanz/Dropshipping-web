import React from "react";
import { useState, useEffect } from "react";
// We need to import the NavLink component from the router
import { NavLink, useNavigate } from "react-router";
import wideLogo from '../../assets/MShakeTurnAround.png'; 
import iconLogo from '../../assets/iconTab2.png'; 
import cartIcon from '../../assets/carritoicono.png'; 

import turn1 from '../../assets/Animation-c/Turn_1.png'; 
import turn2 from '../../assets/Animation-c/Turn_2.png';
import turn3 from '../../assets/Animation-c/Turn_3.png';
import turn4 from '../../assets/Animation-c/Turn_4.png';
import turn5 from '../../assets/Animation-c/Turn_5.png';
import turn6 from '../../assets/Animation-c/Turn_6.png';
import turn7 from '../../assets/Animation-c/Turn_7.png';
import turn8 from '../../assets/Animation-c/Turn_8.png';


const Navbar = () => {
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 768);

    let turn = [turn1, turn2, turn3, turn4, turn5, turn6, turn7, turn8];
    function animateLogo() {
        console.log("animateLogo");
        let i = 0;
        setInterval(() => {
            document.getElementById("logo").src = turn[i];
            i++;
            if (i === 8) i = 0;
        }, 100);
    }

   


    useEffect(() => {
        const handleResize = () => {
          setIsWideScreen(window.innerWidth > 768);
        };
        const handleScroll = () => {
            if ( Math.round(window.scrollY % 800 / 100) === 0 || Math.round(window.scrollY % 800 / 100) === 8) {
                document.getElementById("logo").src = turn[0];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 1) {
                document.getElementById("logo").src = turn[1];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 2) {
                document.getElementById("logo").src = turn[2];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 3) {
                document.getElementById("logo").src = turn[3];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 4) {
                document.getElementById("logo").src = turn[4];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 5) { 
                document.getElementById("logo").src = turn[5];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 6) {
                document.getElementById("logo").src = turn[6];
            }
            else if ( Math.round(window.scrollY % 800 / 100) === 7) {
                document.getElementById("logo").src = turn[7];
            }
            else {
                document.getElementById("logo").src = turn[0];
            }

        };

        
        //animateLogo();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
          };
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