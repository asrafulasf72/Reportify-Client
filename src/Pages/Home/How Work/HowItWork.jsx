import React from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, CheckCircle2, UserCheck } from "lucide-react";

const steps = [
  {
    icon: <Camera size={34} />,
    title: "Capture & Report",
    desc: "Take a photo and describe the issue potholes, broken lights, leakage, garbage overflow.",
  },
  {
    icon: <MapPin size={34} />,
    title: "Mark Location",
    desc: "Pin the exact location so concerned authorities can quickly identify the problem area.",
  },
  {
    icon: <UserCheck size={34} />,
    title: "Verification",
    desc: "Admins and municipal staff verify the report and assign it to the responsible team.",
  },
  {
    icon: <CheckCircle2 size={34} />,
    title: "Resolution & Update",
    desc: "Track progress until the issue is fixed, and the system updates the status in real-time.",
  },
];

const HowItWork = () => {
  return (
    <section className="py-16 px-6 bg-teal-100">
      <div className="max-w-6xl mx-auto text-center">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto text-[1rem]"
        >
          A simple and transparent process that helps citizens and authorities resolve issues faster.
        </motion.p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-16">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-[#115E59]/10 text-[#115E59]">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-semibold text-black">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-[1rem]">
                {step.desc}
              </p>

              {/* Step Number */}
              <div className="mt-4 text-lg font-bold text-[#115E59]">
                Step {index + 1}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWork;
