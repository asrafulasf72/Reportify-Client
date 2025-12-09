import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, Users, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: <Clock size={34} />,
    title: "Faster Response",
    desc: "Your reports are instantly delivered to the concerned authority for quicker action.",
  },
  {
    icon: <Shield size={34} />,
    title: "Full Transparency",
    desc: "Track issue status at every stage without delays or hidden processes.",
  },
  {
    icon: <Users size={34} />,
    title: "Community-Driven",
    desc: "Engage citizens and help develop cleaner, safer, and more modern cities.",
  },
  {
    icon: <Sparkles size={34} />,
    title: "Simple & Smart UI",
    desc: "A clear and easy-to-use platform designed for all types of users.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-20 px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          Why Choose Reportify?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 text-gray-600 max-w-xl mx-auto"
        >
          Trusted by communities to report issues with reliability and transparency.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {benefits.map((b, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="text-[#115E59] mb-3">{b.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{b.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
