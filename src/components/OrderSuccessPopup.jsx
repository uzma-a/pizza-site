import React from 'react';

const OrderSuccessPopup = ({ showPopup, onClose }) => {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-slate-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Thank You!
        </h2>
        <p className="text-gray-700 mb-4">
          Your order has been placed successfully. <br />
          We'll prepare your pizza and deliver it soon! 🍕
        </p>
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;