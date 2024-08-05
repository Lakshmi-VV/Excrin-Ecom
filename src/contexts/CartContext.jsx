import React,{createContext,useEffect,useState} from "react";
export const CartContext = createContext();
import Notification from '../components/Notification';

function CartProvider({children}){

    const[cart,setCart] =useState([]);
    const [itemAmount,setItemAmount] =useState(0);
    const [totalPrice,setTotalPrice] =useState(0);

    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    useEffect(()=>{
        const total = cart.reduce((totalamount,currentItem)=>{
            return totalamount + currentItem.price * currentItem.amount;
        },0);
        setTotalPrice(total);
    }) 
    useEffect(()=>{
        if(cart){
            const amount = cart.reduce((totalamount,currentItem)=>{
                return totalamount + currentItem.amount;
            },0);
            setItemAmount(amount);
        }
    },[cart])

    const addToCart = (product,id)=>{
    const newItem = {...product, amount:1};

    const cartItem = cart.find((item) => {
        return item.id ===id ;
    });
    if(cartItem){ 
        const newCart =[...cart].map(item =>{
            if(item.id === id){
            return{...item, amount:cartItem.amount + 1};
            }
            else{
            return item;
            } 
            });
        setCart(newCart); 
    }
    else{
        setCart([...cart,newItem])
    }  
    setNotification({ show: true, message: 'Product added to cart!', type: 'success' });
    }
    const handleNotificationClose = () => {
        setNotification({ show: false, message: '', type: '' });
    };
    
    const removeFromCart = (id) =>{
        const newCart = cart.filter((item)=>{
            return item.id !== id;
        });
        setCart(newCart);
    }

    const clearCart = () =>{
        setCart([]);
    }

    const increaseAmount =(id) =>{
        const cartItem = cart.find((item)=> item.id ===id);
        addToCart(cartItem,id);
    }

    const decreaseAmount =(id)=>{
        const cartItem = cart.find((item)=>{
            return item.id ===id;
        })
        if(cartItem){
            const newCart = cart.map(item=> {
                if(item.id ===id ){
                    return{...item,amount: cartItem.amount - 1}
                }
                else{
                    return item;
                    
                }
            })
            setCart(newCart);   
        }
        
        if(cartItem.amount < 2) {
                removeFromCart(id);
            }
        
    }

    return(
        <>
        {notification.show && (
          <Notification
              message={notification.message}
              type={notification.type}
              onClose={handleNotificationClose}
          />
      )}
        <CartContext.Provider value={{cart , addToCart , removeFromCart,clearCart,increaseAmount,decreaseAmount,itemAmount,totalPrice}}>
            {children}
        </CartContext.Provider>
        </>
    )
}
export default CartProvider
