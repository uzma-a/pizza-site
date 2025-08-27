import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">🎉 Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your order has been placed successfully.  
          We’ll prepare your pizza and deliver it soon! 🍕
        </p>

        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
