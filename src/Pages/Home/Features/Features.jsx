import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <AlertTriangle size={32} />,
    title: "Report Any Public Issue",
    desc: "Submit problems like potholes, streetlight failure, water leakage, and garbage overflow easily.",
  },
  {
    icon: <MapPin size={32} />,
    title: "Location-Based Reporting",
    desc: "Pin exact issue locations using built-in map support for accurate problem tracking.",
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Track Issue Status",
    desc: "Stay updated with real-time progress from verification to resolution.",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Verified & Secure System",
    desc: "Every report is verified and handled securely to maintain transparency and trust.",
  },
];

const Features = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          Powerful Features for Better Cities
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          Reportify provides a smart, transparent, and easy-to-use platform for reporting and solving public infrastructure problems.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${index === 2 ? "bg-[#115E59]" : "bg-white"} rounded-2xl p-6 shadow-md hover:shadow-xl transition-all`}
            >
              <div className={`${index === 2 ? "text-yellow-300" : "text-[#115E59]"} mb-4`}>{feature.icon}</div>

              <h3 className={`text-xl font-semibold ${index === 2 ? "text-yellow-300" : "text-gray-800"} `}>
                {feature.title}
              </h3>

              <p className={`mt-2  text-sm ${index === 2 ? "text-yellow-400" : "text-gray-600"}`}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
