import React, { useState } from "react";

const Navbar = ({ cartCount, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll function
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // mobile menu close after click
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md shadow-md border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => handleScroll("home")}
          className="text-2xl font-bold text-orange-400 cursor-pointer drop-shadow-[0_2px_6px_rgba(255,165,0,0.9)]"
        >
          🍕 Pizza By Ayesha
        </h1>



        {/* Desktop Menu */}
        <ul className="hidden text-white md:flex space-x-8 text-lg font-medium">
          <li
            onClick={() => handleScroll("home")}
            className="hover:bg-orange-400 cursor-pointer transition px-1 py-1 rounded-[10px_20px_30px_40px]"
          >
            Home
          </li>
          <li
            onClick={() => handleScroll("menu")}
            className="hover:bg-orange-400 cursor-pointer transition px-1 py-1 rounded-[10px_20px_30px_40px]"
          >
            Menu
          </li>
          <li
            onClick={() => handleScroll("contact")}
            className="hover:bg-orange-400 cursor-pointer transition px-1 py-1 rounded-[10px_20px_30px_40px]"
          >
            Contact
          </li>

          {/* Cart */}
          <li
            onClick={onCartClick}
            className="relative cursor-pointer text-2xl hover:text-orange-400 transition"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-black text-sm font-bold px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg font-medium pb-4">
          <p
            onClick={() => handleScroll("home")}
            className="hover:text-orange-400 cursor-pointer transition"
          >
            Home
          </p>
          <p
            onClick={() => handleScroll("menu")}
            className="hover:text-orange-400 cursor-pointer transition"
          >
            Menu
          </p>
          <p
            onClick={() => handleScroll("contact")}
            className="hover:text-orange-400 cursor-pointer transition"
          >
            Contact
          </p>

          {/* Cart for Mobile */}
          <p
            onClick={onCartClick}
            className="relative cursor-pointer text-2xl hover:text-orange-400 transition inline-block"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-black text-sm font-bold px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
