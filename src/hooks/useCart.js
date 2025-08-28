// hooks/useCart.js - Updated with Payment Integration
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Add to cart (merge by name)
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

  // Quantity controls
  const incrementItem = (name) => {
    setCart((prev) =>
      prev.map((item) =>
        item.name === name 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decrementItem = (name) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => setShowCart((prev) => !prev);

  // Computed values
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Updated order success handler (works for both payment methods)
  const handleOrderSuccess = async (orderData) => {
    const { customerDetails, cart, totalAmount, paymentData, paymentMethod } = orderData;

    try {
      // Prepare order details for Web3Forms
      const formData = new FormData();
      formData.append('access_key', '39976cab-388c-4502-8d45-6dd1365c0853');
      formData.append('subject', 'New Pizza Order - HomeMade Pizza');
      formData.append('name', customerDetails.name);
      formData.append('phone', customerDetails.phone);
      formData.append('address', customerDetails.address);
      formData.append('email', customerDetails.email || 'Not provided');
      
      // Order details
      const orderItems = cart.map(item => 
        `${item.name} x${item.quantity} (₹${item.price * item.quantity})`
      ).join(', ');
      
      formData.append('order', orderItems);
      formData.append('total', `₹${totalAmount}`);
      formData.append('payment_method', paymentMethod);
      
      // Add payment details if online payment
      if (paymentMethod === 'razorpay' && paymentData) {
        formData.append('payment_id', paymentData.razorpay_payment_id);
        formData.append('payment_status', 'Paid Online');
      } else {
        formData.append('payment_status', 'Cash on Delivery');
      }

      // Send to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success(
          paymentMethod === 'razorpay' 
            ? '🎉 Payment successful! Order confirmed!' 
            : '🎉 Order placed! Pay on delivery!',
          { position: 'top-center' }
        );
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
    handleOrderSuccess, // Updated function name
    setShowCart,
    setShowPopup,
  };
};