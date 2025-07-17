"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ActionButtons({ orderId, grossAmount, customer }) {
  const [snapReady, setSnapReady] = useState(false);

  // Load Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    );
    script.async = true;

    script.onload = () => {
      console.log("✅ Snap.js siap!");
      setSnapReady(true);
    };

    script.onerror = () => {
      console.error("❌ Gagal memuat Midtrans Snap.js");
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handlePay = async () => {
    if (!snapReady || typeof window.snap === "undefined") {
      alert("Pembayaran belum siap. Mohon tunggu beberapa detik...");
      return;
    }

    try {
      const res = await fetch("/api/payment/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          gross_amount: grossAmount,
          customer,
        }),
      });

      const data = await res.json();

      if (!data.token) {
        alert("Gagal mendapatkan token pembayaran.");
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: async (result) => {
          alert("Pembayaran berhasil!");
          await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: result.order_id,
              status: result.transaction_status,
              paymentType: result.payment_type,
              transactionTime: result.transaction_time,
              vaNumbers: result.va_numbers || null,
            }),
          });

          window.location.href = `/status?order_id=${result.order_id}`;
        },

        onPending: async (result) => {
          alert("Pembayaran sedang diproses...");
          await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: result.order_id,
              status: result.transaction_status,
              paymentType: result.payment_type,
              transactionTime: result.transaction_time,
              vaNumbers: result.va_numbers || null,
            }),
          });

          window.location.href = `/status?order_id=${result.order_id}`;
        },

        onError: (result) => {
          alert("Terjadi kesalahan saat pembayaran.");
          console.error(result);
        },

        onClose: () => {
          alert("Popup ditutup tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (err) {
      console.error("Midtrans error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="text-center mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
    >
      <Link
        href="/"
        className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali ke Beranda
      </Link>

      <button
        onClick={handlePay}
        disabled={!snapReady}
        className={`inline-flex items-center px-8 py-3 font-semibold rounded-xl transition-all duration-200 shadow-lg transform hover:-translate-y-1
          ${
            snapReady
              ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-xl"
              : "bg-gray-400 text-white cursor-not-allowed"
          }
        `}
      >
        💰 {snapReady ? "Bayar Sekarang" : "Memuat..."}
      </button>
    </motion.div>
  );
}
