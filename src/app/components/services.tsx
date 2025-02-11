"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    name: "Exterior",
    description: "Beautiful exteriors for a perfect first impression.",
    image: "https://c1.wallpaperflare.com/preview/520/481/267/exterior-home-walkway-home-exterior.jpg",
    link: "#",
  },
  {
    name: "Interior",
    description: "Luxurious and modern interiors for your dream home.",
    image: "https://m.media-amazon.com/images/I/61LO57+gvqL.jpg",
    link: "#",
  },
  {
    name: "Construction",
    description: "Robust and reliable construction services.",
    image: "https://media.istockphoto.com/id/1041465228/photo/professional-engineer-architect-worker-with-protective-helmet-and-blueprints-paper-at-house.jpg?s=612x612&w=0&k=20&c=e84Qt0pHjgcj8Ncj62G_2U4wAECjwIKRfb05obFQwN0=",
    link: "#",
  },
  {
    name: "Home Loan",
    description: "Get the best deals on home loans with us.",
    image: "https://t3.ftcdn.net/jpg/04/32/16/40/360_F_432164000_CoXNI8lOf3HsNkGftjMyZqZdEun7kMqm.jpg",
    link: "#",
  },
  {
    name: "Home Insurance",
    description: "Comprehensive home insurance for peace of mind.",
    image: "https://w0.peakpx.com/wallpaper/77/619/HD-wallpaper-home-protection-home-insurance-take-care-of-your-house-house-protection-insurance-hands-over-the-house.jpg",
    link: "#",
  },
  {
    name: "Legal Assistance",
    description: "Expert legal assistance for all property matters.",
    image: "https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/04/legal-counsel-presents-to-the-client-a-signed-cont-2023-04-10-22-49-39-utc.jpg",
    link: "#",
  },
];

export default function Services() {
  return (
    <div className="relative min-h-[85vh] bg-gradient-to-br from-red-100 to-purple-100 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto my-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Additional Services
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Service Image */}
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>

              <div className="p-6 text-center">
                {/* Service Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* View Details Button */}
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
    </div>
  );
}
