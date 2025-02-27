import { useState, useEffect } from "react";
import { URL } from "../config";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Cart from "./components/Cart.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Checkout from "./components/Checkout.jsx";
import Navbar from "./components/items/Navbar.jsx";
import Footer from "./components/items/Footer.jsx";
import "./App.css";

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

///////

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
///////const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [everything, setEverything] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/product/all`)
      .then((res) => {
        res.data.message.sort((a, b) => a.order - b.order);
        setProducts(res.data.message);
        console.log("PRODUCTS",res.data.message);
        getEverything();
      })
      .catch((err) => {
        console.log(err);
      });

    setCart(JSON.parse(localStorage.getItem("Cart")) || []);
  }, []);
  
  function getEverything() {
    axios
      .get(`${URL}/product/`)
      .then((res) => {
        setEverything(res.data.message);
        console.log("Everything", res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addToCart = async (prdTAdd) => {
    if (cart.find((prod) => prod.name === prdTAdd.name) 
      && cart.find((prod) => prod.size === prdTAdd.size)
      && cart.find((prod) => prod.color === prdTAdd.color)) {
      let newCart = cart.map((prod) => {
        if (prod.name === prdTAdd.name && prod.size === prdTAdd.size && prod.color === prdTAdd.color) {
          prod.units += 1;
        }
        return prod;
      });
      setCart(newCart);
      localStorage.setItem("Cart", JSON.stringify(newCart));
      return;
    } else {
      setCart([...cart, prdTAdd]);
      localStorage.setItem("Cart", JSON.stringify([...cart, prdTAdd]));
      //console.log(cart);
    }
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home products={products} everything={everything} />} />
        <Route path="/product/:productName" element={<Product products={products} addToCart={addToCart} />}/>
        <Route path="/cart" element={<Cart products={products} cart={cart} setCart={setCart} />} />
        <Route path="/dashboard" element={<Dashboard products={products} setProducts={setProducts} />} />
        <Route path="/checkout" element={<Checkout cart={cart} CheckoutForm={CheckoutForm} />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
