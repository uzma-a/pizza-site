import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Add to cart (merge by name)
  const addToCart = (pizza) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.name === pizza.name);
      if (existing) {
        return prev.map((it) =>
          it.name === pizza.name ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
  };

  // Quantity controls
  const incrementItem = (name) => {
    setCart((prev) =>
      prev.map((it) =>
        it.name === name ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  const decrementItem = (name) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it.name === name ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCart((prev) => prev.filter((it) => it.name !== name));
  };

  const toggleCart = () => setShowCart((s) => !s);

  // Totals
  const cartCount = cart.reduce((acc, it) => acc + it.quantity, 0);
  const totalAmount = cart.reduce((acc, it) => acc + it.price * it.quantity, 0);

  // Order submit
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Send to Web3Forms
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success(" Order placed successfully!", {
        position: "top-center",
      });
      setShowPopup(true);
      setCart([]);
      setShowCart(false);
    } else {
      toast.error("❌ Something went wrong. Try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Router>
      <div>
        <Navbar cartCount={cartCount} onCartClick={toggleCart} />
        <Hero />
        <Menu addToCart={addToCart} />

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed mt-16 top-0 right-0 w-96 max-w-[95vw] h-full bg-white shadow-lg p-6 overflow-y-auto border-l border-gray-300 z-50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
              <button
                className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                onClick={() => setShowCart(false)}
              >
                Close
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                <ul className="space-y-3">
                  {cart.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center justify-between gap-3 border-b pb-3"
                    >
                      <div className="min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ₹{item.price} each
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decrementItem(item.name)}
                          className="w-8 h-8 rounded-md border hover:bg-gray-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item.name)}
                          className="w-8 h-8 rounded-md border hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Checkout Form */}
                <form onSubmit={handleOrderSubmit} className="mt-6 space-y-4">
                  <input
                    type="hidden"
                    name="access_key"
                    value="39976cab-388c-4502-8d45-6dd1365c0853"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New Order from HomeMade Pizza"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    className="w-full border rounded px-3 py-2"
                  />

                  {/* Hidden cart/total */}
                  <textarea
                    name="order"
                    hidden
                    value={cart
                      .map(
                        (it) =>
                          `${it.name} x${it.quantity} (₹${
                            it.price * it.quantity
                          })`
                      )
                      .join(", ")}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="total"
                    value={`₹${totalAmount}`}
                  />

                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded transition"
                  >
                    Place Order
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        <Contact />
        <Footer />

        

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 Thank You!
              </h2>
              <p className="text-gray-700 mb-4">
                Your order has been placed successfully. <br />
                We’ll prepare your pizza and deliver it soon! 🍕
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* Toast container */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
