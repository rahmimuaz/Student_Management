import React from 'react';
import './ProductItem.css';

const ProductItem = ({ id, name, description, price, image, onClick }) => {
    return (
        <div className="product-item" onClick={() => onClick(id)}>
            <div className="product-item-image-container">
                <img className="product-item-image" src={image} alt={name} />
            </div>
            <div className="product-item-info">
                <p className="product-item-name">{name}</p>
                <p className="product-item-desc">{description}</p>
                <p className="product-item-price">Rs. {price}</p>
            </div>
        </div>
    );
};

export default ProductItem;
