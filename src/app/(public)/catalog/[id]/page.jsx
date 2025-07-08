"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { addToCart } from "@/lib/cart";
import Swal from "sweetalert2";

export default function ProdukDetailPage() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleAddToCart = () => {
    addToCart(id);
    Swal.fire({
      title: "Berhasil!",
      text: `${produk.name} berhasil ditambahkan ke keranjang`,
      icon: "success",
      confirmButtonColor: "#2563eb",
      timer: 2000,
      showConfirmButton: false
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 pt-28 pb-12 px-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Memuat data produk...</p>
        </div>
      </main>
    );
  }

  if (error || !produk) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 pt-28 pb-12 px-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Produk Tidak Ditemukan</h2>
          <p className="text-gray-600 text-center mb-6">
            {error || `Produk dengan ID ${id} tidak ditemukan.`}
          </p>
          <Link
            href="/catalog"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 pt-28 pb-12 px-6">
      {/* Breadcrumb */}
      <motion.nav
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-blue-600 transition-colors">
            Katalog
          </Link>
          <span>/</span>
          <span className="text-blue-600 font-medium">{produk.name}</span>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="lg:flex">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              )}
              <img
                src={produk.image}
                alt={produk.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            {/* Image Badge */}
            <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Terjual {produk.sold_count}
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category */}
              {produk.category?.name && (
                <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {produk.category.name}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {produk.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.8 dari 5)</span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-blue-600">
                Rp {produk.price.toLocaleString()}
              </div>

              {/* Description */}
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {produk.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{produk.sold_count}</div>
                  <div className="text-sm text-gray-600">Terjual</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                  Tambah ke Keranjang
                </button>

                <a
                  href={`https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20${encodeURIComponent(
                    produk.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24z"/>
                  </svg>
                  Pesan via WhatsApp
                </a>
              </div>

              {/* Back Link */}
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Katalog
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Related Products Section */}
      <motion.div
        className="max-w-6xl mx-auto mt-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Produk Lainnya
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Temukan produk kue lezat lainnya yang mungkin Anda sukai
        </p>
        <div className="text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Produk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}