import React from "react";

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "918521050537"; // Remove spaces and + for WhatsApp URL
    const message = encodeURIComponent("Hi! I'd like to order a delicious homemade pizza from Aayesha's kitchen.");
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-orange-400 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-300 mb-12">
          Ready to order? Get in touch with us!
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Call Us - Now opens WhatsApp */}
          <div 
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-green-400 hover:shadow-green-500/30 transition cursor-pointer transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2 text-yellow-400 flex items-center justify-center">
              💬 Call Us on WhatsApp
            </h3>
            <p className="text-2xl font-extrabold text-white mb-2">
              +91 85210 50537
            </p>
            <p className="text-gray-400 text-sm">
              Click to chat on WhatsApp instantly!
            </p>
          </div>

          {/* Service Area */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-orange-400 hover:shadow-orange-500/30 transition">
            <h3 className="text-xl font-bold mb-2 text-yellow-400 flex items-center justify-center">
              📍 Service Area
            </h3>
            <p className="text-lg font-semibold text-white">Jugsalai</p>
            <p className="text-gray-400 text-sm">
              Home delivery available
            </p>
          </div>

          {/* Order Hours */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-orange-400 hover:shadow-orange-500/30 transition">
            <h3 className="text-xl font-bold mb-2 text-yellow-400 flex items-center justify-center">
              ⏰ Order Hours
            </h3>
            <p className="text-lg font-semibold text-white">
              Daily: 10:00 AM - 10:00 PM
            </p>
            <p className="text-gray-400 text-sm">
              Fresh pizzas made to order
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;