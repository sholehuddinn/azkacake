'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const dummyOrder = [
  {
    id: '1',
    nama: 'Brownies Lumer',
    harga: 25000,
    qty: 1,
  },
  {
    id: '2',
    nama: 'Lapis Legit',
    harga: 40000,
    qty: 2,
  },
];

export default function CheckoutPage() {
  const router = useRouter();

  // Form state
  const [form, setForm] = useState({
    nama: '',
    telepon: '',
    alamat: '',
  });

  // Data order (simulasi dari dummy)
  const [order, setOrder] = useState(dummyOrder);

  // Hitung total
  const total = order.reduce((sum, item) => sum + item.harga * item.qty, 0);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.nama || !form.telepon || !form.alamat) {
      alert('Mohon lengkapi semua data!');
      return;
    }

    // Proses order, misal submit ke server...
    console.log('Order dikirim:', { form, order, total });

    alert('Order berhasil dikirim!\nTerima kasih sudah belanja.');

    // Setelah submit bisa diarahkan ke halaman lain, misal home
    router.push('/');
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-pink-50 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-700 mb-8 text-center">
        Checkout
      </h1>

      <section className="bg-white rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Detail Order</h2>
        <ul className="divide-y">
          {order.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>
                {item.nama} x {item.qty}
              </span>
              <span className="font-semibold">
                Rp {(item.harga * item.qty).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg mt-4 border-t pt-3">
          <span>Total:</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </section>

      <section className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Isi Data Pengiriman</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nama" className="block font-medium mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <div>
            <label htmlFor="telepon" className="block font-medium mb-1">
              Nomor Telepon
            </label>
            <input
              type="tel"
              id="telepon"
              name="telepon"
              value={form.telepon}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
              pattern="^\+?\d{9,15}$"
              placeholder="Contoh: +6281234567890"
            />
          </div>

          <div>
            <label htmlFor="alamat" className="block font-medium mb-1">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Kirim Pesanan
          </button>
        </form>
      </section>
    </main>
  );
}
