import React, { useState } from "react";

const pizzas = [
  { name: "Classic Onion Pizza", price: 130, desc: "A timeless classic with perfectly caramelized onions on our signature homemade base." },
  { name: "Cheese Corn Pizza", price: 150, desc: "Sweet corn kernels with melted cheese creating the perfect comfort food combination." },
  { name: "Cheese Egg Pizza", price: 150, desc: "Fluffy eggs and rich cheese blend for a protein-packed delicious treat." },
  { name: "Cheese Chicken Pizza", price: 160, desc: "Tender chicken pieces with premium cheese on our homemade pizza base." },
  { name: "Double Cheese Chicken Pizza", price: 170, desc: "Extra cheese and chicken for those who want the ultimate indulgence." },
  { name: "Cheese Soyabean Pizza", price: 150, desc: "Healthy soyabean chunks with cheese - a perfect vegetarian protein option." },
];

const Menu = ({ addToCart }) => {
  const [addedIndex, setAddedIndex] = useState(null);

  const handleAdd = (pizza, index) => {
    addToCart(pizza);
    setAddedIndex(index);

    // Hide popup after 1 second
    setTimeout(() => {
      setAddedIndex(null);
    }, 1000);
  };

  return (
    <section id="menu" className="py-16 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-orange-400">
          Our Delicious Menu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700 hover:border-orange-400 hover:shadow-orange-500/30 transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-orange-400">
                  🍕 {pizza.name}
                </h3>
                <span className="text-lg font-bold text-orange-300">
                  ₹{pizza.price}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6">{pizza.desc}</p>

              {/* Add to Cart Button */}
              <div className="relative">
                <button
                  onClick={() => handleAdd(pizza, index)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg w-full transition"
                >
                  Add to Cart 🛒
                </button>

                {/* Popup */}
                {addedIndex === index && (
                  <span className="absolute right-2 -top-8 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-md animate-fade">
                    Item added ✅
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
