import React from "react";
import { Flame, Heart, Star, Crown } from "lucide-react";

const Hero = () => {
  return (
    <section
  id="home"
  className="relative min-h-screen sm:pt-10 md:pt-4 bg-gradient-to-b from-[#1a0f0a] via-[#2b1a12] to-[#0d0d0d] 
             text-center text-white flex items-start justify-center px-6 overflow-hidden"
>

      {/* Background overlay dots */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto pt-36 md:pt-24">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
          Homemade Pizza by Aayesha
        </h1>


        {/* Subtitle */}
        <h2 className="text-2xl md:text-4xl font-semibold text-yellow-400 mb-4">
          Crafted with Love, Baked to Perfection
        </h2>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-bold text-yellow-300 mb-8 flex items-center justify-center gap-2 flex-wrap">
          <Flame className="text-red-500 w-6 h-6" />
          Taste the Magic of Authentic Homemade Flavors!
          <Flame className="text-red-500 w-6 h-6" />
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
          Every bite tells a story of passion, tradition, and irresistible taste.
          Made fresh daily with premium ingredients and secret family recipes
          that will leave you craving for more!
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <span className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium hover:bg-gray-700/80 transition-colors">
            ✨ Fresh Daily
          </span>
          <span className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium hover:bg-gray-700/80 transition-colors">
            🧀 Premium Cheese
          </span>
          <span className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium hover:bg-gray-700/80 transition-colors">
            🌟 Secret Recipes
          </span>
          <span className="flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium hover:bg-gray-700/80 transition-colors">
            ❤️ Made with Love
          </span>
        </div>

        {/* CTA Button */}
        <a
          href="#menu"
          className="inline-block mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg md:text-xl px-10 py-4 rounded-full shadow-xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
        >
          Order Your Slice of Heaven 🍕
        </a>
      </div>
    </section>
  );
};

export default Hero;