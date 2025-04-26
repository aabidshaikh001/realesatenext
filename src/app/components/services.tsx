"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Define the service type
type Service = {
  name: string;
  description: string;
  image: string;
  link: string;
};

export default function Services() {
  const [servicesMain, setServicesMain] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.realestatecompany.co.in/api/homepage"); // Replace with your actual API URL
        const data = await res.json();

        const servicesMainData = data.find(
          (item: any) => item.homeComponentName === "servicesmain"
        );

        setServicesMain(servicesMainData?.homeComponenData || []);
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };

    fetchData();
  }, []);
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
          {servicesMain.map((service, index) => (
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
