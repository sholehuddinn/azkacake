'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ActionButtons from '@/components/actionMidtrans';

export default function CheckoutPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data order dari server
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/${id}`);
        
        if (!res.ok) {
          if (res.status === 404) {
            setError('ORDER_NOT_FOUND');
          } else {
            setError('FETCH_ERROR');
          }
          return;
        }

        const data = await res.json();
        
        // Cek apakah data order valid
        if (!data || !data.id) {
          setError('INVALID_ORDER_DATA');
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error('Gagal ambil data order:', err);
        setError('NETWORK_ERROR');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError('INVALID_ORDER_ID');
      setLoading(false);
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
          <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-indigo-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '0.8s'}}></div>
        </div>
      </main>
    );
  }

  // Error states
  if (error) {
    const getErrorMessage = () => {
      switch(error) {
        case 'ORDER_NOT_FOUND':
          return {
            title: 'Order tidak ditemukan',
            message: 'Maaf, pesanan dengan ID tersebut tidak dapat ditemukan. Silakan periksa kembali ID pesanan Anda.',
            bgColor: 'from-red-50 to-orange-100'
          };
        case 'INVALID_ORDER_ID':
          return {
            title: 'ID Order tidak valid',
            message: 'ID pesanan yang Anda masukkan tidak valid. Silakan periksa kembali link pesanan Anda.',
            bgColor: 'from-yellow-50 to-red-100'
          };
        case 'INVALID_ORDER_DATA':
          return {
            title: 'Data order tidak valid',
            message: 'Data pesanan yang ditemukan tidak lengkap atau rusak. Silakan hubungi customer service.',
            bgColor: 'from-orange-50 to-red-100'
          };
        case 'NETWORK_ERROR':
          return {
            title: 'Kesalahan jaringan',
            message: 'Tidak dapat terhubung ke server. Silakan periksa koneksi internet Anda dan coba lagi.',
            bgColor: 'from-purple-50 to-red-100'
          };
        default:
          return {
            title: 'Terjadi kesalahan',
            message: 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi nanti.',
            bgColor: 'from-gray-50 to-red-100'
          };
      }
    };

    const errorInfo = getErrorMessage();

    return (
      <main className={`min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br ${errorInfo.bgColor} px-6`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md"
        >
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{errorInfo.title}</h2>
          <p className="text-gray-600 mb-6">{errorInfo.message}</p>
          
          <div className="space-y-3">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Kembali ke Beranda
            </Link>
            
            {error === 'NETWORK_ERROR' && (
              <button 
                onClick={() => window.location.reload()}
                className="block w-full px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Coba Lagi
              </button>
            )}
          </div>
        </motion.div>
      </main>
    );
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2">
          Pesanan Anda
        </h1>
        <p className="text-gray-700">
          ID Pesanan: 
          <span className="ml-2 font-mono bg-white px-3 py-1 rounded-lg text-blue-600 border border-blue-200 shadow-sm">
            {order.id}
          </span>
        </p>
      </motion.div>

      {/* Detail Produk */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Detail Produk</h2>
        </div>

        <div className="space-y-4">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.product?.name || 'Produk tidak diketahui'}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-md border">
                      Qty: {item.qty || 0}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-800">
                    Rp {((item.product?.price || 0) * (item.qty || 0)).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    @Rp {(item.product?.price || 0).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Tidak ada item dalam pesanan ini</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Pembayaran:</span>
            <span>Rp {(order.gross_amount || 0).toLocaleString()}</span>
          </div>
        </div>
      </motion.section>

      {/* Informasi Pembeli */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-indigo-100"
      >
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Info Pengiriman</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-600 mb-1">Nama Pemesan</p>
              <p className="text-gray-800 font-semibold">{order.name || 'Tidak diketahui'}</p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
              <p className="text-sm font-medium text-indigo-600 mb-1">Nomor Telepon</p>
              <p className="text-gray-800 font-semibold">{order.phone || 'Tidak diketahui'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-600 mb-1">Waktu Acara</p>
              <p className="text-gray-800 font-semibold">
                {order.event ? new Date(order.event).toLocaleString() : 'Tidak diketahui'}
              </p>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-600 mb-1">Status Pesanan</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status || 'unknown')}`}>
                {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-600 mb-2">Alamat Pengiriman</p>
          <p className="text-gray-800 font-semibold leading-relaxed">{order.address || 'Alamat tidak tersedia'}</p>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-8"
      >
        <ActionButtons 
          orderId={order.id}
          grossAmount={order.gross_amount}
          customer={{
            name: order.name,
            email: order.email,
            phone: order.phone
          }}
        />
      </motion.div>
    </main>
  );
}