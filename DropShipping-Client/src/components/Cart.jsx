import React from "react";
import { useState, useEffect } from 'react'

function Cart({cart, setCart}) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.units;
        });
        setTotalPrice(total);
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

    return (
        <>
        <div className="headerShadow"></div>
        <div className="cart-view">
            <h1>Cart</h1>
            <p>Here you can see the products you have added to your cart</p>
            <div className="cart-products">
                {cart.map((product) => (
                    <div className="cart-product" key={product.name}>
                        <img className="c-image" src={product.image} alt="" />
                        <div className="c-info">
                            <h2 className="c-name">{product.name.toUpperCase()}</h2>
                            {product?.size && <p className="c-size">Size: {product.size.toUpperCase()}</p>}
                            {product?.color && <p className="c-color">Color: {product.color} </p>}
                        </div>
                        <div className="c-units">
                            <div onClick={() => removeProduct(product)} id="trash">X</div>
                            <p onClick={() => addUnits(product, false)}>-</p>
                            <input type="number" value={product.units} />
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
                    <div>
                        <h2>Pay</h2>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Cart;