"use client";

import { motion } from "framer-motion";
import PropertyOverview from "../../components/PropertyDetails/PropertyOverview";
import Amenities from "../../components/PropertyDetails/Amenities";
import AboutProject from "../../components/PropertyDetails/AboutProject";
import FloorPlanAndUnits from "../../components/PropertyDetails/FloorPlanAndUnits";
import RatingsAndReviews from "../../components/PropertyDetails/RatingsAndReviews";
import AboutLocality from "../../components/PropertyDetails/AboutLocality";
import PriceTrends from "../../components/PropertyDetails/PriceTrends";
import ProjectDetails from "../../components/PropertyDetails/ProjectDetails";
import AboutDeveloper from "../../components/PropertyDetails/AboutDeveloper";
import MapComponent from "@/app/components/PropertyDetails/map";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-8">Property Details</h1>
        <div className="space-y-12">
          <PropertyOverview id={params.id} />
          <Amenities  />
          <AboutProject />
          <MapComponent />
          <FloorPlanAndUnits />
        
          <RatingsAndReviews />
          <AboutLocality />
          <PriceTrends />
          <ProjectDetails />
          <AboutDeveloper />
        </div>
      </motion.div>
    </div>
  );
}
