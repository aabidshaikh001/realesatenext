"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Cities Data
const cities = [
  { name: "Kota, Rajasthan", properties: 0, image: "https://thumbs.dreamstime.com/b/kota-india-city-silhouette-kota-india-city-silhouette-skyline-299457085.jpg" },
  { name: "Pushkar, Rajasthan", properties: 0, image: "https://as2.ftcdn.net/jpg/01/33/87/79/1000_F_133877981_obabYVOBdzCqMC2KKdoshFHVSNrQFhIu.jpg" },
  { name: "Udaipur, Rajasthan", properties: 0, image: "https://i.pinimg.com/736x/a3/d5/b3/a3d5b34b5b0a13eb66edf04fc58c5930.jpg" },
  { name: "Ajmer, Rajasthan", properties: 0, image: "https://d197irk3q85upd.cloudfront.net/catalog/product/cache/04c935854578278320cd759bb5c55f83/y/o/yoshidahiroshi004.jpg" },
  { name: "Ayodhya, Uttar Pradesh", properties: 0, image: "https://i.pinimg.com/736x/84/32/6f/84326f121244e01c4e3dd444bb540c85.jpg" },
  { name: "Bhilwara, Rajasthan", properties: 1, image: "https://www.shutterstock.com/image-vector/map-bhilwara-modern-geometric-illustration-260nw-2339380933.jpg" },
  { name: "Bikaner, Rajasthan", properties: 0, image: "https://i.pinimg.com/736x/8e/fb/25/8efb2511384f32265e3e459966439081.jpg" },
  { name: "Hyderabad, Telangana", properties: 0, image: "https://previews.123rf.com/images/babayuka/babayuka1905/babayuka190500137/123612867-hyderabad-telangana-state-india-charminar-famous-historical-mosque-travel-sketch-vintage-hand.jpg" },
  { name: "Indore, Madhya Pradesh", properties: 1, image: "https://thumbs.dreamstime.com/b/indore-skyline-vector-illustration-linear-style-detailed-silhouette-trendy-64054319.jpg" },
  { name: "Jaipur, Rajasthan", properties: 1, image: "https://media.istockphoto.com/id/485007792/vector/jaipur-skyline-trendy-vector-illustration-linear.jpg?s=612x612&w=0&k=20&c=Ep00vkrpqtIRZJJ4bk5wwjOyStDDDGovMZE_xVz_hTk=" },
  { name: "Jaisalmer, Rajasthan", properties: 0, image: "https://st2.depositphotos.com/5504648/9793/v/380/depositphotos_97937448-stock-illustration-jaisalmer-rajasthan-india.jpg" },
];

export default function ExploreCities() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Explore Cities
        </h2>
        <p className="text-lg text-center text-gray-600 mb-10">
          Our Locations For You
        </p>

        {/* Swiper Carousel */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },  // For tablets or small screens
              1024: { slidesPerView: 3 }, // For medium screens
              1280: { slidesPerView: 4 }, // For large screens (4 cities at a time)
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            className="flex items-center"
          >
            {cities.map((city, index) => (
              <SwiperSlide key={city.name} className="group cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
                  }}
                  className="relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
                >
                  {/* City Image with Hover Effect */}
                  <motion.div
                    className="relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={city.image}
                      alt={city.name}
                      width={400}
                      height={250}
                      className="w-full h-96 object-cover transition-all duration-300 rounded-2xl"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </motion.div>

                  {/* Overlay Text */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4">
                    <p className="text-white text-sm opacity-90">
                      {city.properties} {city.properties === 1 ? "Property" : "Properties"}
                    </p>
                  </div>

                  {/* Hover Effect on City Name */}
                  <motion.div
                    whileHover={{
                      backgroundColor: "#ff4757",
                      color: "white",
                      scale: 1.05,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 left-4 right-4 bg-white text-gray-800 text-center text-lg font-semibold p-3 rounded-xl shadow-md transition-all duration-300"
                  >
                    {city.name}
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md text-red-600">
            <ChevronLeft className="h-6 w-6 text-gray-800 " />
          </button>
          <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </div>
    </section>
  );
}
