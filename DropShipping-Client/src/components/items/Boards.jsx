import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import Publish from "../../assets/publish_.svg";
import Trash from "../../assets/trash_.svg";

function Boards({ products, setProducts, product, index }) {

    let navigate = useNavigate()

    function navigateToProduct(prodName) {
        window.scrollTo(0, 0);
        navigate(`/product/${prodName}`)
    }

    const [uploadedBool, setUploadedBool] = useState(1);
    const [nameBool, setNameBool] = useState(1);
    const [descriptionBool, setDescriptionBool] = useState(1);
    const [sizeBool, setSizeBool] = useState(1);
    const [colorBool, setColorBool] = useState(1);
    const [priceBool, setPriceBool] = useState(1);
    const [stockBool, setStockBool] = useState(1);
    const [categoryBool, setCategoryBool] = useState(1);
    const [priceIdBool, setPriceIdBool] = useState(1);

    let colorUploaded = 'lightblue';
    let colorNotUploaded = 'orange';

    let namename = product.name;

    function updateProduct() {
        axios.post("http://localhost:4040/product/update", {product})
            .then(response => {
                console.log("Product updated successfully:", response.data);
                setUploadedBool(true);
                setNameBool(true);
                setDescriptionBool(true);
                setSizeBool(true);
                setColorBool(true);
                setPriceBool(true);
                setStockBool(true);
                setCategoryBool(true);
                setPriceIdBool(true);
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });

        
           
    }

    return (
        <div className="dash-container">
                <button className="d-trash" onClick={() => {}}>
                    <img src={Trash} alt="Delete" />
                </button>
                <div className="dash-product" key={product.name}>
                    <img className="d-image" src={product.image[0]} alt="" />
                    <div className="d-info">
                        <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
                            <p>Name</p>
                            {/* <input 
                                className="d-name" 
                                type="text"
                                defaultValue={product.name} 
                                style={{ color: nameBool ? colorUploaded : colorNotUploaded }}
                                onChange={(e) => {
                                        const newProducts = [...products];
                                        newProducts[index].name = e.target.value;
                                        setProducts(newProducts);
                                        setUploadedBool(false);
                                        setNameBool(false);
                                }}
                            /> */}
                            <input                     
                                className="d-name" 
                                defaultValue={namename} 
                                type="text"
                                style={{ color: nameBool ? colorUploaded : colorNotUploaded }}
                                //style={{ maxWidth: "7em", color: sizeBool ? colorUploaded : colorNotUploaded }}
                                onChange={(e) => {
                                    const newProducts = [...products];
                                    newProducts[index].name = e.target.value;
                                    setProducts(newProducts);
                                    setUploadedBool(false);
                                    setNameBool(false);
                                }}
                            />
                            <div className="d-id">
                                id: {product._id}
                            </div>
                        </div>
                        <p>Description</p>
                        <textarea rows="3" cols="50"
                            className="d-description"
                            defaultValue={product.description} 
                            style={{ maxWidth: "600px", color: descriptionBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                    const newProducts = [...products];
                                    newProducts[index].description = e.target.value;
                                    setProducts(newProducts);
                                    setUploadedBool(false);
                                    setDescriptionBool(false);
                            }}
                        />
                    </div>
                    <div className="d-properties">
                        <div className="d-size">
                            <p>Size → (a, b, c)</p>
                            <input                     
                            defaultValue={product.size.join(', ')} 
                            type="text"
                            style={{ maxWidth: "7em", color: sizeBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].size = e.target.value.split(", ");
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setSizeBool(false);
                            }}
                            />
                        </div>
                        <div className="d-color">
                            <p>Color → (x/ y/ z)</p>
                            <textarea rows="2" cols="20"                     
                            defaultValue={product.color.join('/ ')} 
                            type="text"
                            style={{ textAlign: "left", color: colorBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].size = e.target.value.split("/ ");
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setColorBool(false);
                            }}
                            />
                        </div>
                    </div>
                    <div className="d-about">
                        <div className="d-price">
                            <p>Price (xx.xx)</p>
                            <input                     
                            defaultValue={product.price} 
                            type="number"
                            style={{ maxWidth: "7em", textAlign: "right", color: priceBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].price = e.target.value;
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setPriceBool(false);
                            }}
                            />€
                        </div>
                        <div className="d-stock">
                            <p>Stock</p>
                            <input                     
                            defaultValue={product.stock} 
                            type="number"
                            style={{ maxWidth: "4em", textAlign: "center", color: stockBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].stock = e.target.value;
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setStockBool(false);
                            }}
                            />
                        </div>
                    </div>
                    <div className="d-config">
                        <p>Category</p>
                        <input 
                            defaultValue={product.category} 
                            style={{ maxWidth: "8em", marginRight: "1em", color: categoryBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].category = e.target.value;
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setCategoryBool(false);
                            }}
                        />
                        <p>Price_ID</p>
                        <input 
                            defaultValue={product.price_id} 
                            style={{ maxWidth: "12em", marginRight: "1em", color: priceIdBool ? colorUploaded : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].price_id = e.target.value;
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setPriceIdBool(false);
                            }}
                        />
                    </div>
                    
                </div>
                <button className="d-upload" onClick={() => updateProduct()}>
                    <img src={Publish} alt="Publish" 
                    style={{filter: uploadedBool 
                    ? "invert(47%) sepia(16%) saturate(5820%) hue-rotate(200deg)" 
                    : "brightness(0) invert(80%) sepia(72%) saturate(868%) hue-rotate(326deg)"
                    }} />
                </button>
                </div>
    );
}

export default Boards;