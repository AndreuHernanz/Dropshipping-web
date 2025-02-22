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

    function addNewProduct() {
        let product = newProduct;
        axios.post(`${URL}/product/add`, {product})
            .then(response => {
                console.log("Product added successfully response:", response.data);
                console.log("Product added :", product);
                if (response.data.ok) {
                    setProducts([product, ...products]);
                    setNewProduct({
                        name: null, price: null, image: null, stock: null, size: [],
                        color: [], description: "", category: null, price_id: "price_1QuZX2EgDHE5Jv012x27Kqa1"
                    });
                    /*TODO */
                    document.getElementById("images-string-add").value = "";
                }
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
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
<div className="dashboard-view">
    <h1>Dashboard</h1>
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
                            type="text"
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
                            type="number"
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
                            type="number"
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
                        className="iL"
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
            <Board products={products} setProducts={setProducts} product={productMap} index={index} key={`aaa${index}`}/>
        ))}
    </div>
</div>
</>
    );
}

export default Dashboard;  