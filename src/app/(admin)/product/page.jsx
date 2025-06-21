"use client";

import { useEffect, useState } from "react";

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
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchProducts = async () => {
    const res = await fetch("/api/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    setProducts(json.data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/product/${editId}` : "/api/product";

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
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    await fetch(`/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-pink-600 mb-6">Manajemen Produk</h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mb-8">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Produk"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            placeholder="ID Kategori"
            className="border px-4 py-2 rounded"
            required
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL Gambar"
            className="border px-4 py-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="border px-4 py-2 rounded col-span-2"
            rows={3}
            required
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded col-span-2"
          >
            {editId ? "Update Produk" : "Tambah Produk"}
          </button>
        </form>

        <table className="w-full text-sm text-left border-t">
          <thead>
            <tr className="text-gray-600 bg-pink-50">
              <th className="p-2">Gambar</th>
              <th>Nama</th>
              <th>Deskripsi</th>
              <th>Harga</th>
              <th>Kategori</th>
              <th>Pemilik</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>Rp {p.price.toLocaleString()}</td>
                <td>{p.category?.name || "-"}</td>
                <td>{p.user?.username || "-"}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
