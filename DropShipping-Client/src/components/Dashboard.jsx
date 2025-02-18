import React from "react";
import axios from "axios";
import Board from "./items/Boards";

function Dashboard({products, setProducts}) {

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

    return (
<>
<div className="headerShadow"></div>
<div className="dashboard-view">
    <h1>Dashboard</h1>
    <div className="dash-products">

    {products.map((productMap, index) => (
        <Board products={products} setProducts={setProducts} product={productMap} index={index}/>
    ))}

    {/*products.map((product, index) => (
        <div className="dash-container">
        <button className="d-trash" onClick={() => {}}>
            <img src={Trash} alt="Delete" />
        </button>
        <div className="dash-product" key={product.name}>
            <img className="d-image" src={product.image[0]} alt="" />
            <div className="d-info">
                <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
                    <p>Name</p>
                    <input 
                        className="d-name" 
                        defaultValue={product.name} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const newProducts = [...products];
                                newProducts[index].name = e.target.value;
                                setProducts(newProducts);
                            }
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
                    style={{ maxWidth: "600px" }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newProducts = [...products];
                          newProducts[index].description = e.target.value;
                          setProducts(newProducts);
                        }
                      }}
                />
            </div>
            <div className="d-properties">
                <div className="d-size">
                    <p>Size → (a, b, c)</p>
                    <input                     
                    defaultValue={product.size.join(', ')} 
                    type="text"
                    style={{ maxWidth: "7em", textAlign: "left" }}
                    onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].size = e.target.value.split(", ");
                        setProducts(newProducts);
                    }}
                    />
                </div>
                <div className="d-color">
                    <p>Color → (x/ y/ z)</p>
                    <textarea rows="2" cols="20"                     
                    defaultValue={product.color.join('/ ')} 
                    type="text"
                    style={{ textAlign: "left" }}
                    onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].size = e.target.value.split("/ ");
                        setProducts(newProducts);
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
                    style={{ maxWidth: "7em", textAlign: "right" }}
                    onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].price = e.target.value;
                        setProducts(newProducts);
                    }}
                    />€
                </div>
                <div className="d-stock">
                    <p>Stock</p>
                    <input                     
                    defaultValue={product.stock} 
                    type="number"
                    style={{ maxWidth: "4em", textAlign: "center" }}
                    onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].stock = e.target.value;
                        setProducts(newProducts);
                    }}
                    />
                </div>
            </div>
            <div className="d-config">
                <p>Category</p>
                <input 
                    defaultValue={product.category} 
                    style={{ maxWidth: "8em", marginRight: "1em" }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newProducts = [...products];
                          newProducts[index].category = e.target.value;
                          setProducts(newProducts);
                        }
                      }}
                />
                <p>Price_ID</p>
                <input 
                    defaultValue={product.price_id} 
                    style={{ maxWidth: "12em", marginRight: "1em" }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newProducts = [...products];
                          newProducts[index].price_id = e.target.value;
                          setProducts(newProducts);
                        }
                      }}
                />
            </div>
            
        </div>
        <button className="d-upload" onClick={() => updateProduct(product)}>
            <img src={Publish} alt="Publish" />
        </button>
        </div>
    ))*/}
</div>
</div>
</>
    );
}

export default Dashboard;  