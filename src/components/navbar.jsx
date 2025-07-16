"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="text-3xl">🎂</div>
            <h1 className="text-2xl font-bold text-blue-800">Azka Cake</h1>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/catalog"
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Produk
            </Link>
            <Link
              href="/contac"
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Kontak
            </Link>
            <Link
              href="/checkout"
              className="text-blue-700 hover:text-blue-900 font-medium"
            >
              Cek Status pesanan
            </Link>
          </nav>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <ShoppingCart size={20} />
            <Link href={'/cart'}>Keranjang</Link>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-600 focus:outline-none text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-2 space-y-2">
            <Link
              href="/"
              className="block text-blue-700 hover:text-blue-900 font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/catalog"
              className="block text-blue-700 hover:text-blue-900 font-medium"
            >
              Produk
            </Link>
            <Link
              href="/contac"
              className="block text-blue-700 hover:text-blue-900 font-medium"
            >
              Kontak
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
