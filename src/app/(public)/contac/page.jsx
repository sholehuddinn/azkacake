'use client';
import { motion } from 'framer-motion';
import {
  Instagram,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-blue-50 pt-28 pb-16 px-6">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hubungi Azka Cake
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Pesan kue impian Anda sekarang! Klik salah satu tombol di bawah untuk langsung terhubung dengan Azka Cake 🧁
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/6285731101269"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition transform hover:scale-105"
        >
          <PhoneCall size={20} />
          0857-3110-1269
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/azkacake"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition transform hover:scale-105"
        >
          <Instagram size={20} />
          @azkacake
        </a>
      </motion.div>

      {/* Info Tambahan */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Jam Operasional
          </h3>
          <div className="text-gray-600 space-y-2">
            <p>📅 Senin - Minggu</p>
            <p>🕐 08:00 - 20:00 WIB</p>
            <p className="text-sm text-blue-600 mt-4">
              *Pemesanan kue custom minimal H-3 sebelum acara
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}