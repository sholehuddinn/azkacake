import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="text-2xl">🎂</div>
          <h3 className="text-xl font-bold">Azka Cake</h3>
        </div>
        <p className="text-blue-200 mb-4">
          Memberikan kelezatan terbaik untuk setiap momen spesial Anda
        </p>
        <p className="text-blue-300 text-sm">
          © 2025 Azka Cake. Semua hak dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
