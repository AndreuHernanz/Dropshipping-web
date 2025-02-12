import React from "react";
import {useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function Product({ products }) {
    let params = useParams()
    let productName = params.productName

    const product = products.find((productIndx) => productIndx.name === productName)

    //const [size, setSize] = useState("")
    const [selectedSize, setSelectedSize] = useState(null);
    //let size = product?.size[0]

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    function navigateToProduct(prodName) {
        window.scrollTo(0, 0);
        navigate(`/product/${prodName}`)
    }

    const changeSize = (size_str) => {
        //setSize(size)
        //size = size_str
        console.log(size_str)
    }

    let navigate = useNavigate()

    return (
        <>
            <div className="headerShadow"></div>
            <div className="product-view">
                <div className="image-view">
                    {product && product.image.map(
                        (imageIndx, index) => 
                        (<div className="image-product-view" key={index}><img src={imageIndx} alt={product.name} /></div> )
                    )}
                </div>
                <div className="product-info">
                    
                    <h1 className="p-name">{productName.toUpperCase()}</h1>
                    <h2 className="p-price">{product?.price}€</h2>
                    <p className="p-desc">{product?.description}</p>
                    <p className="p-size">{product?.size.map( 
                        (sizeIndx, index) => 
                        (<span key={index} 
                            onClick={() => setSelectedSize(sizeIndx)} 
                            className={selectedSize === sizeIndx ? "size-active":"size-unactive"}>
                                {sizeIndx.toUpperCase()} 
                        </span> )
                     )}</p>
                    <p className="p-stock" 
                        style = {{ color: product?.stock > 3 ? "darkgreen" : product?.stock > 0 ? "darkgoldenrod" : "red" }} >
                        {product?.stock > 0 ? `We have ${product?.stock} in stock` : "Out of stock"}
                    </p>
                    <button className="p-but-add" style = {{cursor: product?.stock > 0 ? "pointer":"not-allowed"}}>Add to cart</button>
                </div>
            </div>
            <div className="category-related">
                <h2>Related products</h2>
                <div className="products">
                    {products.map((productMap) => (
                        <div className="product" key={productMap._id} onClick={() => navigateToProduct(productMap.name)}>
                            <img src={productMap.image[0]} alt="" />
                            <h2>{productMap.name.toUpperCase()}</h2>
                            <p>{productMap.price}€</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Product;