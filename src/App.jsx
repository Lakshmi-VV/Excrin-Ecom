import React from "react"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"
import SelectedCategory from './pages/SelectedCategory'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"

import LoginPopup from './components/LoginPopup';
import Notification from './components/Notification';
import { useState,useEffect } from "react";
import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit';

function App(){

  const isAuthenticated = useIsAuthenticated();
  const authUser = useAuthUser();
  const signOut = useSignOut();
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const handleLoginClick = () => {
      setShowPopup(true);
  };

  const handleLogoutClick = () => {
      signOut();
      setNotification({ show: true, message: 'Logged out successfully!', type: 'out' });
  };
  
  const handleLoginSuccess = () => {
    setNotification({ show: true, message: 'Logged in successfully!', type: 'success' });
    setShowPopup(false);
};

const handleLoginFail = () => {
  setNotification({ show: true, message: 'Invalid email/name or password', type: 'error' });
};

const handleNotificationClose = () => {
    setNotification({ show: false, message: '', type: '' });
};
 return(
  <>
    {notification.show && (
          <Notification
              message={notification.message}
              type={notification.type}
              onClose={handleNotificationClose}
          />
      )}
   <Header 

      isLoggedIn={isAuthenticated()} 
      user={authUser()} 
      onLogoutClick={handleLogoutClick} 
      onLoginClick={handleLoginClick} 
  />
  {showPopup && <LoginPopup onLoginSuccess={handleLoginSuccess} onLoginFail={handleLoginFail} onClose={() => setShowPopup(false)} />}

  
  <Routes>
    
    <Route path="/" element={<Home/>} />
    
    {/* <Route path="/product/:id" element={<ProductDetails />} /> */}

    <Route path="/category/:dropDownCategory" element={<SelectedCategory />}/>

  </Routes>
  
  <Sidebar /> 
  {/* <Footer />
   */}
   
  </>
 )
}
 
export default App
