'use client';

import { motion } from 'framer-motion';
import {
  Instagram,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-pink-50 pt-28 pb-16 px-6">
      <motion.h1
        className="text-4xl font-bold text-center text-pink-700 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hubungi Kami Langsung
      </motion.h1>

      <motion.p
        className="text-center text-gray-600 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Klik salah satu tombol di bawah untuk langsung terhubung dengan Azka Cake 🍰
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/6285731101269" // Ganti dengan nomor admin
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
        >
          <PhoneCall size={20} />
          0857-3110-1269
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/azkacake" // Ganti dengan username IG admin
          target="_blank"
          rel="noopener noreferrer"
          className=" bg-pink-500  hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition"
        >
          <Instagram size={20} />
          Instagram
        </a>

        
      </motion.div>
    </main>
  );
}
