// components/Cart.jsx - Improved Layout
import React, { useState } from 'react';
import { usePayment } from '../hooks/usePayment';
import { ToastContainer, toast } from 'react-toastify';

const Cart = ({
  cart,
  showCart,
  totalAmount,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onOrderSuccess,
}) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { initiatePayment } = usePayment();

  if (!showCart) return null;

  const handleInputChange = (e) => {
    setCustomerDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Validate form
    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    setIsProcessing(true);

    const orderData = {
      amount: totalAmount,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerEmail: customerDetails.email,
    };

    const onPaymentSuccess = (paymentData) => {
      onOrderSuccess({
        customerDetails,
        cart,
        totalAmount,
        paymentData,
        paymentMethod: 'razorpay'
      });
      setIsProcessing(false);
      setCustomerDetails({ name: '', address: '', phone: '', email: '' });
    };

    const onPaymentFailure = (error) => {
      console.error('Payment failed:', error);
      setIsProcessing(false);
    };

    initiatePayment(orderData, onPaymentSuccess, onPaymentFailure);
  };

  const handleCashOnDelivery = (e) => {
    e.preventDefault();

    if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    onOrderSuccess({
      customerDetails,
      cart,
      totalAmount,
      paymentData: null,
      paymentMethod: 'cod'
    });

    setCustomerDetails({ name: '', address: '', phone: '', email: '' });
  };

  return (
    <div className="fixed mt-16 top-0 right-0 w-full h-full bg-white shadow-xl p-4 overflow-y-auto border-l border-gray-300 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-bold text-gray-800">🛒 Your Cart</h2>
        <button
          className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={onClose}
        >
          ✕ Close
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-500">Your cart is empty</p>
          <p className='text-5xl'>🍕</p>
          <p className="text-gray-400 text-sm mt-1">Add some delicious pizzas!</p>
        </div>
      ) : (
        <>

          {/* Cart Items */}
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.name}
                className="bg-gray-50 rounded p-2 border border-gray-200"
              >
                {/* Item Name and Price */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-xs leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      ₹{item.price} each
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.name)}
                    className="text-red-500 hover:text-red-700 text-xs ml-1"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>

                {/* Quantity Controls and Total */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDecrement(item.name)}
                      className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onIncrement(item.name)}
                      className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-orange-600 text-xs">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="bg-orange-50 rounded p-3 mb-4 border border-orange-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-orange-600">₹{totalAmount}</span>
            </div>
          </div>

          {/* Customer Details Form */}

          <form className="space-y-3">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-2">
                📋 Customer Details
              </h3>
            </div>

            <div className="customer-details">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <textarea
                  name="address"
                  placeholder="Delivery Address *"
                  value={customerDetails.address}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email (Optional)"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>


            {/* Payment Options */}
            <div className="space-y-2 mb-2 pt-3 flex items-center justify-around gap-4">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : (
                  '💳 Pay Online (UPI/Card/Wallet)'
                )}
              </button>

              <button
                onClick={handleCashOnDelivery}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-3 rounded transition-colors text-sm"
              >
                💰 Cash on Delivery
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;