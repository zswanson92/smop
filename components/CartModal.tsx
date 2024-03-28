// components/CartModal.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="cart-modal">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default CartModal;
