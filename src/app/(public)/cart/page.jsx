"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const initialCart = [
  {
    id: "1",
    nama: "Brownies Lumer",
    gambar: "/brownies.jpg",
    harga: 25000,
    qty: 1,
  },
  {
    id: "2",
    nama: "Lapis Legit",
    gambar: "/lapis-legit.jpg",
    harga: 40000,
    qty: 2,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const router = useRouter();

  // Fungsi untuk update quantity produk
  const updateQty = (id, newQty) => {
    if (newQty < 1) return; // minimal 1
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  // Fungsi untuk hapus produk dari keranjang
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Hitung total harga
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const handleCheckout = () => {
    const checkoutId = Date.now().toString(); // bisa diganti dengan uuid
    router.push(`/checkout/${checkoutId}`);
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-pink-50">
      <motion.h1
        className="text-3xl font-bold text-pink-700 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Keranjang Belanja
      </motion.h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Keranjang kamu kosong 🥹</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.nama}</h2>
                <p className="text-pink-700 font-bold">
                  Rp {item.harga.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300 transition"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Hapus ${item.nama} dari keranjang`}
                className="text-red-600 hover:text-red-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                  />
                </svg>
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl font-bold text-pink-700">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
