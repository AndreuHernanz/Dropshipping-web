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

    

    return (
        <div className="home">
            <div className="products">
                {products.map((product) => (
                    <div className="product" key={product._id}> {/*onClick={() => setProduct(product)}>*/}
                        <img src={product.image[0]} alt="" />
                        <h2>{product.name.toUpperCase()}</h2>
                        <p>{product.price}€</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;