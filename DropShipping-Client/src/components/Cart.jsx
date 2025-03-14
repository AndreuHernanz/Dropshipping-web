import React from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import "../styles/Cart.css";
import ShakeCart from "../assets/mshakecart.png";

function Cart({cart, setCart}) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.units;
        });
        setTotalPrice(total);
        console.log("cart:", cart);
    }, [cart]);

    function getNItems(cart) {
        let nItems = 0;
        cart.forEach((product) => {
            nItems += product.units;
        });
        return nItems;
    }

    function addUnits(product, positive) {
        let newCart = cart.map((prod) => {
            if (prod.name === product.name) {
                if (positive) {
                    prod.units += 1;
                }
                else {
                    prod.units -= 1;
                    if (prod.units === 0) {
                        return null;
                    }
                }
            }
            return prod;
        });
        newCart = newCart.filter((prod) => prod !== null);
        setCart(newCart);
        localStorage.setItem('Cart', JSON.stringify(newCart));
    }

    function removeProduct(product) {
        let newCart = cart.filter((prod) => prod.name !== product.name);
        setCart(newCart);
        localStorage.setItem('Cart', JSON.stringify(newCart));
    }

    let navigate = useNavigate()

    useEffect(() => {
                window.scrollTo(0, 0);
            }, [])

    return (
<>
<div className="headerShadow"></div>
<div className="cart-view">
    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1em"}}>
        <h1>Cart</h1>
        <img src={ShakeCart} alt="" style={{width: "4em"}}/>
    </div>
    <p>Here you can see the products you have added to your cart</p>
    <div className="cart-products">
        {cart.map((product) => (
            <div className="cart-product" key={product.name}>
                <img className="c-image" src={product.image} alt="" />
                <div className="c-info">
                    <h2 className="c-name">{product.name.toUpperCase()}</h2>
                    {product?.size && <p className="c-size">Size: {product.size.toUpperCase()}</p>}
                    {product?.color && <div id="c-flex-color"><p className="c-color">Color:</p><div className="color-div" style={{backgroundColor: product.color}}></div></div>}
                </div>
                <div className="c-units">
                    <div onClick={() => removeProduct(product)} className="trash">X</div>
                    <p onClick={() => addUnits(product, false)}>-</p>
                    <section className="c-units-units">{product.units}</section>
                    <p onClick={() => addUnits(product, true)}>+</p>
                </div>
                <div className="c-price">
                    <h3 >{product.price}€</h3>
                    {product.units > 1 && <h4 >{(product.price * product.units).toFixed(2)}€</h4>}
                </div>
                
            </div>
        ))}
        <div className="c-total">
            <div>
                <p>Total items: {getNItems(cart)}</p>
            </div>
            <section style={{border:"1px solid #e5e5e5"}} />
            <div>
                <h2 >Total: </h2><h1>{totalPrice.toFixed(2)}€</h1>
            </div>
        </div>
        <div className="c-pay">
            <div className="c-clear-but" onClick={() => setCart([])}>
                <h4>Clear cart </h4>
            </div>
            <div className="c-pay-but" onClick={() => navigate('/checkout')}>
                <h2>Continue</h2>
            </div>
        </div>
    </div>
</div>
</>
    );
}

export default Cart;