"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import Image from "next/image";

const brandLogos = [
  { name: "Tyaalpha", image: "/images/brand1.png" },
  { name: "PANADOXN", image: "/images/brand2.png" },
  { name: "Shangxi", image: "/images/brand3.png" },
  { name: "Vanfaba", image: "/images/brand4.png" },
  { name: "LH.Tech", image: "/images/brand5.png" },
 
  { name: "Vanfaba", image: "/images/brand6.png" },
  { name: "LH.Tech", image: "/images/brand7.png" },
  { name: "LH.Tech", image: "/images/brand8.png" },
  { name: "LH.Tech", image: "/images/brand9.png" },
  { name: "LH.Tech", image: "/images/brand10.png" },


];

export default function BrandCarousel() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          className="flex items-center"
        >
          {brandLogos.map((brand, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
                transition={{ duration: 0.3 }}
                className="grayscale opacity-80 hover:opacity-100"
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={150}
                  height={50}
                  className="object-contain"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
