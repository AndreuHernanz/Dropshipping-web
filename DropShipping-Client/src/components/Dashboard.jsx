import React from "react";
import axios from "axios";
import { useState } from "react";
import Board from "./items/Boards";
import "../styles/Dashboard.css";

import Publish from "../assets/publish_.svg";

import CloudinaryUpload from "./items/CloudinaryUpload";

function Dashboard({products, setProducts}) {

    const [newProduct, setNewProduct] = useState({});

    function updateProduct(product) {
        axios.post("http://localhost:4040/product/update", {product})
            .then(response => {
                console.log("Product updated successfully:", response.data);
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });

        console.log(product);
           
    }

    function gallery() {
        return (
        <>
            <div className="g-gallery">
                    {/* everyrthing here */}
                    {product.image.map((img, index) => (
                        <>
                            <img className="g-img" src={img} alt="" key={index} 
                                style={{anchorName: `--img${index}`, 
                                backgroundColor: imageBool ? "transparent" : "rgba(255, 166, 0, 0.275)"}}/>
                            <div className="g-delete" onClick={() => deleteImage(index)}
                                style={{position:"absolute", positionAnchor: `--img${index}`, 
                                right: "anchor(right)", top: "anchor(top)" }}>X</div>
                        </>
                    ))}
                    <CloudinaryUpload setUrlRecieved={setUrlRecieved}/>
            </div>
            <textarea className="images-to-text" 
                id="images-string"
                name="images-string" 
                defaultValue={product.image.join(", ")}
                key={`${product.name} images`} 
                rows={`${product.image.length + 1}`}
                style={{ color: imageBool ? colorUploaded : colorNotUploaded}}>
            </textarea>
        </>
        );
    }

    return (
<>
<div className="headerShadow"></div>
<div className="dashboard-view">
    <h1>Dashboard</h1>
    <h2>Add product</h2>
    <div className="dash-container">
            <div className="dash-product">
                <div className="d-product-container">
                    <div className="d-image">
                        {newProduct?.image && <img className="d-image-image" 
                            src={newProduct?.image[0]} alt=""/>}
                    </div>
    
                    <div className="d-info">
                        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
                            <p>Name</p>                            
                            <input                     
                                className="d-name" 
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
                            style={{ maxWidth: "7em", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.size = e.target.value.split(", ");
                                setNewProduct(tempProduct);
                            }}
                            />
                        </div>
                        <div className="d-color">
                            <p>Color → (x/ y/ z)</p>
                            <textarea rows="2" cols="20"                     
                            type="text"
                            style={{ textAlign: "left", color: "magenta" }}
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
                            <p>Price (xx.xx)</p>
                            <input                     
                            type="number"
                            style={{ maxWidth: "7em", textAlign: "right", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.price = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                            />€
                        </div>
                        <div className="d-stock">
                            <p>Stock</p>
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
                    </div>
                    <div className="d-config">
                        <p>Category</p>
                        <input 
                            style={{ maxWidth: "8em", marginRight: "1em", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.category = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                        />
                        <p>Price_ID</p>
                        <input 
                            style={{ maxWidth: "12em", marginRight: "1em", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.price_id = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                        />
                    </div>
                </div>
                {/*galleryActive && gallery()*/}
            </div>
            <button className="d-upload" onClick={() => updateProduct()}>
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