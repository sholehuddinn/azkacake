import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";

const contacts = () => {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Hubungi Kami</h2>
          <p className="text-blue-200">Siap melayani pesanan Anda kapan saja</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-white"
          >
            <Phone className="mx-auto mb-4 text-blue-300" size={48} />
            <h3 className="font-bold mb-2">Telepon</h3>
            <p className="text-blue-200">+62 812-3456-7890</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-white"
          >
            <MapPin className="mx-auto mb-4 text-blue-300" size={48} />
            <h3 className="font-bold mb-2">Alamat</h3>
            <p className="text-blue-200">Jl. Mawar No. 123, Surabaya</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-white"
          >
            <Clock className="mx-auto mb-4 text-blue-300" size={48} />
            <h3 className="font-bold mb-2">Jam Buka</h3>
            <p className="text-blue-200">08:00 - 21:00 WIB</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default contacts;
