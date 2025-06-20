'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const produkList = [
  {
    nama: 'Brownies Lumer',
    gambar: '/brownies.jpg',
    deskripsi: 'Brownies dengan cokelat meleleh, lembut dan manis.',
    harga: '25.000',
  },
  {
    nama: 'Kue Lapis Legit',
    gambar: '/lapis-legit.jpg',
    deskripsi: 'Lapis legit dengan aroma rempah khas dan tekstur padat.',
    harga: '40.000',
  },
  {
    nama: 'Cupcake Cokelat',
    gambar: '/cupcake.jpg',
    deskripsi: 'Cupcake mini cokelat, cocok untuk snack atau hampers.',
    harga: '12.000',
  },
  {
    nama: 'Bolu Kukus Pelangi',
    gambar: '/bolu-pelangi.jpg',
    deskripsi: 'Bolu kukus warna-warni dengan rasa lembut dan ceria.',
    harga: '18.000',
  },
];

export default function KatalogPage() {
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
            <Image
              src={produk.gambar}
              alt={produk.nama}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-52 mb-4"
            />
            <h2 className="text-xl font-semibold text-pink-700">{produk.nama}</h2>
            <p className="text-sm text-gray-600 my-2">{produk.deskripsi}</p>
            <p className="text-lg font-bold text-pink-600">Rp {produk.harga}</p>
            <button className="mt-3 w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition">
              Pesan Sekarang
            </button>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
