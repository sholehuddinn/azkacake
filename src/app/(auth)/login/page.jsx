"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Login gagal");
        return;
      }

      // Note: Using localStorage for demo purposes only
      // In production, consider using secure HTTP-only cookies
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", result.token);
      }
      
      Swal.fire("Berhasil", "Login berhasil", "success");
      router.push("/admin");
    } catch (err) {
      setError("Terjadi kesalahan saat login.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Selamat Datang 👋
          </h1>
          <p className="text-blue-500 text-sm font-medium">
            Azka Cake 🧁
          </p>
        </div>
        
        <p className="text-center text-gray-500 text-sm">
          Masuk untuk mengelola pesanan kue Anda
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-center text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
          
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Daftar di sini
          </Link>
        </p>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Admin? Masuk untuk mengelola toko kue Anda
          </p>
        </div>
      </div>
    </main>
  );
}