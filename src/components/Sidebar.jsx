import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {IoMdArrowForward} from 'react-icons/io'
import {FiTrash2} from 'react-icons/fi'
import CartItem from './CartItem'
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";

function Sidebar(){
 
    const {isOpen,handleClose} = useContext(SidebarContext);
    const {cart,clearCart,itemAmount,totalPrice} = useContext(CartContext);
    return(
        <>
        <div className={ `${isOpen ? 'right-0' : '-right-full'} fixed top-0 h-full bg-gray-300 w-1/4`} >
        <div className="flex items-center justify-between m-3">
        <div className="font-semibold">Shopping bag ({itemAmount})</div>
        <div onClick={handleClose}><IoMdArrowForward/></div>
        </div>
           
            <div> 
                {cart.map((item) =>{
                    return <CartItem item={item} key={item.id}/>
                    // return <div key={item.id}> {`${item.title} - Amount ${item.amount}`}</div>;
                })}
            </div>
            <div>
                <div className="flex m-5 justify-between items-center">
                    <div ><span className="font-bold">Total price: </span>{`${(totalPrice).toFixed(2)}`}</div>
                    <div onClick={()=>clearCart() }><FiTrash2 /></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Sidebar

