import React, { useState, useEffect } from "react";
import axios from "axios";
//import "../App.css";



export default function Checkout({cart, CheckoutForm}) {

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

    const handleCheckout = async () => {
        try {

            const productsCartCheckoutInfo = cart.map((product) => {
                return { price: product.price_id, quantity: product.units };
                });
          // Sending POST request to create checkout session
          const response = await axios.post("http://localhost:4040/create-checkout-session", 
            // TODO: array of objects of priceid and quantity
            { items: productsCartCheckoutInfo }
          );
    
          // Retrieve the URL returned from the backend
          const { url } = response.data;
    
          // Open Stripe Checkout in a new window
          window.open(url, "_blank", "width=500,height=700");
        } catch (error) {
          console.error("Error creating checkout session:", error);
          // You could display a message to the user about the failure
          alert("An error occurred while creating the checkout session. Please try again.");
        }
      };

      useEffect(() => {
                      window.scrollTo(0, 0);
                  }, [])
    
      return (
        <>
        <div className="headerShadow"></div>
        <div className="checkout">
            <h1>Cart</h1>
             <div className="checkout-products">
                 {cart.map((product) => (
                     <div key={product.id} className="checkout-product">
                         <div className="checkout-product-info">
                             <div className="checkout-text"> {product.name.toUpperCase()} </div>
                             {product?.size && <div className="checkout-text checkout-grey"> Size: {product?.size.toUpperCase()}</div>}
                             {product?.color && <div className="checkout-text checkout-grey"> Color: {product?.color}</div>}
                         </div>
                         <div>{product.units > 1 && <div className="checkout-text checkout-grey"> Units: {product.units}</div>}</div>
                         <div className="checkout-product-price">
                             {product.units > 1 && <div className="checkout-text checkout-grey"> {product.price.toFixed(2)}€</div>}
                         </div>
                         <div className="checkout-product-price">
                             <div className="checkout-text"> {(product.price * product.units).toFixed(2)}€</div>
                         </div>
                     </div>
                 ))}
                 <div className="checkout-total">
                         <p className="checkout-text checkout-grey">Total items: {getNItems(cart)}</p>
                         <p className="checkout-text">Total: {totalPrice.toFixed(2)}€</p>
                 </div>
             </div>
             <h1>Checkout</h1>
                <div className="checkout-pay-but">
                    <h2 onClick={handleCheckout}>Checkout</h2>
                </div>
                {/*CheckoutForm()*/}
            <div className="headerShadow"></div>
        </div>
        </>
      );
}
