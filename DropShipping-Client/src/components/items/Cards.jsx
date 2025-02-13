import React from "react";
import { useNavigate } from "react-router";

function Cards({product}) {

    let navigate = useNavigate()
    function navigateToProduct(prodName) {
        window.scrollTo(0, 0);
        navigate(`/product/${prodName}`)
    }

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div 
            className="product" 
            key={product._id} 
            onClick={() => navigateToProduct(product.name)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={isHovered ? product.image[1] : product.image[0]} alt="" />
            <h2>{product.name.toUpperCase()}</h2>
            <p>{product.price}€</p>
        </div>
    );
}

export default Cards;