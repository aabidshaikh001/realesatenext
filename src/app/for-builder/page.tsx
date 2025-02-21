"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CTAForm } from "../components/cta-form";
import {  CheckCircle, DollarSign, Users, BarChart } from "lucide-react";
import Link from "next/link";

const SellForBuilderPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-[550px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/bgheader.png"
          alt="Sell For Builder Hero"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            className="text-5xl font-extrabold text-white drop-shadow-md mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Sell Your Properties Faster & Smarter
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-3xl mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Expert solutions for builders to maximize sales, target the right buyers, and close deals efficiently.
          </motion.p>
          <Link href="#get-started" passHref>
            <motion.button
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-red-600/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16" id="get-started">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Builder Sales Solutions?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our proven strategies help builders streamline sales, reach serious buyers, and close deals efficiently.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-red-600" />}
                title="Market Analysis & Pricing"
                description="Accurate insights to help you price and position your projects strategically."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10 text-red-600" />}
                title="Exclusive Buyer Network"
                description="Connect with high-intent investors and buyers."
              />
              <FeatureCard
                icon={<DollarSign className="w-10 h-10 text-red-600" />}
                title="Maximized Sales Revenue"
                description="Expert strategies to maximize conversions and profit."
              />
              <FeatureCard
                icon={<BarChart className="w-10 h-10 text-red-600" />}
                title="Data-Driven Marketing"
                description="Targeted campaigns to position your properties for success."
              />
            </div>

            <p className="mt-8 text-lg text-gray-600">
              Our team helps builders implement seamless sales strategies to drive results and minimize delays.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Let us handle the complexities while you focus on creating exceptional properties.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CTAForm defaultService="Sell For Builder" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-bg-red-600 hover:shadow-lg transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>

);

export default SellForBuilderPage;
