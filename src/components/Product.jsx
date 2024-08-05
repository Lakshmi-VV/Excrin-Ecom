
import React ,{useContext} from "react";
import { CartContext } from "../contexts/CartContext";
import { useState} from "react";
import ProductDetails from "../pages/ProductDetails";
import { useIsAuthenticated } from 'react-auth-kit';
import LoginPopup from "./LoginPopup";

function Product( {product}){
    const {addToCart}= useContext(CartContext);
    const isAuthenticated = useIsAuthenticated();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const {id,image,category,title,price} = product;


    const [productPopup , setProductPopup] =useState (false);

    const handleProductPopup =() =>{
      setProductPopup(true);
    }

    const handleAddToCart = () => {
        if (isAuthenticated()) {
          addToCart(product, product.id);
        } else {
          setShowLoginPopup(true); 
        }
      };    
    
    return(
        <> 
        {productPopup && <ProductDetails   onClose={() => setProductPopup(false)} product={product}/>}
        <div className="border p-4 flex flex-col items-center">
            <img className="w-52 h-52 object-fit mb-3" src={image} />
        
            <div className="uppercase w-full">{category}</div>
            <div className="font-bold h-[80px] pt-1  w-full cursor-pointer"  onClick={handleProductPopup}>
                
                 {/* <Link to={`/product/${id}`}>{product.title}</Link> */}
                 {product.title}

                  </div>
                <div className="flex items-center justify-between w-full">
                    <div>$ {product.price}</div>

                <button className="bg-black text-white p-1 px-2 my-2 w-fit" onClick={handleAddToCart}>
                Add to Cart
              </button>
                   
                </div>
        </div> 

        {showLoginPopup && <LoginPopup onClose={()=> {setShowLoginPopup(false)}} />}
        </>
    )
}
export default Product

