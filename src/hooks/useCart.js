// hooks/useCart.js
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Add to cart
  const addToCart = (pizza) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === pizza.name);
      if (existing) {
        return prev.map((item) =>
          item.name === pizza.name 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  const incrementItem = (name) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => setCart([]);
  const toggleCart = () => setShowCart((prev) => !prev);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ Order success handler (only COD / UPI)
  const handleOrderSuccess = async (orderData) => {
    const { customerDetails, cart, totalAmount, paymentMethod } = orderData;

    try {
      const formData = new FormData();
      formData.append('access_key', '39976cab-388c-4502-8d45-6dd1365c0853');
      formData.append('subject', 'New Pizza Order - HomeMade Pizza');
      formData.append('name', customerDetails.name);
      formData.append('phone', customerDetails.phone);
      formData.append('address', customerDetails.address);
      formData.append('email', customerDetails.email || 'Not provided');

      const orderItems = cart
        .map(
          (item) => `${item.name} x${item.quantity} (₹${item.price * item.quantity})`
        )
        .join(', ');

      formData.append('order', orderItems);
      formData.append('total', `₹${totalAmount}`);
      formData.append('payment_method', paymentMethod);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('🎉 Order placed successfully!', {
          position: 'top-center',
        });
        setShowPopup(true);
        clearCart();
        setShowCart(false);
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('Failed to process order. Please try again.', {
        position: 'top-center',
      });
    }
  };

  return {
    cart,
    showCart,
    showPopup,
    cartCount,
    totalAmount,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    toggleCart,
    handleOrderSuccess,
    setShowCart,
    setShowPopup,
  };
};
