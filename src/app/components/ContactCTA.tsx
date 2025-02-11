"use client"

import { motion } from "framer-motion"

export default function ContactCTA() {
  return (
    <section className="py-16 bg-red-600">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8">Our expert team is here to help you every step of the way.</p>
          <button className="bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Contact Us Today
          </button>
        </motion.div>
      </div>
    </section>
  )
}

