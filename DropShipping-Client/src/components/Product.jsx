import React from "react";
import {useEffect, useState } from 'react'
import { useParams } from "react-router";

function Product({ products }) {
    let params = useParams()
    let productName = params.productName

    const product = products.find((productIndx) => productIndx.name === productName)


    return (
        <div>
            <div className="headerShadow"></div>
            <h1>{productName}</h1>
            {product.image && product.image.map(
                (imageIndx, index) => 
                    ( <img key={index} src={imageIndx} alt={product.name} style={{ width: "200px" }} /> )
                )}
            <p>{product.description}</p>
            <p>{product.price}€</p>
            <p>{product.stock}</p>
        </div>
    );
}

export default Product;