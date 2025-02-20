import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Board from "./items/Boards";
import "../styles/Dashboard.css";

import Publish from "../assets/publish_.svg";
import ADown from "../assets/arrow_down_.svg";
import Trash from "../assets/trash_.svg";

import CloudinaryUpload from "./items/CloudinaryUpload";


function Dashboard({products, setProducts}) {

    const [newProduct, setNewProduct] = useState({
        name: null, price: null, image: null, stock: null, size: null, 
        color: null, description: null, category: null, price_id: "price_1QuZX2EgDHE5Jv012x27Kqa1"});
    const [imgHovered, setImgHovered] = useState(false);
    const [galleryActive, setGalleryActive] = useState(false);

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
        axios.post("http://localhost:4040/product/add", {product})
            .then(response => {
                console.log("Product added successfully:", response.data);
                setProducts([...products, newProduct]);
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
                style={{ color: "magenta"}}>
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





    <div className="dash-container">
            <button className="d-trash">
                <img src={Trash} alt="Delete" />
            </button>
            <div className="dash-product">
                <div className="d-product-container">
                    <div className="d-image" >
                        <img className="d-image-image" />
                    </div>
    
                    <div className="d-info">
                        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
                            <p>Name</p>                            
                            <input className="d-name" />
                            <div className="d-id"> id:</div>
                        </div>
                        <p>Description</p>
                        <textarea rows="3" cols="50"
                            className="d-description"
                            style={{ maxWidth: "600px" }}
                        />
                    </div>
                    <div className="d-properties">
                        <div className="d-size">
                            <p>Size → (a, b, c)</p>
                            <input                     
                            style={{ maxWidth: "7em" }}
                            />
                        </div>
                        <div className="d-color">
                            <p>Color → (x/ y/ z)</p>
                            <textarea rows="2" cols="20"          
                            style={{ textAlign: "left" }}
                            />
                        </div>
                    </div>
                    <div className="d-about">
                        <div className="d-price">
                            <p>Price (xx.xx)</p>
                            <span style={{display: "flex", alignItems: "center"}}>

                            <input           
                            style={{ maxWidth: "7em", textAlign: "right"}}
                            /><span>€</span>
                            </span>
                        </div>
                        <div className="d-stock">
                            <p>Stock</p>
                            <input                  
                            style={{ maxWidth: "4em", textAlign: "center" }}
                            />
                        </div>
                    </div>
                    <div className="d-config">
                        <p>Category</p>
                        <input 
                            style={{ maxWidth: "8em", marginRight: "1em" }}
                            
                        />
                        <p>Price_ID</p>
                        <input style={{ maxWidth: "12em", marginRight: "1em" }}
                        />
                    </div>
                </div>
            </div>
            <button className="d-upload" >
                <img src={Publish} alt="Publish" />
            </button>
        </div>








    <h1>Dashboard</h1>
    <h2>Add product</h2>
    <div className="dash-container">
            <div className="dash-product">
                <div className="d-product-container">
                    <div className="d-image" onClick={() => setGalleryActive(!galleryActive)}
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}>
                        {<img className="d-image-image" 
        src={imgHovered || galleryActive || !newProduct.image ? ADown : newProduct.image[0]} alt=""/>}
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
                            <span style={{display: "flex", alignItems: "center"}}>
                            <input                     
                            type="number"
                            style={{ maxWidth: "7em", textAlign: "right", color: "magenta" }}
                            onChange={(e) => {
                                const tempProduct = {...newProduct};
                                tempProduct.price = e.target.value;
                                setNewProduct(tempProduct);
                            }}
                            />€
                            </span>
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