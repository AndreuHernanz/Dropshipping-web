import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";

function Cards({product}) {

    let navigate = useNavigate()
    function navigateToProduct(prodName) {
        window.scrollTo(0, 0);
        navigate(`/product/${prodName}`)
    }

    const [hoveredImage, setHoveredImage] = useState(product.image[0]);
    const boxRef = useRef(null);

    const handleMouseMove = (e) => {
        const box = boxRef.current.getBoundingClientRect();
        const mousePositionX = (e.clientX - box.left) / box.width; // 0 to 1

        // Choose image based on percentage
        const index = Math.floor(mousePositionX * product.image.length);
        const safeIndex = Math.max(0, index);
        setHoveredImage(product.image[safeIndex]);
    };

    return (
        <div 
            className="product" 
            key={product._id} 
            onClick={() => navigateToProduct(product.name)}
            ref={boxRef}
            style={{ anchorName: `--product${product._id}` }}
            onMouseMove={handleMouseMove}
        >
            <img src={hoveredImage} alt="" />
            <h2>{product.name.toUpperCase()}</h2>
            <p>{product.price}€</p>
            {/* <div style={{ position:"absolute",  
                left: "0", top: "90px", margin: "10px", padding: "0.3rem",  backgroundColor: "red", color : "white",
                 }}>aa</div> */}

            <div className="sold-out"
                style={{ position:"absolute", positionAnchor: `--product${product._id}`, 
                right: "0", top: "0", margin: "1rem", padding: "0.3rem",  backgroundColor: "red", color : "white",
                display: product.stock === 0 ? "block" : "none" }}>
                <p>Sold Out</p>
            </div>
        </div>
    );
}

export default Cards;