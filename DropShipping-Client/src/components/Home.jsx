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
            <div className="products">
                {products.map((productMap) => (
                    <Card product={productMap} />
                    // <div className="product" key={productMap._id} onClick={() => navigate(`/product/${productMap.name}`)}>
                    //     <img src={productMap.image[0]} alt="" />
                    //     <h2>{productMap.name.toUpperCase()}</h2>
                    //     <p>{productMap.price}€</p>
                    // </div>
                ))}
            </div>
            <img src="../assets/MShakeTurnAround.png" alt="" />
        </div>
    )
}

export default Home;