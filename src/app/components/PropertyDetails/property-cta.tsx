"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ContactModal from "../contact-modal";
import { useParams } from "next/navigation"



export default function PropertyCTA() {
  const { id } = useParams();
  const propertyId = id as string;
  const [ctaData, setCtaData] = useState<{ price: string; title: string } | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCTAData = async () => {
      try {
        const response = await fetch(`https://api.realestatecompany.co.in/api/properties/${propertyId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCtaData(data || { price: "₹ 4.50 L - 7.25 Cr", title: "Parambhu Kripa – 4 BHK Apartments At Bapu Nagar Jaipur" });
      } catch (error) {
        console.error("Error fetching CTA data:", error);
        setCtaData({ price: "₹ 4.50 L - 7.25 Cr", title: "Parambhu Kripa – 4 BHK Apartments At Bapu Nagar Jaipur" });
      }
    };

    fetchCTAData();
  }, [propertyId]);

  const openContactModal = (id: string) => {
    setSelectedPropertyId(id);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setSelectedPropertyId(null);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-10"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div>
          <h3 className="font-bold text-lg">{ctaData?.price}</h3>
          <p className="text-xs text-gray-500">{ctaData?.title}</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-red-500 hover:bg-red-600 mr-20" onClick={() => openContactModal(propertyId)}>
            Contact Us
          </Button>
        </motion.div>
      </motion.div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        propertyId={selectedPropertyId}
      />
    </>
  );
}
