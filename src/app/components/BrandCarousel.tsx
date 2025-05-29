"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Builder {
  id: number;
  propertyId: string;
  name: string;
  logo: string;
  // Add other properties you might need
}

export default function BrandCarousel() {
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuilders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:5000/api/builderdetails");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        // Process the data to get unique builders
        const uniqueBuildersMap = new Map<number, Builder>();
        
        data.forEach((item: any) => {
          if (item.id && item.name && item.logo) {
            uniqueBuildersMap.set(item.id, {
              id: item.id,
              propertyId: item.propertyId || '',
              name: item.name,
              logo: item.logo
            });
          }
        });
        
        const uniqueBuilders = Array.from(uniqueBuildersMap.values());
        
        if (uniqueBuilders.length === 0) {
          throw new Error("No valid builders found in the response");
        }
        
        setBuilders(uniqueBuilders);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error fetching builders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilders();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-8 flex-wrap">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="w-[150px] h-[50px] bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
     <div></div>
    );
  }

  if (builders.length === 0) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>No builders available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={Math.min(2, builders.length)}
          breakpoints={{
            640: { slidesPerView: Math.min(3, builders.length) },
            1024: { slidesPerView: Math.min(5, builders.length) },
          }}
          autoplay={{ 
            delay: 2000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          loop={builders.length > 1}
          className="flex items-center"
        >
          {builders.map((builder) => (
            <SwiperSlide key={builder.id} className="flex justify-center items-center h-full">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="opacity-80 hover:opacity-100 h-[50px] flex items-center"
              >
                <div className="relative w-[150px] h-[50px]">
                  <Image
                    src={builder.logo}
                    alt={builder.name}
                    fill
                    className="object-contain"
                    unoptimized={true} // Consider using this if you have issues with external images
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/placeholder-brand.png';
                    }}
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}