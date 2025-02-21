import React from "react";
import {useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import Card from "./items/Cards";




function Home({ products }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    let navigate = useNavigate()

    return (
        <div className="home">
            <div className="headerShadow"></div>
            <div className="background"/>
            <div className="products">
                {products.map((productMap, i) => (
                    <Card product={productMap} key={i}/>
                ))}
            </div>
            <img src="../assets/MShakeTurnAround.png" alt="" />
        </div>
    )
}

export default Home;