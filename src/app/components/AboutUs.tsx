"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="About LuxeRealty"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">About LuxeRealty</h2>
            <p className="text-gray-600 mb-6">
              At LuxeRealty, we are passionate about connecting discerning clients with extraordinary properties. With
              years of experience in the luxury real estate market, our team of expert agents is dedicated to providing
              unparalleled service and expertise.
            </p>
            <p className="text-gray-600 mb-6">
              We understand that each property is unique, and every client has specific needs. That's why we take a
              personalized approach to every transaction, ensuring that we exceed expectations at every step of the
              process.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

