"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCart } from "@/lib/cart";
import Swal from "sweetalert2";

export default function KatalogPage() {
  const [produkList, setProduct] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/product", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const add = (id, name) => {
    addToCart(id)
    Swal.fire("success", `${name} berhasil masuk keranjang`, "success")
  }

  return (
    <main className="min-h-screen bg-pink-50 pt-28 pb-12 px-6">
      <motion.h1
        className="text-4xl font-bold text-center text-pink-700 mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Katalog Produk Azka Cake
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {produkList.map((produk, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-5 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link
              href={`/catalog/${produk.id}`}
            >
              <img
                src={produk.image}
                alt={produk.name}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-52 mb-4"
              />
              <h2 className="text-xl font-semibold text-pink-700">
                {produk.name}
              </h2>
              <p className="text-sm text-gray-600 my-2">{produk.description}</p>
              <p className="text-lg font-bold text-pink-600">
                Rp {produk.price.toLocaleString()}
              </p>
              <p className="text-sm text-black my-2">
                Terjual : <span className="text-red-500">{ produk.sold_count }</span>
              </p>
              <button onClick={ () => add(produk.id, produk.name) } className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition">
                Tambah keranjang
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
