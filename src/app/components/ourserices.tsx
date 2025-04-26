"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

type ServiceType = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function OurServices() {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://api.realestatecompany.co.in/api/homepage");
        const data = await response.json();

        const servicesSection = data.find(
          (item: any) => item.homeComponentName === "services"
        );

        if (servicesSection && Array.isArray(servicesSection.homeComponenData)) {
          setServices(servicesSection.homeComponenData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">Loading services...</div>
    );
  }

  if (!services.length) {
    return (
      <div className="py-16 text-center text-red-500">
        No service data available.
      </div>
    );
  }
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
