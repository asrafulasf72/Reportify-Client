import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Users, Layers } from "lucide-react";

const stats = [
  {
    icon: <MapPin size={34} />,
    number: "12,450+",
    label: "Issues Reported",
  },
  {
    icon: <CheckCircle size={34} />,
    number: "10,980+",
    label: "Issues Resolved",
  },
  {
    icon: <Users size={34} />,
    number: "5,000+",
    label: "Active Citizens",
  },
  {
    icon: <Layers size={34} />,
    number: "32",
    label: "Municipal Zones Supported",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          Our Impact
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 text-gray-600 max-w-xl mx-auto"
        >
          Reportify is already making cities cleaner, safer, and more efficient.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">
          {stats.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#115E59]/10 text-[#115E59]">
                {s.icon}
              </div>

              <h3 className="mt-5 text-3xl font-bold text-gray-800">{s.number}</h3>
              <p className="mt-1 text-gray-600 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
