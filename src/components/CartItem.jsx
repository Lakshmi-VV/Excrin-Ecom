import React, { useContext } from "react";
import { IoMdClose, IoMdRemove,IoMdAdd } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

function CartItem({item}){

    const {id,image,title,price,amount} = item;
    const {removeFromCart,increaseAmount,decreaseAmount} = useContext(CartContext);
 
    return(
        <>
        <div>
            <div className="border m-5 p-3">
                <img src={image} alt={title}  width={100}/>
                <div className="flex justify-between items-center">
                <div className="font-semibold">{title}</div>
                <div onClick={()=> removeFromCart(id)}><IoMdClose /></div>
                </div>
               
                <div className="flex border p-2 items-center gap-3 w-1/4 my-2">
                  
                    <div onClick={() => decreaseAmount(id)}><IoMdRemove /></div>
                    <div>{amount}</div>
                    <div onClick={() => increaseAmount(id)}><IoMdAdd /></div>
                </div>
                <div>
                   
                    <div>Item price : $ {price}</div>
                    <div className="font-semibold">{`$ ${(price * amount).toFixed(2)}`}</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CartItem 