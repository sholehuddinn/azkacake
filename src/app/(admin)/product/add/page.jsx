'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

export default function CreateProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    price: '',
    category_id: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!imageFile) {
      Swal.fire('Error', 'Gambar belum dipilih.', 'error');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category_id', form.category_id);
    formData.append('description', form.description);
    formData.append('image', imageFile);

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Produk berhasil ditambahkan.',
        });
        router.push('/product');
      } else {
        const err = await res.json();
        Swal.fire('Gagal', err?.error || 'Gagal menambahkan produk.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Terjadi kesalahan saat menyimpan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-4 text-center">Tambah Produk Kue 🍰</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nama Kue</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh: Brownies Lumer"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Harga</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Contoh: 25000"
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Kategori</label>
            <select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none transition"
            >
              <option value="">-- Pilih Kategori --</option>
              <option value="1">Cake</option>
              <option value="2">Jajan</option>
              <option value="3">Brownies</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Gambar</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full border px-4 py-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ceritakan tentang produk ini..."
              rows={4}
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div className="flex gap-3 justify-between pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
            <Link
              href="/product"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
            >
              Kembali
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
