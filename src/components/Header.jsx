import React,{useContext, useState,useEffect} from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import {BsBag} from 'react-icons/bs'
import { CategoryContext } from "../contexts/CategoryContext";
import { Link } from "react-router-dom";
import { useNavigate ,useLocation } from "react-router-dom";

function Header({ isLoggedIn, user, onLogoutClick, onLoginClick }){
    const {isOpen, setIsOpen} =useContext(SidebarContext);
    const{itemAmount} =useContext(CartContext);

     // category dropdown
     const {category} = useContext(CategoryContext);

     const[dropDownCategory ,setDropdownCategory] = useState("default")
     const navigate = useNavigate();
     const location = useLocation();
     const handleCategoryDropdown = (e) => {
         const dropDownCategory = e.target.value;
         setDropdownCategory(dropDownCategory);
         
         if (dropDownCategory !== "default") {
           navigate(`/category/${dropDownCategory}`);
         }
       };
       useEffect(() => {
        if (location.pathname === "/") {
          setDropdownCategory("default");
        }
      }, [location.pathname]);

    
    return(
        <>

        <div className="bg-gray-300 mb-3 flex justify-between p-3">
        <Link to={'/'}>
        <svg width="52" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6993 10.144L9.05 21H4.64933L1 10.144H4.61867L6.85733 17.6113L9.08067 10.144H12.6993ZM20.4521 17.7647L21.8321 12.352H25.4508L22.5681 21H18.3208L15.4381 12.352H19.0568L20.4521 17.7647ZM28.0406 21.1227C27.4477 21.1227 26.9724 20.9642 26.6146 20.6473C26.2568 20.3304 26.0779 19.9318 26.0779 19.4513C26.0779 18.9607 26.2568 18.5569 26.6146 18.24C26.9724 17.9129 27.4477 17.7493 28.0406 17.7493C28.6232 17.7493 29.0935 17.9129 29.4512 18.24C29.809 18.5569 29.9879 18.9607 29.9879 19.4513C29.9879 19.9318 29.809 20.3304 29.4512 20.6473C29.0935 20.9642 28.6232 21.1227 28.0406 21.1227Z" fill="black"/>
        </svg>
        </Link>

        <div className="flex gap-8 items-center">
      
        <div className="category-display">
        <select className="p-1 border bg-gray-300" onChange={handleCategoryDropdown} value={dropDownCategory}>
          <option value="default">Select the category </option>
          {category.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>


        {isLoggedIn ? (
                <>
                <div className="flex gap-5 items-center">      
                    <div className="uppercase font-semibold">{user.username}</div>
                    <button className="border px-3 py-1" onClick={onLogoutClick}>Logout</button>
                </div>
               
                </>
            ) : (
                <button className="border px-3 py-1" onClick={onLoginClick}>Login</button>
            )}

        <div className="flex justify-end items-center"> 
            <div onClick={()=> setIsOpen(!isOpen)}
                className="cursor-pointer"
                ><BsBag />
            </div>
            <div>. {itemAmount}</div>
        </div>
        </div>  
        </div>  
        </>
    )
}  
export default Header


