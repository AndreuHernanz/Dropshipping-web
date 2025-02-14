import { useState, useEffect } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Cart from "./components/Cart.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Checkout from './components/Checkout.jsx';
import Navbar from "./components/Navbar.jsx";
import './App.css'

function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4040/product/all")
            .then((res) => {
                setProducts(res.data.message);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        
        setCart(JSON.parse(localStorage.getItem('Cart')) || []);
    }, [])

   

    const addToCart = async (productToAdd) => {
        if (cart.find( (prod) => prod.name === productToAdd.name)) {
            let newCart = cart.map((prod) => {
                if (prod.name === productToAdd.name) {
                    prod.units += 1;
                }
                return prod;
            });
            setCart(newCart);
            localStorage.setItem('Cart', JSON.stringify(newCart));
            return;
        }
        else {
            setCart([...cart, productToAdd]);
            localStorage.setItem('Cart', JSON.stringify([...cart, productToAdd]));
            //console.log(cart);
        }
    }


    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home products={products}/>} />
                <Route path="/product/:productName" element={<Product products={products} addToCart={addToCart}/>} />
                <Route path="/cart" element={<Cart products={products} cart={cart} setCart={setCart}/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
            </Routes>
        </Router>
    )
}

export default App
