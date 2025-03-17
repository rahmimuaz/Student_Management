import React, { useState } from 'react';
import './ExploreMenu.css';
import { category_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to handle category selection
  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === "All Products" || selectedCategory === "All Products") {
      setCategory("All Products");
    } else if (selectedCategory === "brand new" || selectedCategory === "Brand New") {
      setCategory("Brand New");
    } else if (selectedCategory === "pre Owned" || selectedCategory === "Pre Owned") {
      setCategory("Pre Owned");
    } else if (selectedCategory === "accessories" || selectedCategory === "Accessories") {
      setCategory("Accessories");
    } else if (selectedCategory === "Build" || selectedCategory === "Build") {
      setCategory("Build");
    } else {
      setCategory(prev => prev === selectedCategory ? "All" : selectedCategory);
    }
  };

  return (
    <div className="explore-menu-container">
      {/* Mobile Menu Button, shown only on mobile */}
      <button 
        className="menu-button" 
        onClick={() => setMenuVisible(!menuVisible)}
      >
        &#9776; Categories
      </button>

      {/* Menu Section */}
      <div className={`explore-menu ${menuVisible ? 'visible' : ''}`} id="explore-menu">
        <div className="explore-menu-list">
          {category_list.map((item, index) => (
            <div 
              onClick={() => handleCategoryClick(item.menu_name)} 
              key={index} 
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''} ${item.menu_name === 'All' ? 'all-category' : ''}`}
            >
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;
