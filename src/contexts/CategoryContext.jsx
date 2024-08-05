import React, {createContext,useEffect,useState} from "react";
export const CategoryContext = createContext();

const CategoryProvider = ({children}) => {

    const[category,setCategory] = useState([]);
    
    useEffect(()=>{
        const fetchCategory = async ()=> {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const data = await response.json();
            setCategory(data);
        }
        fetchCategory();
    },[] )

    return( 
        <>
        <CategoryContext.Provider value={{category}}>{children}</CategoryContext.Provider>
        </>
    )
} 
export default CategoryProvider
