"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function ProductCrudPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category_id: "",
    image: "",
    price: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/product", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      setProducts(json.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const method = "PUT";
    const url = `/api/product/${editId}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          category_id: form.category_id,
          image: form.image,
          price: parseInt(form.price),
        }),
      });

      if (res.ok) {
        setForm({
          name: "",
          description: "",
          category_id: "",
          image: "",
          price: "",
        });
        setEditId(null);
        fetchProducts();
      } 
    } catch (error) {
      Swal.fire("Error", error.message, "error")
    } finally {
      Swal.fire("Success", "Data berhasil di ubah", "success")
      fetchProducts();
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      category_id: item.category_id,
      image: item.image,
      price: item.price.toString(),
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetch(`/api/product/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          await Swal.fire("Deleted!", "Produk berhasil dihapus.", "success");
          fetchProducts();
        } else {
          const err = await res.json();
          Swal.fire("Gagal", err?.error || "Gagal menghapus produk", "error");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Terjadi kesalahan saat menghapus produk.", "error");
      } finally {
        setLoading(false);
      }
    }
  };


  const handleCancel = () => {
    setForm({
      name: "",
      description: "",
      category_id: "",
      image: "",
      price: "",
    });
    setEditId(null);
  };

  return (
    <main className="min-h-screen bg-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center gap-3">
            <Package className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Manajemen Produk</h1>
              <p className="text-blue-100 mt-1">Kelola koleksi kue Azka Cake 🧁</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Form */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5" />
                <Link
                  href="/product/add"
                >
                  Tambah Produk Kue Baru
                </Link>
            </h2>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama Kue (contoh: Red Velvet Cake)"
                className="border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Harga (Rp)"
                className="border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
              <input
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                placeholder="ID Kategori"
                className="border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="URL Gambar Kue"
                className="border border-blue-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Deskripsi kue (bahan, rasa, ukuran, dll)"
                className="border border-blue-200 px-4 py-3 rounded-lg col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                rows={3}
                required
              />
              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Edit
                </button>
                {editId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h3 className="text-lg font-semibold">Daftar Produk Kue</h3>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Memuat data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-blue-50 text-blue-700">
                    <tr>
                      <th className="p-4 font-semibold">Gambar</th>
                      <th className="p-4 font-semibold">Nama Kue</th>
                      <th className="p-4 font-semibold">Deskripsi</th>
                      <th className="p-4 font-semibold">Harga</th>
                      <th className="p-4 font-semibold">Kategori</th>
                      <th className="p-4 font-semibold">Pemilik</th>
                      <th className="p-4 font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100">
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-gray-500">
                          Belum ada produk kue. Tambahkan produk pertama Anda!
                        </td>
                      </tr>
                    ) : (
                      products.map((p) => (
                        <tr key={p.id} className="hover:bg-blue-50 transition">
                          <td className="p-4">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-16 h-16 object-cover rounded-lg border-2 border-blue-200"
                            />
                          </td>
                          <td className="p-4 font-medium text-gray-900">{p.name}</td>
                          <td className="p-4 text-gray-600 max-w-xs truncate">{p.description}</td>
                          <td className="p-4 font-semibold text-blue-600">Rp {p.price?.toLocaleString()}</td>
                          <td className="p-4 text-gray-600">{p.category?.name || "-"}</td>
                          <td className="p-4 text-gray-600">{p.user?.username || "-"}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(p)}
                                className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition flex items-center gap-1"
                                title="Edit produk"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition flex items-center gap-1"
                                title="Hapus produk"
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
      </div>
    </main>
  );
}