import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const { token, setToken, featuredProducts } = useContext(StoreContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false); // For mobile menu toggle

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");  
    setMenu("Home");
  };

  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false); // Close menu when the close button is clicked
  };

  return (
    <div className='navbar'>
      <img src='./logo.png' alt="" />

      {/* Menu Toggle for Mobile */}
      <button className="menu-toggle" onClick={handleMenuToggle}>
        ☰
      </button>

      {/* Navbar Menu */}
      <ul className={`navbar-menu ${isMenuVisible ? 'show' : ''}`}>
        {/* Close Button for Mobile */}
        <button className="menu-close" onClick={handleCloseMenu}>
          ×
        </button>

        <Link to='./'>
          <li
            onClick={() => {
              setMenu("Home");
              handleCloseMenu(); // Close the menu after setting the active menu item
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </li>
        </Link>

        {/* Right Side Content Inside the Menu for Mobile */}
        <div className='navbar-right'>
          {!token ? (
            <Link to="/login">
              <button>Sign in</button>
            </Link>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li>
                  <Link to="/u-orders">
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </Link>
                </li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
