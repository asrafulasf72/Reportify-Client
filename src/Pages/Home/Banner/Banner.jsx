import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://www.azobuild.com/images/Article_Images/ImageForArticle_8709_17316125350945732.jpg", // Replace
    title: "Report Public Issues Instantly",
    subTitle:
      "Quickly report potholes, broken streetlights, water leakage & more — let authorities respond faster.",
  },
  {
    id: 2,
    image: "https://img.freepik.com/premium-photo/old-broken-street-lamp_415641-436.jpg", // Replace
    title: "Track Issue Status in Real-Time",
    subTitle:
      "Stay updated with live progress from verification to resolution through transparent tracking.",
  },
  {
    id: 3,
    image: "https://assetperformance.eu/wp-content/uploads/2023/08/Watergroep-installatie-leksensoren_135_high-1024x683.jpg", // Replace
    title: "Build Cleaner & Safer Cities",
    subTitle:
      "Reportify empowers citizens and authorities to collaborate for a better community.",
  },
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">

      <AnimatePresence>
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 "></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center text-white px-6"
                  >
                    <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-xl">
                      {slide.title}
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto drop-shadow">
                      {slide.subTitle}
                    </p>

                    <button className="mt-8 bg-yellow-400 text-[#115E59] px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-all shadow-lg">
                      Report an Issue
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === current ? "bg-yellow-400 w-6" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
