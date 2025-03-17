import React, { useState } from 'react';
import './ProductDisplay.css';
import ProductItem from '../ProductItem/ProductItem';
import ProductDetailPopup from '../ProductDetailPopup/ProductDetailPopup';

const ProductDisplay = ({ category, products, scrollToProduct = () => {} }) => { 
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (id) => {
        const product = products.find(p => p._id === id);
        setSelectedProduct(product);

        // Check if scrollToProduct is a function before calling it
        if (typeof scrollToProduct === 'function') {
            scrollToProduct(id);
        } else {
            console.warn('scrollToProduct is not a function');
        }
    };

    const handleClosePopup = () => {
        setSelectedProduct(null);
    };

    return (
        <div className='product-display' id='product-display'>
            <hr />
            <h2>{category}</h2>

            <div className="product-display-list">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div key={item._id} id={item._id}>
                            <ProductItem
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.retailPrice}
                                image={item.images?.[0] || 'default-image.jpg'}
                                onClick={() => handleProductClick(item._id)}
                            /> 
                        </div>
                    ))
                ) : (
                    <p>No products available in this category.</p>
                )}
            </div>

            {selectedProduct && (
                <ProductDetailPopup 
                    product={selectedProduct}
                    onClose={handleClosePopup}
                />
            )}
        </div>
    );
};

export default ProductDisplay;
