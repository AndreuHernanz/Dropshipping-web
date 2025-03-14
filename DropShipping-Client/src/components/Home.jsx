import React from "react";
import {useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router";
import Card from "./items/Cards";
import MrSeated from "../assets/MShakeSeated.png";
import "../styles/Home.css";




function Home({ products, everything }) {

    const[option, setOption] = useState("ALL");

    const[prdsPrice, setPrdsPrice] = useState(null);


    const containerRefs  = useRef([]);


    useEffect(() => {
        window.scrollTo(0, 0);
        
        
    }, [])

    useEffect(() => {
        containerRefs.current.forEach((container) => {
            if (container) {
                const scrollX = (container.scrollWidth - container.clientWidth) / 2;
                container.scrollLeft = scrollX;
            }
        });
    }, [option])

    useEffect(() => {
        let tempPrice = [...products];
        tempPrice.sort((a, b) => a.price - b.price);
        setPrdsPrice(tempPrice);
        console.log("prdsPrice", tempPrice);
    }, [products])

    let navigate = useNavigate()

    return (
        <div className="home">
            <div className="headerShadow"></div>
            <div className="background"/>
            {/* <img src={Mountains} alt="" className="background"/> */}
            <div className="table">
                <div className="products-header">
                    <h3 className="option" onClick={() => {setOption("ALL")}} style={{color: option === "ALL" ? "red" : "black"}}>ALL</h3>
                    <h3 className="option" onClick={() => {setOption("CATEGORIES")}} style={{color: option === "CATEGORIES" ? "red" : "black"}}>CATEGORIES</h3>
                    <h3 className="option" onClick={() => {setOption("FILTER")}} style={{color: option === "FILTER" ? "red" : "black"}}>FILTER</h3>
                </div>
                {option === "ALL" && <div className="all-products">
                    {products.map((productMap, i) => (
                        <Card product={productMap} key={i}/>
                    ))}
                </div>}
                {option === "CATEGORIES" && <div className="categories-products">
                    {everything.map((everyMap, i) => (
                        <div className="" key={i} style={{width: "fit-content", maxWidth: "100vw" , margin: "0 auto"}}>
                            <h2 className="category-name">{everyMap.category.toUpperCase()}</h2>
                            <div ref={(el) => (containerRefs.current[i] = el)} className={`category-container ${i}`}>

                                {everyMap.products.map((productMap, j) => (
                                    <Card product={productMap} key={j}/>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>}
                {option === "FILTER" && <div className="filter-products">
                    {prdsPrice.map((prdsPriceMap, i) => (
                        <Card product={prdsPriceMap} key={i}/>
                    ))}
                </div>}
            </div>
            <img src={MrSeated} alt="" 
                style={{position:"absolute", positionAnchor: `--products`, 
                    right: "anchor(right)", bottom: "calc(anchor(top) - 10px)", width: "40px", marginRight: "10px" }}/>
        </div>
    )
}

export default Home;