
import React,{useContext , useState} from "react";
import { CartContext } from "../contexts/CartContext";
import { IoMdClose } from "react-icons/io";
import { useIsAuthenticated } from 'react-auth-kit';
import LoginPopup from "../components/LoginPopup";

function ProductDetails({product, onClose}){
 
    const {addToCart}= useContext(CartContext);
    const isAuthenticated = useIsAuthenticated();
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleLoginClick = ()=>{
        setShowLoginPopup(true);
    }
    return(
        <>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-1">
     
      <div className="bg-white p-6 rounded-lg w-1/2">

            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <button onClick={onClose} className="bg-gray-400 text-white p-2">
                    <IoMdClose />
                </button>
            </div>

            <div className="flex gap-14 p-6">
                <img src={product.image} alt={product.title} className="w-64 h-64 object-contain mb-4" />
                <div className="flex flex-col gap-4">
                    <p className="text-gray-700 text-justify">{product.description}</p>
                    <p className="text-lg font-bold">$ {product.price}</p> 

                    {isAuthenticated() ? (
                        <button
                        className="bg-black text-white p-1 px-2 my-2 w-fit"
                        onClick={() => addToCart(product, product.id)}
                        >
                        Add to Cart
                        </button>
                    ) : (
                        <button className="bg-gray-500 text-white p-1 px-2 my-2 w-fit "
                        onClick={handleLoginClick}
                         >
                         Login Add to Cart
                        </button>
                    )}
                </div>
            </div>
           
       </div>
    </div>
       {showLoginPopup && <LoginPopup onClose={()=>{setShowLoginPopup(false)}}/>}
        </> 
    )
}
export default ProductDetails


