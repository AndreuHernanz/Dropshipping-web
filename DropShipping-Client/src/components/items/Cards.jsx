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
            onMouseMove={handleMouseMove}
        >
            {/* <img src={isHovered ? showImage() : product.image[0]} alt="" /> */}
            <img src={hoveredImage} alt="" />
            <h2>{product.name.toUpperCase()}</h2>
            <p>{product.price}€</p>
        </div>
    );
}

export default Cards;