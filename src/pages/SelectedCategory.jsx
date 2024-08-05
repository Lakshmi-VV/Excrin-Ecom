
import React,{useContext} from "react";
import { ProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

function Selected(){
    const {products} = useContext(ProductContext);
    const {dropDownCategory} = useParams();

    const selectedProduct =  products.filter(item =>{
        return item.category === dropDownCategory
    });
    // console.log(selectedProduct)
    return(
        <> 
        <div >
        <div className="font-bold uppercase text-center text-[24px] mb-3">{dropDownCategory}</div>

        <div className="flex justify-center">
        <div className="grid grid-cols-4 mx-10 gap-7">
        {
            selectedProduct.map((product)=>{
            return <div>
                <Product product={product}/>    
                </div>
        })
        
        } 
        </div>
        </div>
       
        </div>
        </>
    )
}
export default Selected
 
