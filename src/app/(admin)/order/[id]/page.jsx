'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  DollarSign,
  Package,
  User,
  Eye,
  Edit
} from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/order/${id}`);
      if (!res.ok) throw new Error('Failed to fetch order detail');
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
      case 'diproses':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
      case 'selesai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
      case 'dibatalkan':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      case 'menunggu':
        return 'Menunggu';
      default:
        return status || 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetail();
    }
  }, [id]);

  const [eventTime, setEventTime] = useState("");

  useEffect(() => {
    if (order?.event) {
      setEventTime(new Date(order.event).toLocaleString());
    }
  }, [order]);


  if (loading) {
    return (
      <main className="min-h-screen bg-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat detail pesanan...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-600 bg-red-50 p-4 rounded-lg">
              <p className="font-semibold">Error: {error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-500">Pesanan tidak ditemukan</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link 
                  href="/order" 
                  className="hover:bg-blue-500 p-2 rounded-lg transition"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Link>
                <Eye className="h-8 w-8" />
                <div>
                  <h1 className="text-3xl font-bold">Detail Pesanan</h1>
                  <p className="text-blue-100 mt-1">ID: {order.id}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Pelanggan
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nama</label>
                  <p className="text-gray-900 font-medium">{order.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nomor Telepon</label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    {order.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Alamat</label>
                  <p className="text-gray-900 font-medium flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    {order.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                Item Pesanan
              </h2>
              <div className="space-y-4">
                {Array.isArray(order.items) && order.items.map((item) => (
                  <div key={item.id} className="border border-blue-100 rounded-lg p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={`/image/${item.product.image}`} 
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">Qty: {item.qty}</span>
                            <span className="text-sm font-medium text-blue-600">
                              Rp {item.product.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-blue-600">
                            Rp {(item.product.price * item.qty).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Info Pesanan
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal Pesanan</label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tanggal Acara</label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Waktu Acara:</span> {eventTime || "..."}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Terakhir Diupdate</label>
                  <p className="text-gray-900 font-medium">
                    {formatDate(order.updated_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Ringkasan Pembayaran
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp {order.gross_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Item</span>
                  <span className="font-medium">{order.items.length} item</span>
                </div>
                <hr className="border-blue-100" />
                <div className="flex justify-between text-lg font-bold text-blue-600">
                  <span>Total</span>
                  <span>Rp {order.gross_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}