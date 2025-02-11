'use client'

import { motion } from 'framer-motion';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from "next/navigation";

const properties = [
  {
    id: 1,
    title: 'Aditya Villa',
    price: '\u20B950 Lac onwards',
    image: 'https://media.istockphoto.com/id/483773209/photo/new-cozy-cottage.jpg?b=1&s=612x612&w=0&k=20&c=rssdUJmafDvwS7drFg6Cr9j4Yuvbx4OUkkFUJWdKwos=',
    location: 'Jagatpura, Jaipur',
    bhk: '3 BHK Villas',
    marketedBy: 'Shubham Group',
    companyLogo: 'https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png',
  },
  {
    id: 2,
    title: 'Ruheen Shree',
    price: '\u20B983.6 Lac onwards',
    image: 'https://st2.depositphotos.com/4489556/8875/i/950/depositphotos_88751000-stock-photo-suburban-house-with-double-garage.jpg',
    location: 'Jagatpura, Jaipur',
    bhk: '3 BHK Flats',
    marketedBy: 'Ruheen Developers And Properties LLP',
    companyLogo: 'https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png',
  },
  {
    id: 3,
    title: 'Luxury Heights',
    price: '\u20B9120 Lac onwards',
    image: 'https://st2.depositphotos.com/1015412/8130/i/950/depositphotos_81300946-stock-photo-open-garage-door-in-suburban.jpg',
    location: 'Mumbai, India',
    bhk: '4 BHK Penthouses',
    marketedBy: 'Luxury Developers',
    companyLogo: 'https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png',
  },
  {
    id: 3,
    title: 'Luxury Heights',
    price: '\u20B9120 Lac onwards',
    image: 'https://c0.wallpaperflare.com/preview/329/616/930/various-home-house-houses.jpg',
    location: 'Mumbai, India',
    bhk: '4 BHK Penthouses',
    marketedBy: 'Luxury Developers',
    companyLogo: 'https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png',
  },
  {
    id: 3,
    title: 'Luxury Heights',
    price: '\u20B9120 Lac onwards',
    image: 'https://cdn.wallpapersafari.com/4/25/cJ6kK8.jpg',
    location: 'Mumbai, India',
    bhk: '4 BHK Penthouses',
    marketedBy: 'Luxury Developers',
    companyLogo: 'https://sai-infratech.com/wp-content/uploads/2019/10/Sai-InfraTech-Logo.png',
  },
];

export default function FeaturedPropertiesSale() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-yellow-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Featured Properties For Sale
        </motion.h2>

        <div className="relative overflow-hidden">
        <div className="flex space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }} ref={scrollRef}>            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg min-w-[320px]"
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  width={600}
                  height={400}
                  className="w-full h-56 object-cover"

                />
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <Image
                      src={property.companyLogo}
                      alt={property.marketedBy}
                      width={40}
                      height={40}
                      className="w-10 h-10 mr-3 rounded-full"
                    />
                    <p className="text-sm text-gray-600">{property.marketedBy}</p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <p className="text-gray-700 text-sm">{property.location}</p>
                  <p className="text-gray-700 text-sm font-medium mt-1">{property.bhk}</p>
                  <p className="text-red-600 font-semibold mt-2">{property.price}</p>
                  <div className="mt-4 flex justify-between items-center">
                   
                  <Link href={`/properties/${property.id}`} passHref>
      <button
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300"
      >
        View Details
      </button>
    </Link>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {properties.length > 2 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full"
              >
                <FaArrowRight className="text-gray-700" />
              </button>
            </>
          )}
        </div>

        <motion.div
          className="text-right mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/properties" passHref>
  <button className="bg-red-600 text-white hover:bg-red-700 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300">
    View all Properties &rarr;
  </button>
</Link>

        </motion.div>
      </div>
    </section>
  );
}
