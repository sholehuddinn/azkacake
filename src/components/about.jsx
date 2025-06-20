import React from "react";
import { motion } from "framer-motion";
import { Users, Star } from "lucide-react";

const about = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              Tentang Azka Cake
            </h2>
            <p className="text-gray-600 mb-6">
              Azka Cake telah melayani pelanggan dengan kue dan roti berkualitas
              tinggi selama bertahun-tahun. Kami berkomitmen untuk memberikan
              produk terbaik dengan bahan-bahan pilihan dan resep rahasia
              keluarga.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users className="text-blue-600 mx-auto mb-2" size={32} />
                <div className="font-bold text-blue-800">1000+</div>
                <div className="text-sm text-gray-600">Pelanggan Puas</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Star className="text-blue-600 mx-auto mb-2" size={32} />
                <div className="font-bold text-blue-800">4.9</div>
                <div className="text-sm text-gray-600">Rating Bintang</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 rounded-2xl flex items-center justify-center text-8xl">
              🏪
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default about;
