"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CTAForm } from '../components/cta-form'
import { ArrowRight, CheckCircle, DollarSign, Users } from 'lucide-react'
import Link from "next/link";

const SellForOwnerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
     
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-center max-w-4xl px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6">Sell Your Property with Confidence</h1>
            <p className="text-xl text-white mb-8">Maximize the value of your property with our expert selling services</p>
            <Link href="#get-started" passHref>
            <motion.button
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16" id='get-started'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Our Sell For Owner Service?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CheckCircle className="w-8 h-8 text-red-600" />}
                title="Professional Valuation"
                description="Get an accurate assessment of your property's worth in the current market."
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-red-600" />}
                title="Wide Buyer Network"
                description="Access our extensive network of qualified potential buyers."
              />
              <FeatureCard
                icon={<DollarSign className="w-8 h-8 text-red-600" />}
                title="Maximize Sale Price"
                description="Our expert negotiation support helps you get the best deal possible."
              />
              <FeatureCard
                icon={<ArrowRight className="w-8 h-8 text-red-600" />}
                title="Streamlined Process"
                description="We guide you through every step, from listing to closing the deal."
              />
            </div>
            <p className="mt-8 text-lg text-gray-600">
              Our team of experienced real estate professionals understands the local market trends and buyer preferences. We'll work tirelessly to showcase your property's unique features and attract qualified buyers.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              From setting the right price to closing the deal, we're committed to making your property sale a smooth and profitable experience. Let us handle the complexities while you focus on your next move.
            </p>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CTAForm defaultService="Sell For Owner" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}  
const FeatureCard : React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-md"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

export default SellForOwnerPage
