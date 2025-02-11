import React from "react";
import { useParams } from "react-router";

function Product() {
    //let params = useParams()
    let productName = "a"//params.productName

    const [product, setProduct] = useState({})

    /*useEffect(() => {
        axios.get(`http://localhost:4040/product/:${productName}`)
            .then((res) => {
                setProduct(res.data.message);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])*/


    return (
        <div>
            <div className="headerShadow"></div>
            <h1>{productName}</h1>
        </div>
    );
}

export default Product;