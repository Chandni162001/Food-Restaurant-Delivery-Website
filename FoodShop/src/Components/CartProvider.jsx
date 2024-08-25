import React, { useEffect, useState, createContext } from 'react';
import { BaseUrl } from '../config/Base_Url';
import axios from 'axios';

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  axios.defaults.withCredentials = true;

    const handleCart = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.log('No token found');
        return;
      }
  
      try {
        const res = await axios.get(`${BaseUrl}/api/product/viewCart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setCartItems(res.data.map(item => ({
          ...item,
          price: item.quantity * item.originalPrice,
        })));
      } catch (err) {
        console.log('Cart Items cannot be added', err.message);
      }
    };
    useEffect(() => {
    handleCart();
  }, []);
  

  const cartLength = cartItems.length;    


  return (
    <CartContext.Provider value={{  cartLength ,handleCart}}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
