// 'use client'

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Kue Ulang Tahun Premium",
      price: "Rp 250.000",
      image: "🎂",
      rating: 4.9,
      sold: 150,
    },
    {
      id: 2,
      name: "Brownies Coklat Special",
      price: "Rp 85.000",
      image: "🍰",
      rating: 4.8,
      sold: 89,
    },
    {
      id: 3,
      name: "Cheese Cake Original",
      price: "Rp 120.000",
      image: "🧀",
      rating: 4.9,
      sold: 67,
    },
    {
      id: 4,
      name: "Cupcake Rainbow",
      price: "Rp 45.000",
      image: "🧁",
      rating: 4.7,
      sold: 203,
    },
  ];

  return (
    <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-4">Produk Unggulan Kami</h2>
            <p className="text-gray-600">Nikmati berbagai pilihan kue dan roti terbaik kami</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Terjual {product.sold}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Tambah ke Keranjang
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default Product;
