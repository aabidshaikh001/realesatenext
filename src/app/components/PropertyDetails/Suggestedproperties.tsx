'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SuggestedProperties() {
  const [visibleProperties, setVisibleProperties] = useState(3);

  const { data, error, isLoading } = useSWR(
    'https://api.realestatecompany.co.in/api/properties',
    fetcher
  );

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Failed to load properties.</div>;

  const featuredProperties = data?.filter((property: any) => property.isFeatured);

  const showMoreProperties = () => {
    setVisibleProperties((prev) => Math.min(prev + 3, featuredProperties.length));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="section bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {featuredProperties.slice(0, visibleProperties).map((property: any, index: number) => (
            <motion.div
              key={property.PropertyId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <Link href={`/properties/${property.PropertyId}`}>
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      (() => {
                        try {
                          const parsed = JSON.parse(property.images || '[]');
                          return parsed[0] || '/fallback.jpg';
                        } catch {
                          return '/fallback.jpg';
                        }
                      })()
                    }
                    alt={property.title || 'Property Image'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold line-clamp-2 leading-snug">
                    {property.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{property.location}</p>
                  <p className="text-gray-800 font-semibold mt-1">{property.price}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Carpet Area: {property.carpetArea}</p>
                    <p>Status: {property.status}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleProperties < featuredProperties.length && (
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={showMoreProperties}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            View More
          </button>
        </motion.div>
      )}
    </motion.section>
  );
}
