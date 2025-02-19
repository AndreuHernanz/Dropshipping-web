import React, { useState, useEffect } from "react";
import axios from "axios";
//import "../App.css";



export default function Checkout({cart}) {

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
                <button onClick={handleCheckout}>Checkout</button>
            <div className="headerShadow"></div>
        </div>
        </>
      );
}


// import React from "react";
// import {useEffect, useState } from 'react'
// import { useNavigate } from "react-router";

// function Checkout({cart}) {

//     const [totalPrice, setTotalPrice] = useState(0);
    
//     useEffect(() => {
//         let total = 0;
//         cart.forEach((product) => {
//             total += product.price * product.units;
//         });
//         setTotalPrice(total);
//     }, [cart]);

//     function getNItems(cart) {
//         let nItems = 0;
//         cart.forEach((product) => {
//             nItems += product.units;
//         });
//         return nItems;
//     }

//     return (
//         <>
//         <div className="headerShadow"></div>
//         <div className="checkout">
//             <h1>Cart</h1>
//             <div className="checkout-products">
//                 {cart.map((product) => (
//                     <div key={product.id} className="checkout-product">
//                         <div className="checkout-product-info">
//                             <div className="checkout-text"> {product.name.toUpperCase()} </div>
//                             {product?.size && <div className="checkout-text checkout-grey"> Size: {product?.size.toUpperCase()}</div>}
//                             {product?.color && <div className="checkout-text checkout-grey"> Color: {product?.color}</div>}
//                         </div>
//                         <div>{product.units > 1 && <div className="checkout-text checkout-grey"> Units: {product.units}</div>}</div>
//                         <div className="checkout-product-price">
//                             {product.units > 1 && <div className="checkout-text checkout-grey"> {product.price.toFixed(2)}€</div>}
//                         </div>
//                         <div className="checkout-product-price">
//                             <div className="checkout-text"> {(product.price * product.units).toFixed(2)}€</div>
//                         </div>
//                     </div>
//                 ))}
//                 <div className="checkout-total">
//                         <p className="checkout-text checkout-grey">Total items: {getNItems(cart)}</p>
//                         <p className="checkout-text">Total: {totalPrice.toFixed(2)}€</p>
//                 </div>
//             </div>
//             <h1>Checkout</h1>
//             <form className="checkout-form">
//                 <div className="form-group">
//                     <input placeholder="Name" type="text" id="name" name="name" />
//                     <input placeholder="Surname" type="text" id="surname" name="surname" />
//                 </div>
//                 <div className="form-group">
//                     <input placeholder="Email" type="email" id="email" name="email" required />
//                 </div>
//                 <div className="form-group">
                    
//                     <select name="countryCode" id="country" autocomplete="shipping country">
//                         <option value="ES">Spain</option>
//                         <option value="US">United States</option>
//                         <option value="IT">Italy</option>
//                         <option value="MX">Mexico</option>
//                         <option value="GB">United Kingdom</option>
//                         <option disabled="" value="">---</option>
//                         <option value="AX">Åland Islands</option>
//                         <option value="AL">Albania</option>
//                         <option value="AD">Andorra</option>
//                         <option value="AI">Anguilla</option>
//                         <option value="AR">Argentina</option>
//                         <option value="AM">Armenia</option>
//                         <option value="AW">Aruba</option>
//                         <option value="AT">Austria</option>
//                         <option value="BS">Bahamas</option>
//                         <option value="BB">Barbados</option>
//                         <option value="BY">Belarus</option>
//                         <option value="BE">Belgium</option>
//                         <option value="BZ">Belize</option>
//                         <option value="BM">Bermuda</option>
//                         <option value="BO">Bolivia</option>
//                         <option value="BA">Bosnia &amp; Herzegovina</option>
//                         <option value="BR">Brazil</option>
//                         <option value="BG">Bulgaria</option>
//                         <option value="KY">Cayman Islands</option>
//                         <option value="CL">Chile</option>
//                         <option value="CO">Colombia</option>
//                         <option value="CR">Costa Rica</option>
//                         <option value="HR">Croatia</option>
//                         <option value="CY">Cyprus</option>
//                         <option value="CZ">Czechia</option>
//                         <option value="DK">Denmark</option>
//                         <option value="DM">Dominica</option>
//                         <option value="EC">Ecuador</option>
//                         <option value="SV">El Salvador</option>
//                         <option value="EE">Estonia</option>
//                         <option value="FO">Faroe Islands</option>
//                         <option value="FI">Finland</option>
//                         <option value="FR">France</option>
//                         <option value="GE">Georgia</option>
//                         <option value="DE">Germany</option>
//                         <option value="GI">Gibraltar</option>
//                         <option value="GR">Greece</option>
//                         <option value="GL">Greenland</option>
//                         <option value="GP">Guadeloupe</option>
//                         <option value="GT">Guatemala</option>
//                         <option value="GG">Guernsey</option>
//                         <option value="HN">Honduras</option>
//                         <option value="HU">Hungary</option>
//                         <option value="IS">Iceland</option>
//                         <option value="IE">Ireland</option>
//                         <option value="IM">Isle of Man</option>
//                         <option value="IT">Italy</option>
//                         <option value="JE">Jersey</option>
//                         <option value="XK">Kosovo</option>
//                         <option value="LV">Latvia</option>
//                         <option value="LI">Liechtenstein</option>
//                         <option value="LT">Lithuania</option>
//                         <option value="LU">Luxembourg</option>
//                         <option value="MT">Malta</option>
//                         <option value="YT">Mayotte</option>
//                         <option value="MX">Mexico</option>
//                         <option value="MD">Moldova</option>
//                         <option value="MC">Monaco</option>
//                         <option value="ME">Montenegro</option>
//                         <option value="NL">Netherlands</option>
//                         <option value="NI">Nicaragua</option>
//                         <option value="MK">North Macedonia</option>
//                         <option value="NO">Norway</option>
//                         <option value="PA">Panama</option>
//                         <option value="PY">Paraguay</option>
//                         <option value="PE">Peru</option>
//                         <option value="PL">Poland</option>
//                         <option value="PT">Portugal</option>
//                         <option value="RE">Réunion</option>
//                         <option value="RO">Romania</option>
//                         <option value="SM">San Marino</option>
//                         <option value="RS">Serbia</option>
//                         <option value="SK">Slovakia</option>
//                         <option value="SI">Slovenia</option>
//                         <option value="ES">Spain</option>
//                         <option value="SJ">Svalbard &amp; Jan Mayen</option>
//                         <option value="SE">Sweden</option>
//                         <option value="CH">Switzerland</option>
//                         <option value="TR">Türkiye</option>
//                         <option value="UA">Ukraine</option>
//                         <option value="GB">United Kingdom</option>
//                         <option value="US">United States</option>
//                         <option value="UY">Uruguay</option>
//                         <option value="VA">Vatican City</option>
//                         <option value="VE">Venezuela</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <input placeholder="Region" type="text" id="region" name="region" />
//                 </div>
//                 <div className="form-group">
//                     <input placeholder="Address" type="text" id="address" name="address" />
//                 </div>
//                 <hr />
//                 <div className="form-group">
//                     <input placeholder="Name on card" type="text" id="cc-owner" name="cc-owner" />
//                 </div>
//                 <div className="form-group">
//                     <input placeholder="Card number" type="number" id="cc-number" name="cc-number" required />
//                 </div>
//                 <div className="form-group">
//                     <input placeholder="Expiration date ( MM / YY )" type="text" id="cc-date" name="cc-date" required />
//                     <input placeholder="Security code" type="number" id="cc-cvv" name="cc-cvv" required />
//                 </div>
//                 <button type="submit" className="submit-checkout">Review order</button>
//             </form>
//             <div className="headerShadow"></div>
//         </div>
//         </>
//     );

    

// }

// export default Checkout;