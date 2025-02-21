import React, { useEffect } from "react";
import { URL } from '../../../config'
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import CloudinaryUpload from "./CloudinaryUpload";

import Publish from "../../assets/publish_.svg";
import Trash from "../../assets/trash_.svg";
import ADown from "../../assets/arrow_down_.svg";


function Boards({ products, setProducts, product, index }) {

    let navigate = useNavigate()

    function navigateToProduct(prodName) {
        window.scrollTo(0, 0);
        navigate(`/product/${prodName}`)
    }

    const [uploadedBool, setUploadedBool] = useState(1);
    const [imageBool, setImageBool] = useState(1);
    const [nameBool, setNameBool] = useState(1);
    const [descriptionBool, setDescriptionBool] = useState(1);
    const [sizeBool, setSizeBool] = useState(1);
    const [colorBool, setColorBool] = useState(1);
    const [priceBool, setPriceBool] = useState(1);
    const [stockBool, setStockBool] = useState(1);
    const [categoryBool, setCategoryBool] = useState(1);
    const [orderBool, setOrderBool] = useState(1);
    const [priceIdBool, setPriceIdBool] = useState(1);

    const [imgHovered, setImgHovered] = useState(false);
    const [galleryActive, setGalleryActive] = useState(false);

    const [urlRecieved, setUrlRecieved] = useState(false);
    useEffect(() => {
        if (urlRecieved) {
            const newProducts = [...products];
            newProducts[index].image.push(urlRecieved);
            setProducts(newProducts);
            setUploadedBool(false);
            setImageBool(false);
            setUrlRecieved(false);

            document.getElementById("images-string").value = newProducts[index].image.join(", ");
        }
    }, [urlRecieved]);

    let colorUploaded = 'cornflowerblue';
    let colorNotUploaded = 'orangered';

    function updateProduct() {
        axios.post(`${URL}/product/update`, {product})
            .then(response => {
                console.log("Product updated:", product);
                console.log("Product updated successfully:", response.data);
                setUploadedBool(true);
                setImageBool(true);
                setNameBool(true);
                setDescriptionBool(true);
                setSizeBool(true);
                setColorBool(true);
                setPriceBool(true);
                setStockBool(true);
                setCategoryBool(true);
                setOrderBool(true);
                setPriceIdBool(true);
                sortProducts();
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    }

    function deleteProduct() {
        if (window.confirm(`Are you sure you want to delete this product: ${product.name.toUpperCase()}?`)) {
            axios.post(`${URL}/product/delete`, { product })
            .then(response => {
                console.log("Product deleted successfully:", response.data);
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });

            let newProducts = [...products];
            newProducts.splice(index, 1);
            setProducts(newProducts);
        }
        
    }

    function deleteImage(imgIndex) {
        const newProducts = [...products];
        newProducts[index].image.splice(imgIndex, 1);
        setProducts(newProducts);
        setUploadedBool(false);
        setImageBool(false);
        //console.log(newProducts[index].image);

        document.getElementById("images-string").value = newProducts[index].image.join(", ");
    }

    function sortProducts() {
        let newProducts = [...products];
        newProducts.sort((a, b) => a.order - b.order);
        setProducts(newProducts);
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
                style={{ color: imageBool ? colorUploaded : colorNotUploaded, 
                    borderColor: imageBool ? "" : colorNotUploaded }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        const newProducts = [...products];
                        newProducts[index].image = e.target.value.split(", ");
                        setProducts(newProducts);
                        setUploadedBool(false);
                        setImageBool(false);
                    }
                }}>
            </textarea>
        </>
        );
    }

return (
    <div className="dash-container">
        <button className="d-trash" onClick={() => deleteProduct()}>
            <img src={Trash} alt="Delete" />
        </button>
        <div className="dash-product" key={product._id}>
            <div className="d-product-container">
                <div className="d-image" onClick={() => setGalleryActive(!galleryActive)}
                    onMouseEnter={() => setImgHovered(true)}
                    onMouseLeave={() => setImgHovered(false)}>
                    <img className="d-image-image" 
                        src={imgHovered || galleryActive ? ADown : product.image[0]} alt="" 
                        style={{transform: `rotate(${galleryActive ? 180 : 0}deg)`}}/>
                </div>

                <div className="d-info">
                    <div>
                        <p className="iL" >Name</p>                            
                        <input                     
                            className="d-name iL" 
                            defaultValue={product.name} 
                            type="text"
                            style={{ color: nameBool ? colorUploaded : colorNotUploaded, 
                                borderColor: nameBool ? "" : colorNotUploaded }}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index].name = e.target.value;
                                setProducts(newProducts);
                                setUploadedBool(false);
                                setNameBool(false);
                            }}
                        />
                        <div className="d-id iL">
                            id: {product._id}
                        </div>
                    </div>
                    <p>Description</p>
                    <textarea rows="3" cols="50"
                        className="d-description"
                        defaultValue={product.description} 
                        style={{ maxWidth: "600px", color: descriptionBool ? colorUploaded : colorNotUploaded, 
                            borderColor: descriptionBool ? "" : colorNotUploaded }}
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
                        defaultValue={product?.size?.join(', ')} 
                        type="text"
                        style={{ color: sizeBool ? colorUploaded : colorNotUploaded, 
                            borderColor: sizeBool ? "" : colorNotUploaded }}
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
                        <textarea rows="2"                    
                        defaultValue={product.color?.join('/ ')} 
                        type="text"
                        style={{ color: colorBool ? colorUploaded : colorNotUploaded, 
                            borderColor: colorBool ? "" : colorNotUploaded }}
                        onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].color = e.target.value.split("/ ");
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
                        <span style={{display: "flex", alignItems: "center"}}>
                        <input                     
                        defaultValue={product.price} 
                        type="number"
                        style={{ color: priceBool ? colorUploaded : colorNotUploaded, 
                            borderColor: priceBool ? "" : colorNotUploaded }}
                        onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].price = e.target.value;
                            setProducts(newProducts);
                            setUploadedBool(false);
                            setPriceBool(false);
                        }}
                        />€
                        </span>
                    </div>
                    <div className="d-stock">
                        <p className="">Stock</p>
                        <input                     
                        defaultValue={product.stock} 
                        className=""
                        type="number"
                        style={{ color: stockBool ? colorUploaded : colorNotUploaded, 
                            borderColor: stockBool ? "" : colorNotUploaded }}
                        onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].stock = e.target.value;
                            setProducts(newProducts);
                            setUploadedBool(false);
                            setStockBool(false);
                        }}
                        />
                    </div>
                    <div className="d-order">
                        <p className="iL">Order</p>
                        <input                     
                        defaultValue={product?.order} 
                        className="iL"
                        type="number"
                        style={{ color: orderBool ? "green" : colorNotUploaded, 
                            borderColor: orderBool ? "" : colorNotUploaded }}
                        onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[index].order = e.target.value;
                            setProducts(newProducts);
                            setUploadedBool(false);
                            setOrderBool(false);
                        }}
                        />
                    </div>
                </div>
                <div className="d-config">
                    <p>Category</p>
                    <input 
                        className="category_input"
                        defaultValue={product.category} 
                        style={{ color: categoryBool ? colorUploaded : colorNotUploaded, 
                            borderColor: categoryBool ? "" : colorNotUploaded }}
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
                        className="price_id_input"
                        defaultValue={product.price_id} 
                        style={{ color: priceIdBool ? colorUploaded : colorNotUploaded, 
                            borderColor: priceIdBool ? "" : colorNotUploaded }}
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
            {galleryActive && gallery()}
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