"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProdukDetailPage() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/product/${id}`);
        if (!res.ok) {
          throw new Error("Produk tidak ditemukan");
        }
        const data = await res.json();
        setProduk(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Memuat data produk...
      </main>
    );
  }

  if (error || !produk) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        {error || `Produk dengan ID ${id} tidak ditemukan.`}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pink-50 pt-28 pb-12 px-6">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:flex gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={produk.image}
            alt={produk.name}
            width={500}
            height={400}
            className="rounded-lg w-full object-cover h-64 md:h-auto"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-pink-700">{produk.name}</h1>
          <p className="text-gray-700">{produk.description}</p>
          <p className="text-sm text-gray-500">
            Kategori: {produk.category?.name}
          </p>
          <p className="text-sm text-black my-2">
            Terjual : <span className="text-red-500">{produk.sold_count}</span>
          </p>
          <p className="text-xl font-semibold text-pink-600">
            Rp {produk.price.toLocaleString()}
          </p>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20${encodeURIComponent(
              produk.name
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg mt-4 transition"
          >
            Tambah Keranjang
          </a>

          <Link
            href="/catalog"
            className="block text-sm text-pink-500 mt-4 hover:underline"
          >
            ← Kembali ke Katalog
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
