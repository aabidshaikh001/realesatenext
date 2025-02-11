"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSmile, FaTrophy, FaHandshake, FaChartLine } from "react-icons/fa";

const stats = [
  { value: 85, label: "Satisfied Clients", icon: FaSmile },
  { value: 112, label: "Awards Received", icon: FaTrophy },
  { value: 32, label: "Successful Transactions", icon: FaHandshake },
  { value: 66, label: "Monthly Traffic", icon: FaChartLine },
];

export default function StatsCounter() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-500 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative p-6 bg-white/10 rounded-xl shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Icon in Bottom-Right with Larger Size */}
              <motion.div
                className="absolute bottom-1 right-4 text-white/30"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
              >
                <stat.icon className="h-16 w-16" />
              </motion.div>

              {/* Animated Counter */}
              <AnimatedCounter targetNumber={stat.value} />

              {/* Label */}
              <p className="text-lg font-medium mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ✅ Number Animation Component
function AnimatedCounter({ targetNumber }: { targetNumber: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // Animation duration in milliseconds
    const interval = 30; // Interval between number updates
    const steps = duration / interval;
    const increment = targetNumber / steps;

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        clearInterval(counter);
        setCount(targetNumber);
      } else {
        setCount(Math.floor(start));
      }
    }, interval);

    return () => clearInterval(counter);
  }, [targetNumber]);

  return (
    <motion.p
      className="text-4xl font-extrabold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {count}
    </motion.p>
  );
}
