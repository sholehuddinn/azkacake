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
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          price: parseInt(form.price),
          category_id: form.category_id,
          image: form.image,
          description: form.description,
        }),
      });

      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Produk berhasil ditambahkan.',
        });
        router.push('/products'); // redirect ke list produk
      } else {
        const err = await res.json();
        Swal.fire('Gagal', err?.error || 'Gagal menambahkan produk.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Terjadi kesalahan saat menyimpan.', 'error');
    } finally {
      Swal.fire("Success", "Berhasil Menambahkan produk", "success")
      router.push("/product")
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Tambah Produk Kue</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Kue"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga (Rp)"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            placeholder="ID Kategori"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL Gambar"
            required
            className="w-full border px-4 py-2 rounded-lg"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            rows={3}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
            </button>
            <Link
              href="/product"
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              Kembali
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
