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

    
</div>
</div>
</>
    );
}

export default Dashboard;  