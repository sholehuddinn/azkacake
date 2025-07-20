'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product');
        const result = await res.json();
        if (res.ok) {
          setProducts(result.data.slice(0, 8));
        } else {
          console.error('Gagal mengambil produk:', result.message);
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    fetchProducts();
  }, []);

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
          <p className="text-gray-600">Nikmati berbagai pilihan produk terbaik kami</p>
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
              <div className="">
                <Image
                  src={`/image/${product.image}`}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="relative w-full h-48 bg-white"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-600 font-bold text-lg">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Terjual {product.sold_count}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
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
