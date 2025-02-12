import { useState, useEffect } from 'react'
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import Cart from "./components/Cart.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [products, setProducts] = useState([])

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
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home products={products}/>} />
                <Route path="/product/:productName" element={<Product products={products}/>} />
                <Route path="/cart" element={<Cart products={products}/>} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}

export default App
