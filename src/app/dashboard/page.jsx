"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [bg, setBg] = useState("bg-white");

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
  ];

  const handleClick = () => {
    Swal.fire("Success", "Berhasil", "success");
  };

  const changeBg = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    setBg(colors[randomIndex]);
  };

  const [n1, setN1] = useState(0);
  const [n2, setN2] = useState(0);
  const [hasil, setHasil] = useState(0);

  const jumlah = (num1, num2) => {
    return Number(num1) + Number(num2);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah reload
    const hasilJumlah = jumlah(n1, n2);
    setHasil(hasilJumlah);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${bg} flex flex-col justify-center items-center gap-4`}
    >
      <button
        onClick={handleClick}
        className="bg-blue-800 px-6 py-3 rounded text-white text-lg shadow"
      >
        Tampilkan SweetAlert
      </button>

      <button
        onClick={changeBg}
        className="bg-gray-800 px-6 py-3 rounded text-white text-lg shadow"
      >
        Ganti Warna Background
      </button>

      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={n1}
            onChange={(e) => setN1(e.target.value)}
            placeholder="Masukkan angka pertama"
            className="border px-3 py-2"
          />
          <input
            type="number"
            value={n2}
            onChange={(e) => setN2(e.target.value)}
            placeholder="Masukkan angka kedua"
            className="border px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Hitung
          </button>
        </form>

        <div className="mt-4 text-lg">
          Hasil: <strong>{hasil}</strong>
        </div>
      </div>
    </div>
  );
};

export default Page;
