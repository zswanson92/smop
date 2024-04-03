import React from 'react';
import { useCart } from '../context/CartContext';

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-modal">
      <h2 className='text-silver'>Your Cart</h2>
      {cartItems.length === 0 && <p className='text-silver'>Your cart is empty</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <span className='text-silver'>{item.title}</span> - <button className='text-silver' onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className='text-silver' onClick={onClose}>Close</button>
    </div>
  );
};

export default CartModal;
