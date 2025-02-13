import React from "react";
import {useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Card from "./items/Cards";

function Product({ products, addToCart }) {
    let params = useParams()
    let productName = params.productName

    const product = products.find((productIndx) => productIndx.name === productName)

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [addedToCartMssg, setAddedToCart] = useState(false);
    const [soldOut, setSoldOut] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    const handleAddToCart = () => {
        if (product?.stock > 0) {
            let cardProduct = { 
                name: product.name, 
                image: product.image[0], 
                price: product.price,
                units: 1, 
                size: selectedSize, 
                color: selectedColor 
            };
            addToCart(cardProduct);
            // Simulate adding to cart logic here
            setAddedToCart(true);

            // Hide message after 3 seconds
            setTimeout(() => setAddedToCart(false), 3000);
        }
        else {
            setSoldOut(true);
            setTimeout(() => setSoldOut(false), 3000);
        }
    };

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
                    <div className="p-color">
                        {product?.color[0] !== '' && product?.color.map( 
                            (colorIndx, index) => 
                            (<div key={index} 
                                onClick={() => setSelectedColor(colorIndx)}
                                className={selectedColor === colorIndx ? "color-div color-active":"color-div"} style={{backgroundColor: colorIndx}}>
                            </div> )
                        )}
                    </div>
                    <p className="p-stock" 
                        style = {{ color: product?.stock > 3 ? "darkgreen" : product?.stock > 0 ? "darkgoldenrod" : "red" }} >
                        {product?.stock > 0 ? `We have ${product?.stock} in stock` : "Out of stock"}
                    </p>
                    <button className="p-but-add" 
                        style = {{cursor: product?.stock > 0 ? "pointer":"not-allowed"}}
                        onClick={() => handleAddToCart() }>
                            Add to cart
                    </button>
                    {addedToCartMssg && <div className="cart-message">Item added to cart!</div>}
                    {soldOut && <div className="cart-message-red">The product {product.name} is already sold out</div>}
                </div>
            </div>

            {products.some(p => p.category === product.category && p.name !== product.name) && (
                <div className="category-related">
                    <h2 className="subdivision">Related Products</h2>
                    <div className="products">
                        {products.map((productMap) => (
                            productMap.category === product.category && productMap.name !== product.name && <Card product={productMap} />
                        ))}
                    </div>
                </div>
            )}

            <div className="more-products">
                <h2 className="subdivision">More Products</h2>
                <div className="products">
                    {products.map((productMap) => (
                        <Card product={productMap} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Product;