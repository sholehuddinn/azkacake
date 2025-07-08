"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        Swal.fire('Gagal', 'Registrasi gagal', 'error');
        return;
      }

      Swal.fire('Berhasil', "Registrasi berhasil! Silakan login", 'success');
      router.push("/login");
    } catch (err) {
      setError("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Daftar Akun
          </h1>
          <p className="text-blue-500 text-sm font-medium">
            Azka Cake 🧁
          </p>
        </div>
        
        <p className="text-center text-gray-500 text-sm">
          Isi data untuk membuat akun baru dan mulai pesan kue impian Anda
        </p>

        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
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
            Daftar Sekarang
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Masuk di sini
          </Link>
        </p>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Dengan mendaftar, Anda setuju dengan syarat dan ketentuan kami
          </p>
        </div>
      </div>
    </main>
  );
}