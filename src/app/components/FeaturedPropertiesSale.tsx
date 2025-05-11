'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import useSWR from 'swr';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ContactModal from './contact-modal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FeaturedPropertiesSale() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/api/properties',
    fetcher
  );

  const openContactModal = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedPropertyId(null);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Failed to load properties</div>;
  }

  const filteredProperties = data?.filter(
    (property: any) => property.propertyFor === 'buy' && property.isFeatured === true
  ) || [];

  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });

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

        <div className="relative">
          <div
            className="flex space-x-6 overflow-x-auto overflow-y-hidden no-scrollbar scrollbar-hide"
            ref={scrollRef}
          >
            {filteredProperties.map((property: any, index: number) => {
              // Parse bhkOptions safely
              let bhkOptions: string[] = [];
              try {
                bhkOptions = Array.isArray(property.bhkOptions)
                  ? property.bhkOptions
                  : JSON.parse(property.bhkOptions || '[]');
              } catch {
                bhkOptions = [];
              }

              // Parse images safely
              let imageUrl = '/fallback.jpg';
              try {
                const parsedImages = JSON.parse(property.images || '[]');
                imageUrl = parsedImages?.[0] || '/fallback.jpg';
              } catch {
                imageUrl = '/fallback.jpg';
              }

              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md min-w-[320px] transform hover:scale-105 transition-transform duration-300"
                >
                  <Link href={`/properties/${property.id}`}>
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={property.title || 'Property Image'}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover"
                    />
                  </Link>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 text-sm">{property.location}</p>
                    {bhkOptions.length > 0 && (
                      <p className="text-gray-700 text-sm font-medium mt-1">
                        {bhkOptions.join(', ')}
                      </p>
                    )}
                    <p className="text-red-600 font-semibold mt-2">{property.price}</p>
                    <div className="mt-4 flex space-x-2">
                      <Link href={`/properties/${property.id}`} passHref>
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-all duration-300">
                          View Details
                        </button>
                      </Link>
                      <button 
                        onClick={() => openContactModal(property.id)}
                        className="bg-white border border-red-600 text-red-600 hover:bg-red-50 font-bold py-2 px-4 rounded-full text-sm transition-all duration-300"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProperties.length > 2 && (
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={closeContactModal} 
        propertyId={selectedPropertyId} 
      />
    </section>
  );
}
