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
import VideoPlayer from "@/app/components/PropertyDetails/Video";
import SuggestedProperties from "@/app/components/PropertyDetails/Suggestedproperties";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div ><PropertyOverview id={params.id} />
    <div className="min-h-screen bg-white">
       
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
       
        <div className="space-y-12">
          
          <Amenities  />
          
          <MapComponent />
          <FloorPlanAndUnits />
        
          <RatingsAndReviews />
          <AboutLocality />
          <VideoPlayer/>
          <PriceTrends />
          <ProjectDetails />
          <AboutDeveloper />
          <AboutProject />
          <SuggestedProperties/>
        </div>
      </motion.div>
    </div>
    </div>
  );
}
