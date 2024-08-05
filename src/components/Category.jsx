
import React from "react";
import { Link } from "react-router-dom";
 
function Category({category}){
    return(
        <>
        
        <div>
        <Link to={`/category/${category}`}>

        <div className="mb-2 uppercase text-center">{category}</div>
         </Link>
        </div>
        </>
    ) 
} 
export default Category  

