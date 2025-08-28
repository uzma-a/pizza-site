// hooks/usePayment.js
import { toast } from 'react-toastify';

export const usePayment = () => {
  // Initialize Razorpay payment
  const initiatePayment = (orderData, onSuccess, onFailure) => {
    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      toast.error('Payment service not available. Please try again.');
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
      amount: Math.round(orderData.amount * 100), // Convert to paise
      currency: 'INR',
      name: 'HomeMade Pizza',
      description: 'Pizza Order Payment',
      image: '/Homemade-pizza.png', // Your logo
      order_id: orderData.razorpayOrderId, // Optional: if you create order on backend
      
      // Customer details
      prefill: {
        name: orderData.customerName,
        email: orderData.customerEmail || '',
        contact: orderData.customerPhone,
      },
      
      // Theme
      theme: {
        color: '#f97316', // Orange color matching your app
      },
      
      // Success callback
      handler: function (response) {
        // Payment successful
        const paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        onSuccess(paymentData);
      },
      
      // Payment modal closed without payment
      modal: {
        ondismiss: function () {
          toast.info('Payment cancelled');
          onFailure('Payment cancelled by user');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    
    // Handle payment failure
    razorpay.on('payment.failed', function (response) {
      toast.error('Payment failed: ' + response.error.description);
      onFailure(response.error);
    });

    // Open payment modal
    razorpay.open();
  };

  return { initiatePayment };
};