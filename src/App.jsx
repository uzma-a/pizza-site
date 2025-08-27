import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThankYou from "./pages/ThankYou";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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
        .filter((it) => it.quantity > 0) // remove if zero
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
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const orderDetails = {
      name: form.get("name"),
      address: form.get("address"),
      phone: form.get("phone"),
      cart,
      total: totalAmount,
    };
    console.log("Order Submitted:", orderDetails);
    setCart([]);
    setShowCart(false);
    alert("✅ Order placed successfully!");
  };

  return (
    <Router>
      <Routes>
        {/* Main app route */}
        <Route
          path="/"
          element={
            <div>
              {/* Navbar */}
              <Navbar cartCount={cartCount} onCartClick={toggleCart} />

              <Hero />

              {/* Menu */}
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
                              <p className="text-sm text-gray-500">₹{item.price} each</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decrementItem(item.name)}
                                className="w-8 h-8 rounded-md border hover:bg-gray-50"
                                aria-label="Decrease"
                              >
                                −
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => incrementItem(item.name)}
                                className="w-8 h-8 rounded-md border hover:bg-gray-50"
                                aria-label="Increase"
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
                      <form
                        action="https://api.web3forms.com/submit"
                        method="POST"
                        className="mt-6 space-y-4"
                      >
                        {/* Web3Forms Access Key */}
                        <input type="hidden" name="access_key" value="39976cab-388c-4502-8d45-6dd1365c0853" />
                        {/* Custom subject  */}
                        <input type="hidden" name="subject" value="New Order from HomeMade Pizza"></input>

                        {/* Custom Redirect URL */}
                        <input
                          type="hidden"
                          name="redirect"
                          value="https://homemade-pizza-by-ayesha.vercel.app/thank-you"
                        />

                        {/* Customer Details */}
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          required
                          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          required
                          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          required
                          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />

                        {/* Hidden fields for cart and total */}
                        <textarea
                          name="order"
                          hidden
                          value={cart.map(it => `${it.name} x${it.quantity} (₹${it.price * it.quantity})`).join(", ")}
                          readOnly
                        />
                        <input type="hidden" name="total" value={`₹${totalAmount}`} />

                        {/* Total display */}
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
            </div>
          }
        />
        {/* Thank you page route */}
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
