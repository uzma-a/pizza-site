import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import OrderSuccessPopup from "./components/OrderSuccessPopup";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    cart,
    showCart,
    showPopup,
    cartCount,
    totalAmount,
    addToCart,
    incrementItem,
    decrementItem,
    removeItem,
    toggleCart,
    handleOrderSuccess, // Updated function name
    setShowCart,
    setShowPopup,
  } = useCart();

  return (
    <Router>
      <div>
        {/* Add Razorpay script */}
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        
        <Navbar cartCount={cartCount} onCartClick={toggleCart} />
        <Hero />
        <Menu addToCart={addToCart} />

        <Cart
          cart={cart}
          showCart={showCart}
          totalAmount={totalAmount}
          onClose={() => setShowCart(false)}
          onIncrement={incrementItem}
          onDecrement={decrementItem}
          onRemove={removeItem}
          onOrderSuccess={handleOrderSuccess} // Updated prop name
        />

        <Contact />
        <Footer />

        <OrderSuccessPopup
          showPopup={showPopup}
          onClose={() => setShowPopup(false)}
        />

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;