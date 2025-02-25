import React from "react";
import { URL } from '../../config'
import axios from "axios";
import { useState, useEffect } from "react";
import Board from "./items/Boards";
import "../styles/Dashboard.css";

import Publish from "../assets/publish_.svg";
import Asterisk from "../assets/add_.svg";
import Trash from "../assets/trash_.svg";

import CloudinaryUpload from "./items/CloudinaryUpload";


function Dashboard({products, setProducts}) {

    const [newProduct, setNewProduct] = useState({
        name: null, price: null, image: null, stock: null, size: [], 
        color: [], description: '', category: null, price_id: "price_1QuZX2EgDHE5Jv012x27Kqa1"});
    const [imgHovered, setImgHovered] = useState(false);
    const [galleryActive, setGalleryActive] = useState(false);

    const [defaultPriceIdBool, setDefaultPriceIdBool] = useState(true);

    const [credentials, setCredentials] = useState({usernameOrEmail: "", password: ""});
    const [loggedIn, setLoggedIn] = useState(false);

    const [urlRecieved, setUrlRecieved] = useState(false);
        useEffect(() => {
            if (urlRecieved) {
                const tempProduct = {...newProduct};
                //console.log("URL recieved:", tempProduct);
                tempProduct.image = tempProduct.image ? tempProduct.image : [];
                tempProduct.image.push(urlRecieved);
                setNewProduct(tempProduct);
    
                document.getElementById("images-string-add").value = tempProduct?.image.join(", ");
            }
        }, [urlRecieved]);

    function resetDefaults() {
        setNewProduct({
            name: null, price: null, image: null, stock: null, size: [],
            color: [], description: "", category: null, price_id: "price_1QuZX2EgDHE5Jv012x27Kqa1"
        });
        document.getElementById("images-string-add").value = "";
        document.getElementsByClassName("d-name")[0].value = "";
        document.getElementsByClassName("d-description")[0].value = "";
        document.getElementById("size-string-add").value = [];
        document.getElementById("color-string-add").value = [];
        document.getElementById("price-string-add").value = "";
        document.getElementById("stock-string-add").value = "";
        document.getElementById("order-string-add").value = "";
        document.getElementsByClassName("category_input")[0].value = "";
        document.getElementsByClassName("price_id_input")[0].value = "price_1QuZX2EgDHE5Jv012x27Kqa1";
    }

    function addNewProduct() {
        let product = newProduct;
        if (loggedIn){
            axios.post(`${URL}/product/add`, {product})
                .then(response => {
                    console.log("Product added successfully response:", response.data);
                    console.log("Product added :", product);
                    if (response.data.ok) {
                        setProducts([product, ...products]);
                        resetDefaults();
                    }
                })
                .catch(error => {
                    console.error("There was an error updating the product!", error);
                });
        }
        else {
            setProducts([product, ...products]);
            resetDefaults();
        }

    }

    
    function loginPetition() {
        axios.get(`${URL}/user/${credentials.usernameOrEmail}/${credentials.password}`)
            .then(response => {
                console.log("Login response:", response.data);
                if (response.data.ok) {
                    setLoggedIn(true);
                }
            })
            .catch(error => {
                console.error("There was an error logging in!", error);
            });
    }
    
    function loginOrUser() {

        if (!loggedIn) {
            return (
                <div className="d-login">
                    <input type="text" name="usernameOrEmail" placeholder="username or email"
                        onChange={(e) =>{
                        setCredentials({...credentials, [e.target.name]: e.target.value});
                    }}/>
                    <input type="password" name="password" placeholder="password"
                        onChange={(e) =>{
                        setCredentials({...credentials, [e.target.name]: e.target.value});
                    }} />
                    <div className="login-but" onClick={() => loginPetition()}>Login</div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Admin logged</p>
                    <p>{credentials.usernameOrEmail}</p>
                </div>
            );
        }
    }

    function gallery() {
        return (
        <>
            <div className="g-gallery">
                    {/* everyrthing here */}
                    {newProduct.image && newProduct.image.length > 0 && newProduct.image.map((img, index) => (
                        <>
                            <img className="g-img" src={img} alt="" key={index} 
                                style={{anchorName: `--img${index}`, 
                                backgroundColor: "rgba(255, 0, 204, 0.28)"}}/>
                            <div className="g-delete" onClick={() => deleteImage(index)}
                                style={{position:"absolute", positionAnchor: `--img${index}`, 
                                right: "anchor(right)", top: "anchor(top)" }}>X</div>
                        </>
                    ))}
                    <CloudinaryUpload setUrlRecieved={setUrlRecieved}/>
            </div>
            <textarea className="images-to-text" 
                id="images-string-add"
                name="images-string" 
                defaultValue={newProduct?.image?.join(", ")}
                key={`${newProduct.name} images`} 
                rows={newProduct.image ? `${newProduct.image.length + 1}` : "1"}
                style={{ color: "magenta"}}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const tempProduct = {...newProduct};
                        tempProduct.image = e.target.value.split(", ");
                        setNewProduct(tempProduct);
                    }
                }}>
            </textarea>
        </>
        );
    }

    useEffect(() => {
            window.scrollTo(0, 0);
        }, [])

    return (
<>
<div className="headerShadow"></div>
<div className="dashboard-disclaimer">
    <h3>Dashboard to manage shop products</h3>
<p>Usually the dashboard should be<b> hidden to public</b> but i left it open, as this web page is just for my portfolio</p>
    <p>Feel free to modify or add products as they will only happen locally, if you reload web page it will reset. <b>You need to admin login</b></p>
</div>
<div className="dashboard-view">
    <div className="dash-top">
        <h1>DASHBOARD</h1>
        {loginOrUser()}
    </div>
    <h2>Add product</h2>
    <div className="dash-container">
            <div className="dash-product" style={{backgroundColor: "rgb(241, 215, 239)"}}>
                <div className="d-product-container">
                    <div className="d-image" onClick={() => setGalleryActive(!galleryActive)}
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}>
                        {<img className="d-image-image" 
        src={imgHovered || galleryActive || !newProduct.image ? Asterisk : newProduct.image[0]} alt=""
        style={{filter: "sepia(100%) saturate(100) hue-rotate(-70deg)"}}/>}
                    </div>

                    <div className="d-info">
                        <div>
                            <p className="iL">Name *</p>                            
                            <input                     
                                className="d-name iL" 
                                type="text"
                                style={{ color: "magenta" }}
                                onChange={(e) => {
                                    const tempProduct = {...newProduct};
                                    tempProduct.name = e.target.value;
                                    setNewProduct(tempProduct);
                                }}
                            />
                        </div>
                        <p>Description</p>
                        <textarea rows="3" cols="50"
                            className="d-description"
                            style={{ maxWidth: "600px", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.description = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                        />
                    </div>
                    <div className="d-properties">
                        <div className="d-size">
                            <p>Size → (a, b, c)</p>
                            <input                     
                            type="text"
                            id="size-string-add"
                            style={{ color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.size = e.target.value.split(", ");
                                setNewProduct(tempProduct);
                            }}
                            />
                        </div>
                        <div className="d-color">
                            <p>Color → (x/ y/ z)</p>
                            <textarea rows="2"                    
                            type="text" id="color-string-add"
                            style={{ color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.color = e.target.value.split("/ ");
                                setNewProduct(tempProduct);
                            }}
                            />
                        </div>
                    </div>
                    <div className="d-about">
                        <div className="d-price">
                            <p>Price * (xx.xx)</p>
                            <span style={{display: "flex", alignItems: "center"}}>
                            <input                     
                            type="number" id="price-string-add"
                            style={{ color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.price = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                            />€
                            </span>
                        </div>
                        <div className="d-stock">
                            <p>Stock *</p>
                            <input                     
                            type="number" id="stock-string-add"
                            style={{ maxWidth: "4em", textAlign: "center", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.stock = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                            />
                        </div>
                        <div className="d-order">
                        <p className="iL">Order</p>
                        <input                     
                        className="iL" id="order-string-add"
                        type="number"
                        style={{ color: "magenta" }}
                        onChange={(e) => {
                            const tempProduct = {...newProduct};
                                tempProduct.order = e.target.value;
                                setNewProduct(tempProduct);
                        }}
                        />
                    </div>
                    </div>
                    <div className="d-config">
                        <p>Category *</p>
                        <input
                            className="category_input"
                            style={{ color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.category = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                        />
                        <p>Price_ID</p>
                        <input
                            className="price_id_input"
                            defaultValue={newProduct.price_id}
                            style={{ color: defaultPriceIdBool ? "red" : "magenta" }}
                            onChange={(e) => {
                                setDefaultPriceIdBool(false);
                                const tempProduct = {...newProduct};
                                tempProduct.price_id = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                        />
                    </div>
                </div>
                {galleryActive && gallery()}
            </div>
            <button className="d-upload" onClick={() => addNewProduct()}>
                <img src={Publish} alt="Publish" 
                style={{filter: "brightness(0) invert(80%) sepia(72%) saturate(868%) hue-rotate(326deg)"
                }} />
            </button>
        </div>
    <h2>Products</h2>
    <div className="dash-products">
        {products.map((productMap, index) => (
            <Board products={products} setProducts={setProducts} 
                product={productMap} 
                index={index} key={`aaa${index}`}
                loggedIn={loggedIn}
            />
        ))}
    </div>
</div>
</>
    );
}

export default Dashboard;  