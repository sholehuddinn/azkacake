import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Rekomendasi ukuran gambar: 1920x480px (ratio 4:1) untuk desktop
  // Atau 1200x300px untuk ukuran yang lebih kecil
  const bannerSlides = [
    {
      id: 1,
      title: "Promo Spesial Hari Ini!",
      subtitle: "Diskon 25% untuk semua kue ulang tahun",
      image: "/images/banner-1.jpg", // 1920x480px
      overlay: "from-blue-600/70 to-blue-800/70", // Overlay untuk readability
    },
    {
      id: 2,
      title: "Kue Custom Terbaik",
      subtitle: "Wujudkan kue impian Anda bersama kami",
      image: "/images/banner-2.jpg", // 1920x480px
      overlay: "from-purple-600/70 to-indigo-800/70",
    },
    {
      id: 3,
      title: "Gratis Ongkir Se-Kota",
      subtitle: "Minimal pembelian Rp 150.000",
      image: "/images/banner-3.jpg", // 1920x480px
      overlay: "from-emerald-600/70 to-teal-800/70",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <section className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl mx-4 sm:mx-6 lg:mx-8 my-8 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={bannerSlides[currentSlide].image}
              alt={""}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${bannerSlides[currentSlide].overlay}`} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <motion.h3
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-lg"
              >
                {bannerSlides[currentSlide].title}
              </motion.h3>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-md"
              >
                {bannerSlides[currentSlide].subtitle}
              </motion.p>
              
              {/* Call to Action Button */}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 sm:mt-6 bg-white text-gray-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Belanja Sekarang
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {bannerSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-white shadow-lg" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>
    </section>
  );
};

export default Banner;