'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Simulasi data produk berdasarkan ID
const produkList = [
  {
    id: '1',
    nama: 'Brownies Lumer',
    gambar: '/brownies.jpg',
    deskripsi: 'Brownies lembut dengan cokelat lumer di dalamnya. Cocok untuk semua usia dan acara!',
    harga: '25.000',
  },
  {
    id: '2',
    nama: 'Lapis Legit',
    gambar: '/lapis-legit.jpg',
    deskripsi: 'Kue lapis legit dengan aroma rempah klasik dan tekstur padat.',
    harga: '40.000',
  },
  {
    id: '3',
    nama: 'Cheese Cake',
    gambar: '/cheese-cake.jpg',
    deskripsi: 'Cheesecake lembut dengan topping stroberi segar.',
    harga: '35.000',
  },
];

export default function ProdukDetailPage() {
  const { id } = useParams();
  const produk = produkList.find((item) => item.id === id);

  if (!produk) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Produk dengan ID {id} tidak ditemukan.
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
          <Image
            src={produk.gambar}
            alt={produk.nama}
            width={500}
            height={400}
            className="rounded-lg w-full object-cover h-64 md:h-auto"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-pink-700">{produk.nama}</h1>
          <p className="text-gray-700">{produk.deskripsi}</p>
          <p className="text-xl font-semibold text-pink-600">Rp {produk.harga}</p>

          <a
            href={`https://wa.me/6281234567890?text=Halo%20saya%20ingin%20memesan%20${encodeURIComponent(
              produk.nama
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-lg mt-4 transition"
          >
            Pesan Sekarang
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
