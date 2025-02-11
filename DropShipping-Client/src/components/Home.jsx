import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


function Home() {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})


    useEffect(() => {
        axios.get("http://localhost:4040/product/all")
            .then((res) => {
                setProducts(res.data.message);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    /*
    setProduct = (productMap) => {
        //go to product page
        // `/product/${productMap._id}`;
    }*/

    return (
        <div className="home">
            <div className="products">
                {products.map((productMap) => (
                    <div className="product" key={productMap._id} onClick={() => setProduct(productMap)}>
                        <img src={productMap.image[0]} alt="" />
                        <h2>{productMap.name.toUpperCase()}</h2>
                        <p>{productMap.price}€</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;