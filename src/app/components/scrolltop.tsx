"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollY / documentHeight) * 100;

      setScrollProgress(progress);
      setVisible(scrollY > 100); // Show button after 100px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className={`fixed bottom-6 right-6 w-14 z-50 h-14 flex items-center justify-center bg-white rounded-full shadow-lg cursor-pointer ${
        visible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 40">
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <motion.circle
          className="text-red-500"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
          strokeDasharray="113"
          strokeDashoffset={`${113 - (scrollProgress / 100) * 113}`}
          transition={{ ease: "easeOut" }}
        />
      </svg>
      <FaArrowUp className="text-red-500 text-lg" />
    </motion.div>
  );
};

export default ScrollToTopButton;
