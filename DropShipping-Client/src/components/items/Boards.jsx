import React, { useEffect } from "react";
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

    let colorUploaded = 'lightblue';
    let colorNotUploaded = 'orange';

    function updateProduct() {
        axios.post("http://localhost:4040/product/update", {product})
            .then(response => {
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
                setPriceIdBool(true);
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    }

    function deleteProduct() {
        if (window.confirm(`Are you sure you want to delete this product: ${product.name.toUpperCase()}?`)) {
            axios.post("http://localhost:4040/product/delete", { product })
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
                            style={{ color: nameBool ? colorUploaded : colorNotUploaded }}
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
                        style={{ color: sizeBool ? colorUploaded : colorNotUploaded }}
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
                        defaultValue={product.color.join('/ ')} 
                        type="text"
                        style={{ color: colorBool ? colorUploaded : colorNotUploaded }}
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
                        style={{ maxWidth: "7em", textAlign: "right", color: priceBool ? colorUploaded : colorNotUploaded }}
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