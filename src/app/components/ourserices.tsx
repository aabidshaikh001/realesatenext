"use client";

import { motion } from "framer-motion";
import {  ArrowRight } from "lucide-react";
import Image from "next/image";


const services = [
  {
    title: "Buy A New Home",
    description:
      "Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.",
    image: "https://w0.peakpx.com/wallpaper/825/329/HD-wallpaper-house-in-hand-real-estate-concepts-buying-a-home-choosing-a-house.jpg",
    link: "/buy-a-new-home",
  },
  {
    title: "Rent a Home",
    description:
      "Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.",
    image: "https://media.istockphoto.com/id/149060607/photo/for-rent-sign-in-front-of-new-house.jpg?s=612x612&w=0&k=20&c=By627yICPZugFR1j2_a_7MCEn1f5ltYlivg6Tv50JaQ=",
    link: "/rent-a-home",
  },
  {
    title: "Sell a Home",
    description:
      "Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230707/pngtree-real-estate-investment-concept-estate-agent-handing-over-keys-to-homebuyer-image_3765710.jpg",
    link: "/sell-a-home",
  },
];

export default function OurServices() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-lg text-gray-600 mt-2">What We Do?</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
            >
              {/* Service Image */}
              <div className="relative w-full h-52">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
              </div>

              <div className="p-6 text-center">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4">{service.description}</p>

                {/* Learn More Button */}
                <motion.a
                  href={service.link}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center gap-2 text-red-600 font-medium hover:text-red-700 transition-all duration-300"
                >
                  View Details <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
