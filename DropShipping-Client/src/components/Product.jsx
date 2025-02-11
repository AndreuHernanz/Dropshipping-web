import React from "react";
import axios from "axios";
import {useEffect, useState } from 'react'
import { useParams } from "react-router";

function Product() {
    let params = useParams()
    let productName = params.productName

    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:4040/product/${productName}`)
            .then((res) => {
                setProduct(res.data.message);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <div>
            <div className="headerShadow"></div>
            <h1>{productName}</h1>
            {product.image && product.image.map((imageIndx, index) => ( <img key={index} src={imageIndx} alt="" style={{ width: "200px" }} /> ))}
            <p>{product.description}</p>
            <p>{product.price}€</p>
            <p>{product.stock}</p>
        </div>
    );
}

export default Product;