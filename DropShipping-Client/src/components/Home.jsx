import React from "react";
import {useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import Card from "./items/Cards";
import MrSeated from "../assets/MShakeSeated.png";




function Home({ products }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    let navigate = useNavigate()

    return (
        <div className="home">
            <div className="headerShadow"></div>
            <div className="background"/>
            {/* <img src={Mountains} alt="" className="background"/> */}
            <div className="products">
                {products.map((productMap, i) => (
                    <Card product={productMap} key={i}/>
                ))}
            </div>
            <img src={MrSeated} alt="" 
                style={{position:"absolute", positionAnchor: `--products`, 
                    right: "anchor(right)", bottom: "calc(anchor(top) - 10px)", width: "40px", marginRight: "10px" }}/>
        </div>
    )
}

export default Home;