import React from "react";
import { useState, useEffect } from 'react'

function Cart({cart}) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.units;
        });
        setTotalPrice(total);
    }, [cart]);

    return (
        <>
        <div className="headerShadow"></div>
        <div className="cart-view">
            <h1>Cart</h1>
            <p>Here you can see the products you have added to your cart</p>
            <div className="cart-products">
                {cart.map((product) => (
                    <div className="cart-product" key={product.name}>
                        <img src={product.image} alt="" />
                        <h2>{product.name.toUpperCase()}</h2>
                        <p>{product.price}€</p>
                        {product?.size && <p>Size: {product.size}</p>}
                        {product?.color && <p>Color: {product.color} </p>}
                        <p>Units: {product.units}</p>
                    </div>
                ))}
                <h1 className="cart-product">Total: {totalPrice}</h1>
            </div>
        </div>
        </>
    );
}

export default Cart;