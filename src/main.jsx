import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import ProductProvider from './contexts/ProductContext.jsx';
import SidebarProvider from './contexts/SidebarContext.jsx';
import CartProvider from './contexts/CartContext.jsx';
import CategoryProvider from './contexts/CategoryContext.jsx';

import  {AuthProvider}  from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider 
   authType={"cookie"}
   authName={"_auth"}
   cookieDomain={window.location.hostname}
   cookieSecure={false}
  >
    <SidebarProvider> 
      <CategoryProvider>
        <CartProvider>
          <ProductProvider>
            
            <BrowserRouter>
            <App />
            </BrowserRouter>
           
          </ProductProvider>
        </CartProvider>
      </CategoryProvider>
    </SidebarProvider>
  
  </AuthProvider>

  </React.StrictMode>

);
