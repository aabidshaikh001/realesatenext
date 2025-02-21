"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CTAForm } from "../components/cta-form";
import { CheckCircle, Users, BarChart, Briefcase } from "lucide-react";

const SellForAgentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
            Sell For Agent
          </motion.h1>
          <motion.p
            className="text-xl text-white max-w-3xl mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Boost your real estate career with our comprehensive agent support program.
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Empower Your Real Estate Career</h2>
            <p className="text-lg text-gray-600 mb-6">
              As a real estate agent, your success depends on your ability to close deals efficiently. Our Sell For Agent program provides the tools, resources, and support you need to excel in your career.
            </p>

            {/* Feature Cards Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-10 h-10 text-red-600" />}
                title="Exclusive Listings"
                description="Gain access to premium property listings to enhance your portfolio."
              />
              <FeatureCard
                icon={<Users className="w-10 h-10 text-red-600" />}
                title="Advanced CRM & Lead Tools"
                description="Manage and convert leads effectively with cutting-edge technology."
              />
              <FeatureCard
                icon={<BarChart className="w-10 h-10 text-red-600" />}
                title="Marketing Support"
                description="Receive expert marketing materials and promotions for maximum exposure."
              />
              <FeatureCard
                icon={<Briefcase className="w-10 h-10 text-red-600" />}
                title="Professional Development"
                description="Benefit from ongoing training, coaching, and industry networking."
              />
            </div>

            <p className="mt-8 text-lg text-gray-600">
              Our platform is built to enhance your productivity and expand your reach in the real estate market. We provide cutting-edge technology, comprehensive market data, and a supportive community to help you grow your business.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Whether you're a seasoned professional or just starting your real estate career, our Sell For Agent program offers the resources and support you need to take your success to the next level.
            </p>
          </motion.div>

          {/* CTA Form Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CTAForm defaultService="Sell For Agent" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600text-red-600 hover:shadow-lg transition-shadow"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export default SellForAgentPage;
