import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, featuredProducts, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add</p>
          <p>Remove</p>
        </div>
        <br /> 
        <hr />
        
        {Object.keys(cartItems).length > 0 ? (
          Object.entries(cartItems).map(([itemKey, cartItem], index) => {
            const [itemId, size] = itemKey.split("-"); // Extract itemId and size
            const product = featuredProducts.find((item) => item._id === itemId); // Find product

            if (product) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={product.images[0]} alt={product.name} /> 
                    <p>{product.name}</p>
                    <p>Rs.{product.retailPrice}</p>
                    <p>{cartItem.quantity}</p>
                    <p>Rs.{product.retailPrice * cartItem.quantity}</p>
                    <p onClick={() => addToCart(itemId, size, product.name)} className='add'>+</p>
                    <p onClick={() => removeFromCart(itemId, size)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <hr />
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs.{totalAmount}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>Rs.{totalAmount}</b>
            </div>
          </div>
          <button 
            onClick={() => navigate('/order')} 
            disabled={totalAmount === 0} 
            className={totalAmount === 0 ? 'disabled' : ''}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
