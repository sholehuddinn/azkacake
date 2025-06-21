'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListOrder() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch('/api/order');
    const data = await res.json();
    setOrders(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus order ini?');
    if (!confirm) return;

    await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });

    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Order</h1>
      <Link href="/orders/create" className="bg-blue-600 text-white px-4 py-2 rounded">
        + Tambah Order
      </Link>

      <table className="w-full mt-4 border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Nama</th>
            <th className="border px-2 py-1">Telepon</th>
            <th className="border px-2 py-1">Alamat</th>
            <th className="border px-2 py-1">Jumlah</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border px-2 py-1">{o.name}</td>
              <td className="border px-2 py-1">{o.phone}</td>
              <td className="border px-2 py-1">{o.address}</td>
              <td className="border px-2 py-1">{o.gross_amount}</td>
              <td className="border px-2 py-1">{o.status}</td>
              <td className="border px-2 py-1">
                <Link href={`/orders/edit/${o.id}`} className="text-blue-600 mr-2">Edit</Link>
                <button onClick={() => handleDelete(o.id)} className="text-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
