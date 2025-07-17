import React from "react";
import { motion } from "framer-motion";

const Video = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Selamat Datang di Azka Cake
          </h2>
          <p className="text-blue-200 text-lg">
            Toko roti dan kue terbaik dengan cita rasa yang tak terlupakan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2">
                Video Pengenalan Azka Cake
              </h3>
              <p className="text-blue-200 mb-6">
                Temukan cerita di balik kelezatan kue-kue kami
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                ▶ Putar Video
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;
