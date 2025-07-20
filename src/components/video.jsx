import React from "react";
import { motion } from "framer-motion";

const Video = () => {

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Selamat Datang di Azka Cake
          </h2>
          <p className="text-blue-200 text-lg">
            Toko roti dan kue terbaik dengan cita rasa yang tak terlupakan
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto group"
        >
          <div className="aspect-video bg-black relative">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/TJV_AXYO528"
              title="Azka Cake Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />


          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: "🍰", title: "Kue Premium", desc: "Dibuat dengan bahan terbaik" },
            { icon: "👨‍🍳", title: "Chef Berpengalaman", desc: "Tim ahli dengan pengalaman 10+ tahun" },
            { icon: "🚚", title: "Pengiriman Cepat", desc: "Diantar fresh ke lokasi Anda" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-blue-200 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;