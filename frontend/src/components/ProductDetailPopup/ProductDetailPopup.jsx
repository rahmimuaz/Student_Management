import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDetailPopup.css';
import { StoreContext } from '../../context/StoreContext';

const ProductDetailPopup = ({ product, onClose }) => {
    const { addToCart } = useContext(StoreContext);
    const [updatedPrice, setUpdatedPrice] = useState(product.retailPrice);
    const [addedQuantity, setAddedQuantity] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    if (!product) return null;

    // Ensure product.images is an array
    const images = Array.isArray(product.images) ? product.images : [product.images];

    // Update price logic if needed
    useEffect(() => {
        setUpdatedPrice(product.retailPrice);
    }, [product.retailPrice]);

    // Handle Add to Cart
    const handleAddToCart = () => {
        const newAddedQuantity = addedQuantity + 1;
        setAddedQuantity(newAddedQuantity);
        addToCart(product._id, newAddedQuantity);
    };

    // Image navigation functions
    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="product-detail-popup">
            <div className="product-detail-container">
                <span className="close-btn" onClick={onClose}>&times;</span>

                <div className="product-detail-left">
                    <div className="image-slider">
                        <button className="prev-btn" onClick={prevImage}>&#8249;</button>
                        <img 
                            className="product-detail-image" 
                            src={`${images[currentImageIndex]}`} 
                            alt={product.name} 
                        />
                        <button className="next-btn" onClick={nextImage}>&#8250;</button>
                    </div>
                    <p className="product-detail-materials"> {product.specificDescription} </p>
                </div>

                <div className="product-detail-right">
                    <div className="product-detail-header">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                    </div>

                    <div className="product-detail-pricing">
                        <p className="old-price">Retail Price: LKR {product.retailPrice}</p>
                        <p className="updated-price">Updated Price: LKR {updatedPrice.toFixed(2)}</p>
                        <p>Quantity in stock: {product.quantity}</p>
                        <p>Category: {product.category}</p>
                    </div>

                    {/* Out of Stock Message */}
                    {product.quantity === 0 ? (
                        <p className="out-of-stock-message">Out of Stock</p>
                    ) : (
                        <div className="button-group">
                            <button 
                                className="add-to-cart-btn" 
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="view-cart-btn" 
                                onClick={() => navigate('/cart')} 
                            >
                                View Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPopup;
