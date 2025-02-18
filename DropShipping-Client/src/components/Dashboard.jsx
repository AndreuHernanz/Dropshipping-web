import React from "react";

function Dashboard({products, setProducts}) {  

    function addUnits(product, positive) {
        let newCart = cart.map((prod) => {
            if (prod.name === product.name) {
                if (positive) {
                    prod.units += 1;
                }
                else {
                    prod.units -= 1;
                    if (prod.units === 0) {
                        return null;
                    }
                }
            }
            return prod;
        });
        newCart = newCart.filter((prod) => prod !== null);
        setCart(newCart);
        localStorage.setItem('Cart', JSON.stringify(newCart));
    }

    function removeProduct(product) {
        let newCart = cart.filter((prod) => prod.name !== product.name);
        setCart(newCart);
        localStorage.setItem('Cart', JSON.stringify(newCart));
    }

    return (
<>
<div className="headerShadow"></div>
<div className="dashboard-view">
    <h1>Dashboard</h1>
    <div className="dash-products">
    {products.map((product, index) => (
        <div className="dash-product" key={product.name}>
            <img className="d-image" src={product.image[0]} alt="" />
            <div className="d-info">
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
                <p>Description</p>
                <textarea rows="4" cols="50"
                    className="d-description" 
                    defaultValue={product.description} 
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const newProducts = [...products];
                          newProducts[index].description = e.target.value;
                          setProducts(newProducts);
                        }
                      }}
                />
                {/* {product?.size && <p className="c-size">Size: {product.size.toUpperCase()}</p>} */}
                {/* {product?.color && <div id="c-flex-color"><p className="c-color">Color:</p><div className="color-div" style={{backgroundColor: product.color}}></div></div>} */}
            </div>
            <div className="d-properties">
                <div className="d-size">
                    <p>Size → (a, b, c)</p>
                    <input                     
                    value={product.size.toString()} 
                    type="text"
                    style={{ maxWidth: "7em", textAlign: "right" }}
                    onChange={(e) => {
                        const newProducts = [...products];
                        newProducts[index].size = e.target.value.split(", ");
                        setProducts(newProducts);
                    }}
                    />
                </div>
                <div className="d-color">
                    <p>Color → (x/ y/ z)</p>
                    <input />
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
            <div>
                <p>Category</p>
                <input 
                    className="c-name" 
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
            </div>
            
        </div>
    ))}
</div>
</div>
</>
    );
}

export default Dashboard;  