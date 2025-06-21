"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCart, removeFromCart, updateQuantity } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [event, setEvent] = useState("");
  const router = useRouter();

  // Fetch semua produk dari API
  const fetchAllProducts = async () => {
    const res = await fetch("/api/product");
    const json = await res.json();
    return json.data;
  };

  useEffect(() => {
    const loadCart = async () => {
      const cartItems = getCart(); // [{ id, quantity }]
      const products = await fetchAllProducts();

      const merged = cartItems
        .map(({ id, quantity }) => {
          const detail = products.find((p) => p.id === id);
          return detail ? { ...detail, qty: quantity } : null;
        })
        .filter(Boolean); // hilangkan null/nullish item

      setCart(merged);
    };

    loadCart();
  }, []);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeItem = (id) => {
    removeFromCart(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!name || !phone || !address || !event) {
      alert("Mohon lengkapi semua data pembeli!");
      return;
    }

    try {
      const orderData = {
        name,
        phone,
        address,
        status: "menunggu",
        event, // format dari datetime-local input
        items: cart.map((item) => ({
          product_id: item.id,
          qty: item.qty,
        })),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Gagal membuat order");

      router.push(`/checkout/${result.id}`);
    } catch (err) {
      alert("Checkout gagal: " + err.message);
    }
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-pink-50">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">
        Keranjang Belanja
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Keranjang kamu kosong 🥹</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-pink-700 font-bold">
                  Rp {item.price.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                🗑
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="pt-4 border-t space-y-4">
            <h2 className="text-xl font-bold text-gray-700">
              Informasi Pembeli
            </h2>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="tel"
                placeholder="Nomor HP"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="text"
                placeholder="Alamat Lengkap"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
              <input
                type="datetime-local"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl font-bold text-pink-700">
                Rp {total.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Checkout Sekarang
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
