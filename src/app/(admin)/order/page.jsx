'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, ShoppingCart, Phone, MapPin, DollarSign, Clock } from 'lucide-react';

export default function ListOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/order');
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Yakin ingin menghapus pesanan kue ini?');
    if (!confirm) return;

    try {
      await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'Menunggu';
      case 'processing':
        return 'Diproses';
      case 'completed':
        return 'Selesai';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status || 'Unknown';
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Memuat pesanan...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="text-red-600 bg-red-50 p-4 rounded-lg">
                <p className="font-semibold">Error: {error}</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 text-blue-700">
                  <tr>
                    <th className="px-4 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Pelanggan
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Alamat
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Total
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Status
                      </div>
                    </th>
                    <th className="px-4 py-4 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-3">
                          <ShoppingCart className="h-12 w-12 text-gray-300" />
                          <p className="text-lg font-medium">Belum ada pesanan</p>
                          <p className="text-sm">Pesanan pertama akan muncul di sini</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o.id} className="hover:bg-blue-50 transition">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{o.name}</div>
                            <div className="text-blue-600 text-sm flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {o.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-gray-600 max-w-xs truncate">
                            {o.address}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-semibold text-blue-600">
                            Rp {o.gross_amount?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(o.status)}`}>
                            {getStatusText(o.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <Link 
                              href={`/order/${o.id}`} 
                              className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition flex items-center gap-1"
                              title="Edit pesanan"
                            >
                              <Edit className="h-4 w-4" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(o.id)} 
                              className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition flex items-center gap-1"
                              title="Hapus pesanan"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
      </div>
    </main>
  );
}