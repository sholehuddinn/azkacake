"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Fetch semua produk dari API
  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = getCart(); // [{ id, quantity }]
        const products = await fetchAllProducts();

        const merged = cartItems
          .map(({ id, quantity }) => {
            const detail = products.find((p) => p.id === id);
            return detail ? { ...detail, qty: quantity } : null;
          })
          .filter(Boolean); // hilangkan null/nullish item

        setCart(merged);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeItem = (id) => {
    Swal.fire({
      title: "Hapus dari keranjang?",
      text: "Produk akan dihapus dari keranjang belanja",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCart((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          title: "Berhasil!",
          text: "Produk berhasil dihapus dari keranjang",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!name || !phone || !address || !event) {
      Swal.fire({
        title: "Data Tidak Lengkap",
        text: "Mohon lengkapi semua data pembeli!",
        icon: "warning",
        confirmButtonColor: "#2563eb"
      });
      return;
    }

    setSubmitting(true);

    try {
      const orderData = {
        name,
        phone,
        address,
        status: "menunggu",
        event, // format dari datetime-local input
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
        })),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal membuat order");

      await Swal.fire({
        title: "Berhasil!",
        text: "Order berhasil dibuat",
        icon: "success",
        confirmButtonColor: "#2563eb"
      });

      router.push(`/checkout/${result.id}`);
    } catch (err) {
      Swal.fire({
        title: "Checkout Gagal",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#2563eb"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 pt-28 pb-12 px-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gradient-to-br from-blue-50 via-white to-slate-100">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
          Keranjang Belanja
        </h1>
        <p className="text-gray-600">
          Tinjau pesanan Anda sebelum melakukan checkout
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {cart.length === 0 ? (
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Keranjang Kosong
            </h2>
            <p className="text-gray-600 mb-8">
              Belum ada produk di keranjang Anda. Yuk, mulai belanja!
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Mulai Belanja
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Item Pesanan ({cart.length})
                  </h2>
                  <Link
                    href="/catalog"
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Tambah Produk
                  </Link>
                </div>

                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex items-center gap-6 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg">
                        Rp {item.price.toLocaleString()}
                      </p>
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        Rp {(item.price * item.qty).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Checkout Form */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-32">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Informasi Pembeli
                </h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Jl. Contoh No. 123, Kota"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal & Waktu Acara
                    </label>
                    <input
                      type="datetime-local"
                      value={event}
                      onChange={(e) => setEvent(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">Rp {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Biaya Pengiriman</span>
                    <span className="font-semibold text-green-600">Gratis</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                    <span>Total</span>
                    <span className="text-blue-600">Rp {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 ${
                    submitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Checkout Sekarang
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}